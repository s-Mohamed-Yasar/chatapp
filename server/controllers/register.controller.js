import User from "../db/user.schema.js";
import * as EmailValidator from "email-validator";
import bcrypt from "bcryptjs";
import { createToken } from "../utilities/autorization.js";

const Register = async (req, res) => {
  const { name, userName, email, password, gender } = req.body;

  if (
    !name.trim() ||
    !userName.trim() ||
    !email.trim() ||
    !password.trim() ||
    !gender.trim()
  )
    return res.json({
      success: false,
      message: "kindly fill all the fields with valid data",
    });

  const validEmail = EmailValidator.validate(email);
  if (!validEmail) {
    return res.json({
      success: false,
      massage: "email you have inserted isn't valid",
    });
  }

  const is_new_email = await User.findOne({ email: email.trim() });
  if (is_new_email != null) {
    return res.json({
      success: false,
      message: "This email already registered in database",
    });
  }

  const is_new_userName = await User.findOne({ userName: userName.trim() });
  if (is_new_userName != null) {
    return res.json({
      success: false,
      message: "This user name already registered in database",
    });
  }

  if (password.trim().length <= 6) {
    return res.json({
      success: false,
      message: "password length should be above six digit",
    });
  }
  const saltRound = 10;
  const hasedPass = await bcrypt.hash(password.trim(), saltRound);

  const profileUrl = `https://avatar.iran.liara.run/public/${gender}?username=${userName}`;

  try {
    let user = new User({
      name: name.trim(),
      userName: userName.trim(),
      email: email.trim(),
      password: hasedPass,
      gender: gender,
      profilePic: profileUrl,
    });

    await user.save();
    user.password = undefined;
    createToken(user, res);

    return res.json({
      status: 201,
      success: true,
      message: "user have create successfully",
      userId: user?._id,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export default Register;
