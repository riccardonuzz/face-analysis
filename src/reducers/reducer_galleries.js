import { 
    FETCH_GALLERIES,
    DELETE_GALLERY
} from '../constants';

export default (state = {}, action) => {
    switch(action.type) {
        case FETCH_GALLERIES:
            //console.log(action);
            return action.payload.data;

        case DELETE_GALLERY:
            return state;

        default:
            return state;
    }
}