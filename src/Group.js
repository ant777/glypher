export function Group({onClick, data}) {
    return <div className="group" onClick={onClick}>
      <div className="hanzi">{data.glyph}</div><div>{data.id}<br/>{data.words.split('\n').length} words</div>
    </div>;
}