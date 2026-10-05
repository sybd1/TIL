'use client'

import { useEffect, useRef, useState } from "react";
import { getItems, addItem, deleteItem } from "@/api/route"

export default function ItemList() {
    const [items, setItems] = useState([]);
    const [keyword, setKeyword] = useState('');
    const inputRef = useRef(null);

    // 조회
    const loadItems = async () => {
        try {
            const data = await getItems();

            setItems(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    // 추가
    const handleAdd = async () => {
        try {
            const newItem = await addItem(keyword);

            setItems([...items, newItem]);
            setKeyword('');

            inputRef.current.focus();
        } catch (error) {
            console.error(error);
        }
    };

    // 삭제
    const handleDelete = async (id) => {
        try {
            await deleteItem(id);

            setItems(items.filter((item) => item.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div
                style={{
                    minHeight: "100vh",
                    padding: "60px 20px",
                    textAlign: "center",

                    background:
                        "radial-gradient(circle at 20% 20%, rgba(255, 182, 193, 0.5), transparent 25%)," +
                        "radial-gradient(circle at 80% 30%, rgba(255, 230, 150, 0.5), transparent 25%)," +
                        "radial-gradient(circle at 30% 80%, rgba(180, 230, 200, 0.5), transparent 30%)," +
                        "linear-gradient(135deg, #fff5f8, #fffdf0, #f3fff7)",

                    borderRadius: "30px",
                    boxShadow: "inset 0 0 80px rgba(255, 150, 200, 0.2)"
                }}
            >

                {/* 🌸 제목 */}
                <h1
                    style={{
                        color: "#b83b72",
                        fontSize: "42px",
                        fontWeight: "900",
                        marginBottom: "35px",

                        textShadow:
                            "2px 2px 0 white, 0 0 15px rgba(255, 100, 180, 0.6)"
                    }}
                >
                    🌸 🌸 🌸 🌸 🌸 🌸

                </h1>


                {/* 🌷 검색창 + 추가 버튼 */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "30px"
                    }}
                >

                    <input
                        ref={inputRef}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        placeholder="이곳에서 심어보세요."
                        style={{
                            width: "300px",
                            padding: "14px 18px",

                            border: "3px solid #ff9bc5",
                            borderRadius: "30px",

                            background: "rgba(255, 255, 255, 0.85)",

                            fontSize: "16px",
                            outline: "none",

                            boxShadow:
                                "0 5px 15px rgba(255, 130, 180, 0.25)",

                            color: "#6d4057"
                        }}
                    />

                    <button
                        onClick={handleAdd}
                        style={{
                            padding: "13px 22px",

                            border: "none",
                            borderRadius: "30px",

                            background:
                                "linear-gradient(135deg, #ff72ad, #ff9b6a, #ffc85c)",

                            color: "white",
                            fontWeight: "900",
                            fontSize: "15px",

                            cursor: "pointer",

                            boxShadow:
                                "0 6px 15px rgba(255, 100, 160, 0.4)"
                        }}
                    >
                        🌷 추가
                    </button>

                </div>


                {/* 🌺 목록 */}
                <ul
                    style={{
                        width: "360px",
                        margin: "40px auto",
                        padding: "0",

                        listStyle: "none",

                        display: "flex",
                        flexDirection: "column",
                        gap: "15px"
                    }}
                >

                    {items.map((item) => (

                        <li
                            key={item.id}
                            style={{
                                padding: "20px",

                                borderRadius: "25px",

                                background:
                                    "rgba(255, 255, 255, 0.8)",

                                border:
                                    "2px solid rgba(255, 160, 200, 0.5)",

                                boxShadow:
                                    "0 8px 20px rgba(120, 80, 100, 0.15)",

                                color: "#6d4057",

                                fontSize: "18px",
                                fontWeight: "bold"
                            }}
                        >

                            🌺 {item.name}

                            <br />

                            <button
                                onClick={() => handleDelete(item.id)}
                                style={{
                                    marginTop: "10px",

                                    padding: "7px 16px",

                                    border: "none",
                                    borderRadius: "20px",

                                    background:
                                        "linear-gradient(135deg, #8fd694, #57b894)",

                                    color: "white",

                                    fontWeight: "bold",

                                    cursor: "pointer",

                                    boxShadow:
                                        "0 4px 10px rgba(70, 180, 120, 0.3)"
                                }}
                            >
                                🌿 삭제
                            </button>

                        </li>

                    ))}

                </ul>

            </div>
        </>
    );
}