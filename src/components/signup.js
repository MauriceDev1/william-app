import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import FormInput from '../components/forms/FormInput.js'
import Button from '../components/forms/Button.js'

import { auth, handelUserProfile } from '../firebase/utils.js'

const Signup = props => {
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState('');


    const reset = () => {
        setDisplayName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
    }

    const handleFormSubmit = async event => {
        event.preventDefault();

        if(password !== confirmPassword) {
            const err = ['Password Dont\'t match'];
            setErrors(err);
            return;
        }

        try{

           const { user } = await auth.createUserWithEmailAndPassword(email, password);

           await handelUserProfile(user, { displayName });
           reset();
           props.history.push('/');

        }catch (err) {
            // console.log(err);
        }

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

export default withRouter(Signup);