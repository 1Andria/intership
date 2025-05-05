"use client";
import { useColorArrays } from "@/app/Common/Store";
import { motion } from "framer-motion";
import React, { useState } from "react";

function TodoDiv() {
  const TodoDivs = useColorArrays((state) => state.Array);
  const addTask = useColorArrays((state) => state.addTask);
  const deleteDiv = useColorArrays((state) => state.deleteDiv);
  const deleteTask = useColorArrays((state) => state.deleteTask);
  const toggleDone = useColorArrays((state) => state.toggleDone);
  const [editIndex, setEditIndex] = useState<{
    div: number;
    task: number;
  } | null>(null);
  const [editValue, setEditValue] = useState("");

  const [inputValues, setInputValues] = useState<string[]>(
    Array(TodoDivs.length).fill("")
  );

  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputValues];
    newInputs[index] = value;
    setInputValues(newInputs);
  };

  const handleDelete = (index: number) => {
    deleteDiv(index);
    setInputValues((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent, index: number) => {
    e.preventDefault();
    const value = inputValues[index];
    if (!value || !value.trim()) return;

    addTask(index, value.trim());
    const updated = [...inputValues];
    updated[index] = "";
    setInputValues(updated);
  };

  const handleDeleteTask = (taskIndex: number, divIndex: number) => {
    deleteTask(taskIndex, divIndex);
  };

  const handleEdit = (taskIndex: number, divIndex: number) => {
    setEditIndex({ div: divIndex, task: taskIndex });
    setEditValue(TodoDivs[divIndex].tasks[taskIndex].text);
  };

  const handleSaveEdit = () => {
    if (!editValue.trim() || !editIndex) return;

    useColorArrays.setState((state) => {
      const updated = [...state.Array];
      updated[editIndex.div].tasks[editIndex.task].text = editValue.trim();
      return { Array: updated };
    });

    setEditIndex(null);
    setEditValue("");
  };

  const downloadFile = (tasks: { text: string }[]) => {
    const fileContent = tasks.map((task) => task.text).join("\n");
    const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tasks.txt";
    link.click();
  };

  return (
    <div className="w-full flex flex-wrap gap-4">
      {TodoDivs.map((el, index) => (
        <motion.div
          drag
          dragMomentum={false}
          dragElastic={0}
          key={index}
          className="w-full max-w-[350px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData("text/plain");
            if (!data) return;
            const { divIndex, taskIndex } = JSON.parse(data);
            if (divIndex === index) return;

            const state = useColorArrays.getState();
            const draggedTask = state.Array[divIndex]?.tasks[taskIndex];

            if (draggedTask) {
              state.deleteTask(taskIndex, divIndex);
              setTimeout(() => {
                useColorArrays.getState().addTask(index, draggedTask.text);
              }, 0);
            }
          }}
        >
          <button
            onClick={() => downloadFile(el.tasks)}
            className="h-[30px] hover:underline text-green-600 font-extrabold text-[18px] pl-[10px] pr-[10px]"
          >
            Download
          </button>
          <form
            onSubmit={(e) => handleSubmit(e, index)}
            className={`rounded-[20px] min-h-[200px] flex flex-col gap-[10px] ${el.color} pt-[20px] px-[20px] pb-[20px] relative shadow-2xl`}
          >
            <div
              onClick={() => handleDelete(index)}
              className="w-[20px] h-[20px] cursor-pointer absolute right-0 top-[-5px] rounded-[50px] bg-white text-black flex justify-center items-center"
            >
              X
            </div>
            <input
              type="text"
              value={inputValues[index] || ""}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="w-full h-[30px] px-2 rounded"
              placeholder="Enter task..."
            />
            <button
              type="submit"
              className="h-[30px] border-black border-[2px] rounded bg-white hover:bg-gray-200"
            >
              Add
            </button>
            <ol className="text-white list-disc pl-[16px] flex flex-col gap-[7px]">
              {el.tasks.map((task, i) => (
                <div
                  key={i}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData(
                      "text/plain",
                      JSON.stringify({ divIndex: index, taskIndex: i })
                    );
                  }}
                  className="flex justify-between items-center cursor-grab"
                >
                  {editIndex?.div === index && editIndex?.task === i ? (
                    <>
                      <input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="text-black w-[150px] pl-[8px] pr-[8px] rounded"
                      />
                      <div className="flex gap-[5px]">
                        <button
                          onClick={handleSaveEdit}
                          className="bg-slate-300 text-black pl-[10px] pr-[10px]"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditIndex(null)}
                          className="bg-red-100 text-black pl-[10px] pr-[10px]"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <li
                        className={task.done ? "line-through opacity-50" : ""}
                      >
                        {task.text}
                      </li>
                      <div className="flex gap-[2px]">
                        <button
                          onClick={() => handleEdit(i, index)}
                          className="bg-slate-300 text-black pl-[10px] pr-[10px]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(i, index)}
                          className="bg-red-100 text-black pl-[10px] pr-[10px]"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => toggleDone(index, i)}
                          className="bg-blue-100 text-black pl-[10px] pr-[10px]"
                        >
                          Done
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </ol>
          </form>
        </motion.div>
      ))}
    </div>
  );
}

export default TodoDiv;
