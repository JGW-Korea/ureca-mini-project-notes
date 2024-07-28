package com.notes.ureca_mini_project_notes.memo.dao;

import java.util.List;

import java.sql.SQLException;
import org.apache.ibatis.annotations.Mapper;
import com.notes.ureca_mini_project_notes.memo.dto.MemoGroup;

@Mapper
public interface MemoGroupDAO {

  public List<MemoGroup> findAll(int no) throws SQLException;
  
  public MemoGroup find(MemoGroup group) throws SQLException; // 현재 생성하려는 그룹이 이미 존재할 경우
  public int create(MemoGroup group) throws SQLException; // 새로운 그룹을 생성

  public int delete(MemoGroup group) throws SQLException; // 새로운 그룹을 생성
}
