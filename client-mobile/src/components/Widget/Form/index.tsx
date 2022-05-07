import React, { useState } from 'react';
import { View, TextInput, Image, Text, TouchableOpacity } from 'react-native';

import { FeedbackType } from '../';
import { feedbackTypes } from '../../../utils/feedbackTypes';

import { theme } from '../../../theme';

import { ArrowLeft } from 'phosphor-react-native';

import { styles } from './styles';
import { ScreenshotButton } from '../ScreenshotButton';
import { Button } from '../Button';

import * as FileSystem from 'expo-file-system';

import { captureScreen } from 'react-native-view-shot';
import api from '../../../libs/api';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled: () => void;
  onFeedbackSent: () => void;
}

export function Form({
  feedbackType,
  onFeedbackCanceled,
  onFeedbackSent,
}: Props) {
  const feedbackTypeInfo = feedbackTypes[feedbackType];

  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const [comment, setComment] = useState('');

  function handleScreenshot() {
    captureScreen({
      format: 'png',
      quality: 0.8,
    })
      .then((uri) => {
        setScreenshot(uri);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSubmitFeedback() {
    if (isSending) return;

    setIsSending(true);
    const screenshotBase64 =
      screenshot &&
      (await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' }));

    try {
      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64,${screenshotBase64}`,
        comment,
      });

      onFeedbackSent();
    } catch (err) {
      console.log(err);
    }

    setIsSending(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onFeedbackCanceled}>
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>{feedbackTypeInfo.title}</Text>
        </View>
      </View>
      <TextInput
        multiline
        style={styles.input}
        placeholder="Alguma coisa que você quer nos contar?"
        placeholderTextColor={theme.colors.text_secondary}
        onChangeText={setComment}
        value={comment}
      />
      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />
        <Button onPress={handleSubmitFeedback} isLoading={isSending} />
      </View>
    </View>
  );
}
