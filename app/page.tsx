'use client'
import React, { useState, useEffect } from 'react';

const AutomatedBot: React.FC = () => {
  const myTweets = [
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t just find you. You have to go out and get it.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Do something today that your future self will thank you for.",
    "Little things make big days.",
    "It’s going to be hard, but hard does not mean impossible.",
    "Don’t wait for opportunity. Create it.",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
    "The key to success is to focus on goals, not obstacles.",
    "Dream it. Believe it. Build it.",
    "Do it with passion or not at all.",
    "Do what you love, and the money will follow.",
    "It’s not about how bad you want it. It’s about how hard you’re willing to work for it.",
    "Do something today that your future self will thank you for.",
    "Wake up with determination. Go to bed with satisfaction.",
    "Little things make big days.",
    "It’s going to be hard, but hard does not mean impossible.",
    "Don’t wait for opportunity. Create it.",
    "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
    "The key to success is to focus on goals, not obstacles.",
    "Dream it. Believe it. Build it.",
    "Do it with passion or not at all.",
    "Do what you love, and the money will follow.",
    "It’s not about how bad you want it. It’s about how hard you’re willing to work for it.",
    "You don’t have to be great to start, but you have to start to be great.",
    "The only way to achieve the impossible is to believe it is possible.",
    "Don’t let yesterday take up too much of today. - Will Rogers",
    "You are never too old to set another goal or to dream a new dream. - C.S. Lewis",
    "The future belongs to the competent. Get good, get better, be the best! - Brian Tracy",
    "Success is walking from failure to failure with no loss of enthusiasm. - Winston Churchill",
    "If you want to achieve greatness stop asking for permission. - Anonymous",
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
    "Creativity is intelligence having fun. - Albert Einstein",
    "Someday is not a day of the week. - Janet Dailey",
    "You are what you do today, not what you say you’ll do tomorrow. - Anonymous",
    "It’s not the load that breaks you down, it’s the way you carry it. - Lou Holtz",
    "Failure will never overtake me if my determination to succeed is strong enough. - Og Mandino",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "The future depends on what you do today. - Mahatma Gandhi",
    "You don’t have to be perfect to be amazing.",
    "The expert in anything was once a beginner.",
    "You are stronger than you think.",
    "You are capable of more than you know.",
    "Strive for progress, not perfection.",
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
    "The only way to do great work is to love what you do. - Steve Jobs",
  ]
  const [time, setTime] = useState<number>(1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [tweets, setTweets] = useState<{ serial: number; data: string; time: string }[]>([]);
  const [countdown, setCountdown] = useState<number>(time * 60);
  const [msg, setMsg] = useState<string>("");

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

  const generateRandomNumber = (start: number, end: number): number => {
    return Math.floor(Math.random() * (end - start + 1)) + start;
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue: number = parseInt(e.target.value);
    setTime(Math.max(inputValue, 1));
  };

  function toastMsg(msg:string){
    setMsg(msg)
    setTimeout(()=>{
      setMsg("")
    },3000)
  }

  async function newTweet(twt:string) {
    try {
      const response = await fetch(`/api?tweet=${twt}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      toastMsg("tweet successfully")
    } catch (error) {
      toastMsg("error in tweet")
    }
  }

  const postToTwitter = (): void => {
    let indx = generateRandomNumber(0, myTweets.length - 1)
    // Your function to post to Twitter goes here
    const currentTime = new Date();
    const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()} ${currentTime.getHours() >= 12 ? 'PM' : 'AM'}`;
    setTweets((prevTweets) => [...prevTweets, { serial: prevTweets.length + 1, data: myTweets[indx], time: formattedTime }]);
    newTweet(myTweets[indx])
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
      <video autoPlay muted loop className="video-bg">
        <source src="/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>AUTOMATED SOCIAL MEDIA</h1>
        <div className="input-section">

          <span>New Tweet Every </span>
          <input
            type="number"
            value={time}
            min="1"
            onChange={handleTimeChange}
            disabled={isRunning}
          />
          <span>Minutes</span>
        </div>
        <button onClick={handleStartStop}>{isRunning ? 'Stop' : 'Start'}</button>
        <div className="timer">
          {isRunning && `New Tweet After : ${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60}`}
        </div>
        {
          msg?
          <p>{msg}</p>
          :
          null
        }
        {
          tweets?.length
            ?
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Serial Number</th>
                    <th>Tweet</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {tweets.map((tweet) => (
                    <tr key={tweet.serial}>
                      <td>{tweet.serial}</td>
                      <td>{tweet.data}</td>
                      <td>{tweet.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            :
            null
        }
      </div>
      <style jsx>{`
        .container {
          position: relative;
          height: 100vh;
        }

        .video-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          object-fit: cover; /* Cover entire viewport */
          filter: brightness(70%); /* Adjust brightness for contrast */
        }

        .content {
          position: relative;
          z-index: 1;
          width: 90vw;
          margin: auto;
          text-align: center;
          color: white; /* Set text color to white for contrast */
        }

        .input-section {
          margin-bottom: 20px;
          gap:10
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
          margin-top: 10px;
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

        th,
        td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
      `}</style>
    </div>
  );
};

export default AutomatedBot;
