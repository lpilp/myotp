const Base32 = require('./base32');

var MyCode = {
  encode: function (str) {
    return Base32.encode(str);
  },
  decode: function (str) {
    return Base32.decode(str);
  },
  // 一种将字母的assic变成16进制字符的简单加解密方法，供参考
  assicEncode: function (input) {
    let array = [];
    for (let i = 0; i < (input.length) / 2; i++) {
      let tmp = input.substr(i * 2, 2);
      tmp = String.fromCharCode(parseInt(tmp, 16));
      array.push(tmp);
    }
    // console.log(array);
    return array.join('');
  },
  assicDecode: function (input) {
    let array = [];
    for (let i = 0; i < input.length; i++) {
      let tmp = ('00' + input[i].charCodeAt().toString(16)).slice(2);
      array.push(tmp);
    }
    return array.join('');
  } 
}
module.exports = MyCode;
