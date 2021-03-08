import React, { Component } from 'react'
import FormInput from '../components/forms/FormInput.js'
import Button from '../components/forms/Button.js'

import { auth, handelUserProfile } from '../firebase/utils.js'

const initialState = {
 displayName: '',
 email: '',
 password: '',
 confirmPassword: '',
 errors: []
};

export default class signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...initialState
        }

        this.handelChange = this.handelChange.bind(this);
    }

    handelChange(e) {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    handleFormSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;

        if(password !== confirmPassword) {
            const err = ['Password Dont\'t match'];
            this.setState({
                errors: err
            });
            return;
        }

        try{

           const { user } = await auth.createUserWithEmailAndPassword(email, password);

           await handelUserProfile(user, { displayName });

           this.setState({
              ...initialState 
           });

        }catch (err) {
            // console.log(err);
        }

    }

    render() {
        const {displayName, email, password, confirmPassword, errors } = this.state;

        return (
            <div className="mt-20 p-3 m-auto w-11/12 md:w-6/12 2xl:w-3/12 border-gray-300 border rounded-sm">
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
                    <form onSubmit={this.handleFormSubmit}>
                        <FormInput 
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Full Name"
                            onChange={this.handelChange}
                        />
                        
                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                            onChange={this.handelChange}
                        />
                        
                        <FormInput 
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                            onChange={this.handelChange}
                        />
                        
                        <FormInput 
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            placeholder="Confirm Password"
                            onChange={this.handelChange}
                        />

                        <Button type="submit">
                            Register
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
