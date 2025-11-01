# TurboNotes.AI

A powerful note-taking mobile application built with React Native and Expo.

## Features

- 📝 Create and manage notes
- 💬 AI-powered chat assistant
- 📚 Library for organizing notes
- 🎙️ Voice recording capabilities
- 📖 Flashcard creation and study
- 👤 User profile management

## Tech Stack

- **Framework**: React Native with Expo
- **Navigation**: Expo Router
- **Language**: TypeScript
- **Build**: EAS Build

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone https://github.com/xzoraiz12/TurboAi.git
cd TurboAi
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

### Building

#### Android
```bash
npm run android
```

#### iOS
```bash
npm run ios
```

#### Production Build with EAS
```bash
eas build --platform android --profile preview
eas build --platform android --profile production
eas build --platform ios --profile preview
eas build --platform ios --profile production
```

### Troubleshooting EAS Build Issues

If you encounter `EPERM: operation not permitted` errors on Windows:

1. **Clear EAS cache:**
   ```powershell
   Remove-Item -Path "$env:LOCALAPPDATA\Temp\eas-cli-nodejs" -Recurse -Force -ErrorAction SilentlyContinue
   ```

2. **Close all processes that might lock files:**
   - Close your IDE (VS Code, Cursor, etc.)
   - Stop Metro bundler
   - Close any file explorers with the project open

3. **Run EAS build again:**
   ```bash
   eas build -p android --profile preview
   ```

4. **If issues persist, try cleaning node_modules:**
   ```bash
   Remove-Item -Recurse -Force node_modules
   Remove-Item -Force package-lock.json
   npm install
   ```

## Project Structure

```
TurboNotesApp/
├── app/                 # App screens and routing
│   ├── (tabs)/         # Tab navigation screens
│   ├── flashcards/     # Flashcard features
│   ├── login.tsx       # Login screen
│   └── signup.tsx      # Sign up screen
├── assets/             # Images and icons
├── components/         # Reusable components
├── constants/          # App constants
├── App.tsx            # Root component
├── app.json           # Expo configuration
├── eas.json           # EAS Build configuration
└── package.json       # Dependencies

```

## Configuration

### EAS Build
The app is configured for EAS Build with the following project ID:
- Project ID: `ca5e108e-6f68-4d0e-a8b5-99dd8fcc3a6d`

### App Information
- **Name**: TurboNotes.AI
- **Package**: com.izoraizx.turbonotesai
- **Owner**: izoraizx

## License

Private

## Contact

For questions or support, please contact the development team.

