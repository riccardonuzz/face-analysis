import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchGalleries, deleteGallery } from '../actions';

import { Container, Row, Col, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import GalleryList from './../components/GalleryList';
import { FaImage } from 'react-icons/lib/fa';


class Galleries extends Component {
    constructor() {
        super();
        this.deleteGallery = this.deleteGallery.bind(this);
    }

    componentDidMount() {
        this.props.fetchGalleries();
    }

    deleteGallery(galleryId) {
        this.props.deleteGallery(galleryId, this.props.fetchGalleries);
    }

    render() {
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <p><font size="6">Galleries</font></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="2">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                                <BreadcrumbItem active>Galleries</BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <br />
                            <Link to="/galleries/add"><Button color="primary"><FaImage /> Add gallery</Button></Link>
                            <GalleryList galleries={this.props.galleries} deleteGallery={this.deleteGallery}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        galleries: state.galleries
    };
}

export default connect(mapStateToProps, { fetchGalleries, deleteGallery })(Galleries);