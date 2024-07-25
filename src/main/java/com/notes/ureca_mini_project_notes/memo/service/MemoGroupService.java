package com.notes.ureca_mini_project_notes.memo.service;

import java.sql.SQLException;

import java.util.List;

import com.notes.ureca_mini_project_notes.memo.dto.MemoGroup;

public interface MemoGroupService {

  public List<MemoGroup> findAllMemoGroup(int no) throws SQLException;
  
}
