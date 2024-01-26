import { LoadSignInPage } from "./login.js";
import {  Mainquery } from "./queries.js";
import { ActivateListenner } from "./logout.js";
import { AddGraph } from "./graph.js";

LoadMainPage()

  
export function LoadMainPage() {
 let token = localStorage.getItem("graphql_token")
  getData(token)
}

async function getData(token) {
  let IdUser = DecodeToken(token)
  console.log("here is the token " , token);
  let options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Authorization' : 'Bearer '+ token
    },
    body: JSON.stringify({ query: Mainquery(IdUser) })
  }
  let res = await fetch("https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql", options)
  console.log("here is the res ", res);
  let data = await res.json()
  console.log("here is the data  " , data);
  if (!data.hasOwnProperty("data")) {
    LoadSignInPage()
  } else {
    document.head.innerHTML = Head()
     document.body.innerHTML = GenerateHomePage(data) 
     AddGraph(data.data.projectXp , data.data.Attempts)
     ActivateListenner()
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

  if(jwt == null || jwt.split('.').length != 3) {
    return null
  }
  const payload = jwt.split('.')
  const decodedPayload = JSON.parse(atob(payload[1])); 
  return decodedPayload.sub
}

function Head() {
  return `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="style/style.css">
  <link rel="stylesheet" href="style/mediaqueries.css">
  <script src="js/animation.js" defer></script>
  <title>GraphQL</title>`
}

function GenerateHomePage(data) {
  let skills = data.data.transaction
  let GetSkills = GetSkill.bind(skills)
  return  `
  <nav id="desktop-nav">
    <span><img src="/assets/logo-01.png" id="logo-img"></span>
      <div class="logo"> ${data.data.user[0].firstName +data.data.user[0].lastName } </div>
      <div>
        <ul class="nav-links">
          <li><a href="#about">Basic info</a></li>
          <li><a href="#experience">Skills</a></li>
          <li><a href="#projects">Audits</a></li>
          <li><a href="#contact">Graphs</a></li>
        </ul>
      </div>
      <span><img src="/assets/logout.png" id="" class="logout-img logoutImg"></span>
    </nav>
    <nav id="hamburger-nav">
      <div class="logo"> ${data.data.user[0].firstName } </div>
      <span><img src="/assets/logout.png" id="" class="logout-img logoutImg"></span>
    </nav>
    <section id="profile">
      <div class="section__pic-container zone01">
        <img src="./assets/zone01-logo.png" class="zone01image" alt="John Doe profile picture" />
      </div>
      <div class="section__text">
        <p class="section__text__p1">Hello</p>
        <h1 class="title"> ${data.data.user[0].firstName }</h1>
        <p class="section__text__p2">Student at Zone 01 dakar</p>
        <div class="btn-container">
          <button
            class="btn btn-color-2"
          >
           Username
          </button>
          <button class="btn btn-color-1" onclick="location.href='./#'">
            ${data.data.user[0].login }
          </button>
        </div>
        <div id="socials-container">
          <img
            src="./assets/linkedin.png"
            alt="My LinkedIn profile"
            class="icon"
            onclick="location.href='https://linkedin.com/'"
          />
          <a href="https://learn.zone01dakar.sn/git/papaabddiop">
            <img
              src="./assets/github.png"
              alt="My Github profile"
              class="icon"
            />
            
          </a>
        </div>
      </div>
    </section>
    <section id="about">
      <p class="section__text__p1">Get To Know More</p>
      <h1 class="title">About Me</h1>
      <div class="section-container">
        <div class="section__pic-container">
          <img
            src="./assets/infopers.png"
            alt="Profile picture"
            class="about-pic"
          />
        </div>
        <div class="about-details-container">
          <div class="about-containers">
            <div class="details-container">
              <img
                src="./assets/experience.png"
                alt="Experience icon"
                class="icon"
              />
              <h3>Level</h3>
              <p>${data.data.level.aggregate.max.amount}</p>
            </div>
            <div class="details-container">
              <img
                src="./assets/education.png"
                alt="Education icon"
                class="icon"
              />
              <h3>Xp aggregate</h3>
              <p>${data.data.xp.aggregate.sum.amount /1000}xp</p>
            </div>
          </div>
          <div class="text-container">
            <p>
             <span id="em">Email :</span>  ${data.data.user[0].email }
            </p>
            <p>
              Here are somme of your personnal informations about progression at Zone 01 dakar
            </p>
          </div>
        </div>
      </div>
      <img
        src="./assets/arrow.png"
        alt="Arrow icon"
        class="icon arrow"
        onclick="location.href='./#experience'"
      />
    </section>
    <section id="experience">
      <p class="section__text__p1">Explore My</p>
      <h1 class="title">Experience</h1>
      <div class="experience-details-container">
        <div class="about-containers">
          <div class="details-container">
            <h2 class="experience-sub-title">Technical Skills</h2>
            <div class="article-container">
              <article>
                <img
                  src="./assets/checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>Prog</h3>
                  <p>${GetSkills('Prog')}%</p>
                </div>
              </article>
              <article>
                <img
                  src="./assets/checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>Sys-Admin</h3>
                  <p>${GetSkills('Sys-Admin')}%</p>
                </div>
              </article>
              <article>
                <img
                  src="./assets/checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>Front-End</h3>
                  <p>${GetSkills('Front-End')}%</p>
                </div>
              </article>
              <article>
                <img
                  src="./assets/checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>Back-End</h3>
                  <p>${GetSkills('Back-End')}%</p>
                </div>
              </article>
              <article>
                <img
                  src="./assets/checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>Stats</h3>
                  <p>${GetSkills('Stats')}%</p>
                </div>
              </article>
              <article>
                <img
                  src="./assets/checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>Game</h3>
                  <p>${GetSkills('Stats')}%</p>
                </div>
              </article>
              <article>
                <img
                  src="./assets/checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>Tcp</h3>
                  <p>${GetSkills('Tcp')}%</p>
                </div>
              </article>
              <article>
                <img
                  src="./assets/checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>Algo</h3>
                  <p>${GetSkills('Algo')}%</p>
                </div>
              </article>
            </div>
          </div>
          <div class="details-container">
            <h2 class="experience-sub-title">Technologies</h2>
            <div class="article-container">
              <article>
                <img
                  src="./assets/checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>GO</h3>
                  <p>${GetSkills('Go')}%</p>
                </div>
              </article>
              <article>
                <img
                  src="./assets/checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>JS</h3>
                  <p>${GetSkills('Js')}%</p>
                </div>
              </article>
              <article>
                <img
                  src="./assets/checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>Html</h3>
                  <p>${GetSkills('Html')}%</p>
                </div>
              </article>
              <article>
                <img
                  src="./assets/checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>Css</h3>
                  <p>${GetSkills('Css')}%</p>
                </div>
              </article>
              <article>
                <img
                  src="./assets/checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>Unix</h3>
                  <p>${GetSkills('Unix')}%</p>
                </div>
              </article>
              <article>
                <img
                  src="./assets/checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>Docker</h3>
                  <p>${GetSkills('Docker')}%</p>
                </div>
              </article>
              <article>
                <img
                  src="./assets/checkmark.png"
                  alt="Experience icon"
                  class="icon"
                />
                <div>
                  <h3>Sql</h3>
                  <p>${GetSkills('Sql')}%</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      <img
        src="./assets/arrow.png"
        alt="Arrow icon"
        class="icon arrow"
        onclick="location.href='./#projects'"
      />
    </section>
    <section id="projects">
      <p class="section__text__p1"></p>
      <h1 class="title">Audits</h1>
      <div class="audits">
        ${getAudits(data.data.audit)}
      </div>
      <img
        src="./assets/arrow.png"
        alt="Arrow icon"
        class="icon arrow"
        onclick="location.href='./#contact'"
      />
    </section>
    <section id="contact">
      <p class="section__text__p1">Get in Touch</p>
      <h1 class="title">Graphs</h1>
      <div id="chart_div"></div>
      <div id="chart_div1"></div>

    </section>
    <footer>
      <nav>
        <div class="nav-links-container">
          <ul class="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#projects">Audits</a></li>
            <li><a href="#contact">Graphs</a></li>
          </ul>
        </div>
      </nav>
      <p>Copyright &#169; 2024 Papa Abdoulaye Diop. All Rights Reserved.</p>
    </footer>
  `
}



function GetSkill(data) {
  let skills = this
  for (const skill of skills) {
    if(skill.transaction_type.type == "skill_"+ data.toLowerCase()) {
      return skill.transaction_type.transactions_aggregate.aggregate.max.amount
    }
  }
  return 0

}
function getAudits(audits) {
  let res =  ''
  audits.forEach(aud => {
    res += `
    <div class="audit">
      <span>${aud.group.captainLogin}</span>
      <span>${aud.group.object.name}</span>
      <span class= "${aud.grade >= 1 ? "PASS" : "FAIL"}">${aud.grade >= 1 ? "PASS" : "FAIL"}</span>
    </div>
    `
  })
  return res
}