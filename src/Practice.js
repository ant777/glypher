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

export function Practice({ data, mode, reload }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState();
  const questionWordPos = useMemo(() => {
    if (mode === 'mode1') {
      null
      return 0;
    }
    if (mode === 'mode2') {
      return 1;
    }
    if (mode === 'mode3') {
      return 0;
    }
    if (mode === 'mode4') {
      return 1;
    }
    if (mode === 'mode5') {
      return 2;
    }
    if (mode === 'mode6') {
      return 2;
    }
  }, [mode]);
  const correctWordPos = useMemo(() => {
    if (mode === 'mode1') {
      return 1;
    }
    if (mode === 'mode2') {
      return 0;
    }
    if (mode === 'mode3') {
      return 2;
    }
    if (mode === 'mode4') {
      return 2;
    }
    if (mode === 'mode5') {
      return 0;
    }
    if (mode === 'mode6') {
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

  const wrongOptions = useMemo(() => {
    return shuffle(data.filter(it => it.split(',')[questionWordPos] !== question)).slice(0, 3);
  }, [data, questionWordPos, question])

  const options = useMemo(() => { return shuffle([...wrongOptions.map(opt => opt.split(',')[correctWordPos]), correct]); }, [wrongOptions, correctWordPos, correct]);

  return <div className="practice">
    <button onClick={() => { speak(question) }}>Speak</button><br />
    {currentStep + 1}/{data.length}
    <div className="preview">{question}</div>
    <div className="options">
      {options.map((opt, ind) => <div key={ind}
        onClick={() => {
          if (selected) return;
          setSelected(opt);
        }} className={`option${correct === opt && selected ? ' correct' : ''}${selected === opt ? ' selected' : ''}`}>{opt}</div>)}
    </div>
    {currentStep < data.length - 1 ? <button onClick={() => {
      if (currentStep >= data.length - 1) return;
      setSelected(null);
      setCurrentStep(currentStep + 1)
    }}
      disabled={!selected}>Next</button> : <button onClick={() => {
        setCurrentStep(0);
        setSelected(null); reload()
      }}
        disabled={!selected}>Another round</button>}</div>;
}