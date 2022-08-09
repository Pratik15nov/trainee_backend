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
  sendForEmailUpdate: async (body) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.email_Changed,
      text: `   
    Hi ${body.firstName},
        Thank you for choosing us.
       Your email has been updated 
Please Verify your account using the link:- ${CONFIG.BASEURL}/api/v1/user/verify/${body._id}
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
  sendForPasswordUpdate: async (body) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.password_Changed,
      text: `   
    Hi ${body.firstName},
        Please Change your password using below link
        Link:- https://ecommercefa.netlify.app/forgotPasword?uid=${body._id}
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
  sendForPasswordUpdateSuccess: async (body) => {
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: body.email,
      subject: CONFIG.emailSubject.password_Changed,
      text: `   
    Hi ${body.firstName},
    Your password has been changed successfully
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

  sendOrderSuccess: async (body, response) => {
    console.log("RESPONSE", response.cartdetail);
    // to: response.userId.email,
    let mailOptions = {
      from: CONFIG.email.SENDMAILFROM,
      to: "vanshpanchal09@gmail.com",
      subject: CONFIG.emailSubject.order_confirmation,
      html: `<html><head>
      <!-- Meta Tags -->
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="author" content="ThemeMarch">
      <!-- Site Title -->
      <title>General Invoice</title>
      <link rel="stylesheet" href="style.css">
    </head>
    
    <body>
      <div class="cs-container">
        <div class="cs-invoice cs-style1">
          <div class="cs-invoice_in" id="download_section">
            <div class="cs-invoice_head cs-type1 cs-mb25">
              <div class="cs-invoice_left">
              <p class="cs-invoice_date cs-primary_color cs-m0"><b class="cs-primary_color">Date: </b>${
                response.createdAt
              }</p>
                <p class="cs-invoice_number cs-primary_color cs-mb5 cs-f16"><b class="cs-primary_color">PaymentId:</b>${
                  response.paymentId
                }</p>
                <p class="cs-invoice_number cs-primary_color cs-mb5 cs-f16"><b class="cs-primary_color">Promo-code used:</b>${
                  response.promocodeId.couponcode
                }</p>
                <p class="cs-invoice_number cs-primary_color cs-mb5 cs-f16"><b class="cs-primary_color">Order-Status:</b>${
                  response.orderStatus
                }</p>
                
              </div>
              <div class="cs-invoice_right cs-text_right">
                <div class="cs-logo cs-mb5"><img src="https://ecommercefa.netlify.app/images/logo.png" alt="Logo"></div>
              </div>
            </div>
            <div class="cs-invoice_head cs-mb10">
              <div class="cs-invoice_left">
                <b class="cs-primary_color">Invoice To:</b>
                <p>Phone no: <b>${response.userId.phoneNumber}</b></p>
                <p>
                   Address-type: ${response.addressId.type}<br>
                  ${
                    response.userId.firstName + " " + response.userId.lastName
                  } <br>
                  ${response.addressId.address_1}<br>
                  ${response.addressId.landmark}<br>
                  ${response.addressId.pincode}
                 <br>
                  pincode
                </p>
              </div>
              <div class="cs-invoice_right cs-text_right">
                <b class="cs-primary_color">Pay To:</b>
                <p>Phone no: <b>+91 79-46006836</b></p>
                <p>
                 Shoppy <br>
                 804, Fortune Business Hub, <br>
                 Ahmedabad, Gujarat. 380060<br>
                  frontendarmy.com
                </p>
              </div>
            </div>
            <div class="cs-table cs-style1">
              <div class="cs-round_border">
                <div class="cs-table_responsive">
                  <table>
                    <thead>
                      <tr>
                        <th class="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">Product Name</th>
                        <th class="cs-width_4 cs-semi_bold cs-primary_color cs-focus_bg">Specification</th>
                        <th class="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg">Qty</th>
                        <th class="cs-width_1 cs-semi_bold cs-primary_color cs-focus_bg">Price</th>
                        <th class="cs-width_2 cs-semi_bold cs-primary_color cs-focus_bg cs-text_right">Discount</th>
                      </tr>
                    </thead>
                    <tbody>
                    ${response.cartdetail.forEach(
                      (value) =>
                        `<tr>
                        <td class="cs-width_3">${value.productId.name}</td>
                       <td class="cs-width_4">
                         ${value.productId.specification}
                       </td>
                       <td class="cs-width_2">${value.quantity}</td>
                       <td class="cs-width_1">${value.productId.price}</td>
                       <td class="cs-width_2 cs-text_right">
                         ${value.productId.discountPrice}
                       </td>
                       </tr>`
                    )}
                    </tbody>
                  </table>
                </div>
                <div class="cs-invoice_footer cs-border_top">
                  <div class="cs-left_footer cs-mobile_hide">
                    <p class="cs-mb0"><b class="cs-primary_color">Additional Information:</b></p>
                    <p class="cs-m0">At check in you may need to present the credit <br>card used for payment of this ticket.</p>
                  </div>
                  <div class="cs-right_footer">
                    <table>
                      <tbody>
                        <tr class="cs-border_left">
                          <td class="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">Subtoal</td>
                          <td class="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right">$1140</td>
                        </tr>
                        <tr class="cs-border_left">
                          <td class="cs-width_3 cs-semi_bold cs-primary_color cs-focus_bg">Tax</td>
                          <td class="cs-width_3 cs-semi_bold cs-focus_bg cs-primary_color cs-text_right">-$20</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="cs-invoice_footer">
                <div class="cs-left_footer cs-mobile_hide"></div>
                <div class="cs-right_footer">
                  <table>
                    <tbody>
                      <tr class="cs-border_none">
                        <td class="cs-width_3 cs-border_top_0 cs-bold cs-f16 cs-primary_color">Total Amount</td>
                        <td class="cs-width_3 cs-border_top_0 cs-bold cs-f16 cs-primary_color cs-text_right">${
                          response.totalPrice
                        }</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="cs-note">
              // <div class="cs-note_left">
              //   <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M416 221.25V416a48 48 0 01-48 48H144a48 48 0 01-48-48V96a48 48 0 0148-48h98.75a32 32 0 0122.62 9.37l141.26 141.26a32 32 0 019.37 22.62z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"></path><path d="M256 56v120a32 32 0 0032 32h120M176 288h160M176 368h160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path></svg>
              // </div>
              <div class="cs-note_right">
                <p class="cs-mb0"><b class="cs-primary_color cs-bold">Note:</b></p>
                <p class="cs-m0">Here we can write a additional notes for the client to get a better understanding of this invoice.</p>
              </div>
            </div><!-- .cs-note -->
          </div>
          <div class="cs-invoice_btns cs-hide_print">
            <a href="javascript:window.print()" class="cs-invoice_btn cs-color1">
              <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M384 368h24a40.12 40.12 0 0040-40V168a40.12 40.12 0 00-40-40H104a40.12 40.12 0 00-40 40v160a40.12 40.12 0 0040 40h24" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"></path><rect x="128" y="240" width="256" height="208" rx="24.32" ry="24.32" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"></rect><path d="M384 128v-24a40.12 40.12 0 00-40-40H168a40.12 40.12 0 00-40 40v24" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32"></path><circle cx="392" cy="184" r="24"></circle></svg>
              <span>Print</span>
            </a>
            <button id="download_btn" class="cs-invoice_btn cs-color2">
              <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Download</title><path d="M336 176h40a40 40 0 0140 40v208a40 40 0 01-40 40H136a40 40 0 01-40-40V216a40 40 0 0140-40h40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M176 272l80 80 80-80M256 48v288"></path></svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
      <script src="assets/js/jquery.min.js"></script>
      <script src="assets/js/jspdf.min.js"></script>
      <script src="assets/js/html2canvas.min.js"></script>
      <script src="assets/js/main.js"></script>
    
    </body></html>  `,
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
