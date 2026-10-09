package prc08;

import java.util.Arrays;

public class Lotto {
    static void main() {
        // 중복 없는 로또 번호 6개 생성하기
        int[] lotto = new int[6];

        int index = 0;

        while (index < lotto.length) {

            int randomNumbers = (int) (Math.random() * 45) + 1;

            boolean duplication = false;

            for (int i = 0; i < index; i++) {
                if (lotto[i] == randomNumbers) {
                    duplication = true;
                    break;
                }
            }

            if (!duplication) {
                lotto[index] = randomNumbers;
                index++;
            }
        }
        Arrays.sort(lotto);
        System.out.println(Arrays.toString(lotto));

    }
}