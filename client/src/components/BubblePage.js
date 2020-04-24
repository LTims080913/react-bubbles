import React, { useState, useEffect } from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
    .get('/api/colors')
    .then(res => {
      setColorList(res.data)
      console.log(colorList)
    })
    .catch(error => {
      console.log('POP goes your bubble', error)
    })
  }, [])
  return (
    <>
      <h1>This is the Bubble Page</h1>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
