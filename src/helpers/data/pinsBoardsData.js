import axios from 'axios';

const baseUrl = 'https://pinterest-4db91.firebaseio.com';

const addPinToBoard = (pinToBoardObject) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pins-boards.json`, pinToBoardObject).then((response) => {
    axios.patch(`${baseUrl}/pins-boards/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
  }).catch((error) => reject(error));
});

const deletePinFromBoard = (pinFirebaseKey) => (
  axios.get(`${baseUrl}/pins-boards.json?orderBy="pidId"&equalTo=${pinFirebaseKey}`).then((response) => {
    axios.delete(`${baseUrl}/pins-boards/${response.data.name}.json`);
  })
);

export default {
  addPinToBoard,
  deletePinFromBoard,
};
