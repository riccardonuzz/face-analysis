import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { FaTrash } from 'react-icons/lib/fa';
import loadingIcon from './../assets/loading-icon.gif';


class FacesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }


    deleteFace(subject_id) {
        this.setState({ loading: true });
        this.props.deleteFaceFromGallery(this.props.galleryId, subject_id, () => {
            this.props.fetchFaces(this.props.galleryId);
            this.setState({ loading: false });
        });
    }


    fetchFaces() {
        console.log("FACES: ",this.props.faces);

        if(this.state.loading) {
            return <div className="overlay"><img alt="Loading..." height="150" width="150" className="loading-icon" src={loadingIcon}></img></div>;
        }

        let list = '';
        if(this.props.faces) {
            if(this.props.faces.subject_ids) {
                list = this.props.faces.subject_ids.map((subject, index) => {
                    return <ListGroupItem key={index}>{index+1} {subject} <Button onClick={() => this.deleteFace(subject)} size="sm" className="float-right" color="danger"><FaTrash /> Delete face</Button></ListGroupItem>
                });
            }
        }
        return <ListGroup>{list}</ListGroup>;


           
    }

    render() {
        return (
            <div className="gallery-list">
                {this.fetchFaces()}
            </div>
        );
    }
}


export default FacesList;