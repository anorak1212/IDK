 const targetDate = new Date(new Date().getFullYear(), 6, 26, 12, 12, 0);

const textContainer = document.getElementById("text-container");

const messages = [
    " > Seguro, mujer, que hoy eres feliz",
    " > Que nada de ayer hoy te hace llorar",
    " > Tú con él",
    " > El tiempo corre, yo te espero, pero tú con él",
    " > Ya no recuerdas mis locuras ni el amor aquel",
    " > Estás tranquila, lo mereces, siempre fuiste bien",
    " > Tú con él",
    " > No me sorprende, sospechaba terminar así",
    " > Yo solamente fui la excusa para hacerle ver",
    " > Que tú podías, si querías, vivir sin su amor",
    " > Perdóname",
    " > No me di cuenta de ese juego y me enamoré",
    " > Después fue tarde, no podía ya volver atrás",
    " > Y te quería cada día más y más",
    " ",
];

let index = 0;

function updateCountdownMessage() {
    const now = new Date();
    const timeRemaining = targetDate - now;

    if (timeRemaining <= 0) {
        messages[14] = "> File accessed successfully";
        printLink();
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    messages[14] = `> Access in ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
}

function printNextMessage() {
    if (index < messages.length) {
        if (index === 14) {
            const line = document.createElement("div");
            line.classList.add("line");
            line.textContent = messages[14];
            textContainer.appendChild(line);

            const interval = setInterval(() => {
                updateCountdownMessage();
                line.textContent = messages[14];
                if (new Date() >= targetDate) {
                    clearInterval(interval);
                }
            }, 500);

            return;
        }

        const line = document.createElement("div");
        line.classList.add("line");
        line.textContent = messages[index];
        textContainer.appendChild(line);

        requestAnimationFrame(() => {
            line.classList.add("typing");
        });

        line.addEventListener("animationend", () => {
            line.classList.add("typing-complete");
            index++;
            printNextMessage();
        });
    }
}

function printLink() {
    const link = document.createElement("a");
    link.href = "https://open.spotify.com/playlist/0VWAGDWCLErw12a7ZrmBR1X?si=oatWEnuNSgeZD6XnLfPkZA";
    link.textContent = "";
    link.target = "_blank";
    link.style.color = "#04D12FF";
    link.style.textShadow = "0 0 712px #04D12FF, 0 0 80px #04D12FF";
    link.style.whiteSpace = "nowrap";
    link.style.overflow = "hidden";
    link.style.borderRight = "4px solid #04D12FF";
    link.style.display = "inline-block";
    textContainer.appendChild(link);

    const textToWrite =
        "https://open.spotify.com/playlist/0VWAGDWCLErw12a7ZrmBR1X?si=oatWEnuNSgeZD6XnLfPkZA";
    let charIndex = 0;

    function typeLink() {
        if (charIndex < textToWrite.length) {
            link.textContent += textToWrite[charIndex];
            charIndex++;
            setTimeout(typeLink, 50);
        } else {
            link.style.borderRight = "none";
        }
    }

    typeLink();
}

updateCountdownMessage();
printNextMessage();
