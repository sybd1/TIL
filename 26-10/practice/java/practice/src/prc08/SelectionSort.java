package prc08;

import java.util.Arrays;

public class SelectionSort {
    static void main() {

//        Selection Sort (선택 정렬)
        int[] arr = {35, 17, 354, 7457, 234, 173, 8245, 7667, 5456,
                633665, 7447, 35635, 23, 5897, 23, 21, 5426, 45, 4625762,
                24567, 324532, 679768, 214, 5326, 53899, 1231, 45, 122, 4545,
                34, 789, 2342, 4566, 123412, 37863568, 456458, 3262, 234631};

        for (int i = 0; i < arr.length - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[minIndex] > arr[j]) {
                    minIndex = j;
                }
            }
            int temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
        System.out.println(Arrays.toString(arr));
    }
}
