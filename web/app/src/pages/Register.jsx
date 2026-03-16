import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RoleSelector, { ROLE_OPTIONS } from '../components/register/RoleSelector';
import StepPersonalDetails from '../components/register/StepPersonalDetails';
import StepRoleFields from '../components/register/StepRoleFields';
import StepOTP from '../components/register/StepOTP';
import StepProfilePhoto from '../components/register/StepProfilePhoto';
import { signUpWithEmail } from '@/lib/firebaseAuthService';
import { saveUserRole } from '@/lib/userRoleService';

const STEPS = ['Choose Role', 'Personal Details', 'Role Info', 'Verify Email', 'Profile & Consent'];

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedRole, setSelectedRole] = useState('');
  const [form, setForm] = useState({});
  const [emailVerified, setEmailVerified] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const selectedRoleConfig = ROLE_OPTIONS.find((item) => item.id === selectedRole) || null;
  const inviteCode = (form.invite_code || '').trim();
  const requiresInviteCode = Boolean(selectedRoleConfig?.restricted);
  const hasValidInviteCode = inviteCode.length > 0;

  const canNext = () => {
    if (step === 0) return !!selectedRole;
    if (step === 1) return form.full_name && form.email && form.password;
    if (step === 2 && requiresInviteCode) return hasValidInviteCode;
    if (step === 3) return emailVerified;
    if (step === 4) return form.popia_consent;
    return true;
  };

  const handleContinue = async () => {
    if (!selectedRole) {
      setSubmitError('Please select a role to continue.');
      return;
    }

    if (step === 2 && requiresInviteCode && !hasValidInviteCode) {
      setSubmitError('Invitation code is required for this role.');
      return;
    }

    if (step === 2 && !accountCreated) {
      setSubmitting(true);
      setSubmitError('');
      const { data: user, error } = await signUpWithEmail({
        email: form.email,
        password: form.password,
        displayName: form.full_name,
      });

      if (error) {
        setSubmitting(false);
        const msg = error.code === 'auth/email-already-in-use'
          ? 'An account with this email already exists.'
          : error.code === 'auth/weak-password'
          ? 'Password must be at least 6 characters.'
          : 'Registration failed. Please try again.';
        setSubmitError(msg);
        return;
      }

      try {
        await saveUserRole({
          uid: user.uid,
          email: user.email,
          role: selectedRole,
          inviteCode,
        });
      } catch (err) {
        setSubmitting(false);
        setSubmitError(err.message || 'Role save failed. Please try again.');
        return;
      }

      setSubmitting(false);
      setAccountCreated(true);
      setStep(3);
      return;
    }

    if (step < STEPS.length - 1) {
      setStep(step + 1);
      return;
    }

    navigate(`/Onboarding?role=${selectedRole}`);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="mb-6"><p className="text-xs text-muted-foreground">Step {step + 1} of {STEPS.length}</p></div>
          {submitError && <div className="text-destructive text-xs mb-3">{submitError}</div>}
          <div className="min-h-[300px]">
            {step === 0 && (
              <RoleSelector
                selected={selectedRole}
                onSelect={(role) => {
                  setSelectedRole(role);
                  setForm({ ...form, role });
                  setSubmitError('');
                }}
              />
            )}
            {step === 1 && <StepPersonalDetails form={form} setForm={setForm} />}
            {step === 2 && <StepRoleFields role={selectedRole} form={form} setForm={setForm} />}
            {step === 3 && <StepOTP email={form.email} verified={emailVerified} onVerify={() => setEmailVerified(true)} />}
            {step === 4 && <StepProfilePhoto form={form} setForm={setForm} />}
          </div>
          <div className="flex gap-3 mt-6">
            {step > 0 && <Button variant="outline" className="flex-1 h-12" onClick={() => setStep(step - 1)} disabled={submitting}><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>}
            <Button className={`h-12 bg-primary ${step === 0 ? 'w-full' : 'flex-1'}`} onClick={handleContinue} disabled={!canNext() || submitting}>
              {submitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {step === STEPS.length - 1 ? 'Finish' : 'Continue'}
              {!submitting && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
