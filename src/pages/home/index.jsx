import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Option from '../../shared/components/option';
import { saveInfoCart, saveInfoToppings } from '../../store/order/action';
import style from './style.module.scss';

const pizzas = [
  {
    type: 'S',
    price: 10,
    value: 1,
  },
  {
    type: 'M',
    price: 15,
    value: 2,
  },
  {
    type: 'L',
    price: 25,
    value: 3,
  },
]

const listToppings = [
  {
    type: 'Olives',
    price: 3,
    value: 1,
  },
  {
    type: 'Pepperoni',
    price: 4,
    value: 2,
  },
  {
    type: 'Mushrooms',
    price: 2,
    value: 3,
  },
  {
    type: 'Pepper',
    price: 2,
    value: 4,
  },
]

const Home = () => {
  const [pizzaSelected, setPizzaSelected] = useState(JSON.parse(localStorage.getItem('type')) || {});
  const [toppings, setToppings] = useState(JSON.parse(localStorage.getItem('toppings')) || []);
  const [totalPrice, setTotalPrice] = useState(0);
  
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSelectSizePizza = (pizza) => {
    dispatch(saveInfoCart(pizza))
    setPizzaSelected(pizza)
  }
  
  const handleSelectToppings = (topping) => {
    const exists = toppings.findIndex(item => item.value === topping.value)
    if(exists > -1) {
      const newArr = [...toppings].filter(item => item.value !== topping.value);
      setToppings(newArr)
    } else {
      setToppings(prev => [...prev, topping])
    }
  }

  const handleCheckActive = (topping) => {
    return toppings.some(item => item.value === topping.value);
  }

  const continueOrder = () => {
    if(toppings.length > 0 && Object.keys(pizzaSelected).length > 0) {
      history.push('/order')
    } else {
      alert('please chọn đồ cho đủ')
    }
  }

  useEffect(() => {
    dispatch(saveInfoToppings(toppings))
  }, [toppings])

  useEffect(() => {
    const priceTopping = toppings.reduce(
      (previousValue, currentValue) => previousValue + currentValue.price,
      0
    );
    setTotalPrice(pizzaSelected.price + priceTopping)
  }, [toppings, pizzaSelected])

  return (
    <div className={style.homePage}>
      <img src='./images/bg.jpeg' className={style.image} alt='bg' />
      <div className={style.orderContent}>
        <h2 className={style.orderTitle}>place your order</h2>
        <hr></hr>
        <ul className={style.listOptionPizza}>
          {
            pizzas.map((item) => <Option key={item.value} option={item} round={true} handleSelect={handleSelectSizePizza} selected={pizzaSelected.value === item.value}/>)
          }
        </ul>
        <ul className={style.listTopping}>
          {
            listToppings.map((item) => <Option key={item.value} option={item} handleSelect={handleSelectToppings} selected={handleCheckActive(item)} />)
          }
        </ul>
        <div className={style.cartInfo}>
          <span className={style.totalPrice}>${totalPrice || 0}</span>
          <button className={style.buttonOrder} onClick={continueOrder}>
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home