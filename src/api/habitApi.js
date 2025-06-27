import axios from "axios";

const habitApi = axios.create({
  baseURL: "http://localhost:8080/habits", // явно указываем gateway
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Получить все привычки конкретного пользователя
habitApi.getAllHabits = (token) =>
  habitApi.get(`/all-habits`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  }).then((res) => res.data);

// Получить привычку по ID
habitApi.getHabit = (id, token) =>
  habitApi.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  }).then((res) => res.data);

// Создать привычку
habitApi.createHabit = (habitData, token) =>
  habitApi.post(`/create-habit`, habitData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  }).then((res) => res.data);

// Обновить привычку
habitApi.updateHabit = (id, habitData, token) =>
  habitApi.patch(`update/${id}`, habitData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  }).then((res) => res.data);

// Удалить привычку
habitApi.deleteHabit = (id, token) =>
  habitApi.delete(`delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  }).then((res) => res.data);

export default habitApi;