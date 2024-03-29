import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "user does not exists" },
                { status: 400 }
            );
        }

        const validatePassword = await bcryptjs.compare(
            password,
            user.password
        );
        if (!validatePassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 }
            );
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1h",
        });

        const response = NextResponse.json(
            { message: "user logged in", success: true },
            { status: 201 }
        );

        response.cookies.set("token", token, { httpOnly: true, secure: true });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
