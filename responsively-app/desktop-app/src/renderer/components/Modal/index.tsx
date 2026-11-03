import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import {Fragment, ReactNode} from 'react';
import useOverlayRegistry from 'renderer/hooks/useOverlayRegistry';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

const Modal = ({isOpen, onClose, title, description, children}: Props) => {
  useOverlayRegistry(isOpen);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        onClose={onClose}
        className="relative z-50"
        as="div"
        aria-label={typeof title === 'string' ? title : 'Dialog'}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px]" aria-hidden="true" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-2 scale-[0.98]"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-2 scale-[0.98]"
            >
              <DialogPanel className="flex max-h-[calc(100vh-32px)] w-fit max-w-[calc(100vw-32px)] min-w-[320px] flex-col gap-4 overflow-x-hidden overflow-y-auto rounded-xl border border-line bg-panel p-6 text-fg shadow-elevated">
                {title != null || description != null ? (
                  <div>
                    {title != null ? (
                      <DialogTitle className="text-lg leading-6 font-semibold">{title}</DialogTitle>
                    ) : null}
                    {description != null ? (
                      <Description className="mt-1 text-sm text-muted">{description}</Description>
                    ) : null}
                  </div>
                ) : null}
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
