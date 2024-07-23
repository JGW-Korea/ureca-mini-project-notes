package com.notes.ureca_mini_project_notes.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.notes.ureca_mini_project_notes.user.dto.User;
import com.notes.ureca_mini_project_notes.user.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  UserService service;

  @ResponseBody
  @PostMapping("/login")
  public String login(@RequestBody User user) { // 로그인 컨트롤러
    
    try {
      service.loginService(user);
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
    }

    return "login";
  }

  @ResponseBody
  @PostMapping("/logout")
  public boolean logout() { // 로그아웃 세션 컨트롤러
    return true;
  }

  @ResponseBody
  @PostMapping("/find-id")
  public String findId() { // 아이디 찾기 컨트롤러
    return "find-id";
  }

  @ResponseBody
  @PostMapping("/find-password")
  public String findPassword() { // 비밀번호 찾기 컨트롤러
    return "find-password";
  }
}
