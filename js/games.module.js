import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Home {
    constructor(){
       document.querySelectorAll('.nav-link').forEach((link)=>{
        link.addEventListener('click' , ()=>{
           this.changeActiveLink(link);

           const cat = link.dataset.category;
          // console.log(cat)
           this.getGames(cat);
        })
       });
       
       this.ui = new Ui ;

       this.getGames("MMORPG");
    }


 changeActiveLink(link){
    document.querySelector('.navbar-nav .active').classList.remove("active");
    link.classList.add("active");
}

async getGames(category){
    const loading = document.querySelector(".loading");
    const details = document.getElementById('details');
    const game = document.getElementById('game');
    loading.classList.remove("d-none");
    const options ={
        method: "GET",
         headers: {
            "X-RapidAPI-Key": "761b8a3226msh868f0d927cb6ea4p117ef0jsn46d63d281712",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            Accept: "application/json",
            "Content-Type": "application/json",
         },
    };
  const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}` , options);
  const response = await api.json();
  loading.classList.add("d-none");
  // console.log(response);
  this.ui.displayGamesData(response);

  document.querySelectorAll('.card').forEach((card)=>{
    card.addEventListener('click' , ()=>{
        details.classList.remove('d-none');
        game.classList.add('d-none');
        new Details(card.dataset.id);
        })
  })
  
}

}