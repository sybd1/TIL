package prc09.abstraction;

import java.util.Scanner;

public class Application {
    static void main() {

        Human human = new Human();
        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println("1. 릴리");
            System.out.println("2. 해원");
            System.out.println("3. 설윤");
            System.out.println("4. 배이");
            System.out.println("5. 지우");
            System.out.println("6. 규진");
            System.out.println("9. 운세 프로그램 종료");
            System.out.print("어떤 멤버에게 운세를 듣고 싶나요? ");

            int no = sc.nextInt();

            switch (no) {
                case 1:
                    human.chooseLilly(sc);
                    break;
                case 2:
                    human.chooseHaewon(sc);
                    break;
                case 3:
                    human.chooseSullyoon(sc);
                    break;
                case 4:
                    human.chooseBae(sc);
                    break;
                case 5:
                    human.chooseJiwoo(sc);
                    break;
                case 6:
                    human.chooseKyujin(sc);
                    break;
                case 9:
                    System.out.println("프로그램을 종료합니다.");
                    return;
                default:
                    System.out.println("올바른 번호를 골라주세요. 뒈지기 싫으면.");
                    System.out.println();
                    break;
            }
        }
    }
}
