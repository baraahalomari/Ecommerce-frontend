export default (state = { cart: [] }, action) => {

  switch (action.type) {
    case 'GETITEMS':

      return {
        ...state,
        cart: action.payload
      };

    case 'ADDTOCART':
      const newcart = state.cart.filter(item => item.id == action.payload.id);

   
      if (newcart.length > 0) {
        newcart[0].quantity = action.payload.quantity
        //update cart

        return{
            ...state,
            cart: state.cart.map(item => {
              if (item.id == action.payload.id) {
                return {
                  ...item,
                  total_price: parseInt(item.item_price) * newcart[0].quantity
                }
              }
              return item;
            })}
      } else {
        return {
          ...state,
          cart: [...state.cart, action.payload]
        };
      }


    case 'REMOVEITEM':
      return {
        ...state,
        cart: state.cart.filter(product => product.id !== action.payload)
      }


    default:
      return state;
  }

}