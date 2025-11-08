import { useState } from "react";
export default function InfoCard({ title = "Information", message = "This is an info message.", isBulletedMessage=false, isClosable = true }) {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  const bulletedMessage = message.split('/b');
  return (
    <div className="relative bg-blue-50 border border-blue-300 text-blue-800 p-4 rounded-xl shadow-sm w-full">
        {isClosable && (
          <button
              onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 text-blue-500 hover:text-blue-700 bg-blue-200  hover:bg-blue-150 rounded-full w-8 h-8 flex items-center justify-center shadow-sm focus:outline-none"
              >
              <i className="bi bi-x text-lg"></i>
          </button>
        )}
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-sm">{message}</p>
    </div>
  );
}
  