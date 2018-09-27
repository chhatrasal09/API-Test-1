import React, {Component} from 'react';
import '../css/App.css';
import Form from './form.component';

import axios from 'axios';

class App extends Component {

    constructor(props) {
        super(props);
        this.sendData = this.sendData.bind(this);
        this.receiveData = this.receiveData.bind(this);
        // this.self = this;
        this.state = {
            eventName: '',
            eventOrganizerName: '',
            eventDate: '',
            eventTime: '',
            eventVenue: '',
            result: []
        }
    }


    sendData(event) {
        event.preventDefault();
        axios.post('http://18.223.235.175/api/events/postData', this.state)
            .then((response) => {
                console.log(response);
                alert("Data Sent to Server.");
            })
            .catch( (error) => {
                console.log(error);
            });
    }

    receiveData(event) {
        event.preventDefault();
        axios.get('http://18.223.235.175/api/events/getData', this.state)
            .then((response) => {
                // self.state.result = response.data.result;
                this.setState({result: response.data.result});
                console.log(this.state.result);
                alert("Data fetched.")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="App">
                <h1>API Test</h1>
                <div className="Form">
                    <Form label="Event Name" changed={(event) => {
                        this.setState({eventName: event.target.value})
                    }}/>
                    <Form label="Event Organizer Name" changed={(event) => {
                        this.setState({eventOrganizerName: event.target.value})
                    }}/>
                    <Form label="Event Date" changed={(event) => {
                        this.setState({eventDate: event.target.value})
                    }}/>
                    <Form label="Event Time" changed={(event) => {
                        this.setState({eventTime: event.target.value})
                    }}/>
                    <Form label="Event Venue" changed={(event) => {
                        this.setState({eventVenue: event.target.value})
                    }}/>
                    <button className="btn btn-primary" onClick={this.sendData.bind(this)}>Submit</button>
                </div>
                <button className="btn btn-primary" onClick={this.receiveData.bind(this)}>Get Event List</button>
                <div className="TableDiv">
                    <table className="Table table-striped">
                        <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Event Organizer Name</th>
                            <th>Event Date</th>
                            <th>Event Time</th>
                            <th>Event Venue</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.result.map(value => <tr>
                                <td>{value.eventName}</td>
                                <td>{value.eventOrganizerName}</td>
                                <td>{value.eventDate}</td>
                                <td>{value.eventTime}</td>
                                <td>{value.eventVenue}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default App;
