import React, {Component} from "react";
import {Button, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import "../css/login.css";
import axios from "axios";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
        this.validateForm = this.validateForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        // const apiUrl = 'http://18.223.235.175/api/auth/login';
        const apiUrl = 'http://localhost:4000/auth/login';
        let payload = {
            user: {
                email: this.state.email,
                password: this.state.password
            }
        };
        axios.post(apiUrl, payload)
            .then(response => {
                this.setState({authToken: response.data.user.token});
                alert("Login Successful....");
            })
            .catch(error => {
                console.log(error);
                alert("Please Check your Credentials....");
            });
    };

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
                        onClick={this.handleSubmit}
                        disabled={!this.validateForm()}
                        type="submit">
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}
