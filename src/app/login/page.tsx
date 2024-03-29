"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter()
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    async function onLogin(e:any){
        e.preventDefault()
        try {
            const response = await axios.post("/api/users/login", user,{
                headers:{
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)
            router.push("/profile")
        } catch (error: any) {
            console.log(error.message)
        }
	} 
    return (
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={onLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            email: e.target.value,
                                        })
                                    }
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            password: e.target.value,
                                        })
                                    }
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label">
                                    <Link
                                        href="/signup"
                                        className="label-text-alt link link-hover"
                                    >
                                        no account?
                                    </Link>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
