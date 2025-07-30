"use client";
import { useRouter } from "next/navigation";

type Template = { id: string }; // Adjust fields as needed

export default function UseTemplateButton({ template }: { template: Template }) {
  const router = useRouter();
  const handleUse = () => {
    // Arahkan ke onboarding/builder dengan template terpilih
    router.push(`/onboarding?template=${template.id}`);
  };
  return (
    <button
      onClick={handleUse}
      className="w-full py-3 bg-accent text-white font-bold rounded-xl shadow-lg text-lg hover:bg-accent/90 transition-all mt-4"
    >
      Gunakan Template Ini
    </button>
  );
}
