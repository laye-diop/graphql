let loginBtn = document.getElementById('loginBtn')
let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('pass')
let ErrorP = document.getElementById('err')


loginBtn.addEventListener('click' , ()=> {
    let email = emailInput.value
    let password = passwordInput.value
    Chech(email , password)
})

async function Chech(email, pass) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization' : 'Basic '+ btoa(email+':'+pass)
        },
    }
   let res= await fetch("https://learn.zone01dakar.sn/api/auth/signin", options)
   if (res.ok) {
    let token = await res.json()
    console.log("succesful login " , token);
   } else {
    let error = await res.json()
    ErrorP.innerHTML = error.error
   }
}