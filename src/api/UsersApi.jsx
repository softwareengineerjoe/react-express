// api.js
const API_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000'; // Add your base URL in the .env file

// Helper function to make API requests
const apiRequest = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong!');
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// User Authentication API
export const signup = (username, password) => apiRequest('/signup', 'POST', { username, password });
export const login = (username, password) => apiRequest('/login', 'POST', { username, password });

// Fetch current user details (logged-in user)
export const getCurrentUser = (token) => apiRequest('/me', 'GET', null, token);

// Task CRUD API
export const getTasks = (token) => apiRequest('/tasks', 'GET', null, token);
export const getTaskById = (id, token) => apiRequest(`/tasks/${id}`, 'GET', null, token);
export const createTask = (task, token) => apiRequest('/tasks', 'POST', task, token);
export const updateTask = (id, updatedTask, token) => apiRequest(`/tasks/${id}`, 'PUT', updatedTask, token);
export const deleteTask = (id, token) => apiRequest(`/tasks/${id}`, 'DELETE', null, token);
