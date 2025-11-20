"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, MouseEvent } from "react";
import LoadingImage from "../Loading/LoadingImage";

const scryfallURL = "https://api.scryfall.com/cards/named?fuzzy=";

interface ScryfallCard {
  name: string;
  image_uris?: {
    normal: string;
  };
  card_faces?: Array<{
    image_uris?: {
      normal: string;
    };
  }>;
}

function throttle<T extends (e: MouseEvent<HTMLDivElement>) => void>(
  func: T,
  delay: number
): T {
  let lastCall = 0;
  return ((e: MouseEvent<HTMLDivElement>) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    func(e);
  }) as T;
}

const MagicCardImage = ({ searchInput }: { searchInput: string }) => {
  const [responseData, setResponseData] = useState<ScryfallCard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const searchTerm = searchInput.replaceAll(" ", "+");

  const onMouseMove = useCallback(
    throttle((e: MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const centerX = box.width / 2;
      const centerY = box.height / 2;
      const rotateX = (y - centerY) / 7;
      const rotateY = (centerX - x) / 7;

      setRotate({ x: rotateX, y: rotateY });
    }, 50),
    []
  );

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (responseData?.card_faces && responseData.card_faces.length > 1) {
      setIsFlipped((prev) => !prev);
    }
  };

  const callAPI = async () => {
    setIsLoading(true);

    setIsFlipped(false);

    try {
      const res = await fetch(`${scryfallURL}${searchTerm}`);
      if (!res.ok) {
        setResponseData(null);
        setIsLoading(false);
        console.error(`Error fetching data: ${res.status} ${res.statusText}`);
        return;
      }
      const resData = await res.json();
      setResponseData(resData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setResponseData(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (responseData) {
      setIsLoading(false);
    }
  }, [responseData]);

  useEffect(() => {
    callAPI();
  }, [searchTerm]);

  const isDoubleFaced =
    responseData?.card_faces && responseData.card_faces.length > 1;
  const frontImageUrl =
    responseData?.image_uris?.normal ||
    responseData?.card_faces?.[0]?.image_uris?.normal;
  const backImageUrl = responseData?.card_faces?.[1]?.image_uris?.normal;

  return (
    <div>
      {isLoading ? (
        <LoadingImage />
      ) : (
        (() => {
          if (frontImageUrl) {
            return (
              <div
                onClick={handleCardClick}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className={`relative w-fit mx-auto cursor-pointer transition-transform duration-500 ${
                  isFlipped ? "[&_.card-content]:rotate-y-180" : ""
                } ${isDoubleFaced ? "hover:shadow-2xl" : ""}`}
              >
                <div className="card-content relative w-fit transition-transform duration-500 [transform-style:preserve-3d]">
                  {/* Front Side */}
                  <div className="[backface-visibility:hidden]">
                    <Image
                      src={frontImageUrl}
                      alt={responseData.name || "Magic: The Gathering Card"}
                      width={280}
                      height={400}
                      className="shadow-xl rounded-2xl border-2 border-cradula-pink dark:border-cradula-dark-red hover:shadow-2xl/20
duration-250 ease-in-out relative transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform object-contain"
                      style={{
                        transform: `perspective(1000px) rotateX(${
                          rotate.x / 3
                        }deg) rotateY(${rotate.y / 3}deg) scale3d(1, 1, 1)`,
                        transition:
                          "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
                      }}
                    />
                  </div>
                  {/* Back Side */}
                  {isDoubleFaced && backImageUrl && (
                    <div className="absolute inset-0 rotate-y-180 [backface-visibility:hidden]">
                      <Image
                        src={backImageUrl}
                        alt={`${
                          responseData.name || "Magic: The Gathering Card"
                        } (Back)`}
                        width={280}
                        height={400}
                        className="shadow-xl rounded-2xl border-2 border-cradula-pink dark:border-cradula-dark-red hover:shadow-2xl/20
duration-250 ease-in-out relative transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform object-contain"
                        style={{
                          transform: `perspective(1000px) rotateX(${
                            rotate.x / 3
                          }deg) rotateY(${rotate.y / 3}deg) scale3d(1, 1, 1)`,
                          transition:
                            "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          } else {
            return <LoadingImage />;
          }
        })()
      )}
    </div>
  );
};

export default MagicCardImage;
