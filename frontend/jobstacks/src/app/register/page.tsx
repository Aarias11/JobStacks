"use client";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import React, { use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/api/users/register", {
        name,
        email,
        password,
      },  
      { withCredentials: true },
    );

      if (res.status === 201) {
        // 🎉 Registration success
        alert('Registration Successful!')
        router.push("/login"); // or wherever
      }
    } catch (err: any) {
      console.error("Login error:", err?.response?.data || err.message);
      alert("Invalid credentials"); // You can add better toast UI later
    }
  };

  return (
    <div className="w-full h-screen flex py-2 px-4">
      {/* Left Login Container */}
      <div className=" w-full lg:w-[50%] h-full">
        <img
          src="/jobstacks_logo.svg"
          alt="JobStacks Logo"
          width={160}
          height={40}
        />
        <section className="w-full flex flex-col items-center justify-center mt-4">
          <h3 className="text-[32px] text-center font-bold">Welcome Back</h3>
          <p className="text-text-secondary text-[18px] mt-4">
            Because Job Searching Shouldn’t Be a Mess.
          </p>

          {/* Input Form */}
          <form className="mt-8" onSubmit={handleSignup}>
            <Input
              label="Name"
              placeholder="Joe Schmoe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              autoComplete="name"
              className="mb-5"
            />
            <Input
              label="Email"
              placeholder="joeschmoe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              autoComplete="email"
              className="mb-5"
            />

            <Input
              label="Password"
              variant="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              autoComplete="current-password"
              className="mb-5"
            />
            <div className="w-full mb-5 flex justify-between">
              <div className="flex gap-3 items-center">
                <input type="checkbox" className="" />
                <h4>Remember Password</h4>
              </div>
              <a href="/forgot-password" className="text-primary text-sm">
                Forgot Password?
              </a>
            </div>
            <Button type="submit">Signup</Button>
          </form>
          {/* OR Container */}
          {/* <div className="w-full flex items-center justify-center my-5">
            <div className="w-[214px] h-[1px] border-b border-[#272727]"></div>
            <span className="px-4">or</span>
            <div className="w-[214px] h-[1px] border-b border-[#272727]"></div>
          </div> */}
          {/* Google OAuth Button */}
          {/* <Button className="flex gap-4 items-center bg-[#272727] mb-5">
            <img
              src="/google.svg"
              alt="JobStacks Logo"
              width={20}
              height={40}
            />
            Google
          </Button> */}
          {/* Don't Have an Account Container */}
          <div className="w-full flex justify-center mt-6">
            <span>Already Have An Account?</span>
            <span className="text-primary pl-2">Click Here</span>
          </div>
        </section>
      </div>

      {/* Right Image Container */}
      <div className="border hidden lg:flex lg:w-[50%] h-full bg-white rounded-2xl"></div>
    </div>
  );
}
