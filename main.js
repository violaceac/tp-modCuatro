//funciones para capturar elementos
const $ = element => document.querySelector(element)
const $$ = element => document.querySelectorAll(element)

//captura de elementos html
const $containerPersonajes = $("#container-personajes")

const $btnSiguiente = $("#boton-siguiente")
const $btnAnterior = $("#boton-anterior")

const $inputBusqueda = $("#input-busqueda")
const $selectTipo = $("#tipo")
const $btnBuscar = $("#boton-buscar")



let currentPage = 1;
let maxPage = 1;
let currentSearch = "";
let url =""

// obtener y pintar datos al cargar la pagina
async function obtenerDatos(page) {
    try {
        let url = currentSearch ? tipoDeBusqueda(page) : `https://rickandmortyapi.com/api/character?page=${page}`;

        const response = await axios(url);
        // console.log(response)
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.log("Error en la búsqueda:", error);
        return null
    }
}


//buscar
$btnBuscar.addEventListener("click", async () => {
    $containerPersonajes.innerHTML = `<h1>Loading...</h1>`;
    currentPage = 1;
    currentSearch = $inputBusqueda.value;

    const data = await obtenerDatos(currentPage); //porque me tira este error si finalmente cuando le saco await no lo espera y me da error por ejemplo en maxPage
    if(data) {
        maxPage = data.info.pages;
        pintarDatos(data.results)
    }
});


function tipoDeBusqueda(page) {
    if($selectTipo.value === "episodios") {
    url = `https://rickandmortyapi.com/api/episode/?name=${currentSearch}&page=${page}`
} else {
    url = `https://rickandmortyapi.com/api/character/?name=${currentSearch}&page=${page}`
}
return url
}



//paginacion
$btnSiguiente.addEventListener("click", async () => {
    console.log(maxPage)
    if(currentPage < maxPage) {
        currentPage++;
        const data= await obtenerDatos(currentPage);
        pintarDatos(data.results)
        console.log(data.results)
        console.log(currentPage) 
    }
});
$btnAnterior.addEventListener("click", async () => {
    if (currentPage > 1) {
        currentPage--;
        const data = await obtenerDatos(currentPage);
        pintarDatos(data.results)
        console.log(data.results)
        console.log(currentPage)
    }
});
//faltan botones primera pagina y ultima


// Mostrar personajes
function pintarDatos(arrayPersonajes) {
    console.log("se pintaron los datos de la pagina", `${currentPage}`)
    $containerPersonajes.innerHTML = "";
    for (const personaje of arrayPersonajes) {
        // console.log(personaje)
        $containerPersonajes.innerHTML += `<div class="personaje"><img src="${personaje.image}"><h3>${personaje.name}</h3></div>`
    }
}
//pintarDatos ====> pintarPersonajes y pintarEpisodios















//   window.onload = () => {
//     obtenerDatos(currentPage)
//     pintarDatos(response.data.results)
//   };

  window.onload = async () => {
    currentPage = 1;
    currentSearch = ""; // sin búsqueda inicial
  
    const data = await obtenerDatos(currentPage);
    if (data) {
      maxPage = data.info.pages;
      pintarDatos(data.results);
    }
  };