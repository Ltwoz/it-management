import { FC } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface CardProps {
  title: string;
  description: string;
  onClick: () => void;
  theme: 'manager' | 'developer';
}

const Card: FC<CardProps> = ({ title, description, onClick, theme }) => {
  const themeStyles = {
    manager: {
      cardBg: 'bg-white',
      descriptionColor: 'text-black',
      textColor: 'text-green-500',
      hoverShadow: 'hover:shadow-green-500/50',
      learnMoreText: 'text-green-600',
    },
    developer: {
      cardBg: 'bg-black',
      descriptionColor: 'text-white',
      textColor: 'text-green-500',
      hoverShadow: 'hover:shadow-green-500/50',
      learnMoreText: 'text-green-400',
    },
  };

  const { cardBg, textColor, descriptionColor, hoverShadow, learnMoreText } = themeStyles[theme] || themeStyles['manager'];

  return (
    <div 
      className={`max-w-sm ${cardBg} rounded-xl shadow-lg overflow-hidden ${hoverShadow} transition-shadow duration-300 cursor-pointer`}
      onClick={onClick}
    >
      <div className="p-6">
        <h2 className={`text-2xl font-semibold mb-2 ${textColor}`}>{title}</h2>
        <p className={`mb-4 ${descriptionColor}`}>{description}</p>
        <div className={`font-medium flex items-center ${learnMoreText}`}>
          Go to Site
          <ArrowRightIcon className="h-5 w-5 ml-1" />
        </div>
      </div>
    </div>
  );
};

export default Card;
