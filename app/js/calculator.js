// http://codepen.io/simonds/pen/sbgpE

window.Calculator = {
	bmiRanges : [
		{
			lowValue: 0,
			highValue: 15,
			description: 'Very severely underweight'
		},
		{
			lowValue: 15,
			highValue: 16,
			description: 'Severely underweight'
		},
		{
			lowValue: 16,
			highValue: 18.5,
			description: 'Underweight'
		},
		{
			lowValue: 18.5,
			highValue: 25,
			description: 'Normal (healthy weight)'
		},
		{
			lowValue: 25,
			highValue: 30,
			description: 'Overweight'
		},
		{
			lowValue: 30,
			highValue: 35,
			description: 'Moderately obese'
		},
		{
			lowValue: 35,
			highValue: 40,
			description: 'Severly obese'
		},
		{
			lowValue: 40,
			highValue: 50,
			description: 'Very severely obese'
		}
	],

	bmrMultipliers : [
		{
			activityLevel: 1,
			multiplier: 1.25,
			description: 'Sedentary (little or no exercise)'
		},
		{
			activityLevel: 2,
			multiplier: 1.375,
			description: 'Lightly active (easy exercise/sports 1-3 days/week)'
		},
		{
			activityLevel: 3,
			multiplier: 1.55,
			description: 'Moderately active (moderate exercise/sports 3-5 days/week)'
		},
		{
			activityLevel: 4,
			multiplier: 1.725,
			description: 'Very active (hard exercise/sports 6-7 days a week)'
		},
		{
			activityLevel: 5,
			multiplier: 1.9,
			description: 'Extremely active (very hard exercise/sports and physical job)'
		}
	],

	mugSizes : [
		8, 2
	],

	populateActivityLevel: function(activityLevelContainer) {
		for (i = 0; i < Calculator.bmrMultipliers.length; i++) {
			activityLevelContainer.append('<option value="' + Calculator.bmrMultipliers[i].multiplier + '"> ' + Calculator.bmrMultipliers[i].description + '</option>');
		}
	},

	computeSizes: function(weightPounds, gender, age, heightFeet, heightInches, bmrMultiplier, resultsElement, weightLossMugSizeElement) {
		// constants
		caloriesPerPound = 3500;
		desiredLossRate = 1.0; // lbs per week
		mealsPerDay = 3;
		liquidCaloriesPerOunce = 11;
		solidCaloriesPerCup = 290;
		averageDailySubconscienceSnacking = 150; // in calories
		solidCaloriesPerOunce = solidCaloriesPerCup / 8;
		totalCaloriesPerOunce = liquidCaloriesPerOunce + solidCaloriesPerOunce;

		// computations
		heightTotalFeet = heightInches / 12;
		heightMeters = heightTotalFeet * 0.3048;

		massKg = weightPounds / 2.205;
		bmi = massKg/Math.pow(heightMeters, 2);

		//outputBMI ≔ lookup (BMI , LowBMI , BMILabel , “near”) = [ “ OBESE I (Moderately obese)” ] current status
		maxHealthyWeight = Math.ceil((Math.pow(heightMeters, 2)) * 25);
		overweightWeight = Math.ceil(weightPounds - maxHealthyWeight);

		bmrAdjustment = (gender === 0) ? 5 : -161; // +5 for men, -161 for women
		baselineMetabolicRate = Math.ceil(bmrAdjustment + (10 * massKg) + (6.25 * (heightMeters * 100)) - (age * 5)); // in calories

		adjustedBMR = Math.ceil(baselineMetabolicRate * bmrMultiplier); // in calories
		caloriesPerMeal = Math.ceil(adjustedBMR / mealsPerDay);
		targetAverageWeeklyLoss = Math.ceil(-(caloriesPerPound * desiredLossRate)); // in calories

		targetAverageDailyChange = Math.ceil(targetAverageWeeklyLoss / 7); // in calories per day
		targetAverageMealChange = Math.ceil(targetAverageDailyChange / mealsPerDay); // in calories per meal

		managedCaloriesPerDay = Math.ceil(adjustedBMR + targetAverageDailyChange + (-averageDailySubconscienceSnacking));
		mugSolidCalories = Math.ceil(managedCaloriesPerDay * (solidCaloriesPerOunce / (solidCaloriesPerOunce + liquidCaloriesPerOunce)));
		mugLiquidCalories = Math.ceil(managedCaloriesPerDay * (liquidCaloriesPerOunce / (solidCaloriesPerOunce + liquidCaloriesPerOunce)));
		targetCaloriesMugChange = Math.ceil(mugSolidCalories / mealsPerDay);

		noLossMugSize = Math.ceil(adjustedBMR / (mealsPerDay * totalCaloriesPerOunce));
		weightLossMugSize = Math.ceil(targetCaloriesMugChange / solidCaloriesPerOunce);

		weightLossMugSizeElement.html(weightLossMugSize + ' oz');
		$('.mod_calculate').fadeOut(400, function() {
			resultsElement.fadeIn();
			$('.results').fadeIn();
		});
	}
}