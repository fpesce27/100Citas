package com.example.Dates;


import com.example.Dates.entities.Date;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface repoDate extends JpaRepository<Date, Long> {
    Optional<Date> findById(Long id); // find by id
    Date save(Date date); // save date
    Date removeById(Long id); // remove date by id
}
