import { Modal } from './Modal';

interface ConfirmDialogProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ message, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <Modal title="Tasdiqlash" onClose={onCancel}>
      <p style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>{message}</p>
      <div className="form-actions">
        <button className="btn btn-ghost" onClick={onCancel}>
          Bekor qilish
        </button>
        <button className="btn btn-danger" onClick={onConfirm}>
          O'chirish
        </button>
      </div>
    </Modal>
  );
}
