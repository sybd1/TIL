package com.assignment.chap06.test2;

public class StudentDTO {

    private int grade;
    private int classroom;
    private String name;
    private int kor;
    private int eng;
    private int math;

    public StudentDTO(int grade, int classroom, String name, int kor, int eng, int math) {
        this.grade = grade;
        this.classroom = classroom;
        this.name = name;
        this.kor = kor;
        this.eng = eng;
        this.math = math;
    }

    public StudentDTO() {

    }

    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public int getClassroom() {
        return classroom;
    }

    public void setClassroom(int classroom) {
        this.classroom = classroom;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getKor() {
        return kor;
    }

    public void setKor(int kor) {
        this.kor = kor;
    }

    public int getEng() {
        return eng;
    }

    public void setEng(int eng) {
        this.eng = eng;
    }

    public int getMath() {
        return math;
    }

    public void setMath(int math) {
        this.math = math;
    }

    public void getInformation() {
        System.out.println(
                "학년 : " + this.grade + "\n" +
                        "반 : " + this.classroom + "\n" +
                        "이름 : " + this.name + "\n" +
                        "국어점수 : " + this.kor + "\n" +
                        "영어점수 : " + this.eng + "\n" +
                        "수학점수 : " + this.math);
    }
}
