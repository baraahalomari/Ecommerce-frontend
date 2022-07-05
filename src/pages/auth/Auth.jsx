import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../action/auth'
import './AuthStyle.css';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);
    const switchMood = (e) => {
        e.preventDefault();
        setIsSignUp(!isSignUp)
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            country: '',
            accept: false
        },
        validate: (data) => {
            let errors = {};

            if (!data.email) {
                errors.email = 'Email is required.';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
                errors.email = 'Invalid email address. E.g. example@email.com';
            }
            if (!data.password) {
                errors.password = 'Password is required.';
            }
            if (isSignUp) {
                if (!data.accept) {
                    errors.accept = 'You need to agree to the terms and conditions.';
                }
                if (!data.name) {
                    errors.name = 'Name is required.';
                }
            }
            return errors;
        },
        onSubmit: (data) => {
            console.log(data);
            setFormData(data);
            if (isSignUp) {

                setShowMessage(true);
                dispatch(signup(data, navigate))

            } else {
                dispatch(signin(data, navigate))
                console.log(formData);
            }
            formik.resetForm();
        }
    });

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <div id="suggestions">
            <React.Fragment>
                <Divider />
                <p className="mt-2">Suggestions</p>
                <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                    <li>At least one lowercase</li>
                    <li>At least one uppercase</li>
                    <li>At least one numeric</li>
                    <li>Minimum 8 characters</li>
                </ul>
            </React.Fragment>
        </div>
    );

    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex align-items-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{formData.name}</b>
                    </p>
                </div>
            </Dialog>

            <div className="flex justify-content-center">
                <div className="card">
                    <h1 className="text-center">{isSignUp ? "SIGN UP" : "SIGN IN"}</h1>
                    <form onSubmit={formik.handleSubmit} className="p-fluid">
                        {isSignUp && <div className="field">
                            <span className="p-float-label">
                                <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Name*</label>
                            </span>
                            {getFormErrorMessage('name')}
                        </div>}
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        {isSignUp ? <div className="field">
                            <span className="p-float-label">
                                <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                                    className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                            :
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText id="password" name="password" value={formik.values.password} onChange={formik.handleChange} type="password" className={classNames({ 'p-invalid': isFormFieldValid('password') })} />
                                    <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
                                </span>
                                {getFormErrorMessage('password')}
                            </div>}

                        {isSignUp && <>
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText id="country" name="country" value={formik.values.country} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('country') })} />
                                    <label htmlFor="country">Country</label>
                                </span>
                            </div>
                            <div className="field-checkbox">
                                <Checkbox inputId="accept" name="accept" checked={formik.values.accept} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('accept') })} />
                                <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid('accept') })}>I agree to the terms and conditions*</label>
                            </div>
                        </>
                        }
                        <div className="btn">
                            <Button type="submit" label={isSignUp ? 'Sign Up' : 'Sign In'} className="mt-2" />
                        </div>
                        <div className="btn">
                            <Button onClick={(e) => switchMood(e)}>
                                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Auth;