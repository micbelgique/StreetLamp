import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getAlerts, deleteAlert } from "../actions/alertActions";
import PropType from "prop-types";

class AlertList extends Component {

    componentDidMount() {
        setInterval((this.props.getAlerts), 1000);
    }

    onDeleteClick = (_id) => {
        this.props.deleteAlert(_id);
        this.props.getAlerts();
    };

    render() {
        const { alerts } = this.props.alert;
        return (
            <Container>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Device Id</th>
                        <th>Alert type</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Id</th>
                        <th></th>
                    </tr>
                    {alerts.map(({ _id, lat, lng, deviceID, alertType, createdAt }) => (                  
                    <tr key={_id}>
                    <td>{createdAt}</td>
                    <td> {deviceID}</td>
                    <td> {alertType}</td>
                    <td> {lat}</td>
                    <td> {lng}</td>
                    <td>{_id}</td>
                    <td> 
                        <Button
                            className="remove-btn"
                            color="danger"
                            size="sm"
                            style={{ marginRight: '1rem' }}
                            onClick={this.onDeleteClick.bind(this, _id)}>
                        Delete
                        </Button></td>

</tr>

))}






                            </table>


                            
        
                    
               
            </Container>
        );
    }
}

AlertList.propTypes = {
    getAlerts: PropType.func.isRequired,
    alert: PropType.object.isRequired
}

const mapStateToProps = (state) => ({
    alert: state.alert
});

export default connect(mapStateToProps, { getAlerts, deleteAlert })(AlertList);
