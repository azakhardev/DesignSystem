import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { cn } from "../../lib/utils";
import { Input, type InputProps } from "../Input";

interface AutocompleteProps<T> extends Omit<
  InputProps,
  "value" | "onChange" | "onSubmit"
> {
  /**
   * A function that returns a unique string/number for each option to use as the React key.
   * If not provided, it will try to use `option.id` or `option.value` if they exist.
   */
  getOptionKey?: (option: T) => string | number;
  /**
   * A function that returns the string representation of the option (used as a fallback if renderOption is missing).
   */
  getOptionLabel?: (option: T) => string;
  /**
   * Called when the user types in the input.
   */
  onSearchChange?: (search: string) => void;
  /**
   * Called when the user clicks an option from the dropdown.
   */
  onSelectOption?: (option: T) => void;
  /**
   * Called when the user presses Enter and no specific dropdown option is highlighted.
   */
  onSubmit?: (searchValue: string) => void;
  /**
   * The list of options to display in the dropdown.
   */
  options?: T[];
  /**
   * A render prop function that allows you to fully customize how each option is displayed (e.g., adding images/icons).
   */
  renderOption?: (option: T) => React.ReactNode;
  /**
   * The current search value.
   */
  value?: string;
}

function Autocomplete<T>({
  className,
  getOptionKey,
  getOptionLabel,
  onSearchChange,
  onSelectOption,
  onSubmit,
  options = [],
  renderOption,
  value = "",
  ...props
}: AutocompleteProps<T>) {
  const [dismissed, setDismissed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const showDropdown = !dismissed && options.length > 0;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentIndex(0);
  }, [options, showDropdown]);

  useEffect(() => {
    function handlePointerDown(e: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setDismissed(true);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown && e.key === "Enter") {
      onSubmit?.(value);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCurrentIndex((prev) => (prev + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCurrentIndex((prev) => (prev - 1 + options.length) % options.length);
    } else if (e.key === "Enter" && showDropdown && options[currentIndex]) {
      e.preventDefault();
      handleOptionClick(options[currentIndex]);
    } else if (e.key === "Escape") {
      setDismissed(true);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setDismissed(false);
    onSearchChange?.(newValue);
  }

  function handleOptionClick(option: T) {
    onSelectOption?.(option);
    setDismissed(true);
    setCurrentIndex(options.indexOf(option));
  }

  function resolveKey(option: T, index: number): string | number {
    if (getOptionKey) return getOptionKey(option);

    if (option && typeof option === "object") {
      if ("id" in option) return String(option.id);
      if ("value" in option) return String(option.value);
    }
    if (typeof option === "string" || typeof option === "number") return option;
    return index;
  }

  function resolveLabel(option: T) {
    if (getOptionLabel) return getOptionLabel(option);
    if (typeof option === "string" || typeof option === "number")
      return String(option);
    if (option && typeof option === "object" && "label" in option)
      return String(option.label);

    console.warn(
      "Autocomplete: Could not resolve a label for option. Please provide `getOptionLabel` or `renderOption`.",
    );
    return "Unknown Option";
  }

  return (
    <div className={cn("relative w-full", className)} ref={containerRef}>
      <Input
        {...props}
        onChange={handleInputChange}
        onFocus={() => options.length > 0 && setDismissed(false)}
        onKeyDown={handleKeyDown}
        value={value}
      />

      {/* === DROPDOWN BOX === */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 z-50 mt-1 w-full overflow-hidden rounded-md border border-border bg-surface shadow-md"
            exit={{ opacity: 0, y: -5 }}
            initial={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            <ul className="max-h-60 overflow-y-auto p-1">
              {options.map((option, i) => (
                <li key={resolveKey(option, i)}>
                  <button
                    className={cn(
                      "flex w-full cursor-pointer items-center rounded-sm px-3 py-2 text-left text-sm transition-colors focus:outline-none",
                      currentIndex === i
                        ? "bg-surface-secondary font-medium text-text"
                        : "text-text hover:bg-surface-secondary",
                    )}
                    onClick={() => handleOptionClick(option)}
                    tabIndex={-1}
                    type="button"
                  >
                    {renderOption ? renderOption(option) : resolveLabel(option)}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export { Autocomplete };
