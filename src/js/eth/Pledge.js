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

// 质押合约
class KeeperPledge{
  constructor(abi,address,pk){
    this.ct = web3.eth.contract(abi).at(address)
    this.pk = pk
  }
  pledge(value){
    let gas = this.ct.pledge.estimateGas()
    let input = this.ct.pledge.getData()
    let sign = getSign(this.pk,{
      to:this.ct.address,
      // gas:gas,
      gas:2000000,
      input:input,
      value:'0x'+parseInt(value).toString(16)
    })
    return eth.sendRawTransaction(sign)
  }
  cancelPledge(){
    let gas = this.ct.cancelPledge.estimateGas()
    let input = this.ct.cancelPledge.getData()
    let sign = getSign(this.pk,{
      to:this.ct.address,
      gas:gas,
      input:input,
    })
    return eth.sendRawTransaction(sign)
  }
  info(acc){
    let res = this.ct.info(acc)
    return [res[0],res[1].toString()]
  }
  getAllAddress(){
    let res = this.ct.getAllAddress()
    return res
  }
  getDeposit(){
    let res = this.ct.getDeposit()
    return res
  }
}
class ProviderPledge{
  constructor(abi,address,pk){
    this.ct = web3.eth.contract(abi).at(address)
    this.pk = pk
  }
  pledge(size,value){
    // let gas = this.ct.pledge.estimateGas(size)
    let input = this.ct.pledge.getData(size)
    value = new BigNumber(value).toString(16)
    let sign = getSign(this.pk,{
      to:this.ct.address,
      // gas:gas,
      gas:200000,
      input:input,
      value:'0x'+value
    })
    return eth.sendRawTransaction(sign)
  }
  cancelPledge(){
    let gas = this.ct.cancelPledge.estimateGas()
    let input = this.ct.cancelPledge.getData()
    let sign = getSign(this.pk,{
      to:this.ct.address,
      gas:gas,
      input:input,
    })
    return eth.sendRawTransaction(sign)
  }
  info(acc){
    let res = this.ct.info(acc)
    return [res[0],res[1].toString()]
  }
  getAllAddress(){
    let res = this.ct.getAllAddress()
    return res
  }
  getPledgeMoney(size){
    let res = this.ct.getPledgeMoney(size)
    res = new BigNumber(res).toString(10)
    return res
  }
}

module.exports = {
  KeeperPledge:KeeperPledge,
  ProviderPledge:ProviderPledge,
}