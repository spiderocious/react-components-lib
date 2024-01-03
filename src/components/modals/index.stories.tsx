import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { ModalProvider } from "./Context";
import { ModalContainer, modal, useModalManager } from "./Hook";

const meta: Meta = {
  title: "Components/Modal",
  decorators: [
    (Story) => (
      <ModalProvider>
        <Story />
        <ModalContainer />
      </ModalProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj;

// Component to demonstrate modal usage
const ModalDemo: React.FC = () => {
  useModalManager(); // Initialize global modal API

  //   const modalManager = useModal();

  // Sample form component for launch modal
  const SampleForm = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Enter Transaction PIN</h3>
      <p className="text-sm text-gray-600">
        Please enter your 4-digit transaction PIN to continue.
      </p>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Transaction PIN
        </label>
        <input
          type="password"
          maxLength={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter PIN"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <button
          onClick={() => modal.close()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            modal.close();
            modal.success({
              title: "Success!",
              description: "Transaction completed successfully.",
            });
          }}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Unlock Card
        </button>
      </div>
    </div>
  );

  const DeviceLimitForm = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
          <svg
            className="h-8 w-8 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold">Device Limit Reached</h3>
      </div>

      <p className="text-sm text-gray-600 text-center">
        You have reached the maximum number of allowed devices connected to your
        account. Please remove one of the following:
      </p>

      <div className="space-y-2">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="font-medium text-sm">Rayence Goubei Kimonas</div>
          <div className="text-xs text-gray-500">ID01393778</div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="font-medium text-sm">Prime Adenese</div>
          <div className="text-xs text-gray-500">
            1b White Ariyu, Jubeb Phone 1, Lagos
          </div>
        </div>
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="font-medium text-sm">CARD</div>
          <div className="text-xs text-gray-500">018658790012002</div>
        </div>
      </div>

      <div className="text-center">
        <div className="font-medium text-sm">Due Date</div>
        <div className="text-xs text-gray-500">Wednesday, Dec 13TH, 2023</div>
        <div className="text-xs text-gray-500 mt-2">N/A</div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={() => modal.close()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Button
        </button>
        <button
          onClick={() => modal.close()}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Button
        </button>
      </div>
    </div>
  );

  const OTPForm = () => (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
        <svg
          className="h-8 w-8 text-blue-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold">OTP Lockout</h3>
      <p className="text-sm text-gray-600">
        There have been too many failed OTP validation attempts at your account.
        Please change your password
      </p>

      <div className="flex gap-3 pt-4">
        <button
          onClick={() => modal.close()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Close
        </button>
        <button
          onClick={() => modal.close()}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Change Password
        </button>
      </div>
    </div>
  );

  const LocationErrorForm = () => (
    <div className="space-y-4 text-center">
      <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
        <div className="relative">
          <svg
            className="h-8 w-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8M12 8v8" />
          </svg>
          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="h-2 w-2 text-white"
              fill="currentColor"
              viewBox="0 0 8 8"
            >
              <circle cx="4" cy="4" r="3" />
            </svg>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-semibold">Unable to load location</h3>
      <p className="text-sm text-gray-600">
        Error occurred while trying to load map of QQQ and known location.
      </p>

      <button
        onClick={() => modal.close()}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  );

  return (
    <div className="space-y-4 p-6">
      <h2 className="text-xl font-bold mb-6">Modal API Examples</h2>

      {/* Basic Modals */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Basic Modals</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              modal.open({
                title: "Main Title",
                description:
                  "Some short or maybe long description which can take more than two lines",
                confirmButtonText: "Button",
                cancelButtonText: "Button",
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Basic Modal
          </button>

          <button
            onClick={() =>
              modal.open({
                title: "Main Title",
                description: "Change to your own component",
                confirmButtonText: "Button",
                cancelButtonText: "Button",
                showCloseButton: false,
              })
            }
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            No Close Button
          </button>
        </div>
      </div>

      {/* Status Modals */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Status Modals</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              modal.confirm({
                title: "Confirm Action",
                description:
                  "Are you sure you want to proceed with this action?",
                onConfirm: () => console.log("Confirmed!"),
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Confirm
          </button>

          <button
            onClick={() =>
              modal.alert({
                title: "Alert",
                description: "This is an important alert message.",
              })
            }
            className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
          >
            Alert
          </button>

          <button
            onClick={() =>
              modal.success({
                title: "Success!",
                description: "Your action was completed successfully.",
              })
            }
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Success
          </button>

          <button
            onClick={() =>
              modal.error({
                title: "Error",
                description: "Something went wrong. Please try again.",
              })
            }
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Error
          </button>

          <button
            onClick={() =>
              modal.warning({
                title: "Warning",
                description: "Please be careful with this action.",
              })
            }
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
          >
            Warning
          </button>

          <button
            onClick={() => {
              const loadingId = modal.loading({
                title: "Loading...",
                description: "Please wait while we process your request.",
              });
              setTimeout(() => modal.close(loadingId), 3000);
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Loading (3s)
          </button>
        </div>
      </div>

      {/* Launch Modals */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">
          Launch Modals (Custom Components)
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => modal.launch(<SampleForm />)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            PIN Entry Modal
          </button>

          <button
            onClick={() => modal.launch(<DeviceLimitForm />)}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Device Limit Modal
          </button>

          <button
            onClick={() => modal.launch(<OTPForm />)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            OTP Lockout Modal
          </button>

          <button
            onClick={() => modal.launch(<LocationErrorForm />)}
            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
          >
            Location Error Modal
          </button>
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Modal Variants</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() =>
              modal.launch(<SampleForm />, {
                variant: "bottomSheet",
                allowOutsideClickClose: true,
              })
            }
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Bottom Sheet
          </button>

          <button
            onClick={() =>
              modal.launch(<DeviceLimitForm />, {
                variant: "fullscreen",
              })
            }
            className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
          >
            Fullscreen
          </button>

          <button
            onClick={() =>
              modal.launch(<SampleForm />, {
                variant: "sidePanel",
                sidePanelPosition: "right",
              })
            }
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            Side Panel (Right)
          </button>

          <button
            onClick={() =>
              modal.launch(<SampleForm />, {
                variant: "sidePanel",
                sidePanelPosition: "left",
              })
            }
            className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700"
          >
            Side Panel (Left)
          </button>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="space-y-3 border-t pt-6">
        <h3 className="text-lg font-semibold">Modal Controls</h3>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => modal.closeAll()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Close All Modals
          </button>

          <button
            onClick={() => {
              modal.open({ title: "Modal 1", description: "First modal" });
              setTimeout(
                () =>
                  modal.open({ title: "Modal 2", description: "Second modal" }),
                500
              );
              setTimeout(
                () =>
                  modal.open({ title: "Modal 3", description: "Third modal" }),
                1000
              );
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Multiple Modals
          </button>
        </div>
      </div>
    </div>
  );
};

// Story definitions
export const Default: Story = {
  render: () => <ModalDemo />,
};

export const BasicModal: Story = {
  render: () => {
    const Demo = () => {
      useModalManager();

      return (
        <div className="p-6">
          <button
            onClick={() =>
              modal.open({
                title: "Main Title",
                description:
                  "Some short or maybe long description which can take more than two lines",
                confirmButtonText: "Button",
                cancelButtonText: "Button",
              })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Open Basic Modal
          </button>
        </div>
      );
    };

    return <Demo />;
  },
};

export const StatusModals: Story = {
  render: () => {
    const Demo = () => {
      useModalManager();

      return (
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() =>
                modal.success({
                  title: "Success!",
                  description: "Your operation completed successfully.",
                })
              }
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Success Modal
            </button>

            <button
              onClick={() =>
                modal.error({
                  title: "Error Occurred",
                  description: "Something went wrong. Please try again.",
                })
              }
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Error Modal
            </button>

            <button
              onClick={() =>
                modal.warning({
                  title: "Warning",
                  description: "Please review your action before proceeding.",
                })
              }
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
            >
              Warning Modal
            </button>

            <button
              onClick={() =>
                modal.confirm({
                  title: "Confirm Delete",
                  description:
                    "Are you sure you want to delete this item? This action cannot be undone.",
                  confirmButtonText: "Delete",
                  confirmButtonType: "danger",
                  onConfirm: () => console.log("Item deleted!"),
                })
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Confirm Modal
            </button>
          </div>
        </div>
      );
    };

    return <Demo />;
  },
};

export const ModalVariants: Story = {
  render: () => {
    const Demo = () => {
      useModalManager();

      const SampleContent = () => (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Sample Content</h3>
          <p className="text-gray-600">
            This is sample content for different modal variants.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => modal.close()}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => modal.close()}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Confirm
            </button>
          </div>
        </div>
      );

      return (
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() =>
                modal.launch(<SampleContent />, { variant: "bottomSheet" })
              }
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Bottom Sheet
            </button>

            <button
              onClick={() =>
                modal.launch(<SampleContent />, { variant: "fullscreen" })
              }
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Fullscreen
            </button>

            <button
              onClick={() =>
                modal.launch(<SampleContent />, {
                  variant: "sidePanel",
                  sidePanelPosition: "right",
                })
              }
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Side Panel Right
            </button>

            <button
              onClick={() =>
                modal.launch(<SampleContent />, {
                  variant: "sidePanel",
                  sidePanelPosition: "left",
                })
              }
              className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
            >
              Side Panel Left
            </button>
          </div>
        </div>
      );
    };

    return <Demo />;
  },
};
