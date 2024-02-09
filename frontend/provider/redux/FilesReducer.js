import { createSlice } from "@reduxjs/toolkit"

const defaultState = function () {
  return {
    collection: [],
  }
}

const FilesReducer = createSlice({
  name: "files",
  initialState: defaultState(),
  reducers: {
    FilesSetData(state, action) {
      state.collection = action.payload
      return state
    },
    FilesAddFile(state, action) {
      state.collection = [...state.collection, ...action.payload]
      return state
    },
    FilesGlobalReset() {
      return defaultState()
    },
  },
})

export default FilesReducer

export const { FilesSetData, FilesAddFile, FilesGlobalReset } =
  FilesReducer.actions
