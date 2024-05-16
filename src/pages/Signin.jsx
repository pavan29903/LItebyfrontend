import { useState } from "react"
import { BottomWarning } from "../Components/BottomWarning"
import { Button } from "../Components/Button"
import { Heading } from "../Components/Heading"
import { InputBox } from "../Components/InputBox"
import { SubHeading } from "../Components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { PasswordBox } from "../Components/PasswordBox"

export const Signin = () => {
    const navigate  = useNavigate();
    const [username, setUsername] = useState("")
    const [password , setPassword] = useState("")

    const handleSignin = async ()=>{
        
            const response =await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password

            })
            localStorage.setItem("token" , response.data.token)
            if(response.data.token){
                navigate("/dashboard")
            }
              
    }
    return <div className="bg-lime-50 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-90 text-center p-8 h-max px-4 shadow-lg">
        <Heading label={"Sign In"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e=>{
            setUsername(e.target.value)

        }} placeholder="example@gmail.com" label={"Email"} />
        <PasswordBox onChange={e=>{
            setPassword(e.target.value)
        }} placeholder="******" label={"Password"} />
        <div className="pt-4">
          <Button onClick={handleSignin} label={"Sign In"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />
      </div>
    </div>
  </div>
}