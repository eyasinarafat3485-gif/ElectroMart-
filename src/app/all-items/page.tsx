import { Item } from "@/types/item";
import AllItemsClient from "../components/others ui/AllItemsClient";

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

  return <AllItemsClient initialItems={items} />;
};

export default AllItemsPage;