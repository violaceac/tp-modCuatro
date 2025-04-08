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

const $containerStatus = $("#container-status");
const $containerGenero = $("#container-genero");
const $selectStatus = $("#select-status");
const $selectGenero = $("#select-genero");

const $spanResultados = $("#cantidad-resultados");

//variables
let currentPage = 1;
let maxPage = 1;
let currentSearch = "";
let url =""
let cantidadResultados = ""


// obtener datos al cargar la pagina
async function obtenerDatos(page, tipo) {
    try {
      let url = construirURL(tipo, page);
      const response = await axios(url);
      console.log(url)

      cantidadResultados = response.data.info.count;

      return response.data;
    } catch (error) {
      console.log("Error en la búsqueda:", error);
      return null;
    }
  }


//asignar url segun tipo de busqueda (episodios o personajes)
function construirURL(tipo, page) {
    const hayBusqueda = currentSearch !== "";

    if (hayBusqueda) {
        url = tipo === "episodios" ? `https://rickandmortyapi.com/api/episode/?name=${currentSearch}&page=${page}` : `https://rickandmortyapi.com/api/character/?name=${currentSearch}&page=${page}`;
    } else {
        url = tipo === "episodios" ? `https://rickandmortyapi.com/api/episode?page=${page}` : `https://rickandmortyapi.com/api/character?page=${page}`;
    }
    return url

  }

// mostrar personajes
function pintarPersonajes(arrayPersonajes) {
    console.log("se pintaron los personajes de la pagina", `${currentPage}`)

    $containerResultados.innerHTML = "";
    pintarResultados()

    for (const personaje of arrayPersonajes) {
         $containerResultados.innerHTML += `<div class="personaje"><img src="${personaje.image}"><h3>${personaje.name}</h3></div>`
    }
}
// mostrar episodios
function pintarEpisodios(arrayEpisodios) {
    console.log("se pintaron los episodios de la pagina", `${currentPage}`)
    console.log(maxPage)
    console.log(arrayEpisodios)
    $containerResultados.innerHTML = "";
    pintarResultados()

    for (const episodio of arrayEpisodios) {
         $containerResultados.innerHTML += `<div class="episodio">
         <h3>${episodio.name}</h3>
         <span>${episodio.air_date}</span>
         <span>${episodio.episode}</span>

         </div>`
    }
}
//mostrar cantidad de resultados
function pintarResultados() {
    const tipo = $inputBusqueda.value

    $spanResultados.innerText = `${cantidadResultados} resultados`
}


//mostrar u ocultar elementos
function mostrarElemento(selectors) {
    for (const selector of selectors) {
        selector.style.display = "block";
    }
  };
  function ocultarElemento(selectors) {
    for (const selector of selectors) {
        selector.style.display = "none";
    }
  };

//seleccionar tipo
$selectTipo.addEventListener("input", async () => {
    currentPage = 1;
    const tipo = $selectTipo.value;
  
    const data = await obtenerDatos(currentPage, tipo);
  
  
    if (tipo === "episodios") {
      pintarEpisodios(data.results);
      ocultarElemento([$containerStatus, $containerGenero]);
    } else {
      pintarPersonajes(data.results);
      mostrarElemento([$containerStatus, $containerGenero]);
    }
  
    maxPage = data.info.pages;
  });

//buscar
$btnBuscar.addEventListener("click", async () => {
    $containerResultados.innerHTML = `<h1>Loading...</h1>`;
    currentPage = 1;
    currentSearch = $inputBusqueda.value;
    const tipo = $selectTipo.value;
  
    const data = await obtenerDatos(currentPage, tipo);
  
    if (tipo === "episodios") {
      pintarEpisodios(data.results);
    } else {
      pintarPersonajes(data.results);
    }
    maxPage = data.info.pages;
  });

//paginacion
$btnSiguiente.addEventListener("click", async () => {

    if(currentPage < maxPage) {
        currentPage++;
        const tipo = $selectTipo.value;
  
        const data = await obtenerDatos(currentPage, tipo);

        if(tipo === "episodios") {
            pintarEpisodios(data.results)
        } else {
            pintarPersonajes(data.results)
        }
        maxPage = data.info.pages;
    } 
});
$btnAnterior.addEventListener("click", async () => {
    if(currentPage > 1) {
        currentPage--;
        const tipo = $selectTipo.value;
  
        const data = await obtenerDatos(currentPage, tipo);

        if(tipo === "episodios") {
            pintarEpisodios(data.results)
        } else {
            pintarPersonajes(data.results)
        }
        maxPage = data.info.pages;
    }
});
$btnPrimera.addEventListener("click", async () => {
    if(currentPage != 1) {
        currentPage = 1
        const tipo = $selectTipo.value;

        const data = await obtenerDatos(currentPage, tipo);

        if(tipo === "episodios") {
            pintarEpisodios(data.results)
        } else {
            pintarPersonajes(data.results)
        }
        maxPage = data.info.pages;
    }
})
$btnUltima.addEventListener("click", async () => {
    if(currentPage < maxPage) {
        currentPage = maxPage
        const tipo = $selectTipo.value;
        
        const data = await obtenerDatos(currentPage, tipo);

        if(tipo === "episodios") {
            pintarEpisodios(data.results)
        } else {
            pintarPersonajes(data.results)
        }
        maxPage = data.info.pages;
    }
})





















  window.onload = async () => {
    currentPage = 1;
    currentSearch = ""; 
    tipo = $inputBusqueda.value
  
    const data = await obtenerDatos(currentPage, tipo);
    if (data) {
      maxPage = data.info.pages;
      pintarPersonajes(data.results);
    }
  };