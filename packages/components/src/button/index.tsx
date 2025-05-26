import RefreshIcon from '@mui/icons-material/Refresh';
import { Button, ButtonProps } from '@mui/material';
import { FC } from 'react';

interface ICustomButtonProps extends ButtonProps {
  loading?: boolean;
  text: string;
  icon?: React.ReactNode;
}

const CustomButton: FC<ICustomButtonProps> = (props) => {
  const { loading, text, icon, disabled, onClick, ...rest } = props;

  return (
    <Button
      onClick={onClick}
      variant="contained"
      startIcon={
        loading ? (
          <RefreshIcon
            sx={{
              animation: 'spin 1s linear infinite',
              '@keyframes spin': {
                '0%': {
                  transform: 'rotate(0deg)',
                },
                '100%': {
                  transform: 'rotate(360deg)',
                },
              },
            }}
          />
        ) : (
          icon
        )
      }
      disabled={loading || disabled}
      {...rest}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
