let count = 1;

function add_question()
{
    let number = `Question ${count}`;
    var newInput = document.createElement("TEXTAREA");
    newInput.name = "question" + count;
    newInput.classList.add("question-page");
    newInput.type = "text";
    newInput.placeholder="Add Question";
    var label = document.createElement("Label");
    label.htmlFor = "question" + count;
    label.innerHTML = number;
    count++;
    let element = document.getElementsByClassName('quest_questions')
    element = element[0]
    let parentDiv = element.parentNode
    parentDiv.appendChild(label)
    parentDiv.appendChild(newInput)
}