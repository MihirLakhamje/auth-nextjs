import { connect } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getTokenData(request);
        const user = await User.findById({ _id:userId }).select("-password");
		return NextResponse.json({user}, {status: 200})
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
