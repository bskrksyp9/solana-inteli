export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="loader-spinner mb-4"></div>
      <p className="text-gray-700 dark:text-gray-300 text-sm">Loading...</p>
    </div>
  );
}