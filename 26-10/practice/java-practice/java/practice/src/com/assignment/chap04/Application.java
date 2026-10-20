package com.assignment.chap04;

import java.util.Scanner;

public class Application {
    static void main() {
        /* 문제1
         * 국어, 영어, 수학 점수를 입력받아
         * 평균 점수가 60점 이상이면서 각 과목이 40점 이상인 조건이 만족하면 "합격입니다!" 를 출력하세요,
         * 단, 합격이 아닌 경우 불합격 사유가 무엇인지를 모두 출력해주어야 합니다.
         * 평균점수 미달인 경우 "평균점수 미달로 불합격입니다." 라고 출력하고,
         * 과목당 과락 점수가 있는 경우 "xx 과목의 점수 미달로 불합격 입니다." 출력하세요
         *
         * -- 입력 예시 --
         * 국어 점수를 입력하세요 : 60
         * 영어 점수를 입력하세요 : 30
         * 수학 점수를 입력하세요 : 20
         *
         * -- 출력 예시 --
         * 평균 점수 미달로 불합격입니다.
         * 영어 점수 미달로 불합격입니다.
         * 수학 점수 미달로 불합격입니다.
         */

        Scanner sc = new Scanner(System.in);

        System.out.print("국어 점수를 입력하세요 : ");
        int kor = sc.nextInt();
        System.out.print("영어 점수를 입력하세요 : ");
        int eng = sc.nextInt();
        System.out.print("수학 점수를 입력하세요 : ");
        int math = sc.nextInt();

        int avg = (kor + eng + math) / 3;

        if (avg < 60) {
            System.out.println("평균 점수 미달로 불합격입니다.");
        }
        if (kor < 40) {
            System.out.println("국어 점수 미달로 불합격입니다.");
        }
        if (eng < 40) {
            System.out.println("영어 점수 미달로 불합격입니다.");
        }
        if (math < 40) {
            System.out.println("수학 점수 미달로 불합격입니다.");
        }
        if (avg >= 60 && kor >= 40 && eng >= 40 && math >= 40) {
            System.out.println("합격입니다!");
        }

        /* 문제 2
         * 영업사원의 월급을 계산하는 프로그램을 작성하려고 합니다.
         *  월 급여액과 월 매출액을 입력 받아 급여를 산정합니다.
         * 영업사원은 매출액 대비 보너스율에 명시된 보너스를 급여 외에 추가로 지급받습니다.
         *
         * 단, 보너스율은 입력 받은 월 매출액에 비례하며,
         * 계산된 보너스 금액을 월 급여액에 더하여 총 급여를 계산한다.
         *
         * 보너스율을 적용하여 출력 예시처럼 출력되도록 프로그램을 만들어보세요
         *
         * -- 총 급여 계산식 --
         * 총 급여 = 월 급여  + (매출액 * 보너스율)
         *
         * -- 매출액 대비 보너스율 --
         *   매출액       보너스율
         * 5천만원 이상      5%
         * 3천만원 이상      3%
         * 1천만원 이상      1%
         * 1천만원 미만      0%
         *
         * -- 입력 예시 --
         * 월 급여 입력 : 3000000
         * 매출액 입력 : 20000000
         *
         * -- 출력 예시 --
         * ======================
         * 매출액 : 20000000
         * 보너스율 : 1%
         * 월 급여 : 3000000
         * 보너스 금액 : 200000
         * ======================
         * 총 급여 : 3200000
         */

        System.out.print("월 급여 입력 : ");
        int salary = sc.nextInt();
        System.out.print("매출액 입력 : ");
        int take = sc.nextInt();


        double bonusRate;


        if (take > 50000000) {
            bonusRate = 0.05;
        } else if (take > 30000000) {
            bonusRate = 0.03;
        } else if (take > 10000000) {
            bonusRate = 0.01;
        } else {
            bonusRate = 0.00;
        }

        int totalbonus = (int) (take * bonusRate);
        int totalSalary = salary + totalbonus;

        System.out.println("======================");
        System.out.println("매출액 : " + take);
        System.out.println("보너스율 : " + (int) (bonusRate * 100) + "%");
        System.out.println("월 급여 : " + salary);
        System.out.println("보너스 금액 : " + totalbonus);
        System.out.println("======================");
        System.out.println("총 급여 : " + totalSalary);
    }
}
