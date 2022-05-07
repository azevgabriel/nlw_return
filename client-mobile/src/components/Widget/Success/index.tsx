import { Copyright } from 'phosphor-react-native';
import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import sucessImg from '../../../assets/success.png';

import { styles } from './styles';

interface Props {
  onSendAnotherFeedback: () => void;
}

export function Success({ onSendAnotherFeedback }: Props) {
  return (
    <View style={styles.container}>
      <Image source={sucessImg} style={styles.image} />
      <Text style={styles.title}>Agradecemos o feedback</Text>
      <TouchableOpacity onPress={onSendAnotherFeedback} style={styles.button}>
        <Text style={styles.buttonTitle}>Quero enviar outro</Text>
      </TouchableOpacity>
      <Copyright />
    </View>
  );
}
