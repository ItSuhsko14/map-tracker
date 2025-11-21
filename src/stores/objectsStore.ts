import { makeAutoObservable } from 'mobx';
import type { ObjectItem } from '../types/ObjectItem';

export type ObjectStatus = 'active' | 'lost';

export interface TrackedObject extends ObjectItem {
  status: ObjectStatus;
  lastSeenAt: number;
}

const LOST_AFTER_MS = 3_000;
const REMOVE_AFTER_MS = 10_000;

class ObjectsStore {
  objects = new Map<string, TrackedObject>();
  selectedObjectId: string | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  startCleanupLoop() {
    setInterval(this.cleanupLost, 1000);
  }

  updateFromServer(items: ObjectItem[]) {
    const now = Date.now();

    items.forEach((item) => {
      const existing = this.objects.get(item.id);

      const base: TrackedObject = existing ?? {
        ...item,
        status: 'active',
        lastSeenAt: now,
      };

      this.objects.set(item.id, {
        ...base,
        ...item,
        status: 'active',
        lastSeenAt: now,
      });
    });
  }

  get activeObjects(): TrackedObject[] {
    return Array.from(this.objects.values()).filter((obj) => obj.status === 'active');
  }

  get allObjects(): TrackedObject[] {
    return Array.from(this.objects.values());
  }

  get selectedObject(): TrackedObject | undefined {
    return this.selectedObjectId ? this.objects.get(this.selectedObjectId) : undefined;
  }

  setSelected(id: string) {
    this.selectedObjectId = id;
  }

  cleanupLost() {
    const now = Date.now();

    this.objects.forEach((obj, id) => {
      const diff = now - obj.lastSeenAt;

      if (diff > REMOVE_AFTER_MS) {
        this.objects.delete(id);
        return;
      }

      if (diff > LOST_AFTER_MS && obj.status === 'active') {
        this.objects.set(id, { ...obj, status: 'lost' });
      }
    });
  }

  reset() {
    this.objects.clear();
  }
}

export const objectsStore = new ObjectsStore();
