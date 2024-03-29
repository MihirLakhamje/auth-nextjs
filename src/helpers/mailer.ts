import bcryptjs from "bcryptjs"
import nodemailer from "nodemailer"
import User from "@/models/userModel"
import { connect } from "@/dbConfig/dbConfig";
connect()
export async function sendEmail(email:string, emailType:string, userId:string) {
	try {
		const hashedToken = await bcryptjs.hash(email, 10);
		console.log(hashedToken)
		
		if(emailType === "VERIFY"){
			await User.findByIdAndUpdate(userId, 
				{
					verifyToken: hashedToken,
					verifyTokenExpiry: Date.now() + 3 * 60 * 1000
				}
			)
		} else if(emailType === "RESET"){
			await User.findByIdAndUpdate(userId, 
				{
					verifyToken: hashedToken,
					verifyTokenExpiry: Date.now() + 36 * 60 * 1000
				}
			)
		}

		var transport = nodemailer.createTransport({
			host: "sandbox.smtp.mailtrap.io",
			port: 2525,
			auth: {
			  user: "38ce13a131a8a7",
			  pass: "4cea471664b997"
			}
		});

		const mailOption = {
			from: "lakhamjemihir@gmail.com",
			to:email,
			subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
		}

		const mailResponse = await transport.sendMail(mailOption)
		return mailResponse;

	} catch (error:any) {
		throw new Error(error.message)
	}
}