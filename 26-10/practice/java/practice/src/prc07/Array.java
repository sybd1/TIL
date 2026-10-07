package prc07;

import java.util.Scanner;

public class Array {
    static void main(String[] args) {
        /* 5명의 자바 점수를 정수로 입력받아 합계와 평균을 실수로 구하는 프로그램 만들기 */
        int[] scores = new int[5];

        Scanner sc = new Scanner(System.in);
        for (int i = 0; i < scores.length; i++) {
            System.out.print((i + 1) + "번째 학생의 점수를 입력 하세요: ");
            scores[i] = sc.nextInt();
        }

        int sum = 0;
        for (int i = 0; i < scores.length; i++) {
            sum += scores[i];
        }

        double avg = (double)sum / scores.length;

        System.out.println("합계: " + sum);
        System.out.println("평균: " + avg);
    }
}
