import { createContext, use, useId } from "react";
import { cn } from "../../lib/utils";

const TooltipContext = createContext<TooltipContext | null>(null)

type TooltipContext = {
    visible: boolean;
    setVisible: (v: boolean) => void;
    id: string;
}

function useTooltip() {
    const context = use(TooltipContext);

    if (!context) {
        throw new Error(
            "Components like Tooltip, TooltipContent and TooltipTrigger must be used within <TooltipProvider> component.",
        );
    }

    return context;
}



function TooltipProvider() {
    const id = useId();

    return <TooltipContext.Provider value={{ visible: false, setVisible: () => { }, id }}>
        { }
    </TooltipContext.Provider>
}

interface TooltipProps extends React.ComponentProps<"div"> {

}

function Tooltip({ children, className, ...props }: TooltipProps) {
    return <div className={cn("relative", className)} {...props}>
        {children}
    </div>
}

interface TooltipContentProps extends React.ComponentProps<"div"> {
    preferredPosition?: "top" | "bottom" | "left" | "right";
}

//preffered-position?
function TooltipContent({ children, className, preferredPosition, ...props }: TooltipContentProps) {
    const { id, visible } = useTooltip();

    return <div id={`tooltip-content-${id}`} role="tooltip" {...props}> {children} </div>
}

interface TooltipTriggerProps extends React.ComponentProps<"button"> {
    delay?: number;
}

//delay
function TooltipTrigger({ children, className, delay, ...props }: TooltipTriggerProps) {
    const { id, setVisible } = useTooltip();

    function setToVisible() {

    }

    return <button className={cn("", className)} aria-describedby={`tooltip-content-${id}`} onMouseEnter={setToVisible} onMouseLeave={() => setVisible(false)} {...props} >
        {children}
    </button>
}

export { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger }
export type { TooltipContext, TooltipContentProps, TooltipTriggerProps, TooltipProps }