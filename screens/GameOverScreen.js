import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions } from 'react-native';
import BodyText from '../components/BodyText';
import MainButton from '../components/MainButton';

import Colors from '../constants/colors';

const GameOverScreen = props => {
    return (
    <View style={styles.screen}>
        {/* <BodyText>Game Over!</BodyText> */}
        <View style={styles.imageContainer}>
        <Image 
        source={require('../assets/gameover.jpg')} 
        style={styles.image} 
        resizeMode='cover'
        />
        </View>
        <View style={styles.resultContainer}>
        <BodyText style={styles.centeredText}>Your phone's brain needed <Text style={styles.roundColor}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.roundNumber}>{props.userNumber}</Text></BodyText>
        <MainButton onPress={props.onRestart}>
        NEW GAME
        </MainButton>
    </View>
    </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: Dimensions.get('window').height / 3,
        borderRadius: 25,
        overflow: 'hidden',
        marginVertical: 30,
        borderWidth: 3,
        borderColor: 'purple',
        
    },
    image: {
        width: '100%',
        height: '100%'
    },
    roundColor: {
        color: Colors.accent,
        fontSize: 38,
        textShadowColor: 'black',
        textShadowOffset: {width: 2, height: 1},
        textShadowRadius: 3,
    },
    roundNumber: {
        color: Colors.primary,
        fontSize: 38,
        textShadowColor: 'black',
        textShadowOffset: {width: 2, height: 1},
        textShadowRadius: 3
    },
    resultContainer: {
        marginHorizontal: 20,
        marginVertical: 20
    },
    centeredText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        textShadowOffset: { width: 2, height: 1 },
        textShadowRadius: 2,
        textShadowColor: 'black',

    }
});

export default GameOverScreen;