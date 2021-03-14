import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { resetPasswordStart, resetUserState } from '../redux/User/user.actions'
import FormInput from '../components/forms/FormInput.js'
import Button from '../components/forms/Button.js'


const mapState = ({ user }) => ({
    resetPasswordSuccess: user.resetPasswordSuccess,
    userErr: user.userErr
});

const EmailPassword = props => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { resetPasswordSuccess, userErr } = useSelector(mapState);
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');

    useEffect(() => {
        if(resetPasswordSuccess) {
            dispatch(resetUserState());
            history.push('/login');
        }

    },[resetPasswordSuccess]);

    useEffect(() => {
        if(Array.isArray(userErr) && userErr.length > 0) {
            setErrors(userErr);
        }

    },[userErr]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(resetPasswordStart({email}));
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

export default EmailPassword;