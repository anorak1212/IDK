// === CONFIGURACIÓN CENTRALIZADA ===
const FECHA_OBJETIVO = new Date(new Date().getFullYear(), 6, 26, 11, 11, 0);
const INDICE_CONTADOR = 9;
const ENLACE_SECRETO = "https://open.spotify.com/playlist/0VWAGDWCLErw12a7ZrmBR1X?si=oatWEnuNSgeZD6XnLfPkZA";
const COLOR_ENLACE = "#04D12FF";
const VELOCIDAD_TEXTO_LINK = 50; 
const INTERVALO_CONTADOR = 500;

const MENSAJES_INICIALES = [
    " > HAY TANTO QUE QUIERO CONTARTE",
    " > HAY TANTO QUE QUIERO SABER DE TI",
    " > YA PODEMOS EMPEZAR POCO A POCO",
    " > CUÉNTAME, ¿QUÉ TE TRAE POR AQUÍ?",
    " > NO TE ASUSTES DE DECIRME LA VERDAD",
    " > ESO NUNCA PUEDE ESTAR ASÍ TAN MALE",
    " > YO TAMBIÉN TENGO SECRETOS PARA DARTE",
    " > Y QUE SEPAS QUE YA NO ME SIRVEN MÁS",
    " > HAY TANTOS CAMINOS POR ANDAR:/",
    " ",
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
    const restante = FECHA_OBJETIVO - ahora;

    if (restante <= 0) {
        mensajes[INDICE_CONTADOR] = "> File accessed successfully";
        mostrarLink();
        return;
    }

    const dias = Math.floor(restante / (1000 * 60 * 60 * 24));
    const horas = Math.floor((restante / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((restante / (1000 * 60)) % 60);
    const segundos = Math.floor((restante / 1000) % 60);

    mensajes[INDICE_CONTADOR] = `> ACCESS IN ${dias} DAYS, ${horas} HOURS, ${minutos} MINUTES, AND ${segundos} SECONDS.`;
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
