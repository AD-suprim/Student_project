package com.studentproject.mapper;

import com.studentproject.dto.StudentDTO;
import com.studentproject.models.Student;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-23T11:16:37+0545",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 24.0.1 (Oracle Corporation)"
)
@Component
public class StudentMapperImpl implements StudentMapper {

    @Override
    public List<StudentDTO> toDtoList(List<Student> tList) {
        if ( tList == null ) {
            return null;
        }

        List<StudentDTO> list = new ArrayList<StudentDTO>( tList.size() );
        for ( Student student : tList ) {
            list.add( studentToStudentDTO( student ) );
        }

        return list;
    }

    @Override
    public StudentDTO toDTO(Student student) {
        if ( student == null ) {
            return null;
        }

        StudentDTO studentDTO = new StudentDTO();

        studentDTO.setName( student.getName() );
        studentDTO.setEmail( student.getEmail() );
        studentDTO.setProgramCourse( student.getProgramCourse() );
        studentDTO.setStuPassword( student.getStuPassword() );
        if ( student.getAge() != null ) {
            studentDTO.setAge( student.getAge() );
        }
        studentDTO.setRollNumber( student.getRollNumber() );
        studentDTO.setPhoneNumber( student.getPhoneNumber() );
        studentDTO.setStudentId( student.getStudentId() );

        return studentDTO;
    }

    @Override
    public Student fromDTO(StudentDTO studentDTO) {
        if ( studentDTO == null ) {
            return null;
        }

        Student student = new Student();

        student.setName( studentDTO.getName() );
        student.setAge( studentDTO.getAge() );
        student.setEmail( studentDTO.getEmail() );
        student.setStudentId( studentDTO.getStudentId() );
        student.setPhoneNumber( studentDTO.getPhoneNumber() );
        student.setProgramCourse( studentDTO.getProgramCourse() );
        student.setStuPassword( studentDTO.getStuPassword() );
        student.setRollNumber( studentDTO.getRollNumber() );

        return student;
    }

    @Override
    public List<StudentDTO> toDTOList(List<Student> students) {
        if ( students == null ) {
            return null;
        }

        List<StudentDTO> list = new ArrayList<StudentDTO>( students.size() );
        for ( Student student : students ) {
            list.add( toDTO( student ) );
        }

        return list;
    }

    @Override
    public List<Student> fromDTOList(List<StudentDTO> studentDTOS) {
        if ( studentDTOS == null ) {
            return null;
        }

        List<Student> list = new ArrayList<Student>( studentDTOS.size() );
        for ( StudentDTO studentDTO : studentDTOS ) {
            list.add( fromDTO( studentDTO ) );
        }

        return list;
    }

    protected StudentDTO studentToStudentDTO(Student student) {
        if ( student == null ) {
            return null;
        }

        StudentDTO studentDTO = new StudentDTO();

        studentDTO.setName( student.getName() );
        studentDTO.setEmail( student.getEmail() );
        studentDTO.setProgramCourse( student.getProgramCourse() );
        studentDTO.setStuPassword( student.getStuPassword() );
        if ( student.getAge() != null ) {
            studentDTO.setAge( student.getAge() );
        }
        studentDTO.setRollNumber( student.getRollNumber() );
        studentDTO.setPhoneNumber( student.getPhoneNumber() );
        studentDTO.setStudentId( student.getStudentId() );

        return studentDTO;
    }
}
