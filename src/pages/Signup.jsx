import React, { useState } from "react";
import axios from "axios";
import { BottomWarning } from "../Components/BottomWarning";
import { Button } from "../Components/Button";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";
import { useNavigate } from "react-router-dom";
import { PasswordBox } from "../Components/PasswordBox";

export const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
     const response = await axios.post("https://litepay-backend.onrender.com/api/v1/user/signup", {
        firstName,
        lastName,
        username,
        password,
    });
    localStorage.setItem("token" , response.data.token) 
    if(response.data.token){

        navigate("/dashboard")
    }
      
    } catch (error) {
        console.error("Error signing up:", error); 
        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            setError("An error occurred during signup. Please try again later.");
        }
    }
  };

  return (
    <div className="bg-lime-50 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <h2 className="text-green-600 font-medium pl-28 pb-16 text-4xl">Litepay</h2>
        <div className="rounded-lg bg-white w-90 text-center p-8 h-max px-4 shadow-lg">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          {error && <div className="text-red-500">{error}</div>}
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            placeholder="Firstname"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            placeholder="Lastname"
            label={"Last Name"}
          />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="example@gmail.com"
            label={"Email"}
          />
          <PasswordBox
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="******"
            label={"Password(Min 6 char)"}
          />
          <div className="pt-4">
            <Button onClick={handleSignup} label={"Sign up"} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
