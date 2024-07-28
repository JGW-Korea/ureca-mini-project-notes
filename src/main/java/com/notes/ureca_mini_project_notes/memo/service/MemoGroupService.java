package com.notes.ureca_mini_project_notes.memo.service;

import java.sql.SQLException;

import java.util.List;

import com.notes.ureca_mini_project_notes.memo.dto.MemoGroup;

public interface MemoGroupService {

  public List<MemoGroup> findAllMemoGroup(int no) throws SQLException; // 사용자가 생성한 모든 그룹을 가져온다.
  
  public MemoGroup checkTitleExistence(MemoGroup group) throws SQLException;
  public int createNewMemoGroupService(MemoGroup group) throws SQLException; // 새로운 그룹을 생성한다.
  
}
