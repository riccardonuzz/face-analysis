import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFaces, deleteFaceFromGallery } from '../actions';
import { Container, Row, Col, Button, Breadcrumb, BreadcrumbItem  } from 'reactstrap';
import { Link } from 'react-router-dom';
import FacesList from '../components/FacesList';
import {FaUserPlus} from 'react-icons/lib/fa';


class Faces extends Component {
    componentWillMount() {
        this.props.fetchFaces(this.props.match.params.galleryId);
    }

    render() {
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <p><font size="6">{this.props.match.params.galleryId}' faces</font></p>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="3">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
                                <BreadcrumbItem><Link to="/galleries">Galleries</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{this.props.match.params.galleryId}</BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <br />
                            <Link to={`/gallery/view/${this.props.match.params.galleryId}/add`}><Button color="primary"><FaUserPlus/> Add face</Button></Link>
                            <FacesList deleteFaceFromGallery={this.props.deleteFaceFromGallery} faces={this.props.faces} fetchFaces={this.props.fetchFaces} galleryId={this.props.match.params.galleryId}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        faces: state.face
    };
}


export default connect(mapStateToProps, { fetchFaces, deleteFaceFromGallery })(Faces);