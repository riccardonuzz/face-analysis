import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import { fetchFaceRecognition } from '../actions';
import Webcam from 'react-webcam';

import GalleryDropdown from './GalleryDropdown';
import ModalDialog from './../components/Modal';
import {FaCamera} from 'react-icons/lib/fa';
import loadingIcon from './../assets/loading-icon.gif';
import headOverlay from './../assets/head.png';

import '../style/WebcamView.css';



class WebcamView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropdownSelectedValue: '',
            modalIsOpen: false,
            compatibility: "",
            loading: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.setInitialValue = this.setInitialValue.bind(this);
    } 

    handleChange(e) {
        this.setState({ dropdownSelectedValue: e.target.value });
    }

    setInitialValue(value) {
        this.setState({ dropdownSelectedValue: value });
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }
    
    capture = () => {
        this.setState({loading: true});
        this.props.fetchFaceRecognition(this.webcam.getScreenshot(), this.state.dropdownSelectedValue, this.showResults);
    };


    showResults = (value) => {
            this.setState({modalIsOpen: true, compatibility: value, loading: false});
    }

    render() {
        console.log("STATE: ", this.state.dropdownSelectedValue);
        let modal = <ModalDialog title="Risultato" body={this.state.compatibility} modalToggle={() => this.setState({ modalIsOpen: false })} isOpen={this.state.modalIsOpen}/>;

        if(this.state.loading) {
            modal = <div className="overlay"><img alt="Loading..." height="150" width="150" className="loading-icon" src={loadingIcon}></img></div>;
        }

        return(
            <div className="text-center">
                <br />
                <Container>
                    {modal}
                    <br />
                    <Row>
                        <Webcam
                            className="webcamview"
                            audio={false}
                            ref={this.setRef}
                            screenshotFormat="image/jpeg"
                        />
                        <img alt="Take a pic." src={headOverlay} className="head-overlay"></img>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Col xs="6" sm="6" md="6">
                            <Button className="float-right" onClick={this.capture}><FaCamera /> Recognize</Button>
                        </Col>

                        <Col xs="6" sm="6" md="2">
                            <GalleryDropdown className="float-left" initialValue={this.state.dropdownSelectedValue} setInitialValue={this.setInitialValue} handleChange={this.handleChange} disabled={false}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

}


function mapStateToProps(state){
    return {
        face: state.face
    };
}

export default connect(mapStateToProps, {fetchFaceRecognition})(WebcamView);