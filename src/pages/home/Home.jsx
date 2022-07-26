import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';


import AddProduct from '../../components/add/AddProduct';
import { useDispatch,useSelector } from 'react-redux';
import { getProducts } from '../../action/products';
import './homeStyle.css';
import ViewDietails from '../../components/view/ViewDietails';



const Home = () => {
  
  const [layout, setLayout] = useState('grid');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [displayResponsive2, setDisplayResponsive2] = useState(false);
  const [currentPrudoct, setcurrentPrudoct] = useState({})
  const dispatch = useDispatch();

  const sortOptions = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' },
  ];
  const {products} = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts())
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
  const showDetails = (p) => {
   
    setcurrentPrudoct(p)
    setDisplayResponsive2(true)
  }

  const renderListItem = (data) => {

    return (
      <div className="col-12" id="list-item" onClick={()=>showDetails(data)}>
        <div className="product-list-item">
          <img src={data.selectedfile} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} className="img-product" />
          <div className="product-list-detail">
            <div className="product-name">{data.name}</div>
            <div className="product-description">{data.description.substring(0,50)}</div>
            <i className="pi pi-tag product-category-icon"></i><span className="product-category">{data.category}</span>
          </div>
          <div className="product-list-action">
            <span className="product-price" id="price">${data.price}</span>
            <span  id="status-bg">{data.status}</span>
          </div>
        </div>
      </div>
    );
  }

  const renderGridItem = (data) => {

    return (
      <div className="col-12 md:col-4" id="grid-item" onClick={()=>showDetails(data)}>
        <div className="product-grid-item card" id="itm">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.category}</span>
            </div>
            <span className={`product-badge status-${data?.status?.toLowerCase()}`} id="status-bg" >{data.status}</span>
          </div>
          <div className="product-grid-item-content">
            <img src={`${data.selectedfile}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={data.name} className="img-product"/>
            <div className="product-name">{data.name.substring(0,30)}</div>
            <div className="product-description">{data.description.substring(0,20)+'...'}  </div>
          
          </div>
          <div className="product-grid-item-bottom">
            <span className="product-price" id="price">${data.price}</span>
       
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
      <div className="add-btn">
        <Button label="Add" icon="pi pi-plus" onClick={() => setDisplayResponsive(true)} />
      </div>
      <AddProduct displayResponsive={displayResponsive} setDisplayResponsive={setDisplayResponsive} />
      <ViewDietails currentPrudoct={currentPrudoct} displayResponsive2={displayResponsive2} setDisplayResponsive2={setDisplayResponsive2} setcurrentPrudoct={setcurrentPrudoct} />
      <div className="dataview-demo">
        <div className="card">
          <DataView value={products} layout={layout} header={header}
            itemTemplate={itemTemplate} paginator rows={8}
            sortOrder={sortOrder} sortField={sortField} />
        </div>
      </div>
    </>
  );
}

export default Home