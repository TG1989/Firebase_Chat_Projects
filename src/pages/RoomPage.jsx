const RoomPage = ({ setRoom, setIsAuth }) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    const room = e.target[0].value

    setRoom(room.toUpperCase())
  }


  return (
    <form onSubmit={handleSubmit} className="container">
      <h1>Chat Room</h1>
      <p>Chose your room</p>
      <input placeholder="e.g. Weekend" className="input" type="text" />
      <button className="enter">Enter the room</button>
      <button onClick={() => {
        setIsAuth(false)
        localStorage.removeItem("TOKEN")
      }} className="exit">Exit</button>
    </form>
  )
}

export default RoomPage