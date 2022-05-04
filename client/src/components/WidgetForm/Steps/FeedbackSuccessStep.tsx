import { CloseButton } from '../../Close';
import SuccessImg from '../../../assets/success.svg';

interface FeedbackSuccessStepProps {
  onFeedbackRestartRequest: () => void;
}

export function FeedbackSuccessStep({
  onFeedbackRestartRequest,
}: FeedbackSuccessStepProps) {
  return (
    <>
      <header>
        <CloseButton />
      </header>

      <div className="flex flex-col items-center py-10 w=[304px]">
        <img
          src={SuccessImg}
          alt="Imagem da uma caixa de seleção com um ícone de sucesso"
        />
        <span className="text-xl mt-2">Agradecemos o feedback!</span>
        <button
          onClick={onFeedbackRestartRequest}
          className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 py-2 px-6 mt-6 bg-zinc-800 rounded-md border-transparent text-sm leading-6 hover:bg-zinc-700 transition-colors"
        >
          Quero enviar outro
        </button>
      </div>
    </>
  );
}
