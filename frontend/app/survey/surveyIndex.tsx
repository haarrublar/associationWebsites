import { useRef } from "react";
import questionsData from "./surveyQuestions.json"; // adjust path as needed
import { AudioPlayer } from "components/ui/readQuestions/readQuestion";
import ScrollProgressBar from "components/ui/scrollProgress/scrollProgress";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

export default function SurveyIndex() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollPrevious = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="mx-auto max-w-9/10 pt-60 overflow-hidden">
        <div
          ref={scrollRef}
          className="grid grid-flow-col auto-cols-[100%] overflow-x-hidden w-full snap-x snap-mandatory gap-0"
        >
          {questionsData.questions.map((q, idx) => (
            <div key={idx} className="w-full h-full bg-white snap-start py-6">
              <div className="mx-auto w-full">
                <div className="md:w-2/3 mx-auto">
                  <div className="flex items-center gap-4 md:mb-12 mb-6 flex-wrap">
                    <h2 className="text-3xl font-semibold break-words flex-1 min-w-[50%]">
                      {q.question}
                    </h2>
                    {q.audio && (
                      <div className="flex-shrink-0">
                        <AudioPlayer audio={q.audio} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-3 mb-4">
                    {q.options.map((option, index) => (
                      <span
                        key={index}
                        className="cursor-pointer px-4 py-2 rounded-md bg-gray-100 hover:bg-blue-300 transition-colors break-words"
                      >
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 py-4">
          <div className="max-w-9/10 mx-auto px-4">
            <div className="flex items-center gap-4">
              {/* Previous Button (Fixed Width) */}
              <button
                onClick={scrollPrevious}
                className="flex-shrink-0"
              >
                <FiArrowLeft size={50}/>
              </button>

              {/* Progress Bar (Takes remaining space) */}
              <div className="flex-grow">
                <ScrollProgressBar
                  containerRef={scrollRef}
                  questionsCount={questionsData.questions.length} // Pass the total questions count
                />
              </div>

              {/* Next Button (Fixed Width) */}
              <button
                onClick={scrollNext}
                className="flex-shrink-0"
              >
                <FiArrowRight size={50}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
