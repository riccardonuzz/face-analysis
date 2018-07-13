import {
    FETCH_FACE_INFORMATIONS,
    FETCH_FACES,
    FETCH_FACE_RECOGNITION,
    ADD_FACE_TO_GALLERY,
    DELETE_FACE
} from '../constants';

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_FACE_INFORMATIONS:
            //console.log(action);
            return action.payload;
            
        case FETCH_FACES:
            return action.payload.data;

        case FETCH_FACE_RECOGNITION:
            return action.payload;

        case ADD_FACE_TO_GALLERY:
            return state;

        case DELETE_FACE:
            return state;
        
        default:
            return state;
    }
}