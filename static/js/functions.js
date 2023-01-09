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
    
    // get all question blocks
    var questionBlocks = form.parentElement.children; // last element of this list is the form's button
    var numQuestionBlocks = questionBlocks.length;

    for (var i = 0; i < numQuestionBlocks - 1; i++) { // one question block
        // make the border of the question block gray
        var currentQuestions = questionBlocks[i].children[1]; // ul
        currentQuestions.style.border = "1px solid grey";
        console.log("Question block selected:", currentQuestions);
        

        // check if the question block is properly completed
        var possibleAnswers = currentQuestions.children; // list of li
        var numPossibleAnswers = possibleAnswers.length;
        
        for (var j = 0; j < numPossibleAnswers; j++) {
            var currentAnswer = possibleAnswers[j].children[0].children[1]; // input block
            if ((currentAnswer.required) && (!(currentAnswer.checked))) {
                currentQuestions.style.border = "1px solid red";
            }
        }
    }
}