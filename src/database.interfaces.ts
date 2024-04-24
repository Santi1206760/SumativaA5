import firebase from 'firebase/compat/app';

// @ts-ignore
export interface DatabaseSnapshotExists<T> extends firebase.database.DataSnapshot {
  exists(): true;
  val(): T;
}

// @ts-ignore
export interface DatabaseSnapshotDoesNotExist<T> extends firebase.database.DataSnapshot {
  exists(): false;
  val(): null;
}

export type DatabaseSnapshot<T> = DatabaseSnapshotExists<T> | DatabaseSnapshotDoesNotExist<T>;