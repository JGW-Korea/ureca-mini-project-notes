package com.notes.ureca_mini_project_notes.user.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

  @ResponseBody
  @PostMapping("/login")
  public String login() { // 로그인 컨트롤러
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
