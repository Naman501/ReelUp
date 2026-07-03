"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


export default function Register() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleSubmit =async (e:React. SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(password!==confirmPassword){
        setError("Your Password does not match")
    }
    try {
        const res=await fetch("/api/auth/register",{
            method:"POST",
            headers:{"content-Type":"application/json"},
            body:JSON.stringify({email,password})
        })
        const data=res.json()
        console.log(data)
        if(!res.ok){
                setError("Registration Fail")
                router.push("/login")
        }
    } catch (error) {
        console.error(error)
        throw new Error("Registration Failed")
    }
  };
  return (
    <>
   <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </>
  );
}
