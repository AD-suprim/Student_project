
import React, { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function StudentForm({ existingStudent = null, onStudentAdded }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [stuPassword, setStuPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (existingStudent) {
      setName(existingStudent.name || '');
      setAge(existingStudent.age?.toString() || '');
      setEmail(existingStudent.email || '');
      setStudentId(existingStudent.studentId?.toString() || '');
      setPhoneNumber(existingStudent.phoneNumber || '');
      // Password should not be prefilled for security
      setStuPassword('');
    }
  }, [existingStudent]);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^\d{10}$/;

  const isEditMode = !!existingStudent;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage(null);
    setIsLoading(true);

    // Validation (same as before)
    if (!name.trim()) {
      setErrorMessage('Name is required');
      setIsLoading(false);
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }
    if (!phoneRegex.test(phoneNumber.trim())) {
      setErrorMessage('Phone number must be exactly 10 digits');
      setIsLoading(false);
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }
    if (!Number.isInteger(Number(age)) || age < 16 || age > 100) {
      setErrorMessage('Age must be an integer between 16 and 100');
      setIsLoading(false);
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address');
      setIsLoading(false);
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }
    if (!Number.isInteger(Number(studentId)) || Number(studentId) <= 0) {
      setErrorMessage('Student ID must be a positive integer');
      setIsLoading(false);
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }
    if (stuPassword.trim().length < 6 && !isEditMode) {
      // For edit mode, maybe password is optional? Adjust logic as you want.
      setErrorMessage('Password must be at least 6 characters');
      setIsLoading(false);
      setTimeout(() => setErrorMessage(null), 5000);
      return;
    }

    const payload = {
      name: name.trim(),
      age: Number(age),
      email: email.trim(),
      studentId: Number(studentId),
      stuPassword: stuPassword.trim(),
      phoneNumber: phoneNumber.trim(),
    };

    // If editing, you might want to call a PUT endpoint, otherwise POST
    const url = isEditMode ? `/api/students/${studentId}` : '/api/students';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const result = await res.json();
        setErrorMessage(result.message || `Error ${res.status}: Something went wrong`);
        setIsLoading(false);
        setTimeout(() => setErrorMessage(null), 5000);
        return;
      }

      const result = await res.json();

      if (result.status === 'ERROR') {
        setErrorMessage(result.message || 'Something went wrong');
        setIsLoading(false);
        setTimeout(() => setErrorMessage(null), 5000);
        return;
      }

      setSuccessMessage(result.message || (isEditMode ? 'Student updated successfully!' : 'Student added successfully!'));
      setIsLoading(false);

      // Clear form only if adding new
      if (!isEditMode) {
        setName('');
        setAge('');
        setEmail('');
        setStudentId('');
        setStuPassword('');
        setPhoneNumber('');
        setShowPassword(false);
      }

      // Notify parent component (AddStudent) about success
      if (onStudentAdded) onStudentAdded();

      setTimeout(() => setSuccessMessage(''), 6000);
    } catch (err) {
      setErrorMessage(`Failed to connect to server: ${err.message}`);
      setIsLoading(false);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const renderInput = (label, type, value, onChange, errorCondition, errorText, extraProps = {}) => (
    <div className="flex flex-col ">
      <label className="block mb-1 text-gray-700">{label}:</label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          disabled={isLoading}
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 pr-10"
          {...extraProps}
        />
        {label === 'Password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            disabled={isLoading}
          >
            {showPassword ? (
              <EyeSlashIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {errorCondition && (
        <p className="text-red-500 text-sm mt-1">{errorText}</p>
      )}
    </div>
  );

  return (
    <div className="relative max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} action="javascript:void(0)" className="space-y-4">
        {renderInput(
          'Name',
          'text',
          name,
          setName,
          name && !name.trim(),
          'Name is required'
        )}
        {renderInput(
          'Phone Number',
          'text',
          phoneNumber,
          setPhoneNumber,
          phoneNumber && !phoneRegex.test(phoneNumber.trim()),
          'Phone number must be exactly 10 digits'
        )}
        {renderInput(
          'Age',
          'number',
          age,
          setAge,
          age && (!Number.isInteger(Number(age)) || age < 16 || age > 100),
          'Age must be between 16 and 100'
        )}
        {renderInput(
          'Email',
          'email',
          email,
          setEmail,
          email && !emailRegex.test(email.trim()),
          'Please enter a valid email address'
        )}
        {renderInput(
          'Student ID',
          'number',
          studentId,
          setStudentId,
          studentId && (!Number.isInteger(Number(studentId)) || Number(studentId) <= 0),
          'Student ID must be a positive integer'
        )}
        {renderInput(
          'Password',
          showPassword ? 'text' : 'password',
          stuPassword,
          setStuPassword,
          !isEditMode && stuPassword && stuPassword.trim().length < 6,
          'Password must be at least 6 characters',
          { autoComplete: 'new-password' }
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : null}
          {isLoading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Student' : 'Add Student')}
        </button>
      </form>

      {successMessage && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white text-base px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="fixed bottom-5 right-5 bg-red-500 text-white text-base px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default StudentForm;

