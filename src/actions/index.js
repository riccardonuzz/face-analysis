import axios from 'axios';
import {
  FETCH_FACE_INFORMATIONS,
  FETCH_FACES,
  FETCH_GALLERIES,
  FETCH_FACE_RECOGNITION,
  ADD_FACE_TO_GALLERY,
  DELETE_FACE,
  DELETE_GALLERY,
  API_KEY,
  APP_ID,
  ROOT_URL,
  CALLBACK_URL,
} from '../constants';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'app_id': APP_ID,
    'app_key': API_KEY
  }
};

export function fetchFaceInformations(faceImage) {
  
     // Send a POST request
     const request = axios.post(`${ROOT_URL}detect`, {
        image: faceImage,
        selector: "ROLL"
      }, config);

      return {
          type: FETCH_FACE_INFORMATIONS,
          payload: request
      };
}

export function fetchFaceRecognition(faceImage, galleryName, callback) {

    // Send a POST request
    axios.post(`${ROOT_URL}recognize`, {
      image: faceImage,
      gallery_name: galleryName
    }, config)
    .then((response) => {
        console.log(response.data);
        if(response.data.images) {
          if(response.data.images[0].candidates) {
            if(parseFloat(response.data.images[0].candidates[0].confidence) > parseFloat(0.75)) {
              axios.get(CALLBACK_URL).then(() => {
                callback(`ACCESSO CONSENTITO. Compatibilità del ${response.data.images[0].candidates[0].confidence}%.`);
              })
              .catch(() => {
                callback(`IMPOSSIBILE CONTATTARE IL SERVER.`);
              });
            }
            else
              callback('ACCESSO NEGATO.');
          }
          else
            callback('ACCESSO NEGATO.');
        }
        else
          callback('ACCESSO NEGATO.');

    });

    return {
        type: FETCH_FACE_RECOGNITION,
        payload: null,
        loading: true
    };
}

export function addFaceToGallery(faceImage, galleryId, subjectId, callback) {
  // Send a POST request
  axios.post(`${ROOT_URL}enroll`, {
    image: faceImage,
    gallery_name: galleryId,
    subject_id: subjectId
  }, config)
  .then(() => {
    callback();
  });

  return {
      type: ADD_FACE_TO_GALLERY,
      payload: null
  };
}

export function deleteFaceFromGallery(galleryId, subjectId, callback) {
    // Send a POST request
    axios.post(`${ROOT_URL}gallery/remove_subject`, {
      gallery_name: galleryId,
      subject_id: subjectId
    }, config)
    .then(() => {
      callback();
    });

    return {
        type: DELETE_FACE,
        payload: null
    };
}

export function deleteGallery(galleryId, callback) {
  // Send a POST request
  axios.post(`${ROOT_URL}gallery/remove`, {
    gallery_name: galleryId,
  }, config)
  .then(() => {
    callback();
  });

  return {
      type: DELETE_GALLERY,
      payload: null
  };
}

export function fetchGalleries() {
   // Send a POST request
   const request = axios.post(`${ROOT_URL}/gallery/list_all`, null, config);

   return {
      type: FETCH_GALLERIES,
      payload: request
   };
}

export function fetchFaces(galleryId) {
  // Send a POST request
  const request = axios.post(`${ROOT_URL}/gallery/view`, {
    gallery_name: galleryId
  }, config);

  return {
     type: FETCH_FACES,
     payload: request
  };
}