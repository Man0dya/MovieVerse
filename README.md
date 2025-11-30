# MovieVerse

A modern React Native app (Expo + Expo Router) for discovering, searching, and tracking trending movies from TMDB. It integrates Appwrite to record search popularity and surface “Trending Movies” based on actual user activity. Built with NativeWind/Tailwind for styling and includes reusable UI components.

**Highlights**
- **Discover & Search:** Browse popular movies and search by title via TMDB.
- **Trending from Activity:** Appwrite stores search counts; the app shows top-trending movies.
- **Smooth UX:** Debounced search, loading indicators, and clean card-based UI.
- **Scalable Stack:** Expo Router navigation, NativeWind styling, TypeScript types, and modular services.

## Tech Stack
- **Framework:** `expo@~53`, `react-native@0.79`, `react@19`
- **Navigation:** `expo-router@~5`, `@react-navigation/*`
- **Styling:** `nativewind@^4`, `tailwindcss@^3`
- **Data:** TMDB REST API, `react-native-appwrite` for Appwrite
- **UI & Utils:** `expo-image`, `expo-font`, `expo-status-bar`, `react-native-reanimated`, `react-native-gesture-handler`
- **Lang/Tooling:** TypeScript, ESLint

## Features
- **Home:**
   - Header + search entry
   - Horizontal “Trending Movies” sourced from Appwrite (most searched)
   - Grid of “Latest Movies” from TMDB Discover API
- **Search:**
   - Debounced input (500ms)
   - Results grid with loading and error states
   - On successful search, first result increments Appwrite `count` for the query
- **Movie Details:**
   - `services/api.fetchMovieDetails(movieId)` prepared for detail screens
- **Reusable Components:** `MovieCard`, `TrendingCard`, `SearchBar`

## Screens & Navigation
- Expo Router structure in `app/` with tab grouping:
   - `app/(tabs)/index.tsx` — Home
   - `app/(tabs)/search.tsx` — Search
   - `app/movies/[id].tsx` — Movie details (dynamic route)
   - Additional stubs: `profile.tsx`, `saved.tsx`
- Root layout in `app/_layout.tsx` and `app/(tabs)/_layout.tsx`

## Architecture
- **Services:**
   - `services/api.ts` — TMDB config and REST calls
   - `services/appwrite.ts` — Appwrite client, `updateSearchCount`, `getTrendingMovies`
   - `services/useFetch.ts` — Reusable fetch hook with `loading`, `error`, `data`, `refetch`, `reset`
- **Constants:** Icons and images in `constants/`
- **Types:** Shared interfaces in `interfaces/` and `types/`
- **Components:** UI building blocks in `components/`

## Environment Variables
Create an `.env` or use Expo public envs (prefixed with `EXPO_PUBLIC_`). These are read at build/runtime.

Required:
- `EXPO_PUBLIC_MOVIE_API_KEY` — TMDB API key (used both as `api_key` param and Bearer token)
- `EXPO_PUBLIC_APPWRITE_PROJECT_ID` — Appwrite project ID
- `EXPO_PUBLIC_APPWRITE_DATABASE_ID` — Appwrite database ID
- `EXPO_PUBLIC_APPWRITE_COLLECTION_ID` — Collection for tracking searches

Note: TMDB requests use headers with `Authorization: Bearer ${EXPO_PUBLIC_MOVIE_API_KEY}` and some endpoints also append `?api_key=...` for compatibility.

## Setup
1. Install dependencies

```powershell
npm install
```

2. Configure env vars (e.g., in `app.json` or `.env` consumed by Expo). Ensure the four envs above are set.

3. Tailwind/NativeWind config is present (`tailwind.config.js`, `nativewind-env.d.ts`). No extra steps needed.

4. Appwrite
    - Create an Appwrite project and note the Project ID.
    - Create a Database and a Collection with fields:
       - `searchTerm` (string)
       - `movie_id` (int/string)
       - `count` (int)
       - `title` (string)
       - `poster_url` (string)
    - Set `EXPO_PUBLIC_APPWRITE_PROJECT_ID`, `EXPO_PUBLIC_APPWRITE_DATABASE_ID`, `EXPO_PUBLIC_APPWRITE_COLLECTION_ID` accordingly.

## Run

```powershell
npm run start
```

Optional platform targets:

```powershell
npm run android
npm run ios
npm run web
```

## Key Files
- `app/(tabs)/index.tsx` — Home screen combining trending and latest movies
- `app/(tabs)/search.tsx` — Debounced search and Appwrite tracking
- `services/api.ts` — TMDB `fetchMovies`, `fetchMovieDetails`
- `services/appwrite.ts` — `updateSearchCount`, `getTrendingMovies`
- `components/MovieCard.tsx` — Grid item for movies
- `components/TrendingCard.tsx` — Horizontal carousel item
- `components/SearchBar.tsx` — Input with navigation to search page

## How Trending Works
- When a user searches and results are returned, the app calls `updateSearchCount(searchQuery, movies[0])`.
- Appwrite either creates a document (with `count = 1`) or increments `count` if the `searchTerm` exists.
- Home screen calls `getTrendingMovies()` which returns the top 5 documents ordered by `count`.

## Scripts
- `npm run start` — Launch Expo dev server
- `npm run android` / `ios` / `web` — Platform-specific launch
- `npm run lint` — Lint via Expo config
- `npm run reset-project` — Utility script (if present) to reset project state

## Folder Structure
```
app/
   _layout.tsx
   (tabs)/
      _layout.tsx
      index.tsx
      search.tsx
      saved.tsx
      profile.tsx
   movies/
      [id].tsx
components/
   MovieCard.tsx
   TrendingCard.tsx
   SearchBar.tsx
services/
   api.ts
   appwrite.ts
   useFetch.ts
constants/
   icons.ts
   images.ts
assets/
   fonts/
   icons/
   images/
```

## Troubleshooting
- **Blank Trending section:** Verify Appwrite envs and collection exist; ensure searches are happening to create data.
- **TMDB errors:** Check `EXPO_PUBLIC_MOVIE_API_KEY` and that rate limits aren’t exceeded.
- **NativeWind classes not applying:** Ensure Metro config and NativeWind setup are intact (`nativewind-env.d.ts`, `tailwind.config.js`).
- **Android emulator issues:** Restart Expo and emulator; clear Metro cache if needed.

```powershell
expo start -c
```

## Roadmap
- Add movie detail screen with cast, genres, and trailers
- Persist user “Saved” movies locally or via Appwrite
- Authentication for personalized profiles
- Offline caching for recent searches and lists

## License
Proprietary or project-specific; add details here if needed.

## Community & Policies
- See `CONTRIBUTING.md` for how to propose changes.
- Please follow `CODE_OF_CONDUCT.md` when interacting.
- Security issues: read `SECURITY.md` for private reporting.

