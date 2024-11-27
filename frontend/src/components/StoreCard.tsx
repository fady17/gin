import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Store } from "@/lib/types";

interface StoreCardProps {
  store: Store;
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Card className="w-full max-w-sm overflow-hidden">
      <div
        className="relative h-full"
        style={{
          backgroundImage: `url('/store-background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-background/25" />
        <CardHeader className="relative z-10">
          <CardTitle className="text-2xl font-bold text-foreground">
            {store.name}
          </CardTitle>
          <CardDescription className="text-foreground/75">
            Store ID: {store.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary hover:bg-primary/20"
            >
              {store.area_name}
            </Badge>
            <span className="text-sm text-foreground/75">
              Area ID: {store.area_id}
            </span>
          </div>
        </CardContent>
        {/* <CardFooter className="relative z-10 text-sm text-foreground/75">
          Last updated: {new Date().toLocaleDateString()}
        </CardFooter> */}
      </div>
    </Card>
  );
}

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Store } from "@/lib/types";

// interface StoreCardProps {
//   store: Store;
// }

// export function StoreCard({ store }: StoreCardProps) {
//   return (
//     <Card className="w-full max-w-sm overflow-hidden">
//         <div
//         className="relative h-full"
//         style={{
//           backgroundImage: `url('/store-background.jpg')`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center'
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-t from-background/95 to-background/25" />
//         <CardHeader className="relative z-10">
//           <CardTitle className="text-2xl font-bold text-foreground">
//             {store.name}
//           </CardTitle>
//           <CardDescription className="text-foreground/75">
//             Store ID: {store.id}
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="relative z-10">
//           <div className="flex items-center space-x-2">
//             <Badge
//               variant="secondary"
//               className="bg-primary/10 text-primary hover:bg-primary/20"
//             >
//               {store.area_name}
//             </Badge>
//             <span className="text-sm text-foreground/75">
//               Area ID: {store.area_id}
//             </span>
//           </div>
//         </CardContent>
//         <CardFooter className="relative z-10 text-sm text-foreground/75">
//           Last updated: {new Date().toLocaleDateString()}
//         </CardFooter>
//       </div>
//     </Card>
//   );
// }

// // import {
// //   Card,
// //   CardContent,
// //   CardDescription,
// //   CardFooter,
// //   CardHeader,
// //   CardTitle,
// // } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Store } from "@/lib/types";

// // interface StoreCardProps {
// //   store: Store;
// // }

// // export function StoreCard({ store }: StoreCardProps) {
// //   return (
// //     <Card className="w-full max-w-sm">
// //       <CardHeader>
// //         <CardTitle>{store.name}</CardTitle>
// //         <CardDescription>Store ID: {store.id}</CardDescription>
// //       </CardHeader>
// //       <CardContent>
// //         <div className="flex items-center space-x-2">
// //           <Badge variant="secondary">{store.area_name}</Badge>
// //           <span className="text-sm text-muted-foreground">
// //             Area ID: {store.area_id}
// //           </span>
// //         </div>
// //       </CardContent>
// //       <CardFooter className="text-sm text-muted-foreground">
// //         Last updated: {new Date().toLocaleDateString()}
// //       </CardFooter>
// //     </Card>
// //   );
// // }
