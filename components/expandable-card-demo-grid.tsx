"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useRouter } from "next/navigation";

export default function ExpandableCardDemo() {
  const router = useRouter();
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
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
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.button
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                      router.push(active.ctaLink);
                    }}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.button>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 items-start gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col  hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col  w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-60 w-full  rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
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

const cards = [
  {
    description: "Theory of Computation",
    title: "Mishra",
    src: "/images.jpg",
    ctaText: "Talk",
    ctaLink: "/dashboard/preeti",
    content: () => {
      return (
        <p>
          Mishra is a specialized chatbot designed to assist students and
          researchers in understanding the complexities of the Theory of
          Computation. It covers topics such as automata theory, computability,
          and complexity theory. <br /> <br />
          <strong>Popular Resources Built On:</strong>
          <ul>
            <li>
              <a
                href="https://www.amazon.com/Introduction-Theory-Computation-Michael-Sipser/dp/113318779X"
                target="_blank"
              >
                &quot;Introduction to the Theory of Computation&quot; by Michael
                Sipser
              </a>
            </li>
            <li>
              <a
                href="https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-045j-automata-computability-and-complexity-spring-2011/"
                target="_blank"
              >
                MIT OpenCourseWare: Automata, Computability, and Complexity
              </a>
            </li>
            <li>
              <a
                href="https://www.coursera.org/specializations/theory-computation"
                target="_blank"
              >
                Coursera: Theory of Computation Specialization
              </a>
            </li>
          </ul>
        </p>
      );
    },
  },
  {
    description: "Machine Learning",
    title: " Alex Smola and S.V.N. Vishwanathan",
    src: "/images (1).jpg",
    ctaText: "Talk",
    ctaLink: "/dashboard/rabindra",
    content: () => {
      return (
        <p>
          Alex Smola is a cutting-edge chatbot tailored for machine learning
          enthusiasts. It provides insights into supervised and unsupervised
          learning, neural networks, and deep learning techniques. <br /> <br />
          <strong>Popular Resources Built On:</strong>
          <ul>
            <li>
              <a
                href="https://www.amazon.com/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1492032646"
                target="_blank"
              >
                &quot;Hands-On Machine Learning with Scikit-Learn, Keras, and
                TensorFlow&quot; by Aurélien Géron
              </a>
            </li>
            <li>
              <a
                href="https://www.coursera.org/learn/machine-learning"
                target="_blank"
              >
                Coursera: Machine Learning by Andrew Ng
              </a>
            </li>
            <li>
              <a href="https://www.kaggle.com/learn" target="_blank">
                Kaggle: Machine Learning Courses
              </a>
            </li>
          </ul>
        </p>
      );
    },
  },
  {
    description: "Blockchain Technology",
    title: "Elad Elrom",
    src: "/images (2).jpg",
    ctaText: "Talk",
    ctaLink: "/dashboard/alakh",
    content: () => {
      return (
        <p>
          Elad Elrom is a blockchain-focused chatbot that simplifies concepts
          like decentralized ledgers, smart contracts, and consensus algorithms.
          It&apos;s perfect for developers and blockchain enthusiasts.
          <strong>Popular Resources Built On:</strong>
          <ul>
            <li>
              <a
                href="https://www.amazon.com/Mastering-Blockchain-Imran-Bashir/dp/1839213191"
                target="_blank"
              >
                &quot;Mastering Blockchain&quot; by Imran Bashir
              </a>
            </li>
            <li>
              <a
                href="https://www.coursera.org/specializations/blockchain"
                target="_blank"
              >
                Coursera: Blockchain Specialization
              </a>
            </li>
            <li>
              <a href="https://ethereum.org/en/developers/" target="_blank">
                Ethereum Developer Documentation
              </a>
            </li>
          </ul>
        </p>
      );
    },
  },
  {
    description: "Distributed Cloud Computing",
    title: "Ratan K. Ghosh",
    src: "/images (3).jpg",
    ctaText: "Talk",
    ctaLink: "/dashboard/ashok",
    content: () => {
      return (
        <p>
          Ratan K. Ghosh is a chatbot designed to demystify distributed cloud
          computing. It covers topics like distributed systems, cloud
          architecture, and scalability. <br /> <br />
          <strong>Popular Resources Built On:</strong>
          <ul>
            <li>
              <a
                href="https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321"
                target="_blank"
              >
                &quot;Designing Data-Intensive Applications&quot; by Martin
                Kleppmann
              </a>
            </li>
            <li>
              <a
                href="https://www.coursera.org/specializations/cloud-computing"
                target="_blank"
              >
                Coursera: Cloud Computing Specialization
              </a>
            </li>
            <li>
              <a href="https://aws.amazon.com/architecture/" target="_blank">
                AWS Architecture Center
              </a>
            </li>
          </ul>
        </p>
      );
    },
  },
];
