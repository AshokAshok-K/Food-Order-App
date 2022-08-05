import { useState} from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {

  const [stateIsShown, setStateIsShown] = useState(false)

  const showCartHandler = () => {
    setStateIsShown(true)
  }

  const hideCartHandler = () => {
    setStateIsShown(false)
  }
  return (
    <CartProvider>
      {stateIsShown && <Cart onHideCart= {hideCartHandler}/>}
      <Header onShowCart= {showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
