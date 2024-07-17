"use client";

import React, { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity);

  const onQuantityChanged = (value: number) => {
    if (count + value < 1) return;
    setCount(count + value);
  };
  return (
    <div className="flex">
      <button>
        <IoRemoveCircleOutline
          onClick={() => onQuantityChanged(-1)}
          size={30}
        />
      </button>
      <span className="w-20 mx-3 bg-gray-200 text-center rounded">{count}</span>
      <button>
        <IoAddCircleOutline onClick={() => onQuantityChanged(1)} size={30} />
      </button>
    </div>
  );
};
