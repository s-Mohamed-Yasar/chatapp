import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {

  
  const token = req.cookies.jwtToken;
  //console.log(token)
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, "SECRET_KEY", (err, user) => {
    if (err) {
      res.json({ error: err.message });
    } // Forbidden}
    req.user = user;
    //console.log(req.user);
    
    next();
  });
};
const createToken = (userId, res) => {
    const token = jwt.sign({ userId }, "SECRET_KEY", { expiresIn: "1h" });
    console.log(token);
  
    res.cookie("jwtToken", token, {
    maxAge: 1000 * 60 * 60,
    sameSite: "Strict",
    secure: false,

  
  });
 
  
};

export { verifyToken, createToken };
