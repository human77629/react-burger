import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {userLogin} from '../../services/actions/user'
import {useDispatch, useSelector} from 'react-redux'

function ProtectedRoute ({children, ...rest}) {
    const [isUserLoaded, setIsUserLoaded] = React.useState(false)
    const dispatch = useDispatch()

    const user = useSelector(store=>store.user.user)

    const init = async () => {
        await dispatch(userLogin(''))
        setIsUserLoaded(true)
    }

    React.useEffect (()=>{
        init();
    }, [])

    if (!isUserLoaded) {
        return null;
    }

    return (
        <Route 
            {...rest} 
            render={({location})=>
                user.name!==''? (
                    children
                ):(
                    <Redirect to={{
                        pathname: '/login',
                        state: {from: location}
                    }} />
                )
            }
        />
    )
}

export default ProtectedRoute;