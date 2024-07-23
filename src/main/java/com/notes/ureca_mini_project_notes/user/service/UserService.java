package com.notes.ureca_mini_project_notes.user.service;

import java.sql.SQLException;

import com.notes.ureca_mini_project_notes.user.dto.User;

// Auth 비즈니스 로직을 수행하는 Service Interface
// AuthService 제공 기능 -> 로그인, 세션 확인, 로그아웃, 아이디 / 비밀번호 찾기
public interface UserService {
  
  public User validateUser(User user) throws SQLException;
  public int logout();
  public int idUpdate() throws SQLException;
  public int pwdUpdate() throws SQLException;

}
