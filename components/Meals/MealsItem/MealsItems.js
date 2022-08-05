import React,{useContext} from "react";
import classes from './MealsItem.module.css'
import MealsItemForm from "./MealsItemForm";
import CartConText from "../../../store/cart-items";

const MealsItem = (props) => {

    const cartCtx= useContext(CartConText)
    const price = `$${props.price.toFixed(2)}`

    const onAddtoCartHandler= (amount) => {
        cartCtx.addItem({
            id:props.id,
            name:props.name,
            amount:amount,
            price:props.price
        })
        
    }
    return(
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealsItemForm id={props.id} onAddToCart={onAddtoCartHandler}/>
            </div>
        </li>
        
    )
}

export default MealsItem