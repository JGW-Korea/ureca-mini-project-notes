package com.notes.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/employee")
public class HomeController {
  @RequestMapping("/home")
  public String home() {
    return "redirect:/index.html";
  }
}
