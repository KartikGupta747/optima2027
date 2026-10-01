const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nishant.mishra1.iitkgp@gmail.com",
    pass: "paix wroh hzgw jbak",
  },
});

const sendOTP = async (email, otp, purpose) => {
  const subject =
    purpose === "registration"
      ? "Email Verification OTP"
      : "Password Reset OTP";

  const mailOptions = {
    from: "nishant.mishra1.iitkgp@gmail.com",
    to: email,
    subject: subject,
    text: `Your OTP for ${purpose} is: ${otp}. This OTP will expire in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOTP };
