package com.notes.ureca_mini_project_notes.user.service;

import java.sql.SQLException;

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
  public User findId(User user) throws SQLException {
    return dao.findUserId(user);
  }

  @Override
  public int findPasswordAndUpdate() throws SQLException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'pwdUpdate'");
  }
  
}
