package com.notes.ureca_mini_project_notes.memo.controller;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
      response = service.findAllMemo(no);
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
    }
    
    return response;
  }

  @GetMapping("/find")
  public List<Memo> findUserMemoGroupPages(@RequestParam("no") int no) {
    
    List<Memo> response = new ArrayList<>();

    try {
      response = service.findAllMemo(no);
    } catch (Exception e) {
      // TODO: handle exception
      e.printStackTrace();
    }
    
    return response;
  }

  @PostMapping("/create")
  public Map<String, Object> createNewMemo(@RequestBody Memo memo) {
    Map<String, Object> response = new HashMap<>();

    try {
      Memo findMemo = service.find(memo);

      if(findMemo != null) {
        response.put("status", "DuplicateTitleExists");
      } else {
        service.create(memo);
        response.put("status", "success");
      }

    } catch(Exception e) {
      e.printStackTrace();
    }

    return response;
  }

}
