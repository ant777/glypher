
  function speak(word) {
    console.warn(11)
    // Create a SpeechSynthesisUtterance
    const utterance = new SpeechSynthesisUtterance(word);

    // Select a voice
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0]; // Choose a specific voice

    // Speak the text
    speechSynthesis.speak(utterance);
  }

export function Practice({data}) {
  const glyph = data[0].split(',')[0];
  const pinyin = data[0].split(',')[1];
  const eng = data[0].split(',')[2];

  const options = data.filter(it => it.split(',')[0] !== glyph).sort(() => Math.random() - 0.5).slice(0, 2);
  return <div className="practice"><button onClick={() => {speak(glyph)}}>Speak</button>{glyph}<div>{pinyin}</div>{options.map(opt => <div key={opt}>{opt.split(',')[1]}</div>)}<button>Next</button></div>;
}