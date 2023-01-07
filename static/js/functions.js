// Functions used for dynamic display in the home.html.

function showTick(elementToTick) {
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