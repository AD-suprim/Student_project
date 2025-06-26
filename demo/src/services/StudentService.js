const BASE_URL = 'http://localhost:9091/api/students';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Request failed');
  }
  return response.json();
};

export const getAllStudents = async () => {
  const response = await fetch(BASE_URL);
  return handleResponse(response);
};

export const getStudentById = async (studentId) => {
  const response = await fetch(`${BASE_URL}/${studentId}`);
  const result = await response.json();

  if (response.ok) {
    return result.data; 
  } else {
    throw new Error(result.message || "Failed to fetch student details");
  }
};


export const addStudent = async (student) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
  return handleResponse(response);
};

export const deleteStudent = async (studentId) => { 
  const response = await fetch(`${BASE_URL}/${studentId}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export const updateStudent = async (id, student) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
  return handleResponse(response);
};