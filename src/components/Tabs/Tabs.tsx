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
}

const TabsContext = createContext<TabsContextType | null>(null);

interface TabsProps extends React.ComponentProps<"div"> {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

function Tabs({
  children,
  className,
  defaultValue,
  onValueChange,
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
    }),
    [current, baseId, handleTabChange],
  );

  return (
    <TabsContext.Provider value={contextState}>
      <div
        className={cn("flex flex-col w-full rounded-lg bg-surface", className)}
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
  tabsDirection?: "horizontal" | "vertical";
}

function TabsList({
  children,
  className,
  tabsDirection = "horizontal",
  ...props
}: TabsListProps) {
  useTabsContext(); //Context validation

  return (
    <div
      aria-orientation={tabsDirection}
      className={cn(
        "flex gap-2 border-text-secondary",
        tabsDirection === "horizontal"
          ? "flex-row border-b"
          : "flex-col border-r ",
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
  value: string;
}

function Tab({ children, className, disabled, value, ...props }: TabProps) {
  const { activeTab, baseId, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      aria-controls={`${baseId}-content-${value}`}
      aria-selected={isActive}
      className={cn("", className)}
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
  value: string;
}

function TabContent({ children, className, value, ...props }: TabContentProps) {
  const { activeTab, baseId } = useTabsContext();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      aria-labelledby={`${baseId}-tab-${value}`}
      className={cn("bg-surface-secondary", className)}
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
