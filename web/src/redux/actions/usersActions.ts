import api from '../../services/api'
import { SET_ERROR, SET_UNAUTHENTICATED, SET_USER, CLEAR_ERROR } from '../types'

interface userDataProps {
    email: string;
    password: string;
    confirmPassword?: string;
}

export const registerUser = (userData: userDataProps, push: Function) => (dispatch: Function) => {

    api.post('/register', userData)
    .then( () => {
        dispatch({type: CLEAR_ERROR})
        dispatch(loginUser(userData, push))
    })
    .catch( err => {
        console.log(err.response.data)
        dispatch({type: SET_ERROR, payload: err.response.data})
    })

}

export const loginUser = (userData: userDataProps, push: Function) => (dispatch: Function) => {
    api.post('/login', userData)
    .then( res => {
        authorizationHeader(res.data.token)
        dispatch({type: SET_USER, payload: res.data.user})
        dispatch({type: CLEAR_ERROR})
        push('/wallet')
    })
    .catch( err => {
        console.log(err.response.data)
        dispatch({type: SET_ERROR, payload: err.response.data})
    })
}

export const logoutUser = () => (dispatch: Function) => {
    localStorage.removeItem("IdToken");
    delete api.defaults.headers.common["Authorization"];
    dispatch({type: SET_UNAUTHENTICATED});
}

export const resetPassword = (data: Object, push: Function) => (dispatch: Function) => {
    api.post('/reset-password', data)
        .then( () => {
            alert("password changed successfully");
            dispatch({type: CLEAR_ERROR})
            push('/login')
        })
        .catch( err => {
            dispatch({type: SET_ERROR, payload: err.response.data})
        });
}

const authorizationHeader = (token: string) => {
    const IdToken = `Bearer ${token}`
    localStorage.setItem('IdToken', IdToken)
    api.defaults.headers.common["Authorization"] = IdToken
}