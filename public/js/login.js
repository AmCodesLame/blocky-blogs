const form = document.getElementById("loginForm");
const opTag = document.getElementById("afterLogin");

const user = document.getElementById("typeUsername");
const pass = document.getElementById("typePasswordX");

async function submitForm(event) {
  event.preventDefault();
  const username = user.value;
  const password = pass.value;
  if (username == "" || password == "") {
    opTag.innerHTML = "<b>All Fields are Necessarys</b>";
    return;
  }
  console.log(username, password);
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const res = await response.json();
  console.log(res);
  if (res.verified) {
    window.location.assign("/");
  } else {
    opTag.innerHTML = "<b>Incorrent credetials</b>";
  }
}

form.addEventListener("submit", submitForm);
