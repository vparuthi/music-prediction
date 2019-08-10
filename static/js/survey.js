$(document).ready(function(){
//    questions is a 2D array, where col_1 = question text and col_2 = number of response options
    var currentQuestionIndex = 0
    var form = $('.form')
    var questionTitle = form.find('h3')
    var formButtonsDiv = form.find('div.form-check-inline')
    var currentQuestion = questions[currentQuestionIndex]
    var responseValues = {}
    var submitButton = $('.submit-btn')
    var nextButton = $('.next-btn')
    var previousButton = $('.previous-btn')

    populateForm(formButtonsDiv, currentQuestion, questionTitle)

    $('.response-btn').click(function(){
        $('.response-btn').removeClass('btn-selected')
        $(this).addClass('btn-selected')
        responseValues[currentQuestionIndex] = $(this).val()
        console.log(responseValues)
    })

    $(nextButton).click(function(){
        console.log(currentQuestionIndex)
        if (checkIfSelected(formButtonsDiv, responseValues, currentQuestionIndex)){
            currentQuestionIndex++;
            if (currentQuestionIndex + 1 == questions.length){
                $(this).css('visibility', 'hidden')
            }
            currentQuestion = questions[currentQuestionIndex]
            updateForm(questionTitle, currentQuestion, responseValues, currentQuestionIndex)
        }
        $('.previous-btn').css('visibility', 'visible')
    });

    previousButton.click(function(){
        currentQuestionIndex--
        if (currentQuestionIndex == 0){
            $(this).css('visibility', 'hidden')
        }
        currentQuestion = questions[currentQuestionIndex]
        updateForm(questionTitle, currentQuestion, responseValues, currentQuestionIndex)
        $('.next-btn').css('visibility', 'visible')
    });
});

function checkIfSelected(formButtonsDiv, responseValues, currentQuestionIndex){
    if (typeof responseValues[currentQuestionIndex] != 'undefined'){
        return true
    }
    $(formButtonsDiv).effect("shake")
    return false
}

function populateForm(formButtonsDiv, currentQuestion, questionTitle){
    for (option in currentQuestion[1]){
        $('<button/>', {
            value: option,
            text: option.toString(),
            class: 'btn btn-info btn-circle btn-xl response-btn',
            id: option
        }).appendTo(formButtonsDiv);
    }
    questionTitle.text(currentQuestion[0])
}

function reselectResponse(responseValues, currentQuestionIndex){
    if (typeof responseValues[currentQuestionIndex] != 'undefined'){
        responseSelected = responseValues[currentQuestionIndex]
        $("button[value='"+responseSelected.toString()+"']").addClass('btn-selected')
    }
    return
}

function updateForm(questionTitle, currentQuestion, responseValues, currentQuestionIndex){
    questionTitle.text(currentQuestion[0])
    $('.response-btn').removeClass('btn-selected')
    reselectResponse(responseValues, currentQuestionIndex)
}