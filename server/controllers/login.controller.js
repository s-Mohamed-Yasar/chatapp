import User from "../db/user.schema.js";
import bcrypt from "bcryptjs";
import { createToken } from "../utilities/autorization.js";


const Login = async (req, res) => {
  const token = req.cookies.jwt; 
  
  const { email, password } = req.body;
  try {
    if (!email.trim() || !password.trim())
      return res.json({
        success: false,
        message: "kindly fill all the fields with valid cridencials",
      });
    let user = await User.findOne({ email });

    if (user == null)
      return res.json({
        success: false,
        message: "Email you have inserted is wrong",
      });

    const valid_pass = await bcrypt.compare(password.trim(), user["password"]);
    if (!valid_pass)
      return res.json({
        success: false,
        message: "Password you have inserted is wrong",
      });

    user.password = undefined;
      console.log(user);
      
    createToken(user, res);

    return res.json({
      status: 200,
      success: true,
      message: "Welcome to main page ",
      userId: user?._id
    });
  } catch (error) {
    res.json(error.message);
    
  }
};

export default Login;
