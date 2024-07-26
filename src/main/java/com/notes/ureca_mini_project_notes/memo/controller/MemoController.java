package com.notes.ureca_mini_project_notes.memo.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.notes.ureca_mini_project_notes.memo.dto.Memo;
import com.notes.ureca_mini_project_notes.memo.service.MemoService;

@RestController
@RequestMapping("/memo")
public class MemoController {
  
  @Autowired
  MemoService service;

  @GetMapping("/findAll")
  public List<Memo> findAllUserMemoGroupPages(@RequestParam("no") int no) {
    
    List<Memo> response = new ArrayList<>();

    try {
      service.findAllMemo(no);
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
    }
    
    return response;
  }

}
