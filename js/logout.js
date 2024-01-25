import { LoadSignInPage } from "./login.js";
import { LoadMainPage } from "./main.js";
export function ActivateListenner() {

    let logo = document.getElementById("logo-img");
    logo.addEventListener('click' , () => {
        LoadMainPage()
    })


    let logoutBtns = document.querySelectorAll(".logoutImg");
    logoutBtns.forEach(logoutBtn => {
        logoutBtn.addEventListener('click' , ()=> {
            localStorage.removeItem("graphql_token");
            LoadSignInPage()
        })
    });
}
export function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
  