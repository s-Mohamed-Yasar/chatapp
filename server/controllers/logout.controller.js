const Logout = (req, res) => {
  res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
  res.json({ message: "user logout successfully" });
};
export default Logout;
