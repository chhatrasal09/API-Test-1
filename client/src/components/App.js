import React, {Component} from 'react';
import {Route, NavLink, HashRouter} from 'react-router-dom';
import '../css/App.css';
import Login from "./login.component";
import Register from "./register.component";
import UpdateEvent from "./update.event.component";
import ViewEvent from "./view.event.components";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: []
        };
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <h1>API Test 1</h1>
                    <ul className="header">
                        <li><NavLink exact class="active" href="/" to="/">Login</NavLink></li>
                        <li><NavLink className="active" href="/register" to="/register">Register</NavLink></li>
                        <li><NavLink className="active" href="/updateEvent" to="/updateEvent">Update Event</NavLink></li>
                        <li><NavLink className="active" href="/viewEvent" to="/viewEvent">View Events</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/updateEvent" component={UpdateEvent}/>
                        <Route path="/viewEvent" component={ViewEvent}/>
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default App;