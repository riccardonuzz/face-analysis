import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.modalToggle();
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
          <ModalBody>
            {this.props.body}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>ok</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalDialog;