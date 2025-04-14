//esto va despues de construirURL


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

