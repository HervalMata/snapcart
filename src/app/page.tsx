import connectDb from "@/lib/db";
import Register from "./register/page";
import { auth } from "@/auth";
import User from "@/models/user.model";
import { redirect } from "next/navigation"
import EditRoleMobile from "@/components/EditRoleMobile";

export default async function Home() {
  await connectDb()
  const session = await auth()
  const user = await User.findById(session?.user?.id)
  if (!user) {
    redirect("/login")
  }
  const inComplete = !user.mobile || !user.role || (!user.mobile && user.role)
  if (inComplete) {
    return <EditRoleMobile />
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Register />
    </div>
  );
}
