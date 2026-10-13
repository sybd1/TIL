package assignment.chap03;

public class Calculator {

    public void checkMethod() {
        System.out.println("메소드 호출 확인");
    }

    public void sum() {
        int result = 0;
        for (int i =0; i < 11; i++) {
            result += i;
        }
        System.out.println("1부터 10까지의 합 : " + result);
    }

    public void checkMaxNumber(int a, int b) {
        if (a > b) {
            System.out.println("두 수 중 큰 수는 " + a + "이다.");
        } else {
            System.out.println("두 수 중 큰 수는 " + b + "이다.");
        }
    }

    public void sumTwoNumber(int a, int b) {
        System.out.println(a + "과 " + b + "의 합은 : " + (a + b));
    }

    public void minusTwoNumber(int a, int b) {
        System.out.println(a + "과 " + b + "의 차는 : " + (a - b));
    }
}
