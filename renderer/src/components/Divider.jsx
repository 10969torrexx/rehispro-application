export default function Divider({ text }) {
  return (
    <div className="my-6">
      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">{text}</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    </div>
  );
}
