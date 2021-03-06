import React from 'react';
import { Logo, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './LoginPage.module.css'
import AppHeader from '../components/AppHeader/AppHeader'
import { useSelector, useDispatch } from '../services/hooks';
import { userSignup, userInfo } from '../services/actions/user';
import {Link, Redirect} from 'react-router-dom'

export function SignupPage() {
    const passwordRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const dispatch = useDispatch();
    const accessToken = useSelector(store=>store.user.accessToken)
    React.useEffect(()=>{

        dispatch(userInfo(accessToken))
    }, [])    

    const toggleShowPassword = () =>
    {
        setTimeout(() => passwordRef.current?.focus(), 0)
        setShowPassword(!showPassword)
    }
    const handleSignupSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        
        dispatch(userSignup({email: email, password: password, username: username}))

    }

    const user = useSelector(store=>store.user.user)
    if (user.name!=='') return (<Redirect to='/profile' />)    
    return (

        <main className={styles.container}>
            <Logo />
            
            <form className={styles.loginForm} onSubmit={handleSignupSubmit}>
                <h1 className="text text_type_main-medium mt-20">Регистрация</h1>

                <div className={styles.inputFix}>
                <Input 
                    type={'text'}
                    placeholder={'Имя'}
                    value={username}
                    name={'username'}
                    size={'default'}
                    onChange={(e)=>setUsername(e.target.value)}
                />
                </div>            
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
                    icon={showPassword?'HideIcon':'ShowIcon'}
                    onIconClick={toggleShowPassword}
                    name={'password'}
                    size={'default'}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />   
                </div>
                <Button type='primary' size='medium'>Зарегистрироваться</Button>
            </form>
            <section className={`${styles.additionalActions} mt-20`}>
                <span className="text text_type_main-default text_color_inactive">Уже зарегистрированы? <Link to='/login'>Войти</Link></span>
            </section>
        </main>

    )
}