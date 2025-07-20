function scrollToFeatures() {
    document.querySelector('.explore-more').scrollIntoView({ behavior: 'smooth' });
  }
function calculateBMI() {
  let height = parseFloat(prompt("Enter your height in meters:"));
  let weight = parseFloat(prompt("Enter your weight in kilograms:"));

  if (height > 0 && weight > 0) {
    let bmi = weight / (height * height);
    alert("Your BMI is: " + bmi.toFixed(2));
  } else {
    alert("Please enter valid height and weight.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("fitness-form");
  const output = document.getElementById("recommendation");

  form?.addEventListener("submit", function (e) {
    e.preventDefault();

    const gender = document.getElementById("gender").value;
    const height = parseInt(document.getElementById("height").value);
    const weight = parseInt(document.getElementById("weight").value);
    const goal = document.getElementById("goal").value;

    let recommendation = "";

    if (goal === "lose-fat") {
      recommendation = `🧘 For fat loss: Try 30 min daily cardio (e.g., treadmill, cycling) + full-body circuits 3x/week.`;
    } else if (goal === "gain-muscle") {
      recommendation = `🏋️ For muscle gain: Try push-pull-leg split (6x/week) + eat 10% more calories.`;
    } else if (goal === "stay-fit") {
      recommendation = `💪 For general fitness: Combine 3x strength + 2x yoga or stretching weekly.`;
    } else if (goal === "recomp") {
  recommendation = `⚖️ For recomposition: Eat at maintenance calories, focus on heavy compound lifts 3–4x/week, and do light cardio 2x/week. Progress takes longer but it's possible!`;
}

    output.innerHTML = `
      <h3>Hi ${gender === 'male' ? 'bro' : 'friend'}, based on your inputs:</h3>
      <p><strong>Height:</strong> ${height} cm | <strong>Weight:</strong> ${weight} kg</p>
      <p>${recommendation}</p>
    `;
    output.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});
