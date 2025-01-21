export const loadStateLocalStorage = <T>(key: string): T | undefined => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as T;
  } catch (error) {
    console.warn(
      `Failed to load state for key "${key}" from localStorage:`,
      error,
    );
    return undefined;
  }
};

export const saveStateLocalStorage = <T>(key: string, state: T): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.warn(
      `Failed to save state for key "${key}" to localStorage:`,
      error,
    );
  }
};

export const removeStateLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(
      `Failed to remove state for key "${key}" from localStorage:`,
      error,
    );
  }
};
