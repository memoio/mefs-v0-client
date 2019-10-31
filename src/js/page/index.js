// 当前账号
const acc = {
  account:{},
  // address:'0x0eb5b66c31b3c5a12aae81a9d629540b6433cac6',
  // pk:'0x928969b4eb7fbca964a41024412702af827cbc950dbe9268eae9f5df668c85b4',
  address:'',
  pk:'',
}

import home from './home'
let Login = require('./login')
let Detils = require('./detils')
let dialog = require('./dialog')
let login = new Login(acc)
let detils = new Detils(acc)

obj.attr(dialog,{
  S3:require('./dialog/S3')
})

let page = {
  dialog:dialog,
  login:login,
  detils:detils,
  // 初始化页面,绑定事件
  init(){
    dialog.init()
    home.init()
    login.init()
    detils.init()
    this.route()
    dq('[type=datetime-local]').value = app.time.getbegtime()
    // 语言切换
    // 按钮
    dqa('#header li').forEach(obj=>{
      obj.onclick = function(){
        // dq('#header span').innerHTML = this.innerHTML
        app.lang.changeLang(this.title)
      }
    })
  },
  // 根据地址来显示相就页面
  route(){
    if(/user$/.test(window.location.pathname)){
      dqa('.home button')[0].onclick()
    }else if(/keeper$/.test(window.location.pathname)){
      dqa('.home button')[1].onclick()
    }else if(/provider$/.test(window.location.pathname)){
      dqa('.home button')[2].onclick()
    }else if(/miner$/.test(window.location.pathname)){
      dqa('.home button')[3].onclick()
    }
    // 用来解决切换时的显示问题
    dq('#loading').style.display = 'none'
  },
}

export default page