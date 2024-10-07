const container = document.getElementById("container");
const registerBtn = document.getElementById("register");

const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});


const form = document.getElementById('signup-form');
  const responseDiv = document.getElementById('response');

  form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      console.log("done");
      try {
          const response = await fetch('http://localhost:3005/signin', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  email: email,
                  password: password
              })
          });

          if (response.ok) {
              const data = await response.json();
              responseDiv.innerHTML = "Signed up"
          } else {
              responseDiv.innerHTML = `Error: ${response.status} ${response.statusText}`;
          }
      } catch (error) {
          responseDiv.innerHTML = `Error: ${error.message}`;
      }
  });