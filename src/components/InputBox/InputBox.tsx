"use client";
import React, { useState } from "react";

interface InputBoxProps {
  type?: string;
  name?: string;
  id?: string;
  value?: string;
  placeholder?: string;
  icon: string;
}

const InputBox = ({
  name,
  type,
  id,
  value,
  icon,
  placeholder,
}: InputBoxProps) => {
  const [viewPass, setViewPass] = useState(false);

  const onClick = () => {
    setViewPass(!viewPass);
  };
  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={viewPass ? "text" : type}
        id={id}
        defaultValue={value}
        placeholder={placeholder}
        className="input-box"
      />
      <i className={"fi " + icon + " input-icon"} />
      {type === "password" ? (
        <i
          className={
            "fi fi-rr-eye" +
            (!viewPass ? "-crossed" : "") +
            " input-icon left-[auto] right-4 cursor-pointer"
          }
          onClick={onClick}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default InputBox;
