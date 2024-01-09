import React from "react";
import AnimationWrapper from "../animation/page-animation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const UserNavigationPanel = () => {
  const { data } = useSession();
  const userName = data?.user?.username || "";
  return (
    <AnimationWrapper
      className="absolute right-0 z-50"
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white absolute right-0 border border-grey w-60 overflow-hidden duration-200">
        <Link href={"/editor"} className="flex gap-2 link md:hidden pl-8 py-4">
          <i className="fi fi-rr-file-edit text-xl" />
          Write
        </Link>

        <Link href={`/user/${userName}`} className="link pl-8 py-4">
          Profile
        </Link>

        <Link href={"dashboard/blogs"} className="link pl-8 py-4">
          Dashboard
        </Link>

        <Link href={"settings/edit-profile"} className="link pl-8 py-4">
          Settings
        </Link>

        <span className="absolute border-t border-grey w-[100%]"></span>

        <button
          type="button"
          className="text-left p-4 hover:bg-grey w-full pl-8"
          onClick={() => {
            signOut({ callbackUrl: "/" });
          }}
        >
          <h1 className="font-bold text-xl mg-1">Sign Out</h1>
          <p className="text-dark-grey">@{userName}</p>
        </button>
      </div>
    </AnimationWrapper>
  );
};

export default UserNavigationPanel;
