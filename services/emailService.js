import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_AUTH_USER,
    pass: process.env.SMTP_AUTH_PASS,
  },
});

export const sendVerificationEmail = async (email, verificationToken) => {
  const verificationLink = `${process.env.BASE_URL || 'http://localhost:3000'}/api/auth/verify/${verificationToken}`;
  
  const mailOptions = {
    from: process.env.SMTP_AUTH_USER,
    to: email,
    subject: "Email Verification",
    html: `
      <h1>Email Verification</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationLink}">${verificationLink}</a>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
