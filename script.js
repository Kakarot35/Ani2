import characterAsset from "./stuart_little_2_margalo_stuart_5_by_giuseppedirosso_dfl0a9p-pre.jpg";

const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");
const musicPrompt = document.querySelector(".music-control");
let musicWasPausedByVisitor = false;
let musicNeedsGesture = false;
const updateMusicUI = (playing) => {
  musicToggle.dataset.playing = String(playing);
  musicToggle.setAttribute("aria-pressed", String(playing));
  musicToggle.setAttribute(
    "aria-label",
    playing ? "Pause our song" : "Play our song",
  );
  musicIcon.textContent = playing ? "♫" : "♩";
  document.querySelector(".music-control").dataset.prompt = String(!playing);
};
const playOurSong = () => {
  const playback = music.play();
  if (!playback) return;
  playback
    .then(() => {
      musicNeedsGesture = false;
      updateMusicUI(true);
    })
    .catch(() => {
      musicNeedsGesture = true;
      updateMusicUI(false);
    });
};
music.volume = 0.55;
music.addEventListener("play", () => updateMusicUI(true));
music.addEventListener("pause", () => updateMusicUI(false));
music.addEventListener("error", () => {
  musicToggle.disabled = true;
  document.getElementById("musicPrompt").textContent =
    "Our song could not load ♡";
});
musicToggle.addEventListener("click", () => {
  if (music.paused) {
    musicWasPausedByVisitor = false;
    playOurSong();
  } else {
    musicWasPausedByVisitor = true;
    music.pause();
  }
});
document.addEventListener(
  "pointerdown",
  () => {
    if (musicNeedsGesture && !musicWasPausedByVisitor) playOurSong();
  },
  { once: true },
);
document.addEventListener(
  "keydown",
  () => {
    if (musicNeedsGesture && !musicWasPausedByVisitor) playOurSong();
  },
  { once: true },
);
playOurSong();

const rain = () => {
  const container = document.getElementById("heartRain");
  for (let i = 0; i < 42; i += 1) {
    const heart = document.createElement("span");
    heart.className = "rain-heart";
    heart.textContent = i % 3 === 0 ? "♡" : "♥";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = "-40px";
    heart.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
    heart.style.animationDuration = `${2.5 + Math.random() * 2}s`;
    heart.style.animationDelay = `${Math.random() * 0.7}s`;
    heart.style.fontSize = `${14 + Math.random() * 18}px`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 5500);
  }
};
document.getElementById("rainButton").addEventListener("click", rain);
document.getElementById("finalRainButton").addEventListener("click", rain);

const quizQuestions = [
  {
    question: "What's Our Fav Dialogue?",
    options: [
      "I love talking to you",
      "Bhaisabehhhh",
      "Tea aahee teaaa",
      "Mehueueueueueue",
    ],
    accepted: [0],
    gif: "https://media1.tenor.com/m/v-Yp2fIK-MIAAAAC/kuromi.gif",
    alt: "Cheerful Kuromi animation for our favourite dialogue",
  },
  {
    question: "What's our most Fav memory?",
    options: [
      "Bycullaa ZOOO",
      "Jeva mi tulaa bangles deto",
      "toh magic movement CSM wala",
      "CSMT",
    ],
    accepted: [2],
    gif: "https://media1.tenor.com/m/pQRdktRV1jkAAAAd/kuromi-happy.gif",
    alt: "Happy Kuromi animation for our favourite memory",
  },
  {
    question: "What's our most Fav Kisss Movement?",
    options: [
      "Behind Bus ekdum pehla kelti ti",
      "Hot idli cha chai peun",
      "Belapur la dar veli barrage of kisses deto te",
      "ki mi tulaa forehead kiss deto toh movement traditional day la",
    ],
    accepted: [0, 1, 2, 3],
    gif: "https://media.tenor.com/ZIoARrgFyYEAAAAj/sanrio-kuromi.gif",
    alt: "Blushing heart-eyed Kuromi animation for our favourite kiss",
  },
  {
    question: "MOst Spoken Words or dialogue",
    options: [
      "Bubiii/bubuuuu bittuuu/snehuuu khupp avthn yete tuzii",
      "Bubuu periodss kadhi yenrrr",
      "Mala sodun tar janrr ny naa bittuuu tuu",
      "jaaa bolu nkoo guuchu huu",
    ],
    accepted: [0, 3],
    gif: "https://media1.tenor.com/m/3uBinDZCx_oAAAAd/now-i%27m-all-fired-up-kuromi.gif",
    alt: "Excited playful Kuromi animation for our most spoken words",
  },
];
const quizForm = document.getElementById("quizForm");
const quizProgress = document.getElementById("quizProgress");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizAction = document.getElementById("quizAction");
const quizResult = document.getElementById("quizResult");
const kuromiGif = document.getElementById("kuromiGif");
let quizIndex = 0;
let quizSubmitted = false;
const setKuromiGif = ({ gif, alt }) => {
  if (kuromiGif.getAttribute("src") === gif) return;
  kuromiGif.classList.add("is-switching");
  setTimeout(() => {
    kuromiGif.src = gif;
    kuromiGif.alt = alt;
    kuromiGif.classList.remove("is-switching");
  }, 120);
};
kuromiGif.addEventListener("error", () => {
  if (kuromiGif.dataset.fallback) return;
  kuromiGif.dataset.fallback = "true";
  kuromiGif.src =
    "https://i.pinimg.com/originals/5d/09/6d/5d096d46cac5eeaac058f7e5c2135596.gif";
  kuromiGif.alt = "Kuromi animation";
});
const renderQuiz = () => {
  const current = quizQuestions[quizIndex];
  quizSubmitted = false;
  setKuromiGif(current);
  quizProgress.textContent = `QUESTION ${String(quizIndex + 1).padStart(2, "0")} / ${String(quizQuestions.length).padStart(2, "0")}`;
  quizQuestion.textContent = current.question;
  quizOptions.replaceChildren(
    ...current.options.map((option, index) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "answer";
      input.value = index;
      input.id = `quiz-answer-${index}`;
      label.htmlFor = input.id;
      label.append(input, document.createTextNode(` ${option}`));
      return label;
    }),
  );
  quizAction.innerHTML = "lock in answer <span>→</span>";
  quizAction.disabled = false;
  quizResult.textContent = "";
};
const completeQuiz = () => {
  quizProgress.textContent = "ALL MEMORIES UNLOCKED";
  quizQuestion.textContent = "You know our little world so beautifully ♡";
  quizOptions.replaceChildren();
  quizResult.textContent =
    "Every inside joke, every favourite moment, every bit of us — worth celebrating forever.";
  quizAction.innerHTML = "replay the quiz <span>↻</span>";
  quizAction.disabled = false;
  quizAction.dataset.mode = "replay";
  rain();
};
quizForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (quizAction.dataset.mode === "replay") {
    quizAction.dataset.mode = "";
    quizIndex = 0;
    renderQuiz();
    return;
  }
  if (quizSubmitted) {
    quizIndex += 1;
    if (quizIndex === quizQuestions.length) {
      completeQuiz();
    } else {
      renderQuiz();
    }
    return;
  }
  const selected = quizForm.querySelector('input[name="answer"]:checked');
  if (!selected) {
    quizResult.textContent = "Pick one first — Kuromi is waiting!";
    return;
  }
  quizSubmitted = true;
  const correct = quizQuestions[quizIndex].accepted.includes(
    Number(selected.value),
  );
  quizResult.textContent = correct
    ? "Correct! You really know our heart ♡"
    : "Not this one, but every answer is a sweet memory with you ♡";
  quizForm
    .querySelectorAll('input[name="answer"]')
    .forEach((input) => (input.disabled = true));
  quizAction.innerHTML =
    quizIndex === quizQuestions.length - 1
      ? "see our celebration <span>♥</span>"
      : "next question <span>→</span>";
});
renderQuiz();

// Change this value before sharing the final website. This is a front-end lock, not secure storage.
const LETTER_PASSWORD = "i love talking to you";
const secretLock = document.getElementById("secretLock");
const secretLetter = document.getElementById("secretLetter");
document.getElementById("passwordForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("passwordInput");
  const message = document.getElementById("passwordMessage");
  if (input.value.trim().toLowerCase() === LETTER_PASSWORD) {
    secretLock.classList.add("is-opening");
    message.textContent = "Opening something made just for you ♡";
    setTimeout(() => {
      secretLock.hidden = true;
      secretLetter.hidden = false;
      secretLetter.classList.add("is-revealed");
      rain();
      secretLetter.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 520);
  } else {
    message.textContent = "That password is not quite right. Try again ♡";
    input.select();
  }
});

const characterStage = document.getElementById("characterStage");
const characterPolaroid = document.getElementById("characterPolaroid");
const characterImage = document.getElementById("characterImage");
const characterRevealButton = document.getElementById("characterRevealButton");
const characterMessage = document.getElementById("characterMessage");
const characterMissing = document.getElementById("characterMissing");
const characterReplayButton = document.getElementById("characterReplayButton");
const characterHugButton = document.getElementById("characterHugButton");
let characterRevealed = false;
const revealCharacter = () => {
  if (characterRevealed) {
    characterStage.classList.remove("is-revealed");
    characterPolaroid.classList.add("is-replaying");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        characterStage.classList.add("is-revealed");
        characterPolaroid.classList.remove("is-replaying");
        rain();
      }),
    );
    return;
  }
  const imagePath = characterStage.dataset.characterSrc || characterAsset;
  characterImage.onload = () => {
    characterMissing.hidden = true;
    characterPolaroid.hidden = false;
    requestAnimationFrame(() => {
      characterStage.classList.add("is-revealed");
      characterMessage.hidden = false;
      characterRevealed = true;
      characterRevealButton.hidden = true;
      rain();
    });
  };
  characterImage.onerror = () => {
    characterImage.removeAttribute("src");
    characterMissing.hidden = false;
    characterRevealButton.textContent = "Character picture coming soon ♡";
  };
  characterImage.src = imagePath;
};
characterRevealButton.addEventListener("click", revealCharacter);
characterReplayButton.addEventListener("click", revealCharacter);
characterHugButton.addEventListener("click", rain);
