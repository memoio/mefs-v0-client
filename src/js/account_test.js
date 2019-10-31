// 获取私钥
function t1(){
  acc = {"address":"3832f6102e5c1da84382dbb18eeb5896e76ea391","crypto":{"cipher":"aes-128-ctr","ciphertext":"79a8e07bf21f3a7c0e1984be855abad16542a7313456ed8e13b31757eb301fe0","cipherparams":{"iv":"c9cc00d2c25b667cf96f7f6e14d0e5cb"},"mac":"6f85aef1b7bb91e54fc65fd93175d6506e0c3e222c1cbd28b4aaf9c7e8abadec","kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"r":8,"p":1,"salt":"72370f1cb4946500a0fa871b828f450ee4b2c6a2c788f7400993a7309d2b7117"}},"id":"b515ef92-a8e2-494a-a4c6-a49a5e2d18c7","version":3}
  let pk = getPrivateKey(acc)
  console.log(pk)
}
// 对数据签名
function t2(){
  // 获取nonce
  // eth.getTransactionCount('0x3832f6102e5c1da84382dbb18eeb5896e76ea391','pending')
  let sg = getSign({
    from:'0x3832f6102e5c1da84382dbb18eeb5896e76ea391',
    to:'0x726bbb09b1e8917d34878bd6a455cdf174280cb3',
    value: '0x100',
    nonce: 6666,
    gas : "0x100000",
    gasPrice: '0x1'
  },keythereum.str2buf('ed300b4d2d467188ec56db32cec75d156f17654a2002f1056e5cc607dc7c2df4'))
  console.log(sg)
}