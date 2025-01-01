document.addEventListener('DOMContentLoaded',()=>{

    const expenseForm = document.querySelector("#expense-form");
    const expenseName = document.querySelector("#expense-name");
    const expenseAmt = document.querySelector("#expense-amount");
    const expenseList = document.querySelector("#expense-list");
    const totalAmtDisplay = document.querySelector("#total-amount");


    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let totalAmt = calculateTotal();

    renderDisp();

    expenseForm.addEventListener("submit",(e)=>{
        e.preventDefault();

        const name = expenseName.value.trim()
        const amount = parseFloat(expenseAmt.value.trim())

        if(name !== "" && !isNaN(amount) && amount > 0){
            const newExpense = {
                id : Date.now(),
                name : name,
                amount : amount,
            };
            expenses.push(newExpense);
            savelocalExp();
            renderDisp();
            updateTotal();

            expenseName.value=""
            expenseAmt.value=""
        }

    })

    

    function renderDisp(){
        expenseList.innerHTML="";
        expenses.forEach(expense => {
            const li = document.createElement("li");
            li.innerHTML= `
            ${expense.name} - $${expense.amount}
            <button data-id="${expense.id}">Delete</button>
            `;
            expenseList.appendChild(li);
        })

    }

    function savelocalExp() {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function calculateTotal(){
        return expenses.reduce((sum,expense) => sum + expense.amount, 0);
    }

    function updateTotal(){
        totalAmt = calculateTotal();
        totalAmtDisplay.textContent = totalAmt.toFixed(2);
    }

    expenseList.addEventListener('click',(e)=>{
        if(e.target.tagName === 'BUTTON'){
            const expenseId = parseInt(e.target.getAttribute('data-id'));
            expenses = expenses.filter(expense => expense.id !== expenseId)
            savelocalExp();
            renderDisp();
            updateTotal();

        }

    })

})