$(document).ready(function(){
//    questions is a 2D array, where col_1 = question text and col_2 = number of response options
    var currentQuestionIndex = 0
    var form = $('form')
    var questionTitle = form.find('h3')
    var formButtonsDiv = form.find('div.form-check-inline')
    var currentQuestion = questions[currentQuestionIndex]
    var responseValues = {}

    populateForm(formButtonsDiv, currentQuestion, questionTitle)

    $('.next-btn').click(function(){
        if (currentQuestionIndex == questions.length - 1){
            $(this).hide()
        }
        if (checkIfSelected(form, formButtonsDiv)){
            responseValues[currentQuestionIndex] = $('input:checked', formButtonsDiv).val()
            currentQuestionIndex++;
            currentQuestion = questions[currentQuestionIndex]
            formButtonsDiv.empty()
            populateForm(formButtonsDiv, currentQuestion, questionTitle)
            console.log(responseValues)
            $('.previous-btn').show()
        }
        reselectResponse(responseValues, currentQuestionIndex)
    });

    $('.previous-btn').click(function(){
        responseValues[currentQuestionIndex] = $('input:checked', formButtonsDiv).val()

        currentQuestionIndex--
        if (currentQuestionIndex == 0){
            $(this).hide()
        }
        currentQuestion = questions[currentQuestionIndex]

        formButtonsDiv.empty()
        populateForm(formButtonsDiv, currentQuestion, questionTitle)
        console.log(responseValues)

        reselectResponse(responseValues, currentQuestionIndex)
    });
});

function checkIfSelected(form, formButtonsDiv){
    if ($('input:radio', form).is(':checked')) {
        return true;
    } else {
        $(formButtonsDiv).effect('shake')
        return false;
    }
}

function populateForm(formButtonsDiv, currentQuestion, questionTitle){
    for (var option = 1; option <= currentQuestion[1]; option++){
        $('<label/>', {
            label: option,
            text: option.toString(),
            class: 'question-label'
        }).appendTo(formButtonsDiv);
        $('<input/>', {
            type: 'radio',
            name: currentQuestion[0],
            id: option,
            value: option,
            class: 'question-input'
        }).appendTo(formButtonsDiv);
    }
    questionTitle.text(currentQuestion[0])
}

function reselectResponse(responseValues, currentQuestionIndex){
    if (typeof responseValues[currentQuestionIndex] != 'undefined' ){
        $("#" + (responseValues[currentQuestionIndex]).toString()).prop("checked", true);
    }
}
