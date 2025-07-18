import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between ">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/jobstacks_logo.svg"
            alt="JobStacks Logo"
            width={150}
            height={40}
            className="cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Link href="/login" className="text-md text-text-primary hover:underline">
          Login
        </Link>
        <Link href="/register" className="text-md text-text-primary hover:underline">
          Register
        </Link>
      </div>
    </nav>
  );
}
