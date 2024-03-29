import { NextResponse } from "next/server";

export async function GET(response: NextResponse) {
    try {
        const response = NextResponse.json(
            { message: "user logged out" },
            { status: 200 }
        );

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}
