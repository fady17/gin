import { Store } from "@/lib/types";

export const fetchStores = async (areaBinaryId: string = "\x00\x01") => {
  const response = await fetch(
    `http://localhost:8080/stores?area_binaryId=${encodeURIComponent(areaBinaryId)}`
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const createStore = async (storeData: Partial<Store>) => {
  const response = await fetch("http://localhost:8080/stores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(storeData),
  });

  if (!response.ok) {
    throw new Error("Failed to create store");
  }

  return response.json();
};
