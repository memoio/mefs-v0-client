class Dialog {
  constructor(){
  }
  init(){
    this.d1 = dq('#dialog>.dialog.d1')
    this.d2 = dq('#dialog>.dialog.d2')
    let d1 = this.d1
    d1.querySelector('div:first-child').onclick = function(e){
      e.stopPropagation()
    }
    d1.onclick = function(){
      d1.style = ''
    }
  }
  // 显示提示框
  show(callback){
    callback(this.d1.querySelector('div:first-child'))
    this.d1.style = 'display:block'
  }
  // 隐藏提示框
  hide(){
    this.d1.style = ''
    this.d1.querySelector('div:first-child').innerHTML = ''
  }
  tips(msg){
    let d1 = this.d1.querySelector('div:first-child')
    d1.innerHTML = `${msg}`
    d1.style = 'width: auto;min-width: 50vw;height: auto;min-height: 50px;'
    this.d1.style = 'display:block'
  }
  get wait(){
    let self = this
    return {
      show(){
        let d1 = self.d2.querySelector('div:first-child')
        d1.innerHTML = '<i class="fa fa-spinner fa-spin"></i>'
        d1.style = 'font-size: 5rem;height: 7rem;width: 7.5rem;'
        self.d2.style = 'display:block'
      },
      hide(){
        self.d2.style = ''
      }
    }
  }
}

module.exports = new Dialog()