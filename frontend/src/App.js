import { useState, useEffect } from 'react';


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = () => {
    fetch('/api/', {
      credentials: 'include',
      method: 'GET'
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }).then((data) => {
      setData(data);
      console.log(data);
      setLoading(false);
    }
    ).catch((error) => {
      setError(error);
      setLoading(false);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div className="App">
      <h1>
        React App
      </h1>
      <div>
        {data.map((item, index) => (
          <div key={index}>
            <div>{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
