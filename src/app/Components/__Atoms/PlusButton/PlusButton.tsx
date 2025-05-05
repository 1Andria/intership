"use client";
import { useColorDiv } from "@/app/Common/Store";
import React from "react";

function PlusButton() {
  const setOpen = useColorDiv((state) => state.setOpen);
  function Open() {
    setOpen();
  }

  return (
    <>
      <button
        onClick={Open}
        className="w-[50px] mt-[20px] h-[50px] text-[30px] pb-[10px] rounded-[50px] bg-black text-white font-extrabold"
      >
        +
      </button>
    </>
  );
}

export default PlusButton;
