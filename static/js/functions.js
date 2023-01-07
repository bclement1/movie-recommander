// Functions used for dynamic display in the home.html.

function showTick(elementToTick) {
    // handle the tick/untick icons showing up when a choice is being selected
    var choices = elementToTick.parentElement.parentElement.parentElement.children; // ul list
    var numChoices = choices.length;

    // logs for debug
    console.log("Element to tick:", elementToTick);
    console.log("Available choices in the same question", choices);
    console.log("Number of available choices:", numChoices);

    for (var i = 0; i < numChoices; i++) {
        // untick all available choices in the question
        choices[i].children[0].children[0].style.opacity = 0;
    }

    // display the selected option
    elementToTick.parentElement.children[0].style.opacity = 100;
}

function updateRequirements(elementTicked) {
    // handle the update of the required property to ensure each question has got at least one answer
    var choices = elementTicked.parentElement.parentElement.parentElement.children; // ul list
    var numChoices = choices.length;

    for (var i = 0; i < numChoices; i++) {
        // logs for debug
        console.log("Element fetched:", choices[i].children[0].children[1]);

        // mark all available choices in the question as not required (they initially are)
        choices[i].children[0].children[1].required = false;
    }

    for (var i = 0; i < numChoices; i++) {
        // logs for debug
        console.log("Elements after update:", choices[i].children[0].children[1]);
    }

    // mark the selected option as required
    elementTicked.parentElement.children[1].required = true;
}

function checkSubmission(form) {
    // check that the form is correctly completed before submitting
    
}