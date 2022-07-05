import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { useDispatch } from 'react-redux';
import FileBase from 'react-file-base64';
import './formAdd.css';
import decode from 'jwt-decode';
import { createProduct } from '../../action/products';



const AddProduct = ({ displayResponsive, setDisplayResponsive }) => {
  const dispatch = useDispatch();
  const token = JSON.parse(localStorage.getItem('profile'));
  const [state, setState] = useState({
    name: '',
    category: '',
    selectedFile: '',
    description: '',
    price: '',
  })

  if (token){
    var decodedToken = decode(token.token);
    
  }
  const clear=()=>{
    setState({
      name: '',
      category: '',
      selectedFile: '',
      description: '',
      price: '',
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
      dispatch(createProduct({ ...state, user_id: decodedToken.id ,category: state.category.code}))
      setDisplayResponsive(false)
    clear()
  }
  const category = [
    { name: 'Accessories', code: 'accessories' },
    { name: 'Dresses', code: 'dresses' },
    { name: 'Kids', code: 'kids' }
  ]


  return (
    <Dialog header="Add Product" visible={displayResponsive} onHide={() => setDisplayResponsive(false)} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }} >
        <form onSubmit={handleSubmit} >
        <div className="fieldb">
          <label htmlFor="inputtext">Product Name : </label>
          <InputText id="inputtext" value={state.name} onChange={(e) => setState({ ...state, name: e.target.value })} placeholder="Name" style={{width: '100%'}} required />
        </div>
        <div className="fieldb">
            <label  htmlFor="dropdown">Category : </label>
            <Dropdown inputId="dropdown" value={state.category} options={category} onChange={(e) => setState({ ...state, category: e.value })} optionLabel="name" placeholder="select a category" style={{width: '100%'}} />
           
        </div>
        <div className="fieldb">
          <label htmlFor="inputtext">Price : </label>
          <InputNumber inputId="stacked" value={state.price} onValueChange={(e) => setState({ ...state, price: e.target.value })} showButtons mode="currency" currency="USD" required />
        </div>
        <div className="fieldb">
          <label htmlFor="inputtext">Description : </label>
          <InputTextarea id="textarea" value={state.description} onChange={(e) => setState({...state, description:e.target.value})} rows={4} required />
        </div>
        <div className="fieldb">
          <label htmlFor="inputtext">Image : </label>
            <FileBase type="file" multiple={false} onDone={({ base64 }) => setState({ ...state, selectedFile: base64 })} required />
            {/* <img src={state.selectedFile} alt="image" style={{ width: '100%' }} /> */}
        </div>
        <div className="actionDialog">
        <Button label="No" icon="pi pi-times" onClick={() => setDisplayResponsive(false)} className="p-button-text" />
        <Button label="Yes" icon="pi pi-check" type="submit"  autoFocus />
      </div>
     
    </form>
      </Dialog>
  )
}

export default AddProduct