const cargarAPI = document.querySelector('#cargarAPI');
const resu = document.querySelector('#respuesta');
const resu2 = document.querySelector('#respuesta2');
const mensajeError = document.querySelector('#error');
const nombrePokemon = document.querySelector('#texto');
const estatus = document.querySelector('#status');

cargarAPI.addEventListener('click', obtenerDatos);

function obtenerDatos(){
    
    const url = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon.value.toLowerCase()}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarHTML(resultado))
        .catch(error => mostrarError(error))
}

function mostrarHTML(respuesta){
   limpiarHTML();
        const {abilities, name, types, sprites, height, weight, stats} = respuesta;
        const {front_shiny} = sprites;
        const [a, b, c, d, e] = abilities;

        let html = '';
        //Habilidades del pokemon
        abilities.forEach(element => {
            const {ability} = element;
            const {name} = ability
           
            const qq = document.createElement('p');
            html = `Habilidad: ${name}`
            qq.textContent = html;
            resu.appendChild(qq);
        });

        //Tipo de pokemon
        types.forEach( elemento => {
            const {type} = elemento;
            const {name} = type;

            const qq = document.createElement('p');
            html = `Tipo: ${name}`
            qq.textContent = html;
           
            resu.appendChild(qq);
           
        })
        //Datos de pelea
        stats.forEach( elemento => {
            const {base_stat, stat} = elemento;
            const {name} = stat;

            const datosGuerra = document.createElement('p');
            datosGuerra.innerHTML = `
            <h2>${name.toUpperCase()} = ${base_stat}</h2>
            `;
            estatus.appendChild(datosGuerra);

        })
    
        const altura = height / 10;
        const peso = weight / 10;
        const q = document.createElement('p');
            html = `
            <p>Altura : ${altura} m</p>
            Peso  : ${peso} kg`
            q.innerHTML = html;
            resu.appendChild(q);

        const qq = document.createElement('p');
            html = `
            <p>Nombre : ${name.toUpperCase()}</p>
            <img src="${front_shiny}" </img>`
            qq.innerHTML = html;
            resu2.appendChild(qq);
    

      console.log(respuesta);
      nombrePokemon.value = '';
    
}

function mostrarError(mensaje){

    limpiarHTML();
    const qq = document.createElement('p');
            html = `ERROR!!!!!  Ingresa correctamente el nombre del pokemon`
            qq.textContent = html;
            mensajeError.appendChild(qq);
}

function limpiarHTML(){
    while(resu.firstChild){
        resu.removeChild(resu.firstChild)
    }
    while(resu2.firstChild){
        resu2.removeChild(resu2.firstChild)
    }
    while(mensajeError.firstChild){
        mensajeError.removeChild(mensajeError.firstChild)
    }
    while(estatus.firstChild){
        estatus.removeChild(estatus.firstChild)
    }
}

