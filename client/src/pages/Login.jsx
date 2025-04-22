import React, { useState } from "react";
import Input from "../components/Input";
import axios from "axios"
import { useNavigate } from "react-router-dom";


function Login() {
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target;

    setLoginInputs((preValue) => {
      return { ...preValue, [name]: value };
    });
    
  }
  async function handleSubmit(event){
    
    event.preventDefault()
    
      const response =  await axios.post(
        "http://localhost:3000/user/login",
        loginInputs,{withCredentials: true}
      );
    console.log(response.data);
    if (response.data.success) { 
      localStorage.setItem("user-id", response.data.userId);
      navigate("/")
      window.location.reload()
    }
  }

  return (
    <div className="auth-top">
      <div className="login">
        <form onSubmit={handleSubmit} >
          <h2>login</h2>
          <div className="auth-input">
            <Input
              changing={handleChange}
              value={loginInputs.email}
              name="email"
              placeholder="Email"
            />
            <Input
              changing={handleChange}
              value={loginInputs.password}
              name="password"
              placeholder="Password"
            />
          </div>
          <div className="auth-btn">
            <button type="submit" >sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
