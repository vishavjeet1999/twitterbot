import { useState, useEffect } from 'react';

const HomePage = () => {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(1); // Default time in minutes
  const [randomNumbers, setRandomNumbers] = useState([]);

  useEffect(() => {
    let intervalId;
    if (running) {
      intervalId = setInterval(() => {
        generateRandomNumber();
      }, time * 60000); // Convert minutes to milliseconds
    }

    return () => clearInterval(intervalId);
  }, [running, time]);

  const toggleRunning = () => {
    setRunning(prevRunning => !prevRunning);
  };

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 1000); // Generating a random number
    setRandomNumbers(prevNumbers => [...prevNumbers, randomNumber]);
  };

  const handleTimeChange = (e) => {
    setTime(parseInt(e.target.value));
  };

  return (
    <div className="container">
      <h1>Automated Twitter Bot</h1>
      <div className="input-section">
        <input type="number" value={time} onChange={handleTimeChange} />
        <span>minutes</span>
      </div>
      <button onClick={toggleRunning}>{running ? 'Stop' : 'Start'}</button>
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
        }
        button {
          background-color: #007bff;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #f2f2f2;
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
