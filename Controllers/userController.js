const users = require("../Models/userModal");
const jwt = require('jsonwebtoken')
const jwtPassword = process.env.JWT_SECRET
//register
exports.register = async (req, res) => {
  console.log("inside register request");
  const { username, email, password } = req.body;
  console.log(username, email, password);
  try {
    //check email is present db or not
    const existingUser = await users.findOne({ email });
    // if email is present then ixisting user
    if (existingUser) {
      res.status(400).json("user already exist");
    } else {
      //else store / insert data to db
      const newUser = new users({
        username,
        email,
        password,
        github: "",
        linkedIn: "",
        profile: "",
      });
      //to store data mongodb from mongoose model
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (e) {
    res.status(401).json(e);
  }
  res.end();
};

//login
exports.login = async (req, res) => {
  console.log("inside login request");
  const { email, password } = req.body;
  console.log(email, password);
  try {
    //check email is present db or not
    const existingUser = await users.findOne({ email, password });
    if(existingUser){
        const token = jwt.sign({userId:existingUser._id},jwtPassword)
        res.status(200).json({
            existingUser,
            token
        })
    }else{
        res.status(400).json("Incorrect email / password");
    }
  } catch (e) {
    console.log(e);
  }
};

exports.editUser = async (req, res) => {
  console.log("inside edit user");
  const userId = req.payload;
  const { username, email, password, github, linkedIn, profileImage } = req.body;
  const profile = req.file ? req.file.filename : profileImage;

  try {
    const updatedUser = await users.findByIdAndUpdate(
      { _id: userId },
      {
        username,
        email,
        password,
        github,
        linkedIn,
        profile,
      },
      { new: true } // Ensures the updated document is returned
    );
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(401).json(e);
  }
};

