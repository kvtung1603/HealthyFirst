//package com.uet.project.controller;
//
//import com.uet.project.model.Action;
//import com.uet.project.service.ActionService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//@RequiredArgsConstructor
//@RestController
//public class ActionController {
//    private final ActionService actionService;
//
//
//    @PostMapping("/action/registry")
//    public Action createAction(@RequestBody Action act) {
//        return actionService.saveAction(act);
//    }
//
//}
//`