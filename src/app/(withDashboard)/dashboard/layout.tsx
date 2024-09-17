import Sidebar from "@/components/shared/Sidebar";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Next Auth Dashboard",
  description: "Generated by create next app",
};

// // eslint-disable-next-line react-hooks/rules-of-hooks
// const router = useRouter();
// const Token = localStorage.getItem("accessToken");
// console.log("TOkeeeeeeeeeeeeeeeeen", Token);

// if (Token) {
// } else {
//   alert("Please login first!"), router.push("/login");
// }

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen my-2">
      <div className="flex justify-between">
        <div className="w-[20%]">
          <Sidebar />
        </div>
        <div className="w-[80%] bg-base-200 rounded-box ml-2">{children}</div>
      </div>
    </div>
  );
}
