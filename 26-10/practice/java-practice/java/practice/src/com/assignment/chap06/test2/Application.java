package com.assignment.chap06.test2;

import java.util.Scanner;

public class Application {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        StudentDTO[] students = new StudentDTO[10];
        int count = 0;

        while (count < students.length) {
            System.out.print("학년 : ");
            int grade = sc.nextInt();
            System.out.print("반 : ");
            int classroom = sc.nextInt();
            System.out.print("이름 : ");
            String name = sc.next();
            System.out.print("국어점수 : ");
            int kor = sc.nextInt();
            System.out.print("영어점수 : ");
            int eng = sc.nextInt();
            System.out.print("수학점수 : ");
            int math = sc.nextInt();

            students[count] = new StudentDTO(grade, classroom, name, kor, eng, math);
            count++;

            System.out.print("계속 추가할 겁니까 ? (y/n) : ");
            String answer = sc.next();

            if (answer.equalsIgnoreCase("y")) {
                continue;
            } else if (answer.equalsIgnoreCase("n")) {
                break;
            }
        }

        for (int i = 0; i < count; i++) {
            int avg = (students[i].getKor() + students[i].getEng() + students[i].getMath()) / 3;
            System.out.println("학년=" + students[i].getGrade()
                    + ", 반=" + students[i].getClassroom()
                    + ", 이름=" + students[i].getName()
                    + ", 국어=" + students[i].getKor()
                    + ", 영어=" + students[i].getEng()
                    + ", 수학=" + students[i].getMath()
                    + ", 평균=" + avg);
        }
    }
}