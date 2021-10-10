
let audioCall = true
let videoCall = true

// All custom function
let audio_s = document.getElementById("audio_s")
let video_s = document.getElementById("video_s")
let chat_s = document.getElementById("chat_s")
let message = document.querySelector(".message")
let message_close = document.querySelector(".message_close")

chat_s.addEventListener("click",()=>{
    message.style.display = "flex"
    message.style.transform = "translateY(0)"
})
message_close.addEventListener("click",()=>{
    message.style.display = "none"
    message.style.transform = "translateY(400%)"
})

audio_s.addEventListener("click",(e)=>{
  let img = audio_s.querySelector("img")
  if(audioCall){
    audioCall = false
    img.src = "/img/mute-removebg-preview.png"
  }else{
    audioCall = true
    img.src = "/img/unmute-removebg-preview.png"
  }
})

video_s.addEventListener("click",(e)=>{
  let img =video_s.querySelector("img")
  if(videoCall){
    videoCall = false
    img.src = "/img/video-removebg-preview.png"
  }else{
    videoCall = true
    
    img.src = "/img/no_video-removebg-preview.png"
  }
})
