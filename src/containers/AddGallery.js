import React, { Component } from 'react';
import { Container, Row, Col, Label, Input, Button, Breadcrumb, BreadcrumbItem  } from 'reactstrap';

import { connect } from 'react-redux';
import { addFaceToGallery } from '../actions';

import Webcam from 'react-webcam';
import ModalDialog from './../components/Modal';
import { Link } from 'react-router-dom';
import {FaCamera, FaCheck, FaClose, FaTrash} from 'react-icons/lib/fa';

import placeholderPic from './../assets/placeholder_pic.jpg';
import headOverlay from './../assets/head.png';




class AddGallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            takenPic: '',
            inputNameValue: '',
            inputGalleryValue: '',
            modalIsOpen: false
        }
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }
    
    capture = () => {
        this.setState({ takenPic: this.webcam.getScreenshot()});
    };

    deletePic = () => {
        this.setState({ takenPic: '' });
    }

    inputNameChange = (e) => {
        this.setState({inputNameValue: e.target.value});
    }

    inputGalleryChange = (e) => {
        this.setState({inputGalleryValue: e.target.value});
    }

    confirm = () => {
        if(this.state.takenPic==='' || this.state.inputNameValue==='' || this.state.inputGalleryValue==='') {
            this.setState({modalIsOpen: true});
            console.log('wrong');
        }
        else {
            this.props.addFaceToGallery(this.state.takenPic, this.state.inputGalleryValue, this.state.inputNameValue, () => {
                this.props.history.push('/gallery');
            });
        }
    }


    render() {

        let showTakenPic = this.state.takenPic !== '' ? 
            (
                <div>
                    <img alt="Your pic." width="100%" height="100%" src={this.state.takenPic}></img><br />
                    <Button color="danger" style={{marginTop: "5px"}} onClick={this.deletePic}><FaTrash /> Delete pic</Button> 
                </div>
            ) : <img alt="Your pic." width="100%" height="192" src={placeholderPic}></img>;


        return(
            <Container>
                <ModalDialog title="Error" body="Fill all fields and take a pic to confirm." modalToggle={() => this.setState({ modalIsOpen: false })} isOpen={this.state.modalIsOpen}/>
                <Row>
                    <Col>
                        <p><font size="6">New gallery</font></p>
                    </Col>
                </Row>
                <Row>
                    <Col lg="4">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/gallery">Galleries</Link></BreadcrumbItem>
                            <BreadcrumbItem active>New gallery</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <p className="text-danger">In order to add a gallery you must also add a face to be saved in.</p>
                    <Label for="username">Gallery</Label>
                    <Input type="text" value={this.state.inputGalleryValue} onChange={this.inputGalleryChange} name="text" id="gallery" placeholder="Insert gallery name..."/>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                    <Label for="username">Name</Label>
                    <Input type="text" value={this.state.inputNameValue} onChange={this.inputNameChange} name="text" id="username" placeholder="Insert your name..."/>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col md="3" xs="12">
                    </Col>
                    <Col md="3" xs="12">
                        <Label for="pic">Take a pic of your face</Label>
                        <Webcam
                            className="webcamview"
                            audio={false}
                            ref={this.setRef}
                            screenshotFormat="image/jpeg"
                            height="192"
                         />
                         <img alt="Take a pic." src={headOverlay} className="head-overlay-small"></img>
                         <Button onClick={this.capture}><FaCamera /> Take a pic</Button>
                         <br /><br />
                    </Col>
                    <Col md="3" xs="12">
                        <Label for="takenPic">Your pic</Label>
                        <br />
                        { showTakenPic }
                        <br /><br />
                    </Col>
                    <Col md="3" xs="12">
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button color="danger" onClick={() => {this.props.history.push('/gallery')}}> <FaClose /> Cancel</Button>{'  '}
                        <Button color="success" onClick={this.confirm}><FaCheck /> Register gallery</Button>
                        <br /><br />
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default connect(null, { addFaceToGallery })(AddGallery);