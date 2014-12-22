// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();

$(document).ready(function(){
	Calculator.populateActivityLevel($('#activityLevelContainer'));

	$('#computeButton').on('click', function() {
		weightPounds = parseFloat($('#inputWeight').val());
		//gender = parseInt($("input:radio[name=gender]:checked").val());
		gender = parseInt($("#inputGender").val());
		age = parseInt($('#inputAge').val());
		heightFeet = parseInt($('#inputFeet').val());
		heightInches = parseFloat($('#inputHeight').val());
		//bmrMultiplier = parseFloat($("input:radio[name=multiplier]:checked").val());
		bmrMultiplier = parseFloat($("#activityLevelContainer").val());
		resultsElement = $('#results');
		weightLossMugSizeElement = $('#weightLossMugSize');
		Calculator.computeSizes(weightPounds, gender, age, 0, heightInches, bmrMultiplier, resultsElement, weightLossMugSizeElement);
	});

	$('#scroll-icon').on('click', function() {
		$('html, body').animate({
			scrollTop: $('#how-it-works').offset().top
		},'2000');
		return false
	});

    var windowHeight = $(window).innerHeight();
    if(windowHeight <= 800 && Modernizr.touch) {
    	$('#call-to-action').css('min-height', (windowHeight - 107));
    	$('#how-it-works, #the-diet, #start-diet').css('min-height', windowHeight);
	}
});