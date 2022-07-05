import * as api from '../api/index.js';

export const addToFav = (product) => async (dispatch) => {
  try {
    const { data } = await api.addToFav(product);
    dispatch({ type: 'ADDTOFAV', payload: data })
  } catch (error) {

    console.log({ message: error })
  }
}

export const getAllFav = (user_id) => async (dispatch) => {
  try {
    const { data } = await api.getFav(user_id);
    dispatch({ type: 'ALL', payload: data })
  } catch (error) {
    console.log({ message: error })
  }
}

export const deleteFav = (id) => async (dispatch) => {
  try {
    await api.deleteFav(id);
    dispatch({ type: 'REMOVE_FROM_FAV', payload: id })
  } catch (error) {

    console.log({ message: error })
  }
}
