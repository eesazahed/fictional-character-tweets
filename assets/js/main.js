import { prompt } from "./prompt.js";

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

  const nameInputValue = nameInput.value;

  if (nameInputValue.trim().length === 0) {
    setLoadingMessage("please provide a name");
    return;
  }

  const tweetFeed = await generateFeed(nameInputValue);

  if (tweetFeed) {
    loadingSuccess();
    renderFeed(tweetFeed);
  }
});

const generateFeed = async (nameInputValue) => {
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
    const responseData = data.choices[0].message.content.replace(
      /<think>\s*<\/think>\s*/g,
      ""
    );

    const parsed = JSON.parse(responseData);

    if (Array.isArray(parsed) && parsed.length === 0) {
      setLoadingMessage("unrecognized character name. try something else.");
      return null;
    }

    if (
      typeof parsed !== "object" ||
      !parsed.displayName ||
      !parsed.username ||
      !Array.isArray(parsed.tweets)
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

const renderFeed = (data) => {
  feed.innerHTML = "";

  data.tweets.forEach((tweetObject) => {
    const tweetElement = document.createElement("div");
    tweetElement.classList.add("tweet");

    tweetElement.innerHTML = `
      <div class="tweet-header">
        <div class="tweet-pfp"></div>
        <div class="tweet-name">
         <span class="display-name">
          ${data.displayName}
          <svg class="blue-check" viewBox="0 0 24 24" aria-label="Verified Account" role="img" width="16" height="16" fill="#1DA1F2" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.25 12.001c0 5.657-4.592 10.25-10.25 10.25S1.75 17.658 1.75 12.001 6.342 1.75 12 1.75s10.25 4.592 10.25 10.25zm-12.698 3.302l6.91-6.91-1.061-1.06-5.849 5.85-2.451-2.45-1.06 1.06 3.511 3.511z"/>
          </svg>
        </span>
         <span class="username">${data.username}</span>
        </div>
      </div>
      <div class="tweet-text">${tweetObject.tweet}</div>
      <div class="timestamp">${tweetObject.timestamp}</div>
    `;

    feed.appendChild(tweetElement);
  });
};

const characterNames = [
  "harry potter",
  "sherlock holmes",
  "tony stark",
  "frodo baggins",
  "katniss everdeen",
  "spiderman",
  "indiana jones",
  "goku",
  "naruto uzumaki",
  "luffy",
  "miles morales",
  "prince zuko",
  "twilight sparkle",
  "eren yeager",
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
