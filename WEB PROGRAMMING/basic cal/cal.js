let display = document.querySelector(".display");  // display input
let buttons = document.querySelectorAll("button"); //buttons

let expression = "";
buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    let value = button.textContent; 

    
    if (value == "=") {
    
      if (expression != "") {
        let result = Function("return " + expression)(); 
        display.value = result;
        expression = result.toString(); 
      }
    } 

    else {
      expression = expression + value;
      display.value = expression;
    }
  });
});
