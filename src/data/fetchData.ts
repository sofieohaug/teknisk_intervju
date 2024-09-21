import { useState, useEffect } from 'react';
export const FetchDataCalculation = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('https://9f22opit6e.execute-api.us-east-2.amazonaws.com/default/reisefradrag')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setData(data);
      }).catch((error) => console.error('Error:', error));
  }, []);

};

// .then((response) => response.json())
// .then((data) => console.log(data))
// .catch((error) => console.error('Error:', error));
