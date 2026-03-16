import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, RefreshCw, Loader2, CheckCircle2 } from 'lucide-react';
import { sendEmailVerification } from '@/lib/firebaseAuthService';
import { auth } from '@/lib/firebase';

export default function StepOTP({ email, verified, onVerify }) {
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('We sent a verification link to your email.');

  const handleSend = async () => {
    if (!auth?.currentUser) {
      setError('No active account found. Go back and continue again.');
      return;
    }
    setError('');
    setSending(true);
    const { error: err } = await sendEmailVerification(auth.currentUser);
    setSending(false);
    if (err) {
      setError('Failed to send verification email. Please try again.');
      return;
    }
    setInfo('Verification email sent. Check your inbox and spam folder.');
  };

  const handleVerify = async () => {
    if (!auth?.currentUser) {
      setError('No active account found.');
      return;
    }
    setError('');
    setVerifying(true);
    try {
      await auth.currentUser.reload();
      if (!auth.currentUser.emailVerified) {
        setError('Email not verified yet. Open your inbox and click the verification link, then try again.');
        return;
      }
      onVerify();
    } catch {
      setError('Unable to verify email status. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    await handleSend();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-4">
          <Mail className="w-7 h-7 text-primary" />
        </div>
        <p className="text-base font-semibold">Verify Your Email</p>
        <p className="text-sm text-muted-foreground mt-1">We'll send a verification link to</p>
        <p className="text-primary font-semibold break-all">{email || 'you@example.com'}</p>
      </div>

      {error && <p className="text-destructive text-xs text-center">{error}</p>}
      {!error && <p className="text-muted-foreground text-xs text-center">{info}</p>}

      {verified ? (
        <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
          <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <p className="text-green-400 font-semibold text-lg">✓ Email Verified!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <Button className="w-full h-12 bg-primary" onClick={handleVerify} disabled={verifying}>
            {verifying ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            I've Verified My Email
          </Button>
          <button
            onClick={handleResend}
            disabled={sending}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary mx-auto disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${sending ? 'animate-spin' : ''}`} />
            Resend Verification Email
          </button>
        </div>
      )}
    </div>
  );
}
