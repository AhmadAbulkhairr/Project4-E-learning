
const User = require ("../models/UserSchema")

const twilio = require('twilio');

const accountSid = 'ACc5265e7684f3261db4d6b6e077621e36';
const authToken = 'f71e3d4fb28e7f4161fc57bce29e4c2d';
const client = twilio(accountSid, authToken);

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
  
      await client.messages.create({
        body: `Your verification code for password recovery is ${verificationCode}`,
        to: user.phoneNumber,  
        from: '++12084719630'
      });
  
      res.status(200).json({ message: 'Verification code sent successfully' });
    } catch (error) {
      console.error('Password recovery error:', error);
      res.status(500).json({ message: 'Failed to send verification code' });
    }
}

const resetPassword = async (req, res) => {
    const { email, verificationCode, newPassword } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Validate the verification code
      if (user.passwordResetCode !== verificationCode) {
        return res.status(400).json({ message: 'Invalid verification code' });
      }
  
      user.password = newPassword;
      user.passwordResetCode = undefined;
      
      user.password = await bcrypt.hash(newPassword, 8);
  
      await user.save();
  
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ message: 'Failed to reset password' });
    }
  };

module.exports = {passwordREcovery,resetPassword}