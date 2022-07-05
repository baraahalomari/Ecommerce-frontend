import * as api from '../api/index.js';


export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await api.getProducts();
    dispatch({ type: 'FATCH_ALL', payload: data });
  } catch (error) {
    console.log({ message: error.message })
  }
}

export const createProduct = (product) => async (dispatch) => {
  try {
    const { data } = await api.createProduct(product);
    dispatch({ type: 'CREATE', payload: data })
  } catch (error) {
    console.log({ message: error })
  }
}

export const deleteProduct = (id,user_id) => async (dispatch) => {
  try {
    await api.deleteProduct(id,user_id);
    dispatch({ type: 'DELETE',payload: id  })
  } catch (error) {
    console.log({ message: error })
  }
}

export const updateProduct = (product) => async (dispatch) => {
  try {
    const { data } = await api.updateProduct(product);
    dispatch({ type: 'UPDATE', payload: data })
  } catch (error) {
    console.log({ message: error })
  }
}
