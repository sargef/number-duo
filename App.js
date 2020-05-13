import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

const image = { uri: "data:image/jpeg;base64,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"}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0); 
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
    <AppLoading 
    startAsync={fetchFonts} 
    onFinish={()=> setDataLoaded(true)} 
    onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  let content =  <StartGameScreen onStartGame={startGameHandler}/>
  // content = (
  //   <GameOverScreen 
  //   roundsNumber={1}
  //   userNumber={1}
  //   onRestart={configureNewGameHandler}
  //   />
  //   );

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />;
  }

  return (
    <View style={styles.screen}>
       <ImageBackground source={image} style={styles.image}>
      <Header title="Number Guessing Duo" />
      {content}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    zIndex: -2,
  }
});
