document.addEventListener('DOMContentLoaded',()=>{

    const startBtn = document.querySelector("#start-btn");
    const nextBtn = document.querySelector("#next-btn");
    const restartBtn = document.querySelector("#restart-btn");
    const questionContainer = document.querySelector("#question-container");
    const questionText = document.querySelector("#question-text");
    const choicesList = document.querySelector("#choices-list");
    const resultContainer = document.querySelector("#result-container");
    const scoreDisplay = document.querySelector("#score");

    const questions = [

        {
            question:"What is capital of India?",
            choices:["Mumbai","Chennai","Berlin","New Delhi"],
            answer: "New Delhi",
        },
        {
            question:"What is the differentiation of sinx ?",
            choices:["sinx","-sinx","cosx","tanx"],
            answer: "cosx",
        },
        {
            question:"In which Year Interstellar movie was released?",
            choices:["2014","2020","2010","2000"],
            answer: "2014",
        },
 
    ]

    let currentQuesIndedx = 0
    let score = 0
    startBtn.addEventListener('click',startQuiz)

    nextBtn.addEventListener("click", () => {
        currentQuesIndedx++;
        if(currentQuesIndedx < questions.length){
            startQuestion()
        }else{
            showRes()
        }
    });

    function startQuiz(){
        startBtn.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        startQuestion();
    }

    function startQuestion(){
        nextBtn.classList.add('hidden');
        questionText.textContent=questions[currentQuesIndedx].question;
        choicesList.innerHTML=""
        questions[currentQuesIndedx].choices.forEach((choice) =>{
            const li = document.createElement('li');
            li.textContent=choice;
            li.addEventListener("click", () => selectAns(choice));
            choicesList.appendChild(li);
        })
    }

    function selectAns(choice){
        const correctAns = questions[currentQuesIndedx].answer;
        if(choice === correctAns){
            score++;
        }
        nextBtn.classList.remove('hidden');
    }

    function showRes(){
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreDisplay.textContent=`${score} out of ${questions.length}`;
    }

    restartBtn.addEventListener('click',()=>{
        score=0;
        currentQuesIndedx=0;
        resultContainer.classList.add('hidden');
        startQuiz();
    })

})