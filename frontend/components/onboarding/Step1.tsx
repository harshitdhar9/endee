'use client';
import React from 'react';
import { Form } from '@/types/onboarding';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  form: Form;
  setForm: Dispatch<SetStateAction<Form>>;
  nextStep: () => void;
}

const interestOptions = ['Sports', 'Music', 'Travel', 'Reading', 'Gaming', 'Cooking', 'Fitness', 'Art', 'Technology', 'Movies'];
const petOptions = ['Dog', 'Cat', 'Bird', 'Rabbit'];
const musicTypes = ['Rock', 'Pop', 'Jazz', 'Classical', 'EDM', 'Hip-Hop', 'Indie', 'Country'];
const movieGenres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Animation'];

export default function Step1({ form, setForm, nextStep }: Props) {
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, budget: e.target.value });
  };

  const toggleInterest = (interest: string) => {
    setForm({
      ...form,
      interests: form.interests.includes(interest)
        ? form.interests.filter((i) => i !== interest)
        : [...form.interests, interest],
    });
  };

  const togglePreferenceArray = (key: string, value: string) => {
    const current = form.preferences[key] || [];
    setForm({
      ...form,
      preferences: {
        ...form.preferences,
        [key]: current.includes(value)
          ? current.filter((v: string) => v !== value)
          : [...current, value],
      },
    });
  };

  return (
    <div className="space-y-8 p-8 bg-white rounded-3xl shadow-xl">
      <div>
        <label className="font-medium text-gray-700 text-lg">Budget: <span className="font-bold">{form.budget || 0}</span>$</label>
        <input type="range" min="0" max="10000" step="100" value={form.budget || 0} onChange={handleBudgetChange}
          className="w-full accent-indigo-600 h-3 rounded mt-3" />
      </div>

      <div>
        <label className="font-medium text-gray-700 text-lg">Age</label>
        <input type="number" value={form.preferences.age || ''} onChange={(e) =>
          setForm({ ...form, preferences: { ...form.preferences, age: Number(e.target.value) } })}
          className="border p-3 rounded-xl w-full mt-2" placeholder="Enter your age" />
      </div>

      <div>
        <p className="font-medium text-gray-700 text-lg mb-2">Morning or Night Person?</p>
        <div className="flex gap-3">
          {['Morning', 'Night'].map((t) => (
            <button key={t} onClick={() => setForm({ ...form, preferences: { ...form.preferences, sleep: t } })}
              className={`px-4 py-2 rounded-full border ${form.preferences.sleep === t
                ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-gray-300 text-gray-700'}`}>{t}</button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-medium text-gray-700 text-lg mb-2">Select Interests:</p>
        <div className="flex flex-wrap gap-3">
          {interestOptions.map((i) => (
            <button key={i} onClick={() => toggleInterest(i)}
              className={`px-4 py-2 rounded-full border ${form.interests.includes(i)
                ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-gray-300 text-gray-700'}`}>{i}</button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-medium text-gray-700 text-lg mb-2">Pets</p>
        <div className="flex flex-wrap gap-3">
          {petOptions.map((pet) => (
            <button key={pet} onClick={() => togglePreferenceArray('pets', pet)}
              className={`px-4 py-2 rounded-full border ${(form.preferences.pets || []).includes(pet)
                ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-gray-300 text-gray-700'}`}>{pet}</button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-medium text-gray-700 text-lg mb-2">Favorite Music</p>
        <div className="flex flex-wrap gap-3">
          {musicTypes.map((m) => (
            <button key={m} onClick={() => togglePreferenceArray('musicTypes', m)}
              className={`px-4 py-2 rounded-full border ${(form.preferences.musicTypes || []).includes(m)
                ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-gray-300 text-gray-700'}`}>{m}</button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-medium text-gray-700 text-lg mb-2">Favorite Movie Genres</p>
        <div className="flex flex-wrap gap-3">
          {movieGenres.map((g) => (
            <button key={g} onClick={() => togglePreferenceArray('movieGenres', g)}
              className={`px-4 py-2 rounded-full border ${(form.preferences.movieGenres || []).includes(g)
                ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border-gray-300 text-gray-700'}`}>{g}</button>
          ))}
        </div>
      </div>

      <button onClick={nextStep}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 transition">Next</button>
    </div>
  );
}
