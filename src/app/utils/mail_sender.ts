import nodemailer from 'nodemailer';
import { configs } from '../configs';
type TMailContent = {
    to: string,
    subject: string,
    textBody: string,
    htmlBody: string,
    name?: string
}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: configs.email.app_email!,
        pass: configs.email.app_password!,
    },
});

// ✅ Email Sender Function
const sendMail = async (payload: TMailContent) => {
    const info = await transporter.sendMail({
        from: 'info@digitalcreditai.com',
        to: payload.to,
        subject: payload.subject,
        text: payload.textBody,
        html: `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Welcome Email</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* Fallback styles for unsupported clients (some email clients ignore <style> tags) */
        @media only screen and (max-width: 600px) {
            .container {
                padding: 20px !important;
            }

            .btn {
                padding: 12px 18px !important;
                font-size: 16px !important;
            }
        }
    </style>
</head>

<body
    style="margin: 0; padding: 0;  font-family: Arial, sans-serif;">

    <div style="max-width: 600px; margin: 40px auto; background-color: #f4f4f4; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);"
        class="container">

        <div style="font-size: 16px; color: #555555; line-height: 1.6;">
            <p style="margin-bottom: 30px;">Hi <strong>${payload?.name || ""}</strong>,</p>

            ${payload?.htmlBody}

            <div
                style=" margin-top: 60px; text-align: center;">
                
                    <img style="width: 50px; height: 50px; border-radius: 50%;"
                        src="https://imgs.search.brave.com/IZoN38NQxnIIuB1I9E70bW6q5OvbEtz68YaxTe1j-o0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9lbGVt/ZW50cy1yZXNpemVk/LmVudmF0b3VzZXJj/b250ZW50LmNvbS9l/bGVtZW50cy1jb3Zl/ci1pbWFnZXMvMjhi/NmVjMTQtMGMwOS00/NGY1LWE5NGUtNmIy/OTM5NTZkMDM2P3c9/NDMzJmNmX2ZpdD1z/Y2FsZS1kb3duJnE9/ODUmZm9ybWF0PWF1/dG8mcz04Mjc0OWYy/ZDUyMmJiM2NlMjNi/OWNhNjhlZmFhNjdk/MTg5OGI4NWIwNzBh/MjQ1NjM4NmI1ZmFj/NWVmNmM5ZTNl"
                        alt="">
               
                <p style="font-size: 12px;">The Support Team</p>
                <h3>Company Name</h3>
            </div>
        </div>
        <p style="font-size: 14px; color: #999999; margin-top: 20px; margin-bottom: 10px; text-align: center;">
            This is an automated message — please do not reply to this email.
            <br>
            If you need assistance, feel free to contact our support team.
            <br><br>
            Thank you for choosing us!
        </p>

        <hr>
        <div style="text-align: center; font-size: 12px; color: #999999; margin-top: 20px;">
            &copy; {{year}} Your Company. All rights reserved.
        </div>

    </div>
</body>

</html>
        
        `,
    });
    return info
};

export default sendMail;
