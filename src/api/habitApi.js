import axios from "axios";

const habitApi = axios.create({
  baseURL: "http://localhost:8080/habits", // явно указываем gateway
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Получить все привычки конкретного пользователя
habitApi.getAllHabits = (personId) =>
  habitApi.get(`/?personId=${personId}`).then((res) => res.data);

// Получить одну привычку по ID
habitApi.getHabit = (id) =>
  habitApi.get(`/${id}`).then((res) => res.data);

// Создать привычку
habitApi.createHabit = (habitData) =>
  habitApi.post("/", habitData).then((res) => res.data);

// Обновить привычку
habitApi.updateHabit = (id, habitData) =>
  habitApi.patch(`/${id}`, habitData).then((res) => res.data);

// Удалить привычку
habitApi.deleteHabit = (id) =>
  habitApi.delete(`/${id}`).then((res) => res.data);

export default habitApi;