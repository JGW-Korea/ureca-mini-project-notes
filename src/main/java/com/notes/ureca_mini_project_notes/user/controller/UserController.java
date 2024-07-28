package com.notes.ureca_mini_project_notes.user.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
  public Map<String, Object> findId(@RequestParam("name") String name) { // 아이디 찾기 컨트롤러
    
    Map<String, Object> response = new HashMap<>(); // 상태를 반환하기 위한 Map 객체
    
    try {
      User userInfo = service.findId(name); // 입력된 이름 값을 통해 회원 정보를 DB에서 데이터를 가져온다.
      
      // 클라이언트에서 받아온 이름과 매칭되는 아이디가 없을 경우
      if(userInfo == null) {
        response.put("status", "INVALID_NAME");
      } else {

        // 매개변수로 받아온 이름과 매칭되는 아이디가 있을 경우
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

  // 비밀번호 찾기 관련 Controller
  @PostMapping("/find-password/compare-id") // 입력된 아이디를 DB에 저장되어있는지 찾는다.
  public Map<String, Object> findPasswordCompareId(@RequestParam("id") String id) { // 비밀번호 찾기 컨트롤러
    Map<String, Object> response = new HashMap<>();

      try {

        User user = service.findPasswordAndUpdate(id);

        if(user == null) {
          response.put("status", "INVALID_ID");
        } else {
          response.put("user", user);
          response.put("status", "success");
        }

      } catch (Exception e) {
        // TODO: handle exception
        e.printStackTrace();
      }
    
    return response;
  }

  @PostMapping("/find-password/update-password")
  public int findPasswordUpdatePassword(@RequestParam("password") String newPwd, @RequestParam("user") String userId) {

    int response = 0;

    try {
      
      response = service.findPasswordAndUpdate(newPwd, userId);

    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
    }
    return response;
  }

  @PostMapping("/register")
  public Map<String, Object> register(@RequestBody User user) {
    Map<String, Object> response = new HashMap<>();

    try {
      User userInfo = service.registerFindIdService(user);

      // 중복된 아이디가 있을 경우
      if(userInfo != null) {
        // 아이디, 이름 중복 확인
        if(userInfo.getId().equals(user.getId())) {
          response.put("status", "DuplicateIdExists");
        } else if(userInfo.getName().equals(user.getName())) {
          response.put("status", "DuplicateNameExists");
      }
    } else {
        // 중복된 아이디가 없을 경우 아이디 생성
        service.registerService(user);
        response.put("status", "success");
      }

    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
    }

    return response;
  }

  @PostMapping("/update-user-info")
  public Map<String, Object> update(@RequestBody User user) {
    
    Map<String, Object> response = new HashMap<>();
    
    try {
      
      User userInfo = service.registerFindIdService(user);

      // 중복된 아이디가 있을 경우
      if(userInfo != null) {
        // 아이디, 이름 중복 확인
        if(userInfo.getId().equals(user.getId())) {
          response.put("status", "DuplicateIdExists");
        } else if(userInfo.getName().equals(user.getName())) {
          response.put("status", "DuplicateNameExists");
        }
      } else { // 중복된 아이디가 없을 경우
        
      }

    } catch (Exception e) {
      // TODO: handle exception
    }

    return response;
  }

}
