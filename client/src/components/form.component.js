import React, {Component} from 'react'
import '../css/form.css'

class CustomForm extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.props.changed = this.state.value;
    }

    render() {
        return <div className="FormElement">
            <label className="col-form-label">
                {this.props.label}
            </label>
            <input className="input-group-text" type="text" onChange={this.props.changed}/>
        </div>;
    }
}

export default CustomForm;