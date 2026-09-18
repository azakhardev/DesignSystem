import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileSearch, Plus, SearchX, Wallet } from "lucide-react";

import { Button } from "../Button";
import { Icon } from "../Icon";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "./EmptyState";
/**
 * A standardized **EmptyState** component suite for gracefully handling missing data, zero search results, or unpopulated views.
 *
 * Empty states turn dead ends into helpful guides by explaining why a view is empty and providing clear next steps. Built with a highly flexible Compound Component pattern, it scales from full-page 404 screens to tiny dropdown menus.
 *
 * ### Key Features
 * - **Compound Architecture**: Fully composable using `EmptyState`, `EmptyStateIcon`, `EmptyStateTitle`, `EmptyStateDescription`, and `EmptyStateActions`.
 * - **Consistent Spacing**: Automatically handles padding, margins, and centering so you don't have to write custom flexbox layouts.
 * - **Animated Entrance**: Includes subtle `fade-in` animations to prevent jarring flashes when data finishes loading but returns empty.
 * - **Highly Adaptive**: Scales perfectly for different contexts—just omit the actions or icons for tighter spaces.
 */
const meta = {
  component: EmptyState,
  parameters: { layout: "centered" },
  subcomponents: {
    EmptyStateActions,
    EmptyStateDescription,
    EmptyStateIcon,
    EmptyStateTitle,
  } as Record<string, React.ComponentType<unknown>>,
  title: "Data Display/EmptyState",
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The most common use case: a list or table that simply hasn't been populated yet.
 */
export const NoTransactions: Story = {
  render: () => (
    <div className="w-125 rounded-lg border border-border bg-surface shadow-sm">
      <EmptyState>
        <EmptyStateIcon>
          <Icon as={Wallet} color="muted" size="lg" />
        </EmptyStateIcon>
        <EmptyStateTitle>No transactions yet</EmptyStateTitle>
        <EmptyStateDescription>
          When you make a transfer or receive funds, your transaction history
          will appear here.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button variant="primary">
            <Icon as={Plus} className="mr-2" size="sm" />
            Add Funds
          </Button>
        </EmptyStateActions>
      </EmptyState>
    </div>
  ),
};

/**
 * Used when a user applies a search or filter that yields zero results.
 * The CTA usually encourages them to clear their filters.
 */
export const NoSearchResults: Story = {
  render: () => (
    <div className="w-125 rounded-lg border border-border bg-surface p-12 shadow-sm">
      <EmptyState>
        <EmptyStateIcon className="bg-warning-surface text-warning-text ring-warning-surface/50">
          <Icon as={SearchX} color="inherit" size="lg" />
        </EmptyStateIcon>
        <EmptyStateTitle>No results found</EmptyStateTitle>
        <EmptyStateDescription>
          We could not find anything matching your search criteria. Try
          adjusting your filters or checking for typos.
        </EmptyStateDescription>
        <EmptyStateActions>
          <Button variant="outline">Clear Filters</Button>
          <Button
            className="border-surface-secondary text-secondary"
            variant="outline"
          >
            Refresh
          </Button>
        </EmptyStateActions>
      </EmptyState>
    </div>
  ),
};

/**
 * For smaller areas like dropdowns, sidebars, or widget panels, you can omit the actions and icons.
 */
export const Minimal: Story = {
  render: () => (
    <div className="w-75 rounded-lg border border-border bg-surface py-4 shadow-sm">
      <EmptyState className="p-4">
        <EmptyStateIcon className="mb-2 h-8 w-8 ring-4">
          <Icon as={FileSearch} size="sm" />
        </EmptyStateIcon>
        <EmptyStateTitle className="text-sm">No files uploaded</EmptyStateTitle>
        <EmptyStateDescription className="mb-0 text-xs">
          Drag and drop documents here.
        </EmptyStateDescription>
      </EmptyState>
    </div>
  ),
};
