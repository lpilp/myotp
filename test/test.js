// const OTP = require('../src/index.js')
const OTP = require('../dist/index')
const MyCode = require('../lib/mycode')

// google auth 是用的这种方式加密种子，可自行更新自定义方法
const seed = MyCode.encode('abcdefghijklmnopqrstuvwxyz').toString().replace(/=/g, ''); 

// 以下参数缺省是google auth 使用， 可根据自已的需求，更新，
const options = {
  secret: seed, 
  digits:  6, 
  digest: 'SHA-1',  //google auth只支持sha1, 这里可选SHA-1, SHA3-224, SHA3-256, SHA3-384, or SHA3-512
  interval: 30, // 30秒一次 ， 一般在使用的时候比较多的是60秒一次
  offset: 0, // 是否需要偏移，google auth没有该参数， 单位是秒,缺省计数是从1970-1-1开始的，可根据需要做些偏移如2010-1-1， 这时填： 1262275200
  name: 'username@mail.com'
}

const myotp = new OTP(options)
console.log('code:' + myotp.generate_now()); 
console.log('code:' + myotp.generate_now());

// 第二个参数，支持偏移，1表示该时间的上下一个6数据都判定为正确，各个设备可能时间上存在一定的差别,
// 或是手动输入时照顾下中老年人，手速慢 ^_^
console.log('check: ' + myotp.check_now('412035',1)); 

console.log('google auth url: ' + myotp.getOtpUrl());
