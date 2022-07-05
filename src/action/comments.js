import * as api from '../api/index.js';

export const getComments = (product_id) => async (dispatch) => {
  try {
    const { data } = await api.getComments(product_id);
    dispatch({ type: 'GETCOMMENTS', payload: data })
  } catch (error) {
    console.log({ message: error })    
  }
}

export const postComment = (product_id, user_name, comment) => async (dispatch) => {
  try {
    const { data } = await api.createComment({product_id, user_name, comment});
    dispatch({ type: 'POSTCOMMENT', payload: data })
  } catch (error) {
    console.log({ message: error })
    
  }
}