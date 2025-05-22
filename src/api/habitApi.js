import axios from "axios";

const habitApi = axios.create({
  baseURL: "http://localhost:8080/habits", // явно указываем gateway
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Получить все привычки конкретного пользователя
habitApi.getAllHabits = () =>
  habitApi.get(`/`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    withCredentials: true,
  }).then((res) => res.data);

// Получить привычку по ID
habitApi.getHabit = (id) =>
  habitApi.get(`/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    withCredentials: true,
  }).then((res) => res.data);

// Создать привычку
habitApi.createHabit = (habitData) =>
  habitApi.post("/", habitData, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    withCredentials: true,
  }).then((res) => res.data);

// Обновить привычку
habitApi.updateHabit = (id, habitData) =>
  habitApi.patch(`/${id}`, habitData, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    withCredentials: true,
  }).then((res) => res.data);

// Удалить привычку
habitApi.deleteHabit = (id) =>
  habitApi.delete(`/${id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
    withCredentials: true,
  }).then((res) => res.data);

export default habitApi;