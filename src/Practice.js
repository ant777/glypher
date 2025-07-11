export function Practice({data}) {
  const glyph = data[0].split(',')[0];
  const pinyin = data[0].split(',')[1];
  const eng = data[0].split(',')[2];

  const options = data.filter(it => it.split(',')[0] !== glyph).sort(() => Math.random() - 0.5).slice(0, 2);
  return <div className="practice">{glyph}<div>{pinyin}</div>{options.map(opt => <div key={opt}>{opt.split(',')[1]}</div>)}</div>;
}