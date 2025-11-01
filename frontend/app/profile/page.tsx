'use client';

import React, { useState } from 'react';
import DashboardNavbar from '@/components/DashboardNavbar';
import { Form } from '@/types/onboarding';
import { FaInstagram, FaDiscord, FaTwitter } from 'react-icons/fa';

export default function ProfileSettingsPage() {
  const [form, setForm] = useState<Form>({
    interests: [],
    budget: '',
    preferences: {},
  });

  const [name, setName] = useState('John Doe');
  const [avatar, setAvatar] = useState<string | null>(null);

  const handlePreferenceChange = (key: string, value: any) => {
    setForm({ ...form, preferences: { ...form.preferences, [key]: value } });
  };

  const togglePreferenceArray = (key: string, value: string) => {
    const current = form.preferences[key] || [];
    if (current.includes(value)) {
      setForm({ ...form, preferences: { ...form.preferences, [key]: current.filter((v: string) => v !== value) } });
    } else {
      setForm({ ...form, preferences: { ...form.preferences, [key]: [...current, value] } });
    }
  };

  const handleSave = () => {
    console.log('Saved profile:', { name, avatar, form });
    alert('Profile updated successfully!');
  };

  const interestOptions = ['Sports', 'Music', 'Travel', 'Reading', 'Gaming', 'Cooking', 'Fitness', 'Art', 'Technology', 'Movies'];
  const petOptions = ['Dog', 'Cat', 'Bird', 'Rabbit'];
  const musicTypes = ['Rock', 'Pop', 'Jazz', 'Classical', 'EDM', 'Hip-Hop', 'Indie', 'Country'];
  const movieGenres = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Animation'];
  const lookingForOptions = ['Friends', 'Roommates', 'Networking', 'Dating'];
  const communicationOptions = ['Calls', 'Texts', 'Video Chat'];
  const personalityOptions = ['Introvert', 'Extrovert', 'Ambivert'];
  const dietOptions = ['Vegetarian', 'Vegan', 'Non-Vegetarian', 'Keto'];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <DashboardNavbar />

      <main className="flex-1 p-10 max-w-5xl mx-auto space-y-12">
        <section className="bg-white p-10 rounded-3xl shadow-xl space-y-6">
          <h2 className="text-2xl font-bold text-indigo-600">Account Info</h2>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700 text-lg">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="border p-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700 text-lg">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files && setAvatar(URL.createObjectURL(e.target.files[0]))}
              className="border p-4 rounded-xl"
            />
            {avatar && <img src={avatar} alt="Profile" className="mt-4 w-32 h-32 rounded-full object-cover border" />}
          </div>
        </section>

        <section className="bg-white p-10 rounded-3xl shadow-xl space-y-8">
          <h2 className="text-2xl font-bold text-indigo-600">Preferences</h2>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700 text-lg">
              Budget: <span className="font-bold">{form.budget || 0}$</span>
            </label>
            <input
              type="range"
              min={0}
              max={10000}
              step={100}
              value={form.budget || 0}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              className="w-full accent-indigo-600 h-3 rounded"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>0</span>
              <span>10k</span>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700 text-lg">Age</label>
            <input
              type="number"
              min={18}
              max={100}
              value={form.preferences['age'] || ''}
              onChange={(e) => handlePreferenceChange('age', Number(e.target.value))}
              placeholder="Enter your age"
              className="border p-4 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col">
            <p className="mb-2 font-medium text-gray-700 text-lg">Morning or Night Person?</p>
            <div className="flex gap-4">
              {['Morning', 'Night'].map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => handlePreferenceChange('sleep', time)}
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

          <div>
            <p className="mb-3 font-medium text-gray-700 text-lg">Interests</p>
            <div className="flex flex-wrap gap-3">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => togglePreferenceArray('interests', interest)}
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

          <div>
            <p className="mb-3 font-medium text-gray-700 text-lg">Pets</p>
            <div className="flex flex-wrap gap-3">
              {petOptions.map((pet) => (
                <button
                  key={pet}
                  type="button"
                  onClick={() => togglePreferenceArray('pets', pet)}
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
          <div>
            <p className="mb-3 font-medium text-gray-700 text-lg">Types of Music</p>
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

          <div>
            <p className="mb-3 font-medium text-gray-700 text-lg">Types of Movies</p>
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

          <div>
            <p className="mb-3 font-medium text-gray-700 text-lg">Looking For</p>
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

          <div>
            <p className="mb-3 font-medium text-gray-700 text-lg">Communication Preferences</p>
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

          <div>
            <p className="mb-3 font-medium text-gray-700 text-lg">Personality</p>
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

          <div>
            <p className="mb-3 font-medium text-gray-700 text-lg">Diet Preferences</p>
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
        </section>

        <section className="bg-white p-10 rounded-3xl shadow-xl space-y-6">
          <h2 className="text-2xl font-bold text-indigo-600">About Me & Social Links</h2>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700 text-lg">About Me</label>
            <textarea
              rows={5}
              placeholder="Write a brief description about yourself..."
              value={form.preferences['aboutMe'] || ''}
              onChange={(e) => handlePreferenceChange('aboutMe', e.target.value)}
              className="border p-5 rounded-xl text-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col space-y-4">
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
        </section>
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-12 py-4 rounded-3xl text-xl hover:bg-green-700 transition"
          >
            Save Changes
          </button>
        </div>
      </main>
    </div>
  );
}
