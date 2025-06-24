package com.studentproject.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)

public class StudentDTO  {

    private String name;

    @Email(message = "Invalid email format")
    private String email;

    private String programCourse;

    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String stuPassword;

    @Min(value = 16, message = "Age must be at least 16")
    @Max(value = 100, message = "age mustnt be more than 100")
    private int age;

    private String rollNumber;


    @NotNull(message = "Phone number is required")
//    @Min(value = 1000000000L, message = "Phone number must be exactly 10 digits")
//    @Max(value = 9999999999L, message = "Phone number must be exactly 10 digits")
    private String phoneNumber;

    //@JsonProperty(access = JsonProperty.Access.READ_ONLY) //@JsonProperty(access = JsonProperty.Access.READ_ONLY) makes studentId appear in the response but not required in the incoming request.
//    @JsonIgnore
    @Min(value = 1, message = "Student ID must be a positive integer")
    private  Long studentId;



//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//  generator = "native")
//    @Basic(optional = false)
//    @Column(name = "id", nullable = false)
//    private Long id;
}

