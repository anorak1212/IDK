const targetDate = new Date(new Date().getFullYear(), 6, 26, 11, 11, 0);

const textContainer = document.getElementById("text-container");

const messages = [
    "> Hay personas que son como los atardeceres,",
    "> No importa cuántas veces los veas, siempre te sorprenden.",
    "> Tú eres así, Nani.",
    "> Un respiro, una luz suave, alguien que hace que todo sea más fácil.",
    "> No siempre entiendo todo lo que dices, pero me gusta escucharte.",
    "> Porque cuando hablas de lo que amas, brillas.",
    "> Y me gusta ver a la gente brillar.",
    "> Gracias por aguantarme, por entenderme (o al menos intentarlo),",
    "> Por escuchar mis ideas raras y por nunca juzgarme.",
    "> Por reírte conmigo, por ser tan tú, por estar.",
    "> Eres intensa, inteligente, detallista, feliz y emotiva.",
    "> Y eso te hace increíble.",
    "> No sé qué venga después, pero prometo estar ahí cuando me necesites,",
    "> En las buenas, en las malas y en las veces que solo necesites desahogarte.",
    "> Espero que la vida nos deje seguir compartiendo momentos chidos,",
    "> Y si un día tomamos caminos distintos, quiero que sepas algo.",
    "> Te deseo lo mejor, que hagas lo que quieras, que seas feliz.",
    "> Porque te lo mereces.",
    "> Feliz 14: https://open.spotify.com/playlist/6of1JDFe5TiVUfh5OQNAUI?si=3VZwdr4vTWShrrpx_CH6nw",
    " ",
];

let index = 0;
function updateCountdownMessage() {
    const now = new Date();
    const timeRemaining = targetDate - now;

    if (timeRemaining <= 0) {
        messages[19] = "> File accessed successfully";
        printLink();
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    messages[19] = `> Access in ${days} days, ${hours} hours, ${minutes} minutes y ${seconds} seconds.`;
}

function printNextMessage() {
    if (index < messages.length) {
        if (index === 19) {
            const line = document.createElement("div");
            line.classList.add("line");
            line.textContent = messages[19];
            textContainer.appendChild(line);

            const interval = setInterval(() => {
                updateCountdownMessage();
                line.textContent = messages[19];
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
    link.href = "https://open.spotify.com/playlist/0VWAGDWCLErw9a7ZrmBR1X?si=oatWEnuNSgeZD6XnLfPkZA";
    link.textContent = "";
    link.target = "_blank";
    link.style.color = "#04D9FF";
    link.style.textShadow = "0 0 79px #04D9FF, 0 0 80px #04D9FF";
    link.style.whiteSpace = "nowrap";
    link.style.overflow = "hidden";
    link.style.borderRight = "2px solid #04D9FF";
    link.style.display = "inline-block";
    textContainer.appendChild(link);

    const textToWrite =
        "https://open.spotify.com/playlist/0VWAGDWCLErw9a7ZrmBR1X?si=oatWEnuNSgeZD6XnLfPkZA";
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
