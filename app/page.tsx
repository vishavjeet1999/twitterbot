'use client'
import React, { useState, useEffect } from 'react';

const AutomatedBot: React.FC = () => {
  const [time, setTime] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [tweets, setTweets] = useState<{ serial: number; time: string }[]>([]);
  const [countdown, setCountdown] = useState<number>(time * 60);

  useEffect(() => {
    if (isRunning) {
      const timer = setTimeout(() => {
        postToTwitter();
        setCountdown(time * 60);
      }, countdown * 1000);

      return () => clearTimeout(timer);
    }
  }, [isRunning, countdown]);

  const handleStartStop = (): void => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue: number = parseInt(e.target.value);
    setTime(Math.max(inputValue, 1));
  };

  const postToTwitter = (): void => {
    // Your function to post to Twitter goes here
    const currentTime = new Date();
    const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()} ${currentTime.getHours() >= 12 ? 'PM' : 'AM'}`;
    setTweets((prevTweets) => [...prevTweets, { serial: prevTweets.length + 1, time: formattedTime }]);
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <div className="container">
      <h1>Automated Social Media Bot</h1>
      <div className="input-section">
        <input
          type="number"
          value={time}
          min="1"
          onChange={handleTimeChange}
          disabled={isRunning}
        />
        <span>minutes</span>
      </div>
      <div className="timer">{isRunning && `Time left: ${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60} minutes`}</div>
      <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {tweets.map((tweet) => (
              <tr key={tweet.serial}>
                <td>{tweet.serial}</td>
                <td>{tweet.time}</td>
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
          text-align: center;
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
          margin-top: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

export default AutomatedBot;
