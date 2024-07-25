package com.notes.ureca_mini_project_notes.memo.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.notes.ureca_mini_project_notes.memo.dto.MemoGroup;
import com.notes.ureca_mini_project_notes.memo.service.MemoGroupService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/memo/group")
public class GroupController {
  
  @Autowired
  MemoGroupService memoGroup;

  // 사용자의 모든 메모 그룹에 대한 정보를 가져온다.
  @GetMapping("/findAll")
  public List<MemoGroup> findAllUserMemoGroup(@RequestParam("no") int no) {
    
    List<MemoGroup> response = new ArrayList<>();

    try {
      response = memoGroup.findAllMemoGroup(no);
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
    }

    return response;
  }

}
