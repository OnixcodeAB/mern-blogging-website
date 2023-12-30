"use client";
import React, { useEffect, useState } from "react";
import InputBox from "@/components/InputBox/InputBox";
import googleIcon from "@/image/google.png";
import Image from "next/image";
import Link from "next/link";
import AnimationWrapper from "@/components/animation/page-animation";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "@/components/Loader/Loader";

type SigninProps = {
  email: string;
  password: string;
};

const Signin = () => {
  const [error, setError] = useState<null | string>(null);
  const params = useSearchParams();
  const router = useRouter();
  const session = useSession();

  /* if (session.status === "authenticated") {
    router?.push("/editor");
  } */

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isSubmitting },
  } = useForm<SigninProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    setError(params.get("error"));
  }, [params]);

  const formSubmit: SubmitHandler<SigninProps> = (form) => {
    const { email, password } = form;
    signIn("credentials", {
      email,
      password,
      callbackUrl:"/editor"
    });
    //console.log(email + " " + password);
  };

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
              }),
            }}
            type="password"
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
            className="w-[80%] btn-dark center mt-14 mb-5"
            disabled={isSubmitting}
          >
            Sign In
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-40 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>Or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <button
            type="submit"
            className="w-[80%] btn-dark center mt-5 flex items-center justify-center gap-4"
            disabled={isSubmitting}
          >
            <Image src={googleIcon} alt="Google Icon" className="w-5" />
            Continue with Google
          </button>

          {error && (
            <small className="block w-full my-4 text-center text-red text-xl font-semibold">
              {error}
            </small>
          )}

          {/* <hr className="w-1/2 border-black" /> */}

          <p className="mt-6 text-dark-grey text-xl text-center">
            Don't have an account ?
            <Link
              href={"/signup"}
              className="underline text-black text-xl ml-1"
            >
              Join us Today
            </Link>
          </p>
        </form>
        {isSubmitted && <Loader />}
      </section>
    </AnimationWrapper>
  );
};

export default Signin;
