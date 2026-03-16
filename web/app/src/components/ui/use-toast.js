import { useState, useEffect } from 'react';

const listeners = [];
let memoryState = { toasts: [] };
let count = 0;

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
};

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

function dispatch(action) {
  if (action.type === actionTypes.ADD_TOAST) {
    memoryState = { ...memoryState, toasts: [action.toast, ...memoryState.toasts].slice(0, 20) };
  }
  if (action.type === actionTypes.DISMISS_TOAST) {
    memoryState = { ...memoryState, toasts: memoryState.toasts.filter((t) => t.id !== action.toastId) };
  }
  listeners.forEach((listener) => listener(memoryState));
}

function toast(props) {
  const id = genId();
  dispatch({ type: actionTypes.ADD_TOAST, toast: { ...props, id, open: true } });
  return { id, dismiss: () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id }) };
}

function useToast() {
  const [state, setState] = useState(memoryState);
  useEffect(() => {
    listeners.push(setState);
    return () => {
      const i = listeners.indexOf(setState);
      if (i > -1) listeners.splice(i, 1);
    };
  }, []);

  return { ...state, toast, dismiss: (toastId) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }) };
}

export { useToast, toast };
