import Spinner from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-gray-600">
        <Spinner size={32} />
        <span>Loading...</span>
      </div>
    </div>
  );
}
