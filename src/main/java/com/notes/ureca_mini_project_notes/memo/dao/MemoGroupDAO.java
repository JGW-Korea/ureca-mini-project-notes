package com.notes.ureca_mini_project_notes.memo.dao;

import java.util.List;

import java.sql.SQLException;
import org.apache.ibatis.annotations.Mapper;
import com.notes.ureca_mini_project_notes.memo.dto.MemoGroup;

@Mapper
public interface MemoGroupDAO {

  public List<MemoGroup> findAll(int no) throws SQLException;

}
