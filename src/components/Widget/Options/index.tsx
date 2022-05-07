import React from 'react';
import { View, Text } from 'react-native';

import { Copyright } from '../Copyright';
import { Option } from '../Option';

import { feedbackTypes } from '../../../utils/feedbackTypes';
import { FeedbackType } from '..';

import { styles } from './styles';

interface OptionsProps {
  onFeedbackTypeSelected: (feedbackType: FeedbackType) => void;
}

export function Options({ onFeedbackTypeSelected }: OptionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Deixe seu feedback</Text>
      <View style={styles.options}>
        {Object.entries(feedbackTypes).map(([key, value]) => (
          <Option
            key={key}
            title={value.title}
            image={value.image}
            onPress={() => onFeedbackTypeSelected(key as FeedbackType)}
          />
        ))}
      </View>
      <Copyright />
    </View>
  );
}
