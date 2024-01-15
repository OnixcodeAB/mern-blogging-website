"use client";
import React, { useState } from "react";
import InputBox from "@/components/InputBox/InputBox";
import Image from "next/image";
import Link from "next/link";
import googleIcon from "@/image/google.png";
import AnimationWrapper from "@/components/animation/page-animation";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "@/components/Loader/Loader";

type SignupProps = {
  fullname: string;
  email: string;
  password: string;
};

const signup = () => {
  const [message, setMessage] = useState<null | string>(null);

  const router = useRouter();
  const session = useSession();

  if (session.status === "authenticated") {
    router?.push("/editor");
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupProps>({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const formSubmit: SubmitHandler<SignupProps> = async (form: SignupProps) => {
    const { fullname, email, password } = form;
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
        }),
      });
      console.log(await res);
      res.status == 200 &&
        router.push("/signin?success=Account has been created");
      if (!res.ok) {
        const message = await res.text();
        throw new Error(`${message}`);
      }
    } catch (error: any) {
      setMessage(error.message.split(" ")[0]);
    }
  };
  //console.log(message);
  return (
    <AnimationWrapper>
      <section className="h-cover flex items-center justify-center">
        <form
          onSubmit={handleSubmit(formSubmit)}
          className="w-[80%] max-w-[400px]"
        >
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            Welcome Back
          </h1>

          <InputBox
            Name={{
              ...register("fullname", {
                required: "First Name is required",
              }),
            }}
            type="text"
            placeholder="Full Name"
            icon="fi-rr-user"
          />

          {errors.fullname?.message && (
            <small className="block text-xl my-4 text-red font-semibold">
              {errors.fullname.message}
            </small>
          )}

          <InputBox
            Name={{
              ...register("email", {
                required: "Email is required",
              }),
            }}
            type="text"
            placeholder="Email"
            icon="fi-rr-envelope"
          />

          {errors.email?.message && (
            <small className="block text-xl my-4 text-red font-semibold">
              {errors.email.message}
            </small>
          )}

          <InputBox
            Name={{
              ...register("password", {
                required: "Password is required",
                minLength: 6,
              }),
            }}
            type="Password"
            placeholder="Password"
            icon="fi-rr-key"
          />

          {errors.password?.message && (
            <small className="block text-xl my-4 text-red font-semibold">
              {errors.password.message}
            </small>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-[80%] btn-dark center mt-14 mb-5"
          >
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

          {message == "E11000" && (
            <small className="block my-4 text-red text-xl text-center font-semibold">
              Error: This Email already exist
            </small>
          )}

          {/* <hr className="w-1/2 border-black" /> */}

          <p className="mt-6 text-dark-grey text-xl text-center">
            Already a member ?
            <Link
              href={"/signin"}
              className="underline text-black text-xl ml-1"
            >
              Sign in here
            </Link>
          </p>
        </form>
        {isSubmitting && <Loader />}
      </section>
    </AnimationWrapper>
  );
};

export default signup;
