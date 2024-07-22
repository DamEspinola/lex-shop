import React from "react";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { Title } from "@/components";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      <Title title="Perfil" />
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
      <h3 className="text-3xl mb-10">{session.user.role}</h3>
    </>
  );
}
