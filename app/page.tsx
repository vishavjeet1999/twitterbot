'use client'
// components/HomePage.tsx

import React, { useState, useEffect } from 'react';

const HomePage: React.FC = () => {
  const [running, setRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(1); // Default time in minutes
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [secondsLeft, setSecondsLeft] = useState<number>(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (running && secondsLeft === 0) {
      setSecondsLeft(time * 60);
    }

    if (running && secondsLeft > 0) {
      intervalId = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    if (!running || secondsLeft === 0) {
      clearInterval(intervalId!); // Ensure intervalId is defined before clearing
    }

    return () => clearInterval(intervalId!);
  }, [running, time, secondsLeft]);

  const toggleRunning = (): void => {
    setRunning((prevRunning) => !prevRunning);
  };

  const generateRandomNumber = (): void => {
    const randomNumber: number = Math.floor(Math.random() * 1000); // Generating a random number
    setRandomNumbers((prevNumbers) => [...prevNumbers, randomNumber]);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue: number = parseInt(e.target.value);
    setTime(Math.max(inputValue, 1)); // Ensure time is not less than 1
  };

  const resetTimer = (): void => {
    setRunning(false);
    setSecondsLeft(0);
  };

  return (
    <div className="container">
      <h1>Automated Twitter Bot</h1>
      <div className="input-section">
        <input
          type="number"
          value={time}
          min="1"
          onChange={handleTimeChange}
          disabled={running}
        />
        <span>minutes</span>
      </div>
      <div className="timer">{running && `Time left: ${secondsLeft} seconds`}</div>
      <button onClick={toggleRunning}>{running ? 'Stop' : 'Start'}</button>
      {running && <button onClick={resetTimer}>Reset</button>}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Random Numbers</th>
            </tr>
          </thead>
          <tbody>
            {randomNumbers.map((number, index) => (
              <tr key={index}>
                <td>{number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        .input-section {
          margin-bottom: 20px;
        }
        input {
          width: 50px;
          margin-right: 10px;
          text-align: center;
        }
        button {
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-right: 10px;
        }
        .timer {
          margin-bottom: 10px;
        }
        .table-container {
          max-height: 200px;
          overflow-y: auto;
          border: 1px solid #ddd;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
