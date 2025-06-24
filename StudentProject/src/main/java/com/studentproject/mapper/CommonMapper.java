
package com.studentproject.mapper;

import java.text.ParseException;
import java.util.List;

public interface CommonMapper<T, DTO> {

    DTO toDTO(T t);

    T fromDTO(DTO dto) throws ParseException;

    List<DTO> toDtoList(List<T> tList);

    List<T> fromDTOList(List<DTO> dtos)throws ParseException;
}
