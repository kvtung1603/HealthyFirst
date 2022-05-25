package com.uet.project.service;

import com.uet.project.model.Certificate;
import com.uet.project.repository.CertificateRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CertificateService {
    private final CertificateRepository certificateRepository;

    public List<Certificate> findByExpiryDateBefore(Date date) {
        return certificateRepository.findByExpiryDateBefore(date);
    }

    public List<Certificate> findByExpiryDateAfter(Date date) {
        return certificateRepository.findByExpiryDateAfter(date);
    }

    public List<Certificate> findCertificateByDated(Date date) {
        return certificateRepository.findCertificateByDated(date);
    }
    public List<Certificate> findByType(String type) {
        return certificateRepository.findByType(type);
    }




}
