export function attachTriggers(btn, cb){
        btn.addEventListener("click", ()=>{
          cb()
      })
  }