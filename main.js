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
const $divCantidadYResultados = $("#container-cantidad-resultados");
const $divBotonesPaginacion = $("#container-botones");

const $divPersonajeIndividual = $("#container-personaje-individual");
const $divEpisodioIndividual = $("#container-episodio-individual");

//variables
let currentPage = 1;
let maxPage = 1;
let currentSearch = "";
let url =""
let cantidadResultados = ""
let tipo = ""


//endpoints api
// base https://rickandmortyapi.com/api
// characters: "https://rickandmortyapi.com/api/character",
//https://rickandmortyapi.com/api/character/${id}   con el parametro de id pasado para cuando quiero acceder a un personaje especifico

// episodes: "https://rickandmortyapi.com/api/episode"


// obtener datos de la url
async function obtenerDatos(url) {
    try {
      
      const response = await axios(url);
      console.log(url)
      console.log(response)

      maxPage = response.data.info.pages;
      cantidadResultados = response.data.info.count;


      console.log(response.data)
      return response.data;
    } catch (error) {
      console.log("Error en la búsqueda:", error);
      return null;
    }
  }


//asignar url segun tipo de busqueda (episodios o personajes)
function construirURL(tipo, page) {
    const hayBusqueda = currentSearch !== "";
    console.log($selectStatus.value)


    if (hayBusqueda) {
        url = tipo === "episode" ? `https://rickandmortyapi.com/api/episode/?name=${currentSearch}&page=${page}` : `https://rickandmortyapi.com/api/character/?name=${currentSearch}&page=${page}`;
    } else {
        url = tipo === "episode" ? `https://rickandmortyapi.com/api/episode?page=${page}` : `https://rickandmortyapi.com/api/character?page=${page}`;
    }

    console.log(url)
    return url
  }


//mostrar u ocultar elementos
function mostrarElemento(selectors) {
  for (const selector of selectors) {
      selector.classList.remove("hidden");
  }
};
function ocultarElemento(selectors) {
  for (const selector of selectors) {
    selector.classList.add("hidden");
  }
};

//mostrar cantidad de resultados
function pintarResultados() {
  $spanResultados.innerText = `${cantidadResultados} resultados`
}

//============== personajes ==================

// mostrar personajes
function pintarPersonajes(arrayPersonajes) {
  console.log("se pintaron los personajes de la pagina", `${currentPage}`)

  $containerResultados.innerHTML = "";
  pintarResultados()

  for (const personaje of arrayPersonajes) {
       $containerResultados.innerHTML += `
       <div class="personaje hover:scale-110 w-[300px] h-[300px] mx-5 flex flex-col justify-center items-center ">
       <img class="h-60 w-60" src="${personaje.image}">
       <h3 class="m-4 text-roboto text-grisOscuro" >${personaje.name}</h3>
       </div>`
  }
  // personajesClick(arrayPersonajes)
}


//entre estos dos deberia poner una condicion que decida si lo hago desde la card o desde la vista general para meterlo o no dentro de un div? de que dependeria esta condicion?

//mostrar episodios
function pintarEpisodios(arrayEpisodios) {
  console.log("se pintaron los episodios de la pagina", `${currentPage}`)
  console.log(maxPage)
  console.log(arrayEpisodios)
  $containerResultados.innerHTML = "";
  pintarResultados()

  for (const episodio of arrayEpisodios) {
       $containerResultados.innerHTML += `<div class="episodio w-[300px] h-[100px] my-2.5 mx-5 p-2.5 border border-solid border-grisOscuro rounded-[10px] flex flex-col justify-center items-start">
       <h3 class="text-roboto text-nombreEpisodio my-[5px]" >${episodio.name}</h3>
       <span class="text-roboto text-grisOscuro" >${episodio.air_date}</span>
       <span class="text-roboto text-grisOscuro" >${episodio.episode}</span>
       </div>`
  }
}

//hacer clickeabes los personajes
//pintar la card del personaje individual
//traer el array de episodios donde participa el personaje individual
//pintar los episodios en la card del personaje individual
//hacer clickeables los episodios









//seleccionar tipo
$selectTipo.addEventListener("input", async () => {
    currentPage = 1;
    const tipo = $selectTipo.value;

    url = construirURL(tipo, currentPage)


    const data = await obtenerDatos(url);
    console.log(data)
  
    if (tipo === "episode") {
      pintarEpisodios(data.results);
      ocultarElemento([$containerStatus, $containerGenero]);
    } else {
      pintarPersonajes(data.results);
      mostrarElemento([$containerStatus, $containerGenero]);
    }
  
    maxPage = data.info.pages;
  });

  $selectGenero.addEventListener("input", async () => {
    currentPage = 1;
    const tipo = $selectTipo.value;
    

    url = construirURL(tipo, currentPage)
    hayGenero(url)
    hayStatus(url)
    console.log(url)

    const data = await obtenerDatos(url)
    console.log(data)

    pintarPersonajes(data.results)
  })

  function hayGenero() {
    if($selectGenero.value !== "") {
      url += `&gender=${$selectGenero.value}`
    } else {
      return url
    }
    return url
  }

//selccionar status
$selectStatus.addEventListener("input", async () => {
  currentPage = 1;
  const tipo = $selectTipo.value;
  

  url = construirURL(tipo, currentPage)
  hayGenero(url)
  hayStatus(url)
  console.log(url)

  const data = await obtenerDatos(url)
  console.log(data)

  pintarPersonajes(data.results)
}) 

function hayStatus() {
  if($selectStatus.value !== "") {
    url += `&status=${$selectStatus.value}`
  } else {
    return url
  }
  return url
}


//buscar
$btnBuscar.addEventListener("click", async () => {
    $containerResultados.innerHTML = `<h1>Loading...</h1>`;
    currentPage = 1;
    currentSearch = $inputBusqueda.value;
    const tipo = $selectTipo.value;
  
    url = construirURL(tipo, currentPage)
    hayGenero()
    hayStatus()
    console.log(url)
    const data = await obtenerDatos(url);
  
    if (tipo === "episode") {
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
  
        url = construirURL(tipo,currentPage)
        hayGenero(url)
        hayStatus(url)

        const data = await obtenerDatos(url);

        if(tipo === "episode") {
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
  
        url = construirURL(tipo,currentPage)
        hayGenero(url)
        hayStatus(url)

        const data = await obtenerDatos(url);

        if(tipo === "episode") {
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

        url = construirURL(tipo,currentPage)
        hayGenero(url)
        hayStatus(url)

        const data = await obtenerDatos(url);

        if(tipo === "episode") {
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
        
        url = construirURL(tipo,currentPage)
        hayGenero(url)
        hayStatus(url)

        const data = await obtenerDatos(url);

        if(tipo === "episode") {
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
    url ="https://rickandmortyapi.com/api/character?page=1"
    tipo = "characters"
  
    const data = await obtenerDatos(url);
    if (data) {
      maxPage = data.info.pages;
      pintarPersonajes(data.results);
    }
  };