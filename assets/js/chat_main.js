import { prompt } from "./chat_prompt.js";

const form = document.querySelector(".form");
const nameInput = document.querySelector(".name-input");
const feed = document.querySelector(".feed");
const loadingMessage = document.querySelector(".loading-message");
const randomName = document.querySelector(".random-name");

const loadingSuccess = () => {
  loadingMessage.innerText = "";
};

const setLoadingMessage = (message = "loading...") => {
  feed.innerHTML = "";
  loadingMessage.innerText = message;
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setLoadingMessage();

  const nameInputValue = nameInput.value.trim();

  if (nameInputValue.length === 0) {
    setLoadingMessage("please enter a character name");
    return;
  }

  const chatFeed = await generateChat(nameInputValue);

  if (chatFeed) {
    loadingSuccess();
    renderChat(chatFeed);
  }
});

const generateChat = async (nameInputValue) => {
  const response = await fetch("https://ai.hackclub.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt + nameInputValue }],
    }),
  });

  if (!response.ok) {
    setLoadingMessage("failed to generate");
    return null;
  }

  const data = await response.json();

  try {
    const responseData = data.choices[0].message.content;
    const parsed = JSON.parse(responseData);

    if (Array.isArray(parsed) && parsed.length === 0) {
      setLoadingMessage("unrecognized character name. try a different one.");
      return null;
    }

    if (
      typeof parsed !== "object" ||
      !parsed.characterA ||
      !parsed.characterB ||
      !Array.isArray(parsed.messages)
    ) {
      setLoadingMessage("unexpected response format");
      return null;
    }

    return parsed;
  } catch {
    setLoadingMessage(
      "AI failed to generate parsable data, try clicking 'generate' again"
    );
    return null;
  }
};

const renderChat = (data) => {
  feed.innerHTML = "";

  data.messages.forEach((msg) => {
    const messageElement = document.createElement("div");
    messageElement.classList.add("chat-message");

    const senderClass =
      msg.sender === data.characterA ? "sender-a" : "sender-b";

    messageElement.innerHTML = `
      <div class="${senderClass}">
        <div class="sender-name">${msg.sender}</div>
        <div class="message-text">${msg.message}</div>
        <div class="message-timestamp">${msg.timestamp}</div>
      </div>
    `;

    feed.appendChild(messageElement);
  });
};

const characterNames = [
  "eren yeager",
  "frodo baggins",
  "anakin skywalker",
  "tony stark",
  "light yagami",
  "katniss everdeen",
  "sherlock holmes",
  "zuko",
  "goku",
  "batman",
  "mikasa ackerman",
  "hinata hyuga",
  "vegeta",
  "l lawliet",
  "aang",
];

for (let i = characterNames.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [characterNames[i], characterNames[j]] = [
    characterNames[j],
    characterNames[i],
  ];
}

let index = 0,
  charIndex = 0,
  deleting = false;

const typeLoop = () => {
  const current = characterNames[index];
  randomName.textContent = current.slice(0, charIndex);

  if (deleting) {
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      index = (index + 1) % characterNames.length;
    }
    setTimeout(typeLoop, 50);
  } else {
    if (charIndex < current.length) {
      charIndex++;
      setTimeout(typeLoop, 50);
    } else {
      setTimeout(() => {
        deleting = true;
        typeLoop();
      }, 1000);
    }
  }
};

typeLoop();
