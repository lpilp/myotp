/* eslint-disable */
const jsSHA = require('../lib/jssha');
const MyCode = require('../lib/mycode')

function OTP(options) {
  this.secret = options.secret || '';
  if (this.secret == '') {
    throw new Error("seed is empty");
  }
  this.digits = options.digits || 6;
  this.digest = options.digest || 'SHA-1';
  this.interval = options.interval || 60; //60秒一次
  this.offset = options.offset || 0; //是否需要偏移
  this.name = String(options.name || 'myotp').split(/[^\w|_|-|@]/).join('');
  this.hmacObj = new jsSHA(this.digest, 'BYTES');
  this.hmacObj.setHMACKey(this.docodeSecret(this.secret), 'BYTES');
}

OTP.prototype.docodeSecret = function (secret) {
  //在lib/mycode中自定义种子加解密码，缺省是base32
  return MyCode.decode(secret).toString();
};

OTP.prototype.generate_otp = function (input) {
  let hmacObj = this.hmacObj;
  hmacObj.update(this.int_to_bytestring(input), 1);
  // get HMAC ans
  let hmac = hmacObj.getHMAC('BYTES');
  // transfer hmac to Array
  let hmac_a = hmac.split('');
  // calculate the init offset
  let offset = hmac_a[hmac_a.length - 1].charCodeAt() & 0xf;
  let code = ((hmac_a[offset].charCodeAt() & 0x7f) << 24 |
    (hmac_a[offset + 1].charCodeAt() & 0xff) << 16 |
    (hmac_a[offset + 2].charCodeAt() & 0xff) << 8 | (hmac_a[offset + 3]
      .charCodeAt() & 0xff));

  return ((new Array(this.digits + 1)).join('0') + code).slice(-1 * this.digits);
};
OTP.prototype.generate_now = function (timeOffset) {
  timeOffset = timeOffset || 0;
  let formatTime = Math.floor(Date.now() / 1000) - this.offset;

  let fre = parseInt(formatTime / this.interval);
  fre += timeOffset;
  return this.generate_otp(fre);
};

OTP.prototype.check_now = function (code, codeOffset) {
  codeOffset = codeOffset || 0;
  codeOffset = Math.abs(codeOffset);
  const start  = -codeOffset;
  const end = codeOffset;
  let timeCode;
  for(let i= start; i<=end; i++) {
    timeCode = this.generate_now(i);
    console.log(timeCode);
    if(timeCode == code){
      return true;
    }
  }
  return false;  
}
OTP.prototype.int_to_bytestring = function (input, padding) {
  padding = padding || 8;
  let inputTmp = input;
  let result = [];

  while (inputTmp !== 0) {
    result.push(String.fromCharCode(inputTmp & 0xFF));
    inputTmp >>= 8;
  }

  result = result.reverse();
  result = this.arr_rjust(result, padding).join('');
  return result;
};
OTP.prototype.arr_rjust = function (arr, n) {
  let arrTmp = arr;
  if (n <= arrTmp.length) {
    arrTmp = arrTmp.splice(arrTmp.length - 1 - n);
    return arrTmp;
  }
  let diff = n - arrTmp.length;
  for (let i = 0; i < diff; i += 1) {
    arrTmp.unshift(String.fromCharCode(0));
  }
  return arrTmp;
};

OTP.prototype.getOtpUrl = function () {
  const params = [
    'secret=' + encodeURIComponent(this.secret),
    'period=' + this.interval,
    'digits=' + this.digits
  ]
  return [
    'otpauth://totp/',
    this.name,
    '?',
    params.join('&')
  ].join('');
};
module.exports = OTP;
