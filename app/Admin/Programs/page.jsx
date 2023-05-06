import Programs from '@/components/Programs';

export default function Page() {
  return (
    <div className="relative">
      <button className="absolute top-0 right-0 bg-[#DC143C] sm:mb-0 hover:scale-110 hover:bg-blue-500 text-sm font-bold text-white rounded-lg py-4 px-16 mt-20 mr-4">Ajouter au programme</button>
      <main className="flex flex-col items-center">
        <Programs />
      </main>
    </div>
  );
}
