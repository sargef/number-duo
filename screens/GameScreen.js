import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, Alert, Image, ScrollView, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';
import BodyText from '../components/BodyText';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

const renderListItem = (listLength, itemData) => (
<View style={styles.listItem}>
<BodyText style={styles.listTitles}>Guess Number. {listLength - itemData.index}</BodyText>
    <BodyText style={styles.guessAnswer}>{itemData.item}</BodyText>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if (
            (direction === 'lower' && currentGuess < props.userChoice) || 
            (direction === 'higher' && currentGuess > props.userChoice )
            ) {
            Alert.alert('Already Guessed this number range!..', 'Choose the other direction', 
            [{text: 'OK', style: 'cancel'}
        ]);
        return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current, 
            currentHigh.current, 
            currentGuess
            );
        setCurrentGuess(nextNumber);
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')} >
                <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'higher')}>
                <Ionicons name="md-add" size={24} color="white"  />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
            {/* <ScrollView contentContainerStyle={styles.list}>
                {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
            </ScrollView> */}
            <FlatList 
            keyExtractor={item => item}
             data={pastGuesses}
             renderItem={renderListItem.bind(this, pastGuesses.length)} 
             contentContainerStyle={styles.list}
             />
            </View>
            <View>
            <ScrollView>
            <View style={styles.imageContainer}>
        <Image 
        source={require('../assets/prismatic.png')} 
        style={styles.image} 
        resizeMode='cover'
        />
        </View>
        </ScrollView>
        </View>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        color: 'white',
        fontSize: 25,
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        textShadowColor: '#000'
    },
    buttonContainer: {
       flexDirection: 'row',
       justifyContent: 'space-around',
       //marginTop: Dimensions.get('window').height / 3,
       marginTop: Dimensions.get('window').height > 600 ? 20: 10,
       width: 400,
       maxWidth: '70%',
       borderWidth: 2,
       borderColor: 'purple'
    },
    imageContainer: {
        width: 250,
        height: 350,
        borderRadius: 25,
        overflow: 'hidden',
        marginVertical: 30,
        zIndex: -1,  
        alignItems: 'center'
    },
    image: {
        width: '80%',
        height: '80%'
    },
    listItem: {
        borderColor: 'purple',
        borderWidth: 2,
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'greenyellow',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 3,
        elevation: 3,
    },
    listContainer: {
        width: '80%'
    },
    listTitles: {
        color: 'deepskyblue',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        textShadowColor: 'black',
        fontSize: 18
    },
     list: {
         flexGrow: 1,
         alignItems: 'center',
         justifyContent: 'flex-end'
     },
     guessAnswer: {
         marginLeft: 25,
         fontSize: 20,
         textShadowOffset: { width: 1, height: 1 },
         textShadowRadius: 2,
         textShadowColor: 'magenta',

     }
});

export default GameScreen;