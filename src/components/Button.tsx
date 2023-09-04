import { ComponentProps, FC, ReactNode } from "react";

interface ButtonProps
  extends Pick<ComponentProps<"button">, "type" | "onClick"> {
  children: ReactNode;
}
export const Button: FC<ButtonProps> = ({
  type = "button",
  children,
  onClick,
}) => (
  <button
    className="group relative inline-block w-full text-lg"
    type={type}
    onClick={onClick}
  >
    <span className="relative z-10 block overflow-hidden rounded-lg border-2 border-gray-900 px-5 py-3 font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out group-hover:text-white">
      <span className="absolute inset-0 h-full w-full rounded-lg bg-pink-50 px-5 py-3" />
      <span className="ease absolute left-0 h-48 w-48 w-full origin-top-right -translate-x-full translate-y-12 -rotate-90 bg-pink-600 transition-all duration-300 group-hover:-rotate-180" />
      <span className="relative">{children}</span>
    </span>
    <span
      className="absolute bottom-0 right-0 -mb-1 -mr-1 h-12 w-full rounded-lg bg-pink-700 transition-all duration-200 ease-linear group-hover:mb-0 group-hover:mr-0"
      data-rounded="rounded-lg"
    />
  </button>
);
