import Loader from "../__Shared/Objects/Loader"
import ObjectSubmitButton from "../__Shared/Objects/SubmitButton"
import ObjectErrorMessage from "../__Shared/Objects/ErrorMessage"
import UploadFiles from "./UploadFiles"

const ngn = {}

ngn.files = {
  loader: Loader(),
  uploadFiles: UploadFiles.bind(ngn),
  addFile: null,
  uploadButton: ObjectSubmitButton(),
  errorMessage: ObjectErrorMessage(),
}

export default ngn
