export default function ErrorMessages({ errors }) {
  return (
    <div className="w-full p-2 rounded">
      {Object.values(errors).filter(Boolean).map((error, i) => (
        <p key={i} className="text-red-500 text-xs mt-1 text-left">
          {error}
        </p>
      ))}
    </div>
  );
}
