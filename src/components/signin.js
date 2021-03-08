import React, { Component } from 'react'
import Button from './forms/Button.js'
import { signInWithGoogle, auth } from '../firebase/utils.js'

import FormInput from '../components/forms/FormInput.js'
import { Link } from 'react-router-dom'

const initialState = {
    email: '',
    password: ''
}

class signin extends Component {
    constructor(props){
        super(props);
        this.state = {
            ...initialState
        };

        this.handelChange = this.handelChange.bind(this);
    }

    handelChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { email, password} = this.state;

        try{

            await auth.signInWithEmailAndPassword(email,password);
            this.setState({
                ...initialState
            });

        }catch (err){
            //console.log(err);
        }
    }

    render() {
        const { email, password } = this.state;

        return (
            <div className="mt-20 p-3 m-auto w-11/12 md:w-6/12 2xl:w-3/12 border-gray-300 border rounded-sm">
                <div className="text-center text-2xl">
                    <h2>
                        Login
                    </h2>
                </div>
                <div className="pt-4">
                    <form onSubmit={this.handleSubmit}>
                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="email"
                            handelChange={this.handelChange}
                        />
                        <FormInput 
                            type="password"
                            name="password"
                            value={password}
                            placeholder="password"
                            handelChange={this.handelChange}
                        />
                        <Button type="submit">
                           LogIn
                        </Button>
                        <div className="mt-2">
                            <div>
                                <Button onClick={signInWithGoogle}>
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
        )
    }
}

export default signin
