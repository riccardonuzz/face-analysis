import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './../style/GalleryListStyle.css';
import {FaTrash} from 'react-icons/lib/fa';

class GalleryList extends Component {
    fetchGalleries() {
        console.log(this.props);
        if(this.props.galleries.gallery_ids) {
             return this.props.galleries.gallery_ids.map((gallery, index) => {
                return <ListGroupItem key={index}>{index+1} <Link to={`/gallery/view/${gallery}`}>{gallery}</Link><Button onClick={() => {this.props.deleteGallery(gallery)}} size="sm" className="float-right" color="danger"><FaTrash /> Delete gallery</Button>
                </ListGroupItem>
            });
        }
        return 'Loading...';
    }

    render() {
        return (
            <div className="gallery-list">
                <ListGroup>
                    {this.fetchGalleries()}
                </ListGroup> 
            </div>
        );
    }
}

export default GalleryList;