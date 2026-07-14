import { Item } from "@/types/item";
import AllItemsClient from "../components/others ui/AllItemsClient";

const AllItemsPage = async (): Promise<React.JSX.Element> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/items`, {
    cache: "no-store",
    next: { revalidate: 0 }, 
  });

  console.log("Server URL:", process.env.NEXT_PUBLIC_SERVER_URL);

  if (!res.ok) {
    throw new Error(`Failed to fetch items: ${res.status} ${res.statusText}`);
  }

  const items: Item[] = await res.json();

  console.log("Fetched Items Count:", items.length);

  return <AllItemsClient initialItems={items} />;
};

export default AllItemsPage;