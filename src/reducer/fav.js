export default (state = { fav: [] }, action) => {

  switch (action.type) {
    case 'ALL':
      return {
        ...state,
        fav: action.payload
      };

    case 'ADDTOFAV':
      return { fav: [...state.fav, action.payload] };

    case 'REMOVE_FROM_FAV':
      return {
        ...state,
        fav: state.fav.filter(product => product.id !== action.payload)
      }

    default:
      return state;
  }

}