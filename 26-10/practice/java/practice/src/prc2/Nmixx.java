package prc2;

public class Nmixx {
    static void main(String[] args) {

        String all = Nmixx.member("설윤아", "김지우");
        System.out.println(all);

        Nmixx.member2("릴리", "해원");

        Nmixx nswer = new Nmixx();
        nswer.member3("배이", "규진");

    }

    public static String member(String mem1, String mem2) {
        String twoMember = mem1 + "와 " + mem2 + "는 사랑 그 자체입니다.";
        return twoMember;
    }

    public static void member2(String mem1, String mem2) {
        System.out.println(mem1 + "와 " + mem2 + "이는 햇살같이 눈 부십니다.");
    }

    public void member3(String mem1, String mem2) {
        System.out.println(mem1 + "와 " + mem2 + "이는 마른 땅 위의 단비입니다.");
    }
}
