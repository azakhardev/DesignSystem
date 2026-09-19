import { UploadCloud } from "lucide-react";
import React, { useRef, useState } from "react";

import { cn } from "../../lib/utils";

/**
 * A drop zone for files. Handles the browser-API plumbing needed for
 * drag-over visuals and click-to-browse (native DnD events, the counter
 * needed to keep hover state correct with nested children, the hidden
 * file input). You own everything about what happens *with* the files —
 * validation, upload, previews — via `onFilesSelected`.
 *
 * `state` lets you reflect the result of your own validation/upload logic
 * back into the visuals (e.g. set `"error"` if a dropped file fails a
 * type check you perform in `onFilesSelected`).
 */
interface FileDropProps extends Omit<React.ComponentProps<"div">, "onDrop"> {
  /** Forwarded to the hidden `<input type="file" accept>`. Does not filter drops. */
  accept?: string;
  /** Disables both drop and click-to-browse. */
  disabled?: boolean;
  /** Optional secondary line under the label. */
  helperText?: string;
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
    // Required: a dragover with no preventDefault tells the browser
    // "this isn't a valid drop target" and it will reject the drop.
    event.preventDefault();
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    dragCounter.current = 0;
    setIsDraggingOver(false);
    if (disabled) return;

    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) onFilesSelected(files);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    if (files.length > 0) onFilesSelected(files);
    // reset so selecting the exact same file again still fires onChange
    event.target.value = "";
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPicker();
    }
  };

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
      <UploadCloud className="h-8 w-8 text-text-secondary" />
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
  file: File;
  onRemove?: () => void;
  status?: "error" | "pending" | "success";
}

function FileListItem({
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
      {onRemove && (
        <button
          aria-label={`Remove ${file.name}`}
          className="shrink-0 text-xs font-medium text-text-secondary hover:text-error-text"
          onClick={onRemove}
          type="button"
        >
          Remove
        </button>
      )}
    </div>
  );
}

export { FileDrop, FileListItem };
