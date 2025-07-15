import { useContext, useMemo, useState } from "react";
import { containsChinese, shuffle, useGlobalKeyDown } from "./tools";
import { DataContext } from "./DataContext";

function speak(word) {
  // Create a SpeechSynthesisUtterance
  const utterance = new SpeechSynthesisUtterance(word);

  // Select a voice
  const voices = speechSynthesis.getVoices();
  utterance.voice = voices.filter(v => v.lang.includes('zh'))[0]; // Choose a specific voice
  utterance.lang = 'zh'
  // Speak the text
  speechSynthesis.speak(utterance);
}

export function Practice({ data, reload }) {
  const handleGlobalKey = (event) => {
    if (event.key === 'Enter') {
      document.querySelectorAll('.proceed')[0].click();
    }
    if (event.code === 'Space') {
      document.querySelectorAll('.speak')[0].click();
    }
    if (event.key === '1' &&
      document.querySelectorAll('.options .option')[0]) {
      document.querySelectorAll('.options .option')[0].click();
    }

    if (event.key === '2' &&
      document.querySelectorAll('.options .option')[1]) {
      document.querySelectorAll('.options .option')[1].click();
    }

    if (event.key === '3' &&
      document.querySelectorAll('.options .option')[2]) {
      document.querySelectorAll('.options .option')[2].click();
    }

    if (event.key === '4' &&
      document.querySelectorAll('.options .option')[3]) {
      document.querySelectorAll('.options .option')[3].click();
    }
  };

  useGlobalKeyDown(handleGlobalKey);
  const [currentStep, setCurrentStep] = useState(0);
  const [selected, setSelected] = useState();
  const [studyStage, setStudyStage] = useState(true);
  const settings = useContext(DataContext);
  const mode = useMemo(() => {
    if (settings.mode === 'mode7') {
      return `mode${Math.round(Math.random() * 5) + 1}`;
    }
    return settings.mode;
  }, [settings, currentStep]);


  const isStudy = useMemo(() => { return settings.practiceType === 'practice1' && studyStage; }, [settings, studyStage]);
  const questionWordPos = useMemo(() => {
    if (mode === 'mode1' || isStudy) {
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
  }, [mode, studyStage]);
  const correctWordPos = useMemo(() => {
    if (mode === 'mode1' || isStudy) {
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
  }, [mode, studyStage]);
  const question = useMemo(() => {
    return data[currentStep].split(',')[questionWordPos]
  }, [currentStep, data, mode, questionWordPos]);
  const correct = useMemo(() => {
    return data[currentStep].split(',')[correctWordPos]
  }, [currentStep, data, mode, correctWordPos]);
  const hint = useMemo(() => {
    return data[currentStep].split(',')[2]
  }, [currentStep, data, mode]);

  const wrongOptions = useMemo(() => {
    return shuffle(data.filter(it => it.split(',')[questionWordPos] !== question)).slice(0, 3);
  }, [data, questionWordPos, question])
  const options = useMemo(() => { return shuffle([...wrongOptions.map(opt => opt.split(',')[correctWordPos]), correct]); }, [wrongOptions, correctWordPos, correct]);

  return <div className="practice"><div className="unit">

    <button onClick={() => { speak(question) }} className="speak" tabIndex={-1}></button><br />
    {currentStep + 1}/{data.length}
    <div className={`preview${containsChinese(question) ? ' bigger' : ''}`}>{question}</div>
    {isStudy ? <div>{correct}<br />{hint}</div> : <div className="options">
      {options.map((opt, ind) => <div key={ind}
        onClick={() => {
          if (selected) return;
          setSelected(opt);
        }} className={`option${correct === opt && selected ? ' correct' : ''}${selected === opt ? ' selected' : ''}`}>{opt}</div>)}
    </div>}
    {currentStep < data.length - 1 ? <button onClick={() => {
      if (currentStep >= data.length - 1) return;
      setSelected(null);
      setCurrentStep(currentStep + 1)
    }}
      disabled={!selected && !isStudy} className="proceed">Next</button> : <button className="proceed" onClick={() => {
        setCurrentStep(0);
        setSelected(null);
        if (isStudy) {
          setStudyStage(false);
        } else {
          setStudyStage(true)
          reload();
        }
      }}
        disabled={!selected && !isStudy}>{isStudy ? 'Start test' : 'Another round'}</button>}
  </div></div>;
}