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
  }).catch((error) => reject(error));
});

const getAllPublicPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="private"&equalTo=false`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const createPin = (object) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/pins.json`, object).then((response) => {
    axios.patch(`${baseUrl}/pins/${response.data.name}.json`, { firebaseKey: response.data.name }).then(resolve);
  }).catch((error) => reject(error));
});

const updatePin = (object) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/pins/${object.firebaseKey}.json`, object).then(resolve).catch((error) => reject(error));
});

const deletePin = (firebaseKey) => axios.delete(`${baseUrl}/pins/${firebaseKey}.json`);

export default {
  getBoardPins,
  getPin,
  getAllUserPins,
  getAllPublicPins,
  createPin,
  updatePin,
  deletePin,
};
