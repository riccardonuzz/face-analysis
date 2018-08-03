import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFaceRecognition, fetchGalleries } from '../actions';
import {Container, Row, Col, Button} from 'reactstrap';
import WebcamView from './../components/WebcamView';
import GalleryDropdown from '../components/GalleryDropdown';

import ModalDialog from './../components/Modal';
import loadingIcon from './../assets/loading-icon.gif';

//icons
import {FaCamera} from 'react-icons/lib/fa';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownSelectedValue: '',
      modalIsOpen: false,
      compatibility: "",
      loading: false,
      webcamRef: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.setInitialValue = this.setInitialValue.bind(this);
    this.setWebcamRef = this.setWebcamRef.bind(this);
  }

  componentDidMount() {
    this.props.fetchGalleries();
  }

  setWebcamRef(ref) {
    this.setState({ webcamRef: ref});
  }

  handleChange(e) {
    this.setState({ dropdownSelectedValue: e.target.value });
  }

  setInitialValue(value) {
      this.setState({ dropdownSelectedValue: value });
  }

  capture = () => {
    this.setState({loading: true});
    this.props.fetchFaceRecognition(this.state.webcamRef.getScreenshot(), this.state.dropdownSelectedValue, this.showResults);
  };

  showResults = (value) => {
    this.setState({modalIsOpen: true, compatibility: value, loading: false});
  }

  renderModal() {
    if(this.state.loading) {
        return (
          <div className="overlay">
            <img alt="Loading..." height="150" width="150" className="loading-icon" src={loadingIcon}></img>
          </div>
      );
    }

    return (
      <ModalDialog title="Risultato" body={this.state.compatibility} modalToggle={() => this.setState({ modalIsOpen: false })} isOpen={this.state.modalIsOpen}/>
    );
  }


  render() {
    console.log("STATE: ", this.state.dropdownSelectedValue);
    return (
      <div className="App">
        <Container>
          {this.renderModal()}
          <Row>
            <Col md="12">
              <br />
              <WebcamView setWebcamRef={this.setWebcamRef}/>
              <br />
            </Col>
          </Row>
          <Row>
              <Col xs="6" sm="6" md="6">
                  <Button className="float-right" onClick={this.capture}><FaCamera /> Recognize</Button>
              </Col>
              <Col xs="6" sm="6" md="2">
                  <GalleryDropdown className="float-left" initialValue={this.state.dropdownSelectedValue} setInitialValue={this.setInitialValue} handleChange={this.handleChange} disabled={false} galleries={this.props.galleries}/>
              </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
      face: state.face,
      galleries: state.galleries
  };
}

export default connect(mapStateToProps, {fetchFaceRecognition, fetchGalleries})(Home);
