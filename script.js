// Import GSAP from global scope
const { gsap } = window;
const cards = document.querySelectorAll(".card");

gsap.fromTo(
  cards,
  {
    opacity: 0,
    x: -200,
  },
  {
    x: 0,
    stagger: 0.5,
    ease: "easeInOut",
    opacity: 1,
  }
);

// Example animation

const getInfo = async () => {
  const response = await fetch("data.json");
  const data = await response.json();
  const result = await data;
  console.log(result);
  return result;
};

function checkActive() {
  const button = document.querySelectorAll("button");

  button.forEach((btn) => {
    if (btn.classList.contains("active")) {
      btn.classList.add("text-white");
    }

    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) {
        return;
      } else if (!btn.classList.contains("active")) {
        button.forEach((btn) => btn.classList.remove("text-white", "active"));
        btn.classList.add("active", "text-white");
        timeline(btn.id);
      }
    });
  });
}

async function timeline(period = "daily") {
  const data = await getInfo();

  const activities = [
    "work",
    "play",
    "study",
    "exercise",
    "social",
    "selfcare",
  ];
  activities.forEach((activity, index) => {
    document.querySelector(
      `#${activity}-hours`
    ).textContent = `${data[index].timeframes[period].current}hrs`;
    document.querySelector(
      `#prev-${activity}`
    ).textContent = `Last week - ${data[index].timeframes[period].previous}hrs`;
  });
}

checkActive();
