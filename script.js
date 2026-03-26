let username = "";
let elixer = 0;
let streak = 0;
let skips = 0;

const quests = {
  social: ["Talk to a stranger", "Call a friend", "Compliment someone"],
  fitness: ["Do 20 pushups", "Walk 15 mins", "Stretch 10 mins"],
  learning: ["Study 30 mins", "Read 10 pages", "Watch something useful"]
};

const punishment = [
  "Go outside for 10 mins NOW",
  "Do 30 jumping jacks",
  "Talk to someone new"
];

const roasts = [
  "😈 Stop skipping bro",
  "NPC behavior detected",
  "Comfort zone = danger"
];

// Start game: set username and interests
function start() {
  username = document.getElementById("username").value.trim();

  const selected = document.querySelectorAll("input[type=checkbox]:checked");
  const interests = Array.from(selected).map(i => i.value);

  if (!username) {
    alert("Enter your name!");
    return;
  }

  if (interests.length === 0) {
    alert("Select at least 1 interest!");
    return;
  }

  window.userInterests = interests;
  document.getElementById("message").innerText = `Welcome, ${username}! Ready to spin ⚔️`;
}

// Spin quest card
function spin() {
  if (!username) {
    alert("Enter your name first!");
    return;
  }

  if (!window.userInterests || window.userInterests.length === 0) {
    alert("Select at least 1 interest first!");
    return;
  }

  const card = document.getElementById("card");
  card.innerText = "🎰 Spinning...";

  // Simulate spinning effect by showing random quests quickly
  let spins = 0;
  const spinInterval = setInterval(() => {
    const randomType = Math.random() < 0.2 ? "punishment" : window.userInterests[Math.floor(Math.random() * window.userInterests.length)];
    const pool = randomType === "punishment" ? punishment : quests[randomType];
    card.innerText = pool[Math.floor(Math.random() * pool.length)];
    spins++;

    if (spins > 8) { // stop after a few spins
      clearInterval(spinInterval);

      // Final selection
      let quest, type;
      if (skips >= 2) {
        quest = punishment[Math.floor(Math.random() * punishment.length)];
        type = "punishment";
        skips = 0;
      } else {
        const interest = window.userInterests[Math.floor(Math.random() * window.userInterests.length)];
        const pool = quests[interest];
        quest = pool[Math.floor(Math.random() * pool.length)];
        type = interest;
      }

      card.innerText = quest;
      card.style.boxShadow = type === "punishment" ? "0 0 30px red" : "0 0 20px #ff00cc, 0 0 40px #00cfff";
      document.getElementById("message").innerText = "";
    }
  }, 80);
}

// Complete quest
function complete() {
  elixer += 20;
  streak += 1;
  skips = 0;

  updateUI();

  document.body.style.background = "#00cfff";
  setTimeout(() => {
    document.body.style.background = "#020617";
  }, 200);

  if (streak % 4 === 0) {
    elixer += 50;
    document.getElementById("message").innerText = "🎁 BONUS +50 ELIXER!";
  } else {
    document.getElementById("message").innerText = "🔥 Nice! Keep going";
  }
}

// Skip quest
function skip() {
  streak = 0;
  skips += 1;

  updateUI();

  document.getElementById("message").innerText =
    roasts[Math.floor(Math.random() * roasts.length)];
}

// Update stats
function updateUI() {
  document.getElementById("elixer").innerText = elixer;
  document.getElementById("streak").innerText = streak;
}