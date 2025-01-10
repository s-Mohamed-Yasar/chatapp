import User from "../db/user.schema.js";
import bcrypt from "bcrypt";
import { createToken } from "../utilities/autorization.js";

const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email.trim() || !password.trim())
      return res.json({
        message: "kindly fill all the fields with valid cridencials",
      });
    let user = await User.findOne({ email });

    if (user == null)
      return res.json({
        message: "Email you have inserted is wrong",
      });

    const valid_pass = await bcrypt.compare(password.trim(), user["password"]);
    if (!valid_pass)
      return res.json({
        message: "Password you have inserted is wrong",
      });

    user.password = undefined;

    createToken(user, res);

    res.json({ message: "Welcome to main page " });
  } catch (error) {
    res.json(error.message);
  }
};

export default Login;
