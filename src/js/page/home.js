let css = app.css

let home = {
  init(){
    let btn = dqa('.home button')
    for(let i=0; i<btn.length; i++){
      btn[i].onclick = function(){
        dq('.login>div:first-child span').innerHTML = this.innerHTML
        css.convertRemoveClassByGroup(dqa('#main>div'),1,'hide')
      }
    }
  },
}

export default home