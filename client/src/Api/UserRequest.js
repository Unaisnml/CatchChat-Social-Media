import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

export const getUserProfile = (userId, header) =>
  API.get(`/users/${userId}`, header);

export const getFriendList = (userId, header) =>
  API.get(`/users/${userId}/friends`, header);

export const updateUserProfile = (id, formData) =>
  API.put(`/user/${id}`, formData);

export const editUser = (currentUserId, values) =>
  API.put(`/users/edit-user/${currentUserId}`, values);

export const addRemoveFriends = (_id, friendId) =>
  API.patch(`/users/${_id}/${friendId}`);
