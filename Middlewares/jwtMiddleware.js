const jwt = require("jsonwebtoken");
const jwtMiddlware = (req, res, next) => {
  //steps to verify token
  console.log("inside jwt middlware");
  const token = req.headers["authorization"].split(" ")[1];
  if (token) {
    console.log(token);
    try {
      const jwtResponse = jwt.verify(token, process.env.JWT_SECRET);
      console.log(jwtResponse);
      req.payload = jwtResponse.userId
      next();
    } catch (e) {
      res.status(401).json("Authorization failed please login !!")
    }
  } else {
    res.status(406).json("please provide a valid token");
  }
};
module.exports = jwtMiddlware;
