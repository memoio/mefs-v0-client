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

class Query{
  // @param {string} address 合约地址
  constructor(abi,bin,pk,address){
    obj.attr(this,{
      pk,abi,bin,address,
    })
  }
  // 部署合约
  deploy(capacity, duration, price, ks, ps){
    // 获取部署数据
    let data = eth.contract(this.abi).new.getData(capacity,duration,price,ks,ps,{data:this.bin})
    // 签名
    let sign = getSign(this.pk,{
      input:data,
      gas:eth.estimateGas({data})
    })
    // 部署
    let tx = eth.sendRawTransaction(sign)
    return tx
  }
}

module.exports = Query