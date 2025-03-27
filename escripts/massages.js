const targetDate = new Date(new Date().getFullYear(), 6, 26, 10, 10, 0);

const textContainer = document.getElementById("text-container");

const messages = [
    "> She got the power in her hands",
    "> To shock you like you won't believe",
    "> Saw her in the Amazon",
    "> With the voltage running through her skin",
    "> Standing there with nothing on",
    "> She's gonna teach me how to swim",
    "> I said, ooh girl",
    "> Shock me like an electric eel",
    "> Baby girl",
    "> Turn me on with your electric feel",
    " ",
];

let index = 0;

function updateCountdownMessage() {
    const now = new Date();
    const timeRemaining = targetDate - now;

    if (timeRemaining <= 0) {
        messages[10] = "> File accessed successfully";
        printLink();
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    messages[10] = `> Access in ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds.`;
}

function printNextMessage() {
    if (index < messages.length) {
        if (index === 10) {
            const line = document.createElement("div");
            line.classList.add("line");
            line.textContent = messages[10];
            textContainer.appendChild(line);

            const interval = setInterval(() => {
                updateCountdownMessage();
                line.textContent = messages[10];
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
