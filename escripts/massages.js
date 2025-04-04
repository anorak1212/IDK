const targetDate = new Date(new Date().getFullYear(), 6, 26, 9, 9, 0);

const textContainer = document.getElementById("text-container");

const messages = [
    "> When you are alone at night",
    "> You search yourself for all the things",
    "> That you believe are right",
    "> If you give it all away",
    "> You throw away your only chance to be here today",
    "> Then a fight breaks out on your street",
    "> You lose another broken heart in a land of meat",
    "> My friend, he took his final breath",
    "> Now I know the perfect kiss is the kiss of death",
    " ",
];

let index = 0;

function updateCountdownMessage() {
    const now = new Date();
    const timeRemaining = targetDate - now;

    if (timeRemaining <= 0) {
        messages[9] = "> File accessed successfully";
        printLink();
        return;
    }

    const days = Math.floor(timeRemaining / (900 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining / (900 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (900 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 900) % 60);

    messages[9] = `> Access in ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
}

function printNextMessage() {
    if (index < messages.length) {
        if (index === 9) {
            const line = document.createElement("div");
            line.classList.add("line");
            line.textContent = messages[9];
            textContainer.appendChild(line);

            const interval = setInterval(() => {
                updateCountdownMessage();
                line.textContent = messages[9];
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
    link.style.borderRight = "4px solid #04D9FF";
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
