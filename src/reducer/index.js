import {combineReducers} from 'redux';


import auth from './auth';
import products from './products';
import cart from './cart';
import fav from './fav';
import comments from './comments';

export const reducer = combineReducers({auth,products,cart,fav,comments});