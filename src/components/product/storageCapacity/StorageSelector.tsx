import type { Storage } from "@/interfaces";
import React from "react";

interface Props {
  avaliableStorage: Storage[];
}

const storageFormat = {
  GB32: "32GB",
  GB64: "64GB",
  GB128: "128GB",
  GB256: "256GB",
  GB512: "512GB",
  TB1: "1TB",
};

export const StorageCapacity = ({
  avaliableStorage,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tamaño</h3>
      <div className="flex">
        {avaliableStorage.map((storage) => (
          <h2
            key={storage}
            className={"mx-2 text-lg"}
          >
            {storageFormat[storage]}
          </h2>
        ))}
      </div>
    </div>
  );
};
