import scss from './scss/main.scss'




(()=>{
	let hamburger = document.querySelector(".hamburger"),
		 navegacion = document.getElementById('nav')

  hamburger.addEventListener("click", ()=>{
  	hamburger.classList.toggle("is-active")
  	navegacion.classList.toggle('active')

  });
 
})()