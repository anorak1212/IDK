
let linkMostrado = false;

const FECHA_OBJETIVO = new Date(new Date().getFullYear(), 11, 25, 12, 0, 0);
const INDICE_CONTADOR = 8;
const ENLACE_SECRETO = "https://goo.su/4yUKk";
const COLOR_ENLACE = "#00FFFF";
const VELOCIDAD_TEXTO_LINK = 30;
const INTERVALO_CONTADOR = 250;

const MENSAJES_INICIALES = [
  "> I LOOK FOR YOUR FACE INSIDE EVERY CROWD",
  "> I CALL OUT YOUR NAME JUST TO FEEL YOU AROUND",
  "> THE PERFUME YOU WEAR'S STILL THERE ON MY CLOTHES",
  "> I HANG ON EACH WORD YOU SEND ME FROM HOME",
  "> IT'S YOUR LOVE THAT GIVES ME WINGS AND WIND TO FLY",
  "> THROUGH ENDLESS DAYS AND SLEEPLESS NIGHTS",
  "> SO I DO WHAT I DO TO GET BACK TO YOU",
  "> [00110001 01100101 01110010 01100001 ]]",
];

const CONTENEDOR_TEXTO = document.getElementById("text-container");

let mensajes = [...MENSAJES_INICIALES, ""];
let indiceMensaje = 0;

function crearLinea(texto) {
    const linea = document.createElement("div");
    linea.classList.add("line");
    linea.textContent = texto;
    CONTENEDOR_TEXTO.appendChild(linea);
    return linea;
}

function generarContadorPlain() {
    const ahora = new Date();
    const restante = Math.max(0, FECHA_OBJETIVO - ahora);
    const dias = Math.floor(restante / (1000 * 60 * 60 * 24));
    const horas = Math.floor((restante / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((restante / (1000 * 60)) % 60);
    const segundos = Math.floor((restante / 1000) % 60);
    return `> ACCESS IN ${dias} DAYS, ${horas} HOURS, ${minutos} MINUTES, AND ${segundos} SECONDS.`;
}

function generarContadorSpanned() {
    const ahora = new Date();
    const restante = Math.max(0, FECHA_OBJETIVO - ahora);
    const dias = Math.floor(restante / (1000 * 60 * 60 * 24));
    const horas = Math.floor((restante / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((restante / (1000 * 60)) % 60);
    const segundos = Math.floor((restante / 1000) % 60);
    const wrap = n => `<span class="blink-number-limited">${n}</span>`;
    return `> ACCESS IN ${wrap(dias)} DAYS, ${wrap(horas)} HOURS, ${wrap(minutos)} MINUTES, AND ${wrap(segundos)} SECONDS.`;
}

function actualizarMensajeContador() {
    const ahora = new Date();
    let restante = FECHA_OBJETIVO - ahora;

    if (restante <= 0) {
        const cero = '<span class="blink-number-limited">0</span>';
        const mensajeFinal = `> ACCESS IN ${cero} DAYS, ${cero} HOURS, ${cero} MINUTES, AND ${cero} SECONDS.`;
        mensajes[INDICE_CONTADOR] = mensajeFinal;

        const lineas = document.querySelectorAll(".line");
        const lineaContador = lineas[INDICE_CONTADOR];
        if (lineaContador) {
            lineaContador.innerHTML = mensajeFinal;
            lineaContador.classList.add("neon-rojo");
        }

        setTimeout(mostrarLink, 5000);
        return;
    }

    const dias = Math.floor(restante / (1000 * 60 * 60 * 24));
    const horas = Math.floor((restante / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((restante / (1000 * 60)) % 60);
    const segundos = Math.floor((restante / 1000) % 60);

    const mensajeFinal =
        `> ACCESS IN <span class="blink-number">${dias}</span> DAYS, `
        + `<span class="blink-number">${horas}</span> HOURS, `
        + `<span class="blink-number">${minutos}</span> MINUTES, AND `
        + `<span class="blink-number">${segundos}</span> SECONDS.`;

    mensajes[INDICE_CONTADOR] = mensajeFinal;

    const lineas = document.querySelectorAll(".line");
    const lineaContador = lineas[INDICE_CONTADOR];
    if (lineaContador) {
        lineaContador.innerHTML = mensajeFinal;
        lineaContador.classList.add("neon-rojo");
    }
}



function mostrarLink() {
    if (linkMostrado) return;
    linkMostrado = true;

    const lineaLoading = document.createElement("div");
    lineaLoading.classList.add("line", "loading");
    lineaLoading.textContent = "> CARGANDO....";
    CONTENEDOR_TEXTO.appendChild(lineaLoading);
    requestAnimationFrame(() => lineaLoading.classList.add("typing"));

    lineaLoading.addEventListener("animationend", () => {
        lineaLoading.classList.add("typing-complete");


        document.body.classList.add("blackout");
        setTimeout(() => {
            CONTENEDOR_TEXTO.classList.add("scroll-up");

            setTimeout(() => {
                CONTENEDOR_TEXTO.classList.remove("scroll-up");
                CONTENEDOR_TEXTO.style.overflowY = "visible";
                CONTENEDOR_TEXTO.innerHTML = "";

                const enlace = document.createElement("a");
                enlace.href = ENLACE_SECRETO;
                enlace.target = "_blank";


                let textoLink = "> ";
                enlace.textContent = textoLink;
                CONTENEDOR_TEXTO.appendChild(enlace);
                enlace.classList.add("line", "typing-link");

                let idx = 0;
                function escribirCaracter() {
                    if (idx < ENLACE_SECRETO.length) {
                        textoLink += ENLACE_SECRETO[idx++];
                        enlace.textContent = textoLink;
                        setTimeout(escribirCaracter, VELOCIDAD_TEXTO_LINK);
                    } else {
                        enlace.classList.add("typing-complete");
                    }
                }
                escribirCaracter();
            }, 8000);
        }, 5000);
    });
}

function mostrarSiguienteMensaje() {
    if (indiceMensaje < mensajes.length) {

        if (indiceMensaje === INDICE_CONTADOR) {

            const textoPlano = generarContadorPlain();
            const lineaContador = crearLinea(textoPlano);
            lineaContador.classList.add("neon-rojo");


            const idIntervalo = setInterval(() => {

                actualizarMensajeContador();
                lineaContador.innerHTML = mensajes[INDICE_CONTADOR];

                if (new Date() >= FECHA_OBJETIVO) {

                    clearInterval(idIntervalo);

                    lineaContador.innerHTML = generarContadorSpanned();

                    setTimeout(mostrarLink, 5 * 1000);
                }
            }, INTERVALO_CONTADOR);


            indiceMensaje++;
            return;
        }

        const linea = crearLinea(mensajes[indiceMensaje]);
        requestAnimationFrame(() => linea.classList.add("typing"));
        linea.addEventListener("animationend", () => {
            linea.classList.add("typing-complete");
            indiceMensaje++;
            mostrarSiguienteMensaje();
        });
    }
}



// === INICIO DE LA EJECUCIÓN ===
mostrarSiguienteMensaje();
