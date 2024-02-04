import React from 'react';
import Link from 'next/link';
import {AiOutlineShopping} from 'react-icons/ai';
import {AiOutlineMenu} from "react-icons/ai";
import {Cart} from '..';
import {useStateContext} from '../../context/stateContext';

const MainNavbar = () => {
    const {showCart, setShowCart, totalQuantities} = useStateContext();
    return (
      <div>
        <div className='navbar-container'>

          <p className='logo'>
            <Link href='/'>THE HIGHTON</Link>
          </p>

          <p className='menu-options'>
            <Link href='/'>Home</Link>
          </p>

          <p className='menu-options'>
            <Link href='/sabastian'>Sabastian</Link>
          </p>

          <p className='menu-options'>
            <Link href='/monty'>Monty</Link>
          </p>

          <p className='menu-options'>
            <Link href='/store'>Store</Link>
          </p>

          <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
            <AiOutlineShopping />
            <span className='cart-item-qty'>{totalQuantities}</span>
          </button>

          {showCart && <Cart />}

        </div>

        <div className='navbar-container-m'>

          <p className='logo'>
            <Link href='/'>THE HIGHTON</Link>
          </p>

          <div className='menu'>

            <button type='button' className='menu-button' onClick={() => showMenuOptions()}>
              <AiOutlineMenu />
            </button>

            <p id='menu-options1' className='menu-options'>
              <Link href='/'>Home</Link>
            </p>

            <p id='menu-options2' className='menu-options'>
              <Link href='/sabastian'>Sabastian</Link>
            </p>

            <p id='menu-options3' className='menu-options'>
              <Link href='/monty'>Monty</Link>
            </p>

            <p id='menu-options4' className='menu-options'>
              <Link href='/store'>Store</Link>
            </p>

            <button id='menu-cart' type='button' className='cart-icon' onClick={() => setShowCart(true)}>
              <AiOutlineShopping />
              <span className='cart-item-qty'>{totalQuantities}</span>
            </button>

            {showCart && <Cart />}

          </div>
          
        </div>

      </div>
    )
}

const showMenuOptions = () => {
  document.getElementById('menu-options1').classList.toggle('toggle-visible');
  document.getElementById('menu-options2').classList.toggle('toggle-visible');
  document.getElementById('menu-options3').classList.toggle('toggle-visible');
  document.getElementById('menu-options4').classList.toggle('toggle-visible');
  document.getElementById('menu-cart').classList.toggle('toggle-visible');
}

export default MainNavbar
