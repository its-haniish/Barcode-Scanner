import React, { useState } from 'react';
import './App.css';

function App() {
  const [rollNo, setRollNo] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) {
      return setRollNo('Select Image');
    }
    setRollNo('Fetching info...');
    const formData = new FormData();  // Correctly initialize FormData
    formData.append("image", image);

    const url = 'https://qr-code-and-barcode-scanner.p.rapidapi.com/ScanCode';
    const options = {
      method: 'POST',
      headers: {
        'X-RapidAPI-Key': 'acfe366f2emshd92fb24e344a931p11a157jsna63d8165285a',
        'X-RapidAPI-Host': 'qr-code-and-barcode-scanner.p.rapidapi.com'
      },
      body: formData
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();  // Parse the response as JSON

      if (result.statusMessage === "ok" && result.data && result.data.length > 0) {
        setRollNo(result.data[0].allFields[0].fieldValue);
      } else {
        setRollNo('Try with diffrent image.');
      }
    } catch (error) {
      console.error(error);
      setRollNo('An error occurred.');
    }
  };

  return (
    <div className="App">
      <h1>Test Scanner Reader</h1>
      <input type="file" id="imageInput" accept="image/*" onChange={handleImageChange} required />
      <button onClick={handleSubmit}>Upload</button>
      <p>{rollNo}</p>
    </div>
  );
}

export default App;
