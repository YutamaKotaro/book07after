// src/components/pages/SignUp/index.tsx
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HOME } from '../../../constants/path';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function SignUp() {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigate(HOME)}>
        <Text>SignUp</Text>
      </TouchableOpacity>
    </View>
  );
}
