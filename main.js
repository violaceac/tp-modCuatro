//funciones para capturar elementos
const $ = element => document.querySelector(element)
const $$ = element => document.querySelectorAll(element)

//captura de elementos html
const $containerResultados = $("#container-resultados")

const $btnSiguiente = $("#boton-siguiente")
const $btnAnterior = $("#boton-anterior")
const $btnPrimera = $("#boton-primera")
const $btnUltima = $("#boton-ultima")

const $inputBusqueda = $("#input-busqueda")
const $selectTipo = $("#tipo")
const $btnBuscar = $("#boton-buscar")



let currentPage = 1;
let maxPage = 1;
let currentSearch = "";
let url =""



// obtener datos al cargar la pagina
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

// mostrar personajes
// function pintarDatos(arrayPersonajes) {
//     console.log("se pintaron los datos de la pagina", `${currentPage}`)
//     $containerResultados.innerHTML = "";
//     for (const personaje of arrayPersonajes) {
//         // console.log(personaje)
//         $containerResultados.innerHTML += `<div class="personaje"><img src="${personaje.image}"><h3>${personaje.name}</h3></div>`
//     }
// }
//pintarDatos ====> pintarPersonajes y pintarEpisodios

function pintarPersonajes(arrayPersonajes) {
    console.log("se pintaron los datos de la pagina", `${currentPage}`)
    $containerResultados.innerHTML = "";
    currentPage = 1;

    for (const personaje of arrayPersonajes) {
         $containerResultados.innerHTML += `<div class="personaje"><img src="${personaje.image}"><h3>${personaje.name}</h3></div>`
    }
}

function pintarEpisodios(arrayEpisodios) {
    console.log("se pintaron los datos de la pagina", `${currentPage}`)
    $containerResultados.innerHTML = "";
    currentPage = 1;

    for (const episodio of arrayEpisodios) {
         $containerResultados.innerHTML += `<div class="episodio">
         <h3>${episodio.name}</h3>
         <span>${episodio.air_date}</span>
         <span>${episodio.episode}</span>

         </div>`
    }
}


//buscar
$btnBuscar.addEventListener("click", async () => {
    $containerResultados.innerHTML = `<h1>Loading...</h1>`;
    currentPage = 1;
    currentSearch = $inputBusqueda.value;

    const data = await obtenerDatos(currentPage); //porque me tira este error si finalmente cuando le saco await no lo espera y me da error por ejemplo en maxPage
    if($selectTipo.value === "episodios") {
        pintarEpisodios(data.results)
        console.log(data.results)
        console.log(data)
    } else {
        pintarPersonajes(data.results)
    }

    maxPage = data.info.pages;
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
// $btnSiguiente.addEventListener("click", async () => {
//     console.log(maxPage)
//     if(currentPage < maxPage) {
//         currentPage++;
//         const data= await obtenerDatos(currentPage);
//         pintarDatos(data.results)
//         console.log(data.results)
//         console.log(currentPage) 
//     }
// });
// $btnAnterior.addEventListener("click", async () => {
//     if (currentPage > 1) {
//         currentPage--;
//         const data = await obtenerDatos(currentPage);
//         pintarDatos(data.results)
//         console.log(data.results)
//         console.log(currentPage)
//     }
// });
// $btnPrimera.addEventListener("click", async () => {
//     if(currentPage != 1) {
//         currentPage = 1
//         const data = await obtenerDatos(currentPage);
//         pintarDatos(data.results)
//     }
// })
// $btnUltima.addEventListener("click", async () => {
//     if(currentPage < maxPage) {
//         currentPage = maxPage
//         const data = await obtenerDatos(currentPage);
//         pintarDatos(data.results)
//     }
// })





















  window.onload = async () => {
    currentPage = 1;
    currentSearch = ""; 
  
    const data = await obtenerDatos(currentPage);
    if (data) {
      maxPage = data.info.pages;
      pintarPersonajes(data.results);
    }
  };