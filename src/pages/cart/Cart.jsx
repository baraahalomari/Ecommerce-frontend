import React, {  useEffect, useRef } from 'react';
import { DataScroller } from 'primereact/datascroller';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { addToCart, getItems, removeItem } from '../../action/cart';
import { Button } from 'primereact/button';

import { InputNumber } from 'primereact/inputnumber';
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import decode from 'jwt-decode';
import './cart.css';
const Cart = () => {
    const toast = useRef(null);
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);
    const token = JSON.parse(localStorage.getItem('profile'));
    if (token) {
        var decodedToken = decode(token.token);
    }
   
    useEffect(() => {
        dispatch(getItems(decodedToken.id))
    }, []);

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };
    const itemTemplate = (data) => {

        const handleAddToCart = (v) => {
            const dataItem = {
                product_id: data.id,
                user_id: decodedToken.id,
                quantity: v,
                price: parseInt(data.item_price),
                total_price: parseInt(data.item_price) * v,
                name: data.item_name,
                selectedfile: data.selectedfile,
            }
            dispatch(addToCart(dataItem))
        }

        const accept = () => {
            
            dispatch(removeItem(data.id))
        };
    
      
        const confirm2 = (event) => {
            confirmPopup({
                target: event.currentTarget,
                message: 'Do you want to delete this record?',
                icon: 'pi pi-info-circle',
                acceptClassName: 'p-button-danger',
                accept,
                reject
            });
        };

        return (
            <div className="product-item">
                <Toast ref={toast} />
                <ConfirmPopup />
                <img src={data.selectedfile} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.item_name} />
                <div className="product-detail">
                    <div className="product-name">{data.item_name}</div>
                    <div className="product-description">Price : ${data.item_price}</div>
                  
                </div>
                <div className="product-action">
                    <span className="product-price">${data.total_price}</span>
                    <div className="field col-12 md:col-3">
                        <InputNumber inputId="integeronly" value={data.quantity} onValueChange={(e) => handleAddToCart(e.value)} />
                    </div>
                    <div className="remove-btn" >
                        <Button icon="pi pi-trash" onClick={confirm2} className="p-button-rounded p-button-danger p-button-text" aria-label="Cancel" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="datascroller-demo">
            <div className="card">
                <DataScroller value={cart} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Items" />
            </div>
        </div>
    );
}

export default Cart