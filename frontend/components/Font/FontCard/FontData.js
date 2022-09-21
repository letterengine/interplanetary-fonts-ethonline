export default function FontData(props) {
  return (
    <div>
      <h5>{props.font.nme}</h5>
      <button>Creators</button>
      <h5>Description</h5>
      <p>{props.font.description}</p>
      <h5>Font Streams</h5>
      {props.font.streams.map((stream, i) => (
        <p key={`stream-${i}`}>{stream}</p>
      ))}
      <h5>Collected by</h5>
      {props.font.collected.map((collector, i) => (
        <p key={`collector-${i}`}>{collector.username}</p>
      ))}
    </div>
  );
}
