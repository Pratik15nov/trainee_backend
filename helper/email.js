const nodeMailer = require("nodemailer");
const CONFIG = require("../config/config");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: CONFIG.email.EMAILUSERNAME,
    pass: CONFIG.email.EMAILPASSWORD,
  },
  // host: CONFIG.email.SMTP,
  // port: CONFIG.email.SMTP_PORT,
  // secure: false,
  // auth: {
  //   user: CONFIG.email.EMAILUSERNAME,
  //   pass: CONFIG.email.EMAILPASSWORD,
  // },
});

module.exports = {
  sendForVeriy: async (body) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.welcome,
      text: `   
    Hi ${body.firstName},
        Thank you for choosing us.
        We are warmly welcome you to our family
Please Verify using the link:- ${CONFIG.BASEURL}/api/v1/user/verify/${body._id}
    Regards,
    ECOM
`,
    };
    try {
      const sendedMail = await transporter.sendMail(mailOptions);
      if (sendedMail.response) {
        return {
          successMail: true,
          messageMail: "Mail sended",
        };
      } else {
        return {
          successMail: false,
          messageMail: "EMAIL NOT SENT",
        };
      }
    } catch (error) {
      return { successMail: false, messageMail: "ERROR HAPPEND IN SEND MAIl" };
    }
  },
};
