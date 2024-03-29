"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyPage() {
    const [token, setToken] = useState("");
    const [verify, setVerify] = useState(false);

    async function verifyEmail() {
        try {
            await axios.post("api/users/verifyemail", { token });

            setVerify(true);
        } catch (error: any) {
            console.log(error.message);
        }
    }

	useEffect(()=>{
		const urlToken = window.location.search.split("=")[1]
		setToken(urlToken || "")
	},[])

	useEffect(()=>{
		if(token) verifyEmail()
	},[token])

	return(
		<>
			<h1 className="text-4xl">Verify email</h1>
			<h1 className="text-2xl">token:{token}</h1>

			{
				verify && (
					<div>
						<h2>Email verified</h2>
						<Link className="btn btn-link" href="/login">Login</Link>
					</div>
				)
			}
		</>

	)
}
