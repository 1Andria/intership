import React from "react";
import PlusButton from "../../__Atoms/PlusButton/PlusButton";
import ColorDiv from "../../__Molecules/ColorDiv/ColorDiv";
import TodoDiv from "../../__Molecules/TodoDiv/TodoDiv";

function Body() {
  return (
    <>
      <div className="min-h-screen w-full bg-[gray] pb-[20px]  flex justify-between flex-col  items-center pl-[10px] pr-[10px] pt-[10px]  ">
        <TodoDiv />
        <ColorDiv />
        <PlusButton />
      </div>
    </>
  );
}

export default Body;
