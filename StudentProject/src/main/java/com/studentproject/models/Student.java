package com.studentproject.models;

import jakarta.persistence.*;


import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "students")
@NamedQuery(name = "Student.findAll", query = "SELECT s FROM Student s")
public class Student
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //This annotation is used in JPA (Java Persistence API) to tell the database how to automatically generate the value for a primary key field (usually id).

       @Column(name = "id", nullable = false)
       private Long id;

    private String name ;

//    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private boolean deleted;

    private String address ;
    private Integer age ;
    private String gender ;

//    @Column(name = "created_by")
//    private Long createdBy;

    private String email;

    private  Long studentId;
    private String phoneNumber;
    private String level;
    private String programCourse;
    private LocalDate enrollmentDate; // automatically nullable (i.e  nullable = true)
    private String stuPassword;
    private String rollNumber;
//dto mapper reposetories and services

}
