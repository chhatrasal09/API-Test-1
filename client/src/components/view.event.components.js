import React, {Component} from 'react'
import {Button} from "react-bootstrap";
import axios from 'axios';

class ViewEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            eventList: []
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick() {
        const apiUrl = 'http://18.223.235.175/api/events/getData';
        // const apiUrl = 'http://localhost:4000/events/getData';
        axios.get(apiUrl, this.state)
            .then((response) => {
                this.setState({eventList: response.data.result});
                console.log(this.state.result);
                alert("Data fetched.")
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (<div className="TableDiv">
            <Button block bsSize="large" type="submit" onClick={this.handleButtonClick}>
                Get Event List
            </Button>
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
                {this.state.eventList.map(value => <tr>
                        <td>{value.eventName}</td>
                        <td>{value.eventOrganizerName}</td>
                        <td>{value.eventDate}</td>
                        <td>{value.eventTime}</td>
                        <td>{value.eventVenue}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>);
    }
}

export default ViewEvent;