import { useCallback, useState } from "react";
import styled from "styled-components";
import { Card, Typography } from "@mui/material";

import InputTimer from "./components/InputTimer";
import ShowTimer from "./components/ShowTimer";

const StyledWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  background-color: #cecabb;
`;

const App = () => {
  const [time, setTime] = useState(0);
  const [isEditting, setIsEditting] = useState(true);

  const onSubmitTime = useCallback((ptime = -1) => {
    setTime(ptime);
    setIsEditting(false);
  }, []);

  const onChangeEdit = () => setIsEditting(true);

  return (
    <StyledWrapper>
      <Card
        sx={{
          position: "relative",
          padding: "16px 8px",
          bgcolor: "#323540",
          textAlign: "center",
          width: 432,
          height: 324,
        }}
      >
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          color="white"
          pb="16px"
        >
          Timer
        </Typography>

        {isEditting ? (
          <InputTimer onSubmit={onSubmitTime} />
        ) : (
          <ShowTimer time={time} onEdit={onChangeEdit} />
        )}
      </Card>
    </StyledWrapper>
  );
};

export default App;
