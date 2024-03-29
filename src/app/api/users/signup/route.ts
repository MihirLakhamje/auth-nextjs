import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel"
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
	try {
		const reqBody = await request.json()
		const {email, password} = reqBody;

		const user = await User.findOne({email})

		if(user){
			return NextResponse.json({error: "user already exists"}, {status: 400})
		}

		// hash password
		const salt = await bcryptjs.genSalt(10)
		const hashedPassword = await bcryptjs.hash(password, salt)

		const newUser = await User.create({
			email,
			password: hashedPassword
		})

		const savedUser = await newUser.save()
		console.log(savedUser)

		await sendEmail(email, "VERIFY", savedUser._id)
		return NextResponse.json({message:"user created", success: true, savedUser}, {status: 201})
		
	} catch (error: any) {
		return NextResponse.json({error: error.message,}, {status: 500})
	}
}