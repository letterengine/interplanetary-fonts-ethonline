export default function ConnectButton(props) {
  const buttonClass =
    'w-56 border-2 px-4 py-2 bg-red border-red rounded border-solid hover:border-solid text-white text-md hover:text-darkblue hover:border-darkblue focus:outline-none';
  return (
    <button onClick={props.onClick} className={buttonClass}>
      {props.buttonText}
    </button>
  );
}
