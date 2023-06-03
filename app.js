const data = [
  {
    id: 1,
    question: "What is the largest animal currently on Earth?",
    answers: ["Colossal Squid", "Blue Whale", "Orca", "Giraffe"],
    correct_answer: "Blue Whale",
  },
  {
    id: 2,
    question: "What does the letter 'S' stand for in 'NASA'?",
    answers: ["Space", "Science", "Society", "Star"],
    correct_answer: "Space",
  },
  {
    id: 3,
    question: "Which is the longest bone in the human body?",
    answers: ["Clavicle", "Femur", "Ulna", "Fibula"],
    correct_answer: "Femur",
  },
  {
    id: 4,
    question: "Which galaxy is planet earth located in?",
    answers: ["Cygnus A", "Virgo A", "Andromeda", "Milky Way"],
    correct_answer: "Metamorphic",
  },
  {
    id: 5,
    question:
      "This element, when overcome with extreme heat and pressure, creates diamonds.",
    answers: ["Pottasium", "Carbon", "Oxygen", "Nitrogen"],
    correct_answer: "Carbon",
  },
  {
    id: 6,
    question: "What is the hottest planet in the Solar System?",
    answers: ["Mars", "Jupiter", "Venus", "Mercury"],
    correct_answer: "Mercury",
  },
  {
    id: 7,
    question: "What is the standard SI unit for temperature?",
    answers: ["Fahrenheit", "Rankine", "Celsius", "Kelvin"],
    correct_answer: "Kelvin",
  },
  {
    id: 8,
    question: "What is the chemical makeup of water?",
    answers: ["H", "CO2", "H2O", "C12H602"],
    correct_answer: "H2O",
  },
  {
    id: 9,
    question: "What does DNA stand for?",
    answers: [
      "Deoxyribogenetic Atoms",
      "Deoxyribogenetic Acid",
      "Deoxyribonucleic Acid",
      "Detoxic Acid",
    ],
    correct_answer: "Deoxyribonucleic Acid",
  },
  {
    id: 10,
    question:
      "The element involved in making human blood red is which of the following?",
    answers: ["Iron", "Copper", "Iridium", "Cobalt"],
    correct_answer: "Iron",
  },
  {
    id: 11,
    question: "Which is the most abundant element in the universe?",
    answers: ["Hydrogen", "Lithium", "Helium", "Oxygen"],
    correct_answer: "Hydrogen",
  },
  {
    id: 12,
    question:
      "The medical term for the belly button is which of the following?",
    answers: ["Paxillus", "Nares", "Nevus", "Umbilicus"],
    correct_answer: "Umbilicus",
  },
  {
    id: 13,
    question: "How many planets do we have in our solar system?",
    answers: ["9", "8", "7", "10"],
    correct_answer: "8",
  },
  {
    id: 14,
    question: "How many chromosomes are in your body cells?",
    answers: ["23", "22", "24", "21"],
    correct_answer: "23",
  },
  {
    id: 15,
    question: "71% of the Earth's surface is made up of",
    answers: ["Deserts", "Forests", "Continents", "Water"],
    correct_answer: "Water",
  },
  {
    id: 16,
    question: "What is the unit of electrical resistance?",
    answers: ["Tesla", "Ohm", "Mho", "Joule"],
    correct_answer: "Ohm",
  },
  {
    id: 17,
    question: "Dry ice is the solid form of what substance?",
    answers: ["Ammonia", "Oxygen", "Nitrogen", "Carbon dioxide"],
    correct_answer: "Carbon dioxide",
  },
  {
    id: 18,
    question: "Which of these Elements is a metalloid?",
    answers: ["Tin", "Antimony", "Rubidium", "Bromine"],
    correct_answer: "Antimony",
  },
  {
    id: 19,
    question: "What is the atomic mass of Carbon?",
    answers: ["16", "14", "10", "12"],
    correct_answer: "12",
  },
  {
    id: 20,
    question: "What bone is also referred to as the shoulder blade?",
    answers: ["Radius", "Ulna", "Scapula", "Sternum"],
    correct_answer: "Scapula",
  },
];

let counter = 0;

// Initial the html for the question container:
let questionEL;
function loadQuestions() {
  questionEL = data.map((elements) => {
    return `
      <div class="question-container">
      <div class="number">${elements.id}</div>
      <h1>${elements.question}</h1>
      <div class="button-div">
        <button id="button">${elements.answers[0]}</button>
        <button id="button">${elements.answers[1]}</button>
        <button id="button">${elements.answers[2]}</button>
        <button id="button">${elements.answers[3]}</button>
      </div>
      </div>
      `;
  });
}

function getQuestions() {
  //! Merge the array of question elements:
  const mergedQuestions = questionEL.join("");

  const container = document.querySelector(".container");
  container.innerHTML = mergedQuestions;

  const questionContainers = Array.from(
    document.querySelectorAll(".question-container")
  );
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const finishBtn = document.querySelector(".finish-btn");

  //! Postion the questions:
  questionContainers.forEach(function (questionContainer, index) {
    questionContainer.style.left = `${index * 100}%`;
  });

  //? Initialize the carousel function:
  function carousel() {
    nextBtn.classList.remove("is-hidden");
    prevBtn.classList.remove("is-hidden");
    finishBtn.classList.add("is-hidden");
    if (counter === questionContainers.length - 1) {
      nextBtn.classList.add("is-hidden");
      prevBtn.classList.remove("is-hidden");
      finishBtn.classList.remove("is-hidden");
    }
    if (counter === 0) {
      prevBtn.classList.add("is-hidden");
      finishBtn.classList.add("is-hidden");
    }
    questionContainers.forEach(function (questionContainer) {
      questionContainer.style.transform = `translateX(-${counter * 100}%)`;
    });
  }

  //* Add functionality to the next and previous buttons:
  nextBtn.addEventListener("click", () => {
    counter++;
    carousel();
  });
  prevBtn.addEventListener("click", () => {
    counter--;
    carousel();
  });

  //! Add functionality to answer buttons:
  questionContainers.forEach(function (questionContainer) {
    questionContainer.addEventListener("click", function (e) {
      const buttons = questionContainer.querySelectorAll("button");
      if (e.target.id) {
        buttons.forEach(function (button) {
          button.classList.remove("active");
          e.target.classList.add("active");
          e.target.parentElement.classList.add("chosen");
        });
      }
    });
  });

  //? Check for if all the questions have been selected:
  let finished;
  finishBtn.addEventListener("click", function () {
    finished = questionContainers.every(function (questionContainer) {
      const buttonDiv = questionContainer.querySelector(".button-div");
      if (buttonDiv.classList.contains("chosen")) {
        return true;
      } else {
        return false;
      }
    });

    //! Check for correct and wrong answers:
    let correctAnswersArray = [];
    if (finished === false) {
      alert("Please answer all questions.");
    } else {
      data.forEach(function (questionAndAnswer) {
        questionContainers.forEach(function (questionContainer) {
          const chosenBtn = questionContainer.querySelector(".active");
          const buttons = questionContainer.querySelectorAll("button");
          buttons.forEach(function (button) {
            // ? Disable button after submission:
            button.setAttribute("disabled", true);
            button.classList.add("disabled");
            // ?
            if (
              button.classList.contains("active") &&
              button.innerText === questionAndAnswer.correct_answer
            ) {
              button.classList.add("correct");
              correctAnswersArray.push(button);
            } else if (
              !button.classList.contains("active") &&
              button.innerText === questionAndAnswer.correct_answer
            ) {
              button.classList.add("correct");
              chosenBtn.classList.add("wrong");
            }
          });
        });
      });

      //* Display results:
      const result = document.querySelector(".result");
      const resultSpan = document.querySelector("span");
      const message = document.querySelector(".message");
      const retryBtn = document.querySelector(".retry-btn");

      function finishing() {
        finishBtn.setAttribute("disabled", true);
        finishBtn.classList.add("disabled");
        message.classList.add("message-margin");
      }

      const percentageScore = (
        (correctAnswersArray.length / data.length) *
        100
      ).toFixed(0);
      //? Finishing Conditions:
      if (percentageScore < 70) {
        finishing();
        retryBtn.classList.remove("is-hidden");
        // Reload The Page:
        retryBtn.addEventListener("click", function () {
          document.location.reload();
        });
        resultSpan.classList.add("retry");
        message.innerText = "Oops, better luck next time.🙁";
      } else {
        finishing();
        resultSpan.classList.add("pass");
        message.innerText = "Congratulations on passing the quiz!😊";
      }
      console.log(correctAnswersArray)
      result.innerText = `Your Score: ${correctAnswersArray.length}/${data.length} - `;
      resultSpan.innerText = `${percentageScore}%`;
    }
  });
}

//! Load the Javascript on DOMContentLoaded:
document.addEventListener("DOMContentLoaded", loadQuestions);
document.addEventListener("DOMContentLoaded", getQuestions);