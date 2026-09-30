'use client'

import { usePathname, useRouter } from "next/navigation"


export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    const activeStyle = {
        backgroundColor: 'pink',
        color: 'white'
    }

    return (
        <>
            <nav
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",

                    padding: "15px 25px",
                    marginBottom: "25px",

                    background:
                        "linear-gradient(135deg, rgba(255, 235, 245, 0.95), rgba(255, 250, 225, 0.95))",

                    borderRadius: "0 0 25px 25px",

                    borderBottom:
                        "3px solid rgba(255, 150, 200, 0.5)",

                    boxShadow:
                        "0 8px 25px rgba(220, 100, 160, 0.18)",

                    position: "relative",
                    overflow: "hidden"
                }}
            >

                {/* 🌸 장식 */}
                <div
                    style={{
                        fontSize: "25px",
                        letterSpacing: "8px",
                        whiteSpace: "nowrap"
                    }}
                >
                    🌸 🌷
                </div>


                {/* 현재 주소 */}
                <p
                    style={{
                        margin: "0",
                        color: "#9b5275",
                        fontSize: "14px",
                        fontWeight: "bold",

                        background: "rgba(255, 255, 255, 0.65)",
                        padding: "8px 15px",
                        borderRadius: "20px",

                        boxShadow:
                            "inset 0 0 10px rgba(255, 150, 200, 0.15)"
                    }}
                >
                    🌿 현재 주소: {
                        pathname === "/" ? "메인 페이지"
                            : pathname === "/addList" ? "목록 페이지"
                                : "알 수 없는 페이지"
                    }
                </p>


                {/* 메뉴 */}
                <div
                    style={{
                        display: "flex",
                        gap: "10px"
                    }}
                >

                    <button
                        onClick={() => router.push("/")}
                        style={{
                            ...(isActive("/") ? activeStyle : {}),
                            padding: "10px 18px",

                            border: "none",
                            borderRadius: "25px",

                            background: isActive("/")
                                ? "linear-gradient(135deg, #ff72ad, #ff9b6a)"
                                : "rgba(255, 255, 255, 0.75)",

                            color: isActive("/")
                                ? "white"
                                : "#a04d72",

                            fontWeight: "bold",
                            fontSize: "14px",

                            cursor: "pointer",

                            boxShadow: isActive("/")
                                ? "0 5px 15px rgba(255, 100, 160, 0.35)"
                                : "0 3px 8px rgba(200, 120, 160, 0.12)"
                        }}
                    >
                        🌸 메인 이동
                    </button>


                    <button
                        onClick={() => router.push("/addList")}
                        style={{
                            ...(isActive("/addList") ? activeStyle : {}),
                            padding: "10px 18px",

                            border: "none",
                            borderRadius: "25px",

                            background: isActive("/addList")
                                ? "linear-gradient(135deg, #ff72ad, #ff9b6a)"
                                : "rgba(255, 255, 255, 0.75)",

                            color: isActive("/addList")
                                ? "white"
                                : "#a04d72",

                            fontWeight: "bold",
                            fontSize: "14px",

                            cursor: "pointer",

                            boxShadow: isActive("/addList")
                                ? "0 5px 15px rgba(255, 100, 160, 0.35)"
                                : "0 3px 8px rgba(200, 120, 160, 0.12)"
                        }}
                    >
                        🌷 목록 이동
                    </button>

                </div>

            </nav>
        </>
    )
}