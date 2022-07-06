import React, { useState, useEffect, useRef } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { useDispatch, useSelector } from 'react-redux';


import { Toast } from 'primereact/toast';
import { deleteFav, getAllFav, } from '../../action/fav';
import { addToCart } from '../../action/cart';
import decode from 'jwt-decode';
import './fav.css';


const Fav = () => {
  const toast = useRef(null);
  const { fav } = useSelector((state) => state.fav);
  const [layout, setLayout] = useState('grid');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);

  const dispatch = useDispatch();
  const sortOptions = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' },
  ];
  const token = JSON.parse(localStorage.getItem('profile'));
  if (token) {
    var decodedToken = decode(token.token);

  }
  useEffect(() => {
    dispatch(getAllFav(decodedToken.id))
  }, [])

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    }
    else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  }
  const showSuccess = () => {
    toast.current.show({ severity: 'success', summary: 'Success ', detail: 'Item added to cart', life: 3000 });
  }
  const showSuccessDel = () => {
    toast.current.show({ severity: 'success', summary: 'Success ', detail: 'Item Deleted', life: 3000 });
  }
  const handleDelete = (id) => {
    dispatch(deleteFav(id))
    showSuccessDel()
  }

  const handleAddToCart = (product) => {
    console.log(product)
    const data = {
      product_id: product.product_id,
      user_id: decodedToken?.id,
      quantity: 1,
      total_price: product.price,
    }
    dispatch(addToCart(data))
    showSuccess()
  }

  const renderListItem = (data) => {

    return (
      <div className="col-12" id="list-item" >
        <div className="product-list-item">
          <img src={data.selectedfile} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} className="img-product" />
          <div className="product-list-detail">
            <div className="product-name">{data.name}</div>
            <div className="product-description">{data.description.substring(0, 50)}</div>
            <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
          </div>
          <div className="product-list-action">
            <span className="product-price" id="price">${data.price}</span>
            <span id="status-bg" >{data.status}</span>
          </div>
        </div>
      </div>
    );
  }

  const renderGridItem = (data) => {

    return (
      <div className="col-12 md:col-4" id="grid-item" >
        <div className="product-grid-item card">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.category}</span>
            </div>
            <span className={`product-badge status-${data?.status?.toLowerCase()}`} id="status-bg" >{data.status}</span>
          </div>
          <div className="product-grid-item-content">
            <img src={`${data.selectedfile}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} className="img-product" />
            <div className="product-name">{data.name.substring(0, 30)}</div>
            <div className="product-description">{data.description.substring(0, 20) + '...'}  </div>

          </div>
          <div className="product-grid-item-bottom">
            <span className="product-price" id="price">${data.price}</span>

          </div>
          <div className="conterfav">
            <Button icon="pi pi-shopping-cart" className="p-button-rounded p-button-info" aria-label="User" onClick={() => handleAddToCart(data)} />
            <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" aria-label="Cancel" onClick={() => handleDelete(data.id)} />
          </div>
        </div>
      </div>
    );
  }
  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }

    if (layout === 'list')
      return renderListItem(product);
    else if (layout === 'grid')
      return renderGridItem(product);
  }

  const renderHeader = () => {
    return (
      <div className="grid grid-nogutter" id="header">
        <div className="col-6" style={{ textAlign: 'left' }}>
          <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} />
        </div>
        <div className="col-6" style={{ textAlign: 'right' }}>
          <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
      </div>
    );
  }

  const header = renderHeader();
  return (
    <>
      <Toast ref={toast} />
      <div className="add-btn">
      </div>
      <div className="dataview-demo">
        <div className="card">
          <DataView value={fav} layout={layout} header={header}
            itemTemplate={itemTemplate} paginator rows={9}
            sortOrder={sortOrder} sortField={sortField} />
        </div>
      </div>
    </>
  )
}

export default Fav