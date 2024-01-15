"use client";
import React, { useEffect, useState, useTransition } from "react";
import InputBox from "@/components/InputBox/InputBox";
import googleIcon from "@/image/google.png";
import Image from "next/image";
import Link from "next/link";
import AnimationWrapper from "@/components/animation/page-animation";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import Loader from "@/components/Loader/Loader";
import { LoginSchema } from "@/utils/schema";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/action/Login";
import { Input } from "@/components/ui/input";

/* type SigninProps = {
  email: string;
  password: string;
}; */

const Signin = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const params = useSearchParams();
  const router = useRouter();
  const session = useSession();

  /*  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isPending, isLoading },
  } = useForm<SigninProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
 */

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      Password: "",
    },
  });

  /*   useEffect(() => {
    setError(params.get("error"));
  }, [params]); */

  /*   const formSubmit: SubmitHandler<SigninProps> = (form: SigninProps) => {
    const { email, password } = form;
    signIn("credentials", {
      email,
      password,
      callbackUrl: "/editor",
    });
  }; */

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  console.log({ error: error, success: success });
  return session.status === "authenticated" ? (
    router?.push("/editor")
  ) : (
    <AnimationWrapper>
      <Form {...form}>
        <section className="h-cover flex items-center justify-center">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[80%] max-w-[400px]"
          >
            <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
              Welcome Back
            </h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative w-[100%] mb-4">
                      <Input
                        {...field}
                        className="input-box"
                        name="email"
                        placeholder="John.doe@gmail.com"
                        disabled={isPending}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Password"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Password</FormLabel>
                  <FormControl className="">
                    <InputBox
                      Name={{ ...field }}
                      type="Password"
                      placeholder="******"
                      icon="fi-rr-key"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="w-[80%] btn-dark center mt-14 mb-5"
              disabled={isPending}
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
              disabled={isPending}
            >
              <Image src={googleIcon} alt="Google Icon" className="w-5" />
              Continue with Google
            </button>

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
          {isPending && <Loader />}
        </section>
      </Form>
    </AnimationWrapper>
  );
};

export default Signin;
