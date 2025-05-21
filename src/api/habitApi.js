import axios from "axios";

// Базовая настройка
const habitApi = axios.create({
    baseURL: "http://localhost:8080/habits",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

// Удобные методы для работы
habitApi.getHabit = (id) => habitApi.get(`/${id}`).then(res => res.data);
habitApi.getAllHabits = (personId) => habitApi.get(`/?personId=${personId}`).then(res => res.data);
habitApi.createHabit = (habit) => habitApi.post("/", habit).then(res => res.data);
habitApi.updateHabit = (id, habit) => habitApi.patch(`/${id}`, habit).then(res => res.data);
habitApi.deleteHabit = (id) => habitApi.delete(`/${id}`);

export default habitApi;