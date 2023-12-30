import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FileUpload } from ".";

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    showFileSize: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
    maxUploadSize: {
      control: { type: "number" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Mock upload function
const mockUploadSuccess = async (file: File) => {
  // Simulate upload delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return {
    filename: file.name,
    url: `https://example.com/uploads/${file.name}`,
    id: Math.random().toString(36).substr(2, 9),
    uploadedAt: new Date().toISOString(),
  };
};

const mockUploadFail = async (_file: File) => {
  // Simulate upload delay then fail
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return null; // Return null to indicate failure
};

const mockUploadError = async (_file: File) => {
  // Simulate upload delay then throw error

  await new Promise((resolve) => setTimeout(resolve, 1000));
  throw new Error("Server error occurred");
};

// Custom icons for demonstration
const DocumentIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <FileUpload
      title="Tap to Upload Document"
      acceptedFiles={[".png", ".jpg", ".gif", ".pdf"]}
      uploadFn={mockUploadSuccess}
      onUploadComplete={(data, file) =>
        console.log("Upload complete:", data, file)
      }
      onDelete={() => console.log("File deleted")}
      maxUploadSize={2 * 1024 * 1024} // 2MB
    />
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <FileUpload
      title="Upload Document"
      acceptedFiles={[".pdf", ".doc", ".docx"]}
      uploadFn={mockUploadSuccess}
      uploadIcon={<DocumentIcon />}
      onUploadComplete={(data, file) =>
        console.log("Upload complete:", data, file)
      }
      onDelete={() => console.log("File deleted")}
    />
  ),
};

export const SuccessState: Story = {
  render: () => {
    const [key, setKey] = useState(0);

    return (
      <FileUpload
        key={key}
        title="Tap to Upload Document"
        acceptedFiles={[".png", ".jpg", ".pdf"]}
        uploadFn={async (_file) => {
          // Immediately return success for demo
          return {
            filename: "My_National_ID.PNG",
            url: "https://example.com/uploads/My_National_ID.PNG",
            id: "abc123",
          };
        }}
        onUploadComplete={(data, file) =>
          console.log("Upload complete:", data, file)
        }
        onDelete={() => {
          console.log("File deleted");
          setKey((prev) => prev + 1); // Reset component
        }}
      />
    );
  },
};

export const ErrorState: Story = {
  render: () => {
    const [key, setKey] = useState(0);

    return (
      <FileUpload
        key={key}
        title="Tap to Upload Document"
        acceptedFiles={[".png", ".jpg", ".pdf"]}
        uploadFn={mockUploadFail}
        onUploadFailed={(error, file) =>
          console.log("Upload failed:", error, file)
        }
        onDelete={() => {
          console.log("File deleted");
          setKey((prev) => prev + 1);
        }}
      />
    );
  },
};

export const ServerErrorState: Story = {
  render: () => {
    const [key, setKey] = useState(0);

    return (
      <FileUpload
        key={key}
        title="Tap to Upload Document"
        acceptedFiles={[".png", ".jpg", ".pdf"]}
        uploadFn={mockUploadError}
        onUploadFailed={(error, file) =>
          console.log("Upload failed:", error, file)
        }
        onDelete={() => {
          console.log("File deleted");
          setKey((prev) => prev + 1);
        }}
      />
    );
  },
};

export const SmallSize: Story = {
  render: () => (
    <FileUpload
      title="Upload File"
      acceptedFiles={[".png", ".jpg"]}
      uploadFn={mockUploadSuccess}
      size="sm"
      onUploadComplete={(data, file) =>
        console.log("Upload complete:", data, file)
      }
      onDelete={() => console.log("File deleted")}
    />
  ),
};

export const LargeSize: Story = {
  render: () => (
    <FileUpload
      title="Drop your files here"
      acceptedFiles={[".png", ".jpg", ".pdf", ".doc"]}
      uploadFn={mockUploadSuccess}
      size="lg"
      onUploadComplete={(data, file) =>
        console.log("Upload complete:", data, file)
      }
      onDelete={() => console.log("File deleted")}
    />
  ),
};

export const RestrictedFileTypes: Story = {
  render: () => (
    <FileUpload
      title="Upload Images Only"
      acceptedFiles={["image/*"]}
      uploadFn={mockUploadSuccess}
      maxUploadSize={1 * 1024 * 1024} // 1MB
      onUploadComplete={(data, file) =>
        console.log("Upload complete:", data, file)
      }
      onFileSelected={(file) => console.log("File selected:", file)}
      onUploadFailed={(error, file) =>
        console.log("Upload failed:", error, file)
      }
      onDelete={() => console.log("File deleted")}
    />
  ),
};

export const Disabled: Story = {
  render: () => (
    <FileUpload
      title="Upload Disabled"
      acceptedFiles={[".png", ".jpg", ".pdf"]}
      uploadFn={mockUploadSuccess}
      disabled={true}
      onUploadComplete={(data, file) =>
        console.log("Upload complete:", data, file)
      }
      onDelete={() => console.log("File deleted")}
    />
  ),
};

export const NoFileSize: Story = {
  render: () => (
    <FileUpload
      title="Upload Document"
      acceptedFiles={[".pdf", ".doc"]}
      uploadFn={mockUploadSuccess}
      showFileSize={false}
      onUploadComplete={(data, file) =>
        console.log("Upload complete:", data, file)
      }
      onDelete={() => console.log("File deleted")}
    />
  ),
};

// Recreating exact states from images
export const ExactStates: Story = {
  render: () => {
    const [uploadKey1, setUploadKey1] = useState(0);
    const [uploadKey2, setUploadKey2] = useState(0);
    const [uploadKey3, setUploadKey3] = useState(0);

    return (
      <div className="space-y-4 max-w-md">
        {/* Idle State */}
        <FileUpload
          key={uploadKey1}
          title="Tap to Upload Document"
          acceptedFiles={[".png", ".jpg", ".gif", ".pdf"]}
          uploadFn={mockUploadSuccess}
          onUploadComplete={(data, file) =>
            console.log("Upload 1 complete:", data, file)
          }
          onDelete={() => {
            console.log("File 1 deleted");
            setUploadKey1((prev) => prev + 1);
          }}
        />

        {/* Success State */}
        <FileUpload
          key={uploadKey2}
          title="Tap to Upload Document"
          acceptedFiles={[".png", ".jpg", ".gif", ".pdf"]}
          uploadFn={async (_file) => ({
            filename: "My_National_ID.PNG",
            url: "https://example.com/uploads/My_National_ID.PNG",
            id: "success123",
          })}
          onUploadComplete={(data, file) =>
            console.log("Upload 2 complete:", data, file)
          }
          onDelete={() => {
            console.log("File 2 deleted");
            setUploadKey2((prev) => prev + 1);
          }}
        />

        {/* Error State */}
        <FileUpload
          key={uploadKey3}
          title="Tap to Upload Document"
          acceptedFiles={[".png", ".jpg", ".gif", ".pdf"]}
          uploadFn={mockUploadFail}
          onUploadFailed={(error, file) =>
            console.log("Upload 3 failed:", error, file)
          }
          onDelete={() => {
            console.log("File 3 deleted");
            setUploadKey3((prev) => prev + 1);
          }}
        />
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 max-w-lg">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Small</h3>
        <FileUpload
          title="Upload File"
          acceptedFiles={[".png", ".jpg"]}
          uploadFn={mockUploadSuccess}
          size="sm"
          onUploadComplete={(data, file) =>
            console.log("Small upload complete:", data, file)
          }
          onDelete={() => console.log("Small file deleted")}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Medium (Default)
        </h3>
        <FileUpload
          title="Tap to Upload Document"
          acceptedFiles={[".png", ".jpg", ".pdf"]}
          uploadFn={mockUploadSuccess}
          size="md"
          onUploadComplete={(data, file) =>
            console.log("Medium upload complete:", data, file)
          }
          onDelete={() => console.log("Medium file deleted")}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Large</h3>
        <FileUpload
          title="Drop your files here"
          acceptedFiles={[".png", ".jpg", ".pdf", ".doc"]}
          uploadFn={mockUploadSuccess}
          size="lg"
          onUploadComplete={(data, file) =>
            console.log("Large upload complete:", data, file)
          }
          onDelete={() => console.log("Large file deleted")}
        />
      </div>
    </div>
  ),
};
