'use client';
import React from 'react';
import { Form } from '@/types/onboarding';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  form: Form;
  setForm: Dispatch<SetStateAction<Form>>;
  nextStep: () => void;
  prevStep: () => void;
}

const lookingForOptions = ['Friends', 'Roommates', 'Networking', 'Dating'];
const communicationOptions = ['Calls', 'Texts', 'Video Chat'];
const personalityOptions = ['Introvert', 'Extrovert', 'Ambivert'];
const dietOptions = ['Vegetarian', 'Vegan', 'Non-Vegetarian', 'Keto'];

export default function Step2({ form, setForm, nextStep, prevStep }: Props) {
  const handlePreferenceChange = (key: string, value: any) => {
    setForm({ ...form, preferences: { ...form.preferences, [key]: value } });
  };

  // For multi-select options like communication or diet
  const togglePreferenceArray = (key: string, value: string) => {
    const current = form.preferences[key] || [];
    if (current.includes(value)) {
      setForm({
        ...form,
        preferences: { ...form.preferences, [key]: current.filter((v: string) => v !== value) },
      });
    } else {
      setForm({
        ...form,
        preferences: { ...form.preferences, [key]: [...current, value] },
      });
    }
  };

  return (
    <div className="space-y-6 p-10 bg-white rounded-3xl shadow-xl max-w-2xl mx-auto">
      {/* City */}
      <div className="flex flex-col">
        <label htmlFor="city" className="mb-2 font-medium text-gray-700 text-lg">
          City
        </label>
        <input
          id="city"
          type="text"
          value={form.preferences['city'] || ''}
          onChange={(e) => handlePreferenceChange('city', e.target.value)}
          placeholder="Enter your city"
          className="border p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Gender */}
      <div className="flex flex-col">
        <p className="mb-2 font-medium text-gray-700 text-lg">Gender</p>
        <div className="flex gap-4">
          {['Male', 'Female'].map((gender) => (
            <button
              key={gender}
              type="button"
              onClick={() => handlePreferenceChange('gender', gender)}
              className={`px-6 py-3 rounded-full border text-lg font-medium transition ${
                form.preferences['gender'] === gender
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {gender}
            </button>
          ))}
        </div>
      </div>

      {/* Occupation */}
      <div className="flex flex-col">
        <label htmlFor="occupation" className="mb-2 font-medium text-gray-700 text-lg">
          Occupation
        </label>
        <input
          id="occupation"
          type="text"
          value={form.preferences['occupation'] || ''}
          onChange={(e) => handlePreferenceChange('occupation', e.target.value)}
          placeholder="Enter your occupation"
          className="border p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Looking For */}
      <div>
        <p className="mb-2 font-medium text-gray-700 text-lg">Looking For</p>
        <div className="flex flex-wrap gap-3">
          {lookingForOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => togglePreferenceArray('lookingFor', item)}
              className={`px-4 py-2 rounded-full border text-lg font-medium transition ${
                (form.preferences['lookingFor'] || []).includes(item)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Communication Preference */}
      <div>
        <p className="mb-2 font-medium text-gray-700 text-lg">Communication Preference</p>
        <div className="flex flex-wrap gap-3">
          {communicationOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => togglePreferenceArray('communication', item)}
              className={`px-4 py-2 rounded-full border text-lg font-medium transition ${
                (form.preferences['communication'] || []).includes(item)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Personality */}
      <div>
        <p className="mb-2 font-medium text-gray-700 text-lg">Personality</p>
        <div className="flex gap-4">
          {personalityOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handlePreferenceChange('personality', item)}
              className={`px-6 py-3 rounded-full border text-lg font-medium transition ${
                form.preferences['personality'] === item
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Diet Preferences */}
      <div>
        <p className="mb-2 font-medium text-gray-700 text-lg">Diet Preferences</p>
        <div className="flex flex-wrap gap-3">
          {dietOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => togglePreferenceArray('diet', item)}
              className={`px-4 py-2 rounded-full border text-lg font-medium transition ${
                (form.preferences['diet'] || []).includes(item)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-300 px-6 py-3 rounded-lg text-lg hover:bg-gray-400 transition"
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-indigo-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
