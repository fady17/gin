import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { StoreCard } from "@/components/StoreCard";
import { Store } from "@/lib/types";
import { fetchStores } from "@/lib/stores";

export const Route = createFileRoute("/")({
  component: StorePage,
});

function StorePage() {
  const { isLoading, error, data, isFetching } = useQuery<{
    stores: Store[];
    total: number;
    page: number;
    page_size: number;
  }>({
    queryKey: ["storesData"],
    queryFn: () => fetchStores(),
  });

  if (isLoading)
    return <div className="text-center p-4">Loading stores...</div>;

  if (error instanceof Error) {
    return (
      <div className="text-center p-4 text-red-500">
        An error occurred: {error.message}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Existing Stores</h2>

      {data?.stores && data.stores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      ) : (
        <p className="text-center">No stores found</p>
      )}

      <div className="mt-6 flex justify-between items-center">
        <p>
          <strong>Total Stores:</strong> {data?.total}
        </p>
        <p>
          <strong>Page:</strong> {data?.page} / <strong>Page Size:</strong>{" "}
          {data?.page_size}
        </p>
      </div>

      {isFetching && <div className="text-center mt-4">Updating...</div>}
    </div>
  );
}

export default StorePage;
