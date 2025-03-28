//funciones para capturar elementos
const $ = element => document.querySelector(element)
const $$ = element => document.querySelectorAll(element)

//captura de elementos html
const $containerPersonajes = $("#container-personajes")
const $btnSiguiente = $("#boton-siguiente")
const $btnAnterior = $("#boton-anterior")


let currentPage = 1;

//mostrar personajes
function pintarDatos(arrayPersonajes) {
  $containerPersonajes.innerHTML = ""
  for (const personaje of arrayPersonajes) {
    console.log(personaje)
    $containerPersonajes.innerHTML += `<div class="personaje"><img src="${personaje.image}"><h3>${personaje.name}</h3></div>`
  }
}

//obtener personajes
function obtenerDatos(page) {
    let characters = []
    axios(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then(response => {                                 
        characters = response.data.results;  
        console.log(characters)
        pintarDatos(characters)
      })
      .catch(error => {
        $containerPersonajes.innerHTML = ""
      })
  }

//paginacion
$btnSiguiente.addEventListener("click", () => {
    currentPage += 1
    obtenerDatos(currentPage)
  })
  
  $btnAnterior.addEventListener("click", () => {
    currentPage -= 1
    obtenerDatos(currentPage)
  })
//aqui falta que no tome numeros negativos, podria ser con un if en ambos para que tenga  un minimo de 0 y un maximo de la cantidad de paginas que tiene por el resultado, un valor const maxPage = el calculo que divida el total por 20 que es la cantidad de personajes que muestra por cada pagina






  window.onload = () => {
    obtenerDatos(currentPage)
  };