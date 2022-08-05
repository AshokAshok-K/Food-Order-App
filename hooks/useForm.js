import { useState } from "react";

const useForm = () => {

    const [enteredInput, setEnteredInput] = useState('')
    const [touchedInput, setTouchedInput] = useState(false)

    const enteredInputIsValid = enteredInput !== ''
    const enteredInputIsInValid = !enteredInputIsValid && touchedInput

    const inputChangeHandler = (event) => {
        setEnteredInput(event.target.value)
    }

    const inputTouchHandler = (event) => {
        setTouchedInput(true)
    }

    const reset = () => {
        setEnteredInput('')
        setTouchedInput(false)
    }
    return{
        input: enteredInput,
        validInput : enteredInputIsValid,
        inValidInput : enteredInputIsInValid,
        inputChangeHandler,
        inputTouchHandler,
        reset
    }
  }

  export default useForm