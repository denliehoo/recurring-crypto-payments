import { Tooltip } from '@mui/material';
import { FC } from 'react';

interface ITextWithTooltipProps {
  shortened?: boolean;
  text: string;
}

const TextWithTooltip: FC<ITextWithTooltipProps> = ({ shortened, text }) => {
  return (
    <Tooltip title={text}>
      {shortened ? (
        <span>{`${text.substring(0, 4)}...${text.substring(text.length - 4)}`}</span>
      ) : (
        <span>{text}</span>
      )}
    </Tooltip>
  );
};

export default TextWithTooltip;
