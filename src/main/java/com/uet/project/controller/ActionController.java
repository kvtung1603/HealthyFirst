package com.uet.project.controller;

import com.uet.project.service.ActionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ActionController {
    private final ActionService actionService;


}
