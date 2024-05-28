import {  useState } from "react"
import { useAuth } from "../context/AuthProvider"
import { useNavigate } from "react-router";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const {loginAction} = useAuth();

  async function handleLogin (e){
    e.preventDefault()
    try {
      await loginAction(input)
      navigate("/")
    } catch (error) {
      console.log(error.message)
    }
  }

  function handleInput(e){
    const {name, value} = e.target;
    setInput((prev)=>({
      ...prev,
      [name]: value
    }))
  }

  return (
    <>
      <input type="email" name="email" id="email" onChange={handleInput} />
      <input type="password" name="password" id="password" onChange={handleInput} />
      <button type="submit" onClick={handleLogin}>Login</button>
    </>
  )
}
