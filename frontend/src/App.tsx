import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { StoreCard } from "./components/StoreCard";
import { AddStoreForm } from "./components/AddStoreForm";
import { Store } from "./lib/types";
import { ThemeToggle } from "./components/ThemeToggle";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-background text-foreground">
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Store Management</h1>
              <ThemeToggle />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Add New Store</h2>
                <AddStoreForm />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Existing Stores</h2>
                <Query />
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function Query() {
  const { isLoading, error, data, isFetching } = useQuery<{
    stores: Store[];
    total: number;
    page: number;
    page_size: number;
  }>({
    queryKey: ["storesData"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:8080/stores?area_binaryId=${encodeURIComponent(
          "\x00\x01"
        )}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  if (isLoading) return <div className="text-center p-4">Loading...</div>;

  if (error instanceof Error)
    return (
      <div className="text-center p-4 text-red-500">
        An error has occurred: {error.message}
      </div>
    );

  return (
    <>
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
          <strong>Total:</strong> {data?.total}
        </p>
        <p>
          <strong>Page:</strong> {data?.page} / <strong>Page Size:</strong>{" "}
          {data?.page_size}
        </p>
      </div>
      {isFetching && <div className="text-center mt-4">Updating...</div>}
    </>
  );
}

// import {
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
// } from "@tanstack/react-query";
// import { ThemeProvider } from "@/components/theme-provider";
// import { StoreCard } from "./components/StoreCard";
// import { AddStoreForm } from "./components/AddStoreForm";
// import { Store } from "./lib/types";
// import { ThemeToggle } from "./components/ThemeToggle";

// const queryClient = new QueryClient();

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
//         <div className="min-h-screen bg-background text-foreground">
//           <div className="container mx-auto p-4">
//             <div className="flex justify-between items-center mb-6">
//               <h1 className="text-3xl font-bold">Store Management</h1>
//               <ThemeToggle />
//             </div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <div>
//                 <h2 className="text-2xl font-semibold mb-4">Add New Store</h2>
//                 <AddStoreForm />
//               </div>
//               <div>
//                 <h2 className="text-2xl font-semibold mb-4">Existing Stores</h2>
//                 <Query />
//               </div>
//             </div>
//           </div>
//         </div>
//       </ThemeProvider>
//     </QueryClientProvider>
//   );
// }

// function Query() {
//   const { isLoading, error, data, isFetching } = useQuery<{
//     stores: Store[];
//     total: number;
//     page: number;
//     page_size: number;
//   }>({
//     queryKey: ["storesData"],
//     queryFn: async () => {
//       const response = await fetch(
//         `http://localhost:8080/stores?area_binaryId=${encodeURIComponent(
//           "\x00\x01"
//         )}`
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     },
//   });

//   if (isLoading) return <div className="text-center p-4">Loading...</div>;

//   if (error instanceof Error)
//     return (
//       <div className="text-center p-4 text-red-500">
//         An error has occurred: {error.message}
//       </div>
//     );

//   return (
//     <>
//       {data?.stores && data.stores.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {data.stores.map((store) => (
//             <StoreCard key={store.id} store={store} />
//           ))}
//         </div>
//       ) : (
//         <p className="text-center">No stores found</p>
//       )}
//       <div className="mt-6 flex justify-between items-center">
//         <p>
//           <strong>Total:</strong> {data?.total}
//         </p>
//         <p>
//           <strong>Page:</strong> {data?.page} / <strong>Page Size:</strong>{" "}
//           {data?.page_size}
//         </p>
//       </div>
//       {isFetching && <div className="text-center mt-4">Updating...</div>}
//     </>
//   );
// }

// // import {
// //   QueryClient,
// //   QueryClientProvider,
// //   useQuery,
// // } from "@tanstack/react-query";
// // import { ThemeProvider } from "@/components/theme-provider";
// // import { StoreCard } from "./components/StoreCard";
// // import { Store } from "./lib/types";
// // import { ThemeToggle } from "@/components/ThemeToggle";

// // const queryClient = new QueryClient();

// // export default function App() {
// //   return (
// //     <QueryClientProvider client={queryClient}>
// //       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
// //         <div className="min-h-screen bg-background text-foreground">
// //           <div className="container mx-auto p-4">
// //             <div className="flex justify-between items-center mb-6">
// //               <h1 className="text-3xl font-bold">Stores</h1>
// //               <ThemeToggle />
// //             </div>
// //             <Query />
// //           </div>
// //         </div>
// //       </ThemeProvider>
// //     </QueryClientProvider>
// //   );
// // }

// // function Query() {
// //   const { isLoading, error, data, isFetching } = useQuery<{
// //     stores: Store[];
// //     total: number;
// //     page: number;
// //     page_size: number;
// //   }>({
// //     queryKey: ["storesData"],
// //     queryFn: async () => {
// //       const response = await fetch(
// //         `http://localhost:8080/stores?area_binaryId=${encodeURIComponent(
// //           "\x00\x01"
// //         )}`
// //       );
// //       if (!response.ok) {
// //         throw new Error("Network response was not ok");
// //       }
// //       return response.json();
// //     },
// //   });

// //   if (isLoading) return <div className="text-center p-4">Loading...</div>;

// //   if (error instanceof Error)
// //     return (
// //       <div className="text-center p-4 text-red-500">
// //         An error has occurred: {error.message}
// //       </div>
// //     );

// //   return (
// //     <>
// //       {data?.stores && data.stores.length > 0 ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {data.stores.map((store) => (
// //             <StoreCard key={store.id} store={store} />
// //           ))}
// //         </div>
// //       ) : (
// //         <p className="text-center">No stores found</p>
// //       )}
// //       <div className="mt-6 flex justify-between items-center">
// //         <p>
// //           <strong>Total:</strong> {data?.total}
// //         </p>
// //         <p>
// //           <strong>Page:</strong> {data?.page} / <strong>Page Size:</strong>{" "}
// //           {data?.page_size}
// //         </p>
// //       </div>
// //       {isFetching && <div className="text-center mt-4">Updating...</div>}
// //     </>
// //   );
// // }

// // import {
// //   QueryClient,
// //   QueryClientProvider,
// //   useQuery,
// // } from "@tanstack/react-query";
// // import { StoreCard } from "./components/StoreCard";
// // import { Store } from "./lib/types";
// // import { ThemeProvider } from "@/components/theme-provider"

// // const queryClient = new QueryClient();

// // export default function App() {
// //   return (
// //     <QueryClientProvider client={queryClient}>
// //       <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"></ThemeProvider>
// //       <Query />
// //       </ThemeProvider>
// //     </QueryClientProvider>
// //   );
// // }

// // function Query() {
// //   const { isLoading, error, data, isFetching } = useQuery<{
// //     stores: Store[];
// //     total: number;
// //     page: number;
// //     page_size: number;
// //   }>({
// //     queryKey: ["storesData"],
// //     queryFn: async () => {
// //       const response = await fetch(
// //         `http://localhost:8080/stores?area_binaryId=${encodeURIComponent(
// //           "\x00\x01"
// //         )}`
// //       );
// //       if (!response.ok) {
// //         throw new Error("Network response was not ok");
// //       }
// //       return response.json();
// //     },
// //   });

// //   if (isLoading) return <div className="text-center p-4">Loading...</div>;

// //   if (error instanceof Error)
// //     return (
// //       <div className="text-center p-4 text-red-500">
// //         An error has occurred: {error.message}
// //       </div>
// //     );

// //   return (
// //     <div className="container mx-auto p-4">
// //       <h1 className="text-3xl font-bold mb-6">Stores</h1>
// //       {data?.stores && data.stores.length > 0 ? (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {data.stores.map((store) => (
// //             <StoreCard key={store.id} store={store} />
// //           ))}
// //         </div>
// //       ) : (
// //         <p className="text-center">No stores found</p>
// //       )}
// //       <div className="mt-6 flex justify-between items-center">
// //         <p>
// //           <strong>Total:</strong> {data?.total}
// //         </p>
// //         <p>
// //           <strong>Page:</strong> {data?.page} / <strong>Page Size:</strong>{" "}
// //           {data?.page_size}
// //         </p>
// //       </div>
// //       {isFetching && <div className="text-center mt-4">Updating...</div>}
// //     </div>
// //   );
// // }

// // import ReactDOM from "react-dom/client";
// // import {
// //   QueryClient,
// //   QueryClientProvider,
// //   useQuery,
// // } from "@tanstack/react-query";

// // // Create a new QueryClient
// // const queryClient = new QueryClient();

// // export default function App() {
// //   return (
// //     <QueryClientProvider client={queryClient}>
// //       <Query />
// //     </QueryClientProvider>
// //   );
// // }

// // function Query() {
// //   // Use TanStack Query for fetching data
// //   const { isLoading, error, data, isFetching } = useQuery({
// //     queryKey: ["repoData"],
// //     queryFn: async () => {
// //       const response = await fetch(
// //         `http://localhost:8080/stores?area_binaryId=${encodeURIComponent(
// //           "\x00\x01"
// //         )}`
// //       );
// //       if (!response.ok) {
// //         throw new Error("Network response was not ok");
// //       }
// //       return response.json();
// //     },
// //   });

// //   if (isLoading) return "Loading...";

// //   if (error instanceof Error) return "An error has occurred: " + error.message;

// //   return (
// //     <div>
// //       <h1>Stores</h1>
// //       {data.stores && data.stores.length > 0 ? (
// //         <ul>
// //           {data.stores.map((store: any) => (
// //             <li key={store.id}>
// //               <p>
// //                 <strong>Name:</strong> {store.name}
// //               </p>
// //               <p>
// //                 <strong>Area:</strong> {store.area_name} (ID: {store.area_id})
// //               </p>
// //             </li>
// //           ))}
// //         </ul>
// //       ) : (
// //         <p>No stores found</p>
// //       )}
// //       <p>
// //         <strong>Total:</strong> {data.total}
// //       </p>
// //       <p>
// //         <strong>Page:</strong> {data.page} / <strong>Page Size:</strong>{" "}
// //         {data.page_size}
// //       </p>
// //       <div>{isFetching ? "Updating..." : ""}</div>
// //     </div>
// //   );
// // }

// // // Render the app
// // const rootElement = document.getElementById("root") as HTMLElement;
// // ReactDOM.createRoot(rootElement).render(<App />);
