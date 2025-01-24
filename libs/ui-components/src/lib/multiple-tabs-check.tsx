'use client';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useCallback, useEffect, useState, useRef, ReactNode } from 'react';

const useTabsCountWithBroadcastChannel = () => {
  const bc = useRef(new BroadcastChannel('my site'));
  const [duplicateTab, setDuplicateTab] = useState<boolean>(false);
  const handleMessage = useCallback((event: MessageEvent) => {
    if (event.data === 'loaded') {
      setDuplicateTab(true);
      bc.current.postMessage(`go away`);
    }
    if (event.data === 'go away') {
      setDuplicateTab(true);
    }
  }, []);
  const sendBroadcast = useCallback(() => {
    bc.current.postMessage('loaded');
  }, []);
  useEffect(() => {
    sendBroadcast();
    bc.current.onmessage = handleMessage;
  }, [handleMessage, sendBroadcast]);
  return duplicateTab;
};

export const MultipleTabsCheck = ({ children }: { children: ReactNode }) => {
  const duplicateDetected = useTabsCountWithBroadcastChannel();

  return (
    <Modal
      isOpen={duplicateDetected}
      isDismissable={false}
      hideCloseButton
      className="w-full"
    >
      <ModalContent className="w-full max-w-full h-5/6 items-center flex">
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Duplicate tab detected
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
