const socket = io('/')
const videoGrid = document.getElementById('video-grid')
let message_input = document.querySelector("input")
let send_message = document.getElementById("send_message")

send_message.addEventListener("click",(e)=>{
  let value = message_input.value
  if(value!="" || value!=null){
    socket.emit("user_message",ROOM_ID,value)
    message_input.value = ""
  }
})


const myPeer = new Peer(undefined,{
  host:"shivamzoom.herokuapp.com",
  
})

const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)

  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })

  socket.on('user-connected', userId => {
    connectToNewUser(userId, stream)
  })
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

socket.on("send-message",(message)=>{
  console.log(message)
  const div = document.createElement("div")
  div.className = "message_box"
  div.innerText = message
  document.querySelector(".message_data").appendChild(div)
})

myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}