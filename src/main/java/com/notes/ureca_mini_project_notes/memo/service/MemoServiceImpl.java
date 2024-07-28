package com.notes.ureca_mini_project_notes.memo.service;

import java.util.List;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notes.ureca_mini_project_notes.memo.dao.MemoDAO;
import com.notes.ureca_mini_project_notes.memo.dto.Memo;

@Service
public class MemoServiceImpl implements MemoService {

   @Autowired
  MemoDAO dao;

  @Override
  public List<Memo> findAllMemo(int no) throws SQLException {
    return dao.findAll(no);
  }

  @Override
  public Memo find(Memo memo) throws SQLException {
    return dao.find(memo);
  }

  @Override
  public int create(Memo memo) throws SQLException {
    return dao.create(memo);
  }
  
}
