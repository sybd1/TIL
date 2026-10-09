package prc09.abstraction;

import java.util.Scanner;

public class Human {

    private final Nmixx nmixx = new Nmixx();

    public void chooseLilly(Scanner sc) {
        while (true) {
            System.out.println("1. A");
            System.out.println("2. B");
            System.out.println("3. 뒤로가기");
            System.out.print("릴리에게 어떤 말을 들을까요? ");

            int no = sc.nextInt();

            switch (no) {
                case 1:
                    nmixx.lillySentenceA();
                    break;
                case 2:
                    nmixx.lillySentenceB();
                    break;
                case 3:
                    return;
                default:
                    System.out.println("올바른 번호를 골라주세요.");
                    break;
            }
            System.out.println();
        }
    }

    public void chooseHaewon(Scanner sc) {
        while (true) {
            System.out.println("1. A");
            System.out.println("2. B");
            System.out.println("3. 뒤로가기");
            System.out.print("해원에게 어떤 말을 들을까요? ");

            int no = sc.nextInt();

            switch (no) {
                case 1:
                    nmixx.haewonSentenceA();
                    break;
                case 2:
                    nmixx.haewonSentenceB();
                    break;
                case 3:
                    return;
                default:
                    System.out.println("올바른 번호를 골라주세요.");
                    break;
            }
            System.out.println();
        }
    }

    public void chooseSullyoon(Scanner sc) {
        while (true) {
            System.out.println("1. A");
            System.out.println("2. B");
            System.out.println("3. 뒤로가기");
            System.out.print("설윤에게 어떤 말을 들을까요? ");

            int no = sc.nextInt();

            switch (no) {
                case 1:
                    nmixx.sullyoonSentenceA();
                    break;
                case 2:
                    nmixx.sullyoonSentenceB();
                    break;
                case 3:
                    return;
                default:
                    System.out.println("올바른 번호를 골라주세요.");
                    break;
            }
            System.out.println();
        }
    }

    public void chooseBae(Scanner sc) {
        while (true) {
            System.out.println("1. A");
            System.out.println("2. B");
            System.out.println("3. 뒤로가기");
            System.out.print("배이에게 어떤 말을 들을까요? ");

            int no = sc.nextInt();

            switch (no) {
                case 1:
                    nmixx.baeSentenceA();
                    break;
                case 2:
                    nmixx.baeSentenceB();
                    break;
                case 3:
                    return;
                default:
                    System.out.println("올바른 번호를 골라주세요.");
                    break;
            }
            System.out.println();
        }
    }

    public void chooseJiwoo(Scanner sc) {
        while (true) {
            System.out.println("1. A");
            System.out.println("2. B");
            System.out.println("3. 뒤로가기");
            System.out.print("지우에게 어떤 말을 들을까요? ");

            int no = sc.nextInt();

            switch (no) {
                case 1:
                    nmixx.jiwooSentenceA();
                    break;
                case 2:
                    nmixx.jiwooSentenceB();
                    break;
                case 3:
                    return;
                default:
                    System.out.println("올바른 번호를 골라주세요.");
                    break;
            }
            System.out.println();
        }
    }

    public void chooseKyujin(Scanner sc) {
        while (true) {
            System.out.println("1. A");
            System.out.println("2. B");
            System.out.println("3. 뒤로가기");
            System.out.print("규진에게 어떤 말을 들을까요? ");

            int no = sc.nextInt();

            switch (no) {
                case 1:
                    nmixx.kyujinSentenceA();
                    break;
                case 2:
                    nmixx.kyujinSentenceB();
                    break;
                case 3:
                    return;
                default:
                    System.out.println("올바른 번호를 골라주세요.");
                    break;
            }
            System.out.println();
        }
    }
}
