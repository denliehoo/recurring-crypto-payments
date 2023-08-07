import { Tooltip } from "@mui/material";

interface TextWithTooltipProps {
  shortened?: boolean;
  text: string;
}

const TextWithTooltip: React.FC<TextWithTooltipProps> = (props) => {
  const { shortened, text } = props;
  return (
    <Tooltip title={text}>
      {shortened ? (
        <span>
          {`${text.substring(0, 4)}...${text.substring(text.length - 4)}`}
        </span>
      ) : (
        <span>text</span>
      )}
    </Tooltip>
  );
};

export default TextWithTooltip;
