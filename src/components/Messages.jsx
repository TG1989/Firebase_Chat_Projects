import { auth } from "../firebase/config"

const Messages = ({ data }) => {

  if (auth.currentUser?.uid === data.author.id) {
    return <span className='msg-user'>{data.text}</span>
  }

  return (
    <div className="msg-other">
      <p className="user-info">
        <img src={data.author.photo} alt='profile' />
        <span>{data.author.name}</span>
      </p>

      <p className="">{data.text}</p>
    </div>
  )
}





export default Messages