'use client';
import React from 'react';
import { Form } from '@/types/onboarding';
import { Dispatch, SetStateAction } from 'react';
import { FaInstagram, FaDiscord, FaTwitter } from 'react-icons/fa';

interface Props {
  form: Form;
  setForm: Dispatch<SetStateAction<Form>>;
  prevStep: () => void;
  handleFinish: () => void;
}

export default function Step3({ form, setForm, prevStep, handleFinish }: Props) {
  const handlePreferenceChange = (key: string, value: any) => {
    setForm({ ...form, preferences: { ...form.preferences, [key]: value } });
  };

  return (
    <div className="space-y-8 p-10 bg-white rounded-3xl shadow-xl max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">Tell us more about you</h2>

      {/* About Me */}
      <div className="flex flex-col">
        <label htmlFor="aboutMe" className="mb-2 font-medium text-gray-700 text-lg">
          About Me
        </label>
        <textarea
          id="aboutMe"
          value={form.preferences['aboutMe'] || ''}
          onChange={(e) => handlePreferenceChange('aboutMe', e.target.value)}
          placeholder="Write a brief description about yourself..."
          className="border p-5 rounded-xl text-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={5}
        />
      </div>

      {/* Social Media Links */}
      <div className="flex flex-col space-y-4">
        <p className="font-medium text-gray-700 text-lg">Social Media Links</p>
        <div className="flex flex-col gap-4">
          {/* Instagram */}
          <div className="flex items-center gap-4">
            <FaInstagram className="text-pink-500 text-3xl" />
            <input
              type="text"
              placeholder="Instagram URL"
              value={form.preferences['instagram'] || ''}
              onChange={(e) => handlePreferenceChange('instagram', e.target.value)}
              className="border p-4 rounded-xl flex-1 text-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Discord */}
          <div className="flex items-center gap-4">
            <FaDiscord className="text-indigo-600 text-3xl" />
            <input
              type="text"
              placeholder="Discord URL"
              value={form.preferences['discord'] || ''}
              onChange={(e) => handlePreferenceChange('discord', e.target.value)}
              className="border p-4 rounded-xl flex-1 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Twitter */}
          <div className="flex items-center gap-4">
            <FaTwitter className="text-blue-500 text-3xl" />
            <input
              type="text"
              placeholder="Twitter URL"
              value={form.preferences['twitter'] || ''}
              onChange={(e) => handlePreferenceChange('twitter', e.target.value)}
              className="border p-4 rounded-xl flex-1 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-300 px-8 py-4 rounded-2xl text-lg hover:bg-gray-400 transition"
        >
          Previous
        </button>
        <button
          onClick={handleFinish}
          className="bg-green-600 text-white px-8 py-4 rounded-2xl text-lg hover:bg-green-700 transition"
        >
          Finish
        </button>
      </div>
    </div>
  );
}
