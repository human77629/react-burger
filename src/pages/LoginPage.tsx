import React from 'react';
import { Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './LoginPage.module.css'
import AppHeader from '../components/AppHeader/AppHeader'
import { useDispatch, useSelector } from '../services/hooks';
import { userLogin,userInfo } from '../services/actions/user';
import {Link, Redirect, useLocation} from 'react-router-dom'
import {Location} from 'history'


type TLocationState = {
    from?: Location
}

export function LoginPage() {
    const passwordRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = React.useState(false)
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const dispatch = useDispatch(); 
    const {state} = useLocation<TLocationState>();

    const accessToken = useSelector(store=>store.user.accessToken)
    React.useEffect(()=>{

        dispatch(userInfo(accessToken))
    }, [])    

    const toggleShowPassword = () =>
    {
        setTimeout(() => passwordRef?.current?.focus(), 0)
        setShowPassword(!showPassword)
    }
    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        dispatch(userLogin({email: email, password: password}))

    }

    console.log(state)
    console.log(state?.from?.pathname)

    const user = useSelector(store=>store.user.user)
    if (user.name!=='') return (<Redirect to={state?.from?.pathname || '/profile'} />)
    return (
        <>
        <main className={styles.container}>
            <Logo />
            
            <form className={styles.loginForm} onSubmit={handleLoginSubmit}>
            <h1 className="text text_type_main-medium mt-20">Вход</h1>
                <div className={styles.inputFix}>
                <Input 
                    type={'email'}
                    placeholder={'E-mail'}
                    value={email}
                    name={'email'}
                    size={'default'}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                </div>
                <div className={styles.inputFix}>
                <Input 
                    type={showPassword?'text':'password'}
                    placeholder={'Пароль'}
                    ref={passwordRef}
                    value={password}
                    icon={showPassword?'HideIcon':'ShowIcon'}
                    onIconClick={toggleShowPassword}
                    name={'password'}
                    size={'default'}
                    onChange={(e)=>setPassword(e.target.value)}
                />   
                </div>
                <Button type='primary' size='medium'>Войти</Button>
            </form>
            <section className={`${styles.additionalActions} mt-20`}>
                <span className="text text_type_main-default text_color_inactive">Вы - новый пользователь? <Link to='/register'>Зарегистрироваться</Link></span>
                <span className="text text_type_main-default text_color_inactive">Забыли пароль? <Link to='/forgot-password'>Восстановить пароль</Link></span>
            </section>
        </main>
        </>
    )
}