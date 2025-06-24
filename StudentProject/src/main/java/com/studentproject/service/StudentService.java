package com.studentproject.service;

import com.studentproject.dto.StudentDTO;
import com.studentproject.mapper.StudentMapper;
import com.studentproject.models.Student;


import com.studentproject.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final StudentMapper studentMapper;
    private final PasswordEncoder passwordEncoder;



    @Autowired
    public StudentService(StudentRepository studentRepository, StudentMapper studentMapper,PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.studentMapper = studentMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public StudentDTO createStudent(StudentDTO studentDTO) {
        if (studentDTO == null || studentDTO.getName() == null || studentDTO.getEmail() == null) {
            throw new IllegalArgumentException("Name and email are required");
        }

        Student student = studentMapper.fromDTO(studentDTO);
        String hashedPassword = passwordEncoder.encode(studentDTO.getStuPassword());// Converts a StudentDTO (Data Transfer Object) to a Student entity.
        student.setStuPassword(hashedPassword);
        Student savedStudent = studentRepository.save(student); // Saves the Student entity into the database using Spring Data JPA.  and auto gentrates INSERT INTO students (name, email) VALUES ('Supree', 'supree@example.com'); this tyupe of queries
        return studentMapper.toDTO(savedStudent); //Converts the saved Student entity (now complete with ID) back into a StudentDTO.
    }

    @Transactional(readOnly = true)
    public List<StudentDTO> getAllStudents() {
        List<Student> students = studentRepository.findAll(); //is a call to Spring Data JPA that retrieves all records of Student from the database.
        return studentMapper.toDTOList(students);
    }

    @Transactional(readOnly = true)
    public StudentDTO getStudentByStudentId(Long Studentid) {
        Optional<Student> optionalStudent = studentRepository.findByStudentId(Studentid);
        return optionalStudent.map(studentMapper::toDTO).orElse(null);
    }

    @Transactional
    public StudentDTO updateStudent(Long Studentid, StudentDTO studentDTO) {
        Optional<Student> optionalStudent = studentRepository.findByStudentId(Studentid); //Optional is a Java class that represents a value that might or might not be present.
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();

            // Update fields that are present in the DTO
            if (studentDTO.getName() != null) {
                student.setName(studentDTO.getName());
            }

            if (studentDTO.getEmail() != null) {
                student.setEmail(studentDTO.getEmail());
            }

            // Age is primitive int so no null check needed
            student.setAge(studentDTO.getAge());

            if (studentDTO.getProgramCourse() != null) {
                student.setProgramCourse(studentDTO.getProgramCourse());
            }

            // PhoneNumber is primitive long so no null check needed
//            student.setPhoneNumber(studentDTO.getPhoneNumber());
            if (studentDTO.getPhoneNumber() != null) {
                student.setPhoneNumber(studentDTO.getPhoneNumber());
            }

            if (studentDTO.getStuPassword() != null) {
                // In a real app, hash the password before saving
                student.setStuPassword(studentDTO.getStuPassword());
            }

            Student updatedStudent = studentRepository.save(student);
            return studentMapper.toDTO(updatedStudent);
        }
        return null;
    }
    public boolean studentIdExist(Long studentId) {
        return studentRepository.existsByStudentId(studentId);

    }

    @Transactional
    public boolean deleteStudent(Long Studentid) {
        if (studentRepository.existsByStudentId(Studentid)) {
            studentRepository.deleteByStudentId(Studentid);
            return true;
        }
        return false;
    }

}