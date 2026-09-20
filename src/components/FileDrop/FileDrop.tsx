import React, { useRef, useState } from "react";

import { cn } from "../../lib/utils";

interface FileDropProps extends Omit<React.ComponentProps<"div">, "onDrop"> {
  /** Forwarded to the hidden `<input type="file" accept>`. Does not filter drops. */
  accept?: string;
  /** Disables both drop and click-to-browse. */
  disabled?: boolean;
  /** Optional secondary line under the label. */
  helperText?: string;
  /** Icon to be displayed above of the texts. */
  icon?: React.ReactNode;
  /** Primary label text. */
  label?: string;
  /** Whether multiple files can be selected/dropped at once. Defaults to true. */
  multiple?: boolean;
  /** Called with the files from either a drop or the file picker. You decide what happens next. */
  onFilesSelected: (files: File[]) => void;
  /** Externally controlled result state, layered on top of the internal drag-over state. */
  state?: "error" | "idle" | "success";
}

function FileDrop({
  accept,
  className,
  disabled,
  helperText,
  icon,
  label = "Drop files here, or click to browse",
  multiple = true,
  onFilesSelected,
  state = "idle",
  ...props
}: FileDropProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  // dragenter/dragleave fire on every child element, not just the container,
  // so a plain boolean flickers false while the pointer crosses a child.
  // Counting enter/leave pairs is the standard fix.
  const dragCounter = useRef(0);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const openPicker = () => {
    if (!disabled) inputRef.current?.click();
  };

  function handleDragEnter(event: React.DragEvent) {
    event.preventDefault();
    if (disabled) return;
    dragCounter.current += 1;
    setIsDraggingOver(true);
  }

  function handleDragLeave(event: React.DragEvent) {
    event.preventDefault();
    if (disabled) return;
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDraggingOver(false);
    }
  }

  function handleDragOver(event: React.DragEvent) {
    // Required: Else a dragover with no preventDefault tells the browser
    // "this isn't a valid drop target" and it will reject the drop.
    event.preventDefault();
  }

  function handleDrop(event: React.DragEvent) {
    event.preventDefault();
    dragCounter.current = 0;
    setIsDraggingOver(false);
    if (disabled) return;

    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) onFilesSelected(files);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length > 0) onFilesSelected(files);
    // reset so selecting the exact same file again still fires onChange
    event.target.value = "";
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPicker();
    }
  }

  return (
    <div
      aria-disabled={disabled}
      className={cn(
        "relative flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-surface-secondary/40 p-6 text-center outline-none transition-colors duration-150",
        !disabled &&
          "cursor-pointer hover:border-text-secondary focus-visible:ring-2 focus-visible:ring-border focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isDraggingOver && "border-accent bg-accent-surface/40",
        state === "error" && "border-error-border bg-error-surface/40",
        state === "success" && "border-success-border bg-success-surface/40",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      onClick={openPicker}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      <input
        accept={accept}
        className="hidden"
        disabled={disabled}
        multiple={multiple}
        onChange={handleInputChange}
        ref={inputRef}
        type="file"
      />
      {icon}
      <p className="text-sm font-medium text-text">{label}</p>
      {helperText && (
        <p className="text-xs text-text-secondary">{helperText}</p>
      )}
    </div>
  );
}

/**
 * A single row representing a selected/uploaded file. Purely presentational
 * — pass `onRemove` to wire up your own removal logic, and `status` to
 * reflect upload progress/results you're tracking elsewhere.
 */
interface FileListItemProps extends React.ComponentProps<"div"> {
  /** An optional slot for icon buttons (Delete, Download, Copy Link, etc.) */
  actions?: React.ReactNode;
  /** The file object to display (or a mock object with name/size for existing files) */
  file: File;
  /** Action for removing freshly added File */
  onRemove?: () => void;
  /** Status of the upload */
  status?: "error" | "pending" | "success";
}

function FileListItem({
  actions,
  className,
  file,
  onRemove,
  status = "pending",
  ...props
}: FileListItemProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2 text-sm",
        status === "error" && "border-error-border",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-col">
        <span className="truncate font-medium text-text">{file.name}</span>
        <span className="text-xs text-text-secondary">
          {(file.size / 1024).toFixed(1)} KB
        </span>
      </div>
      {(actions || onRemove) && (
        <div className="flex shrink-0 items-center gap-2">
          {actions}
          {onRemove && (
            <button
              aria-label={`Remove ${file.name}`}
              className="shrink-0 text-xs font-medium text-text-secondary hover:text-error-text focus:outline-none focus:text-error-text focus:underline"
              onClick={onRemove}
              type="button"
            >
              Remove
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export { FileDrop, FileListItem };
