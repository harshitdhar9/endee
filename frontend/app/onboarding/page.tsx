'use client';
import React, { useState } from 'react';
import Step1 from '@/components/onboarding/Step1';
import Step2 from '@/components/onboarding/Step2';
import Step3 from '@/components/onboarding/Step3';
import { Form } from '@/types/onboarding';
import ProgressBar from '@/components/ProgressBar';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Form>({
    interests: [],
    budget: '',
    preferences: {},
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleFinish = async () => {
    setLoading(true);
    try {
      console.log('✅ Final form data:', form);

      const res = await fetch('http://localhost:8000/onboarding/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to save onboarding data');

      alert('🎉 Onboarding completed successfully!');
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-r from-indigo-50 to-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-3xl p-10">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Let’s personalize your experience ✨
        </h1>

        <ProgressBar step={step} total={3} />

        <div className="mt-10">
          {step === 1 && <Step1 form={form} setForm={setForm} nextStep={nextStep} />}
          {step === 2 && <Step2 form={form} setForm={setForm} nextStep={nextStep} prevStep={prevStep} />}
          {step === 3 && (
            <Step3
              form={form}
              setForm={setForm}
              prevStep={prevStep}
              handleFinish={handleFinish}
            />
          )}
        </div>
      </div>
    </main>
  );
}
