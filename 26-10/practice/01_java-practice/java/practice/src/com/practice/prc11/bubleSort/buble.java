package com.practice.prc11.bubleSort;

import java.util.Arrays;

public class buble {
    static void main() {

        int[] arr = {5, 9, 4, 2, 1, 8, 6, 3, 7};

        for (int i = arr.length - 1; i > 0; i--) {
            for (int j = 0; j < i; j++) {
                if (arr[j] > arr[j + 1]) {

                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        System.out.println(Arrays.toString(arr));
    }
}
