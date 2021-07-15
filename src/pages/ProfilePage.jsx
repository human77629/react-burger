import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ProfilePage.module.css'
import AppHeader from '../components/AppHeader/AppHeader.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { userInfo, userUpdate, userLogout } from '../services/actions/user';
import {useHistory} from 'react-router-dom'
export function ProfilePage() {
    const passwordRef = React.useRef(null)
    const emailRef = React.useRef(null)
    const usernameRef = React.useRef(null)
    const [editPassword, setEditPassword] = React.useState(false)
    const [editEmail, setEditEmail] = React.useState(false)
    const [editUsername, setEditUsername] = React.useState(false)
    const [username, setUsername] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')    
    const history = useHistory();
    const toggleEditPassword = () =>
    {
        if (!editPassword) setTimeout(() => passwordRef.current.focus(), 0)
        if (editPassword) setPassword(user.password)
        setEditPassword(!editPassword)
    }    
    const toggleEditEmail = () =>
    {
        if (!editEmail) setTimeout(() => emailRef.current.focus(), 0)
        if (editEmail) setEmail(user.email)
        setEditEmail(!editEmail)
    }    
    const toggleEditUsername = () =>
    {
        if (editUsername) setTimeout(() => usernameRef.current.focus(), 0)
        if (editUsername) setUsername(user.name)
        setEditUsername(!editUsername)
    }            
    const {user, accessToken} = useSelector(store=>store.user)
    const dispatch = useDispatch();
    const handleCancelClick = (e) => {
        e.preventDefault()
        setUsername(user.name)
        setEmail(user.email)
        setPassword(user.password)
        setEditUsername(false);        
        setEditEmail(false);
        setEditPassword(false);
    }

    const handleSaveClick = (e) => {
        e.preventDefault()
        const updatedUser = {}
        if (editUsername) updatedUser.name = username
        if (editEmail) updatedUser.email = email
        if (editPassword) updatedUser.password = password
        console.log(updatedUser)
        dispatch(userUpdate({token: accessToken, user: updatedUser}))
    }
    React.useEffect(()=>{
        console.log('before userinfo')
        dispatch(userInfo(accessToken))
    }, [])

    React.useEffect(()=>{
        
        if(user.name) setUsername(user.name)
        if(user.email) setEmail(user.email)
        if(user.password) setPassword(user.password)
        setEditUsername(false);        
        setEditEmail(false);
        setEditPassword(false);        
    },[user])

    return (
        <>
        <AppHeader />
        <main className={`mt-30`}>
            <section className={`${styles.sideSection}`}>
                <div className="mr-15">
            <nav className={`${styles.navBar} mb-20`}>
                <span className={`text text_type_main-medium ${styles.navLink}`}>Профиль</span>
                <span className={`text text_type_main-medium text_color_inactive ${styles.navLink}`} onClick={()=>history.replace({pathname: '/login'})}>История заказов</span>
                <span className={`text text_type_main-medium text_color_inactive ${styles.navLink}`} onClick={()=>dispatch(userLogout())}>Выход</span>
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
                    icon={editUsername?'CloseIcon':'EditIcon'}
                    onIconClick={toggleEditUsername}       
                    ref={usernameRef}             
                    name={'username'}
                    size={'default'}
                    disabled={!editUsername}
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                />
                </div>            
                <div className={styles.inputFix}>
                <Input 
                    type={'email'}
                    placeholder={'E-mail'}
                    icon={editEmail?'CloseIcon':'EditIcon'}
                    ref={emailRef}
                    onIconClick={toggleEditEmail}
                    disabled={!editEmail}
                    name={'email'}
                    size={'default'}
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                </div>
                <div className={styles.inputFix}>
                <Input 
                    type={'password'}
                    placeholder={'Пароль'}
                    disabled={!editPassword}
                    ref={passwordRef}
                    icon={editPassword?'CloseIcon':'EditIcon'}
                    onIconClick={toggleEditPassword}
                    name={'password'}
                    size={'default'}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />   
                </div>
                {(editUsername || editPassword || editEmail) && (
                <div className={`${styles.actions}`}>
                <Button type='secondary' size='medium' onClick={handleCancelClick}>Отмена</Button> 
                <Button type='primary' size='medium' onClick={handleSaveClick}>Сохранить</Button>                
                </div>
                )}
            </form>
            </section>
            <section className={`${styles.sideSection}`}>
                &nbsp;
            </section>
        </main>
        </>
    )
}