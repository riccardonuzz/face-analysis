import React, { Component } from 'react';
import { Container, Row, Col, Label, Input, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';

import { connect } from 'react-redux';
import { addFaceToGallery } from '../actions';
import { Link } from 'react-router-dom';

import Webcam from 'react-webcam';
import ModalDialog from './../components/Modal';
import {FaCamera, FaCheck, FaClose, FaTrash} from 'react-icons/lib/fa';

import placeholderPic from './../assets/placeholder_pic.jpg';
import headOverlay from './../assets/head.png';
import loadingIcon from './../assets/loading-icon.gif';




class AddFace extends Component {
    constructor(props) {
        super(props);

        this.state = {
            takenPic: '',
            inputValue: '',
            modalIsOpen: false,
            loading: false
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

    inputChange = (e) => {
        this.setState({inputValue: e.target.value});
    }

    confirm = () => {
        if(this.state.takenPic==='' || this.state.inputValue==='') {
            this.setState({modalIsOpen: true});
            console.log('wrong');
        }
        else {
            this.setState({loading: true});
            this.props.addFaceToGallery(this.state.takenPic, this.props.match.params.galleryId, this.state.inputValue, () => {
                this.setState({loading: false});
                this.props.history.push(`/gallery/view/${this.props.match.params.galleryId}`);
            });
        }
    }


    render() {

        let loading = "";
        let showTakenPic = this.state.takenPic !== '' ? 
            (
                <div>
                    <img alt="Your pic." width="100%" height="100%" src={this.state.takenPic}></img><br />
                    <Button color="danger" style={{marginTop: "5px"}} onClick={this.deletePic}><FaTrash /> Delete pic</Button> 
                </div>
            ) : <img alt="Your pic." width="100%" height="192" src={placeholderPic}></img>;

        if(this.state.loading) {
            loading = <div className="overlay"><img alt="Loading..." height="150" width="150" className="loading-icon" src={loadingIcon}></img></div>;
        }

        return(
            <Container>
                { loading }
                <ModalDialog title="Error" body="Fill all fields and take a pic to confirm." modalToggle={() => this.setState({ modalIsOpen: false })} isOpen={this.state.modalIsOpen}/>
                <Row>
                    <Col>
                        <p><font size="6">Add a face</font></p>
                    </Col>
                </Row>
                <Row>
                    <Col lg="4">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/gallery">Galleries</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to={`/gallery/view/${this.props.match.params.galleryId}`}>{this.props.match.params.galleryId}</Link></BreadcrumbItem>
                            <BreadcrumbItem active>Add a face</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row> 
                <br />
                <Row>
                    <Col>
                    <Label for="username">Name</Label>
                    <Input type="text" value={this.state.inputValue} onChange={this.inputChange} name="text" id="username" placeholder="Insert your name..." />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                    <Label for="username">Gallery</Label>
                    <Input type="text" name="text" id="username" value={this.props.match.params.galleryId} disabled/>
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
                        <Button color="danger" onClick={() => {this.props.history.push(`/gallery/view/${this.props.match.params.galleryId}`)}}> <FaClose /> Cancel</Button>{'  '}
                        <Button color="success" onClick={this.confirm}><FaCheck /> Register face</Button>
                        <br /><br />
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default connect(null, { addFaceToGallery })(AddFace);