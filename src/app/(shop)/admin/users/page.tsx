// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0;

import {  getPaginatedUser } from "@/actions";
import { Pagination, Title } from "@/components";

import { redirect } from "next/navigation";
import { UsersTable } from "./ui/UsersTable";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function OrdersPage({searchParams}: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { ok, users = [], totalPages = 1 } = await getPaginatedUser({page});
  
  if (!ok) {
    redirect("/auth/login");
  }
  return (
    <>
      <Title title="Roles de Usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />
        <Pagination totalPages={totalPages}/>
      </div>
    </>
  );
}
