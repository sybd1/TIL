'use client'

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handelmove = () => {
    router.push("/alist")
  }

  return (
    <>
      <h1>라우터 연습</h1>
      <div>
        <button onClick={handelmove}>alist 링크 이동</button>
      </div>
    </>
  )
}
