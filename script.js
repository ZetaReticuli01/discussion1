const leftPane = document.getElementById("leftPane");
const rightPane = document.getElementById("rightPane");
const questionForm = document.getElementById("questionForm");

let questions = []; // Store questions and responses

// Add a new question
questionForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("questionTitle").value;
    const text = document.getElementById("questionText").value;

    const question = { title, text, responses: [] };
    questions.push(question);
    renderQuestions();
    questionForm.reset();
});

// Render all questions in the left pane
function renderQuestions() {
    leftPane.innerHTML = "";
    questions.forEach((q, index) => {
        const questionBox = document.createElement("div");
        questionBox.classList.add("question-box");
        questionBox.textContent = q.title;
        questionBox.addEventListener("click", () => renderQuestionDetails(index));
        leftPane.appendChild(questionBox);
    });
}

// Render question details and response form
function renderQuestionDetails(index) {
    const question = questions[index];
    rightPane.innerHTML = `
        <div>
            <h2>${question.title}</h2>
            <p>${question.text}</p>
            <button onclick="resolveQuestion(${index})">Resolve</button>
        </div>
        <h3>Responses</h3>
        <div id="responses">
            ${question.responses.map(r => `<div class="response"><strong>${r.name}:</strong> ${r.comment}</div>`).join("")}
        </div>
        <form id="responseForm">
            <h3>Add Response</h3>
            <div class="form-group">
                <input type="text" id="responseName" placeholder="Enter Name" required>
            </div>
            <div class="form-group">
                <textarea id="responseComment" placeholder="Enter Comment" required></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    `;

    // Add response
    document.getElementById("responseForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("responseName").value;
        const comment = document.getElementById("responseComment").value;

        question.responses.push({ name, comment });
        renderQuestionDetails(index); // Refresh details
    });
}

// Resolve a question
function resolveQuestion(index) {
    questions.splice(index, 1);
    renderQuestions();
    rightPane.innerHTML = `
        <form id="questionForm">
            <h2>Add a New Question</h2>
            <div class="form-group">
                <label for="questionTitle">Title</label>
                <input type="text" id="questionTitle" required>
            </div>
            <div class="form-group">
                <label for="questionText">Question</label>
                <textarea id="questionText" required></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    `;
}
