let css = app.css,
account = app.account,
dialog,acc,detils

class Login {
  constructor(_acc){
    acc = _acc
  }
  // 跳转到内容页面
  toDetils(){
    // 判断当前选则了哪个按钮
    let flag
    let val = dq('.login>div:first-child span').innerHTML
    switch(val){
      case 'USER':flag=1;break;
      case 'PROVIDER':flag=2;break;
      case 'KEEPER':flag=3;break;
      case 'MINER':flag=4;break;
    }
    dq('.details .select ~ span').innerHTML = val
    dq('.select.s1').selectedIndex = flag
    dq('.select.s1').onchange()
    this.input = ''
    detils.acc = acc.address
    css.convertRemoveClassByGroup(dqa('#main>div'),2,'hide')
  }
  init(){
    // 初始化相关对象
    dialog = app.page.dialog
    detils = app.page.detils
    // 四个按钮
    let btn = dqa('.login>div:first-child button')
    for(let i=0; i<btn.length; i++){
      btn[i].onclick = function(){
        css.convertAddClassByGroup(btn,i,'select')
      }
    }
    // 文件选则
    let d2 = dq('.login>div:nth-child(2)')
    let file = d2.querySelector('input[type=file]')
    file.onchange = (function(){
      this.openKeystore(file.files)
    }).bind(this)
    d2.querySelector('button').onclick = function(){
      file.click()
    }
    // 注册登录
    let d3 = dqa('.login>div:nth-child(3) button')
    d3[0].onclick = this.register.bind(this)
    d3[1].onclick = this.login.bind(this)
  }
  get btn(){
    let d3 = dqa('.login>div:nth-child(3) button')
    return {
      get login(){
        return d3[1]
      }
    }
  }
  register(){
    let pwd = this.input
    acc.account = account.createAccount(pwd)
    acc.address = '0x' + acc.account.address
    acc.pk = account.getPrivateKey(acc.account,pwd)
    this.toDetils()
  }
  login(){
    let val = this.input
    if(val.length == 42){
      acc.address = val
      acc.pk = ''
      acc.account = null
    }else if(val.length == 66){
      acc.pk = val
      acc.address = account.privateKeyToAddress(acc.pk.slice(2))
      acc.account = null
    }else{
      dialog.tips(lp(59))
      return
    }
    this.toDetils()
  }
  openKeystore(files){
    let self = this
    if(files.length){
      let file = files[0]
      let reader = new FileReader()
      reader.onload = function(){
        let ks
        try{
          ks = JSON.parse(this.result)
        }catch(err){
          dialog.tips(lp(60))
          return
        }
        // 输入密码
        dialog.show(function(obj){
          obj.innerHTML = `
            <h2>${lp(61)}</h2>
            <input class="input i2" style="margin-top:20px;width:100%;" type="password">
            <div style="margin-top:20px;">
              <button class="button b7">${lp(62)}</button>
              <button class="button b7" style="margin-left:20px;">${lp(63)}</button>
            </div>
          `
          obj.style = 'height:150px;'
          obj.querySelector('button:first-child').onclick = function(){
            // dialog.wait.show()
            let pwd = obj.querySelector('input').value
            try{
              acc.pk = account.getPrivateKey(ks,pwd)
              // dialog.wait.hide()
            }catch(err){
              // dialog.wait.hide()
              dialog.tips(lp(64))
              return
            }
            acc.account = ks
            acc.address = '0x' + acc.account.address
            self.input = acc.pk
            dialog.hide()
            self.btn.login.click()
          }
          obj.querySelector('button:last-child').onclick = function(){
            dialog.hide()
          }
        })
      }
      reader.readAsText(file)
    }
  }
  // 获取输入框中的值
  get input(){
    return dq('.login input[type=password]').value
  }
  set input(val){
    dq('.login input[type=password]').value = val
  }
}

module.exports = Login