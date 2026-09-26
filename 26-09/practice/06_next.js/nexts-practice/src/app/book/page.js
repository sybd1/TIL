'use client'

import { useState } from "react"

export default function Book() {
    
    const [time, setTime] = useState(1);

    const changeTime = () => {
        let newTime;
        if (time >= 12) {
            newTime = 1;
        } else {
            newTime = time + 1;
        }
        setTime(newTime);
    };

    console.log('업데이트');

    return (
        <>
            <h2>똑딱똑딱! 시계!</h2>
            <div>
                <span>현재 시각은 {time}시입니다.</span>
                <button onClick={changeTime}>update</button>
            </div>
        </>
    )
}
