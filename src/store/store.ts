import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import TodosReducer from "./TodosReducer";
import loadingReducer from "./loadingReducer";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: {
    todos: TodosReducer,
    loading: loadingReducer,
  },
  middleware: [...customizedMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
