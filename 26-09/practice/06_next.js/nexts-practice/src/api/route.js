const BASE_URL = "http://localhost:4000/items"

// 조회
export async function getItems() {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
        throw new Error("목록을 가져오지 못했습니다.");
    }

    return response.json();
}

// 추가
export async function addItem(name) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
        }),
    });

    if (!response.ok) {
        throw new Error("추가하지 못했습니다.");
    }

    return response.json();
}


// 삭제
export async function deleteItem(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("삭제하지 못했습니다.");
    }
}