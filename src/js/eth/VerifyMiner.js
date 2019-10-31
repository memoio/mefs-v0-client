let config = app.config,
account = app.account

let web3 = new Web3(new Web3.providers.HttpProvider(config.ethUrl))
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

class VerifyMiner{
  constructor(abi,address,pk){
    this.vm = web3.eth.contract(abi).at(address)
    this.pk = pk
  }
  get(acc){
    return this.vm.get(acc)
  }
  getDeposit(){
    return this.vm.getDeposit().toString()
  }
  getUserDeposit(user){
    return this.vm.getUserDeposit(user).toString()
  }
  setCustom(isCustom,customDeposit){
    let gas = this.vm.setCustom.estimateGas(isCustom,customDeposit)
    let input = this.vm.setCustom.getData(isCustom,customDeposit)
    let sign = getSign(this.pk,{
      to:this.vm.address,
      gas:gas,
      input:input
    })
    return eth.sendRawTransaction(sign)
  }
  /**
   * 
   * @param {string} value 10进制
   */
  applyMiner(value){
    let gas = '0x100000' //this.vm.applyMiner.estimateGas()
    let input = this.vm.applyMiner.getData()
    let sign = getSign(this.pk,{
      to:this.vm.address,
      gas:gas,
      input:input,
      value:'0x'+parseInt(value).toString(16)
    })
    return eth.sendRawTransaction(sign)
  }
  outMiner(){
    let gas = '0x100000' //this.vm.applyMiner.estimateGas()
    let input = this.vm.outMiner.getData()
    let sign = getSign(this.pk,{
      to:this.vm.address,
      gas:gas,
      input:input,
      value:'0x'+parseInt('200').toString(16)
    })
    return eth.sendRawTransaction(sign)
  }
  getAllAddress(){
    let res = this.vm.getAllAddress()
    return res
  }
}

module.exports = VerifyMiner