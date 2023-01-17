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

// Variables pour sauvegarde des résultats Jinja2
var my_main_list;
var my_reco_list1;
var my_reco_list2;

function displayFirstResults() {
    // Display SPARQL query results on page load

    // Display results for main merry-go-round
    var main_answer_block = document.getElementById("main_answer_block");
    var panels = main_answer_block.children[1].children; // all panels (including arrows!)
    for (var i = 1; i < Math.min(4, my_main_list["data"].length); i++) {
        var panel = panels[i];
        var panelTitle = panel.children[0];
        var panelImg = panel.children[1];
        var panelAbstract = panel.children[2];
        panelTitle.innerHTML = my_main_list["data"][i - 1]["title"];
        panelImg.src = my_main_list["data"][i - 1]["img"];
        panelAbstract.innerHTML = my_main_list["data"][i - 1]["abstract"];
    }

    // Display results for recommender panel 1
    var same_actor_block = document.getElementById("same_actor_block");
    var panels = same_actor_block.children[1].children; // all panels (including arrows!)
    for (var i = 1; i < Math.min(4, my_reco_list1["data"].length); i++) {
        var panel = panels[i];
        var panelTitle = panel.children[0];
        var panelImg = panel.children[1];
        var panelAbstract = panel.children[2];
        panelTitle.innerHTML = my_reco_list1["data"][i - 1]["title"];
        panelImg.src = my_reco_list1["data"][i - 1]["img"];
        panelAbstract.innerHTML = my_reco_list1["data"][i - 1]["abstract"];
    }

    // Display results for recommender panel 2
    var same_genre_block = document.getElementById("same_genre_block");
    var panels = same_genre_block.children[1].children; // all panels (including arrows!)
    for (var i = 1; i < Math.min(4, my_reco_list2["data"].length); i++) {
        var panel = panels[i];
        var panelTitle = panel.children[0];
        var panelImg = panel.children[1];
        var panelAbstract = panel.children[2];
        panelTitle.innerHTML = my_reco_list2["data"][i - 1]["title"];
        panelImg.src = my_reco_list2["data"][i - 1]["img"];
        panelAbstract.innerHTML = my_reco_list2["data"][i - 1]["abstract"];
    }
}

function saveQueryResults(arg1, arg2, arg3) {
    // Save results from Jinja2
    my_main_list = JSON.parse(arg1);
    my_reco_list1 = JSON.parse(arg2);
    my_reco_list2 = JSON.parse(arg3);
    displayFirstResults();
}

function leftRound1() {
    // Move the merry-go-round left-wise
    // Display results for the selected merry-go-round
    var blockToChange = document.getElementById("main_answer_block");
    var panels = blockToChange.children[1].children; // all panels (including arrows!)
    var popEl = my_main_list["data"].shift();
    my_main_list["data"].push(popEl);
    for (var i = 1; i < Math.min(4, my_main_list["data"].length); i++) {
        var panel = panels[i];
        var panelTitle = panel.children[0];
        var panelImg = panel.children[1];
        var panelAbstract = panel.children[2];
        panelTitle.innerHTML = my_main_list["data"][i - 1]["title"];
        panelImg.src = my_main_list["data"][i - 1]["img"];
        panelAbstract.innerHTML = my_main_list["data"][i - 1]["abstract"];
    }
}

function leftRound2() {
    // Move the merry-go-round left-wise
    // Display results for the selected merry-go-round
    var blockToChange = document.getElementById("same_actor_block");
    var panels = blockToChange.children[1].children; // all panels (including arrows!)
    var popEl = my_reco_list1["data"].shift();
    my_reco_list1["data"].push(popEl);
    for (var i = 1; i < Math.min(4, my_reco_list1["data"].length); i++) {
        var panel = panels[i];
        var panelTitle = panel.children[0];
        var panelImg = panel.children[1];
        var panelAbstract = panel.children[2];
        panelTitle.innerHTML = my_reco_list1["data"][i - 1]["title"];
        panelImg.src = my_reco_list1["data"][i - 1]["img"];
        panelAbstract.innerHTML = my_reco_list1["data"][i - 1]["abstract"];
    }
}

function leftRound3() {
    // Move the merry-go-round left-wise
    // Display results for the selected merry-go-round
    var blockToChange = document.getElementById("same_genre_block");
    var panels = blockToChange.children[1].children; // all panels (including arrows!)
    var popEl = my_reco_list2["data"].shift();
    my_reco_list2["data"].push(popEl);
    for (var i = 1; i < Math.min(4, my_reco_list2["data"].length); i++) {
        var panel = panels[i];
        var panelTitle = panel.children[0];
        var panelImg = panel.children[1];
        var panelAbstract = panel.children[2];
        panelTitle.innerHTML = my_reco_list2["data"][i - 1]["title"];
        panelImg.src = my_reco_list2["data"][i - 1]["img"];
        panelAbstract.innerHTML = my_reco_list2["data"][i - 1]["abstract"];
    }
}

function rightRound1() {
    // Move the merry-go-round left-wise
    // Display results for the selected merry-go-round
    var blockToChange = document.getElementById("main_answer_block");
    var panels = blockToChange.children[1].children; // all panels (including arrows!)
    var popEl = my_main_list["data"].pop();
    my_main_list["data"].unshift(popEl);
    for (var i = 1; i < Math.min(4, my_main_list["data"].length); i++) {
        var panel = panels[i];
        var panelTitle = panel.children[0];
        var panelImg = panel.children[1];
        var panelAbstract = panel.children[2];
        panelTitle.innerHTML = my_main_list["data"][i - 1]["title"];
        panelImg.src = my_main_list["data"][i - 1]["img"];
        panelAbstract.innerHTML = my_main_list["data"][i - 1]["abstract"];
    }
}

function rightRound2() {
    // Move the merry-go-round left-wise
    // Display results for the selected merry-go-round
    var blockToChange = document.getElementById("same_actor_block");
    var panels = blockToChange.children[1].children; // all panels (including arrows!)
    var popEl = my_reco_list1["data"].pop();
    my_reco_list1["data"].unshift(popEl);
    for (var i = 1; i < Math.min(4, my_reco_list1["data"].length); i++) {
        var panel = panels[i];
        var panelTitle = panel.children[0];
        var panelImg = panel.children[1];
        var panelAbstract = panel.children[2];
        panelTitle.innerHTML = my_reco_list1["data"][i - 1]["title"];
        panelImg.src = my_reco_list1["data"][i - 1]["img"];
        panelAbstract.innerHTML = my_reco_list1["data"][i - 1]["abstract"];
    }
}

function rightRound3() {
    // Move the merry-go-round left-wise
    // Display results for the selected merry-go-round
    var blockToChange = document.getElementById("same_genre_block");
    var panels = blockToChange.children[1].children; // all panels (including arrows!)
    var popEl = my_reco_list2["data"].pop();
    my_main_list["data"].unshift(popEl);
    for (var i = 1; i < Math.min(4, my_reco_list2["data"].length); i++) {
        var panel = panels[i];
        var panelTitle = panel.children[0];
        var panelImg = panel.children[1];
        var panelAbstract = panel.children[2];
        panelTitle.innerHTML = my_reco_list2["data"][i - 1]["title"];
        panelImg.src = my_reco_list2["data"][i - 1]["img"];
        panelAbstract.innerHTML = my_reco_list2["data"][i - 1]["abstract"];
    }
}