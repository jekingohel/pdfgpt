import { configureStore } from "@reduxjs/toolkit"
import FilesReducer from "@/provider/redux/FilesReducer"
import ConversationReducer from "@/provider/redux/ConversationReducer"

export const store = configureStore({
  reducer: {
    "Files": FilesReducer.reducer,
    "Conversations": ConversationReducer.reducer,
  },
})
