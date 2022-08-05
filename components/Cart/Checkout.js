
import useForm from '../../hooks/useForm';
import classes from './Checkout.module.css';


 const Checkout = (props) => {


     const {
        input: enteredName,
        validInput : enteredNameIsValid,
        inValidInput : enteredNameIsInValid,
        inputChangeHandler : nameInputChangeHandler,
        inputTouchHandler: nameTouchedHandler,
        reset: nameResettHandler
     } = useForm((value) => value.length > 4)

     const {
        input: enteredStreet,
        validInput : enteredStreetIsValid,
        inValidInput : enteredStreetIsInValid,
        inputChangeHandler : streetInputChangeHandler,
        inputTouchHandler: streetTouchedHandler,
        reset: streetResettHandler
     } = useForm((value) => value === "^[0-9]*$")

     const {
        input: enteredPostal,
        validInput : enteredPostalIsValid,
        inValidInput : enteredPostalIsInValid,
        inputChangeHandler : postalInputChangeHandler,
        inputTouchHandler: postalTouchedHandler,
        reset: postalResettHandler
     } = useForm((value) => value !== '')

     const {
        input: enteredCity,
        validInput : enteredCityIsValid,
        inValidInput : enteredCityIsInValid,
        inputChangeHandler : cityInputChangeHandler,
        inputTouchHandler: cityTouchedHandler,
        reset: cityResettHandler
     } = useForm((value) => value !== '')

     let formISValid = false

     if(enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid){
         formISValid = true
     }

     

   const confirmHandler = (event) => {
     event.preventDefault();

     props.onConfirm({
            
      name:enteredName,
      street:enteredStreet,
      postal:enteredPostal,
      city:enteredCity
    
   })

     nameResettHandler()
     streetResettHandler()
     postalResettHandler()
     cityResettHandler()

   };
   
   const nameInputClasses = `${classes.control} ${enteredNameIsInValid ? classes.invalid : ''}`
   const streetInputClasses = `${classes.control} ${enteredStreetIsInValid ? classes.invalid : ''}`
   const postalInputClasses = `${classes.control} ${enteredPostalIsInValid ? classes.invalid : ''}`
   const cityInputClasses = `${classes.control} ${enteredCityIsInValid ? classes.invalid : ''}`
   
   return (
     <form className={classes.form} onSubmit={confirmHandler}>
       <div className={nameInputClasses}>
         <label htmlFor='name'>Your Name</label>
         <input 
            type='text' 
            id='name'
            onChange={nameInputChangeHandler}
            onBlur={nameTouchedHandler}
            value={enteredName} 
        />
        {enteredNameIsInValid && 
            (<p>Name Must Not be empty</p>)}
       </div>
       <div className={streetInputClasses }>
         <label htmlFor='street'>Street</label>
         <input 
            type='text' 
            id='street'
            onChange={streetInputChangeHandler}
            onBlur={streetTouchedHandler}
            value={enteredStreet} 
        />
         {enteredStreetIsInValid && 
            (<p>Street Must Not be empty</p>)}
       </div>
       <div className={postalInputClasses}>
         <label htmlFor='postal'>Postal Code</label>
         <input 
            type='text' 
            id='postal'
            onChange={postalInputChangeHandler}
            onBlur={postalTouchedHandler}
            value={enteredPostal} 
        />
         {enteredPostalIsInValid && 
            (<p>Postal Must Not be empty</p>)}
       </div>
       <div className={cityInputClasses}>
         <label htmlFor='city'>City</label>
         <input 
            type='text' 
            id='city'
            onChange={cityInputChangeHandler}
            onBlur={cityTouchedHandler}
            value={enteredCity} 
        />
         {enteredCityIsInValid && 
            (<p>City Must Not be empty</p>)}
       </div>
       <div className={classes.actions}>
         <button type='button' onClick={props.onCancel}>
           Cancel
         </button>
         <button>Confirm</button>
       </div>
     </form>
   );
 };
 
 export default Checkout;