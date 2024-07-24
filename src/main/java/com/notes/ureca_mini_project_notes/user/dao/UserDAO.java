package com.notes.ureca_mini_project_notes.user.dao;

import java.util.Map;

import java.sql.SQLException;
import org.apache.ibatis.annotations.Mapper;
import com.notes.ureca_mini_project_notes.user.dto.User;

@Mapper
public interface UserDAO {

  
  public User loginCheckUser(User user) throws SQLException; // 사용자 아이디, 비밀번호 input 태그에 입력한 값을 SQL Where 절을 통해 로그인이 가능한지 반환한다.
  public User findUserId(User user) throws SQLException; // 사용자의 아이디, 이름 input 태그에 입력한 값을 SQL where 절에 통해 해당 사용자가 있는지 반환한다.
  
  // 비밀번호 찾기 관련 기능
  public int findPassword_UserIdCheck (String id) throws SQLException;
  public int findPassword_UpdatePassword(Map<String, Object> params) throws SQLException;
  
  // 회원가입
  public int register(User user) throws SQLException;
}