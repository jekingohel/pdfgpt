const AddQuestion = async function ({ file_id, question }) {
  this.chat.question.loader.showLoader();

  this.chat.question.AddMessage({ content: question, role: "user" });

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}/add_message/${file_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_APP_API_ENDPOINT}`,
        },
        body: JSON.stringify({ role: "user", content: question }),
      }
    );
    const data = await res.json();

    if (data) {
      this.chat.question.AddMessage({
        content: data?.answer,
        role: "assistant",
      });
      this.chat.question.loader.hideLoader();
    }
  } catch (error) {
    this.chat.question.loader.hideLoader();
    throw new Error("Failed to fetch data");
  }
};
export default AddQuestion;
