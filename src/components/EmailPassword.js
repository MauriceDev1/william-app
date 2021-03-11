import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword, restAllAuthForms } from '../redux/User/user.actions'
import FormInput from '../components/forms/FormInput.js'
import Button from '../components/forms/Button.js'


const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    resetPasswordError: user.resetPasswordError
});

const EmailPassword = props => {
    const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(() => {
        if(resetPasswordSuccess) {
            dispatch(restAllAuthForms())
            props.history.push('/login');
        }

    },[resetPasswordSuccess]);

    useEffect(() => {
        if(Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
            setErrors(resetPasswordError);
        }

    },[resetPasswordError]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPassword({email}));
    }

        return (
            
            <div className="mt-20 p-3 m-auto w-11/12 md:w-6/12 xl:w-5/12 2xl:w-3/12 border-gray-300 border rounded-sm">
                <div className="text-center text-2xl">
                    <h2>
                        Email Password
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
                    <form onSubmit={handleSubmit}>
                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="email"
                            handelChange={e => setEmail(e.target.value)}
                        />
                        <Button type="submit">
                           Email Password
                        </Button>
                    </form>
                </div>
            </div>
        )
};

export default withRouter(EmailPassword);