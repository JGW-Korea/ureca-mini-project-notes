package com.notes.ureca_mini_project_notes.user.dao;

import java.sql.SQLException;
import org.apache.ibatis.annotations.Mapper;
import com.notes.ureca_mini_project_notes.user.dto.User;

@Mapper
public interface UserDAO {

  
  public User loginCheckUser(User user) throws SQLException;
  
  public User findUserId(User user) throws SQLException; // 사용자의 아이디, 비밀번호 input 태그에 입력한 값을 SQL where 절에 사용한다.
  
}