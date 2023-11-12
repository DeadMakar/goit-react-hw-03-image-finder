import { Grid } from 'react-loader-spinner';
import { LoaderStyled } from './Loader.styled';

export function Loader() {
  return (
    <LoaderStyled>
      <Grid
        height={200}
        width={200}
        color="#3f51b5"
        ariaLabel="loading-indicator"
      />
    </LoaderStyled>
  );
}
