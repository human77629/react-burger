import React from 'react'
import {Route, Redirect, RouteProps} from 'react-router-dom'
import {userLogin} from '../../services/actions/user'
import {useSelector, useDispatch} from '../../services/hooks'

interface Props extends RouteProps {
    children: React.ReactNode
}

const ProtectedRoute:React.FC<Props> = (props: Props) => {
    const {children, ...rest} = props;
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