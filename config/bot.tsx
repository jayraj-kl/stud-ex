import { getBotData } from "@/lib/bot";

export const initialCards = [
  {
    description: "Theory of Computation",
    title: "Preeti",
    src: "/unnamed.jpg",
    ctaText: "Talk",
    ctaLink: "/dashboard/preeti",
    content: () => {
      return (
        <p>
          Preeti is a specialized chatbot designed to assist students and
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
    title: "Rabindra",
    src: "/Gemini_Generated_Image_vrjt5tvrjt5tvrjt.jpg",
    ctaText: "Talk",
    ctaLink: "/dashboard/rabindra",
    content: () => {
      return (
        <p>
          Rabindra is a cutting-edge chatbot tailored for machine learning
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
    title: "Alakh",
    src: "/Gemini_Generated_Image_yue9psyue9psyue9.jpg",
    ctaText: "Talk",
    ctaLink: "/dashboard/alakh",
    content: () => {
      return (
        <p>
          Alakh Pandey is a blockchain-focused chatbot that simplifies concepts
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
    title: "Ashok",
    src: "/Gemini_Generated_Image_jkc492jkc492jkc4.jpg",
    ctaText: "Talk",
    ctaLink: "/dashboard/ashok",
    content: () => {
      return (
        <p>
          Ashok is a chatbot designed to demystify distributed cloud computing.
          It covers topics like distributed systems, cloud architecture, and
          scalability. <br /> <br />
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

const getCards = async () => {
  const cards = [...initialCards];
  try {
    const botData = await getBotData();
    if (botData !== null && botData.length > 0) {
      console.log("Bot data fetched successfully");
      cards.push({
        title: botData[0].name,
        description: botData[0].subject,
        src: botData[0].imagePath || "/default-image.jpg",
        ctaText: "Talk",
        ctaLink: `/dashboard/${botData[0].name}`,
        content: () => <p>Dynamic bot content</p>,
      });
    }
    return cards;
  } catch (error) {
    console.error("Error fetching bot data:", error);
    return cards;
  }
};
