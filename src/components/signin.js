import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { signInUser, signInWithGoogle, restAllAuthForms } from '../redux/User/user.actions'

import Button from './forms/Button.js'

import FormInput from '../components/forms/FormInput.js'

const mapState = ({ user }) => ({
    signInSuccess: user.signInSuccess
});

const Signin = props => {
    const { signInSuccess } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(signInSuccess) {
            resetForm();
            dispatch(restAllAuthForms());
            props.history.push('/');
        }

    }, [signInSuccess]);

    const resetForm = () => {
        setEmail('');
        setPassword('');
    }

    const handelGoogleSignIn = () => {
        dispatch(signInWithGoogle());
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(signInUser({ email, password }));
    }

        return (
            <div className="mt-20 p-3 m-auto w-11/12 md:w-6/12 xl:w-5/12 2xl:w-3/12 border-gray-300 border rounded-sm">
                <div className="text-center text-2xl">
                    <h2>
                        Login
                    </h2>
                </div>
                <div className="pt-4">
                    <form onSubmit={handleSubmit}>
                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="email"
                            handelChange={e => setEmail(e.target.value)}
                        />
                        <FormInput 
                            type="password"
                            name="password"
                            value={password}
                            placeholder="password"
                            handelChange={e => setPassword(e.target.value)}
                        />
                        <Button type="submit">
                           LogIn
                        </Button>
                        <div className="mt-2">
                            <div>
                                <Button onClick={handelGoogleSignIn}>
                                    Sign in with Google
                                </Button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-2">
                        <Link to="/recovery">
                            Reset Password
                        </Link>
                    </div>
                </div>
            </div>
        );
}

export default withRouter(Signin);
