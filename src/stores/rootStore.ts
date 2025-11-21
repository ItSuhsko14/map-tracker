import { objectsStore } from './objectsStore';

export class RootStore {
  objectsStore = objectsStore;

  constructor() {}

  init() {
    this.objectsStore.startCleanupLoop();
    return this;
  }
}

export const rootStore = new RootStore();
