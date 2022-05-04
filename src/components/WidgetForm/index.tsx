import { useState } from 'react';

import bugImg from '../../assets/bug.svg';
import cloudImg from '../../assets/cloud.svg';
import ideiaImg from '../../assets/ideia.svg';

import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
  bug: {
    title: 'Problemas',
    img: {
      src: bugImg,
      alt: 'Imagem de um inseto',
    },
  },
  feature: {
    title: 'Ideias',
    img: {
      src: ideiaImg,
      alt: 'Imagem de uma lâmpada',
    },
  },
  suggestion: {
    title: 'Melhorias',
    img: {
      src: cloudImg,
      alt: 'Imagem de uma nuvem de pensamento',
    },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  const handleRestartFeedback = () => {
    setFeedbackSent(false);
    setFeedbackType(null);
  };

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {!feedbackSent ? (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequest={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      ) : (
        <FeedbackSuccessStep onFeedbackRestartRequest={handleRestartFeedback} />
      )}
      <footer className="text-xs flex flex-row">
        <p>Feito com amor pela</p>
        <a className="underline underline-offset-2 pl-1" href="">
          Rocketseat
        </a>
      </footer>
    </div>
  );
}
