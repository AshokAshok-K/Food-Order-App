import React, {useContext,useEffect,useState} from "react";

import CartConText from "../../store/cart-items";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css"

const HeaderCartButton = (props) => {

    const cartCtx = useContext(CartConText)

    const [isbtnBump,setIsbtnBump] = useState(false)

    const { items } = cartCtx

    const numberOfCartItems = items.reduce((curNumber,item) => {
        return curNumber + item.amount
    }, 0)

    const btnClasses = `${classes.button} ${ isbtnBump ? classes.bump : ''}`

    useEffect(() => {
        if(items.length === 0){
            return
        }
        setIsbtnBump(true)

        const timer = setTimeout(() => {
            setIsbtnBump(false)
        },300)

        return(() => {
            clearTimeout(timer)
        })

    },[items])
    
    return(
        <button className={btnClasses} onClick={props.onShowCart}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton