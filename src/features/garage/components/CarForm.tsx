import type { FormEvent } from 'react';
import Button from '@/shared/components/Button';
import { useAppDispatch, useAppSelector } from '@/store';
import { setCreateForm, setEditForm, setSelectedCar } from '@/store/garageSlice';
import { validateCarName } from '../utils';
import styles from './CarForm.module.css';

interface CarFormProps {
  onCreate: (name: string, color: string) => Promise<void>;
  onUpdate: (id: number, name: string, color: string) => Promise<void>;
}

function CarForm({ onCreate, onUpdate }: CarFormProps) {
  const dispatch = useAppDispatch();
  const { createForm, editForm, selectedCar } = useAppSelector((s) => s.garage);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    const error = validateCarName(createForm.name);
    if (error) { alert(error); return; }
    await onCreate(createForm.name.trim(), createForm.color);
    dispatch(setCreateForm({ name: '', color: createForm.color }));
  }

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();
    if (!selectedCar) return;
    const error = validateCarName(editForm.name);
    if (error) { alert(error); return; }
    await onUpdate(selectedCar.id, editForm.name.trim(), editForm.color);
    dispatch(setSelectedCar(null));
  }

  return (
    <div className={styles.forms}>
      {/* Create form */}
      <form className={styles.form} onSubmit={(e) => void handleCreate(e)}>
        <input
          className={styles.input}
          type="text"
          placeholder="Car name"
          value={createForm.name}
          onChange={(e) => dispatch(setCreateForm({ name: e.target.value }))}
        />
        <input
          className={styles.colorPicker}
          type="color"
          value={createForm.color}
          onChange={(e) => dispatch(setCreateForm({ color: e.target.value }))}
        />
        <Button type="submit" variant="primary" size="sm">Create</Button>
      </form>

      {/* Edit form — only active when a car is selected */}
      <form className={styles.form} onSubmit={(e) => void handleUpdate(e)}>
        <input
          className={styles.input}
          type="text"
          placeholder="Select a car to edit"
          value={editForm.name}
          disabled={!selectedCar}
          onChange={(e) => dispatch(setEditForm({ name: e.target.value }))}
        />
        <input
          className={styles.colorPicker}
          type="color"
          value={editForm.color}
          disabled={!selectedCar}
          onChange={(e) => dispatch(setEditForm({ color: e.target.value }))}
        />
        <Button type="submit" variant="secondary" size="sm" disabled={!selectedCar}>
          Update
        </Button>
      </form>
    </div>
  );
}

export default CarForm;
