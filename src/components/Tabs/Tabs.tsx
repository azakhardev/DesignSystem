import {
  createContext,
  use,
  useCallback,
  useId,
  useMemo,
  useState,
} from "react";

import { cn } from "../../lib/utils";

interface TabsContextType {
  activeTab: string;
  baseId: string;
  setActiveTab: (value: string) => void;
  tabsDirection?: "horizontal" | "vertical";
}

const TabsContext = createContext<TabsContextType | null>(null);

interface TabsProps extends React.ComponentProps<"div"> {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  tabsDirection?: "horizontal" | "vertical";
}

function Tabs({
  children,
  className,
  defaultValue,
  onValueChange,
  tabsDirection = "horizontal",
  ...props
}: TabsProps) {
  const [current, setCurrent] = useState<string>(defaultValue ?? "");
  const baseId = useId();

  const handleTabChange = useCallback(
    (value: string) => {
      setCurrent(value);
      onValueChange?.(value);
    },
    [onValueChange],
  );

  const contextState = useMemo(
    () => ({
      activeTab: current,
      baseId,
      setActiveTab: handleTabChange,
      tabsDirection,
    }),
    [current, baseId, handleTabChange, tabsDirection],
  );

  return (
    <TabsContext.Provider value={contextState}>
      <div
        className={cn(
          "flex gap-3 w-full rounded-lg bg-surface p-4",
          tabsDirection === "horizontal" ? "flex-col items-center" : "flex-row",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function useTabsContext() {
  const context = use(TabsContext);

  if (!context) {
    throw new Error(
      "Tabs components (like TabsList, Tab or TabContent) must be used within a <Tabs> provider.",
    );
  }

  return context;
}

interface TabsListProps extends React.ComponentProps<"div"> {
  /**
   * Determines if the tabs should grow to fill the whole width of the tabslist
   */
  grow?: boolean;
  /**
   * Defines the justification of the tabs
   */
  justify?: "start" | "center" | "end" | "between";
}

function TabsList({
  children,
  className,
  grow = false,
  justify = "start",
  ...props
}: TabsListProps) {
  const { tabsDirection } = useTabsContext();
  const isHorizontal = tabsDirection === "horizontal";

  return (
    <div
      aria-orientation={tabsDirection}
      className={cn(
        "flex border-text-secondary",
        isHorizontal
          ? "flex-row border-b w-full"
          : "flex-col border-r shrink-0",
        justify === "center" && "justify-center",
        justify === "end" && "justify-end",
        justify === "between" && "justify-between",
        grow && "[&>*]:flex-1",

        className,
      )}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
}

interface TabProps extends Omit<React.ComponentProps<"button">, "onClick"> {
  /**
   * The value that sets which TabContent should be shown
   */
  value: string;
}

function Tab({ children, className, disabled, value, ...props }: TabProps) {
  const { activeTab, baseId, setActiveTab, tabsDirection } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      aria-controls={`${baseId}-content-${value}`}
      aria-selected={isActive}
      className={cn(
        "flex items-center px-1.5 text-text text-xl border-transparent transition-colors duration-200",
        disabled && "text-text-secondary cursor-default",
        !disabled &&
          !isActive &&
          "hover:bg-surface-subtle hover:border-border-strong",
        isActive && "bg-info-surface border-primary",
        tabsDirection === "horizontal"
          ? "rounded-t-md -mb-px border-b pt-1"
          : "rounded-l-md -mr-px border-r py-1",
        className,
      )}
      disabled={disabled}
      id={`${baseId}-tab-${value}`}
      onClick={() => {
        setActiveTab(value);
      }}
      role="tab"
      tabIndex={isActive ? 0 : -1}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

interface TabContentProps extends React.ComponentProps<"div"> {
  /**
   * The value for which the TabContent should be displayed
   */
  value: string;
}

function TabContent({ children, className, value, ...props }: TabContentProps) {
  const { activeTab, baseId } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      aria-labelledby={`${baseId}-tab-${value}`}
      className={cn("p-2 rounded-md flex-1 w-full", className)}
      id={`${baseId}-content-${value}`}
      role="tabpanel"
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tab, TabContent, Tabs, TabsList };
export type { TabContentProps, TabProps, TabsListProps, TabsProps };
