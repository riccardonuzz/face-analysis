import React from 'react';
import ReactDOM from 'react-dom';

//Redux stuff
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './style/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './components/App';
import Gallery from './components/Gallery';
import Nav from './components/Nav';
import GalleryDetail from './components/GalleryDetail';
import AddFace from './containers/AddFace';
import AddGallery from './containers/AddGallery';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Nav />
                <Switch>
                    <Route path="/gallery/view/:galleryId/add" component={AddFace} />
                    <Route path="/gallery/view/:galleryId" component={GalleryDetail} />
                    <Route path="/gallery/add" component={AddGallery} />
                    <Route path="/gallery" component={Gallery} />
                    <Route path="/" component={App} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));
