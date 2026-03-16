import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPassword } from '@/lib/firebaseAuthService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { setError('Please enter your email address.'); return; }
    setError('');
    setLoading(true);
    const { error: err } = await forgotPassword(email);
    setLoading(false);
    if (err) {
      setError(err.code === 'auth/user-not-found' ? 'No account found with this email.' : 'Failed to send reset email. Try again.');
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-card border border-border rounded-2xl p-8">
        {sent ? (
          <div className="text-center space-y-4">
            <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
            <h1 className="text-xl font-bold">Check your inbox</h1>
            <p className="text-sm text-muted-foreground">A password reset link has been sent to <span className="font-medium text-foreground">{email}</span>.</p>
            <Link to="/Login" className="flex items-center gap-1.5 text-xs text-muted-foreground justify-center hover:text-primary"><ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className="text-xl font-bold mb-4">Reset Password</h1>
            {error && <div className="text-destructive text-xs mb-3">{error}</div>}
            <Label className="text-xs">Email Address</Label>
            <Input className="mt-1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" disabled={loading} />
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Send Reset Link
            </Button>
            <Link to="/Login" className="flex items-center gap-1.5 text-xs text-muted-foreground mt-6 justify-center hover:text-primary"><ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In</Link>
          </form>
        )}
      </div>
    </div>
  );
}
