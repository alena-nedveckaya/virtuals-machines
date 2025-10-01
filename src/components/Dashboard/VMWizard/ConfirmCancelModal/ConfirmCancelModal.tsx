import { Button, Icon, Modal } from '@/components';
import classes from './ConfirmCancelModal.module.scss';

interface ConfirmCancelModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmCancelModal = ({ isOpen, onConfirm, onCancel }: ConfirmCancelModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} className={classes.modal}>
      <div className={classes.icon}>
        <Icon name="exclamation" size={24} />
      </div>

      <h2 className={classes.title}>Cancel creating?</h2>

      <p className={classes.message}>
        You have unsaved changes that will be lost. Do you want to continue?
      </p>

      <div className={classes.actions}>
        <Button type="button" variant="primary" onClick={onConfirm} className={classes.leaveBtn}>
          Leave
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} className={classes.cancelBtn}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmCancelModal;
