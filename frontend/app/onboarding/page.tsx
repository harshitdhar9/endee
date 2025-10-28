'use client';
import React, { Dispatch, SetStateAction } from 'react';

import { useState } from 'react';
import Step1 from '@/components/onboarding/Step1';
import Step2 from '@/components/onboarding/Step2';
import Step3 from '@/components/onboarding/Step3';
import ProgressBar from '@/components/ProgressBar';

type Form = {
  interests: string[];
  budget: string;
  preferences: Record<string, any>;
};

export default function OnboardingPage() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<Form>({
    interests: [],
    budget: '',
    preferences: {},
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFinish = () => {
    console.log('✅ Final Onboarding Data:', form);
    // TODO: API call to backend later (FastAPI)
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-50 to-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-4">
          Let’s personalize your experience ✨
        </h1>

        <ProgressBar step={step} total={3} />

        <div className="mt-8">
          {step === 1 && <Step1 form={form} setForm={setForm} nextStep={nextStep} />}
          {step === 2 && (
            <Step2 form={form} setForm={setForm} nextStep={nextStep} prevStep={prevStep} />
          )}
          {step === 3 && (
            <Step3 form={form} setForm={setForm} prevStep={prevStep} handleFinish={handleFinish} />
          )}
        </div>
      </div>
    </main>
  );
}
