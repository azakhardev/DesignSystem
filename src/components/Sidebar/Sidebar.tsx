import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp, Minus } from "lucide-react";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import { useIsMobile } from "../../hooks/useIsMobile";
import Slot from "../../lib/Slot";
import { cn } from "../../lib/utils";
import { Dialog, DialogContent } from "../Dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../Tooltip";

interface SidebarContextType {
  collapsed: boolean;
  isMobile: boolean;
  mobileOpen: boolean;
  setCollapsed: (value: boolean) => void;
  setMobileOpen: (value: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a <Sidebar> provider.");
  }
  return context;
}

interface SidebarProps {
  children: React.ReactNode;
  // Desktop State
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  // Mobile State
  mobileOpen?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  onMobileOpenChange?: (open: boolean) => void;
}

function Sidebar({
  children,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  mobileOpen: controlledMobileOpen,
  onCollapsedChange: controlledOnCollapsedChange,
  onMobileOpenChange: controlledOnMobileOpenChange,
}: SidebarProps) {
  const isMobile = useIsMobile();

  const [uncontrolledCollapsed, setUncontrolledCollapsed] =
    useState(defaultCollapsed);
  const isDesktopControlled = controlledCollapsed !== undefined;
  const collapsed = isDesktopControlled
    ? controlledCollapsed
    : uncontrolledCollapsed;

  const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = useState(false);
  const isMobileControlled = controlledMobileOpen !== undefined;
  const mobileOpen = isMobileControlled
    ? controlledMobileOpen
    : uncontrolledMobileOpen;

  const setCollapsed = useCallback(
    (value: boolean) => {
      if (isDesktopControlled) {
        controlledOnCollapsedChange?.(value);
      } else {
        setUncontrolledCollapsed(value);
      }
    },
    [isDesktopControlled, controlledOnCollapsedChange],
  );

  const setMobileOpen = useCallback(
    (value: boolean) => {
      if (isMobileControlled) {
        controlledOnMobileOpenChange?.(value);
      } else {
        setUncontrolledMobileOpen(value);
      }
    },
    [isMobileControlled, controlledOnMobileOpenChange],
  );

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  }, [isMobile, mobileOpen, setMobileOpen, collapsed, setCollapsed]);

  const contextValue = useMemo(
    () => ({
      collapsed,
      isMobile,
      mobileOpen,
      setCollapsed,
      setMobileOpen,
      toggleSidebar,
    }),
    [
      collapsed,
      mobileOpen,
      setCollapsed,
      setMobileOpen,
      toggleSidebar,
      isMobile,
    ],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

interface SidebarContentProps extends React.ComponentProps<"aside"> {
  collapsedWidth?: string;
  dialogProps?: Partial<React.ComponentProps<typeof DialogContent>>;
  side?: "left" | "right";
  width?: string;
}

function SidebarContent({
  children,
  className,
  collapsedWidth = "3.5rem",
  dialogProps,
  ref,
  side = "left",
  style,
  width = "16rem",
  ...props
}: SidebarContentProps) {
  const { collapsed, isMobile, mobileOpen, setMobileOpen } =
    useSidebarContext();

  if (isMobile) {
    return (
      <Dialog onOpenChange={setMobileOpen} open={mobileOpen}>
        <DialogContent
          closeButton={false}
          position={side}
          {...dialogProps}
          className={cn(
            "h-full bg-surface text-text border-border border-r",
            className,
            dialogProps?.className,
          )}
        >
          <div
            className="group/sidebar h-full flex flex-col"
            data-collapsed="false"
          >
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <aside
      className={cn(
        "group/sidebar overflow-hidden inset-y-0 z-30 flex flex-col h-screen bg-surface border-border-strong transition-[width] duration-300 ease-in-out",
        side === "left" ? "border-r left-0" : "border-l right-0",
        className,
      )}
      data-collapsed={collapsed}
      ref={ref}
      style={{
        width: collapsed ? collapsedWidth : width,
        ...style,
      }}
      {...props}
    >
      {children}
    </aside>
  );
}

function SidebarHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col p-2 shrink-0 border-b-2 border-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function SidebarBody({
  children,
  className,
  ref,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 flex-1 p-2", className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
}

interface SidebarGroupProps extends React.ComponentProps<"div"> {
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  title: string;
}

function SidebarGroup({
  children,
  className,
  defaultOpen,
  icon,
  title,
  ...props
}: SidebarGroupProps) {
  const [expanded, setExpanded] = useState(defaultOpen);

  return (
    <div
      className={cn("flex flex-col gap-2 items-start mb-2", className)}
      {...props}
    >
      <button
        className={cn(
          "relative flex flex-row gap-1 items-center justify-start w-full font-bold ",
          "group-data-[collapsed=true]/sidebar:pl-2 group/group-title outline-primary-focus",
        )}
        onClick={() => setExpanded((old) => !old)}
      >
        {icon ?? (
          <Minus className="group-data-[collapsed=false]/sidebar:hidden" />
        )}
        <h4 className="group-data-[collapsed=true]/sidebar:hidden">{title}</h4>
        <div
          className={cn(
            "absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover/group-title:opacity-100",
            "transition-all duration-200 pointer-events-none group-data-[collapsed=true]/sidebar:hidden",
          )}
        >
          {expanded ? <ChevronUp /> : <ChevronDown />}
        </div>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            animate={{
              height: "auto",
              opacity: 1,
            }}
            className="group-data-[collapsed=false]/sidebar:pl-1 flex flex-col gap-1 w-full overflow-y-hidden"
            exit={{
              height: 0,
              opacity: 0.1,
            }}
            initial={{ height: 0, opacity: 0.1 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface SidebarItemProps extends React.ComponentProps<"button"> {
  /**
   * Uses React composition capabilities to merge components
   */
  asChild?: boolean;
  /**
   * Defines an icon of the Item
   */
  icon?: React.ReactNode;
  /**
   * Title of the item, used for tooltip when sidebar is collapsed
   */
  title?: string;
}

function SidebarItem({
  asChild,
  children,
  className,
  icon,
  title,
  ...props
}: SidebarItemProps) {
  const { collapsed } = useSidebarContext();

  const Comp = asChild ? Slot : "button";

  return (
    <Tooltip closeDelayDuration={50} delayDuration={150}>
      <TooltipTrigger asChild>
        <Comp
          className={cn(
            "flex flex-row items-center gap-2 rounded-md p-2 transition-all",
            "justify-start cursor-pointer hover:bg-info-surface",
            "focus:outline-none focus:bg-info-surface",
            className,
          )}
          {...props}
        >
          <div className="shrink-0 flex items-center justify-center group-data-[collapsed=true]/sidebar:text-text/80">
            {icon}
          </div>

          <div
            className={cn(
              "whitespace-nowrap overflow-hidden transition-all duration-300",
              "group-data-[collapsed=true]/sidebar:w-0 group-data-[collapsed=true]/sidebar:opacity-0",
              "group-data-[collapsed=false]/sidebar:w-auto group-data-[collapsed=false]/sidebar:opacity-100",
            )}
          >
            {children}
          </div>
        </Comp>
      </TooltipTrigger>
      {collapsed && title && (
        <TooltipContent side="right" sideOffset={12} text={title} />
      )}
    </Tooltip>
  );
}

function SidebarFooter({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col p-2 mt-auto shrink-0 border-t-2 border-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface SidebarTriggerProps extends React.ComponentProps<"button"> {
  /**
   * Uses React composition capabilities to merge components
   */
  asChild?: boolean;
}

function SidebarTrigger({
  asChild,
  children,
  className,
  ...props
}: SidebarTriggerProps) {
  const { toggleSidebar } = useSidebarContext();

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(
        "p-2 rounded-sm border border-border hover:bg-border transition-colors bg-border-subtle",
        className,
      )}
      onClick={() => toggleSidebar()}
      title="Toggle sidebar"
      {...props}
    >
      {children}
    </Comp>
  );
}

export {
  Sidebar,
  SidebarBody,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarTrigger,
};
export type {
  SidebarContentProps,
  SidebarGroupProps,
  SidebarProps,
  SidebarTriggerProps,
};
