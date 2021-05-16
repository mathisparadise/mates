import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

//Database requirements
import firebase from "firebase";
import "firebase/firestore";

//Database info
var firebaseConfig = {
    apiKey: "AIzaSyCo8A1LRxCMi1ePXPEtTYF3GJeH5gc27Bg",
    authDomain: "mates-64580.firebaseapp.com",
    projectId: "mates-64580",
    storageBucket: "mates-64580.appspot.com",
    messagingSenderId: "774404571456",
    appId: "1:774404571456:web:49fe34e54bdd9dfa683aa5",
    measurementId: "G-TKZ9PTKEW8"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

//Makes the database usable in other places
export { db };