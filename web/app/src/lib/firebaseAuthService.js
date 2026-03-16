/**
 * firebaseAuthService.js
 * Thin wrappers around Firebase Auth methods.
 * All functions return { data, error } so callers never need try/catch.
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification as fbSendEmailVerification,
  sendPasswordResetEmail as fbSendPasswordResetEmail,
  signOut,
  onAuthStateChanged as fbOnAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

/* ── helpers ─────────────────────────────────────────────── */
const wrap = async (fn) => {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (err) {
    console.error("[firebaseAuthService]", err.code, err.message);
    return { data: null, error: err };
  }
};

/* ── email / password ────────────────────────────────────── */

/**
 * Register a new user with email + password.
 * Optionally sets displayName and sends a verification email.
 */
export const signUpWithEmail = ({ email, password, displayName }) =>
  wrap(async () => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    await fbSendEmailVerification(cred.user);
    return cred.user;
  });

export const signInWithEmail = ({ email, password }) =>
  wrap(() => signInWithEmailAndPassword(auth, email, password).then((c) => c.user));

/* ── Google OAuth ────────────────────────────────────────── */

export const signInWithGoogle = () =>
  wrap(() => signInWithPopup(auth, googleProvider).then((c) => c.user));

/* ── Email verification ──────────────────────────────────── */

export const sendEmailVerification = (user) =>
  wrap(() => fbSendEmailVerification(user ?? auth.currentUser));

/* ── Password reset ──────────────────────────────────────── */

export const forgotPassword = (email) =>
  wrap(() => fbSendPasswordResetEmail(auth, email));

/* ── Sign out ────────────────────────────────────────────── */

export const logOut = () => wrap(() => signOut(auth));

/* ── Auth state observer ─────────────────────────────────── */

/** Subscribe to auth state changes. Returns the unsubscribe function. */
export const onAuthChange = (callback) => fbOnAuthStateChanged(auth, callback);

/* ── ID token ────────────────────────────────────────────── */

/** Get the current user's Firebase ID token (JWT). */
export const getCurrentToken = async (forceRefresh = false) => {
  const user = auth?.currentUser;
  if (!user) return null;
  try {
    return await user.getIdToken(forceRefresh);
  } catch {
    return null;
  }
};
