import React from 'react';

const Photo = ({
 urls: { regular },
 alt_description,
 likes,
 user: {
  name,
  portfolio_url,
  profile_image: { medium },
 },
}) => {
 return (
  <article className="h-[17.5rem] relative group overflow-hidden">
   <img src={regular} alt={alt_description} className=" relative  w-full h-full object-cover" />
   <div className="flex justify-between items-center bg-[rgba(0,0,0,.4)] px-6 absolute w-full translate-y-[100%] duration-500 bottom-0 left-0 group-hover:translate-y-[0px] p-4 text-white">
    <div className="flex flex-col">
     <h2 className="text-xl font-bold tracking-wider">{name}</h2>
     <span>{likes} likes</span>
    </div>
    <a href={portfolio_url} className="rounded-full">
     <img src={medium} alt={alt_description} className="rounded-full w-10 h-10 block" />
    </a>
   </div>
  </article>
 );
};

export default Photo;
