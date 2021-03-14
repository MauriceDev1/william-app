import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signUpUserStart } from '../redux/User/user.actions'
import FormInput from '../components/forms/FormInput.js'
import Button from '../components/forms/Button.js'

const mapState = ({ user }) => ({
    currentUser: user.currentUser,
    userError: user.userError
});

const Signup = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser, userError } = useSelector(mapState);
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(() => {
        if(currentUser) {
            reset();
            history.push('/');
        }

    },[currentUser]);

    useEffect(() =>{
        if(Array.isArray(userError) && userError.length > 0){
            setErrors(userError);
        }

    },[userError]);


    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        dispatch(signUpUserStart({
            displayName,
            email,
            password,
            confirmPassword,
        }));
    }

        return (
            <div className="mt-20 p-3 m-auto w-11/12 md:w-6/12 xl:w-5/12 2xl:w-3/12 border-gray-300 border rounded-sm">
                <div className="text-center text-2xl">
                    <h2>
                        Register
                    </h2>
                </div>
                {errors.length > 0 && (
                    <ul>
                        {errors.map((err, index) => {
                            return (
                                <li key={index}>
                                    {err}
                                </li>
                            )
                        })}
                    </ul>
                )}
                <div className="pt-4">
                    <form onSubmit={handleFormSubmit}>
                        <FormInput 
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Full Name"
                            handelChange={e => setDisplayName(e.target.value)}
                        />
                        
                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            handelChange={e => setEmail(e.target.value)}
                        />
                        
                        <FormInput 
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            handelChange={e => setPassword(e.target.value)}
                        />
                        
                        <FormInput 
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            handelChange={e => setConfirmPassword(e.target.value)}
                        />

                        <Button type="submit">
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        );
}

export default Signup;