import React from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './ProfilePage.module.css'
import AppHeader from '../components/AppHeader/AppHeader'
import { useDispatch, useSelector } from '../services/hooks';
import { userInfo, userUpdate, userLogout } from '../services/actions/user';
import { WS_CONNECTION_START, getIngredients, VIEW_ORDER } from '../services/actions/burger';
import { OrderDetails } from '../components/OrderDetails/OrderDetails';
import {useHistory, useLocation} from 'react-router-dom'
import ProfileNavMenu from '../components/ProfileNavMenu/ProfileNavMenu';
import { OrderFeed } from '../components/OrderFeed/OrderFeed';
import Modal from '../components/Modal/Modal';

export function ProfilePage() {
    const passwordRef = React.useRef<HTMLInputElement>(null)
    const emailRef = React.useRef<HTMLInputElement>(null)
    const usernameRef = React.useRef<HTMLInputElement>(null)
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
        if (!editPassword) setTimeout(() => passwordRef.current?.focus(), 0)
        if (editPassword) setPassword('')
        setEditPassword(!editPassword)
    }    
    const toggleEditEmail = () =>
    {
        if (!editEmail) setTimeout(() => emailRef.current?.focus(), 0)
        if (editEmail) setEmail(user.email)
        setEditEmail(!editEmail)
    }    
    const toggleEditUsername = () =>
    {
        if (editUsername) setTimeout(() => usernameRef.current?.focus(), 0)
        if (editUsername) setUsername(user.name)
        setEditUsername(!editUsername)
    }            
    const {user, accessToken} = useSelector(store=>store.user)
    const {orders, ingredients, viewedOrder} = useSelector(store=>store.burger)    
    const dispatch = useDispatch();
    const handleCancelClick = (e:React.MouseEvent) => {
        e.preventDefault()
        setUsername(user.name)
        setEmail(user.email)
        setPassword('')
        setEditUsername(false);        
        setEditEmail(false);
        setEditPassword(false);
    }
   

    const handleOpenOrderModal = function (orderId:string) {
        const order = orders.find(order=>order._id===orderId)
        if (!order) return;
        history.replace({pathname: `/profile/orders/${order._id}`, state: {background: location, modalHeader: '???????????? ????????????'}})
        dispatch({type: VIEW_ORDER, order: order});     
    }


    const handleSaveSubmit = (e:React.FormEvent) => {
        e.preventDefault()
        type TUserData = {
            name:string,
            email:string,
            password:string,
        }
        const updatedUser:TUserData = {name:'', email:'', password: ''}
        if (editUsername) updatedUser.name = username
        if (editEmail) updatedUser.email = email
        if (editPassword) updatedUser.password = password

        dispatch(userUpdate({token: accessToken, user: updatedUser}))
    }

    const profileEdit =  () => (
        <form className={`${styles.form} mt-20`} onSubmit={handleSaveSubmit}>
        <div className={styles.inputFix}>
            <Input 
                type={'text'}
                placeholder={'??????'}
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
                placeholder={'????????????'}
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
            <Button type='secondary' size='medium' onClick={handleCancelClick as ()=>void}>????????????</Button> 
            <Button type='primary' size='medium'>??????????????????</Button>                
            </div>
            )}
        </form>
    )

    React.useEffect(()=>{        
        dispatch(userInfo(accessToken))  
    }, [])

    React.useEffect(()=>{
        
        if(user.name) setUsername(user.name)
        if(user.email) setEmail(user.email)
        setEditUsername(false);        
        setEditEmail(false);
        setEditPassword(false);        
        if (user.name.length>0) {
            dispatch(getIngredients())
            dispatch({type: WS_CONNECTION_START, token: accessToken})
        }
    },[user])

    return (
        <>
   
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