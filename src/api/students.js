import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export function fetchStudents() {
  return api.get('/students');
}

export function addStudent(student) {
  return api.post('/students', student);
}

export function updateStudent(student) {
  return api.put(`/students/${student.id}`, student);
}

export function deleteStudent(id) {
  return api.delete(`/students/${id}`);
}