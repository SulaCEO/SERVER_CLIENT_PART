import React from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { getListAsync } from '../state/reducers/authReducer';

const Header = () => {
    const { isAuth, user } = useAppSelector((state)=>state.authReducer);
    const dispatch = useAppDispatch();

    return (
        <header className='header'>
            <h1>{isAuth ? `авторизован ${user.email}` : 'Не авторизован'}</h1>
            <button onClick={()=>dispatch(getListAsync())}>Get all users</button>
        </header>
    )
}

export default Header;