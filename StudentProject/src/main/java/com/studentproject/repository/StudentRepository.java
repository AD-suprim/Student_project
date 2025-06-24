package com.studentproject.repository;



import com.studentproject.models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//import java.util.List;
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByStudentId(Long studentId);
    boolean existsByStudentId(Long studentId);
    void deleteByStudentId(Long studentId);


    @Query("select s from Student s where s.studentId=:studentid and s.deleted=false")
    Student findByStudentId(@Param("studentid") String studenrtid);
}

