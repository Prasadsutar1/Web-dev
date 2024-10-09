const container = document.getElementById("container");
const registerBtn = document.getElementById("register");

const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
    container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
    container.classList.remove("active");
});

function toggle(){
        container.classList.remove("active");
}
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

const form2 = document.getElementById('signup-form');
  const responseDiv2 = document.getElementById('response2');

  form2.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name2 = document.getElementById('name2').value;
      const email2 = document.getElementById('email2').value;
      const password2 = document.getElementById('password2').value;
      console.log("done");
      try {
          const response2 = await fetch('http://localhost:3005/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  name : name2,
                  email: email2,
                  password: password2
              })
          });

          if (response2.ok) {
              const data = await response2.json();
              const login2Btn = document.getElementById("login2");
              responseDiv2.innerHTML = "Signed up";
              sleep(1000).then(() =>{
                toggle();
              });
              

          } else {
              responseDiv2.innerHTML = `Error: ${response2.status} ${response2.statusText}`;
          }
      } catch (error) {
          responseDiv2.innerHTML = `Error: ${error.message}`;
      }
  });


  //signin pAGE  
  const form = document.getElementById('signin-form');
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
              responseDiv.innerHTML = "Signed in"
              
          } else {
              responseDiv.innerHTML = `Error: ${response.status} ${response.statusText}`;
          }
      } catch (error) {
          responseDiv.innerHTML = `Error: ${error.message}`;
      }
  });