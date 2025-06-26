import { useEffect, useState, useRef } from 'react';
import { getAllStudents, deleteStudent } from '../services/StudentService';
import { useNavigate, useLocation } from 'react-router-dom';

function StudentList({ onSelectStudent, selectedStudentId, StudentDetailsComponent }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const studentRefs = useRef({});
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

  // Filter students based on search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (studentId) => {
    try {
      await deleteStudent(studentId);
      setStudents((prev) => prev.filter((s) => s.studentId !== studentId));
      if (selectedStudentId === studentId) {
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
      onSelectStudent(null);
    } else {
      onSelectStudent(studentId);
      // CHANGED: Scroll to center the selected student
      setTimeout(() => {
        const studentElement = studentRefs.current[studentId];
        if (studentElement) {
          studentElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
        }
      }, 100); // Small delay to ensure the selection state is updated
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    // Clear the selected student and hide details when clearing search
    onSelectStudent(null);
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
    <div className="w-[42rem] mx-auto mt-6 p-6 bg-white rounded-xl shadow-lg relative">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Student List</h2>

      {/* Search Section */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search students by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {searchTerm && (
          <p className="mt-2 text-sm text-gray-600">
            Found {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} matching "{searchTerm}"
          </p>
        )}
      </div>

      {successMessage && (
        <div className="fixed bottom-5 right-5 p-3 bg-green-500 border-l-4 border-green-500 rounded-lg shadow-lg z-50 animate-fade-in">
          <p className="text-white">{successMessage}</p>
        </div>
      )}

      {filteredStudents.length === 0 ? (
        <p className="text-gray-500 text-center">
          {searchTerm ? `No students found matching "${searchTerm}"` : 'No students found'}
        </p>
      ) : (
        <ul className="space-y-3">
          {filteredStudents.map((student) => (
            <div 
              key={student.studentId} 
              className="relative"
              ref={el => studentRefs.current[student.studentId] = el}
            >
              <li
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
              </li>
              
              {/* CHANGED: Positioned details in separate column aligned with selected student */}
              {selectedStudentId === student.studentId && StudentDetailsComponent && (
                <div 
                  className="absolute left-full ml-8 top-0 w-96 bg-white rounded-xl shadow-lg border border-gray-200 p-6 z-10"
                  style={{ minHeight: '200px' }}
                >
                  <div className="absolute -left-2 top-6 w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
                  <StudentDetailsComponent studentId={selectedStudentId} />
                </div>
              )}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;