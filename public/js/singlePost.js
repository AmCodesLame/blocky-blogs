const editBtn = document.getElementById("editPostBtn");
const deleteBtn = document.getElementById("deletePostBtn");

async function editClick(event) {
  event.preventDefault();
  const currUrl = window.location.href;
  const newUrl = currUrl.replace("blog/", "blog/edit/");
  window.location.assign(newUrl);
}

async function deleteClick(event) {
  event.preventDefault();
  const postId = window.location.href.split("/").slice(-1)[0];

  const confirmation = confirm(
    "Are you sure you want to delete this post permanently?"
  );
  if (!confirmation) return;
  const res = await fetch("http://localhost:3000/create", {
    method: "DELETE",
    body: JSON.stringify({ postId }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(res);
  if (!res.ok) alert("Error! Something's not right");
  window.location.assign("/");
}

editBtn.addEventListener("click", editClick);
deleteBtn.addEventListener("click", deleteClick);
