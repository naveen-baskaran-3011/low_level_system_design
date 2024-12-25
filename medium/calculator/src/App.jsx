import { useState, useCallback } from "react";
import BUTTONS_CONFIG from "./constants/buttons-config";
import "./styles.css";

function calculate(firstNumber, secondNumber, operator) {
    let result = 0;
    switch(operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '/':
            result = firstNumber / secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case 'power':
            result = firstNumber ^ secondNumber;
            break;
        case '*':
            result = firstNumber * secondNumber;
            break;
    }

    return result;
}

export default function App() {
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [operator, setOperator] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [answer, setAnswer] = useState(0);

  const onButtonClickHandler = useCallback(
    (event, buttonConfig) => {
      if (buttonConfig.operation) {
        if (buttonConfig.id === "delete") {
          setFirstNumber(0);
          setSecondNumber(0);
          setAnswer(0);
          setOperator(0);
          setCurrentNumber(1);
          document.querySelector("#question").innerText = "-";
        } else if(buttonConfig.id === "ans") {
            let result = calculate(firstNumber, secondNumber, operator);
            setAnswer(result);
        } else {
          if(secondNumber) {
            const ans = calculate(firstNumber, secondNumber, operator);
            setAnswer(ans);
            setFirstNumber(ans);
            setOperator(buttonConfig.id);
            setCurrentNumber(2);
            setSecondNumber(0);
            document.querySelector("#question").innerText = `${ans}${buttonConfig.label}`;
          } else {
            document.querySelector("#question").innerText = `${firstNumber}${buttonConfig.label}`;
            setOperator(buttonConfig.id);
            setCurrentNumber(2);
          }
        }
      } else {
        if (currentNumber === 1) {
          const firstNumberToDisplay = `${firstNumber ? firstNumber : ""}${
            buttonConfig.id
          }`;
          document.querySelector("#question").innerText = firstNumberToDisplay;
          setFirstNumber(Number(firstNumberToDisplay));
        } else {
          const secondNumberToDisplay = `${secondNumber ? secondNumber : ""}${
            buttonConfig.id
          }`;
          document.querySelector(
            "#question"
          ).innerText = `${firstNumber}${operator}${secondNumberToDisplay}`;
          setSecondNumber(Number(secondNumberToDisplay));
        }
      }
    },
    [firstNumber, secondNumber, operator, setFirstNumber, setSecondNumber]
  );

  return (
    <div className="App">
      <div className="calculator-background">
        <div className="input-area">
          <div className="question" id="question">
            -
          </div>
          <div className="answer" id="answer">{answer}</div>
        </div>
        <div className="buttons-areas">
          {BUTTONS_CONFIG.map((el) => (
            <button
              key={el.id}
              onClick={(event) => onButtonClickHandler(event, el)}
              dangerouslySetInnerHTML={{ __html: el.label }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
