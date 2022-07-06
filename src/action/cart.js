import * as api from '../api/index.js';

export const addToCart = (product) => async (dispatch) => {
  try {
    const { data } = await api.addToCart(product);
    console.log(data)
    dispatch({ type: 'ADDTOCART', payload: data })
  } catch (error) {
    console.log({ message: error })
  }
}

export const getItems = (user_id) => async (dispatch) => {
  try {
    const { data } = await api.getItemsCart(user_id);

    dispatch({ type: 'GETITEMS', payload: data })
  } catch (error) {
    console.log({ message: error })
    
  }
}

export const removeItem = (id) => async (dispatch) => {
  try {
     await api.removeItem(id);
    dispatch({ type: 'REMOVEITEM', payload: id })
  } catch (error) {
    console.log({ message: error })
    
  }
}