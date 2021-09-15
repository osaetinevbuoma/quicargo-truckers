import * as bootstrap from "bootstrap";
import { useEffect, useRef, useState } from "react";

interface IModal {
  title: string;
  open: boolean;
  children: any;
}

const ModalComponent = ({ title, open, children }: IModal): JSX.Element => {
  const [modal, setModal] = useState<any>();

  const modalRef = useRef(null);

  useEffect(() => {
    const element = modalRef.current;

    if (modalRef && element) {
      const bModal = new bootstrap.Modal(element, {
        keyboard: false,
        backdrop: 'static'
      });
      setModal(bModal);
    }
  }, [modalRef]);

  useEffect(() => {
    if (modal) {
      if (open) modal.show();
      else modal.hide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <div className="modal fade" id="modal" tabIndex={-1} ref={modalRef}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {title}
            </h5>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalComponent;
