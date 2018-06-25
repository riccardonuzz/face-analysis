import React, { Component } from 'react';
import {Container, Row, Col} from 'reactstrap';
import WebcamView from './../containers/WebcamView';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col md="12">
              <WebcamView />
              <br />
              <br />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
