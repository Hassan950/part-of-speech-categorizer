import { Button, CircularProgress, Container, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useMemo, useState } from 'react';
import { useAxios } from '../hooks';
import { useNavigate } from 'react-router-dom';

type Rank = {
  rank: number;
};

type RankResponse = {
  response: Rank | null;
  loading: boolean;
};

const Rank = ({ score }: { score: number }) => {
  const { response, loading } = useAxios({
    url: '/rank',
    method: 'post',
    data: {
      score,
    },
  }) as RankResponse;

  if (loading || !response) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant='h4'>Rank</Typography>
      <Container maxWidth='sm'>
        <Box textAlign='center' mt={5}>
          <Box mt={2}>Your Rank: {response.rank}</Box>
          <Box mt={5}>
            <Box mt={2}>
              <Button onClick={() => (window.location.href = '/')} variant='outlined'>
                Try Again
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Rank;
