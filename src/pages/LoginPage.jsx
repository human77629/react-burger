import React from 'react';
import { Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './LoginPage.module.css'
import AppHeader from '../components/AppHeader/AppHeader.jsx'

export function LoginPage() {
    const passwordRef = React.useRef(null)
    const [showPassword, setShowPassword] = React.useState(false)
    const toggleShowPassword = () =>
    {
        setTimeout(() => passwordRef.current.focus(), 0)
        setShowPassword(!showPassword)
    }
    return (
        <>
        <AppHeader />
        <main className={styles.container}>
            <Logo />
            
            <form className={styles.loginForm}>
            <h1 className="text text_type_main-medium mt-20">Вход</h1>
                <div className={styles.inputFix}>
                <Input 
                    type={'email'}
                    placeholder={'E-mail'}
                    
                    name={'email'}
                    size={'default'}
                />
                </div>
                <div className={styles.inputFix}>
                <Input 
                    type={showPassword?'text':'password'}
                    placeholder={'Пароль'}
                    ref={passwordRef}
                    icon={'ShowIcon'}
                    onIconClick={toggleShowPassword}
                    name={'password'}
                    size={'default'}
                />   
                </div>
                <Button type='primary' size='medium'>Войти</Button>
            </form>
            <section className={`${styles.additionalActions} mt-20`}>
                <span className="text text_type_main-default text_color_inactive">Вы - новый пользователь? <a href='/register'>Зарегистрироваться</a></span>
                <span className="text text_type_main-default text_color_inactive">Забыли пароль? <a href='/forgot-password'>Восстановить пароль</a></span>
            </section>
        </main>
        </>
    )
}