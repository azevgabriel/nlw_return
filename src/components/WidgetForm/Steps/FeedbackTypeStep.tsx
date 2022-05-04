import { FeedbackType, feedbackTypes } from '..';
import { CloseButton } from '../../Close';

interface FeedbackTypeStepProps {
  onFeedbackTypeChanged: (type: FeedbackType) => void;
}

export function FeedbackTypeStep({
  onFeedbackTypeChanged,
}: FeedbackTypeStepProps) {
  return (
    <>
      <header>
        <span className="text-xl leading-6">Deixe seu feedback!</span>
        <CloseButton />
      </header>
      <div className="flex py-8 gap-2 w-fall">
        {Object.entries(feedbackTypes).map(([type, { title, img }]) => {
          return (
            <button
              key={type}
              className="flex flex-col items-center bg-zinc-800 rounded-lg py-5 w-28 flex-1 gap-2 border-2 border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
              type="button"
              onClick={() => onFeedbackTypeChanged(type as FeedbackType)}
            >
              <img className="w-12 h-12" src={img.src} alt={img.alt} />
              <span className="text-lg leading-6">{title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
