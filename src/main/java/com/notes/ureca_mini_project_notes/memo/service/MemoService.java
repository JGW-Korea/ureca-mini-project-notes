package com.notes.ureca_mini_project_notes.memo.service;

import java.util.List;
import java.sql.SQLException;

import com.notes.ureca_mini_project_notes.memo.dto.Memo;

public interface MemoService {
  
  public List<Memo> findAllMemo(int no) throws SQLException;
  public Memo find(Memo memo) throws SQLException;
  public int create(Memo memo) throws SQLException;
  public int delete(Memo memo) throws SQLException;
}
