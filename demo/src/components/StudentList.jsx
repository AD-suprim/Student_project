import { useEffect, useState } from 'react';
import { getAllStudents, deleteStudent } from '../services/StudentService';
import { useNavigate, useLocation } from 'react-router-dom';

function StudentList({ onSelectStudent }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      setTimeout(() => {
        setSuccessMessage(null);
        navigate('.', { state: {}, replace: true });
      }, 5000);
    }
  }, [location.state, navigate]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (studentId) => {
    try {
      await deleteStudent(studentId);
      setStudents((prev) => prev.filter((s) => s.studentId !== studentId));
      if (selectedStudentId === studentId) {
        setSelectedStudentId(null);
        onSelectStudent(null);
      }
      setSuccessMessage('Student deleted successfully!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleUpdate = (student) => {
    navigate('/add', { state: { student } });
  };

  const handleSelectStudent = (studentId) => {
    if (selectedStudentId === studentId) {
      setSelectedStudentId(null);
      onSelectStudent(null);
    } else {
      setSelectedStudentId(studentId);
      onSelectStudent(studentId);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading students...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm">
        <p className="text-red-700">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-[42rem] mx-auto mt-6 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Student List</h2>

      {successMessage && (
        <div className="fixed bottom-5 right-5 p-3 bg-green-500 border-l-4 border-green-500 rounded-lg shadow-lg z-50 animate-fade-in">
          <p className="text-white">{successMessage}</p>
        </div>
      )}

      {students.length === 0 ? (
        <p className="text-gray-500 text-center">No students found</p>
      ) : (
        <ul className="space-y-3">
          {students.map((student) => (
            <li
              key={student.studentId}
              className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-200 ${
                selectedStudentId === student.studentId
                  ? 'bg-blue-50 border-blue-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <button
                onClick={() => handleSelectStudent(student.studentId)}
                className="text-left flex-1 text-gray-800 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                {student.name}
              </button>

              {/* START OF UPDATED CODE */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(student.studentId)}
                  className="px-4 py-1 bg-red-500 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleUpdate(student)}
                  className="px-4 py-1 bg-blue-500 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                >
                  Update
                </button>
              </div>
              {/* END OF UPDATED CODE */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;