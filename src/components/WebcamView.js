import React, { Component } from 'react';
import Webcam from 'react-webcam';

import headOverlay from './../assets/head.png';
import '../style/WebcamView.css';



class WebcamView extends Component {

    componentDidMount() {
        this.props.setWebcamRef(this.webcam);
    }

    setLocalRef = (webcam) => {
        this.webcam = webcam;
    }

    getWebcam() {
        if(!this.props.miniature) {
            return (
                <div className="text-center">
                    <Webcam
                        className="webcamview"
                        audio={false}
                        ref={this.setLocalRef}
                        screenshotFormat="image/jpeg"
                    />
                    <img alt="Take a pic." src={headOverlay} className="head-overlay"></img>
                </div>
            );
        }
        else {
            return (
                <div className="text-center">
                    <Webcam
                        className="webcamview"
                        audio={false}
                        ref={this.setLocalRef}
                        screenshotFormat="image/jpeg"
                        height="192"
                    />
                    <img alt="Take a pic." src={headOverlay} className="head-overlay-small"></img>
                </div>
            );
        }
    }

    render() {
        return this.getWebcam();
    }
}

export default WebcamView;