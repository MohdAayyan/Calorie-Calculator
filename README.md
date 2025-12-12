# Modern Calorie & Nutrition Calculator

A beautiful, responsive web application for calculating daily calorie needs and macronutrient recommendations.

## Features

- **Modern UI**: Clean, professional design with smooth animations
- **BMR Calculation**: Uses Mifflin-St Jeor formula for accurate basal metabolic rate
- **Daily Calorie Needs**: Based on activity level and weight goals
- **Macronutrient Breakdown**: Protein, fat, and carb recommendations
- **Unit Conversion**: Support for metric and imperial units
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Charts**: Visual representation of macronutrient distribution
- **Download Reports**: Save your results as a text file
- **Print Support**: Print-friendly layout

## Technologies Used

- HTML5
- CSS3 (Modern CSS with CSS Variables)
- JavaScript (Vanilla JS with modular design)
- Chart.js for data visualization
- Font Awesome for icons

## Getting Started

### Prerequisites

- A modern web browser
- Internet connection (for CDN resources)

### Installation

1. Clone or download the repository
2. Open `index.html` in your web browser

### Local Development

If you want to run this locally without internet:

1. Download Chart.js and Font Awesome locally
2. Update the CDN links in `index.html` to local paths
3. Open `index.html` in your browser

## Usage

1. **Landing Page**: Click "Calculate Now" to start
2. **Fill Form**:
   - Enter your age, gender, weight, and height
   - Select activity level and weight goal
   - Toggle units if needed (kg/cm or lbs/ft)
3. **Calculate**: Click the calculate button
4. **View Results**: See BMR, daily calories, and macro breakdown
5. **Visualize**: Check the donut chart for macro distribution
6. **Actions**: Download report, print, or recalculate

## Calculations

### BMR (Basal Metabolic Rate)
- **Men**: BMR = (10 × weight) + (6.25 × height) − (5 × age) + 5
- **Women**: BMR = (10 × weight) + (6.25 × height) − (5 × age) − 161

### Daily Calories
- TDEE = BMR × Activity Multiplier
- Target = TDEE × Goal Multiplier

### Macronutrients
- **Protein**: 1.8g per kg of body weight
- **Fat**: 25% of total calories
- **Carbs**: Remaining calories

## File Structure

```
calorie-calculator/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## Browser Support

- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Mifflin-St Jeor formula for BMR calculations
- Chart.js for charting library
- Font Awesome for icons
- Inspired by various health and fitness calculators