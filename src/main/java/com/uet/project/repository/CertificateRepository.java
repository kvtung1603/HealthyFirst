package com.uet.project.repository;

import com.uet.project.model.Certificate;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
@Repository
public interface CertificateRepository extends CrudRepository<Certificate, Integer> {

    List<Certificate> findByExpiryDateBefore(Date date);

    List<Certificate> findByExpiryDateAfter(Date date);

    List<Certificate> findCertificateByDated(Date date);


    @Query(value="select c from Certificate c where c.type=?1")
    List<Certificate> findByType(String type);


}
