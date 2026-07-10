import { Item } from "@/types/item";
import AllItemsClient from "../components/others ui/AllItemsClient";
// import AllItemsClient from "./AllItemsClient";

const AllItemsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/items`, {
    cache: "no-store",
  });

  console.log(process.env.NEXT_PUBLIC_SERVER_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch items");
  }

  const items: Item[] = await res.json();
  console.log(items);

  // ক্লায়েন্ট কম্পোনেন্টে ডাটা পাঠিয়ে দেওয়া হচ্ছে
  return <AllItemsClient initialItems={items} />;
};

export default AllItemsPage;