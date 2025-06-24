// import React, { useEffect, useState } from 'react';
// import { getStudentById } from '../services/StudentService';

// function StudentDetails({ studentId }) {
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     if (!studentId) return;
//     getStudentById(studentId)
//       .then(setStudent)
//       .catch(err => {
//         console.error('Error loading student details:', err);
//         setStudent(null);
//       });
//   }, [studentId]);

//   if (!student) return <div>Loading student details...</div>;

//   return (
//     <div className="p-4 border rounded shadow">
//       <h3 className="text-lg font-semibold mb-2">{student.name}</h3>
//       <p><strong>Age:</strong> {student.age}</p>
//       <p><strong>Email:</strong> {student.email}</p>
//       <p><strong>StudentId:</strong> {student.studentId}</p>
//       <p><strong>PhoneNumber:</strong> {student.phoneNumber}</p>
//       {/* Add more details as needed */}
//     </div>
//   );
// }

// export default StudentDetails;

import React, { useEffect, useState } from 'react';
import { getStudentById } from '../services/StudentService';

function StudentDetails({ studentId }) {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!studentId) {
      setError('No student ID provided');
      return;
    }

    setIsLoading(true);
    getStudentById(studentId)
      .then(data => {
        setStudent(data);
        setError(null);
      })
      .catch(err => {
        console.error('Error loading student details:', err);
        setError('Failed to load student details');
        setStudent(null);
      })
      .finally(() => setIsLoading(false));
  }, [studentId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading student details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-4 bg-gray-50 border-l-4 border-gray-500 rounded-lg shadow-sm">
        <p className="text-gray-700">No student data available</p>
      </div>
    );
  }

  return (
    <div className="w-[27rem] h-[16rem] mt-10 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-xl font-bold text-blue-600">
            {student.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 font-medium">Age:</span>
          <span className="text-gray-800">{student.age}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 font-medium">Email:</span>
          <span className="text-gray-800">{student.email}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 font-medium">Student ID:</span>
          <span className="text-gray-800">{student.studentId}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500 font-medium">Phone:</span>
          <span className="text-gray-800">{student.phoneNumber}</span>
        </div>
      </div>
      <div className="mt-4">
      </div>
    </div>
  );
}

export default StudentDetails;
