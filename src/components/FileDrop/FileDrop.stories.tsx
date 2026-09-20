import type { Meta, StoryObj } from "@storybook/react-vite";
import { Copy, Download, UploadCloud } from "lucide-react";
import { useState } from "react";

import { Button } from "../Button";
import { IconButton } from "../Icon";
import { FileDrop, FileListItem } from "./FileDrop";

/**
 * A comprehensive **FileDrop** component suite for handling file uploads via drag-and-drop or manual selection.
 *
 * The suite is designed to be fully accessible and visually responsive to drag events. It remains purely presentational and delegates file tracking, validation, and network requests to the parent component, giving you complete control over the upload lifecycle.
 *
 * ### Key Features
 * - **Native Drag & Drop**: Gracefully handles drag enter/leave events without flickering using a robust internal counter.
 * - **Accessible**: Fully supports keyboard navigation (Space/Enter to open the native file browser).
 * - **Composable List**: Pair with `<FileListItem>` to display selected files with custom actions (via the `actions` slot).
 * - **Controlled States**: Easily switch between `idle`, `error`, and `success` visual states based on your external validation logic.
 */
const meta = {
  component: FileDrop,
  parameters: { layout: "padded" },
  subcomponents: { FileListItem } as Record<
    string,
    React.ComponentType<unknown>
  >,
  title: "Data Display/FileDrop",
} satisfies Meta<typeof FileDrop>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A standard file drop zone. In this configuration, it simply captures the file selection event via `onFilesSelected` but does not visually track or display the files.
 */
export const Basic: Story = {
  args: {
    onFilesSelected: () => console.warn("OnFileSelected is not defined"),
  },
  render: () => (
    <FileDrop
      helperText="Any file type, up to your own limits"
      icon={<UploadCloud className="h-8 w-8 text-text-secondary" />}
      onFilesSelected={(files) => console.log("selected:", files)}
    />
  ),
};

/**
 * Prevents all interactions, including drag-and-drop, clicking, and keyboard activation.
 */
export const Disabled: Story = {
  args: {
    onFilesSelected: () => console.warn("OnFileSelected is not defined"),
  },
  render: () => (
    <FileDrop
      disabled
      icon={<UploadCloud className="h-8 w-8 text-text-secondary" />}
      onFilesSelected={() => {}}
    />
  ),
};

/**
 * This demo shows how to utilize the `actions` slot inside `<FileListItem>`.
 *
 * By passing `<IconButton>` components into the slot, we can easily add custom, accessible actions like downloading a file from browser memory or copying it directly to the user's system clipboard via the Async Clipboard API.
 */
export const FileList: Story = {
  args: {
    onFilesSelected: () => console.warn("OnFileSelected is not defined"),
  },
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    async function handleCopy(file: File) {
      try {
        const clipboardItem = new ClipboardItem({
          [file.type]: file,
        });

        await navigator.clipboard.write([clipboardItem]);

        console.log(`Copied ${file.name} to clipboard`);
      } catch (error) {
        console.error("Copy failed:", error);
        alert(
          `Your browser does not support copying ${file.type} files directly to the clipboard.`,
        );
      }
    }

    function handleDownload(file: File) {
      const url = URL.createObjectURL(file);

      const link = document.createElement("a");
      link.href = url;
      link.download = file.name;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    }

    return (
      <div className="flex flex-col gap-3">
        <FileDrop
          className="h-125"
          helperText="Drop or browse — selected files appear below"
          icon={<UploadCloud className="h-8 w-8 text-text-secondary" />}
          onFilesSelected={(newFiles) =>
            setFiles((prev) => [...prev, ...newFiles])
          }
        />
        {files.length > 0 && (
          <div className="flex flex-col gap-2">
            {files.map((file, index) => (
              <FileListItem
                actions={
                  <>
                    <IconButton
                      aria-label="Download"
                      onClick={() => handleDownload(file)}
                      size="sm"
                    >
                      <Download />
                    </IconButton>
                    <IconButton
                      aria-label="Download"
                      onClick={() => handleCopy(file)}
                      size="sm"
                    >
                      <Copy />
                    </IconButton>
                  </>
                }
                file={file}
                key={`${file.name}-${index}`}
                onRemove={() =>
                  setFiles((prev) => prev.filter((_, i) => i !== index))
                }
              />
            ))}
          </div>
        )}
      </div>
    );
  },
};

/**
 * This interactive demo restricts the file picker to images (`accept="image/*"`).
 *
 * It demonstrates how to manage selected files in state, validate their MIME types upon submission, and gracefully trigger the `error` state on both the drop zone and the specific invalid `<FileListItem>` if the user bypassed the OS filter by dragging and dropping an unsupported file.
 */
export const ImagesOnly: Story = {
  args: {
    onFilesSelected: () => console.warn("OnFileSelected is not defined"),
  },
  render: () => {
    const [files, setFiles] = useState<File[]>([]);
    const [dropState, setDropState] = useState<"idle" | "error" | "success">(
      "idle",
    );
    const [message, setMessage] = useState("");

    const handleFilesSelected = (newFiles: File[]) => {
      setFiles((prev) => [...prev, ...newFiles]);
      setDropState("idle");
      setMessage("");
    };

    const handleSubmit = () => {
      const hasInvalidFiles = files.some(
        (file) => !file.type.startsWith("image/"),
      );

      if (hasInvalidFiles) {
        setDropState("error");
        setMessage(
          "Only image files are allowed. Please remove invalid files.",
        );
        alert("Upload failed: You have attached files that are not images.");
        return;
      }

      setDropState("success");
      setMessage("Images successfully submitted!");
    };

    return (
      <div className="mx-auto flex w-full max-w-xl flex-col gap-4">
        <FileDrop
          accept="image/*"
          helperText={
            message ||
            "PNG, JPG, GIF — remember this only filters the browse dialog, not drops"
          }
          icon={<UploadCloud className="h-8 w-8 text-text-secondary" />}
          label="Drop images here, or click to browse"
          onFilesSelected={handleFilesSelected}
          state={dropState}
        />

        {files.length > 0 && (
          <div className="flex flex-col gap-2">
            {files.map((file, index) => {
              const isInvalid = !file.type.startsWith("image/");

              return (
                <FileListItem
                  file={file}
                  key={`${file.name}-${index}`}
                  onRemove={() => {
                    setFiles((prev) => prev.filter((_, i) => i !== index));
                    setDropState("idle");
                    setMessage("");
                  }}
                  status={
                    dropState === "error" && isInvalid ? "error" : "pending"
                  }
                />
              );
            })}

            <div className="mt-2 flex justify-end">
              <Button onClick={handleSubmit} type="button">
                Submit Images
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  },
};
