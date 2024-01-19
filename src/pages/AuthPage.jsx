import { useState } from "react"
import { auth, provider } from "../firebase/config"
import { signInWithPopup } from "firebase/auth"

const AuthPage = ({ setIsAuth }) => {

  const handleClick = () => {
    signInWithPopup(auth, provider)
      .then((data) => { 
        setIsAuth(true)
        localStorage.setItem("TOKEN", data.user.refreshToken)
        console.log(data);
      })
  }

  return (
    <div className="main-container">

      <div className="container">
        <h1>Chat room</h1>

        <p>Sign in to continue</p>

        <button className="sign-in" onClick={handleClick}>
          <img src="/g-logo.png" />
          <span >Sign in with Google</span>
        </button>
      </div>
    </div>
  )
}

export default AuthPage