package prc;

public class Method {
    static void main(String[] args) {

        Method number = new Method();
        System.out.println(number.num1(9000024, 25341));

        System.out.println(Method.num1(642346, 132));

        Calculator cal = new Calculator();
        System.out.println(cal.min(253, 7000));

        System.out.println(Calculator.max(515151, 2345));
    }

    public static float num1(float first, float second) {
        float result = first / second;
        return result;
    }
}
