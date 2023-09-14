import { TodosReducer, TodoType } from "$types/todo.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DummyListData } from "../datas/dummy";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../firebaseConfig";

const initialState: TodosReducer = {
  todos: DummyListData,
};

const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo(state, action: PayloadAction<TodoType>) {
      const filteredTodo = state.todos.find(
        (item) =>
          item.id === action.payload.id && item.title === action.payload.title
      );

      if (filteredTodo) return;

      state.todos = [...state.todos, action.payload];
    },
    createTodo(state, action: PayloadAction<TodoType>) {
      try {
        setDoc(doc(FIRESTORE_DB, "todos", action.payload.id), {
          id: action.payload.id,
          title: action.payload.title,
          notes: action.payload.notes,
          date: action.payload.date,
          isCompleted: action.payload.isCompleted,
        }).then(() => {});
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      const newTodos: TodoType = {
        ...action.payload,
      };

      state.todos.unshift(newTodos);
    },
    updateTodo(state, action: PayloadAction<TodoType>) {
      const findIndexTodos = state.todos.findIndex(
        (item) => item.id === action.payload.id
      );

      updateDoc(doc(FIRESTORE_DB, "todos", action.payload.id), {
        ...action.payload,
      });

      state.todos[findIndexTodos] = action.payload;
    },
    deleteTodo(state, action: PayloadAction<string>) {
      const filteredTodos = state.todos.filter(
        (item) => item.id !== action.payload
      );

      deleteDoc(doc(FIRESTORE_DB, "todos", action.payload));

      state.todos = filteredTodos;
    },
    markChecked(state, action: PayloadAction<string>) {
      const findIndexTodos = state.todos.findIndex(
        (item) => item.id === action.payload
      );

      updateDoc(doc(FIRESTORE_DB, "todos", action.payload), {
        isCompleted: true,
      });

      state.todos[findIndexTodos].isCompleted = true;
    },
    markUnchecked(state, action: PayloadAction<string>) {
      const findIndexTodos = state.todos.findIndex(
        (item) => item.id === action.payload
      );

      updateDoc(doc(FIRESTORE_DB, "todos", action.payload), {
        isCompleted: false,
      });

      state.todos[findIndexTodos].isCompleted = false;
    },
  },
});

export const {
  addTodo,
  createTodo,
  deleteTodo,
  updateTodo,
  markChecked,
  markUnchecked,
} = todosSlice.actions;
export default todosSlice.reducer;
