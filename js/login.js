import { formAnimation } from "./animation.mjs"
import { LoadMainPage } from "./main.js"


export function LoadSignInPage() {
    document.body.innerHTML = `
    <img src="assets/logo-01.png" id="logo-img">
    <section id="main">
        <div class="container">
            <h1 id="loginh1">Please Login</h1>
            <div>
              <div class="form-control">
                <input type="text" id="email" required>
                <label>Email</label>
              </div>
              <div class="form-control">
                <input type="password" id="pass" required>
                <label >Password</label>
              </div>
              <button class="btn" id="loginBtn">Login</button>
              <p class="text" id="err"> </p>
            </div>
          </div>
    </section>
    `
    formAnimation()
    Login()
}


function Login() {
    let loginBtn = document.getElementById('loginBtn')
    let emailInput = document.getElementById('email')
    let passwordInput = document.getElementById('pass')
    
    
    loginBtn.addEventListener('click' , ()=> {
        let email = emailInput.value
        let password = passwordInput.value
        Check(email , password)
    })
}


async function Check(email, pass) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization' : 'Basic '+ btoa(email+':'+pass)
        },
    }
   let res = await fetch("https://learn.zone01dakar.sn/api/auth/signin", options)
   if (res.ok) {
    let token = await res.json()
    localStorage.setItem("graphql_token", token)
    LoadMainPage()
   } else {
    let error = await res.json()
    let ErrorP = document.getElementById('err')
    ErrorP.innerHTML = error.error
   }
}