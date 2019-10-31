let axios= app.axios,
config = app.config

class Eth{
  /**
   * 调用指定方法
   * @param {string} method 方法名
   * @param {array} params 参数
   * @return {object}
   */
  async get(method,...params){
    return new Promise((resolve, reject)=>{
      axios({
        method: 'post',
        url: config.ethUrl,
        data: {
          jsonrpc:'2.0',
          id:1,
          method:method,
          params:params
        }
      }).then(res=>{
        if(res.data.error){
          log(res.data)
        }
        resolve(res.data.result)
      }).catch(err=>{
        reject(err)
      })
    })
  }
  async getBalance(addr){
    return this.get('eth_getBalance',addr,'pending')
  }
  async getTransactionCount(addr){
    return this.get('eth_getTransactionCount',addr,'pending')
  }
  async sendRawTransaction(sign){
    return this.get('eth_sendRawTransaction',sign)
  }
}

module.exports = Eth