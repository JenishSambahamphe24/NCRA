import React from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";

export interface PasswordInputProps
  extends Omit<React.ComponentPropsWithRef<typeof Input>, "type"> {
  defaultVisibility?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ defaultVisibility, ...inputProps }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(
      defaultVisibility ?? false,
    );

    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          type={isPasswordVisible ? "text" : "password"}
          placeholder="•••••••••"
          {...inputProps}
          className="w-full"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
        >
          {isPasswordVisible ? (
            <EyeOff className="size-4 text-slate-500" />
          ) : (
            <Eye className="size-4 text-slate-500" />
          )}
        </button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
