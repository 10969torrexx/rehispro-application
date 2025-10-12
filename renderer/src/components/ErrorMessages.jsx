export default function ErrorMessages({ errors }) {
  if (!errors) return null;
  const errorList = typeof errors === "string"
    ? [errors]
    : Object.values(errors).filter(Boolean);

  return (
    <div className="w-full pl-2">
      {errorList.map((error, i) => (
        <p key={i} className="text-red-500 text-xs mt-1 text-left">
          <i className="bi bi-exclamation-circle mr-2" key={i}></i>
          {error}
        </p>
      ))}
    </div>
  );
}
