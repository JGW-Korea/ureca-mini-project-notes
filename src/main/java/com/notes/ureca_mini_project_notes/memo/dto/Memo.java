package com.notes.ureca_mini_project_notes.memo.dto;

public class Memo {
  
  private int groupNo;
  private int memoNo;
  private String title;
  private String content;

  public Memo() {
  }
  
  public Memo(int groupNo, int memoNo, String title, String content) {
    this.groupNo = groupNo;
    this.memoNo = memoNo;
    this.title = title;
    this.content = content;
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

  public String getcontent() {
    return content;
  }

  public void setcontent(String content) {
    this.content = content;
  }

  @Override
  public String toString() {
    return "Memo [groupNo=" + groupNo + ", memoNo=" + memoNo + ", title=" + title + ", content=" + content + "]";
  }

  
}
