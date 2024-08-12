import { Colors } from "@/interfaces";
import clsx from "clsx";
import React from "react";

interface Props {
  SelectedColor?: Colors;
  avaliableColor: Colors[];
  onColorChanged: (color: Colors) => void;
}


const colorStyles: Record<Colors, string> = {
  BLACK: "bg-black",
  WHITE: "bg-gray-200",
  BLUE: "bg-blue-800",
  PINK: "bg-pink-500",
  RED: "bg-red-500",
  DEEP_BLUE: "bg-blue-900",
  SPACE_GRAY: "bg-gray-800",
  SILVER: "bg-gray-400",
};

export const ColorsSelector = ({
  SelectedColor,
  avaliableColor,
  onColorChanged,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Colores Disponibles</h3>
      <div className="flex flex-wrap">
        {avaliableColor.map((color) => (
           <button
           key={color}
           onClick={() => onColorChanged(color)}
           className={clsx(
             "w-8 h-8 rounded-full mx-2 my-1",
             colorStyles[color],
             {
               "border-2 border-black": color === SelectedColor,
             }
           )}
           aria-label={color}
           
           />
            
        ))}
      </div>
    </div>
  );
};
