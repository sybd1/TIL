package prc;

public class Loops {
    static void main(String[] args) {

        int[] numbers = {1, 2, 3, 4, 5};

        for (int i = 0; i < numbers.length; i++) {
            System.out.println(numbers[i]);     // 1,2,3,4,5
        }

        for (int number : numbers) {
            System.out.println(number);     // 1,2,3,4,5
        }
    }
}
