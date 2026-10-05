export default function Header() {
    return (
        <header
            style={{
                position: "relative",
                padding: "35px 25px 25px",
                textAlign: "center",

                background:
                    "linear-gradient(135deg, #fff0f7, #fffbea, #f4fff7)",

                borderRadius: "25px 25px 0px 0px",

                border:
                    "2px solid rgba(255, 160, 200, 0.35)",

                boxShadow:
                    "0 10px 30px rgba(220, 100, 160, 0.15)",

                overflow: "hidden"
            }}
        >

            {/* 🌸 위쪽 꽃 장식 */}
            <div
                style={{
                    fontSize: "28px",
                    letterSpacing: "15px",
                    marginBottom: "10px"
                }}
            >
                🌸 🌷 🌺
            </div>


            {/* 제목 */}
            <h1
                style={{
                    margin: "0",

                    color: "#a83f70",

                    fontSize: "38px",
                    fontWeight: "900",

                    letterSpacing: "2px",

                    textShadow:
                        "2px 2px 0 white, 0 0 15px rgba(255, 120, 180, 0.45)"
                }}
            >
                🌿 사람 추가 기능 🌿
            </h1>


            {/* 설명 */}
            <p
                style={{
                    marginTop: "12px",
                    marginBottom: "0",

                    color: "#9b6680",

                    fontSize: "15px",
                    fontWeight: "600"
                }}
            >
                새로운 사람을 아름다운 꽃밭에 심어보세요 🌼
            </p>


            {/* 아래쪽 꽃 장식 */}
            <div
                style={{
                    marginTop: "18px",
                    fontSize: "22px",
                    letterSpacing: "10px",
                    opacity: "0.8"
                }}
            >
                🌼 🌻 🌹 🌼
            </div>

        </header>
    )
}