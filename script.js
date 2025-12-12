// Modern Calorie Calculator Script

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const startCalcBtn = document.getElementById('start-calc');
  const calcForm = document.getElementById('calc-form');
  const heroSection = document.getElementById('hero');
  const calculatorSection = document.getElementById('calculator');
  const resultsSection = document.getElementById('results');
  const downloadBtn = document.getElementById('download-btn');
  const printBtn = document.getElementById('print-btn');
  const resetBtn = document.getElementById('reset-btn');
  const toast = document.getElementById('toast');
  const logoLink = document.getElementById('logo-link');

  // Unit toggle buttons
  const weightUnitKg = document.getElementById('weight-unit');
  const weightUnitLbs = document.getElementById('weight-unit-lbs');
  const heightUnitCm = document.getElementById('height-unit');
  const heightUnitFt = document.getElementById('height-unit-ft');

  let macroChart = null;

  // Navigation
  startCalcBtn.addEventListener('click', () => {
    heroSection.classList.add('hidden');
    calculatorSection.classList.remove('hidden');
    calculatorSection.scrollIntoView({ behavior: 'smooth' });
  });

  logoLink.addEventListener('click', () => {
    calculatorSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    heroSection.classList.remove('hidden');
    heroSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Clickable Features Heading
  const featuresHeading = document.getElementById('features-heading');
  featuresHeading.addEventListener('click', () => {
    const featuresSection = document.getElementById('features');
    // Check if desktop view (screen width > 768px)
    if (window.innerWidth > 768) {
      // For desktop: scroll to position above the features section
      const elementPosition = featuresSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100; // 100px above

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // For mobile: use default scrollIntoView
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Stop the bouncing animation after click
    featuresHeading.style.animation = 'none';
  });

  // Restart animation when scrolling back up
  window.addEventListener('scroll', () => {
    const rect = featuresHeading.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible && featuresHeading.style.animation === 'none') {
      featuresHeading.style.animation = 'bounceTwice 3s ease-in-out infinite';
    }
  });

  resetBtn.addEventListener('click', () => {
    resultsSection.classList.add('hidden');
    calculatorSection.classList.remove('hidden');
    calcForm.reset();
    if (macroChart) {
      macroChart.destroy();
    }
  });

  // Unit Conversions
  let weightUnit = 'kg';
  let heightUnit = 'cm';

  weightUnitKg.addEventListener('click', () => {
    weightUnit = 'kg';
    weightUnitKg.classList.add('active');
    weightUnitLbs.classList.remove('active');
  });

  weightUnitLbs.addEventListener('click', () => {
    weightUnit = 'lbs';
    weightUnitLbs.classList.add('active');
    weightUnitKg.classList.remove('active');
  });

  heightUnitCm.addEventListener('click', () => {
    heightUnit = 'cm';
    heightUnitCm.classList.add('active');
    heightUnitFt.classList.remove('active');
  });

  heightUnitFt.addEventListener('click', () => {
    heightUnit = 'ft';
    heightUnitFt.classList.add('active');
    heightUnitCm.classList.remove('active');
  });

  // Convert units to metric for calculations
  function convertToMetric(weight, height) {
    let kg = weight;
    let cm = height;

    if (weightUnit === 'lbs') {
      kg = weight * 0.453592;
    }

    if (heightUnit === 'ft') {
      // Assuming input is feet.inches format, but for simplicity, treat as total feet
      cm = height * 30.48;
    }

    return { kg, cm };
  }

  // BMR Calculation using Mifflin-St Jeor formula
  function calculateBMR(weightKg, heightCm, age, gender) {
    if (gender === 'male') {
      return (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else if (gender === 'female') {
      return (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    } else {
      // For other genders, use average
      return (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 78;
    }
  }

  // Daily Calorie Calculation
  function calculateDailyCalories(bmr, activityMultiplier, goalMultiplier) {
    const tdee = bmr * activityMultiplier;
    return Math.round(tdee * goalMultiplier);
  }

  // Macronutrient Calculation
  function calculateMacros(calories, weightKg) {
    // Protein: 1.6-2.2g per kg of body weight (using 1.8g/kg)
    const protein = Math.round(weightKg * 1.8);

    // Fat: 20-35% of calories (using 25%)
    const fat = Math.round((calories * 0.25) / 9);

    // Carbs: Remaining calories
    const remainingCalories = calories - (protein * 4) - (fat * 9);
    const carbs = Math.round(remainingCalories / 4);

    return { protein, fat, carbs };
  }

  // Form Submission
  calcForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = parseFloat(document.getElementById('goal').value);

    // Convert to metric
    const { kg, cm } = convertToMetric(weight, height);

    // Calculate BMR
    const bmr = calculateBMR(kg, cm, age, gender);

    // Calculate daily calories
    const dailyCalories = calculateDailyCalories(bmr, activity, goal);

    // Calculate macros
    const macros = calculateMacros(dailyCalories, kg);

    // Display results
    document.getElementById('bmr-result').textContent = Math.round(bmr);
    document.getElementById('daily-cal-result').textContent = dailyCalories;
    document.getElementById('protein-result').textContent = macros.protein;
    document.getElementById('fat-result').textContent = macros.fat;
    document.getElementById('carbs-result').textContent = macros.carbs;

    // Create chart
    createMacroChart(macros);

    // Show results
    calculatorSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth' });

    showToast('Calculation complete!');
  });

  // Create Macronutrient Chart
  function createMacroChart(macros) {
    const ctx = document.getElementById('macro-chart').getContext('2d');

    if (macroChart) {
      macroChart.destroy();
    }

    macroChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Protein', 'Fat', 'Carbs'],
        datasets: [{
          data: [macros.protein, macros.fat, macros.carbs],
          backgroundColor: ['#4299e1', '#48bb78', '#ed8936'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.label + ': ' + context.parsed + 'g';
              }
            }
          }
        }
      }
    });
  }

  // Download Report
  downloadBtn.addEventListener('click', () => {
    const bmr = document.getElementById('bmr-result').textContent;
    const dailyCal = document.getElementById('daily-cal-result').textContent;
    const protein = document.getElementById('protein-result').textContent;
    const fat = document.getElementById('fat-result').textContent;
    const carbs = document.getElementById('carbs-result').textContent;

    const report = `
Calorie Calculator Report
========================

Basal Metabolic Rate (BMR): ${bmr} kcal/day
Daily Calorie Needs: ${dailyCal} kcal/day

Macronutrient Breakdown:
- Protein: ${protein}g
- Fat: ${fat}g
- Carbohydrates: ${carbs}g

Generated on: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calorie-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Report downloaded!');
  });

  // Print
  printBtn.addEventListener('click', () => {
    window.print();
  });

  // Toast Notification
  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  }

  // Initialize
});
