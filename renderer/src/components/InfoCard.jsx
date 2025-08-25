export default function InfoCard({ title = "Information", message = "This is an info message." }) {
    return (
      <div className="bg-blue-50 border border-blue-300 text-blue-800 p-4 rounded-xl shadow-sm w-full">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-sm">{message}</p>
      </div>
    );
}
  