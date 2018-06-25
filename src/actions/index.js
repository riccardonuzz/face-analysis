import axios from 'axios';

export const FETCH_FACE_INFORMATIONS = 'fetch_face_informations';
export const FETCH_GALLERIES = 'fetch_galleries';
export const FETCH_FACES = 'fetch_faces';
export const FETCH_FACE_RECOGNITION = 'fetch_face_recognition';
export const ADD_FACE_TO_GALLERY = 'add_face_to_gallery';
export const DELETE_FACE = 'remove_face';
export const DELETE_GALLERY = 'delete_gallery';

const APP_ID = 'APP_ID';
const API_KEY = 'APP_KEY';
const CALLBACK_URL = 'http://192.168.137.3/?Led=1'; //just an example callback
const ROOT_URL = 'https://api.kairos.com/';

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