import React, { useRef, useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './view.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct } from '../../action/products';
import { addToCart } from '../../action/cart';
import FormEdit from '../update/Form';
import decode from 'jwt-decode';
import { Toast } from 'primereact/toast';
import { addToFav } from '../../action/fav';
import Comments from '../comments/Comments';

const ViewDietails = ({ displayResponsive2, setDisplayResponsive2, currentPrudoct, setcurrentPrudoct }) => {
  const dispatch = useDispatch();
  const toast = useRef(null);
  const [edit, setEdit] = useState(false);
  const { fav } = useSelector((state) => state.fav);
  const checkFav = fav.find((item) => item.id === currentPrudoct.id);
 
  const handleDelete = (id) => {
    dispatch(deleteProduct(id,currentPrudoct.user_id))
    setDisplayResponsive2(false)
  }
  const handleHide = () => {
    setDisplayResponsive2(false)
    setEdit(false)
  }
  const token = JSON.parse(localStorage.getItem('profile'));
  if (token) {
    var decodedToken = decode(token.token);

  }
  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success ', detail: 'Item added to cart', life: 3000 });
  }
  const showSuccessFav = () => {
    toast.current.show({ severity: 'success', summary: 'Success ', detail: 'Item added to favorite', life: 3000 });
  }
  const handleAddToCart = (product) => {
    const data = {
      product_id: product.id,
      user_id: decodedToken?.id,
      quantity: 1,
      total_price: product.price,
    }
    dispatch(addToCart(data))
    showSuccess()
  }
  const handleAddToFavorite = () => {
 if(!checkFav){
     const data =  { product_id:currentPrudoct.id , user_id:decodedToken.id}
    dispatch(addToFav(data))
    showSuccessFav()
 }else{
    toast.current.show({ severity: 'error', summary: 'Error ', detail: 'Item already added to favorite', life: 3000 });
 }
  
  }
  return (
    <Dialog header={currentPrudoct.name} visible={displayResponsive2} onHide={handleHide} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} >
      <Toast ref={toast} />
      <div className="viewContainer">
        <div className="title">
          <span>{currentPrudoct.status}</span>
        </div>
        <div >
          <img src={currentPrudoct.selectedfile} alt={currentPrudoct.name} className="product-img" />
        </div>
        <div className="price">
          <span>{currentPrudoct.price} $</span>
        </div>
        <div className="description">
          <p>{currentPrudoct.description}</p>
        </div>

        <div >
          <Button icon="pi pi-shopping-cart" className="p-button-rounded p-button-info" aria-label="User" onClick={() => handleAddToCart(currentPrudoct)} />
          <Button icon="pi pi-heart" className="p-button-rounded p-button-help" aria-label="Favorite" onClick={handleAddToFavorite} />
          {decodedToken?.id == currentPrudoct.user_id && <><Button icon="pi pi-pencil" className="p-button-rounded p-button-warning" aria-label="Notification" onClick={() => setEdit(true)} />
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" aria-label="Cancel" onClick={() => handleDelete(currentPrudoct.id)} />
          </>}
          <Comments currentPrudoct={currentPrudoct} />
        </div>
      </div>
      {edit && (
        <div className="viewForm">
          <FormEdit currentPrudoct={currentPrudoct} setcurrentPrudoct={setcurrentPrudoct} setEdit={setEdit} />
        </div>)}
    </Dialog>
  )
}

export default ViewDietails