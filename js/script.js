const inputPrimerEquipo = document.querySelector('#inputPrimerEquipo');
const botonPrimerEquipo = document.querySelector('#botonPrimerEquipo');
const segundoEquipo = document.querySelector('#segundoEquipo');
const cantidadJugadores = document.querySelector('#cantidadJugadores');
const contenedor = document.querySelector('.contenido');

inputPrimerEquipo.addEventListener('input', function(event) {
    this.value = this.value.replace(/[0-9]/g, '');
});

botonPrimerEquipo.addEventListener('click', registrar);

function registrar(){
    const nombrePrimerEquipo = inputPrimerEquipo.value.trim();
    if(nombrePrimerEquipo === ""){
        alert("Debes ingresar un nombre para tu equipo");
    } else {
        if(nombrePrimerEquipo.length > 20){
            alert("El nombre debe contener máximo 20 caracteres");
        } else {
            inputPrimerEquipo.setAttribute('readonly', true);
            botonPrimerEquipo.remove();
            segundoEquipo.innerHTML =
            `
                <h2 class="textojs">Ingresa el nombre del segundo equipo:</h2>
                <input type="text" id="inputSegundoEquipo" title="Máximo 20 caracteres" class="input">
                <button id="botonSegundoEquipo" class="btn">Registrar segundo equipo</button>
            `;
            
            const inputSegundoEquipo = document.querySelector('#inputSegundoEquipo');
            const botonSegundoEquipo = document.querySelector('#botonSegundoEquipo');

            inputSegundoEquipo.addEventListener('input', function(event) {
                this.value = this.value.replace(/[0-9]/g, '');
            });

            botonSegundoEquipo.addEventListener('click', function() {
                registrarDos(inputSegundoEquipo);
            });
        }
    }
}

function registrarDos(inputSegundoEquipo) {
    const nombreSegundoEquipo = inputSegundoEquipo.value.trim();

    if (nombreSegundoEquipo === "") {
        alert("Debes ingresar un nombre para el segundo equipo");
    } else {
        if (nombreSegundoEquipo.length > 20) {
            alert("El nombre debe contener máximo 20 caracteres");
        } else {
            inputSegundoEquipo.setAttribute('readonly', true);
            botonSegundoEquipo.remove();
            cantidadJugadores.innerHTML =
            `
                <h2 class="textojs">Ingresa la cantidad de jugadores por equipo:</h2>
                <label for="cincoJugadores">5</label>
                <input type="checkbox" id="cincoJugadores" class="input">
                <label for="seisJugadores">6</label>
                <input type="checkbox" id="seisJugadores" class="input">
                <label for="sieteJugadores">7</label>
                <input type="checkbox" id="sieteJugadores" class="input">
                <button id="botonCantidadJugadores" class="btn">Ingresar cantidad</button>
            `;
            
            const opcion1 = document.querySelector('#cincoJugadores');
            const opcion2 = document.querySelector('#seisJugadores');
            const opcion3 = document.querySelector('#sieteJugadores');
            const botonCantidadJugadores = document.querySelector('#botonCantidadJugadores');

            function handleCheckboxChange(event) {
                if (event.target.checked) {
                    opcion1.checked = (event.target === opcion1);
                    opcion2.checked = (event.target === opcion2);
                    opcion3.checked = (event.target === opcion3);
                }
            }
    
            opcion1.addEventListener("change", handleCheckboxChange);
            opcion2.addEventListener("change", handleCheckboxChange);
            opcion3.addEventListener("change", handleCheckboxChange);

            botonCantidadJugadores.addEventListener("click", comprobar);

            function comprobar() {
                let cantidadTotal = 0;

                if(opcion1.checked){
                    cantidadTotal = 5;
                } else if(opcion2.checked){
                    cantidadTotal = 6;
                } else if(opcion3.checked){
                    cantidadTotal = 7;
                } else {
                    alert("Selecciona una opción");
                    return;
                }

                botonCantidadJugadores.remove();
                formularioJugadores(cantidadTotal);
            }

            function formularioJugadores(cantidadTotal) {
                let dobleJugadores = cantidadTotal * 2;
                const jugadores = document.createElement("div");
                jugadores.id = "jugadores";
            
                jugadores.innerHTML = `
                    <h1 class="textojs">Ingresa los nombres de los jugadores</h1>
                `;
            
                for (let i = 1; i <= dobleJugadores; i++) {
                    jugadores.innerHTML += `
                        <label for="jugador${i}">Jugador ${i}:</label>
                        <input type="text" id="jugador${i}" name="jugador${i}" title="Nombre del jugador ${i}" class="input">
                    `;
                }
            
                jugadores.innerHTML += `
                    <button id="validarJugadores" class="btn">Validar jugadores</button>
                `;
            
                contenedor.appendChild(jugadores);
            
                const botonValidar = document.querySelector("#validarJugadores");
            
                botonValidar.addEventListener("click", function() {
                    let todosLlenos = true;
                    let nombresJugadores = [];
            
                    for (let i = 1; i <= dobleJugadores; i++) {
                        const input = document.querySelector(`#jugador${i}`);
                        const nombreJugador = input.value.trim();
            
                        if (nombreJugador === "") {
                            todosLlenos = false;
                            alert(`Falta el nombre del jugador ${i}`);
                        } else {
                            nombresJugadores.push(nombreJugador);
                        }
                    }
            
                    if (todosLlenos) {
                        const nombrePrimerEquipo = inputPrimerEquipo.value.trim();
                        const nombreSegundoEquipo = inputSegundoEquipo.value.trim();
                        
                        botonValidar.remove();

                        function designarJugadores(array){

                            let revuelta = array.sort(() => Math.random() - 0.5);
                            
                            const mitad = Math.floor(revuelta.length / 2);
                            const equipo1 = revuelta.slice(0, mitad);
                            const equipo2 = revuelta.slice(mitad);

                            const resultados = document.createElement("div");
                            resultados.id = "resultadosEquipos";
                        
                            resultados.innerHTML = `
                            <h2 class="textojs">Equipo ${nombrePrimerEquipo}:</h2>
                            <ul>${equipo1.map(jugador => `<li>${jugador}</li>`).join('')}</ul>
                            <h2 class="textojs">Equipo ${nombreSegundoEquipo}:</h2>
                            <ul>${equipo2.map(jugador => `<li>${jugador}</li>`).join('')}</ul>
                            `;

                            contenedor.appendChild(resultados);
                        }

                        designarJugadores(nombresJugadores, nombrePrimerEquipo, nombreSegundoEquipo);
                    }


                });
            }
        }
    }
}
