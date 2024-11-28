import { createFileRoute } from "@tanstack/react-router";
import { AddStoreForm } from "@/components/AddStoreForm";

export const Route = createFileRoute("/create-store")({
  component: AddStorePage,
});

function AddStorePage() {
  return (
    <div className="p-2">
      <div>
        <h1 className="text-3xl font-bold mb-6">Add New Store</h1>
        <AddStoreForm />
      </div>
    </div>
  );
}

export default AddStorePage;
