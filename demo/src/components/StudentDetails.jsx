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
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600 text-sm">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-700 text-sm">No student data available</p>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      {/* Header with avatar and name */}
      <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-gray-100">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-lg font-bold text-blue-600">
            {student.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-gray-800 truncate">{student.name}</h3>
          <p className="text-sm text-gray-500">Student Details</p>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;