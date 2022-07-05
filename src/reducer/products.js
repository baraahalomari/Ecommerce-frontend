export default (state = { products: [] }, action) => {

  switch (action.type) {
    case 'FATCH_ALL':
      return {
        ...state,
        products: action.payload
      };

    case 'CREATE':
      return { products: [...state.products, action.payload] };

    case 'DELETE':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      }
      
    case 'UPDATE':
      return {
        ...state,
        products: state.products.map(product => product.id === action.payload.id ? action.payload : product)
      }

    default:
      return state;
  }

}