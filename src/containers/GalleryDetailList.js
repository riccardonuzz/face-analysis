import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFaces, deleteFaceFromGallery } from '../actions';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { FaTrash } from 'react-icons/lib/fa';
import loadingIcon from './../assets/loading-icon.gif';



class GalleryDetailList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        }
    }

    componentWillMount() {
        // if(!this.props.faces)
        //     this.props.fetchFaces(this.props.galleryId);
        // else if(this.props.faces)
        //     if(!this.props.faces.subject_ids)
                this.props.fetchFaces(this.props.galleryId);
    }

    deleteFace(subject_id) {
        this.setState({loading: true});
        this.props.deleteFaceFromGallery(this.props.galleryId, subject_id, () => {
            this.props.fetchFaces(this.props.galleryId);
            this.setState({loading: false});
        });
    }


    fetchFaces() {
        console.log("FACES: ",this.props.faces);
        let list = 'Loading...';

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
        let loading = "";
        if(this.state.loading) {
            loading = <div className="overlay"><img alt="Loading..." height="150" width="150" className="loading-icon" src={loadingIcon}></img></div>;
        }
        return (
            <div className="gallery-list">
                {loading}
                {this.fetchFaces()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        faces: state.face
    };
}

export default connect(mapStateToProps, { fetchFaces, deleteFaceFromGallery })(GalleryDetailList);