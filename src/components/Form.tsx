import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { loginAsync, registerAsync } from '../state/reducers/authReducer';

const Form = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const location = useLocation().pathname;
    const navigate = useNavigate();
    const { isAuth } = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();

    const onSubmit = async (data: any) => {
        try{
            if(location === '/login'){
                await dispatch(loginAsync(data)).unwrap();
            }else if(location === '/register'){
                await dispatch(registerAsync(data)).unwrap();
            }

            if(isAuth) navigate('/');
        }catch(err){
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='form'>
            <label className='form__email'>
                <input {...register('email', {required: true, minLength: 5})} type="text" name='email' placeholder='email...'/>
            </label>
            <label className='form__password'>
                <input {...register('password', {required: true, minLength: 5})} type="password" name='password' placeholder='password...'/>
            </label>

            <button className='form__btn'>{location === '/login' ? 'Login' : 'Register'}</button>
        </form>
    )
}

export default Form;