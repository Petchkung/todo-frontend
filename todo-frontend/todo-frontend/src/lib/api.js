import axios from 'axios';

const API_URL = "https://flask-todo-cicd-production-f351.up.railway.app/api";
console.log("DEBUG API_URL =", API_URL);


// ✅ แสดงผลตอน build และ runtime
console.log('[DEBUG] API_URL =', API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// ✅ Interceptor: handle error responses
api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const msg = error.response?.data?.error || error.message;
    console.error(`[API Error ${status || '???'}]: ${msg}`);
    return Promise.reject(error);
  }
);

// ✅ รวมทุกฟังก์ชันไว้ใน todoAPI object
export const todoAPI = {
  getTodos: async () => {
    try {
      const response = await api.get('/todos');
      return response.data;
    } catch (error) {
      console.error('[getTodos error]:', error.message);
      throw error;
    }
  },

  createTodo: async (todo) => {
    try {
      const response = await api.post('/todos', todo);
      return response.data;
    } catch (error) {
      console.error('[createTodo error]:', error.message);
      throw error;
    }
  },

  updateTodo: async (id, updates) => {
    try {
      const response = await api.put(`/todos/${id}`, updates);
      return response.data;
    } catch (error) {
      console.error('[updateTodo error]:', error.message);
      throw error;
    }
  },

  deleteTodo: async (id) => {
    try {
      const response = await api.delete(`/todos/${id}`);
      return response.data;
    } catch (error) {
      console.error('[deleteTodo error]:', error.message);
      throw error;
    }
  },

  healthCheck: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      console.error('[healthCheck error]:', error.message);
      throw error;
    }
  },
};

export default api;
