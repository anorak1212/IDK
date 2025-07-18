// === CONFIGURACIÓN CENTRALIZADA ===
const FECHA_OBJETIVO = new Date(new Date().getFullYear(), 6, 26, 11, 11, 0);
const INDICE_CONTADOR = 10;
const ENLACE_SECRETO = "";
const COLOR_ENLACE = "#00FFFF";
const VELOCIDAD_TEXTO_LINK = 50;
const INTERVALO_CONTADOR = 500;

const MENSAJES_INICIALES = [
    "> SI SIGUE JUGANDO CONMIGO TE VAS A QUEMAR",
    "> ESTA BELLAQUERA TUYA NO ES NORMAL",
    "> TU TIENES A ALGUIEN",
    "> CUIDAO NO MENCIONES MI NOMBRE",
    "> LO NUESTRO ES PECADO HOY NO VAMO A QUEMAR",
    "> DALE VEN, MATEMOS LAS GANAS",
    "> LLEGAS Y TE VAS DE LA NADA",
    "> YO NO SE SI ESTARE MAÑANA",
    "> EL NO SABE QUE TU A MI RECLAMAS",
    "> CUANDO TU ESTAS SOLA TU SIEMPRE ME LLAMAS"
];


const CONTENEDOR_TEXTO = document.getElementById("text-container");
let mensajes = [...MENSAJES_INICIALES];
let indiceMensaje = 0;

// === FUNCIONES AUXILIARES ===

function crearLinea(texto) {
    const linea = document.createElement("div");
    linea.classList.add("line");
    linea.textContent = texto;
    CONTENEDOR_TEXTO.appendChild(linea);
    return linea;
}

function actualizarMensajeContador() {
    const ahora = new Date();
    let restante = FECHA_OBJETIVO - ahora;

    const dias = Math.max(0, Math.floor(restante / (1000 * 60 * 60 * 24)));
    const horas = Math.max(0, Math.floor((restante / (1000 * 60 * 60)) % 24));
    const minutos = Math.max(0, Math.floor((restante / (1000 * 60)) % 60));
    const segundos = Math.max(0, Math.floor((restante / 1000) % 60));

    const mensajeFinal = `> ACCESS IN ${dias} DAYS, ${horas} HOURS, ${minutos} MINUTES, AND ${segundos} SECONDS.`;
    mensajes[INDICE_CONTADOR] = mensajeFinal;

    const lineas = document.querySelectorAll(".line");
    const lineaContador = lineas[INDICE_CONTADOR] || null;
    if (lineaContador) {
        lineaContador.textContent = mensajeFinal;
        lineaContador.classList.add("neon-rojo");
    }

    if (restante <= 0) {
        mensajes[INDICE_CONTADOR] = "> ACCESS IN 0 DAYS, 0 HOURS, 0 MINUTES, AND 0 SECONDS.";
        if (lineaContador) {
            lineaContador.textContent = mensajes[INDICE_CONTADOR];
            lineaContador.classList.add("neon-rojo");
        }
        mostrarLink();
    }
}


function mostrarLink() {
    const enlace = document.createElement("a");
    enlace.href = ENLACE_SECRETO;
    enlace.target = "_blank";
    enlace.classList.add("line"); // Igual que las demás líneas
    enlace.classList.add("typing"); // Aplica animación

    CONTENEDOR_TEXTO.appendChild(enlace);

    let textoLink = "";
    let i = 0;

    function escribirCaracter() {
        if (i < ENLACE_SECRETO.length) {
            textoLink += ENLACE_SECRETO[i];
            enlace.textContent = textoLink;
            i++;
            setTimeout(escribirCaracter, VELOCIDAD_TEXTO_LINK);
        } else {
            enlace.classList.add("typing-complete");
        }
    }

    escribirCaracter();
}


function mostrarSiguienteMensaje() {
    if (indiceMensaje < mensajes.length) {
        if (indiceMensaje === INDICE_CONTADOR) {
            const lineaContador = crearLinea(mensajes[INDICE_CONTADOR]);
            lineaContador.classList.add("neon-rojo");

            const intervalo = setInterval(() => {
                actualizarMensajeContador();
                lineaContador.textContent = mensajes[INDICE_CONTADOR];

                if (new Date() >= FECHA_OBJETIVO) {
                    clearInterval(intervalo);
                }
            }, INTERVALO_CONTADOR);

            return;
        }

        const linea = crearLinea(mensajes[indiceMensaje]);
        requestAnimationFrame(() => {
            linea.classList.add("typing");
        });

        linea.addEventListener("animationend", () => {
            linea.classList.add("typing-complete");
            indiceMensaje++;
            mostrarSiguienteMensaje();
        });
    }
}

// === INICIO DE LA EJECUCIÓN ===
actualizarMensajeContador();
mostrarSiguienteMensaje();
