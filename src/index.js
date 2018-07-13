import React from 'react';
import ReactDOM from 'react-dom';

//Redux stuff
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';

import { 
    BrowserRouter,
    Route,
    Switch 
} from 'react-router-dom';

import './style/index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Nav from './components/Nav';
import Home from './containers/Home';
import Galleries from './containers/Galleries';
import Faces from './containers/Faces';
import NewGallery from './containers/NewGallery';
import NewFace from './containers/NewFace';



const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <Nav />
                <Switch>
                    <Route path="/gallery/view/:galleryId/add" component={NewFace} />
                    <Route path="/gallery/view/:galleryId" component={Faces} />
                    <Route path="/galleries/add" component={NewGallery} />
                    <Route path="/galleries" component={Galleries} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));
