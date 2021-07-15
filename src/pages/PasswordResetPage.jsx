import React from 'react';
import { Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './LoginPage.module.css'
import AppHeader from '../components/AppHeader/AppHeader.jsx'
import {Link, Redirect} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { confirmPasswordReset } from '../services/actions/user';

export function PasswordResetPage() {
    const passwordRef = React.useRef(null)
    const [showPassword, setShowPassword] = React.useState(false)

    const [token, setToken] = React.useState('')
    const [password, setPassword] = React.useState('')    
    const [requestSent, setRequestSent] = React.useState(false)
    const dispatch = useDispatch()
    const requestStatus = useSelector(store=>store.user.passwordResetConfirmationStatus)

    const handleSaveClick = (e) => {
        e.preventDefault();
        setRequestSent(true)
        dispatch(confirmPasswordReset(password, token))
    }
    
    const toggleShowPassword = () =>
    {
        setTimeout(() => passwordRef.current.focus(), 0)
        setShowPassword(!showPassword)
    }
    return (
        <>
        <AppHeader />
        {requestStatus.success && requestSent && (<Redirect to='/login' />)}
        <main className={styles.container}>
            <Logo />
            
            <form className={styles.loginForm}>
                <h1 className="text text_type_main-medium mt-20">Восстановление пароля</h1>

       

                <div className={styles.inputFix}>
                <Input 
                    type={showPassword?'text':'password'}
                    placeholder={'Введите новый пароль'}
                    ref={passwordRef}
                    icon={showPassword?'HideIcon':'ShowIcon'}
                    onIconClick={toggleShowPassword}
                    name={'password'}
                    size={'default'}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />   
                </div>
                <div className={styles.inputFix}>
                <Input 
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    value={token}
                    name={'token'}
                    size={'default'}
                    onChange={(e)=>setToken(e.target.value)}
                />
                </div>                     
                <Button type='primary' size='medium' onClick={handleSaveClick}>Сохранить</Button>
            </form>
            <section className={`${styles.additionalActions} mt-20`}>
                <span className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></span>
            </section>
        </main>
        </>
    )
}