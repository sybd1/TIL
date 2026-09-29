// 기초 1. 합격 안내
// 점수 72점인 수강생의 결과를 콘솔에 출력하세요.

// const name = "수강생";
// const score = 72;

// // TODO 1. score가 60 이상이면 "합격", 아니면 "불합격"을 result에 넣으세요.
// let result;

// // result = score >= 60 ? '합격' : '불합격'

// if (score >= 60) {
//     result = '합격'
// } else {
//     result = '불합격'
// }


// TODO 2. 아래 형식 그대로 한 줄 출력하세요.
// 수강생님의 점수는 72점입니다. 결과: 합격
// 힌트: 백틱과 ${ }를 사용합니다.
// console.log(`${name}님의 점수는 ${score}점입니다. 결과: ${result}`);

// TODO 3. score를 50으로 바꿨을 때도 같은 코드가 맞게 동작하는지 생각해 보세요.
//        지금은 72인 상태로만 실행하면 됩니다.




// 기초 2. 짝수 안내
// 숫자 14가 짝수인지 홀수인지 콘솔에 출력하세요.

// const number = 14;

// // TODO 1. number를 2로 나눈 나머지가 0이면 "짝수", 아니면 "홀수"를 kind에 넣으세요.
// let kind;

// kind = (number % 2 === 0 ? '짝수' : '홀수')

// console.log(`${number}는 ${kind}입니다.`)

// // TODO 2. 아래 형식 그대로 한 줄 출력하세요.
// // 14는 짝수입니다.



// 기초 3. 가격 합계
// 세 물건 가격을 모두 더한 뒤 콘솔에 출력하세요.

// const prices = [1500, 3000, 2500];

// // TODO 1. total에 0을 넣고, for...of로 prices를 한 칸씩 더하세요.
// // let total = prices.reduce((a, b) => a + b, 0);
// let total = 0;

// for (let price of prices) {
//     total += price;
// }

// console.log(`총액은 ${total}원입니다.`)

// TODO 2. 아래 형식 그대로 한 줄 출력하세요.
// 총액은 7000원입니다.


// 기초 4. 합격 인원
// 80점 이상인 점수가 몇 개인지 세어 콘솔에 출력하세요.

// const scores = [85, 62, 95, 78, 40, 99, 80];

// // TODO 1. count를 0으로 두세요.
// // TODO 2. for...of로 scores를 돌면서, 80 이상이면 count에 1을 더하세요.
// let count = 0;

// for (const score of scores) {
//     if (score >= 80) {
//         count += 1;
//     }
// }

// console.log(`80점 이상은 ${count}명입니다.`)

// TODO 3. 아래 형식 그대로 한 줄 출력하세요.
// 80점 이상은 4명입니다.



// 기초 5. 최고 점수
// scores에서 가장 큰 숫자를 찾아 콘솔에 출력하세요.

// const scores1 = [85, 62, 95, 78, 40, 99, 80];

// // TODO 1. max에 첫 점수 scores[0]을 넣으세요.
// // TODO 2. for...of로 scores를 돌면서, 지금 점수가 max보다 크면 max를 그 점수로 바꾸세요.
// let max = scores1[0];

// for (const score1 of scores1) {
//     if (score1 > max) {
//         max = score1
//     }
// }
// console.log(`최고 점수는 ${max}점입니다.`)

// TODO 3. 아래 형식 그대로 한 줄 출력하세요.
// 최고 점수는 99점입니다.





// 중급 1. 합격 인원 함수
// 점수 배열과 기준 점수를 받아, 기준 이상인 개수를 돌려주세요.

// const scoress = [85, 62, 95, 78, 40, 99, 80];

// // TODO 1. countPass(scores, cut)를 선언하세요.
// // TODO 2. 함수 안에서 count를 0으로 두고, for...of로 scores를 도세요.
// // TODO 3. 점수가 cut 이상이면 count에 1을 더하세요.
// // TODO 4. 반복이 끝나면 count를 return하세요.

// function countPass(scores, cut) {
//     let count = 0;

//     for (const score of scores) {
//         if (score >= cut) {
//             count += 1;
//         }
//     }
//     return count;
// }

// console.log(`80점 이상은 ${countPass(scoress, 80)}명입니다.`);
// console.log(`90점 이상은 ${countPass(scoress, 90)}명입니다.`);




// 중급 2. 합격자 이름
// 80점 이상인 학생의 이름을 모아 한 줄로 출력하세요.

const students = [
    { name: "윤아", score: 85 },
    { name: "릴리", score: 62 },
    { name: "민수", score: 95 },
    { name: "지수", score: 78 },
    { name: "하나", score: 40 },
    { name: "태리", score: 99 },
    { name: "서윤", score: 80 },
];

// TODO 1. getPassNames(students, cut)를 선언하세요.
// TODO 2. 빈 배열 names를 만드세요.
// TODO 3. for...of로 students를 도세요.
// TODO 4. student.score가 cut 이상이면 names에 student.name을 넣으세요. (push)
// TODO 5. 반복이 끝나면 names를 return하세요.

function getPassNames(students, cut) {
    const names = []

    for (const student of students) {
        if (student.score >= cut) {
            names.push(student.name);
        }
    }
    return names;
}

const passNames = getPassNames(students, 80);

console.log(`합격자: ${passNames.join(", ")}`);


// TODO 6. 아래 형식 그대로 한 줄 출력하세요.
// 합격자: 윤아, 민수, 태리, 서윤
// 힌트: passNames.join(", ")