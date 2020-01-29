const calculator = {
    displayValue: '0',                     // i/p of user or result
    firstOperand: null,
    waitingForSecondOperand: false,          //flag if 2nd operand needed or not
    operator: null,                          //arithmatic ops +-*/
  };
  
  
  
  
  
  
  
  function inputDigit(digit) {                            //to update the box
    const { displayValue, waitingForSecondOperand } = calculator;
  
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      
      // Overwrite `displayValue` if the current value is '0' otherwise append to it
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
  
   // console.log(calculator);
  }
  
  
  
  //to append the dot
  function inputDecimal(dot) {
  
  //checks if dot i/p after operator
    if (calculator.waitingForSecondOperand === true) return;
  
    // If the `displayValue` does not contain a decimal point
    if (!calculator.displayValue.includes(dot)) {
      // Append the decimal point
      calculator.displayValue += dot;
    }
  }
  
  
  
  //in case of an operator +-*/
  function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);
      
      
      //in case 2 operators hit at a time
    if (operator && calculator.waitingForSecondOperand)  { 
  //replace the previous one
      calculator.operator = nextOperator;
    //  console.log(calculator);
      return;
    }
  
    if (firstOperand == null) {
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = performCalculation[operator](currentValue, inputValue);
  
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
      
   // console.log(calculator);
  }
  
  
  
  
  // to perform calculation of whatever's on the box
  const performCalculation = {                      
    '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  
    '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  
    '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  
    '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

    '%': (firstOperand, secondOperand) => firstOperand*(secondOperand/100) ,
  
    '=': (firstOperand, secondOperand) => secondOperand
  };
  
  
  
  
  //sets value back to 0 in the box and changes true to false and makes null where required
  //same settings as calculator object
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    //console.log(calculator);
  }
  
  
  
  
  
  function updateDisplay() {                             //to update value of box
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  }
  
  updateDisplay();
  
  
  
  
  
  const keys = document.querySelector('.calculator-keys');       //to log the keys
  keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
      return;
    }
  
    if (target.classList.contains('operator')) {
      handleOperator(target.value);
  updateDisplay();
      return;
    }
  
    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);   //call inputDecimal() if clicked dot
  updateDisplay();
      return;
    }
  
    if (target.classList.contains('all-clear')) {
      resetCalculator();
  updateDisplay();
      return;
    }
  
    inputDigit(target.value);
  updateDisplay();
  });
  