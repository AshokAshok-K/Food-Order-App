import {useState,useEffect} from "react";
import Card from "../UI/Card";
import classes from './AvailableMeals.module.css'
import MealsItem from "./MealsItem/MealsItems";

const AvailableMeals = () => {

  const [menu, setMenu] = useState([])
  const [loading, isLoading] = useState(true)
  const [error, setError] = useState()

  
  useEffect(()=>{

      const fetchMenu = async () =>  {
      
      
          const response = await fetch('https://food-order-app-91f08-default-rtdb.firebaseio.com/meals.json')
          if(!response.ok){
            throw new Error('Something Went Wrong')
          }

          const data = await response.json()
          const menuList =[]
  
              for(const key in data){
                menuList.push({
                  id: key,
                  name: data[key].name,
                  description:data[key].description,
                  price:data[key].price
                })
              }

        setMenu(menuList)
    
     isLoading(false)

  }
      
     fetchMenu().catch((error) => {
      isLoading(false)
      setError(error.message)
     })
  }, [])


  if(loading){
    return <section className={classes.mealsLoading}>
      <p>Loading</p>
    </section>
  }

  if(error){
    return <section className={classes.mealsLoading}>
      <p>{error}</p>
    </section>
  }
  
    const mealsList = menu.map((meal) => 
    <MealsItem 
          id={meal.id}
          key={meal.id}
          name={meal.name} 
          description={meal.description} 
          price={meal.price}
    />
   )  

    return(
        <section className={classes.meals}>
          <Card>
            <ul>{mealsList}</ul>
          </Card>
        </section>
    )

}

export default AvailableMeals