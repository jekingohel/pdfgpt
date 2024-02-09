import { createSlice } from "@reduxjs/toolkit"

const defaultState = function () {
  return {
    chat_history: [],
    file: "",
    file_url: "",
    filename: "",
    questions: [],
    summary: "",
  }
}

const ConversationReducer = createSlice({
  name: "conversations",
  initialState: defaultState(),
  reducers: {
    ConversationsSetData(state, action) {
      return { ...action.payload }
    },
    ConversationsAddMessage(state, action) {
      state.chat_history?.push(action.payload)
      return state
    },
    ConversationsGlobalReset() {
      return defaultState()
    },
  },
})

export default ConversationReducer

export const {
  ConversationsSetData,
  ConversationsAddMessage,
  ConversationsGlobalReset,
} = ConversationReducer.actions
