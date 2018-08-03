import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
    Button,
    Breadcrumb,
    BreadcrumbItem
} from 'reactstrap';

import { connect } from 'react-redux';
import { addFaceToGallery } from '../actions';

import WebcamView from './../components/WebcamView';
import ModalDialog from './../components/Modal';
import { Link } from 'react-router-dom';
import {FaCamera, FaCheck, FaClose, FaTrash} from 'react-icons/lib/fa';

import placeholderPic from './../assets/placeholder_pic.jpg';


class NewGallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            takenPic: '',
            inputNameValue: '',
            inputGalleryValue: '',
            modalIsOpen: false,
            webcamRef: null
        }

        this.setWebcamRef = this.setWebcamRef.bind(this);
        this.capture = this.capture.bind(this);
    }

    setWebcamRef = (ref) => this.setState({ webcamRef: ref });
    
    capture = () => this.setState({ takenPic: this.state.webcamRef.getScreenshot()});

    deletePic = () => this.setState({ takenPic: '' });

    inputNameChange = e => this.setState({inputNameValue: e.target.value});

    inputGalleryChange = e => this.setState({inputGalleryValue: e.target.value});

    confirm = () => {
        if(this.state.takenPic==='' || this.state.inputNameValue==='' || this.state.inputGalleryValue==='') {
            this.setState({modalIsOpen: true});
            console.log('wrong');
        }
        else {
            this.props.addFaceToGallery(this.state.takenPic, this.state.inputGalleryValue, this.state.inputNameValue, () => {
                this.props.history.push('/galleries');
            });
        }
    }

    showTakenPic() {
        if(this.state.takenPic !== '') {
            return (
                <div>
                    <img alt="Your pic." width="100%" height="100%" src={this.state.takenPic}></img><br />
                    <Button color="danger" style={{marginTop: "5px"}} onClick={this.deletePic}><FaTrash /> Delete pic</Button> 
                </div>
            );
        }

        return <img alt="Your pic." width="100%" height="192" src={placeholderPic}></img>
    }


    render() {
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
                            <BreadcrumbItem><Link to="/galleries">Galleries</Link></BreadcrumbItem>
                            <BreadcrumbItem active>New gallery</BreadcrumbItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12} md={12} lg={6}>
                        <Row>
                            <Col>
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
                            <Col>
                                <p className="text-danger">In order to add a gallery you must also add a face to be saved in.</p>
                            </Col>
                        </Row>
                    </Col>
                    
                    <Col sm={12} md={12} lg={6}>
                        <Row>
                            <Col xs="12" md="6" lg="6">
                                <Label for="pic">Take a pic of your face</Label>
                                <WebcamView miniature={true} setWebcamRef={this.setWebcamRef}/>
                                <Button onClick={this.capture}><FaCamera /> Take a pic</Button>
                            </Col>
                            <Col xs="12" md="6" lg="6">
                                <Label for="takenPic">Your pic</Label>
                                <br />
                                { this.showTakenPic() }
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button color="danger" onClick={() => {this.props.history.push('/galleries')}}> <FaClose /> Cancel</Button>{'  '}
                        <Button color="success" onClick={this.confirm}><FaCheck /> Register gallery</Button>
                        <br /><br />
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default connect(null, { addFaceToGallery })(NewGallery);