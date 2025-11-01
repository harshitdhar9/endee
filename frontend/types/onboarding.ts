// types/onboarding.ts
// types/onboarding.ts
// types/onboarding.ts
export type Preferences = {
  // Step 1
  age?: number;
  sleep?: string;
  pets?: string[];
  musicTypes?: string[];
  movieGenres?: string[];

  // Step 2
  city?: string;
  gender?: string;
  occupation?: string;
  lookingFor?: string[];
  communication?: string[];
  personality?: string;
  diet?: string[];

  // Step 3
  aboutMe?: string;
  instagram?: string;
  discord?: string;
  twitter?: string;
  
  // Allow any additional dynamic keys (fixes the error)
  [key: string]: any;
};

export type Form = {
  interests: string[];
  budget: string;
  preferences: Preferences;
};

