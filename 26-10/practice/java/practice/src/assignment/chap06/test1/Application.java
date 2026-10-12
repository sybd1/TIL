package assignment.chap06.test1;

public class Application {
    static void main() {

        BookDTO book = new BookDTO();
        book.getInformation();

        BookDTO book1 = new BookDTO("자바의 정석", "도우출판", "남궁성");
        book1.getInformation();

        BookDTO book2 = new BookDTO("홍길동전", "활빈당", "허균", 5000000, 0.5);
        book2.getInformation();
    }
}
