import React, { useState } from 'react';
import { Camera, CheckCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function StepProfilePhoto({ form, setForm }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setForm({ ...form, photo_url: file_url });
    setUploading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <label className="cursor-pointer">
          <div className={`w-28 h-28 rounded-full border-2 flex items-center justify-center transition-all overflow-hidden ${form.photo_url ? 'border-primary' : 'border-dashed border-border hover:border-primary/50'}`}>
            {form.photo_url ? <img src={form.photo_url} alt="Profile" className="w-full h-full object-cover" /> : <div className="flex flex-col items-center gap-2 text-muted-foreground"><Camera className="w-8 h-8" /><span className="text-xs">{uploading ? 'Uploading...' : 'Add Photo'}</span></div>}
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleFile} />
        </label>
      </div>
      <div className="p-4 bg-secondary rounded-xl border border-border space-y-3">
        <p className="text-sm font-semibold">POPIA Consent & Data Processing Notice</p>
        <label className="flex items-start gap-3 cursor-pointer">
          <div onClick={() => setForm({ ...form, popia_consent: !form.popia_consent })} className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center ${form.popia_consent ? 'bg-primary border-primary' : 'border-border'}`}>{form.popia_consent && <CheckCircle className="w-3.5 h-3.5 text-white" />}</div>
          <span className="text-xs text-foreground">I agree to Terms and POPIA processing.</span>
        </label>
      </div>
    </div>
  );
}
