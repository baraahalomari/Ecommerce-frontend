export default (state = { comments: [] }, action) => {

  switch (action.type) {


    case 'GETCOMMENTS':
      return {
        ...state,
        comments: action.payload
      };

    case 'POSTCOMMENT':
      return{comments: [...state.comments, action.payload]};
      
 
    default:
      return state;
  }

}