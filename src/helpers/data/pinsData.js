import axios from 'axios';

const baseUrl = 'https://pinterest-4db91.firebaseio.com';

const getBoardPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins-boards.json?orderBy="boardId"&equalTo="${boardId}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getPin = (pinId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins/${pinId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const getAllUserPins = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="userId"&equalTo="${userId}"`).then((response) => {
    resolve(Object.values(response.data));
  });
});

export default { getBoardPins, getPin, getAllUserPins };
