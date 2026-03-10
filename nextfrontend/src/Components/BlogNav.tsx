"use client";

import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";

interface BlogNavProps {
  prevSlug?: string;
  nextSlug?: string;
}

export default function BlogNav({ prevSlug, nextSlug }: BlogNavProps) {
  const handleNoPost = (direction: string) => {
    toast(`No ${direction} post available!`, {
      icon: '🚫',
      style: {
        borderRadius: '10px',
        background: '#5540af',
        color: '#fff',
        fontFamily: 'Raleway, sans-serif'
      },
    });
  };

  // Shared button styling
  const buttonStyles = "flex items-center px-6 py-3 rounded-full border-2 border-primary transition-all duration-300 ease-in-out group min-w-[180px] justify-center";
  const activeStyles = "hover:bg-primary hover:shadow-lg transform hover:-translate-y-1 active:scale-95 cursor-pointer";
  const disabledStyles = "opacity-40 cursor-not-allowed bg-transparent";

  return (
    <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-6 border-t border-lila py-12">
      {/* Changed position to bottom-center for better visibility on mobile */}
      <Toaster position="bottom-center" />
      
      {/* Previous Button */}
      {prevSlug ? (
        <Link 
          href={`/blog/${prevSlug}`} 
          prefetch={true}
          className={`${buttonStyles} ${activeStyles}`}
        >
          <i className="bx bx-left-arrow-alt text-2xl text-primary group-hover:text-yellow transition-colors"></i>
          <span className="block pl-3 font-header text-sm font-bold uppercase text-primary group-hover:text-white transition-colors">
            Previous Post
          </span>
        </Link>
      ) : (
        <button 
          type="button"
          onClick={() => handleNoPost('previous')} 
          className={`${buttonStyles} ${disabledStyles}`}
        >
          <i className="bx bx-left-arrow-alt text-2xl text-primary"></i>
          <span className="block pl-3 font-header text-sm font-bold uppercase text-primary">
            Previous Post
          </span>
        </button>
      )}

      {/* Next Button */}
      {nextSlug ? (
        <Link 
          href={`/blog/${nextSlug}`} 
          prefetch={true}
          className={`${buttonStyles} ${activeStyles}`}
        >
          <span className="block pr-3 font-header text-sm font-bold uppercase text-primary group-hover:text-white transition-colors">
            Next Post
          </span>
          <i className="bx bx-right-arrow-alt text-2xl text-primary group-hover:text-yellow transition-colors"></i>
        </Link>
      ) : (
        <button 
          type="button"
          onClick={() => handleNoPost('next')} 
          className={`${buttonStyles} ${disabledStyles}`}
        >
          <span className="block pr-3 font-header text-sm font-bold uppercase text-primary">
            Next Post
          </span>
          <i className="bx bx-right-arrow-alt text-2xl text-primary"></i>
        </button>
      )}
    </div>
  );
}