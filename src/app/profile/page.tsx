"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("")

    async function getUserData() {
        try {
            const response  = await axios.get("/api/users/currentUser")
            setData(response.data?.user?._id)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    async function onLogout() {
        try {
            await axios.get("/api/users/logout");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        getUserData()
    },[])
    return (
        <>
            <div>Profile page at /profile</div>
            <Link className="btn btn-primary" href={`/profile/${data}`}>Get user details</Link>
            <button className="btn btn-primary" onClick={onLogout}>Logout</button>
        </>
    );
}
