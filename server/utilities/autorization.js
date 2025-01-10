import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token)
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, "SECRET_KEY", (err, user) => {
    if (err) {
      res.json({ error: err.message });
    } // Forbidden}
    req.user = user;
    next();
  });
};
const createToken = (userId, res) => {
  const token = jwt.sign({ userId }, "SECRET_KEY", { expiresIn: "1h" });
  
  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure:ture
  });
};

export { verifyToken, createToken };
