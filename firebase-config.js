// Firebase Configuration Template
// Replace the values below with your actual Firebase project configuration

const firebaseConfig = {
    // Get these values from your Firebase Console > Project Settings > General > Your apps
    apiKey: "your-api-key-here",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "123456789012",
    appId: "your-app-id-here"
};

// Instructions to set up Firebase:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project or select an existing one
// 3. Go to Project Settings (gear icon) > General tab
// 4. Scroll down to "Your apps" section
// 5. Click "Add app" and select Web (</>) icon
// 6. Register your app with a nickname
// 7. Copy the config object and replace the values above
// 8. Enable Firestore Database:
//    - Go to Firestore Database in the left sidebar
//    - Click "Create database"
//    - Choose "Start in test mode" for development
//    - Select a location for your database
// 9. Update the firebaseConfig object in Chat Portal.html with your actual values

// Security Rules for Firestore (add these in Firebase Console > Firestore > Rules):
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to chats collection
    match /chats/{chatId} {
      allow read, write: if true; // For development - restrict in production
      
      match /messages/{messageId} {
        allow read, write: if true; // For development - restrict in production
      }
    }
  }
}
*/

// For production, use more restrictive rules:
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /chats/{chatId} {
      allow read, write: if request.auth != null;
      
      match /messages/{messageId} {
        allow read, write: if request.auth != null;
      }
    }
  }
}
*/
