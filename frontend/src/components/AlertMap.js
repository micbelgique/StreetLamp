import React, { Component } from 'react';
import { connect } from "react-redux";
import { getAlerts } from "../actions/alertActions";
import PropType from "prop-types";

import MapGL, {
    Marker,
    FullscreenControl
  } from "react-map-gl";

  
const TOKEN = "Your Map Token";
class AlertMap extends Component {

    componentDidMount() {
      setInterval((this.props.getAlerts), 1000);
    }

    constructor(props) {
        super(props);
        this.state = {
          viewport: {
            latitude: 50.608167,
            longitude: 3.390932,
            zoom: 15,
            bearing: 0,
            pitch: 60
          },
          popupInfo: null
        };
    
        window.test = () => {
          this.setState({
            ...this.state,
            viewport: {
              ...this.state.viewport,
              zoom: this.state.viewport.zoom === 5 ? 1 : 5
            }
          });
        };
    }

    _updateViewport = viewport => {
        this.setState({ viewport });
      };

    render() {
        const { alerts } = this.props.alert;
        const { viewport } = this.state;

        return (
            <div>
                <MapGL className="mapstyle"
                    {...viewport}
                    width="100%"
                    height="80vh"
                    mapStyle="mapbox://styles/mapbox/dark-v9"
                    mapboxApiAccessToken={TOKEN}
                >
                {alerts.map(({_id, lat, lng}) => {                      
                return (
                    <Marker key={_id} latitude={Number(lat)} longitude={Number(lng)} offsetLeft={-20} offsetTop={-10} >
                        <span>🚨</span>
                 
                    </Marker>
                ) 
                })}
               <FullscreenControl />
                </MapGL>
                
            </div>
        );
    }
}

AlertMap.propTypes = {
    getAlerts: PropType.func.isRequired,
    alert: PropType.object.isRequired
}

const mapStateToProps = (state) => ({
    alert: state.alert
});

export default connect(mapStateToProps, { getAlerts })(AlertMap);

