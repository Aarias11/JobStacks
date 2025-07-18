"use client";
import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import React, { use } from "react";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        // 🎉 Login success
        alert("Login Successful!");
        router.push("/dashboard"); // or wherever
      }
    } catch (err: any) {
      console.error("Login error:", err?.response?.data || err.message);
      alert("Invalid credentials"); // You can add better toast UI later
    }
  };

  return (
    <div className="w-full h-screen flex py-2 px-4">
      {/* Left Login Container */}
      <div className=" w-full lg:w-[100%] h-full">
        <img
          src="/jobstacks_logo.svg"
          alt="JobStacks Logo"
          width={160}
          height={40}
        />
        <section className="w-full flex flex-col items-center justify-center mt-12">
          <h3 className="text-[32px] text-center font-bold">Welcome Back</h3>
          <p className="text-text-secondary text-[18px] mt-8">
            Because Job Searching Shouldn’t Be a Mess.
          </p>

          {/* Input Form */}
          <form className="mt-8" onSubmit={handleLogin}>
            <div className="mb-8">
                <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
              error={touched && !email.includes("@")}
              helperText={
                touched && !email.includes("@")
                  ? "Please enter a valid email."
                  : ""
              }
            />
            </div>

            <Input
              label="Password"
              variant="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              autoComplete="current-password"
              className="mb-8"
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
            <Button type="submit">Login</Button>
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
            <span>Don't Have An Account?</span>
            <Link href="/register" className="text-primary pl-2">
              Click Here
            </Link>
          </div>
        </section>
      </div>

      {/* Right Image Container */}
      {/* <div className="border hidden lg:flex lg:w-[50%] h-full bg-white rounded-2xl"></div> */}
    </div>
  );
}
