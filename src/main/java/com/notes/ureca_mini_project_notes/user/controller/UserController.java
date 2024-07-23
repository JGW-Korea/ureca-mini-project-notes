package com.notes.ureca_mini_project_notes.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.notes.ureca_mini_project_notes.user.dto.User;
import com.notes.ureca_mini_project_notes.user.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/user")
public class UserController {

  @Autowired
  UserService service;

  @ResponseBody
  @PostMapping("/login")
  public Map<String, Object> login(@RequestBody User user, HttpServletRequest request) { // 로그인 컨트롤러

    Map<String, Object> response = new HashMap<>();

    try {
      User userInfo = service.validateUser(user); // 입력받은 정보를 통해 DB에서 값을 가지고 온다.

      if(userInfo == null) { // 존재하지 않는 아이디일 경우
        response.put("status", "INVALID_ID");
      } else if(!userInfo.getPassword().equals(user.getPassword())) { // 아이디는 존재하지만 비밀번호가 존재하지 않을 경우
        response.put("status", "INVALID_PASSWORD");
      } else {

        // DB에 저장된 아이디, 비밀번호 정보가 일치할 경우 세션 생성
        HttpSession session = request.getSession();

        userInfo.setPassword(null); // 비밀번호 정보는 세션에 저장시키면 안되기 때문에 제거시킨다.
        session.setAttribute("user", userInfo);
        response.put("status", "Login_Success");
        response.put("user", userInfo);
        // session.setAttribute("user", userInfo);
      }
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
      response.put("status", "SQLError");
    }

    return response;
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
