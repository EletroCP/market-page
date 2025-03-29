import Link from "next/link";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { RiArrowDropDownFill } from "react-icons/ri";

type MenuItem = {
  label: string;
  href?: string;
  subItems?: MenuItem[];
};

export const MenuHide = ({
  itens,
  icons,
  positionRight,
  hamburgerCss
}: {
  itens: MenuItem[];
  icons: IconType[];
  positionRight: string;
  hamburgerCss: string;
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`w-64 h-auto bg-white absolute top-10 ${positionRight}`}>
      <hr className="border-orange-500 border" />
      {itens.map((item, index) => (
        <div key={`${item.label}-${index}`} className="relative">
          {!item.subItems ? (
            <Link
              href={item.href || "#"}
              className={`text-black font-thin pt-3 pl-3 hover:bg-slate-100 block ${hamburgerCss} ${
                index === itens.length - 1 ? "pb-3" : ""
              }`}
            >
              {icons[index] && (
                <span className="text-black pt-1 pl-3">
                  {React.createElement(icons[index])}
                </span>
              )}
              {item.label}
            </Link>
          ) : (
            <div
              className="flex items-center justify-between hover:bg-slate-100 cursor-pointer"
              onClick={() => handleMouseClick(index)}
            >
              {icons[index] && (
                <span className="text-black pt-1 pl-3">
                  {React.createElement(icons[index])}
                </span>
              )}
              <p className="text-black font-thin pt-3 pl-3">{item.label}</p>
              <RiArrowDropDownFill className="text-black mr-3" />
            </div>
          )}

          {item.subItems && (
            <div
              className={`pl-6 bg-white overflow-hidden transition-all duration-700 ease-in-out ${
                activeIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
              style={{
                transitionProperty: "max-height, opacity",
              }}
            >
              {item.subItems.map((subItem, subIndex) => (
                <Link
                  key={`${subItem.label}-${subIndex}`}
                  className={`text-black font-thin pt-2 pl-3 hover:bg-slate-100 block ${
                    subIndex === item.subItems!.length - 1 &&
                    index === itens.length - 1
                      ? "pb-3"
                      : ""
                  }`}
                  href={subItem.href || "#"}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
