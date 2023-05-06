import React from 'react'
import AccordionItem from './AccordionItem'

const items = [
    {
      title: "Item 1",
      content: "      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore odit voluptatibus accusamus voluptatem nesciunt id ex nihil? Ipsa, fugit modi!      "
    },
    {
      title: "Item 2",
      content: "      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore odit voluptatibus accusamus voluptatem nesciunt id ex nihil? Ipsa, fugit modi!      " } ]
export default function Programs() {
    
  return (
    <div id='programs' className='w-screen max-w-[65rem] flex items-center flex-col'>
        <p className="text-5xl text-center font-mono mt-20  border-b-2 border-red-600  text-blue-900">Notre Programmes</p>
 <div className="divide-y   mt-12">
    {items.map(({ title, content }, index) => (
      <AccordionItem key={index} title={title} content={content} />
    ))}
  </div>

    </div>
   
  )
}
