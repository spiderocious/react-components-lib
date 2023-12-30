import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type ModalType =
  | "default"
  | "confirm"
  | "alert"
  | "success"
  | "error"
  | "warning"
  | "loading";
export type ButtonType =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning";
export type ModalVariant =
  | "center"
  | "bottomSheet"
  | "fullscreen"
  | "sidePanel";
export type SidePanelPosition = "left" | "right";

export interface BaseModalOptions {
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  allowOutsideClickClose?: boolean;
  containerClassName?: string;
  contentClassName?: string;
  overlayClassName?: string;
  onClose?: () => void;
  variant?: ModalVariant;
  sidePanelPosition?: SidePanelPosition;
  showCloseButton?: boolean;
}

export interface ActionModalOptions extends BaseModalOptions {
  confirmButtonText?: string;
  confirmButtonType?: ButtonType;
  showConfirmButton?: boolean;
  confirmButtonClassName?: string;
  cancelButtonText?: string;
  cancelButtonType?: ButtonType;
  showCancelButton?: boolean;
  cancelButtonClassName?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
}

export interface LaunchModalOptions extends BaseModalOptions {
  component: ReactNode;
  bottomSheet?: boolean;
  fullscreen?: boolean;
}

export interface Modal {
  id: string;
  type: ModalType;
  options: ActionModalOptions | LaunchModalOptions;
  isVisible: boolean;
}

interface ModalContextType {
  modals: Modal[];
  open: (options: ActionModalOptions) => string;
  launch: (
    component: ReactNode,
    options?: Omit<LaunchModalOptions, "component">
  ) => string;
  confirm: (options: Omit<ActionModalOptions, "type">) => string;
  alert: (options: Omit<ActionModalOptions, "type">) => string;
  success: (options: Omit<ActionModalOptions, "type">) => string;
  error: (options: Omit<ActionModalOptions, "type">) => string;
  warning: (options: Omit<ActionModalOptions, "type">) => string;
  loading: (options?: Omit<ActionModalOptions, "type">) => string;
  close: (id?: string) => void;
  closeAll: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addModal = useCallback(
    (
      type: ModalType,
      options: ActionModalOptions | LaunchModalOptions
    ): string => {
      const id = generateId();
      const modal: Modal = {
        id,
        type,
        options,
        isVisible: true,
      };

      setModals((prev) => [...prev, modal]);
      return id;
    },
    []
  );

  const open = useCallback(
    (options: ActionModalOptions): string => {
      return addModal("default", {
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        confirmButtonType: "primary",
        cancelButtonType: "secondary",
        allowOutsideClickClose: true,
        variant: "center",
        showCloseButton: true,
        ...options,
      });
    },
    [addModal]
  );

  const launch = useCallback(
    (
      component: ReactNode,
      options: Omit<LaunchModalOptions, "component"> = {}
    ): string => {
      return addModal("default", {
        component,
        allowOutsideClickClose: true,
        variant: options.bottomSheet
          ? "bottomSheet"
          : options.fullscreen
          ? "fullscreen"
          : "center",
        showCloseButton: true,
        ...options,
      });
    },
    [addModal]
  );

  const confirm = useCallback(
    (options: Omit<ActionModalOptions, "type">): string => {
      return addModal("confirm", {
        title: "Confirm Action",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        confirmButtonType: "primary",
        cancelButtonType: "secondary",
        allowOutsideClickClose: false,
        variant: "center",
        showCloseButton: false,
        icon: (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        ),
        ...options,
      });
    },
    [addModal]
  );

  const alert = useCallback(
    (options: Omit<ActionModalOptions, "type">): string => {
      return addModal("alert", {
        title: "Alert",
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: "OK",
        confirmButtonType: "primary",
        allowOutsideClickClose: true,
        variant: "center",
        showCloseButton: true,
        icon: (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        ),
        ...options,
      });
    },
    [addModal]
  );

  const success = useCallback(
    (options: Omit<ActionModalOptions, "type">): string => {
      return addModal("success", {
        title: "Success",
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: "OK",
        confirmButtonType: "success",
        allowOutsideClickClose: true,
        variant: "center",
        showCloseButton: true,
        icon: (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        ),
        ...options,
      });
    },
    [addModal]
  );

  const error = useCallback(
    (options: Omit<ActionModalOptions, "type">): string => {
      return addModal("error", {
        title: "Error",
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: "OK",
        confirmButtonType: "danger",
        allowOutsideClickClose: true,
        variant: "center",
        showCloseButton: true,
        icon: (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        ),
        ...options,
      });
    },
    [addModal]
  );

  const warning = useCallback(
    (options: Omit<ActionModalOptions, "type">): string => {
      return addModal("warning", {
        title: "Warning",
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: "OK",
        confirmButtonType: "warning",
        allowOutsideClickClose: true,
        variant: "center",
        showCloseButton: true,
        icon: (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
            <svg
              className="h-6 w-6 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.268 16c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        ),
        ...options,
      });
    },
    [addModal]
  );

  const loading = useCallback(
    (options: Omit<ActionModalOptions, "type"> = {}): string => {
      return addModal("loading", {
        title: "Loading...",
        showConfirmButton: false,
        showCancelButton: false,
        allowOutsideClickClose: false,
        variant: "center",
        showCloseButton: false,
        icon: (
          <div className="mx-auto flex items-center justify-center h-12 w-12">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ),
        ...options,
      });
    },
    [addModal]
  );

  const close = useCallback((id?: string) => {
    if (id) {
      setModals((prev) => prev.filter((modal) => modal.id !== id));
    } else {
      // Close the topmost modal
      setModals((prev) => prev.slice(0, -1));
    }
  }, []);

  const closeAll = useCallback(() => {
    setModals([]);
  }, []);

  const value: ModalContextType = {
    modals,
    open,
    launch,
    confirm,
    alert,
    success,
    error,
    warning,
    loading,
    close,
    closeAll,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
