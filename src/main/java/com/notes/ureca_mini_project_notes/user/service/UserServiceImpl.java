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
    
    return dao.selectUser(user);
  }

  @Override
  public int logout() {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'logout'");
  }

  @Override
  public int idUpdate() throws SQLException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'idUpdate'");
  }

  @Override
  public int pwdUpdate() throws SQLException {
    // TODO Auto-generated method stub
    throw new UnsupportedOperationException("Unimplemented method 'pwdUpdate'");
  }
  
}
