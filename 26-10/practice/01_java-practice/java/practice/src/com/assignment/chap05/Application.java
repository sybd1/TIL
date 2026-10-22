package com.assignment.chap05;

import java.util.Scanner;

public class Application {
    static void main() {

        /* 홀수인 양의 정수를 입력 받아 입력 받은 크기 만큼의 정수형 배열을 할당하고
         * 배열의 중간까지는 1부터 1씩 증가하여 오름차순으로 값을 넣고,
         * 중간 이후부터 끝까지는 1씩 감소하여 내림차순으로 값 넣어 출력하세요
         *
         * 단, 홀수인 양의 정수를 입력하지 않은 경우에는 "양수 혹은 홀수만 입력해야 합니다."를 출력하세요
         *
         * -- 입력 예시 --
         * 홀수인 양의 정수를 입력하세요 : 7
         *
         * -- 출력 예시 --
         * 1 2 3 4 3 2 1
         *
         * -- 입력 예시 --
         * 홀수인 양의 정수를 입력하세요 : 8
         *
         * -- 출력 예시 --
         * 양수 혹은 홀수만 입력해야 합니다.
         */

        Scanner sc = new Scanner(System.in);

        System.out.print("홀수인 양의 정수를 입력하세요: ");
        int holsu = sc.nextInt();

        if (holsu % 2 != 0 && holsu > 0) {

            int[] arr = new int[holsu];

            for (int i = 0; i <= holsu / 2; i++) {
                arr[i] = i + 1;
            }

            for (int i = holsu / 2 + 1; i < holsu; i++) {
                arr[i] = holsu - i;
            }

            for (int i = 0; i < arr.length; i++) {
                System.out.println(arr[i] + " ");
            }
        } else {
            System.out.println("양수 혹은 홀수만 입력해야 합니다.");
        }

        sc.close();


        /* 숫자 야구게임 만들기
         * 길이 4의 정수 배열을 만들고 각 인덱스에는 0 ~ 9까지의 중복되지 않는 난수를 저장한다.
         * 4자리 숫자를 입력받아 스트라이크, 볼 등의 힌트를 주며 4자리 난수 숫자를 맞추는 게임이다.
         * 숫자와 자리가 모두 맞는 경우 스트라이크, 숫자는 맞지만 자리는 맞지 않는 경우는 볼 이다.
         * 예) 9183 으로 난수가 발생하면 9356 입력 시 1S 1B이다.
         *
         * 단, 기회는 총 10번이며, 10번 이내에 맞추는 경우 "정답입니다." 출력 후 게임 종료
         * 10번의 기회가 모두 소진 되면 "10번의 기회를 모두 소진하셨습니다. 프로그램을 종료합니다." 출력 후 종료
         *
         * 또한 4자리의 정수를 입력하지 않은 경우에는 "4자리의 정수를 입력해야 합니다." 출력 후 입력을 다시 받을 수 있되
         * 횟수는 차감하지 않는다.
         *
         * -- 프로그램 예시 (난수 7416 의 경우) --
         *
         * 10회 남으셨습니다.
         * 4자리 숫자를 입력하세요 : 1234
         * 아쉽네요 0S 2B 입니다.
         * 9회 남으셨습니다.
         * 4자리 숫자를 입력하세요 : 5678
         * 아쉽네요 0S 2B 입니다.
         * 8회 남으셨습니다.
         * 4자리 숫자를 입력하세요 : 7416
         * 정답입니다.
         * */

        int[] arr1 = new int[4];

        for (int i = 0; i < 10; i++) {

            int randomNum = (int) (Math.random() * 10);
            boolean duplicate = false;

            for (int j = 0; j < i; j++) {
                if (arr1[j] == randomNum) {
                    duplicate = true;
                    break;
                }
            }
            if (duplicate) {
                i--;
                continue;
            }

            arr1[i] = randomNum;
        }

        int chance = 10;
        boolean correct = false;

        while (chance > 0) {

            System.out.println(chance + "회 남으셨습니다.");
            System.out.print("4자리 숫자를 입력하세요: ");

            String input = sc.next();


            if (!input.matches("\\d{4}")) {
                System.out.println("4자리의 정수를 입력해야 합니다.");
                continue;
            }

            int[] answer = new int[4];

            for (int i = 0; i < answer.length; i++) {
                answer[i] = input.charAt(i) - '0';
            }


            int strike = 0;
            int ball = 0;

            for (int i = 0; i < arr1.length; i++) {
                for (int j = 0; j < answer.length; j++) {

                    if (arr1[i] == answer[j]) {
                        if (i == j) {
                            strike++;
                        } else {
                            ball++;
                        }
                    }
                }
            }


            if (strike == 4) {
                System.out.println("정답입니다.");
                correct = true;
                break;
            }

            System.out.println("아쉽네요 " + strike + "S " + ball + "B 입니다.");

            chance--;
        }


        if (!correct && chance == 0) {
            System.out.println(
                    "10번의 기회를 모두 소진하셨습니다. 프로그램을 종료합니다."
            );
        }

        sc.close();

    }
}
