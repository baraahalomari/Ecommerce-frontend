import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import FileBase from 'react-file-base64';
import { Button } from 'primereact/button';
import { updateProduct } from '../../action/products';
import { useDispatch } from 'react-redux';
const FormEdit = ({currentPrudoct,setcurrentPrudoct,setEdit}) => {

  const dispatch = useDispatch();

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(updateProduct({...currentPrudoct,category: currentPrudoct.category.name}))
    setEdit(false)
  }
  const category = [
    { name: 'Accessories', code: 'accessories' },
    { name: 'dresses', code: 'dresses' },
    { name: 'kids', code: 'kids' }
  ]
  const status = [
    { name: 'INSTOCK', code: 'INSTOCK' },
    { name: 'LOWSTOCK', code: 'LOWSTOCK' },
    { name: 'OUTOFSTOCK', code: 'OUTOFSTOCK' }
  ]
console.log(currentPrudoct)
const handleChange = (e) =>{
  
  setcurrentPrudoct({...currentPrudoct,status:e.value.code})
}

  return (
    <form onSubmit={handleSubmit} >
    <div className="fieldb">
      <label htmlFor="inputtext">Product Name : </label>
      <InputText id="inputtext" value={currentPrudoct.name} onChange={(e) => setcurrentPrudoct({ ...currentPrudoct, name: e.target.value })} placeholder="Name" style={{width: '100%'}} required />
    </div>
    <div className="fieldb">
        <label  htmlFor="dropdown">Category : </label>
        <Dropdown inputId="dropdown" value={currentPrudoct.category} options={category} onChange={(e) => setcurrentPrudoct({ ...currentPrudoct, category: e.value })} optionLabel="name" placeholder="select a category" style={{width: '100%'}} />
       
    </div>
    <div className="fieldb">
      <label htmlFor="inputtext">Price : </label>
      <InputNumber inputId="stacked" value={currentPrudoct.price} onValueChange={(e) => setcurrentPrudoct({ ...currentPrudoct, price: e.target.value })} showButtons mode="currency" currency="USD" required min={0}  />
      <label  htmlFor="dropdown">Status : </label>
        {/* <Dropdown inputId="dropdown"  options={status} onChange={handleChange} optionLabel="name" placeholder="select a status" /> */}
    </div>
    <div className="fieldb">
      <label htmlFor="inputtext">Description : </label>
      <InputTextarea id="textarea" value={currentPrudoct.description} onChange={(e) => setcurrentPrudoct({...currentPrudoct, description:e.target.value})} rows={4} required />
    </div>
    {/* <div className="fieldb">
      <label htmlFor="inputtext">Image : </label>
        <FileBase type="file" multiple={false} value={currentPrudoct.selectedFile} onDone={({ base64 }) => setcurrentPrudoct({ ...currentPrudoct, selectedFile: base64 })} required />
        <img src={state.selectedFile} alt="image" style={{ width: '100%' }} />
    </div> */}
    <div className="actionDialog">
    <Button label="No" icon="pi pi-times" onClick={() => setEdit(false)} className="p-button-text" />
    <Button label="save" icon="pi pi-check" type="submit"  autoFocus />
  </div>
 
</form>
  )
}

export default FormEdit