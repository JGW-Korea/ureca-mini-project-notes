package com.notes.ureca_mini_project_notes.memo.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notes.ureca_mini_project_notes.memo.dao.MemoGroupDAO;
import com.notes.ureca_mini_project_notes.memo.dto.MemoGroup;

@Service
public class MemoGroupServiceImpl implements MemoGroupService {

  @Autowired
  MemoGroupDAO dao;

  @Override
  public List<MemoGroup> findAllMemoGroup(int no) throws SQLException {
    return dao.findAll(no);
  }

  @Override
  public MemoGroup checkTitleExistence(MemoGroup group) throws SQLException {
    return dao.find(group);
  }

  @Override
  public int createNewMemoGroupService(MemoGroup group) throws SQLException {
    return dao.create(group);
  }
  
}
