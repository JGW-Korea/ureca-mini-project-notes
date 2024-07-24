package com.notes.ureca_mini_project_notes.user.service;

import java.sql.SQLException;

import com.notes.ureca_mini_project_notes.user.dto.User;

// Auth 비즈니스 로직을 수행하는 Service Interface
// AuthService 제공 기능 -> 로그인, 세션 확인, 로그아웃, 아이디 / 비밀번호 찾기
public interface UserService {
  
  public User validateUser(User user) throws SQLException;
  public User findId(User user) throws SQLException;
  
  // 비밀번호 찾기(수정) 관련 Service 메서드
  public int findPasswordAndUpdate(String id) throws SQLException;
  public int findPasswordAndUpdate(String newPassword, String userId) throws SQLException;

}
