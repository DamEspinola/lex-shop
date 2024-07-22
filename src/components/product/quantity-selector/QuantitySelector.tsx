"use client";

// import React, { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChanged: (value: number) => void
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {

  const onValidChanged = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityChanged(quantity + value);
  };
  return (
    <div className="flex">
      <button>
        <IoRemoveCircleOutline
          onClick={() => onValidChanged(-1)}
          size={30}
        />
      </button>
      <span className="w-20 mx-3 bg-gray-200 text-center rounded">{quantity}</span>
      <button>
        <IoAddCircleOutline onClick={() => onValidChanged(1)} size={30} />
      </button>
    </div>
  );
};
