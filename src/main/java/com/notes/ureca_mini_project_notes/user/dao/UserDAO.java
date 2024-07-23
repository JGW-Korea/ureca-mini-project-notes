package com.notes.ureca_mini_project_notes.user.dao;

import java.sql.SQLException;
import org.apache.ibatis.annotations.Mapper;
import com.notes.ureca_mini_project_notes.user.dto.User;

@Mapper
public interface UserDAO {

  public User selectUser(User user) throws SQLException; // 로그인한 유저에 대한 정보를 반환한다.
  
}