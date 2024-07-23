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
  public int loginService(User user) throws SQLException {
    System.out.println("Hello");
    System.out.println(dao.selectUser(user));
    return 1;
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
