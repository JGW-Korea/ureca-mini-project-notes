package com.notes.ureca_mini_project_notes.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
      e.printStackTrace();
      response.put("status", "SQLError");
    }

    return response;
  }

  @PostMapping("/logout")
  public Map<String, Object> logout(HttpServletRequest request) { // 로그아웃 세션 컨트롤러
    
    HttpSession session = request.getSession(false);
    Map<String, Object> response = new HashMap<>(); // 상태를 반환하기 위한 Map 객체

    // 세션에 정보가 없을 경우
    if(session == null) {
      response.put("status", "Logout_Faild");
    } else { // 세션에 정보가 있을 경우
      session.invalidate(); // 현재 사용자의 세션을 무효화 시키는 invalidate() 메서드를 통해 현재 사용자의 세션 정보를 모두 삭제한다.
      response.put("status", "Logout_Success");
    }

    // 결과를 반환한다.
    return response;
  }

  @PostMapping("/find-id")
  public Map<String, Object> findId(@RequestBody User user) { // 아이디 찾기 컨트롤러
    
    Map<String, Object> response = new HashMap<>(); // 상태를 반환하기 위한 Map 객체
    
    try {
      User userInfo = service.findId(user); // 입력된 이름 값을 통해 회원 정보를 DB에서 데이터를 가져온다.
      
      // 세션에 동일한 정보가 없을 경우
      if(userInfo == null) {
        response.put("status", "INVALID_ID_AND_NAME");
      } else {
        // 세션에 동일한 정보가 있을 경우

        // 사용자의 비밀번호의 뒷자리는 보이지 않게 처리를 해준다.
        userInfo.setPassword(
          userInfo.getPassword().substring(0, 4) + 
          userInfo.getPassword().substring(4).replaceAll(".", "*")
        );
        
        // Map에 응답 결과를 저장한다.
        response.put("status", "success");
        response.put("user", userInfo);
      }


    } catch(Exception e) {
      e.printStackTrace();
    }
    
    return response; // 응답 결과를 반환한다.
  }

  @PostMapping("/find-password")
  public String findPassword() { // 비밀번호 찾기 컨트롤러
    return "find-password";
  }
}
