import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MainButton = props => {
    return <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
        <View style={styles.button}>
            <Text style={styles.buttonText}>{props.children}</Text>
        </View>
    </TouchableOpacity>
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'dodgerblue',
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 12,
        paddingHorizontal: 30,
        maxWidth: '80%',
        justifyContent: 'center',
        marginHorizontal: 35,

        borderRadius: 15
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: 'center',
    }
});

export default MainButton;