import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, connectUser } from '../slices/userSlice';
import { Navigate, useParams } from 'react-router-dom';
import { checkMyToken } from '../api/user';

const RequireDataAuth = (props) => {
    const params = useParams();
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const Child = props.child;
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (user.isLogged === false) {
            const token = window.localStorage.getItem(process.env.REACT_APP_TOKEN_SECRET);
            if (token === null && props.auth) {
                setRedirect(true);
            } else if (token !== null) {
                checkMyToken()
                    .then((res) => {
                        if (res.status !== 200) {
                            if (props.auth) {
                                setRedirect(true);
                            }
                        } else {
                            let user = res.user;
                            user.token = token;
                            dispatch(connectUser(user));
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
    }, [user.isLogged, props.auth, dispatch]);

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return <Child {...props} params={params} />;
}

export default RequireDataAuth;
