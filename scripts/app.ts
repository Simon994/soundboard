function init() {

  

  const keyboardMode = document.querySelector('#keyboard')
  const mouseMode = document.querySelector('#mouse')
  const btns = document.querySelectorAll('.btn')

  keyboardMode?.addEventListener('click', runKeyboardMode)
  mouseMode.addEventListener('click', runMouseMode)
  let mode
  let hue = 0

  function modeToggle(modeTarget){
    modeTarget.classList.toggle('mode-active')
    mode = `${modeTarget.id}`
  }

  function runKeyboardMode(){
    if (!mouseMode.classList.contains('mode-active')){
      modeToggle(keyboardMode)
    } else {
      modeToggle(mouseMode)
      modeToggle(keyboardMode)
    }
    if (keyboardMode.classList.contains('mode-active')){
      window.addEventListener('keydown', playClip)
    } else {
      window.removeEventListener('keydown', playClip)
    }
  }

  function runMouseMode(){
    if (!keyboardMode.classList.contains('mode-active')){
      modeToggle(mouseMode)
    } else {
      modeToggle(keyboardMode)
      modeToggle(mouseMode)
    }
    if (mouseMode.classList.contains('mode-active')){
      btns.forEach(button => {
        button.addEventListener('mouseenter', playClip)
      })
    } else {
      btns.forEach(button => {
        button.removeEventListener('mouseenter', playClip)
      })
    }
  }  

  function playClip(event){
    let audioToPlay = null
    if (mode === 'keyboard') {
      audioToPlay = document.querySelector(`audio[data-code="${event.code}"]`)
    } 
    if (mode === 'mouse') {
      audioToPlay = document.querySelector(`audio[data-code="${event.target.dataset.code}"]`)
    }
    if (audioToPlay === null) return
    audioToPlay.play()
    audioToPlay.currentTime = 0
    pulseOnPlay(event)
  }

  function pulseOnPlay(event){
    let btnToPulse = null
    if (mode === 'keyboard'){
      btnToPulse = document.querySelector(`div[data-code="${event.code}"]`)
    } else if (mode === 'mouse') {
      btnToPulse = document.querySelector(`div[data-code="${event.target.dataset.code}"]`)
    }
    btnToPulse.classList.add('pulse')
    hue += 25

    btnToPulse.style.borderColor = `hsl(${hue}, 100%, 50%)`
    btnToPulse.style.boxShadow = `0 10px 10px hsl(${hue}, 100%, 50%)`
    setTimeout(function () {
      btnToPulse.classList.remove('pulse')
      btnToPulse.style.borderColor = 'hsl(0, 100%, 0%)'
      btnToPulse.style.boxShadow = 'none'
    }, 300)
  }



}

window.addEventListener('DOMContentLoaded', init)
