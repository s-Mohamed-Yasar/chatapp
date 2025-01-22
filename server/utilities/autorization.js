import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {

  console.log(req.cookies.jwt);
  
  //const token = req.cookies.jwt;
  //console.log(token)
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
    //console.log(token);
  
    res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: true
  
  });
 
  
};

export { verifyToken, createToken };
