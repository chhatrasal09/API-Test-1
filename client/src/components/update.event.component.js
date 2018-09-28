import React, {Component} from 'react';
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import '../css/form.css'
import axios from 'axios';

class UpdateEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventName: '',
            eventOrganizerName: '',
            eventDate: '',
            eventTime: '',
            eventVenue: ''
        };

        this.validateForm = this.validateForm.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleUpdate() {
        // const apiUrl = 'http://18.223.235.175/api/events/postData';
        const apiUrl = 'http://localhost:4000/events/postData';
        axios.post(apiUrl, this.state)
            .then((response) => {
                console.log(response);
                alert("Data Sent to Server.");
            })
            .catch((error) => {
                console.log(error);
                alert("Error Occurred....");
            });
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    validateForm() {
        return this.state.eventName.length > 0 && this.state.eventOrganizerName.length > 0
            && this.state.eventDate.length > 0 && this.state.eventTime.length > 0 &&
            this.state.eventVenue.length > 0;
    }

    render() {
        return (
            <div className="RootBody">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="eventName" bsSize="large">
                        <ControlLabel>Event Name</ControlLabel>
                        <FormControl
                            autoFocus
                            type="name"
                            value={this.state.eventName}
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup controlId="eventOrganizerName" bsSize="large">
                        <ControlLabel>Event Organizer Name</ControlLabel>
                        <FormControl
                            autoFocus
                            type="name"
                            value={this.state.eventOrganizerName}
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup controlId="eventDate" bsSize="large">
                        <ControlLabel>Event Date</ControlLabel>
                        <FormControl
                            autoFocus
                            type="date"
                            value={this.state.eventDate}
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup controlId="eventTime" bsSize="large">
                        <ControlLabel>Event Time</ControlLabel>
                        <FormControl
                            value={this.state.eventTime}
                            onChange={this.handleChange}
                            type="time"/>
                    </FormGroup>
                    <FormGroup controlId="eventVenue" bsSize="large">
                        <ControlLabel>Event Venue</ControlLabel>
                        <FormControl
                            autoFocus
                            type="name"
                            value={this.state.eventVenue}
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        onClick={this.handleUpdate}
                        disabled={!this.validateForm()}
                        type="submit">
                        Submit
                    </Button>
                </form>
            </div>
        );
    }

}

export default UpdateEvent;