import React, {useState} from 'react'
import Input from "../components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Register() {
    const [registerInputs, setRegisterInputs] = useState({
        name: "",
        userName: "",
        email: "",
        password: "",
        gender: "boy",
    });
  const navigate = useNavigate();
  

  function handleChange(event) {
    const { name, value } = event.target;

    setRegisterInputs((preValue) => {
      return { ...preValue, [name]: value };
    });
    
  }

    async function handleSubmit(event){
        event.preventDefault()

        try {
            const response = await axios.post(
              `${import.meta.env.VITE_API_URL}/user/register`,
              registerInputs
            );
          console.log(response.data)
          if (response.data.success) {
            localStorage.setItem("user-id", response.data.userId);
            navigate("/");
          }
        } catch (error) {
            console.log(error)
        }
        //console.log(registerInputs);
    }
  
  return (
    <div className="auth-top">
      <div className="login">
        <h2>user Register</h2>

        <form onSubmit={handleSubmit} >
          <div className="auth-input">
            <Input
              changing={handleChange}
              value={registerInputs.name}
              name="name"
              placeholder="Name"
            />
            <Input
              changing={handleChange}
              value={registerInputs.userName}
              name="userName"
              placeholder="UserName"
            />

            <Input
              changing={handleChange}
              value={registerInputs.email}
              name="email"
              placeholder="Email"
            />
            <Input
              changing={handleChange}
              value={registerInputs.password}
              name="password"
              placeholder="Password"
            />

            <div className="auth-input">
              <label id="gen">Gender</label>
              <select
                id="dropdown"
                name="gender"
                value={registerInputs.gender}
                onChange={handleChange}
              >
                <option value="boy">Boy</option>
                <option value="girl">Girl</option>
              </select>
            </div>
          </div>
          <div className="auth-btn">
            <button type='submit' >sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register