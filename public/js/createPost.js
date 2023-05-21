const form = document.getElementById("formId");
const title = document.getElementById("inputTitle");
const summary = document.getElementById("inputSummary");
const desc = document.getElementById("inputDesc");
const image = document.getElementById("inputImage");

async function submitForm(event) {
  event.preventDefault();

  if (!title.value || !summary.value || !desc.value)
    return alert("complete all the fields");

  const formData = new FormData(formId);

  if (
    formData.get("blogImage").type == "" ||
    formData.get("blogImage").type == "application/octet-stream"
  )
    return alert("Please Select A Image");

  const res = await fetch("http://localhost:3000/create", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) return alert("post submission failed, try again");

  alert("Post Created Successfully\nReturning to Home Page");
  window.location.assign("/");
}

form.addEventListener("submit", submitForm);
