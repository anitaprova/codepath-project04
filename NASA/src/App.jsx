import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [currentImage, setCurrentImage] = useState({
    nasa_id: "",
    keywords: [],
    description: "",
    url: "",
  });

  const [currentBanned, setCurrentBanned] = useState([]);

  const getImage = () => {
    let num = Math.floor(Math.random() * 100);
    axios
      .get("https://images-api.nasa.gov/search?q=galaxy&media_type=image")
      .then((res) => {
        // as long as keywords arent in banned
        do {
          num = Math.floor(Math.random() * 100);
        } while (
          res.data.collection.items[num].data[0].keywords.some((word) =>
            currentBanned.includes(word)
          )
        );

        setCurrentImage({
          nasa_id: res.data.collection.items[num].data[0].nasa_id,
          keywords: res.data.collection.items[num].data[0].keywords,
          description: res.data.collection.items[num].data[0].description_508,
          url: res.data.collection.items[num].links[0].href,
        });

        currentImage.nasa_id = res.data.collection.items[num].data[0].nasa_id;
        currentImage.keywords = res.data.collection.items[num].data[0].keywords;
        currentImage.description =
          res.data.collection.items[num].data[0].description_508;
        currentImage.url = res.data.collection.items[num].links[0].href;
      });
  };

  const banned = (k) => {
    setCurrentBanned((prevBanned) => {
      if (!prevBanned.includes(k)) {
        return [...prevBanned, k];
      }
      return prevBanned;
    });
  };

  return (
    <div className="main">
      <div className="content">
        <h2>🌌Nasa Images🌌</h2>
        <p>Images from NASA Gallery about Our Galaxy</p>
        <button onClick={getImage}>Discover</button>
        <p></p>
        <img src={currentImage.url} />
        <p>{currentImage.description}</p>
        <div className="keyword-main">
          {currentImage.keywords.map((k, index) => {
            return (
              <button key={index} className="keyword" onClick={() => banned(k)}>
                {k}
              </button>
            );
          })}
        </div>
      </div>

      <div className="sidebar">
        <h2>Ban List</h2>
        <div className="banned-main">
          {currentBanned.map((k, index) => {
            return (
              <div key={index} className="banned">
                {k}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
