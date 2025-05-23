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
  habitApi.get(`/`, {
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
  habitApi.post("/", habitData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  }).then((res) => res.data);

// Обновить привычку
habitApi.updateHabit = (id, habitData, token) =>
  habitApi.patch(`/${id}`, habitData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  }).then((res) => res.data);

// Удалить привычку
habitApi.deleteHabit = (id, token) =>
  habitApi.delete(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  }).then((res) => res.data);

export default habitApi;