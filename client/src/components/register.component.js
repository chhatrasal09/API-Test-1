import React, {Component} from 'react';
import axios from 'axios';
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";

class Register extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.appContext);
        this.state = {
            email: '',
            password: '',
            authToken: ''
        };

        this.validateForm = this.validateForm.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // handleClick(event) {
    //     let self = this;
    //     const apiUrl = 'http://localhost:4000/auth/register';
    //     let payload = {
    //         email: this.state.email,
    //         password: this.state.password
    //     };
    //     console.log(self.props.appContext);
    // axios.post(apiUrl, payload)
    //     .then(response => {
    //         this.setState({authToken: response.data.user.token});
    //         let uploadScreen = [];
    //         uploadScreen.push(<UpdateEventScreen appContext={self.props.parentContext}/>);
    //         self.props.parentContext.setState({loginScreen: [], updateScreen: uploadScreen});
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     });
    // }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleRegister() {
        // const apiUrl = 'http://18.223.235.175/api/auth/register';
        const apiUrl = 'http://localhost:4000/auth/register';
        let payload = {
            user: {
                email: this.state.email,
                password: this.state.password
            }
        };
        axios.post(apiUrl, payload)
            .then(response => {
                this.setState({authToken: response.data.user.token});
                alert("Registeration Successful....");
            })
            .catch(error => {
                console.log(error)
                alert("Error Occurred....");
            });
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"/>
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        onClick={this.handleRegister}
                        type="submit">
                        Register
                    </Button>
                </form>
            </div>
        );
    }
}

export default Register;