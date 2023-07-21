import { useEffect, useRef, useState } from "react";
import {
  CardActions,
  CardContent,
  Button,
  Typography,
  CircularProgress,
  Box,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#87ceeb",
    },
  },
});

const HOUR_UNIT = 3600; // 1시간 간격 (= 3600s)
const MIN_UNIT = 60; // 1분 간격 (= 60s)

const ShowTimer = ({ time, onEdit }) => {
  const [curTime, setCurTime] = useState(time || 0);
  const [isRunning, setIsRunning] = useState(true);
  const timer = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timer.current = setInterval(() => {
        setCurTime((prevTime) => {
          if (prevTime < 1) {
            stopTimer();
            return 0;
          }

          return prevTime - 1;
        });
      }, 1000);

      return stopTimer;
    }
  }, [isRunning]);

  const toggleTimerHandler = () => {
    if (curTime === 0) return;

    setIsRunning((prevState) => !prevState);
  };

  const stopTimer = () => {
    clearInterval(timer.current);
    timer.current = null;
  };

  const renderedTimer = `${String(Math.floor(curTime / HOUR_UNIT)).padStart(
    2,
    0
  )}:${String(Math.floor(curTime / MIN_UNIT) % MIN_UNIT).padStart(
    2,
    0
  )}:${String(curTime % MIN_UNIT).padStart(2, 0)}`;

  return (
    <>
      <Button
        sx={{
          position: "absolute",
          top: "4px",
          left: "4px",
          borderRadius: "50%",
          bgcolor: "#DC6240",
          minWidth: "24px",
          textAlign: "left",
          padding: "2px 4px 1px 0",
        }}
        onClick={onEdit}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="white"
        >
          <path d="M17.71 15.88l-4.59-4.59 4.59-4.59l-1.41-1.41l-6 6l6 6z" />
        </svg>
      </Button>
      <CardContent>
        <ThemeProvider theme={theme}>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={(1 - curTime / time) * 100}
              size="180px"
              color="primary"
              thickness="1.4"
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="p"
                color="white"
                fontSize="20px"
                fontWeight="700"
              >
                {renderedTimer}
              </Typography>
            </Box>
          </Box>
        </ThemeProvider>
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          size="large"
          onClick={toggleTimerHandler}
          sx={{
            borderRadius: "50%",
            bgcolor: "#DC6240",
            opacity: `${curTime === 0 ? "0.5" : "1"}`,
          }}
          disabled={curTime === 0}
        >
          {!isRunning && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M8 5.14v14l11-7z" fill="#ffffff" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          )}
          {isRunning && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M6 6h12v12H6z" fill="#ffffff" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
          )}
        </Button>
      </CardActions>
    </>
  );
};

export default ShowTimer;
