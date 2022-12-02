import "./login.css";
import { useRef, useContext } from "react"
import {loginCall} from "../../apiCalls"
import {AuthContext} from "../../context/AuthContext"
import { CircularProgress } from "@mui/material";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const {user,isFetching, error, dispatch} = useContext(AuthContext)

  const handleClick = (e) =>  {
    e.preventDefault()
    loginCall({email: email.current.value,password: password.current.value},dispatch )
  }
    
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">PakSocial</h3>
          <span className="loginDesc">
            Connect with friends around Pakistan!.
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleClick} className="loginBox">
            <input placeholder="Email" type="email" required className="loginInput" ref = {email}/>
            <input 
            placeholder="Password"
            type="password"
            required 
            minLength="6"
            className="loginInput"
             />
            <button className="loginButton">{isFetching ? <CircularProgress color="white" size="20px" /> : "LogIn"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a New Account
            </button>
            </form>
        </div>
      </div>
    </div>
  );
}