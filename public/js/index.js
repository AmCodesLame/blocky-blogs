const logout = document.getElementById("logoutBtn");
function logoutFunc() {
  fetch("http://localhost:3000/logout", {
    credentials: "include",
    method: "POST",
  });
  window.location.assign("/login");
}

logout.addEventListener("click", logoutFunc);
