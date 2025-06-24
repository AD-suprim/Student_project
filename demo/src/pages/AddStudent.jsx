import StudentForm from '../components/StudentForm';
import { useNavigate, useLocation } from 'react-router-dom';

function AddStudent() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingStudent = location.state?.student || null;

  const handleStudentAdded = () => {
    // ✅ CHANGED: Navigate with success message
    navigate('/', { 
      state: { 
        successMessage: existingStudent 
          ? 'Student updated successfully!' 
          : 'Student added successfully!' 
      } 
    });
  };

  return (
    <div className="p-8 ">	
      <h2 className="text-xl font-bold mb-4 text-center">
        {existingStudent ? 'Update Student' : 'Add New Student'}
      </h2>

      <StudentForm
        existingStudent={existingStudent}
        onStudentAdded={handleStudentAdded}
      />
    </div>
  );
}

export default AddStudent;
