import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGalleries } from '../actions';
import { Input } from 'reactstrap';

class GalleryList extends Component {    

    componentDidMount() {
        this.props.fetchGalleries();
    }

    componentDidUpdate() {
        if(this.props.initialValue==='' && this.props.galleries.gallery_ids)
            this.props.setInitialValue(this.props.galleries.gallery_ids[0]);
    }

    fetchGalleries() {
        let list = '';
        if(this.props.galleries.gallery_ids) {
            list = this.props.galleries.gallery_ids.map((gallery, index) =>{
                return <option key={index}>{gallery}</option>
            });
        }
       
        return  <Input disabled={this.props.disabled} type="select" value={this.props.initialValue} onChange={this.props.handleChange} name="select" id="exampleSelect">{list}</Input>;
    }

    render() {
        return (
            <div>
                {this.fetchGalleries()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        galleries: state.galleries
    };
}

export default connect(mapStateToProps, { fetchGalleries })(GalleryList);