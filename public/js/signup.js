const form = document.getElementById("submitRegister");
const div = document.getElementById("afterRegistration");
const user = document.getElementById("typeUsername");
const pass = document.getElementById("typePasswordX");
const passConf = document.getElementById("typePasswordConfirmX");

async function submitForm(event) {
  event.preventDefault();
  const username = user.value;
  const password = pass.value;

  if (pass.value === passConf.value) {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.status === 200) {
      div.innerHTML = `<p style="font-style: italic">
                  Registration Successful, Please
                  <a href="/login" class="text-white-50 fw-bold">Login</a>
                </p>`;
    } else {
      div.innerHTML = `<p style="font-style: italic; color:red">
      Username Already Exists!
    </p>`;
    }
  } else {
    div.innerHTML = `<p style="font-style: italic; color:red">
                    Password and Confirm Password does not Match!
                  </p>`;
  }
}

form.addEventListener("submit", submitForm);
