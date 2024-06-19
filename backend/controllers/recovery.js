
const User = require ("../models/UserSchema")
const bcrypt = require("bcryptjs");

const twilio = require('twilio');

const accountSid = process.env.ACC_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid,authToken);

const passwordREcovery = async (req,res) => {
    const { email } = req.body;

    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const verificationCode = Math.floor(100000 + Math.random() * 900000);
  
      user.passwordResetCode = verificationCode;
      await user.save();
  console.log(user);
      await client.messages.create({
        body: `Your verification code for password recovery is ${verificationCode}`,
        to: user.phoneNumber,  
        from: '+17792091850'
      });
  
      res.status(200).json({ message: 'Verification code sent successfully' });
    } catch (error) {
      console.error('Password recovery error:', error);
      res.status(500).json({ message: 'Failed to send verification code' });
    }
}

const resetPassword = async (req, res) => {
    const { email, verificationCode, newPassword } = req.body;
  console.log(req.body);
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      console.log(user.passwordResetCode);

      if (user.passwordResetCode !== verificationCode) {
        return res.status(400).json({ message: 'Invalid verification code' });
      }
  
      user.password = newPassword;
      user.passwordResetCode = undefined;
      console.log(user);
  
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ message: 'Failed to reset password' });
    }
  };

module.exports = {passwordREcovery,resetPassword}