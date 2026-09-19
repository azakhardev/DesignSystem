import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { FileDrop, FileListItem } from "./FileDrop";

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

export const Basic: Story = {
  render: () => (
    <FileDrop
      helperText="Any file type, up to your own limits"
      onFilesSelected={(files) => console.log("selected:", files)}
    />
  ),
};

export const ImagesOnly: Story = {
  render: () => (
    <FileDrop
      accept="image/*"
      helperText="PNG, JPG, GIF — remember this only filters the browse dialog, not drops"
      label="Drop images here, or click to browse"
      onFilesSelected={(files) => console.log("selected:", files)}
    />
  ),
};

export const Disabled: Story = {
  render: () => <FileDrop disabled onFilesSelected={() => {}} />,
};

export const ErrorState: Story = {
  render: () => (
    <FileDrop
      helperText="File exceeds 5MB limit"
      onFilesSelected={() => {}}
      state="error"
    />
  ),
};

export const SuccessState: Story = {
  render: () => (
    <FileDrop
      helperText="3 files uploaded"
      onFilesSelected={() => {}}
      state="success"
    />
  ),
};

/**
 * A working demo: selected files are tracked in story state and rendered
 * as a list with remove buttons. This state management lives in the story
 * only — you'll likely replace it with real upload logic.
 */
export const WithFileListDemo: Story = {
  render: () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
      <div className="flex flex-col gap-3">
        <FileDrop
          helperText="Drop or browse — selected files appear below"
          onFilesSelected={(newFiles) =>
            setFiles((prev) => [...prev, ...newFiles])
          }
        />
        {files.length > 0 && (
          <div className="flex flex-col gap-2">
            {files.map((file, index) => (
              <FileListItem
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
