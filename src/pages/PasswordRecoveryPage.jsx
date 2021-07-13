import React from 'react';
import { Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './LoginPage.module.css'
import AppHeader from '../components/AppHeader/AppHeader.jsx'
import { useDispatch } from 'react-redux';

export function PasswordRecoveryPage() {

    const [email, setEmail] = React.useState('')
    const dispatch = useDispatch();
    return (
        <>
        <AppHeader />
        <main className={styles.container}>
            <Logo />
            
            <form className={styles.loginForm}>
                <h1 className="text text_type_main-medium mt-20">Восстановление пароля</h1>
          
                <div className={styles.inputFix}>
                <Input 
                    type={'email'}
                    placeholder={'Укажите e-mail'}
                    value={email}
                    name={'email'}
                    size={'default'}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                </div>

                <Button type='primary' size='medium'>Восстановить</Button>
            </form>
            <section className={`${styles.additionalActions} mt-20`}>
                <span className="text text_type_main-default text_color_inactive">Вспомнили пароль? <a href='/login'>Войти</a></span>
            </section>
        </main>
        </>
    )
}