export function Group({onClick, data}) {
    return <div onClick={onClick}>
      {data.id}
    </div>;
}