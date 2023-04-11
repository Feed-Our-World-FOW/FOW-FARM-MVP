import React from 'react'
import ImageCard from '../Img/ImageCard'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { red } from '@mui/material/colors'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { CartItemsInterface } from '../../../interface/AllFarmsInterface'
import { Button } from '@mui/material'
import { addItemToCart, removeItemsFromCart, decreaseItemFromCart } from '../API'
import { fetchToken } from '../token'

function CartProductCard(props: CartItemsInterface) {


  const handleAddItemToCart = async () => {
    try {
      const token = fetchToken()
      const res = await addItemToCart(token, props.id)
      props.loadFunc()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDecreaseItemFromCart = async () => {
    try {
      const token = fetchToken()
      const res = await decreaseItemFromCart(token, props.id)
      props.loadFunc()
    } catch (error) {
      console.log(error)
    }
  }


  const handleRemoveItemFromCart = async () => {
    try {
      const token = fetchToken()
      const res = await removeItemsFromCart(token, props.id)
      props.loadFunc()
    } catch (error) {
      console.log(error)
    }
  }

  

  const styles = {
    card: `w-full h-48 flex justify-between items-center mt-5 max-w-md`,
    left: `h-full w-2/5 flex flex-col justify-around items-center`,
    right: `h-full w-3/6 flex flex-col justify-center items-start p-4`,
    imgBox: `w-24 h-24`,
    btnBox: `w-full h-20 flex flex-col justify-center items-center mt-auto`,
    btn: `w-12 h-6 border-1 border-dark-blue h-full rounded-sm flex justify-center items-center bg-light-white`,
    about: `text-2sm font-semibold`,
    price: `font-bold text-3sm`
  }

  return (
    <div className="w-screen max-w-md">
      <div className={styles.card}>
        <div className={styles.left}>
          <div className={styles.imgBox}>
            <ImageCard 
              image={props.image}
              type='products'
            />
          </div>
          <div className={styles.btnBox}>
            <div className="w-full h-full flex justify-around items-center">
              <button className={styles.btn} 
                onClick={props.quantity > 1 ? handleDecreaseItemFromCart : handleRemoveItemFromCart}
              >
                {
                  props.quantity > 1 ?
                  <RemoveIcon fontSize='small' /> :
                  <DeleteIcon sx={{ color: red[500] }} />
                }
                
              </button>
              <span className='font-bold'>{props.quantity}</span>
              <button className={styles.btn} onClick={handleAddItemToCart}>
                <AddIcon fontSize='small' />
              </button>
            </div>
            {
              props.quantity > 1 ?
              <IconButton aria-label="delete" onClick={handleRemoveItemFromCart}>
                <DeleteIcon sx={{ color: red[500] }} />
              </IconButton> :
              <div className=""></div>
            }
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.about}>{props.summary} ({props.weight})</p>
          <p className={styles.price}>$ {props.price}</p>
        </div>
      </div>
    </div>
  )
}

export default CartProductCard