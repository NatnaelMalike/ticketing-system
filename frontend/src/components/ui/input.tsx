import * as React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
            "w-full h-11 border border-gray-200 focus:border-0 py-2 px-3 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
          className??""
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

export { Input }
