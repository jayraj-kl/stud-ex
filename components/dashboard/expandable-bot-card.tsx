"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import type { Bot } from "@/types/bot";
import { useRouter } from "next/navigation";

export default function ExpandableBotCards({ bots }: { bots: Bot[] }) {
  const router = useRouter();
  const [active, setActive] = useState<Bot | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.name}-${id}`}>
                {active.imagePath && (
                  <Image
                    priority
                    width={500}
                    height={300}
                    src={active.imagePath || "/placeholder.svg"}
                    alt={active.name}
                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                  />
                )}
              </motion.div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.name}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-2xl mb-2"
                    >
                      {active.name}
                    </motion.h3>
                    <motion.p
                      layoutId={`subject-${active.subject}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-lg"
                    >
                      {active.subject}
                    </motion.p>
                  </div>
                  <motion.button
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                      router.push(`/dashboard/${active.name}`);
                    }}
                    className="px-6 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    Talk
                  </motion.button>
                </div>
                <div className="space-y-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 dark:text-neutral-400 text-base"
                  >
                    <h4 className="font-medium text-neutral-700 dark:text-neutral-200 mb-2">
                      Description
                    </h4>
                    <p>{active.description}</p>
                  </motion.div>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 dark:text-neutral-400 text-base"
                  >
                    <h4 className="font-medium text-neutral-700 dark:text-neutral-200 mb-2">
                      Resources
                    </h4>
                    <p className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg">
                      {active.resources}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bots.map((bot) => (
          <motion.div
            layoutId={`card-${bot.name}-${id}`}
            key={bot.name}
            onClick={() => setActive(bot)}
            className="p-4 flex flex-col bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-xl cursor-pointer shadow-md transition-colors"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${bot.name}-${id}`}>
                {bot.imagePath && (
                  <Image
                    width={400}
                    height={200}
                    src={bot.imagePath || "/placeholder.svg"}
                    alt={bot.name}
                    className="h-48 w-full rounded-lg object-cover object-top"
                  />
                )}
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${bot.name}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-xl mb-2"
                >
                  {bot.name}
                </motion.h3>
                <motion.p
                  layoutId={`subject-${bot.subject}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {bot.subject}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
