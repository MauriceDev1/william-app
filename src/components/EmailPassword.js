import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import FormInput from '../components/forms/FormInput.js'
import Button from '../components/forms/Button.js'
import { auth } from '../firebase/utils.js'


const EmailPassword = props => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const config = {
                url:'http://localhost:3000/login'
            };

            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    props.history.push('/login');
                })
                .catch(() => {
                    const err = ['Email not found. Please try again.'];
                    setErrors(err);
                });

        } catch(err){
            //console.log(err)
        }
        
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