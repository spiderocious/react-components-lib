/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalComponent } from "./";
import { useModal } from "./Context";

export const ModalContainer: React.FC = () => {
  const { modals, close } = useModal();

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && modals.length > 0) {
        const topModal = modals[modals.length - 1];
        if (topModal.options.allowOutsideClickClose !== false) {
          close(topModal.id);
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [modals, close]);

  // Prevent body scroll when modals are open
  useEffect(() => {
    if (modals.length > 0) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modals.length]);

  if (modals.length === 0) return null;

  return createPortal(
    <>
      {modals.map((modal) => (
        <ModalComponent key={modal.id} modal={modal} onClose={close} />
      ))}
    </>,
    document.body
  );
};

// Global modal API that can be used outside of React components
class ModalAPI {
  private static instance: ModalAPI;
  private modalManager: any = null;

  static getInstance(): ModalAPI {
    if (!ModalAPI.instance) {
      ModalAPI.instance = new ModalAPI();
    }
    return ModalAPI.instance;
  }

  setManager(manager: any) {
    this.modalManager = manager;
  }

  open(options: any) {
    if (!this.modalManager) {
      console.warn(
        "Modal manager not initialized. Make sure ModalProvider is mounted."
      );
      return "";
    }
    return this.modalManager.open(options);
  }

  launch(component: any, options?: any) {
    if (!this.modalManager) {
      console.warn(
        "Modal manager not initialized. Make sure ModalProvider is mounted."
      );
      return "";
    }
    return this.modalManager.launch(component, options);
  }

  confirm(options: any) {
    if (!this.modalManager) {
      console.warn(
        "Modal manager not initialized. Make sure ModalProvider is mounted."
      );
      return "";
    }
    return this.modalManager.confirm(options);
  }

  alert(options: any) {
    if (!this.modalManager) {
      console.warn(
        "Modal manager not initialized. Make sure ModalProvider is mounted."
      );
      return "";
    }
    return this.modalManager.alert(options);
  }

  success(options: any) {
    if (!this.modalManager) {
      console.warn(
        "Modal manager not initialized. Make sure ModalProvider is mounted."
      );
      return "";
    }
    return this.modalManager.success(options);
  }

  error(options: any) {
    if (!this.modalManager) {
      console.warn(
        "Modal manager not initialized. Make sure ModalProvider is mounted."
      );
      return "";
    }
    return this.modalManager.error(options);
  }

  warning(options: any) {
    if (!this.modalManager) {
      console.warn(
        "Modal manager not initialized. Make sure ModalProvider is mounted."
      );
      return "";
    }
    return this.modalManager.warning(options);
  }

  loading(options?: any) {
    if (!this.modalManager) {
      console.warn(
        "Modal manager not initialized. Make sure ModalProvider is mounted."
      );
      return "";
    }
    return this.modalManager.loading(options);
  }

  close(id?: string) {
    if (!this.modalManager) {
      console.warn(
        "Modal manager not initialized. Make sure ModalProvider is mounted."
      );
      return;
    }
    this.modalManager.close(id);
  }

  closeAll() {
    if (!this.modalManager) {
      console.warn(
        "Modal manager not initialized. Make sure ModalProvider is mounted."
      );
      return;
    }
    this.modalManager.closeAll();
  }
}

export const modal = ModalAPI.getInstance();

// Hook to initialize the global modal API
export const useModalManager = () => {
  const modalManager = useModal();

  useEffect(() => {
    modal.setManager(modalManager);
  }, [modalManager]);

  return modalManager;
};

// Higher-order component to automatically initialize modal manager
export const withModalManager = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return React.forwardRef<any, P>((props, ref) => {
    useModalManager();
    return <Component {...(props as P)} ref={ref} />;
  });
};
