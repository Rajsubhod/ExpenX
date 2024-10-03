import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Profile = () => {
return (
    <View style={styles.profile}>
        <Text>Profile Screen</Text>
    </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    profile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
})