import React, { Component } from 'react';
import { Container, Row, Col, Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import GalleryList from './../containers/GalleryList';
import { FaImage } from 'react-icons/lib/fa';


class Gallery extends Component {

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
                            <Link to="/gallery/add"><Button color="primary"><FaImage /> Add gallery</Button></Link>
                            <GalleryList />
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Gallery;