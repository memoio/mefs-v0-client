let account = {
  /**
   * 创建账号
   * @param {string} pwd 密码
   * @return {object} 账号
   */
  createAccount(pwd=''){
    let params = {keyBytes: 32, ivBytes: 16}
    let dk = keythereum.create(params)
    let options = {
      kdf: "scrypt",
      cipher: "aes-128-ctr",
      kdfparams: {
        n:262144,
        r : 8,
        p : 1,
        dklen: 32
      }
    }

    let keyObject = keythereum.dump(pwd, dk.privateKey, dk.salt, dk.iv, options)
    return keyObject
  },
  /**
   * 获取私钥
   * @param {object} account 账号
   * @param {string} pwd 密码
   */
  getPrivateKey(account,pwd=''){
    let privatekey = keythereum.recover(pwd,account)
    return bufferTo16(privatekey)
  },
  /**
   * 对数据签名
   * @param {object} data 要签名的数据
   * @param {buffer} pk 私钥
   * @return {string} 签名字符串
   */
  getSign(data,pk){
    let tx = new ethereumjs.Tx(data)
    tx.sign(pk)
    let serializedTx = '0x'+tx.serialize().toString('hex')
    return serializedTx
  },
  /**
   * 私钥转地址
   * @param {string} pk
   * @return {string} 地址
   */
  privateKeyToAddress(pk){
    return keythereum.privateKeyToAddress(pk)
  }
}
/**
 * buffer转16进制
 * @param {buffer} bf 
 * @return {string} 16进制字符串
 */
function bufferTo16(bf){
	let res = ''
  for(let s of bf){
    let h = s.toString(16)
    if(h.length < 2){
      h = '0'+h
    }
    res += h
  }
	return '0x' + res
}

export default account