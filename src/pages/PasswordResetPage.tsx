import React from 'react';
import { Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './LoginPage.module.css'
import AppHeader from '../components/AppHeader/AppHeader'
import {Link, Redirect} from 'react-router-dom'
import { useDispatch, useSelector } from '../services/hooks';
import { confirmPasswordReset, userInfo } from '../services/actions/user';
import { SET_PASSWORD_RESET_STAGE } from '../services/actions/user';

export function PasswordResetPage() {
    const passwordRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = React.useState(false)

    const [token, setToken] = React.useState('')
    const [password, setPassword] = React.useState('')    
    const [requestSent, setRequestSent] = React.useState(false)
    const dispatch = useDispatch()
    const {passwordResetConfirmationStatus, accessToken, passwordResetStage} = useSelector(store=>store.user)

    const handleSaveSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        setRequestSent(true)
        dispatch(confirmPasswordReset(password, token))
    }

    
    React.useEffect(()=>{

        dispatch(userInfo(accessToken))
    }, [])    

    const handleResendClick = (e:React.MouseEvent) => {
        e.preventDefault();
        dispatch({type: SET_PASSWORD_RESET_STAGE, stage: 'RECOVERY_PAGE'})
    }

    const toggleShowPassword = () =>
    {
        setTimeout(() => passwordRef.current?.focus(), 0)
        setShowPassword(!showPassword)
    }

    const user = useSelector(store=>store.user.user)
    if (user.name!=='') return (<Redirect to='/profile' />)    
    return (
        <>
        {!passwordResetConfirmationStatus.success && passwordResetStage === 'RECOVERY_PAGE' && (
            <Redirect to='/forgot-password' />
        )}
        {passwordResetConfirmationStatus.success && requestSent && (<Redirect to='/login' />)}

        <main className={styles.container}>
            <Logo />
            
            <form className={styles.loginForm} onSubmit={handleSaveSubmit}>
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
                <Button type='primary' size='medium'>Сохранить</Button>
            </form>
            <section className={`${styles.additionalActions} mt-20`}>
                <span className="text text_type_main-default text_color_inactive">Письмо не приходит? <a href='#' onClick={handleResendClick}>Отправить заново</a></span>                
                <span className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></span>
            </section>
        </main>
        </>
    )
}