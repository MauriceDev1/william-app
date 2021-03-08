import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import FormInput from '../components/forms/FormInput.js'
import Button from '../components/forms/Button.js'
import { auth } from '../firebase/utils.js'


const initialState = {
    email: '',
    errors: []
}

export default withRouter(class EmailPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initialState
        };

        this.handelChange = this.handelChange.bind(this);
    }

    handelChange(e) {
        const {name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { email } = this.state;

            const config = {
                url:'http://localhost:3000/login'
            };

            await auth.sendPasswordResetEmail(email, config)
                .then(() => {
                    this.props.history.push('/login');
                })
                .catch(() => {
                    const err = ['Email not found. Please try again.'];
                    this.setState({
                        errors: err
                    });
                });

        } catch(err){
            //console.log(err)
        }
        
    }

    render() {
        const { email, errors } = this.state;

        return (
            
            <div className="mt-20 p-3 m-auto w-11/12 md:w-6/12 2xl:w-3/12 border-gray-300 border rounded-sm">
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
                    <form onSubmit={this.handleSubmit}>
                        <FormInput 
                            type="email"
                            name="email"
                            value={email}
                            placeholder="email"
                            onChange={this.handelChange}
                        />
                        <Button type="submit">
                           Email Password
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
});
