import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy, where } from
  "firebase/firestore"
import { auth, db } from "../firebase/config"
import { useEffect, useState } from "react"
import Messages from "../components/Messages"

const ChatPage = ({ room, setRoom }) => {

  const [messages, setMessages] = useState([])

  // sending the messages to database
  const handleSubmit = async (e) => {
    e.preventDefault()

    const messagesCol = collection(db, "messages")

    await addDoc(messagesCol, {
      text: e.target[0].value,
      room,
      author: {
        id: auth.currentUser?.uid,
        name: auth.currentUser?.displayName,
        photo: auth.currentUser?.photoURL,
      },
      createdAt: serverTimestamp(),
    })

    //Reset Form
    e.target.reset()

  }

  // getting the messages from database
  useEffect(() => {

    const messagesCol = collection(db, "messages")

    // filtering settings
    const q = query(messagesCol,where('room',"==", room),orderBy("createdAt","asc"))


    onSnapshot(q, (snapshot) => {
      // temporary array
      const tempMsg = []

      //return docs, acces data, add to array 
      snapshot.docs.forEach((doc) => {
        tempMsg.push(doc.data())
      })
      // add messages to State
      setMessages(tempMsg);
    })
  }, [])

  return (
    <div className="chat-page">
      <header>
        <p>{auth.currentUser?.displayName}</p>
        <p>{room}</p>
        <button onClick={()=>setRoom(null)} className="send">Next Room</button>
      </header>

      <main>
        {messages.map((data, i) =>
          <div>
            <Messages key={i} data={data} />
          </div>)}

      </main>

      <form onSubmit={handleSubmit}>
        <input required
          placeholder="Enter message" type="text" />
        <button className="send">Send</button>
      </form>
    </div>
  )
}

export default ChatPage