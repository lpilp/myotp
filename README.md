# myotp
基于google auth的otp
#可能的问题
使用的第三方thirty-two，base32函数中用到了Buffer()函数，在高点的node版本中会报warning, 
打包时修改thirty-two里的encode, decode里的Buffer函数，
将 new Buffer('xxxxxx') ==> new Buffer.from('xxxxxx'),将字条串转buffer 共两处
将 new Buffer(n) ==> new Buffer.alloc(n), 新建n个空间的buffer 共两处

#使用方法
参照 test/test.js 
