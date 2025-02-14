
const targetDate = new Date(new Date().getFullYear(), 6, 26, 11, 11, 0);

const textContainer = document.getElementById("text-container");

const messages = [
    "> Heaven, a gateway, a hope",
    "> Just like a feeling inside, it's no joke",
    "> And though it hurts me to see you this way",
    "> Betrayed by words, I'd never heard, too hard to say" ,
    "> Up, down, turn around",
    "> Please don't let me hit the ground",
    "> Tonight I think I'll walk alone" , 
    "> I'll find my soul as I go home" , 
    ""
];


let index = 0;
function updateCountdownMessage() {
    const now = new Date();
    const timeRemaining = targetDate - now;

    if (timeRemaining <= 0) {
        messages[8] = "> File accessed successfully";
        printLink();
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    messages[8] = `> Access in ${days} days, ${hours} hours, ${minutes} minutes y ${seconds} seconds.`;
}

function printNextMessage() {
    if (index < messages.length) {
        if (index === 8) {
            const line = document.createElement("div");
            line.classList.add("line");
            line.textContent = messages[8];
            textContainer.appendChild(line);

            const interval = setInterval(() => {
                updateCountdownMessage();
                line.textContent = messages[8];
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
