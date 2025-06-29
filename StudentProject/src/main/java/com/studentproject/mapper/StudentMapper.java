package com.studentproject.mapper;



import com.studentproject.dto.StudentDTO;
import com.studentproject.models.Student;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")       //This tells MapStruct to register the generated class as a Spring Bean,

//extends CommonMapper<Student, StudentDTO> means that the StudentMapper interface is inheriting from another interface called CommonMapper. In Java, when one interface extends another, it means that the subclass interface (StudentMapper in this case) inherits the methods declared in the parent interface (CommonMapper), but without defining them.
public interface StudentMapper extends CommonMapper<Student, StudentDTO> {

    @Named("toDTO")
    StudentDTO toDTO(Student student);


    Student fromDTO(StudentDTO studentDTO);



    @IterableMapping(qualifiedByName = "toDTO")
    List<StudentDTO> toDTOList(List<Student> students);

    List<Student> fromDTOList(List<StudentDTO> studentDTOS);
}

