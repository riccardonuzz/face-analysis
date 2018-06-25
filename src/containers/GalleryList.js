import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGalleries, deleteGallery } from '../actions';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './../style/GalleryListStyle.css';
import {FaTrash} from 'react-icons/lib/fa';

class GalleryList extends Component {    
    componentDidMount() {
        this.props.fetchGalleries();
    }

    deleteGallery(galleryId) {
        this.props.deleteGallery(galleryId, this.props.fetchGalleries);
    }

    fetchGalleries() {
        let list = '';

        if(this.props.galleries.gallery_ids) {
             list = this.props.galleries.gallery_ids.map((gallery, index) =>{
                return <ListGroupItem key={index}>{index+1} <Link to={`/gallery/view/${gallery}`}>{gallery}</Link><Button onClick={() => {this.deleteGallery(gallery)}} size="sm" className="float-right" color="danger"><FaTrash /> Delete gallery</Button>
                </ListGroupItem>
            });
        }
       
        return <ListGroup>{list}</ListGroup>;
    }

    render() {
        return (
            <div className="gallery-list">
                {this.fetchGalleries()}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps){
    return {
        galleries: state.galleries
    };
}

export default connect(mapStateToProps, { fetchGalleries, deleteGallery })(GalleryList);