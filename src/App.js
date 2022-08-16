import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './Photo';
import axios from 'axios';

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
 const [loading, setLoading] = useState(false);
 const [photos, setPhotos] = useState([]);
 const [page, setPage] = useState(1);
 const [query, setQuery] = useState('');
 const mounted = useRef(false);
 const [newImages, setNewImages] = useState(false);
 const fetchImages = async () => {
  setLoading(true);
  let url;
  const urlPage = `&page=${page}`;
  const urlQuery = `&query=${query}`;
  if (query) {
   url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
  } else {
   url = `${mainUrl}${clientID}${urlPage}`;
  }
  try {
   const response = await fetch(url);
   const data = await response.json();
   setPhotos((oldPhotos) => {
    if (query && page === 1) {
     return data.results;
    } else if (query) {
     return [...oldPhotos, ...data.results];
    } else {
     return [...oldPhotos, ...data];
    }
   });
   setNewImages(false);
   setLoading(false);
  } catch (error) {
   setNewImages(false);

   setLoading(false);
  }
 };
 useEffect(() => {
  fetchImages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [page]);

 useEffect(() => {
  if (!mounted.current) {
   mounted.current = true;
   return;
  }
  if (!newImages) return;
  if (loading) return;
  setPage((oldPage) => oldPage + 1);
 }, [newImages]);

 const event = () => {
  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 1) {
   setNewImages(true);
  }
 };

 useEffect(() => {
  window.addEventListener('scroll', event);
  return () => window.removeEventListener('scroll', event);
 }, []);

 const handleSubmit = (e) => {
  e.preventDefault();
  if (!query) return;
  if (page === 1) {
   fetchImages();
  }
  setPage(1);
 };
 return (
  <main className="bg-gray-100 h-content">
   <section className="container mx-auto py-20 px-10">
    <form
     onChange={(e) => setQuery(e.target.value)}
     action=""
     className=" pb-1 border border-t-transparent border-l-transparent border-b-2 border-r-transparent border-b-black w-[30vw] flex">
     <input
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      placeholder="search"
      className="w-full p-2 bg-transparent border-none"
     />
     <button onClick={handleSubmit} type="submit" className="pl-2 text-2xl">
      <FaSearch />
     </button>
    </form>
    <div className="grid pt-10  md:grid-cols-2 lg:grid-cols-3 grid-cols-1  gap-10 bg-gray-100 h-content">
     {photos.map((item, index) => (
      <Photo key={index} {...item} />
     ))}
    </div>
    {loading && <h2 className="pb-4 pt-4 text-5xl text-center">Loading...</h2>}
   </section>
  </main>
 );
}

export default App;
