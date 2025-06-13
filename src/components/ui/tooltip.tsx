import * as React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";


// export function Tooltip({ children, ...props }: RadixTooltip.TooltipProps) {
//   return (
//     <RadixTooltip.Provider>
//       <RadixTooltip.Root {...props}>{children}</RadixTooltip.Root>
//     </RadixTooltip.Provider>
//   );
// }



export function Tooltip({ children, ...props }: RadixTooltip.TooltipProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <RadixTooltip.Provider delayDuration={0}>
      <RadixTooltip.Root open={open} onOpenChange={setOpen} {...props}>
        {children}
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}


export const TooltipTrigger = RadixTooltip.Trigger;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>(({ className, ...props }, ref) => (
  <RadixTooltip.Content
    ref={ref}
    sideOffset={4}
    className={
      "z-50 rounded-md bg-black px-3 py-2 text-xs text-white shadow-md animate-in fade-in-0 " +       
      (className || "")
    }
    {...props}
  />
));
TooltipContent.displayName = RadixTooltip.Content.displayName;