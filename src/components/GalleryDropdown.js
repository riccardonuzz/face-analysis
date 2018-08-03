import React, { Component } from 'react';
import { Input } from 'reactstrap';

class GalleryList extends Component {    
    componentDidUpdate() {
        if(this.props.initialValue==='' && this.props.galleries.gallery_ids)
            this.props.setInitialValue(this.props.galleries.gallery_ids[0]);
    }

    fetchGalleries() {
        if(this.props.galleries.gallery_ids) {
            return this.props.galleries.gallery_ids.map((gallery, index) =>{
                return <option key={index}>{gallery}</option>
            });
        }
        return '';
    }

    render() {
        return (
            <div>
                <Input disabled={this.props.disabled} type="select" value={this.props.initialValue} onChange={this.props.handleChange} name="select" id="exampleSelect">
                    {this.fetchGalleries()}
                </Input>
            </div>
        );
    }
}

export default GalleryList;