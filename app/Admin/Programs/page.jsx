'use client'
import Programs from '@/components/Programs';
import { IoIosAddCircle } from 'react-icons/io';
import { useRouter } from 'next/navigation';
export default function Page() {
  const router = useRouter()
  return (
    <div className="w-full">
       <IoIosAddCircle onClick={()=>{router.push('/Admin/AddProgram')} }   className=' cursor-pointer absolute bottom-[10%] right-[5%] hover:scale-125 z-50  h-20 w-20 text-green-600' />
      <main className="flex flex-col items-center">
        <Programs />
      </main>
    </div>
  );
}
