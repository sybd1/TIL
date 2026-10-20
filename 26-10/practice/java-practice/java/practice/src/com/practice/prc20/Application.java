package com.practice.prc20;

import com.practice.prc07.Array;

import java.util.Arrays;
import java.util.List;
import java.util.function.Consumer;
import java.util.function.UnaryOperator;

public class Application {
    static void main() {

        Consumer<String> group = System.out::println;
        group.accept("NMIXX");

        List<String> names = Arrays.asList("릴리", "배이", "설윤", "배이", "지우", "규진");

        names.stream()
                .filter(name -> name.length() < 3)
                .map(name -> "[" + name + "]")
                .forEach(nmixx -> System.out.println(nmixx));
    }
}
