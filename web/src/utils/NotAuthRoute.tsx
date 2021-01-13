import React from 'react'
import {Route, Redirect, RouteComponentProps} from 'react-router-dom'
import {useSelector} from 'react-redux'
import { StateProps } from '../redux/store'

interface IProps {
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
    path?: string | string[];
    exact?: boolean;
    sensitive?: boolean;
    strict?: boolean;
}
const NotAuthRoute = ({component: Component, ...rest}: IProps) => {
  
    const {authenticated} = useSelector((state: StateProps) => state.user)
    
    return (
    <Route 
        {...rest}

        render={(props) => authenticated === false 
            ? <Component {...props} />
            : <Redirect to="/wallet" />
        }
    />
)}

export default NotAuthRoute