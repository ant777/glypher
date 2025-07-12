import { useMemo, useState } from "react";
import { shuffle } from "./tools";

  function speak(word) {
    // Create a SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(word);

    // Select a voice
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0]; // Choose a specific voice

    // Speak the text
    speechSynthesis.speak(utterance);
  }

export function Practice({data, mode, reload}) {
  const [currentStep, setCurrentStep] = useState(0);
  const questionWordPos = useMemo(() => {
    if(mode === 'mode1') {
      return 0;
    }
    if(mode === 'mode2') {
      return 1;
    }
    if(mode === 'mode3') {
      return 0;
    }
    if(mode === 'mode4') {
      return 1;
    }
    if(mode === 'mode5') {
      return 2;
    }
    if(mode === 'mode6') {
      return 2;
    }
  }, [mode]);
  const correctWordPos = useMemo(() => {
    if(mode === 'mode1') {
      return 1;
    }
    if(mode === 'mode2') {
      return 0;
    }
    if(mode === 'mode3') {
      return 2;
    }
    if(mode === 'mode4') {
      return 2;
    }
    if(mode === 'mode5') {
      return 0;
    }
    if(mode === 'mode6') {
      return 1;
    }
  }, [mode]);
  const question = useMemo(() => {
    return data[currentStep].split(',')[questionWordPos]
  }, [currentStep, data, mode]);
  const correct = useMemo(() => {
    return data[currentStep].split(',')[correctWordPos]
  }, [currentStep, data, mode]);
  const hint = useMemo(() => {
    return data[currentStep].split(',')[2]
  }, [currentStep, data, mode]);

  const options = shuffle(data.filter(it => it.split(',')[questionWordPos] !== question)).slice(0, 2);
  
  return <div className="practice">
    <button onClick={() => {speak(question)}}>Speak</button><br/>
    {currentStep+1}/{data.length}
    <div className="preview">{question}</div>
    <div className="options">
      {shuffle([...options.map(opt => opt.split(',')[correctWordPos]), correct]).map((opt,ind) => <div key={ind} className="option">{opt}</div>)}
    </div>
    {currentStep < data.length -1 ? <button onClick={() => {
      if(currentStep >= data.length - 1) return;
      setCurrentStep(currentStep+1)}}>Next</button> : <button onClick={() => {setCurrentStep(0); reload()}}>Another round</button>}</div>;
}