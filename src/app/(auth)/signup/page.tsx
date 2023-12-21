"use client";
import React from "react";
import InputBox from "@/components/InputBox/InputBox";
import Image from "next/image";
import Link from "next/link";
import googleIcon from "@/image/google.png";

const signup = () => {
  return (
    <section className="h-cover flex items-center justify-center">
      <form action="" className="w-[80%] max-w-[400px]">
        <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
          Welcome Back
        </h1>

        <InputBox
          name="Fullname"
          type="text"
          placeholder="Full Name"
          icon="fi-rr-user"
        />

        <InputBox
          name="email"
          type="text"
          placeholder="Email"
          icon="fi-rr-envelope"
        />

        <InputBox
          name="password"
          type="password"
          placeholder="Password"
          icon="fi-rr-key"
        />

        <button type="submit" className="w-[80%] btn-dark center mt-14 mb-5">
          Sign Up
        </button>

        <div className="relative w-full flex items-center gap-2 my-10 opacity-40 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>Or</p>
          <hr className="w-1/2 border-black" />
        </div>

        <button
          type="submit"
          className="w-[80%] btn-dark center mt-5 flex items-center justify-center gap-4"
        >
          <Image src={googleIcon} alt="Google Icon" className="w-5" />
          Continue with Google
        </button>

        {/* <hr className="w-1/2 border-black" /> */}

        <p className="mt-6 text-dark-grey text-xl text-center">
          Already a member ?
          <Link href={"/signin"} className="underline text-black text-xl ml-1">
            Sign in here
          </Link>
        </p>
      </form>
    </section>
  );
};

export default signup;
