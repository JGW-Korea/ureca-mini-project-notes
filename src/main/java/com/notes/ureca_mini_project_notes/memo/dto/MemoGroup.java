package com.notes.ureca_mini_project_notes.memo.dto;

public class MemoGroup {
  
  private int userNo;
  private int groupNo;
  private String title;

  public MemoGroup() {
  }

  public MemoGroup(int userNo, int groupNo, String title) {
    this.userNo = userNo;
    this.groupNo = groupNo;
    this.title = title;
  }
  
  public int getUserNo() {
    return userNo;
  }
  public void setUserNo(int userNo) {
    this.userNo = userNo;
  }
  public int getGroupNo() {
    return groupNo;
  }
  public void setGroupNo(int groupNo) {
    this.groupNo = groupNo;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  @Override
  public String toString() {
    return "MemoGroup [userNo=" + userNo + ", groupNo=" + groupNo + ", title=" + title + "]";
  }

}
