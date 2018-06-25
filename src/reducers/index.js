import { combineReducers } from 'redux';
import FaceReducer from './reducer_face';
import GalleriesReducer from './reducer_galleries';

const rootReducer = combineReducers({
    face: FaceReducer,
    galleries: GalleriesReducer
});

export default rootReducer;