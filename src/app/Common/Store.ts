import { create } from "zustand";
import { persist } from "zustand/middleware";

type ColorTypes = {
  open: boolean;
  setOpen: () => void;
};

export const useColorDiv = create<ColorTypes>((set) => ({
  open: false,
  setOpen: () => set((state) => ({ open: !state.open })),
}));

type ColorTasks = {
  color: string;
  tasks: { text: string; done: boolean }[];
};

type TodoInputs = {
  Array: ColorTasks[];
  setArray: (color: string) => void;
  addTask: (index: number, task: string) => void;
  deleteDiv: (index: number) => void;
  deleteTask: (taskIndex: number, divIndex: number) => void;
  toggleDone: (divIndex: number, taskIndex: number) => void;
};

export const useColorArrays = create<TodoInputs>()(
  persist(
    (set) => ({
      Array: [],
      setArray: (color) =>
        set((state) => ({
          Array: [
            ...state.Array,
            { color, tasks: [], position: { x: 0, y: 0 } },
          ],
        })),

      addTask: (index, task) =>
        set((state) => ({
          Array: state.Array.map((item, i) =>
            i === index
              ? {
                  ...item,
                  tasks: [...item.tasks, { text: task, done: false }],
                }
              : item
          ),
        })),
      deleteDiv: (index) =>
        set((state) => ({
          Array: state.Array.filter((_, i) => i !== index),
        })),
      deleteTask: (taskIndex, divIndex) =>
        set((state) => ({
          Array: state.Array.map((item, i) =>
            i === divIndex
              ? {
                  ...item,
                  tasks: item.tasks.filter((_, tIndex) => tIndex !== taskIndex),
                }
              : item
          ),
        })),

      toggleDone: (divIndex, taskIndex) =>
        set((state) => {
          const updated = [...state.Array];
          const task = updated[divIndex].tasks[taskIndex];
          task.done = !task.done;
          return { Array: updated };
        }),
    }),
    {
      name: "todo-storage",
    }
  )
);
