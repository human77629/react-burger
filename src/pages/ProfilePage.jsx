import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ProfilePage.module.css'
import AppHeader from '../components/AppHeader/AppHeader.jsx'
import {Link} from 'react-router-dom'
export function ProfilePage() {
    const passwordRef = React.useRef(null)
    const [showPassword, setShowPassword] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')    
    const toggleShowPassword = () =>
    {
        setTimeout(() => passwordRef.current.focus(), 0)
        setShowPassword(!showPassword)
    }    
    return (
        <>
        <AppHeader />
        <main className={`mt-30`}>
            <section className={`${styles.sideSection}`}>
                <div className="mr-15">
            <nav className={`${styles.navBar} mb-20`}>
                <span className={`text text_type_main-medium ${styles.navLink}`}>Профиль</span>
                <span className={`text text_type_main-medium text_color_inactive ${styles.navLink}`}>История заказов</span>
                <span className={`text text_type_main-medium text_color_inactive ${styles.navLink}`}>Выход</span>
            </nav>
            <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете<br/>
            изменить свои персональные данные
            </p>
            </div>
            </section>

            <section className={`${styles.centerSection}`}>
            <form className={`${styles.form}`}>
            <div className={styles.inputFix}>
                <Input 
                    type={'text'}
                    placeholder={'Имя'}
                    
                    name={'username'}
                    size={'default'}
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />
                </div>            
                <div className={styles.inputFix}>
                <Input 
                    type={'email'}
                    placeholder={'E-mail'}
                    
                    name={'email'}
                    size={'default'}
                    value={email}
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
                <div className={`${styles.actions}`}>
                <Button type='secondary' size='medium'>Отмена</Button> 
                <Button type='primary' size='medium'>Сохранить</Button>                
                </div>
            </form>
            </section>
            <section className={`${styles.sideSection}`}>
                &nbsp;
            </section>
        </main>
        </>
    )
}