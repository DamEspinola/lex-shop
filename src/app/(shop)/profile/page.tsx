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
      <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-md mb-10 w-fit">
        <div className="w-16 h-16 flex items-center justify-center bg-green-900 text-white text-xl font-semibold rounded-full">
          <span>{session.user.name.charAt(0)?.toUpperCase()}</span>
        </div>
        <div>
          <h3 className="text-xl mb-2">
            <strong>Usuario:</strong> {session.user.name.charAt(0).toUpperCase() + session.user.name.slice(1)}
          </h3>
          <h3 className="text-xl mb-2"> <strong>Correo:</strong> {session.user.email}</h3>
        </div>
      </div>

      {/* <pre>{JSON.stringify(session.user, null, 2)}</pre> */}
    </>
  );
}
