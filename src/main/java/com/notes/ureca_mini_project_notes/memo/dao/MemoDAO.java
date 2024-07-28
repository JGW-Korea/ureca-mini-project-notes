package com.notes.ureca_mini_project_notes.memo.dao;

import java.util.List;
import java.sql.SQLException;

import org.apache.ibatis.annotations.Mapper;
import com.notes.ureca_mini_project_notes.memo.dto.Memo;


@Mapper
public interface MemoDAO {

  public List<Memo> findAll(int no) throws SQLException;
  public Memo find(Memo memo) throws SQLException;

  public int create(Memo memo) throws SQLException;

}  