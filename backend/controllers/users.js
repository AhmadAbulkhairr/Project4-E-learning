const usersModel = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const Role = require("../models/RoleSchema")

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
console.log(client);
const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log(ticket);
    const { name, email } = ticket.getPayload();

    let user = await usersModel.findOne({ email });
    if (!user) {
      const studentRole = await Role.findOne({ role: 'Student' });
      if (!studentRole) {
        return res.status(404).json({ success: false, message: 'Student role not found' });
      }

      user = new usersModel({ name, email, role: studentRole._id });
      await user.save();
      console.log(user);

    }
console.log(user);
    const payload = {
      userId: user._id,
      user: user.name,
      role: user.role,
    };

    const authToken = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });

    let result = await usersModel.findOne({ email }).populate("role", "-_id -__v")
    
    res.status(200).json({
      success: true,
      token: authToken,
      role: result.role,
      user: user.name,
      userID:result._id
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Google login failed',
      error: error.message,
    });
  }
};

const register = (req, res) => {
    const { name,
        email,
        password,phoneNumber
        } = req.body;

        if (!name || !email || !password ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
    
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long",
            });
        }

    const user = new usersModel({name,
        email,
        password,phoneNumber,
role:"6664a1c3749506adedc47b0e"    });
  
    user
      .save()
      .then((result) => {
        res.status(201).json({
          success: true,
          message: `Account Created Successfully`,
          student: result,
        });
      })
      .catch((err) => {
        if (err.keyPattern) {
          return res.status(409).json({
            success: false,
            message: `The email already exists`,
          });
        }
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };

  const login = (req, res) => {
    const password = req.body.password;
    const email = req.body.email.toLowerCase();
    usersModel
      .findOne({ email })
      .populate("role", "-_id -__v")
      .then(async (result) => {
        if (!result) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        try {
          console.log(password);
          const valid = await bcrypt.compare(password, result.password);
          if (!valid) {
            return res.status(403).json({
              success: false,
              message: `The email doesn't exist or The password you’ve entered is incorrect`,
            });
          }
          const payload = {
            userId: result._id,
            user: result.name,
            role: result.role,
          };
  
          const token = jwt.sign(payload, process.env.SECRET);
          res.status(200).json({
            success: true,
            message: `Valid login credentials`,
            token: token,
            role: result.role,
            user: result.name,
            userID:result._id
          });
        } catch (error) {
          throw new Error(error.message);
        }
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      });
  };
  

  const userInfo = async (req,res) => {
    const userId = req.token.userId

try {

   const user = await usersModel.findById(userId)

   res.status(200).json({
    success: true,
    message: `user Info`,
    user: user,
   })

}
catch(err){
    res.status(500).json({

    success: false,
    message: `Server Error`,
    err: err.message,
    })
}
  }







  
module.exports = {
    register,
    login,
    userInfo,googleLogin
  };
  