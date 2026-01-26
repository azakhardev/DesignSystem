import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
} from "react";
import { useIsMobile } from "../../hooks/useIsMobile";
import { cn } from "../../lib/utils";
import { Dialog, DialogContent } from "../Dialog";
import { Minus } from "lucide-react";

interface SidebarContextType {
  collapsed: boolean;
  mobileOpen: boolean;
  setCollapsed: (value: boolean) => void;
  setMobileOpen: (value: boolean) => void;
  toggleSidebar: () => void;
  isMobile: boolean;
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
  onCollapsedChange?: (collapsed: boolean) => void;
  defaultCollapsed?: boolean;
  // Mobile State
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
}

function Sidebar({
  children,
  collapsed: controlledCollapsed,
  onCollapsedChange: controlledOnCollapsedChange,
  defaultCollapsed = false,
  mobileOpen: controlledMobileOpen,
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
      mobileOpen,
      setCollapsed,
      setMobileOpen,
      toggleSidebar,
      isMobile,
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
  side?: "left" | "right";
  width?: string;
  collapsedWidth?: string;
  dialogProps?: Partial<React.ComponentProps<typeof DialogContent>>;
}

function SidebarContent({
  children,
  className,
  side = "left",
  width = "16rem",
  collapsedWidth = "4rem",
  dialogProps,
  ref,
  style,
  ...props
}: SidebarContentProps) {
  const { isMobile, collapsed, mobileOpen, setMobileOpen } =
    useSidebarContext();

  if (isMobile) {
    return (
      <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
        <DialogContent
          position={side}
          closeButton={false}
          {...dialogProps}
          className={cn(
            "h-full bg-surface text-text border-border border-r",
            className,
            dialogProps?.className,
          )}
        >
          <div className="group/sidebar h-full" data-collapsed="false">
            {children}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <aside
      ref={ref}
      data-collapsed={collapsed}
      className={cn(
        "group/sidebar overflow-hidden inset-y-0 z-30 flex flex-col h-screen bg-surface border-border-strong transition-[width] duration-300 ease-in-out",
        side === "left" ? "border-r left-0" : "border-l right-0",
        className,
      )}
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

function SidebarHeader() {
  return <div></div>;
}

function SidebarBody() {
  return <div className="flex flex-col gap-2 flex-1"></div>;
}

interface SidebarItemProps extends React.ComponentProps<"div"> {
  icon?: React.ReactNode;
  categoryTitle?: boolean;
}

function SidebarItem({
  className,
  children,
  categoryTitle,
  icon,
  ...props
}: SidebarItemProps) {
  const hideWhenCollapsed = "group-data-[collapsed=true]/sidebar:hidden";
  const showOnlyWhenCollapsed =
    "hidden group-data-[collapsed=true]/sidebar:block";

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md p-2 transition-colors",
        "justify-start group-data-[collapsed=true]/sidebar:justify-center",
        !categoryTitle && "cursor-pointer hover:bg-info-surface",
        className,
      )}
      {...props}
    >
      {categoryTitle ? (
        <>
          <h4
            className={cn(
              "font-bold text-lg whitespace-nowrap overflow-hidden",
              hideWhenCollapsed,
            )}
          >
            {children}
          </h4>
          <div className={showOnlyWhenCollapsed}>
            <Minus size={28} />
          </div>
        </>
      ) : (
        <>
          <span className="shrink-0 flex items-center justify-center">
            {icon}
          </span>
          <span
            className={cn(
              "whitespace-nowrap overflow-hidden transition-opacity duration-200",
              hideWhenCollapsed,
            )}
          >
            {children}
          </span>
        </>
      )}
    </div>
  );
}

function SidebarFooter() {
  return <div></div>;
}

function SidebarTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebarContext();

  return (
    <button
      title="Toggle sidebar"
      className={cn(
        "p-2 rounded border border-border hover:bg-border transition-colors bg-border-subtle",
        className,
      )}
      onClick={() => toggleSidebar()}
      {...props}
    >
      {children}
    </button>
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarBody,
  SidebarItem,
  SidebarFooter,
  SidebarTrigger,
};
export type { SidebarProps };
