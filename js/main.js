import { LoadSignInPage } from "./login.js";
import {  Mainquery } from "./queries.js";


LoadMainPage()

  
export function LoadMainPage() {
 let token = localStorage.getItem("graphql_token")
  getData(token)
}

async function getData(token) {
  let IdUser = DecodeToken(token)
  let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization' : 'Bearer '+ token
    },
    body: JSON.stringify({ query: Mainquery(IdUser) })
  }
  let res = await fetch("https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql", options)
  let data = await res.json()
  if (!data.hasOwnProperty("data")) {
    LoadSignInPage()
  } else {
     document.body.innerHTML = `
      <img src="assets/logo-01.png" id="logo-img">
      <h1>${data.data.user[0].firstName }</h1>
      <div class="persinfo">
        <img src="assets/student.jpeg">
        <div class="inf">
          <p>Hello!</p>
          <p class="np">${data.data.user[0].firstName }</p>
          <p class="np">${data.data.user[0].lastName }</p>
        </div>
        </div>
        <div>
          <p>${data.data.user[0].email }</p>
          <p>${data.data.user[0].login }</p>
          <p>${data.data.transaction_aggregate.aggregate.sum.amount /1000}xp</p>
        </div>
        <div>${DisplayAudits(data.data.audit)}</div>
    `
  }

}
function DisplayAudits(audits) {
  let res  = ``
  audits.forEach(audit => {
    res += `
      <div>
        <span>${audit.group.object.name}</span>
        <span>${audit.group.captainLogin}</span>
        <span>${audit.grade >= 1 ? "Pass" : "Fail"}</span>
      </div>
    `
  });
  return res
}
function DecodeToken(jwt) {
  const payload = jwt.split('.')[1]; // La charge utile est la deuxième partie du JWT
  const decodedPayload = JSON.parse(atob(payload)); // Décodage de la charge utile depuis base64
  return decodedPayload.sub
}