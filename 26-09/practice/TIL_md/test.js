// const name = '해원';

// const member = function() {
//     const hello = '배이';
//     console.log(hello);     // 배이
//     console.log(name);      // 해원
// };
// member();
// console.log(hello);         // hello is not defined
// console.log(name);          // 해원

const user = {
    name : '릴리'
};
// console.log(user.age.height);   // Error

console.log(user?.age?.height); // undefined


const test = null ?? '설윤';
console.log(test);

const students = [
    { name: '박진', score: 90 },
    { name: '오해원', score: 80 },
    { name: '설윤아', score: 95 }
];

students.forEach(member => {
console.log(member.name)
});

const jyp = students.map(member => member.name);
console.log(jyp);