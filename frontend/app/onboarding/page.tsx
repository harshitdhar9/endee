'use client';
import React, { useState } from 'react';
import Step1 from '@/components/onboarding/Step1';
import Step2 from '@/components/onboarding/Step2';
import Step3 from '@/components/onboarding/Step3';
import { Form } from '@/types/onboarding';
import ProgressBar from '@/components/ProgressBar';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();
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
      const token = localStorage.getItem('token');

      if (!token) {
        alert('You are not authenticated.');
        setLoading(false);
        return;
      }

      const social_links = {
        instagram: form.preferences.instagram || null,
        discord: form.preferences.discord || null,
        twitter: form.preferences.twitter || null,
      };

      const {
        instagram,
        discord,
        twitter,
        ...matchingPreferences
      } = form.preferences;

      const onboardingRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/onboarding`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            budget: Number(form.budget),
            age: form.preferences.age,
            sleep_type: form.preferences.sleep,
            interests: form.interests,
            preferences: matchingPreferences,
            social_links: social_links,
          }),
        }
      );

      if (!onboardingRes.ok) {
        const data = await onboardingRes.json();
        throw new Error(data.detail || 'Failed to save onboarding data');
      }

      const embedRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/embed-profile`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!embedRes.ok) {
        throw new Error('Embedding generation failed');
      }

      alert('🎉 Profile setup completed successfully!');
      router.push('/dashboard');

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
          {step === 1 && (
            <Step1 form={form} setForm={setForm} nextStep={nextStep} />
          )}

          {step === 2 && (
            <Step2
              form={form}
              setForm={setForm}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {step === 3 && (
            <Step3
              form={form}
              setForm={setForm}
              prevStep={prevStep}
              handleFinish={handleFinish}
            />
          )}
        </div>

        {loading && (
          <p className="text-center mt-6 text-indigo-600 font-medium">
            Setting up your AI profile...
          </p>
        )}
      </div>
    </main>
  );
}