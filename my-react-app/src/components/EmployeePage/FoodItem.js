import React from 'react';
import './FoodItem.css';
const FoodItem = ({ food, cart, setCart }) => {
  const { id, name, price, img, count } = food;
  const url = 'http://localhost:8081/order/add/' + id.toString()
  
  const handleClick = async () => {
    await fetch(url, {
      method: 'GET',
      headers: {
          Accept: 'application/json',
      },
    });

    if (cart.includes(food)) {
      cart[cart.indexOf(food)]["count"] += 1;
      setCart([...cart]);
    }
    else {
      food.count += 1;
      setCart([...cart, food]);
    }
    console.log(cart);
  };

  return (
    <div className='grid-item'>
      <div>
        <img src={img} height="100px" width="100px" alt="" />
      </div>
      <div className="desc">
        <p className='name'>{name}</p>
        <p>${price}</p>
      </div>
      <button className='order-btn' onClick={handleClick}>Order Now</button>
    </div>
  );
};
export default FoodItem;