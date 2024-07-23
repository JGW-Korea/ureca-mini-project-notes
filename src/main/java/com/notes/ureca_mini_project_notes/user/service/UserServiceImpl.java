package com.notes.ureca_mini_project_notes.user.service;

import java.sql.SQLException;

import org.springframework.stereotype.Service;

import com.notes.ureca_mini_project_notes.user.dto.User;

@Service
public class UserServiceImpl implements UserService {

  @Override
  public int loginService(User user) throws SQLException {
    System.out.println("Service " + user.getId() + " " + user.getPassword());
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
