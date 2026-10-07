package prc07;

import java.util.Scanner;

public class Array2 {
    static void main(String[] args) {

        // 학생 수, 과목 수 입력 받아 설정.
        Scanner sc = new Scanner(System.in);
        System.out.print("학생 수 입력: ");
        int student = sc.nextInt();
        System.out.print("과목 수 입력: ");
        int subject = sc.nextInt();

        // 2차원 배열 객체 만들기
        int[][] scores = new int[student][subject];

        // 반복문을 돌며 학생들 과목 점수 받기
        for (int i = 0; i < student; i++) {
            int sum = 0;
            for (int j = 0; j < subject; j++) {
                System.out.print((i + 1) + "번째 학생의 " + (j + 1) + "번째 과목 점수를 입력: ");
                scores[i][j] = sc.nextInt();

                // 합계
                sum += scores[i][j];

            }


            // 평균
            double avg = (double) sum / scores.length;

            System.out.println("합계: " + sum);
            System.out.println("평균: " + avg);
            System.out.println();
        }
    }
}
