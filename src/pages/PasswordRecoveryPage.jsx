import React from 'react';
import { Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './LoginPage.module.css'
import AppHeader from '../components/AppHeader/AppHeader'
import { useDispatch, useSelector } from 'react-redux';
import {Link, Redirect} from 'react-router-dom'
import { passwordReset, SET_PASSWORD_RESET_STAGE, userInfo } from '../services/actions/user';


export function PasswordRecoveryPage() {

    const [email, setEmail] = React.useState('')
    const dispatch = useDispatch();
    const [resetRequested, setResetRequested] = React.useState(false)
    const handleRecoverSubmit = (e) => {
        setResetRequested(true)
        e.preventDefault()
        dispatch(passwordReset(email))
    }

    const { passwordResetStage, accessToken } = useSelector(store=>store.user)


    React.useEffect(()=>{
        dispatch(userInfo(accessToken))
    }, [])    




    const user = useSelector(store=>store.user.user)
    if (user.name!=='') return (<Redirect to='/profile' />)
    return (
        <>
        <AppHeader />
        {passwordResetStage === 'RESET_PAGE' && (
            <Redirect to='/reset-password' />
        )}
        <main className={styles.container}>
            <Logo />
            
            <form className={styles.loginForm} onSubmit={handleRecoverSubmit}>
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
                <span className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to='/login'>Войти</Link></span>
            </section>
        </main>
        </>
    )
}