"use client";
import { useColorArrays, useColorDiv } from "@/app/Common/Store";
import { Box, Modal } from "@mui/material";
import React from "react";

function ColorDiv() {
  const open = useColorDiv((state) => state.open);
  const setOpen = useColorDiv((state) => state.setOpen);
  const TodoDivs = useColorArrays((state) => state.setArray);

  const ColorArray = [
    "bg-[red]",
    "bg-[green]",
    "bg-[blue]",
    "bg-[yellow]",
    "bg-[pink]",
  ];
  function onClose() {
    setOpen();
  }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: "rgba(36, 45, 52, 0.5)",
              opacity: "0.5",
            },
          },
        }}
        className="w-full"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-[500px] h-[200px] rounded-[20px] bg-slate-600 flex flex-col p-[30px] items-center gap-[40px]">
            <div className="w-full flex justify-center">
              <h1 className="text-white font-extrabold">Choose the color:</h1>
            </div>
            <div className="flex justify-between w-full">
              {ColorArray.map((el, key) => (
                <div
                  key={key}
                  onClick={() => {
                    TodoDivs(el);
                  }}
                  className={` ${el} w-[50px] h-[50px] rounded-[50px]`}
                ></div>
              ))}
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default ColorDiv;
