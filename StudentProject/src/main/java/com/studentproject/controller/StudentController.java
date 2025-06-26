package com.studentproject.controller;

import com.studentproject.dto.ResponseType;
import com.studentproject.dto.StudentDTO;
import com.studentproject.service.StudentService;
import com.studentproject.utils.ResponseBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.View;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173") // Adjust this to match your frontend URL
@RestController //Marks a class as a REST controller, which handles HTTP requests and returns JSON/XML (not HTML views)
@RequestMapping("/api/students") //Defines the base path or route for your controller or method
public class StudentController {

    private final StudentService studentService;
    private final View error;
//    boolean studentIdExist;

    // Constructor injection (no need for @Autowired with single constructor)
    public StudentController(StudentService studentService, View error) {
        this.studentService = studentService;
        this.error = error;
    }

    @PostMapping(produces = "application/json", consumes = "application/json")
    public ResponseEntity<Map<String, Object>> createStudent(@Valid @RequestBody StudentDTO studentDTO) {
        try {
            Long studentId = studentDTO.getStudentId();
            if (studentId == null) {
                //  Still using ResponseBuilder, now wrapped with 400 Bad Request
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(ResponseBuilder.buildObjectResponse(null, ResponseType.ERROR, "Student ID is required"));
            }

            boolean studentIdExist = studentService.studentIdExist(studentId);
            if (!studentIdExist) {
                //  Student created successfully — 201 Created
                return ResponseEntity
                        .status(HttpStatus.CREATED)
                        .body(ResponseBuilder.buildObjectResponse(studentService.createStudent(studentDTO), ResponseType.SUCCESS, "Student created successfully"));
            } else {
                //  Student already exists — 409 Conflict
                return ResponseEntity
                        .status(HttpStatus.CONFLICT)
                        .body(ResponseBuilder.buildObjectResponse(null, ResponseType.ERROR, "Student already exists"));
            }
        } catch (IllegalArgumentException e) {
            //  Validation or format error — 400 Bad Request
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(ResponseBuilder.buildObjectResponse(null, ResponseType.ERROR, "Invalid student data"));
        } catch (Exception e) {
            e.printStackTrace();
            //  Something unexpected — 500 Internal Server Error
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResponseBuilder.buildObjectResponse(null, ResponseType.ERROR, e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        List<StudentDTO> students = studentService.getAllStudents();
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    @GetMapping(value = "/{studentId}", produces = "application/json")
    public Map<String,Object> getStudentByStudentId(@PathVariable Long studentId) {
        StudentDTO student = studentService.getStudentByStudentId(studentId);
        if (student != null) {
            return  ResponseBuilder.buildObjectResponse(student,ResponseType.SUCCESS, "The Details of the Student with id " + studentId +" is found in the database");
        }
        return  ResponseBuilder.buildObjectResponse(null,ResponseType.ERROR, "The Details of the Student with id " + studentId +" is not found in the database");
    }

    @PutMapping(value = "/{studentId}", produces = "application/json", consumes = "application/json")
    public Map<String, Object> updateStudent(@PathVariable("studentId") Long studentId,
                                             @Valid @RequestBody StudentDTO studentDTO) {
        {
            try {

                if (!studentService.studentIdExist(studentId)) {

                    return ResponseBuilder.buildObjectResponse(null, ResponseType.ERROR, "Student with id " + studentId + " does not exist");
                }
            } catch (IllegalArgumentException e) {
                return ResponseBuilder.buildObjectResponse(null, ResponseType.ERROR, "Invalid student data");
            }
            StudentDTO updatedStudent = studentService.updateStudent(studentId, studentDTO);
            if (updatedStudent != null) {
                return ResponseBuilder.buildObjectResponse(updatedStudent, ResponseType.SUCCESS, "Student updated successfully  successfully");
            }

            return ResponseBuilder.buildObjectResponse(null, ResponseType.ERROR, "students details cannot be null . Try updating student details again .");


        }
    }

    @DeleteMapping(value = "/{studentId}", produces = "application/json")
    public Map<String, Object> deleteStudent (@PathVariable("studentId") Long studentId){
        boolean deleted = studentService.deleteStudent(studentId);
        if (deleted) {
            return ResponseBuilder.buildObjectResponse(
                    null,
                    ResponseType.SUCCESS,
                    "Student with StudentID " + studentId + " deleted successfully"
            );
        }
        return ResponseBuilder.buildObjectResponse(
                null,
                ResponseType.ERROR,
                "Student with StudentID " + studentId + " not found"
        );
    }

}