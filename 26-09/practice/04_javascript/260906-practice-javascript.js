// 누구의 쿠기 개수가 가장 적은가?
// const cookieCounts = [15, 42, 8, 99, 3, 24]; //6명이 가지고 온 쿠키 개수. 변하지 않음.
// let minCookie = cookieCounts[0]; // 임시 꼴지 '칠판'에 적어두기. 칠판엔 하나의 값만 적을 수 있다.
// for (const count of cookieCounts) { // 한 사람씩 가지고 온 쿠키 개수를 칠판에 적힌 숫자와 비교하는 행동.
//     if (count < minCookie) {
//         minCookie = count;
//     }
// }
// console.log(minCookie);

// 80점 이상의 점수는 몇 명인가?
// const scores = [85, 62, 95, 78, 40, 99, 80];
// let count = 0;
// for (const result of scores) {
//     if (result >= 80) {
//     count = count + 1;
//     }
// }
// console.log(count);

//모든 값을 더 해보자
// const prices = [1500, 3000, 2500, 1000, 4200];
// let total = 0;
// for (box of prices) {
//     total = total + box
// }
// console.log(total);

//모든 값을 빼보자
// const prices = [6468, 436845, 8624683, 268468, 1235, 1315, 51318]
// let total = 0;
// for (const de of prices) {
//     total = total - de
// }
// console.log(total);

//짝수만 골라서 합산하기
// const number = [3, 12, 7, 8, 20, 5, 14];
// let total = 0;
// for (const pr of number) {
//     if (pr % 2 === 0)
//         total = total + pr
// }
// console.log(total)

const cookie = [10, 65, 15, 79, 12, 9];
let maxCookie = cookie[0];
    for (const count of cookie) {
        if (count > maxCookie) {
            maxCookie = count;
        }
    }
    console.log(maxCookie);