import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react'

const socket = io.connect("http://localhost:3001")

function App() {
  const [message, setMessage] = useState('')
  const [messageRecieved, setMessageRecieved] = useState('')
  const [room, setRoom] = useState('')

  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room)
    }
  }

  const sendMessage = () => {
    socket.emit('send_message', { message, room })
  }

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setMessageRecieved(data)
    })
  }, [socket])


  return (
    <div className="App">
      <input placeholder='Room' onChange={(e) => { setRoom(e.target.value) }} />
      <button onClick={joinRoom}>Submit room</button>
      <input placeholder='Message' onChange={(e) => { setMessage(e.target.value) }} />
      <button onClick={sendMessage}>Send message</button>
      <h1>Message:</h1>
      {messageRecieved}
    </div>
  );
}

export default App;
