'use client';
import { createContext, useContext, useState, useCallback } from 'react';

import DialogPortal from '@components/portal/dialog-portal';

export interface DialogState {
  title: string;
  content: React.ReactNode;
  showFooter?: boolean;
  closeButtonText?: string;
  onClose?: () => void;
}

interface DialogContextType {
  showDialog: (
    title: string,
    content: React.ReactNode,
    options?: Omit<DialogState, 'title' | 'content'>
  ) => void;
  closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

function DialogProvider({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const [dialog, setDialog] = useState<DialogState | null>(null);

  const showDialog = useCallback(
    (
      title: string,
      content: React.ReactNode,
      options?: Omit<DialogState, 'title' | 'content'>
    ) => {
      setDialog({
        title,
        content,
        ...options,
      });
    },
    []
  );

  const closeDialog = useCallback(() => {
    // Run the callback if it exists before closing
    if (dialog?.onClose) {
      dialog.onClose();
    }
    setDialog(null);
  }, [dialog]);

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}
      {dialog && (
        <DialogPortal
          title={dialog.title}
          showFooter={dialog.showFooter}
          closeButtonText={dialog.closeButtonText}
          onClose={closeDialog}
        >
          {dialog.content}
        </DialogPortal>
      )}
    </DialogContext.Provider>
  );
}

function useDialog(): DialogContextType {
  const context = useContext(DialogContext);
  if (!context) throw new Error('useDialog must be used within DialogProvider');
  return context;
}

export { DialogProvider, useDialog };
