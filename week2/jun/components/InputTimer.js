import React, { useState } from "react";
import { Box, Button, Divider, Paper, TextField } from "@mui/material";

/**
 * 양수인지 체크하기 위한 함수
 * @param {Number} param 변수
 * @returns Boolean
 */
const isErrorNumber = (param) => isNaN(param) || param < 0;

/**
 * 하나 이상 입력되었는지 확인하기 위한 함수
 * @param  {...number} args 숫자, 숫자 배열
 * @returns Boolean
 */
const isErrorInput = (...args) => args.every((arg) => Number(arg) === 0);

const InputTimer = ({ onSubmit }) => {
  const [enteredHour, setEnteredHour] = useState(0);
  const [enteredMin, setEnteredMin] = useState(0);
  const [enteredSec, setEnteredSec] = useState(0);
  const [error, setError] = useState("");

  const onChangeHour = (e) => setEnteredHour(e.target.value);
  const onChangeMin = (e) => setEnteredMin(e.target.value);
  const onChangeSec = (e) => setEnteredSec(e.target.value);

  const isErrorHour = isErrorNumber(enteredHour);
  const isErrorMin = isErrorNumber(enteredMin);
  const isErrorSec = isErrorNumber(enteredSec);

  const isErrorTime =
    isErrorHour ||
    isErrorMin ||
    isErrorSec ||
    isErrorInput(enteredHour, enteredMin, enteredSec);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (enteredHour > 99) {
      setError("Enter the correct Hour (0 ~ 99)");
      return;
    }

    if (enteredMin > 60) {
      setError("Enter the correct Minute (0 ~ 60)");
      return;
    }

    if (enteredSec > 60) {
      setError("Enter the correct Second (0 ~ 60)");
      return;
    }

    const time = enteredHour * 3600 + enteredMin * 60 + enteredSec;
    onSubmit(time);
  };

  return (
    <Paper
      component="form"
      onSubmit={onSubmitHandler}
      sx={{
        p: "6px 8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        height: 240,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "8px",
        }}
      >
        <TextField
          type="number"
          label="Hour"
          variant="outlined"
          value={enteredHour}
          onChange={onChangeHour}
          autoFocus={true}
          color={isErrorHour ? "error" : "primary"}
          error={isErrorHour}
        />
        <Divider sx={{ height: 48, m: 1 }} orientation="vertical" />
        <TextField
          type="number"
          label="Minute"
          variant="filled"
          value={enteredMin}
          onChange={onChangeMin}
          color={isErrorMin ? "error" : "primary"}
        />
        <Divider sx={{ height: 48, m: 1 }} orientation="vertical" />
        <TextField
          type="number"
          label="Second"
          variant="filled"
          value={enteredSec}
          onChange={onChangeSec}
          color={isErrorSec ? "error" : "primary"}
        />
      </Box>

      <Button
        type="submit"
        sx={{
          mt: "16px",
          bgcolor: "#87CEEB",
          fontWeight: "700",
          width: "100%",
          opacity: `${isErrorTime && "0.7"}`,
        }}
        disabled={isErrorTime}
      >
        Submit
      </Button>

      {error && <p style={{ color: "red", fontWeight: "600" }}>{error}</p>}
    </Paper>
  );
};

export default InputTimer;
