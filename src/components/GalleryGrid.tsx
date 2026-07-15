"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryImage {
  _id: string;
  title: string;
  imageUrl: string;
  destination: { name: string } | null;
}

interface Props {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: Props) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((img) => (
          <button
            key={img._id}
            onClick={() => setSelected(img)}
            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
          >
            <Image
              src={img.imageUrl}
              alt={img.title || "Galeri gorseli"}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
              <div className="p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                {img.title && (
                  <p className="text-white text-xs font-medium">{img.title}</p>
                )}
                {img.destination && (
                  <p className="text-white/70 text-xs">{img.destination.name}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10"
            onClick={() => setSelected(null)}
          >
            &times;
          </button>
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selected.imageUrl}
              alt={selected.title || "Galeri gorseli"}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          {selected.title && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-white text-sm font-medium">{selected.title}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
