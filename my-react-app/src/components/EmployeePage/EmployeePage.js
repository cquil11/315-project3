import React, { useEffect, useState } from 'react';
import './EmployeePage.css';
import FoodItem from './FoodItem';
import PaymentModal from './PaymentModal';
import { useLocation, useNavigate } from "react-router-dom";

const EmployeePage = () => {
    const navigate = useNavigate();
    const [foods, setFoods] = useState([]);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotal] = useState([]);
    const [employeeID, setEmployee] = useState(parseInt(useLocation().state["employeeID"]));
    const [managerStatus, ManagerStatus] = useState(parseInt(useLocation().state["managerStatus"]));


    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        fetch('foods.json')
            .then(res => res.json())
            .then(result => setFoods(result));
    }, [])

    function round(value, decimals) {
        return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
    }

    const clearCart = async () => {
        cart.forEach((element) => element["count"] = 0)
        setCart([]);
        await fetch('https://project3-api.onrender.com/order/clear', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });
    }

    const removeFromCart = async item => {
        console.log(cart.indexOf(item));
        const url = 'https://project3-api.onrender.com/order/remove/' + item.id.toString()
        await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        });

        if (item["count"] >= 1) {
            item["count"]--;
            setCart([...cart]);
        }
        if (item["count"] == 0) {
            console.log(item == cart[0]);
            setCart(cart => cart.filter((_, i) => cart[i] !== item));
        }

        console.log(cart);
    }

    return (
        <div className='employee-page-style'>
            <div className='sub-employee-one'>
                {
                    foods?.map(food => <FoodItem key={food.id} food={food} cart={cart} setCart={setCart}></FoodItem>)
                }
            </div>
            <div className='sub-employee-two'>
                <div className='selected-items-style'>
                    <h3>Current Orders</h3>
                    <h4>Total Items</h4>
                    {cart.map((product) => {
                        return (
                            <div key={product.id} className='total-items'>
                                <table id="item-table">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <button id="cart-item" className='item-name' onClick={() => removeFromCart(product)}>{product.name}  </button>
                                            </td>
                                            <td><p id="cart-descriptor">${round(parseFloat(product.price) * parseInt(product.count), 2)}</p></td>
                                            <td><p id="cart-descriptor">x{product.count}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    })}
                    <div className='total-items'>
                        <h4>Subtotal: ${round(cart.reduce((total, item) => total + parseInt(item.count) * parseFloat(item.price), 0), 2)}</h4>
                        <h4>Total Price: ${round((cart.reduce((total, item) => total + parseInt(item.count) * parseFloat(item.price), 0) * 1.0825), 2)}</h4>
                        {/* <h4>Total Price: ${getTotalCost(cart)}</h4> */}
                    </div>
                </div>
                <div className='submit-div'>
                    <button className='logout-btn' onClick={openModal}>Submit Order</button>
                    {/* <button className='logout-btn'>Edit Order</button> */}
                    <button className='logout-btn' onClick={clearCart}>Clear Order</button>
                    <button className='logout-btn' onClick={() => navigate('../')}>Logout</button>
                </div>
            </div>
            <PaymentModal openModal={openModal} modalIsOpen={modalIsOpen} afterOpenModal={afterOpenModal} closeModal={closeModal} clearCart={clearCart} employee={employeeID}></PaymentModal>
        </div>
    );
};
export default EmployeePage;
