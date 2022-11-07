import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addAlert } from '../actions/alertActions';

class AlertModal extends Component {
    state = {
        modal: false,
        name: ''
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const newAlert = {
            deviceID: this.state.deviceID,
            alertType: this.state.alertType,
            lat: this.state.lat,
            lng: this.state.lng,
            timestamp: new Date(),
            isActive: true
        };

        this.props.addAlert(newAlert);

        this.toggle();

        this.props.getALerts();
    }

    render() {
        return (
            <div>
                <Button
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={this.toggle}>
                    Add Item
                </Button>
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add a new ALert</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="alert">Alert</Label>
                                <Input 
                                type="text"
                                name="deviceID"
                                id="alert"
                                placeholder="Device ID"
                                onChange={this.onChange}
                                style={{marginBottom:'2rem'}}
                                />
                                <Input 
                                type="text"
                                name="alertType"
                                id="alert"
                                placeholder="Alert Type"
                                onChange={this.onChange}
                                style={{marginBottom:'2rem'}}
                                />
                                <Input 
                                type="text"
                                name="lat"
                                id="alert"
                                placeholder="Latitude"
                                onChange={this.onChange}
                                style={{marginBottom:'2rem'}}
                                />
                                <Input 
                                type="text"
                                name="lng"
                                id="alert"
                                placeholder="Longitude"
                                onChange={this.onChange}
                                />
                                <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block>
                                    Add Alert
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    alert: state.alert
});

export default connect(mapStateToProps, {addAlert})(AlertModal);
 