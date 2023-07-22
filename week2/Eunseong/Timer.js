import React, { useEffect, useRef, useState } from 'react';
// Library : MUI 
import {Paper, Container, IconButton} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';



const Timer = () => {
  const [min, setMin] = useState(1);
  const [sec, setSec] = useState(0);
  const [ten_milsec, setTenMilsec] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timer.current = setInterval(() => {
        if (ten_milsec > 0) {
          setTenMilsec(ten_milsec - 1);
        } else {
          if (sec > 0) {
            setTenMilsec(99);
            setSec(sec - 1);
          } else {
            if (min > 0) {
              setSec(59);
              setTenMilsec(99);
              setMin(min - 1);
            } else {
              setIsRunning(false);
            }
          }
        }
      }, 10);
    }
    return () => { clearInterval(timer.current); }
  }, [isRunning, ten_milsec, sec, min]);

  const minAddHandle = () => {
    try {
      if(min === 99){
        throw new Error("Maximun minute");
      }
      setMin(min + 1);
    } catch (error) {
      alert(error.message);
    }
  };

  const minMinusHandle = () => {
    try {
      if(min === 0){
        throw new Error("That value must be positive");
      }
      setMin(min - 1);
    } catch (error) {
      alert(error.message);
    }
  };
   
  const secAddHandle = () => {
    if(sec === 59){
      try {
        if(min === 99){
          throw new Error("Maximun Time");
        }
        setMin(min + 1);
        setSec(0);
      } catch (error) {
        alert(error.message);
      }
    }
    else{
      setSec(sec + 1); 
    }
  };

  const secMinusHandle = () => {
    try {
      if(sec === 0){
        if(min === 0){
          throw new Error("Minimun Time");
        }
        setMin(min - 1);
        setSec(59);
      } else{
        setSec(sec - 1);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const startHandle = () => {
    setIsRunning(true);
  };

  const pauseHandle = () => {
    setIsRunning(false);
  };

  const initHandle = () => {
    setIsRunning(false);
    setSec(0);
    setMin(1);
    setTenMilsec(0);
  };


  return (
    <Container maxWidth="md">

      {/* Time Area Start*/}
      <Paper style={Styles.timeArea} elevation={6}>
        {/* Minute */}
        <div style={Styles.time}>
          {/* Add Button */}
          {!isRunning && <IconButton style={Styles.timeControl} onClick={minAddHandle}>
            <AddIcon></AddIcon>
          </IconButton>}
          {/* Val */}
          {min.toString().padStart(2, "0")}
          {/* Minus Button */}
          {!isRunning && <IconButton style={Styles.timeControl} onClick={minMinusHandle}>
            <RemoveIcon></RemoveIcon>
          </IconButton>}
        </div>

        <span>:</span>

        {/* Sec */}
        <div style={Styles.time}>
          {/* Add Button */}
          {!isRunning && <IconButton style={Styles.timeControl} onClick={secAddHandle}>
            <AddIcon></AddIcon>
          </IconButton>}
          {/* Val */}
          {sec.toString().padStart(2, "0")}
          {/* Minus Button */}
          {!isRunning && <IconButton style={Styles.timeControl} onClick={secMinusHandle}>
            <RemoveIcon></RemoveIcon>
          </IconButton>
          }
        </div>

        <span>:</span>

        {/* 10 * milliSec */}
        <div style={Styles.time}>
          {ten_milsec.toString().padStart(2, "0")}
        </div>
      </Paper>
      {/* Time Area End */}

      {/* btns */}
      <Paper style={Styles.btns} elevation={6}>
          {/* Start btn */}
          {!isRunning && <IconButton size="large" className="btn" onClick={startHandle}>
            <PlayArrowIcon style={Styles.btn}></PlayArrowIcon>
          </IconButton>}
          {/* Pause btn */}
          {isRunning && <IconButton size="large" style={Styles.btn} onClick={pauseHandle}>
            <PauseIcon></PauseIcon>
          </IconButton>}
          {/* Init btn */}
          <IconButton size="large" style={Styles.btn} onClick={initHandle}>
            <StopIcon></StopIcon>
          </IconButton>
        </Paper>

    </Container>

  );
}

export default Timer;

// CSS
const Styles = {
  timeArea: {
	  backgroundColor: "#313131",
    height: "250px",
    fontSize: "120px",
    margin: "10px",
    marginTop: "15%",
    position: "realative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fffff5",
    borderRadius: "10px",
  },
  time: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  timeControl: {
    color: "#fffff5",
  },
  btns: {
    backgroundColor: "#fffff5",
    margin: "10px",
    textAlign: "center",
    borderRadius: "10px",
  },
  btn: {
    color: "#313131"
  }
};