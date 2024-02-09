import Loader from "../__Shared/Objects/Loader"
import ObjectSubmitButton from "../__Shared/Objects/SubmitButton"
import ObjectErrorMessage from "../__Shared/Objects/ErrorMessage"
import AddQuestion from "./Execute/AddQuestion"

const ngn = {}

ngn.chat = {
  question: {
    onSubmit: null,
    loader: Loader(),
    add: AddQuestion.bind(ngn),
    AddMessage: null,
    submitButton: ObjectSubmitButton(),
    errorMessage: ObjectErrorMessage(),
  },
}

export default ngn
