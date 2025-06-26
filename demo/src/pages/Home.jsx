import React, { useState } from 'react';
import StudentList from '../components/StudentList';
import StudentDetails from '../components/StudentDetails';

function Home() {
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-left text-2xl ml-50 font-bold mb-6"></h1>
      <p className="text-left ml-45 mb-2 font-bold text-green-700">
        Select a student from the list to view their details.
      </p>

      <div className="grid grid-cols-2 gap-8">
        <StudentList 
          onSelectStudent={setSelectedStudentId} 
          selectedStudentId={selectedStudentId}
          StudentDetailsComponent={StudentDetails}
        />
        <div>
          {selectedStudentId && (
            <StudentDetails studentId={selectedStudentId} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;