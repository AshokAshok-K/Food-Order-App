import React, {useContext,useState} from "react";
import Modal from "../UI/Modal";
import classes from './Cart.module.css'
import CartConText from "../../store/cart-items";
import CartItem from "./CartItem";
import Checkout from "./Checkout";


const Cart = (props) => {

    const cartCtx = useContext(CartConText)
    const [showOrder, setShowOrder] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const totalAmount = `$${+cartCtx.totalAmount.toFixed(2)}` //Adding + to avoid - simble in the total amount when you have no item
    const hasItems = cartCtx.items.length > 0

    const removeCartItemHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const addCartItemHandler = (item) => {
        cartCtx.addItem({...item,amount:1})
    }

    async function submitOrderHandler (userData) {
        setSubmitting(true)
        await fetch('https://food-order-app-91f08-default-rtdb.firebaseio.com/data.json',
       {
          method: 'POST',
          body: JSON.stringify({
          user:userData,
          orderedItems:cartCtx.items
        }),
        headers: {
          'Content-Type' : 'application/json'
        }
       })
       setSubmitting(false)
       setSubmitted(true)
       cartCtx.clearItem()
    }
    const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map((item) => 
                    <CartItem 
                            key={item.id} 
                            name={item.name}
                            amount={item.amount}
                            price={item.price}
                            onAdd={addCartItemHandler.bind(null,item)}
                            onRemove={removeCartItemHandler.bind(null,item.id)}
                    /> )}</ul>

    const toggleHandler = () => {
            setShowOrder(true)
    }


    const actualModalContent = <React.Fragment>
         {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {showOrder && <Checkout onConfirm ={submitOrderHandler }onClick={props.onHideCart} /> }
            {!showOrder && <div className={classes.actions}>
                <button className={classes['button--alt']} onClick= {props.onHideCart}>Close</button>
                {hasItems && <button className={classes.button} onClick = {toggleHandler}>Order</button>}
            </div>
            }
    </React.Fragment>

    const submittingContent = <p>Order is Submitting...</p>

    const submittedContent = <React.Fragment>
        <p>Order is Successfully Placed...</p>
         <div className={classes.actions}>
                <button className={classes['button']} onClick= {props.onHideCart}>Close</button>
          </div>
        
    </React.Fragment>
    return(
        <Modal onClose={props.onHideCart}>
            {!submitting && !submitted && actualModalContent }
            {submitting && submittingContent}
            {submitted && !submitting && submittedContent}
        </Modal>
    )
}

export default Cart