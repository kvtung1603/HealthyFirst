package com.uet.project.controller;

import com.uet.project.model.Certificate;
import com.uet.project.service.CertificateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CertificateController {

    @Autowired
    private CertificateService certificateService;

    @GetMapping("/certificate/findAll")
    public List<Certificate> findAll() {
        return certificateService.findAll();
    }

}
