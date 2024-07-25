package com.notes.ureca_mini_project_notes.memo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/memo/group")
public class Group {
  
  @GetMapping("/findAll")
  public String findAllUserMemoGroup() {
    return "Hello";
  }

}
