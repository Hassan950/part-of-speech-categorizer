import { Button, CircularProgress, Container, LinearProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useAxios } from '../hooks';
import { useNavigate } from 'react-router-dom';

type Word = {
  id: number;
  word: string;
  pos: 'adverb' | 'noun' | 'verb' | 'adjective';
};

type WordsResponse = {
  response: Word[] | null;
  loading: boolean;
};

const Practice = ({ setScore }: { setScore: React.Dispatch<React.SetStateAction<number>> }) => {
  const { response, loading } = useAxios({ url: '/words' }) as WordsResponse;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const navigate = useNavigate();

  const handleClickAnswer = (answer: string) => {
    if (!response) return;
    setSelectedAnswer(answer);
    const question = response[questionIndex];
    if (answer === question.pos) {
      setScore((s) => s + (1 / response.length) * 100);
    }
    setProgress((p) => p + 1);

    setShowResult(true);
    setTimeout(() => {
      if (questionIndex + 1 === response.length) {
        navigate('/rank');
        return;
      }
      setShowResult(false);
      setSelectedAnswer('');
      setQuestionIndex((i) => i + 1);
    }, 1000);
  };

  function styler(option: string) {
    if (showResult === true && option === selectedAnswer) {
      if (response?.[questionIndex].pos === selectedAnswer) {
        return { backgroundColor: '#94D7A2' };
      } else {
        return { backgroundColor: '#F8BCBC' };
      }
    }
  }

  if (loading || !response) {
    return (
      <Box mt={20}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant='h4'>Practice</Typography>
      <Container maxWidth='sm'>
        <Typography mt={5}>{response[questionIndex].word}</Typography>
        {['noun', 'adverb', 'adjective', 'verb'].map((option, id) => (
          <Box mt={2} key={id}>
            <Button
              onClick={() => handleClickAnswer(option)}
              variant='contained'
              disabled={showResult}
              style={styler(option)}
            >
              {option}
            </Button>
          </Box>
        ))}
        <Box mt={5}>
          <LinearProgress variant='determinate' value={(progress / response.length) * 100} />
        </Box>
      </Container>
    </Box>
  );
};

export default Practice;
