window.addEventListener("DOMContentLoaded", function () {
  const standardTab = document.getElementById("standardTab");
  const metricTab = document.getElementById("metricTab");

  // Show standard inputs, hide metric inputs
  function showStandard() {
    standardTab.classList.add("active");
    metricTab.classList.remove("active");
    document.getElementById("standardFields").classList.remove("hidden");
    document.getElementById("metricFields").classList.add("hidden");

    // Clear metric inputs
    document.getElementById("cm").value = "";
    document.getElementById("kg").value = "";

    // Enable standard inputs
    document.getElementById("feet").disabled = false;
    document.getElementById("inches").disabled = false;
    document.getElementById("pounds").disabled = false;

    // Disable metric inputs
    document.getElementById("cm").disabled = true;
    document.getElementById("kg").disabled = true;

    // Clear result
    document.getElementById("bmiResult").textContent = "";
  }

  // Show metric inputs, hide standard inputs
  function showMetric() {
    metricTab.classList.add("active");
    standardTab.classList.remove("active");
    document.getElementById("metricFields").classList.remove("hidden");
    document.getElementById("standardFields").classList.add("hidden");

    // Clear standard inputs
    document.getElementById("feet").value = "";
    document.getElementById("inches").value = "";
    document.getElementById("pounds").value = "";

    // Enable metric inputs
    document.getElementById("cm").disabled = false;
    document.getElementById("kg").disabled = false;

    // Disable standard inputs
    document.getElementById("feet").disabled = true;
    document.getElementById("inches").disabled = true;
    document.getElementById("pounds").disabled = true;

    // Clear result
    document.getElementById("bmiResult").textContent = "";
  }

  standardTab.addEventListener("click", showStandard);
  metricTab.addEventListener("click", showMetric);

  // Initialize with standard shown by default
  showStandard();

  // BMI Calculation on form submit
  document.getElementById("bmiForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const isStandard = standardTab.classList.contains("active");
    let bmi = 0;

    if (isStandard) {
      const feet = parseFloat(document.getElementById("feet").value);
      const inches = parseFloat(document.getElementById("inches").value || "0");
      const pounds = parseFloat(document.getElementById("pounds").value);

      if (isNaN(feet) || feet <= 0 || isNaN(pounds) || pounds <= 0) {
        document.getElementById("bmiResult").textContent = "Please fill all required fields correctly.";
        return;
      }
      if (feet < 1 || feet > 8) {
        document.getElementById("bmiResult").textContent = "Please enter a realistic height in feet (1-8).";
        return;
      }
      if (inches < 0 || inches > 11) {
        document.getElementById("bmiResult").textContent = "Please enter inches between 0 and 11.";
        return;
      }
      if (pounds < 20 || pounds > 1400) {
        document.getElementById("bmiResult").textContent = "Please enter weight between 20 and 1400 pounds.";
        return;
      }

      const totalInches = feet * 12 + inches;
      bmi = (pounds / (totalInches * totalInches)) * 703;
    } else {
      const heightCm = parseFloat(document.getElementById("cm").value);
      const weightKg = parseFloat(document.getElementById("kg").value);

      if (isNaN(heightCm) || heightCm <= 0 || isNaN(weightKg) || weightKg <= 0) {
        document.getElementById("bmiResult").textContent = "Please fill all required fields correctly.";
        return;
      }
      if (heightCm < 30 || heightCm > 300) {
        document.getElementById("bmiResult").textContent = "Please enter height in cm between 30 and 300.";
        return;
      }
      if (weightKg < 10 || weightKg > 635) {
        document.getElementById("bmiResult").textContent = "Please enter weight in kg between 10 and 635.";
        return;
      }

      const heightM = heightCm / 100;
      bmi = weightKg / (heightM * heightM);
    }

    bmi = bmi.toFixed(2);

    let category = "";
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi < 24.9) {
      category = "Normal weight";
    } else if (bmi < 29.9) {
      category = "Overweight";
    } else {
      category = "Obese";
    }

    document.getElementById("bmiResult").textContent = `Your BMI is ${bmi} (${category}).`;
  });
});
