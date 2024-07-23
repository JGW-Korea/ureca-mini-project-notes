package com.notes.ureca_mini_project_notes.auth.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/auth")
public class AuthController {
  
  @ResponseBody
  @GetMapping("/login-check")
  public boolean loginCheck() { // 로그인 세션 컨트롤러
    return true;
  }
  

}
