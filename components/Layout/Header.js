import {Fragment} from "react";
import classes from './Header.module.css'
import MealsImg from '../../assets/meals.jpg'
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return(
        <Fragment>
            <header className={classes.header}>
                <h1>Good Meals</h1>
                <HeaderCartButton onShowCart= {props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={MealsImg} alt="A table full of food" />
            </div>
        </Fragment>
    )
}

export default Header