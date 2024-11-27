import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NewStore {
  name: string;
  area_id: number;
}

const areas = [
  { id: 0, name: "Cairo" },
  { id: 1, name: "October" },
  { id: 2, name: "Zayed" },
];

async function addStore(newStore: NewStore): Promise<NewStore> {
  const response = await fetch("http://localhost:8080/stores", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newStore),
  });

  if (!response.ok) {
    throw new Error("Failed to add store");
  }

  return response.json();
}

export function AddStoreForm() {
  const [name, setName] = useState("");
  const [areaId, setAreaId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["storesData"] });
      setName("");
      setAreaId(null);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (areaId === null) {
      alert("Please select an area");
      return;
    }
    const newStore: NewStore = { name, area_id: areaId };
    mutation.mutate(newStore);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Add New Store</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Store Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="area">Area</Label>
            <Select
              onValueChange={(value) => setAreaId(Number(value))}
              required
            >
              <SelectTrigger id="area">
                <SelectValue placeholder="Select an area" />
              </SelectTrigger>
              <SelectContent>
                {areas.map((area) => (
                  <SelectItem key={area.id} value={area.id.toString()}>
                    {area.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Adding..." : "Add Store"}
          </Button>
        </CardFooter>
      </form>
      {mutation.isError && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to add store. Please try again.
          </AlertDescription>
        </Alert>
      )}
      {mutation.isSuccess && (
        <Alert className="mt-4">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Store added successfully!</AlertDescription>
        </Alert>
      )}
    </Card>
  );
}

// import { useState } from "react";
// import { useQueryClient, useMutation } from "@tanstack/react-query";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { AlertCircle, CheckCircle2 } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// interface NewStore {
//   name: string;
//   area_id: number;
// }

// async function addStore(newStore: NewStore): Promise<NewStore> {
//   const response = await fetch("http://localhost:8080/stores", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newStore),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to add store");
//   }

//   return response.json();
// }

// export function AddStoreForm() {
//   const [name, setName] = useState("");
//   const [areaId, setAreaId] = useState("");
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: addStore,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["storesData"] });
//       setName("");
//       setAreaId("");
//     },
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newStore: NewStore = { name, area_id: parseInt(areaId, 10) };
//     mutation.mutate(newStore);
//   };

//   return (
//     <Card className="w-full max-w-md">
//       <CardHeader>
//         <CardTitle>Add New Store</CardTitle>
//       </CardHeader>
//       <form onSubmit={handleSubmit}>
//         <CardContent className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Store Name</Label>
//             <Input
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="areaId">Area ID</Label>
//             <Input
//               id="areaId"
//               type="number"
//               value={areaId}
//               onChange={(e) => setAreaId(e.target.value)}
//               required
//             />
//           </div>
//         </CardContent>
//         <CardFooter>
//           <Button type="submit" disabled={mutation.isPending}>
//             {mutation.isPending ? "Adding..." : "Add Store"}
//           </Button>
//         </CardFooter>
//       </form>
//       {mutation.isError && (
//         <Alert variant="destructive" className="mt-4">
//           <AlertCircle className="h-4 w-4" />
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>
//             Failed to add store. Please try again.
//           </AlertDescription>
//         </Alert>
//       )}
//       {mutation.isSuccess && (
//         <Alert className="mt-4">
//           <CheckCircle2 className="h-4 w-4" />
//           <AlertTitle>Success</AlertTitle>
//           <AlertDescription>Store added successfully!</AlertDescription>
//         </Alert>
//       )}
//     </Card>
//   );
// }
