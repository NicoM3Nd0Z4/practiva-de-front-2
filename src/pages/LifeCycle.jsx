import React, { useState } from 'react'

const LifeCycle = () => {

  const [text, setText] = useState("");

  useEffect(() => {
    console.log("Componente montado");
  }, []);

  useEffect(() => {
    console.log("Componente actualizado");
  }, [text]);

  useEffect(() => {
    return () => {
      console.log("Componente desmontado");
    };
  }, [text]);

  useEffect(() => {
    console.log("Componente siempre");
  });

  return (
    <div>
      <input type='text' value={text} onChange={(e) => setText(e.target.value)}  />
      {text}
    </div>
  );
};

export default LifeCycle
