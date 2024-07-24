package com.notes.ureca_mini_project_notes.user.service;

import java.sql.SQLException;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notes.ureca_mini_project_notes.user.dao.UserDAO;
import com.notes.ureca_mini_project_notes.user.dto.User;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  UserDAO dao;

  @Override
  public User validateUser(User user) throws SQLException {
    return dao.loginCheckUser(user);
  }

  @Override
  public User findId(String user) throws SQLException {
    return dao.findUserId(user);
  }

  @Override
  public int findPasswordAndUpdate(String id) throws SQLException {
    return dao.findPassword_UserIdCheck(id);
  }

  @Override
  public int findPasswordAndUpdate(String newPassword, String userId) throws SQLException {
    
    Map<String, Object> params = new HashMap<>();
    params.put("id", userId);
    params.put("password", newPassword);
    
    return dao.findPassword_UpdatePassword(params);
  };

  @Override
  public User registerFindIdService(User user) throws SQLException {
    return dao.isUserDuplicate(user);
  }

  @Override
  public int registerService(User user) throws SQLException {
    return dao.register(user);
  }
  
}
