const form = document.getElementById("formId");
const cancelBtn = document.getElementById("cancelBtn");
const editBtn = document.getElementById("editBtn");
const title = document.getElementById("inputTitle");
const summary = document.getElementById("inputSummary");
const desc = document.getElementById("inputDesc");
const image = document.getElementById("inputImage");

async function editFun(event) {
  event.preventDefault();

  const formData = new FormData(formId);
  const postId = window.location.href.split("/").slice(-1)[0];
  const confirmation = confirm("are you sure you want to edit the blog?");
  if (!confirmation) {
    alert("okay, redirecting to blog site");
    window.location.assign(`/blog/${postId}`);
  }

  if (!title.value || !summary.value || !desc.value)
    return alert("complete all the fields");

  formData.set("postId", postId);
  const res = await fetch("http://localhost:3000/create", {
    method: "PUT",
    body: formData,
  });

  console.log(res);

  if (!res.ok) return alert("post edit failed, try again");

  alert("Post Edit Successfully\nReturning to Blog Page");
  window.location.assign(`/blog/${postId}`);
}

async function cancelFun(event) {
  event.preventDefault();
  const postId = window.location.href.split("/").slice(-1)[0];

  const confirmation = confirm(
    "Are you sure you want to exit? Changes won't be saved"
  );
  if (confirmation) {
    alert("okay, redirecting to blog site");
    window.location.assign(`/blog/${postId}`);
  }
}

editBtn.addEventListener("click", editFun);
cancelBtn.addEventListener("click", cancelFun);
