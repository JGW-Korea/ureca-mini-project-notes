package com.notes.ureca_mini_project_notes.memo.dto;

public class Memo {
  
  private int groupNo;
  private int memoNo;
  private String title;
  private String desc;

  public Memo() {
  }
  
  public Memo(int groupNo, int memoNo, String title, String desc) {
    this.groupNo = groupNo;
    this.memoNo = memoNo;
    this.title = title;
    this.desc = desc;
  }

  public int getGroupNo() {
    return groupNo;
  }

  public void setGroupNo(int groupNo) {
    this.groupNo = groupNo;
  }

  public int getMemoNo() {
    return memoNo;
  }

  public void setMemoNo(int memoNo) {
    this.memoNo = memoNo;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDesc() {
    return desc;
  }

  public void setDesc(String desc) {
    this.desc = desc;
  }

}
