import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ProfilePage.module.css'
import AppHeader from '../components/AppHeader/AppHeader.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { userInfo, userUpdate, userLogout } from '../services/actions/user';
import { getIngredients, getOrders, VIEW_ORDER } from '../services/actions/burger';
import { OrderDetails } from '../components/OrderDetails/OrderDetails';
import {useHistory, useLocation} from 'react-router-dom'
import ProfileNavMenu from '../components/ProfileNavMenu/ProfileNavMenu';
import { OrderFeed } from '../components/OrderFeed/OrderFeed';
import Modal from '../components/Modal/Modal';
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
    const location = useLocation();

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
    const {orders, ingredients, viewedOrder} = useSelector(store=>store.burger)    
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

    const [isOrderModalOpen, setIsOrderModalOpen] = React.useState(false)
    

    const handleOpenOrderModal = function (orderId) {
        const order = orders.find(order=>order._id===orderId)
        history.replace({pathname: `/profile/orders/${order._id}`, state: {background: location}})
        dispatch({type: VIEW_ORDER, order: order});
        setIsOrderModalOpen(true);        
    }

    const handleCloseModals = () => {
        setIsOrderModalOpen(false)
        history.replace({pathname: '/profile/orders'})
    }    

    const handleSaveClick = (e) => {
        e.preventDefault()
        const updatedUser = {}
        if (editUsername) updatedUser.name = username
        if (editEmail) updatedUser.email = email
        if (editPassword) updatedUser.password = password

        dispatch(userUpdate({token: accessToken, user: updatedUser}))
    }

    const profileEdit =  () => (
        <form className={`${styles.form} mt-20`}>
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
    )

    React.useEffect(()=>{        
        dispatch(userInfo(accessToken))
        const escapeHandler = (event) => event.key === 'Escape' && handleCloseModals();
        document.addEventListener('keydown', escapeHandler);
    
        return () => document.removeEventListener('keydown', escapeHandler);           
    }, [])

    React.useEffect(()=>{
        
        if(user.name) setUsername(user.name)
        if(user.email) setEmail(user.email)
        if(user.password) setPassword(user.password)
        setEditUsername(false);        
        setEditEmail(false);
        setEditPassword(false);        
        if (user.name) {
            dispatch(getIngredients())
            dispatch(getOrders())
        }
    },[user])

    return (
        <>
        <AppHeader />
        <Modal isOpen={isOrderModalOpen} closeCallback={handleCloseModals} header={'Детали заказа'}>
        {viewedOrder && (
            <OrderDetails order={viewedOrder} ingredients={ingredients} />
        )}
     </Modal>        
        <main className={`mt-10`}>
            <section className={`${styles.sideSection} mt-20`}>
            <ProfileNavMenu />
            </section>

            <section className={`${styles.centerSection}`}>
            {location.pathname==='/profile' && profileEdit()}
            {location.pathname==='/profile/orders' && (
                <div className={styles.feed}>
                <OrderFeed orders={orders} ingredients={ingredients} modalCallback={handleOpenOrderModal} status />
                </div>
            )}
            </section>

        </main>
        </>
    )
}