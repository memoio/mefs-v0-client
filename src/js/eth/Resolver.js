let account = app.account
let web3 = app.web3
let eth = web3.eth

/**
 * 获取签名信息
 * @param {string} pk 私钥 0x...
 * @param {object} data 要签名的数据
 * @return {string} 签名后的数据
 */
function getSign(pk,data){
  pk = pk.slice(2)
  let acc = account.privateKeyToAddress(pk)
  let nonce = eth.getTransactionCount(acc,'pending')
  let gasPrice = '0x'+eth.gasPrice.toString(16)
  return account.getSign({
    from:acc,
    to:data.to,
    value:data.value,
    input:data.input,
    nonce:nonce,
    gas:data.gas,
    gasPrice:gasPrice
  },keythereum.str2buf(pk))
}

class Resolver{
  // @param {string} address 合约地址
  constructor(abi,bin,pk,address){
    obj.attr(this,{
      pk,abi,bin,address,
    })
    this.vm = eth.contract(abi).at(address)
  }
  add(addr){
    let gas = this.vm.add.estimateGas(addr)
    let input = this.vm.add.getData(addr)
    let sign = getSign(this.pk,{
      to:this.vm.address,
      gas:gas,
      input:input,
    })
    return eth.sendRawTransaction(sign)
  }
  get(addr){
    return this.vm.get(addr)
  }
}

module.exports = Resolver