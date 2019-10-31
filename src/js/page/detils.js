let css = app.css,
account = app.account,
config = app.config,
back,acc,eth,dialog,VerifyMiner,KeeperPledge,ProviderPledge,
Mapper,Offer,Query,
Resolver,
web3

// 定义循环
// @param {function} fun 要执行的函数
// @param {int} time 多长时间循环一次
// @param {function} isOut 返回为true时退出循环
function timer(fun,time,isOut){
  // 用于循环中交换数据
  let obj = {}
  let interval = setInterval(function(){
    fun(obj)
    if(isOut(obj)){
      clearInterval(interval)
    }
  }, time)
}

let utils = {
  table(res){
    let tb = `<tr><td>${lp(65)}</td><td>${lp(66)}</td><td>${lp(71)}</td><td>${lp(67)}</td><td>${lp(68)}(MB)</td><td>${lp(69)}</td><td>${lp(70)}</td><td>${lp(72)}</td><td>${lp(73)}</td></tr>`
    for(let data of res){
      tb += '<tr>'
      tb += `<td>${data.tx}</td>`
      tb += `<td>${data.address}</td>`
      tb += `<td>${data.user}</td>`
      tb += `<td>${data.timestamp}</td>`
      tb += `<td>${data.size}</td>`
      tb += `<td>${data.time}</td>`
      tb += `<td>${data.totalPay}</td>`
      tb += `<td>`
      for(let v of data.keeper){
        tb += v + '<br>'
      }
      tb += `</td>`
      tb += `<td>`
      for(let v of data.provider){
        tb += v + '<br>'
      }
      tb += `</td>`
      tb += '</tr>'
    }
    return tb
  }
}
let user = {
  // 申请资金
  async applyMoney(){
    let res = await back.get('/applyMoney/'+acc.address)
    dialog.tips(res.data)
  },
  async getOrder(){
    let res = await back.get('/order/user/'+acc.address)
    let tb = utils.table(res.data)
    dq('.details .file .table').innerHTML = tb
  },
  async balance(){
    let res = await eth.getBalance(acc.address)
    dialog.tips(res)
  },
  showPk(){
    dialog.tips(acc.pk)
  },
  exportPrivateKey(){
    let body = document.querySelector('body')
    body.innerHTML += `<a id="tmp" href='data:text/plain;charset=utf-8,${JSON.stringify(acc.account)}' download="0x${acc.account.address}.json" style="display:node;"></a>`
    let tmp = body.querySelector('#tmp')
    tmp.click()
    tmp.parentNode.removeChild(tmp)
    dialog.tips(lp(74))
  },
  async transfer(){
    let pk = acc.pk.slice(2)
    let from = acc.address
    let to,num
    dialog.show(function(obj){
      obj.innerHTML = `
        <h2>${lp(75)}</h2>
        <input class="input i2" style="margin-top:20px;width:100%;" type="text" placeholder="${lp(76)} 0x...">
        <input class="input i2" style="margin-top:20px;width:100%;" type="text" placeholder="${lp(77)}">
        <div style="margin-top:20px;">
          <button class="button b7">${lp(78)}</button>
          <button class="button b7" style="margin-left:20px;">${lp(79)}</button>
        </div>
      `
      obj.style = 'height:200px;'
      obj.querySelector('button:first-child').onclick = async function(){
        let input = obj.querySelectorAll('input')
        to = input[0].value
        num = input[1].value
        let nonce = await eth.getTransactionCount(from)
        let param = {
          from:from,
          to:to,
          value: '0x'+parseInt(num).toString(16),
          nonce: nonce,
          gas : "0x100000",
          gasPrice: '0x1'
        }
        let sign = account.getSign(param,keythereum.str2buf(pk))
        let tx = await eth.sendRawTransaction(sign)
        dialog.tips(tx)
      }
      obj.querySelector('button:last-child').onclick = function(){
        dialog.hide()
      }
    })
  },
  // 申请存储
  applyStorage(args){
    dialog.tips(lp(80))
    let qr = new Resolver(config.contracts.queryResolver.abi,null,acc.pk,config.contracts.queryResolver.address)
    // 部署mapper
    let addr = qr.get(acc.address)
    if(addr == '0x0000000000000000000000000000000000000000'){
      let mapper = new Mapper(config.contracts.mapper.abi,config.contracts.mapper.bin,acc.pk)
      let tx = mapper.deploy()
      timer(function(out){
        let obj = web3.eth.getTransactionReceipt(tx)
        if(obj && obj.contractAddress){
          // 退出循环
          out.out = true
          // log('部署mapper',tx,obj.contractAddress)
          qr.add(obj.contractAddress)
          // 部署query
          deployQuery(obj.contractAddress)
        }
      },1000,function(out){
        return out.out
      })
    }else{
      deployQuery(addr)
    }
    // @param {string} addr mapper地址
    function deployQuery(addr){
      let mapper = new Mapper(config.contracts.mapper.abi,config.contracts.mapper.bin,acc.pk,addr)
      // 部署query
      let query = new Query(config.contracts.query.abi,config.contracts.query.bin,acc.pk)
      let tx = query.deploy(...args)
      timer(function(out){
        let obj = web3.eth.getTransactionReceipt(tx)
        if(obj && obj.contractAddress){
          out.out = true
          // log('部署query',tx,obj.contractAddress)
          mapper.add(obj.contractAddress)
          dialog.tips(lp(81))
        }
      },1000,function(out){
        return out.out
      })
    }
  },
  // 申请存储列表
  async applyStorageList(){
    let res = await back.get('/order/query/'+acc.address)
    let tb = `<tr><td>${lp(82)}(MB)</td><td>${lp(83)}(${lp(11)})</td><td>${lp(84)}</td><td>KeeperSla</td><td>ProviderSla</td><td>${lp(85)}</td></tr>`
    for(let data of res.data){
      tb += '<tr>'
      tb += `<td>${data.capacity}</td>`
      tb += `<td>${data.duration}</td>`
      tb += `<td>${data.price}</td>`
      tb += `<td>${data.ks}</td>`
      tb += `<td>${data.ps}</td>`
      tb += `<td>${data.complete}</td>`
      tb += '</tr>'
    }
    dqa('.details .file .table')[1].innerHTML = tb
  }
}
let keeper = {
  async getOrder(){
    let res = await back.get('/order/keeper/'+acc.address)
    let tb = utils.table(res.data)
    dqa('.details .keeper .table')[0].innerHTML = tb
  },
  pledge:{
    abi:config.contracts.keeper.abi,
    address:config.contracts.keeper.address,
    getCt(){
      let pk = acc.pk
      let ct = new KeeperPledge(this.abi,this.address,pk)
      return ct
    },
    pledge(val){
      let ct = this.getCt()
      let res = ct.pledge(val)
      dialog.tips(res)
    },
    cancelPledge(){
      let ct = this.getCt()
      let res = ct.cancelPledge()
      dialog.tips(res)
    },
    info(){
      let ct = this.getCt()
      let res = ct.info(acc.address)
      dialog.tips(res)
    },
    getAllAddress(){
      let ct = this.getCt()
      let res = ct.getAllAddress()
      let li = ''
      for(let v of res){
        li += `<li>${v}</li>`
      }
      dq('.details .keeper ol').innerHTML = li
    },
    getDeposit(){
      let ct = this.getCt()
      let res = ct.getDeposit()
      dialog.tips(res)
    }
  },
  async profit(){
    let res = await back.get('/profit/keeper/'+acc.address)
    let tb = `<tr><td>${lp(109)}</td><td>${lp(110)}</td></tr>`
    for(let data of res.data){
      tb += '<tr>'
      tb += `<td>${app.time.format(parseInt(data.timestamp+'000'))}</td>`
      tb += `<td>${new BigNumber(data.value).toString(10)}</td>`
      tb += '</tr>'
    }
    dqa('.details .keeper .table')[1].innerHTML = tb
  },
}
let provider = {
  async getOrder(){
    let res = await back.get('/order/provider/'+acc.address)
    let tb = utils.table(res.data)
    dqa('.details .provider .table')[0].innerHTML = tb
  },
  pledge:{
    abi:config.contracts.provider.abi,
    address:config.contracts.provider.address,
    getCt(){
      let pk = acc.pk
      let ct = new ProviderPledge(this.abi,this.address,pk)
      return ct
    },
    pledge(size,val){
      let ct = this.getCt()
      let res = ct.pledge(size,val)
      dialog.tips(res)
    },
    cancelPledge(){
      let ct = this.getCt()
      let res = ct.cancelPledge()
      dialog.tips(res)
    },
    info(){
      let ct = this.getCt()
      let res = ct.info(acc.address)
      dialog.tips(res)
    },
    getAllAddress(){
      let ct = this.getCt()
      let res = ct.getAllAddress()
      let li = ''
      for(let v of res){
        li += `<li>${v}</li>`
      }
      dq('.details .provider ol').innerHTML = li
    },
    getPledgeMoney(size){
      let ct = this.getCt()
      let res = ct.getPledgeMoney(size)
      dialog.tips(res)
    },
  },
  // 申请存储
  applyStorage(args){
    dialog.tips(lp(86))
    let or = new Resolver(config.contracts.offerResolver.abi,null,acc.pk,config.contracts.offerResolver.address)
    // 部署mapper
    let addr = or.get(acc.address)
    if(addr == '0x0000000000000000000000000000000000000000'){
      let mapper = new Mapper(config.contracts.mapper.abi,config.contracts.mapper.bin,acc.pk)
      let tx = mapper.deploy()
      timer(function(out){
        let obj = web3.eth.getTransactionReceipt(tx)
        if(obj && obj.contractAddress){
          // 退出循环
          out.out = true
          // log('部署mapper',tx,obj.contractAddress)
          or.add(obj.contractAddress)
          // 部署offer
          deployQuery(obj.contractAddress)
        }
      },1000,function(out){
        return out.out
      })
    }else{
      deployQuery(addr)
    }
    // @param {string} addr mapper地址
    function deployQuery(addr){
      let mapper = new Mapper(config.contracts.mapper.abi,config.contracts.mapper.bin,acc.pk,addr)
      // 部署offer
      let offer = new Offer(config.contracts.offer.abi,config.contracts.offer.bin,acc.pk)
      let tx = offer.deploy(...args)
      timer(function(out){
        let obj = web3.eth.getTransactionReceipt(tx)
        if(obj && obj.contractAddress){
          out.out = true
          // log('部署offer',tx,obj.contractAddress)
          mapper.add(obj.contractAddress)
          dialog.tips(lp(87))
        }
      },1000,function(out){
        return out.out
      })
    }
  },
  // 申请存储列表
  async applyStorageList(){
    let res = await back.get('/order/offer/'+acc.address)
    let tb = `<tr><td>${lp(88)}(MB)</td><td>${lp(89)}</td><td>${lp(90)}(1mb/${lp(11)})</td></tr>`
    for(let data of res.data){
      tb += '<tr>'
      tb += `<td>${data.capacity}</td>`
      tb += `<td>${app.time.format(parseInt(data.duration+'000'))}</td>`
      tb += `<td>${data.price}</td>`
      tb += '</tr>'
    }
    dqa('.details .provider .table')[1].innerHTML = tb
  },
  async profit(){
    let res = await back.get('/profit/provider/'+acc.address)
    let tb = `<tr><td>${lp(109)}</td><td>${lp(110)}</td></tr>`
    for(let data of res.data){
      tb += '<tr>'
      tb += `<td>${app.time.format(parseInt(data.timestamp+'000'))}</td>`
      tb += `<td>${new BigNumber(data.value).toString(10)}</td>`
      tb += '</tr>'
    }
    dqa('.details .provider .table')[2].innerHTML = tb
  },
}
let miner = {
  abi:config.contracts.miner.abi,
  address:config.contracts.miner.address,
  getVm(){
    let pk = acc.pk
    let vm = new VerifyMiner(this.abi,this.address,pk)
    return vm
  },
  showInfo(data){
    dialog.tips(data)
  },
  // 自定义押金
  customDeposit(){
    let vm = this.getVm()
    dialog.show(function(obj){
      obj.innerHTML = `
        <h2>${lp(91)}</h2>
        <input class="input i2" style="margin-top:20px;width:100%;" type="text" placeholder="${lp(92)}">
        <div style="margin-top:20px;">
          <button class="button b7">${lp(93)}</button>
          <button class="button b7" style="margin-left:20px;">${lp(94)}</button>
        </div>
      `
      obj.style = 'height:150px;'
      obj.querySelector('button:first-child').onclick = async function(){
        let input = obj.querySelectorAll('input')
        let deposit = input[0].value
        let tx = vm.setCustom(true,deposit)
        dialog.hide()
        dialog.tips(tx)
      }
      obj.querySelector('button:last-child').onclick = function(){
        dialog.hide()
      }
    })
  },
  // 使用默认押金
  useDefaultDeposit(){
    let vm = this.getVm()
    let tx = vm.setCustom(false,0)
    dialog.tips(tx)
  },
  // 获取要交多少抵押的金额才能挖矿
  getDeposit(){
    let vm = this.getVm()
    let res = vm.getDeposit()
    this.showInfo(`${lp(95)}: ${res}`)
  },
  // 获取抵押的金额
  getUserDeposit(){
    let vm = this.getVm()
    let res = vm.getUserDeposit(acc.address)
    this.showInfo(`${lp(96)}: ${res}`)
  },
  // 获取我是不是矿工
  isMiner(){
    let vm = this.getVm()
    let res = vm.get(acc.address)
    this.showInfo(res?lp(97):lp(98))
  },
  // 申请矿工
  applyMiner(){
    let vm = this.getVm()
    dialog.show(function(obj){
      obj.innerHTML = `
        <h2>${lp(99)}</h2>
        <input class="input i2" style="margin-top:20px;width:100%;" type="text" placeholder="${lp(100)}">
        <div style="margin-top:20px;">
          <button class="button b7">${lp(101)}</button>
          <button class="button b7" style="margin-left:20px;">${lp(102)}</button>
        </div>
      `
      obj.style = 'height:150px;'
      obj.querySelector('button:first-child').onclick = async function(){
        let input = obj.querySelectorAll('input')
        let deposit = input[0].value
        let tx = vm.applyMiner(deposit)
        dialog.hide()
        dialog.tips(tx)
      }
      obj.querySelector('button:last-child').onclick = function(){
        dialog.hide()
      }
    })
  },
  // 退出矿工
  outMiner(){
    let vm = this.getVm()
    let tx = vm.outMiner()
    dialog.tips(tx)
  },
  getAllAddress(){
    let vm = this.getVm()
    let res = vm.getAllAddress()
    let li = ''
    for(let v of res){
      li += `<li>${v}</li>`
    }
    dq('.details .miner ol').innerHTML = li
  },
}
class Detils{
  constructor(_acc){
    acc = _acc
  }
  init(){
    // 初始化对象
    web3 = app.web3
    eth = app.eth
    back = app.back
    dialog = app.page.dialog
    VerifyMiner = app.VerifyMiner
    KeeperPledge = app.KeeperPledge
    ProviderPledge = app.ProviderPledge
    Mapper = app.Mapper
    Offer = app.Offer
    Query = app.Query
    Resolver = app.Resolver
    // 退出按钮
    dq('.details>div:first-child>div:last-child>button').onclick = function(){
      // css.convertRemoveClassByGroup(dqa('#main>div'),0,'hide')
      app.page.route()
    }
    // 角色下拉选则框
    let st = dq('.select.s1')
    let navList = dqa('.nav-card')
    st.onchange = function(){
      navList.forEach(obj=>{
        css.removeClass(obj,'show')
      })
      let v = 'user'
      switch(this.value.toLowerCase()){
        case 'user':v='user';break
        case 'file':
          v='file'
          dq('.details .file div:nth-child(1)>nav a:nth-child(1)').onclick()
        break
        case 'keeper':
          v='keeper'
          dq('.details .keeper div:nth-child(1)>nav a:nth-child(1)').onclick()
        break
        case 'provider':
          v='provider'
          dq('.details .provider div:nth-child(1)>nav a:nth-child(1)').onclick()
        break
        case 'miner':v='miner';break
      }
      dq('.nav-card.'+v).className += ' show'
    }
    // 导航选则
    navList = dqa('.nav-card')
    navList.forEach((obj,ni)=>{
      let aList = obj.querySelectorAll('div:nth-child(1)>nav a')
      aList.forEach((a,i)=>{
        // 导航按钮
        // user 订单
        if(ni == 1){
          if(i == 0){
            a.onclick = function(){
              user.getOrder()
              onclick(obj,i)
            }
          }else if(i == 3){
            a.onclick = function(){
              user.applyStorageList()
              onclick(obj,i)
            }
          }else{
            a.onclick = function(){
              onclick(obj,i)
            }
          }
        }else if(ni == 2){
          if(i == 0){
            a.onclick = function(){
              keeper.getOrder()
              onclick(obj,i)
            }
          }else if(i == 2){
            a.onclick = function(){
              keeper.pledge.getAllAddress()
              onclick(obj,i)
            }
          }else if(i == 3){
            a.onclick = function(){
              keeper.profit()
              onclick(obj,i)
            }
          }else{
            a.onclick = function(){
              onclick(obj,i)
            }
          }
        }else if(ni == 3){
          if(i == 0){
            a.onclick = function(){
              provider.getOrder()
              onclick(obj,i)
            }
          }else if(i == 2){
            a.onclick = function(){
              provider.pledge.getAllAddress()
              onclick(obj,i)
            }
          }else if(i == 4){
            a.onclick = function(){
              provider.applyStorageList()
              onclick(obj,i)
            }
          }else if(i == 5){
            a.onclick = function(){
              provider.profit()
              onclick(obj,i)
            }
          }else{
            a.onclick = function(){
              onclick(obj,i)
            }
          }
        }else if(ni == 4 && i == 2){
          a.onclick = function(){
            miner.getAllAddress()
            onclick(obj,i)
          }
        }else{
          a.onclick = function(){
            onclick(obj,i)
          }
        }
      })
    })
    function onclick(nav,i){
      let cardList = nav.children['1'].children
      for(let obj of cardList){
        obj.className = ''
      }
      cardList[i].className = 'show'
      let aList = nav.querySelectorAll('div:nth-child(1)>nav a')
      aList.forEach(a=>{
        a.className = ''
      })
      aList[i].className = 'nav-card-select'
    }
    // 内容各按钮绑定
    let tmp
    tmp = dqa('.details>div:first-child>div:nth-child(2) button')
    // 查看私钥
    tmp[0].onclick = function(){user.showPk()}
    // 导出keystore文件
    tmp[1].onclick = function(){user.exportPrivateKey()}
    // 查询余额
    tmp[2].onclick = function(){user.balance()}
    // 转账
    tmp[3].onclick = function(){user.transfer()}
    // 申请资金
    tmp[4].onclick = function(){user.applyMoney()}
    // 上传
    // tmp[2].onclick = function(){log(this)}
    // 下载
    // tmp[3].onclick = function(){log(this)}
    // keeper
    tmp = dqa('.keeper button')
    // 资格质押
    let s5 = new dialog.S3('d5')
    tmp[0].onclick = function(){s5.show(function(obj){
      let btn = obj.qa('button')
      btn[0].onclick = function(){
        let val = obj.q('input').value
        keeper.pledge.pledge(val)
        s5.hide()
      }
      btn[1].onclick = function(){
        s5.hide()
      }
    })}
    // 取消质押
    tmp[1].onclick = function(){keeper.pledge.cancelPledge()}
    // 质押信息
    tmp[2].onclick = function(){keeper.pledge.info()}
    tmp[3].onclick = function(){keeper.pledge.getDeposit()}
    // provider
    tmp = dqa('.provider button')
    // 资格质押
    let s7 = new dialog.S3('d7')
    tmp[0].onclick = function(){s7.show(function(obj){
      let btn = obj.qa('button')
      btn[0].onclick = function(){
        let input = obj.qa('input')
        let size = input[0].value
        let val = input[1].value
        provider.pledge.pledge(size,val)
        s7.hide()
      }
      btn[1].onclick = function(){
        s7.hide()
      }
    })}
    // 取消质押
    tmp[1].onclick = function(){provider.pledge.cancelPledge()}
    // 质押信息
    tmp[2].onclick = function(){provider.pledge.info()}
    let s6 = new dialog.S3('d6')
    tmp[3].onclick = function(){s6.show(function(obj){
      let btn = obj.qa('button')
      btn[0].onclick = function(){
        let val = obj.q('input').value
        provider.pledge.getPledgeMoney(val)
        s6.hide()
      }
      btn[1].onclick = function(){
        s6.hide()
      }
    })}
    // 申请存储
    let s4 = new dialog.S3('d4')
    tmp[4].onclick = function(){s4.show(function(obj){
      let btn = obj.qa('button')
      btn[0].onclick = function(){
        let val = obj.qa('input')
        let arr = [val[0].value,app.time.timestamp(val[1].value),val[2].value,]
        // 申请存储
        provider.applyStorage(arr)
        s4.hide()
      }
      btn[1].onclick = function(){
        s4.hide()
      }
    })}
    // miner
    tmp = dqa('.miner button')
    // 自定义押金
    tmp[0].onclick = function(){miner.customDeposit()}
    // 使用默认押金算法
    tmp[1].onclick = function(){miner.useDefaultDeposit()}
    // 要交多少押金才能挖矿
    tmp[2].onclick = function(){miner.getDeposit()}
    // 申请矿工
    tmp[3].onclick = function(){miner.applyMiner()}
    // 退出矿工
    tmp[4].onclick = function(){miner.outMiner()}
    // 查询我是不是矿工
    tmp[5].onclick = function(){miner.isMiner()}
    // 查询我抵押的金额
    tmp[6].onclick = function(){miner.getUserDeposit()}
    // user 申请存储
    tmp = dqa('.details .file button')
    let s3 = new dialog.S3()
    tmp[0].onclick = function(){s3.show(function(obj){
      let btn = obj.qa('button')
      btn[0].onclick = function(){
        let val = obj.qa('input')
        let arr = [val[0].value,val[1].value,val[2].value,val[3].value,val[4].value,]
        // 申请存储
        user.applyStorage(arr)
        s3.hide()
      }
      btn[1].onclick = function(){
        s3.hide()
      }
    })}

    // 文件跳转链接
    dq('.details .file a:nth-child(2)').onclick = function(){
      if(!acc.pk){
        alert(lp(103))
        return
      }
      window.open(`http://212.64.28.207:8080/fileSystemWeb/Bucket.html?userid=${acc.address}&Url=http%3A%2F%2F212.64.28.207%3A5001&SecretKey=${acc.pk}`)
    }
  }
  set acc(val){
    dq('.details>div:first-child>div:nth-child(2)>p>span').innerHTML = val
  }
}

module.exports = Detils