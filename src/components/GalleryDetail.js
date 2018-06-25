import React, { Component } from 'react';
import { Container, Row, Col, Button, Breadcrumb, BreadcrumbItem  } from 'reactstrap';
import { Link } from 'react-router-dom';
import GalleryDetailList from '../containers/GalleryDetailList';
import {FaUserPlus} from 'react-icons/lib/fa';


class GalleryDetail extends Component {

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
                                <BreadcrumbItem><Link to="/gallery">Galleries</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{this.props.match.params.galleryId}</BreadcrumbItem>
                            </Breadcrumb>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <br />
                            <Link to={`/gallery/view/${this.props.match.params.galleryId}/add`}><Button color="primary"><FaUserPlus/> Add face</Button></Link>
                            <GalleryDetailList galleryId={this.props.match.params.galleryId}/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default GalleryDetail;