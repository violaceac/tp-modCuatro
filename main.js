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
    console.log(url)
    return url

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
    personajesClick(arrayPersonajes)
}
//agregar evento click a cada personajes
function personajesClick(arrayPersonajes) {
  const arrayCards = $$(".personaje")

  arrayCards.forEach((card, i) => { 
    card.addEventListener("click", () =>{
      mostrarElemento([$divPersonajeIndividual])
      ocultarElemento([$divCantidadYResultados, $divBotonesPaginacion])
      pintarPersonajeIndividual(arrayPersonajes[i]);
      console.log(arrayPersonajes[i])
    })
  })
}

//mostrar card de personaje individual
function pintarPersonajeIndividual(personaje) {
  console.log(personaje); 
  
  $divPersonajeIndividual.innerHTML = `
    <div class="card-personaje-individual text-roboto w-11/12 h-[700px] border border-solid border-black rounded-[20px] flex flex-col items-center">
      <img class="w-[200px] h-[200px] rounded-[20px] my-5" src="${personaje.image}" alt="${personaje.name}">
      <h2 class="text-grisLabel" >${personaje.name}</h2>
      <p>Estado: ${personaje.status}</p>
      <p>Especie: ${personaje.species}</p>
      <p>Género: ${personaje.gender}</p>
      <p>Origen: ${personaje.origin.name}</p>
      <div id="container-episodios" class="w-10/12 flex flex-wrap justify-center items-center gap-4 max-h-[100vh] overflow-y-auto" >aca va un loader</div>
    </div>
  `;
  episodiosPorPersonaje(personaje)
}

//traer el array de episodios por personaje y ejecutar la funcion que los pinta
async function episodiosPorPersonaje(personaje) {
  try {
    const arrayPromises = personaje.episode.map(elem => axios(elem))

        const response = await Promise.all(arrayPromises)

        pintarEpisodiosPorPersonaje(response)
        // lo ideal es que en el tp haya un loading en el div que contiene los episodios
    } catch (error) {
        console.log(error)
    }
}


//pintar episodios en la card de personaje
function pintarEpisodiosPorPersonaje(arrayEpisodios) {
  console.log(arrayEpisodios)
  const $divEpisodios = $("#container-episodios")
  $divEpisodios.innerHTML = "";

  const episodiosLimpios = arrayEpisodios.map(e => e.data)

  for (const episodio of episodiosLimpios) {
    $divEpisodios.innerHTML += `<div class="episodio  my-2.5 mx-5 p-2.5 border border-solid border-grisOscuro rounded-[10px] flex flex-col justify-center items-start">
         <h3 class="text-roboto text-nombreEpisodio my-[5px]" >${episodio.name}</h3>

         </div>
    `
  }

  console.log(episodiosLimpios)
  episodiosClick(episodiosLimpios)
}


// <span class="text-roboto text-grisOscuro" >${episodio.data.air_date}</span>
// <span class="text-roboto text-grisOscuro" >${episodio.data.episode}</span>


//============== episodios ==================

// mostrar episodios
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
    episodiosClick(arrayEpisodios)
}
//agregar eventos ckick a los episodios
function episodiosClick(arrayEpisodios) {
  const arrayCards = $$(".episodio")

  arrayCards.forEach((card, i) => { 
    card.addEventListener("click", () =>{
      mostrarElemento([$divEpisodioIndividual])
      ocultarElemento([$divCantidadYResultados, $divBotonesPaginacion, $divPersonajeIndividual])
      pintarEpisodioIndividual(arrayEpisodios[i]);
    })
  })
}
//mostrar card de cada episodio
function pintarEpisodioIndividual(episodio) {
  console.log(episodio); 
  
  $divEpisodioIndividual.innerHTML = `
  <div class="w-full h-[600px] flex flex-col items-center">
  <h3>${episodio.name}</h3>
  <span>${episodio.air_date}</span>
  <span>${episodio.episode}</span>
  <div id="container-personajes" class="w-10/12 flex flex-wrap justify-center items-center gap-4 max-h-[100vh] overflow-y-auto"></div>
  </div>
  `;
  personajesPorEpisodio(episodio)
}

//traer el array de personajes por episodio y ejecutar la funcion que los pinta
async function personajesPorEpisodio(episodio) {
  try {
    console.log(episodio)
    const arrayPromises = episodio.characters.map(elem => axios(elem))
    console.log(arrayPromises)

        const response = await Promise.all(arrayPromises)
        console.log(response)

        const personajesLimpios = response.map(p => p.data)
        pintarPersonajesPorEpisodio(personajesLimpios)
    } catch (error) {
        console.log(error)
    }
}




//pintar personajes en la card de episodios
function pintarPersonajesPorEpisodio(arrayPersonajes) {
  console.log(arrayPersonajes)
  const $divPersonajes = $("#container-personajes")
  $divPersonajes.innerHTML = "";

  for (const personaje of arrayPersonajes) {
    $divPersonajes.innerHTML += `
    <div class="personaje hover:scale-110 w-[300px] h-[300px] mx-5 flex flex-col justify-center items-center ">
    <img class="h-60 w-60" src="${personaje.data.image}">
    <h3 class="m-4 text-roboto text-grisOscuro" >${personaje.data.name}</h3>
    </div>`
  }
  personajesClick(arrayPersonajes)
}


//mostrar cantidad de resultados
function pintarResultados() {
    $spanResultados.innerText = `${cantidadResultados} resultados`
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