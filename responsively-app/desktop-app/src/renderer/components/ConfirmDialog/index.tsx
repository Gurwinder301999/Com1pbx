import {useEffect, useState} from 'react';
import Button from '../Button';
import Modal from '../Modal';

export const ConfirmDialog = ({
  onClose,
  onConfirm,
  open,
  confirmText,
}: {
  onClose?: () => void;
  onConfirm?: () => void;
  open: boolean;
  confirmText?: string;
}) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    onClose?.();
    setIsOpen(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Confirm action">
      <div data-testid="confirm-dialog" className="flex flex-col gap-5">
        <p className="m-0 text-center text-sm text-fg">{confirmText || 'Are you sure?'}</p>
        <div className="flex justify-center gap-2">
          <Button onClick={handleConfirm} isPrimary>
            Confirm
          </Button>
          <Button onClick={handleClose} isActionButton>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};
