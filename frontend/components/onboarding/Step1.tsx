'use client';
import React from 'react';
import { Form } from '@/types/onboarding';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  form: Form;
  setForm: Dispatch<SetStateAction<Form>>;
  nextStep: () => void;
}

const interestOptions = [
  'Sports',
  'Music',
  'Travel',
  'Reading',
  'Gaming',
  'Cooking',
  'Fitness',
  'Art',
  'Technology',
  'Movies',
];

const petOptions = ['Dog', 'Cat', 'Bird', 'Rabbit'];

const musicTypes = [
  'Rock',
  'Pop',
  'Jazz',
  'Classical',
  'EDM',
  'Hip-Hop',
  'Indie',
  'Country',
];

const movieGenres = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'Animation',
];

export default function Step1({ form, setForm, nextStep }: Props) {
  // Budget slider
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, budget: e.target.value });
  };

  // Toggle interest selection
  const toggleInterest = (interest: string) => {
    if (form.interests.includes(interest)) {
      setForm({ ...form, interests: form.interests.filter((i) => i !== interest) });
    } else {
      setForm({ ...form, interests: [...form.interests, interest] });
    }
  };

  // Toggle pet selection
  const togglePet = (pet: string) => {
    const currentPets = form.preferences['pets'] || [];
    if (currentPets.includes(pet)) {
      setForm({
        ...form,
        preferences: { ...form.preferences, pets: currentPets.filter((p: string) => p !== pet) },
      });
    } else {
      setForm({
        ...form,
        preferences: { ...form.preferences, pets: [...currentPets, pet] },
      });
    }
  };

  // Toggle multi-select for music or movies
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
    <div className="space-y-8 p-10 bg-white rounded-3xl shadow-xl max-w-xl mx-auto">
      {/* Budget Slider */}
      <div className="flex flex-col">
        <label htmlFor="budget" className="mb-3 font-medium text-gray-700 text-lg">
          Budget: <span className="font-bold">{form.budget || 0}</span> $
        </label>
        <input
          id="budget"
          type="range"
          min="0"
          max="10000"
          step="100"
          value={form.budget || 0}
          onChange={handleBudgetChange}
          className="w-full accent-indigo-600 h-3 rounded"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>0</span>
          <span>10k</span>
        </div>
      </div>

      {/* Age */}
      <div className="flex flex-col">
        <label htmlFor="age" className="mb-2 font-medium text-gray-700 text-lg">
          Age
        </label>
        <input
          id="age"
          type="number"
          min={18}
          max={100}
          value={form.preferences['age'] || ''}
          onChange={(e) =>
            setForm({
              ...form,
              preferences: { ...form.preferences, age: Number(e.target.value) },
            })
          }
          placeholder="Enter your age"
          className="border p-3 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Morning / Night Person */}
      <div className="flex flex-col">
        <p className="mb-2 font-medium text-gray-700 text-lg">Morning or Night Person?</p>
        <div className="flex gap-4">
          {['Morning', 'Night'].map((time) => (
            <button
              key={time}
              type="button"
              onClick={() =>
                setForm({ ...form, preferences: { ...form.preferences, sleep: time } })
              }
              className={`px-4 py-2 rounded-full border text-lg font-medium transition ${
                form.preferences['sleep'] === time
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Interests Selection */}
      <div>
        <p className="mb-3 font-medium text-gray-700 text-lg">Select your interests:</p>
        <div className="flex flex-wrap gap-3">
          {interestOptions.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`px-4 py-2 rounded-full border text-lg font-medium transition ${
                form.interests.includes(interest)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
      </div>

      {/* Pets Selection */}
      <div>
        <p className="mb-3 font-medium text-gray-700 text-lg">Pets:</p>
        <div className="flex flex-wrap gap-3">
          {petOptions.map((pet) => (
            <button
              key={pet}
              type="button"
              onClick={() => togglePet(pet)}
              className={`px-4 py-2 rounded-full border text-lg font-medium transition ${
                (form.preferences['pets'] || []).includes(pet)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {pet}
            </button>
          ))}
        </div>
      </div>

      {/* Types of Music */}
      <div>
        <p className="mb-3 font-medium text-gray-700 text-lg">Types of Music:</p>
        <div className="flex flex-wrap gap-3">
          {musicTypes.map((music) => (
            <button
              key={music}
              type="button"
              onClick={() => togglePreferenceArray('musicTypes', music)}
              className={`px-4 py-2 rounded-full border text-lg font-medium transition ${
                (form.preferences['musicTypes'] || []).includes(music)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {music}
            </button>
          ))}
        </div>
      </div>

      {/* Types of Movies */}
      <div>
        <p className="mb-3 font-medium text-gray-700 text-lg">Types of Movies:</p>
        <div className="flex flex-wrap gap-3">
          {movieGenres.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => togglePreferenceArray('movieGenres', genre)}
              className={`px-4 py-2 rounded-full border text-lg font-medium transition ${
                (form.preferences['movieGenres'] || []).includes(genre)
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={nextStep}
        className="w-full bg-indigo-600 text-white py-4 rounded-lg text-lg hover:bg-indigo-700 transition"
      >
        Next
      </button>
    </div>
  );
}
