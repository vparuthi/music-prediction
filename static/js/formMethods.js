define(['jquery'], function(){
/**
formMethods is a module used to populate and update a .form class object
*/

var formMethods = {};

/**
isResponseSelected: checks if a button has been clicked for the current question
:@param: div formButtonsDiv: $('.form').find('div.form-check-inline')
:@param: dict responseValues: where the keys are questions and values are a user's responses
:@param: int currentQuestionIndex: the current question that is being displayed within the form
:@param: <h> errorText: a header tag $('.error-text')
:return boolean: true if response is selected else false
*/
formMethods.isResponseSelected = function(formButtonsDiv, responseValues, currentQuestionIndex, errorText){
    if (typeof responseValues[currentQuestionIndex] != 'undefined'){
        return true
    }
    $(formButtonsDiv).effect("shake", {distance: 5})
    $('.error-text').css({'visibility': 'visible'})
    return false
}

/**
updateForm: updates the front-end when the user changes page
:@param: <h> questionTitle: a header tag, specifically form.find('h3')
:@param: list currentQuestion: the current question that the user is on; currentQuestion[0] is the question, currentQuestion[1] is the response options
:@param: dict responseValues: where the keys are questions and values are a user's responses
:@param: int currentQuestionIndex: the current question that is being displayed within the form
:return: None
*/
formMethods.updateForm = function(questionTitle, currentQuestion, responseValues, currentQuestionIndex){
    questionTitle.text(currentQuestion[0])
    $('.response-btn').removeClass('btn-selected')
        $('.response-btn').css('visibility', 'hidden')
        for(var i = 0; i < currentQuestion[1].length; i++){
            $(".response-btn[value='"+i.toString()+"']").css('visibility', 'visible').text(currentQuestion[1][i])
        }
   this.reselectResponse(responseValues, currentQuestionIndex)
   return
}

/**
reselectResponse: if a user previously selected an option for a question, this function re-selects it
:@param: dict responseValues: where the keys are questions and values are a user's responses
:@param: int currentQuestionIndex: the current question that is being displayed within the form
:return: None
*/
formMethods.reselectResponse = function (responseValues, currentQuestionIndex){
    if (typeof responseValues[currentQuestionIndex] != 'undefined'){
        responseSelected = responseValues[currentQuestionIndex]
        $("button[value='"+responseSelected.toString()+"']").addClass('btn-selected')
    }
    return
}

/**
populateForm: populates the formButtonsDiv with buttons - should only be called when the page is first created
:@param: div formButtonsDiv: $('.form').find('div.form-check-inline')
:@param: list currentQuestion: the current question that the user is on; currentQuestion[0] is the question, currentQuestion[1] is the response options
:@param: <h> questionTitle: a header tag, specifically form.find('h3')
:return: None
*/
formMethods.populateForm = function(formButtonsDiv, currentQuestion, questionTitle){
    for (option in currentQuestion[1]){
        $('<button/>', {
            value: option,
            text: option.toString(),
            class: 'btn btn-circle btn-xl response-btn',
            id: option
        }).wrap('<div>').parent().appendTo(formButtonsDiv);
    }
    questionTitle.text(currentQuestion[0])
    return
}

return formMethods;
});