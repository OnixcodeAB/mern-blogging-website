"use client";
import React, { Suspense, useState } from "react";
import logo from "@/image/logo.png";
import Link from "next/link";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import UserNavigationPanel from "../UserNavigationPanel/UserNavigationPanel";

const Navbar = () => {
  const [searchBoxVisibility, setSearchBoxVisibility] =
    useState<Boolean>(false);

  const session = useSession();
  const { data, status } = useSession();

  const email = data?.user?.email;
  const profilePic = data?.user?.image || "";

  //console.log(profilePic);

  return (
    <nav className="navbar">
      <Link href={"/"} className="flex-none w-10">
        <Image src={logo} alt="logo" className="w-full" />
      </Link>
      <div
        className={
          "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
          (searchBoxVisibility ? "show" : "hide")
        }
      >
        <input
          type="text"
          placeholder="Search"
          className=" w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
        />
        <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
      </div>
      <div className="flex items-center gap-3 md:gap-6 ml-auto">
        <button
          type="button"
          className="md:hidden text-2xl bg-grey w-12 h-12 rounded-full flex items-center justify-center"
          onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}
        >
          <i className="fi fi-rr-search text-xl"></i>
        </button>
        <Link
          href={"/editor"}
          className="hidden md:flex gap-2 btn-light text-xl py-2"
        >
          <i className="fi fi-rr-file-edit text-xl" />
          Write
        </Link>
        <Suspense fallback={<NavLoader />}>
          {status == "authenticated" ? (
            <>
              <Link href={"/dashboard/notification"}>
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                  <i className="fi fi-rr-bell text-2xl"></i>
                </button>
              </Link>
              <div className="relative">
                <button>
                  <img
                    src={profilePic}
                    alt="Profile pic"
                    className="w-12 h-12 rounded-full mt-2"
                  />
                </button>
                <UserNavigationPanel />
              </div>
            </>
          ) : (
            <>
              {status == "loading" ? (
                <NavLoader />
              ) : (
                <>
                  <Link href={"/signin"} className="btn-dark py-2">
                    Sign in
                  </Link>
                  <Link
                    href={"/signup"}
                    className="btn-light py-2 hidden md:block"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </>
          )}
        </Suspense>
      </div>
    </nav>
  );
};

/* Navbar skeleton loading */

const NavLoader = () => (
  <>
    <Link href={"/signin"} className="skeleton-btn skeleton py-2">
      
    </Link>
    <Link
      href={"/signup"}
      className="skeleton-btn skeleton py-2 hidden md:block"
    >
      
    </Link>
  </>
);

export default Navbar;
