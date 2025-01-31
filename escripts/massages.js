
const targetDate = new Date(new Date().getFullYear(), 6, 26, 11, 11, 0);

const textContainer = document.getElementById("text-container");

const messages = [
    "> So it's hard to find",
    "> Someone with that kind of intensity",
    "> You touched my hand I played it cool",
    "> And you reached out your hand to me" ,
    "> But if our paths never cross",
    "> Well you know I'm sorry but",
    "> If I live to see the seven wonders" , 
    "> I'll make a path to the rainbow's end" , 
    "> I'll never live to match the beauty again" , 
    ""
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

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    messages[9] = `> Access in ${days} days, ${hours} hours, ${minutes} minutes y ${seconds} seconds.`;
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
            printNextMessage();a
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
