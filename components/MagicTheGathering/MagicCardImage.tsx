"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, MouseEvent } from "react";
import LoadingImage from "../Loading/LoadingImage";

const SCRYFALL_URL = "https://api.scryfall.com/cards/named?fuzzy=";

interface ScryfallCard {
  name: string;
  image_uris?: { normal: string };
  card_faces?: Array<{ image_uris?: { normal: string } }>;
}

const MagicCardImage = ({ searchInput }: { searchInput: string }) => {
  const [responseData, setResponseData] = useState<ScryfallCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);

  const searchTerm = searchInput.replaceAll(" ", "+");
  const isDoubleFaced =
    responseData?.card_faces && responseData.card_faces.length > 1;
  const frontImageUrl =
    responseData?.image_uris?.normal ||
    responseData?.card_faces?.[0]?.image_uris?.normal;
  const backImageUrl = responseData?.card_faces?.[1]?.image_uris?.normal;

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    setRotate({
      x: (y - centerY) / 7,
      y: (centerX - x) / 7,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setRotate({ x: 0, y: 0 });
  }, []);

  const handleCardClick = useCallback(() => {
    if (isDoubleFaced) {
      setIsFlipped((prev) => !prev);
    }
  }, [isDoubleFaced]);

  useEffect(() => {
    const fetchCard = async () => {
      setIsLoading(true);
      setIsFlipped(false);

      try {
        const res = await fetch(`${SCRYFALL_URL}${searchTerm}`);
        if (!res.ok) {
          setResponseData(null);
          console.error(`Error fetching data: ${res.status} ${res.statusText}`);
          return;
        }
        setResponseData(await res.json());
      } catch (err) {
        console.error("Error fetching data:", err);
        setResponseData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCard();
  }, [searchTerm]);

  if (isLoading) return <LoadingImage />;
  if (!frontImageUrl) return <LoadingImage />;

  const transform = `perspective(1000px) rotateX(${rotate.x / 4}deg) rotateY(${
    rotate.y / 4
  }deg) scale3d(1, 1, 1)`;
  const transitionStyle = "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s";
  const imageClass = // Need to extract this out to a css file
    "shadow-xl rounded-2xl border-2 border-cradula-pink dark:border-cradula-dark-red hover:shadow-2xl/20 duration-250 ease-in-out relative transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform object-contain";

  return (
    <div
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-fit mx-auto cursor-pointer transition-transform duration-500 ${
        isFlipped ? "[&_.card-content]:rotate-y-180" : ""
      } ${isDoubleFaced ? "hover:shadow-2xl" : ""}`}
    >
      <div className="card-content relative w-fit transition-transform duration-500 [transform-style:preserve-3d]">
        {/* Front Side */}
        <div className="[backface-visibility:hidden] w-fit">
          <Image
            src={frontImageUrl}
            alt={responseData?.name || "Magic: The Gathering Card"}
            width={280}
            height={400}
            className={imageClass}
            style={{ transform, transition: transitionStyle }}
          />
        </div>

        {/* Back Side */}
        {isDoubleFaced && backImageUrl && (
          <div className="absolute inset-0 rotate-y-180 [backface-visibility:hidden] w-fit">
            <Image
              src={backImageUrl}
              alt={`${
                responseData?.name || "Magic: The Gathering Card"
              } (Back)`}
              width={280}
              height={400}
              className={imageClass}
              style={{ transform, transition: transitionStyle }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MagicCardImage;
