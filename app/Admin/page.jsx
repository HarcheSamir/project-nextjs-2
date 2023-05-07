'use client'
import React from 'react'
import { useRouter } from 'next/navigation';

export default function Page() {
    const router = useRouter();
router.push('/Admin/Employees')
  return (
    <div>
      
    </div>
  )
}
