import { useEffect, useState, FC, useCallback } from "react";
import { Typography } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import seedrandom from "seedrandom";
import { quotes } from "../../../data/quotes";

// Configuration constants
const PUNCTUATION_DELAYS: { [key: string]: number } = {
  ",": 3000,
  ".": 4000,
  "-": 2000,
  "—": 4000,
  default: 2000,
};

const SEGMENT_FADE_IN_DURATION_MS = 3000; // Each segment's fade-in time
const QUOTE_SUSTAIN_DURATION_MS = 10000; // How long the quote stays fully visible
const CONTAINER_FADE_OUT_DURATION_MS = 5000; // Duration for fade-out animation
const QUOTE_GAP_DURATION_MS = 6000; // Gap between quotes after fade-out

// Calculate the full cycle period from the constants.
const FULL_CYCLE_DURATION_MS =
  SEGMENT_FADE_IN_DURATION_MS +
  QUOTE_SUSTAIN_DURATION_MS +
  CONTAINER_FADE_OUT_DURATION_MS +
  QUOTE_GAP_DURATION_MS;

interface QuoteSegment {
  text: string;
  delay: number; // Additional delay (ms) due to punctuation
  cumulativeDelay: number; // When (ms) this segment should animate in
}

const RealTimeMasterPotionQuote: FC = () => {
  const [selectedQuote, setSelectedQuote] = useState<string>("");
  const [segments, setSegments] = useState<QuoteSegment[]>([]);
  const [showQuote, setShowQuote] = useState<boolean>(false);

  // Returns the delay based on punctuation.
  const getDelay = (punct: string): number =>
    PUNCTUATION_DELAYS[punct] ?? PUNCTUATION_DELAYS.default;

  // Parse the quote into segments.
  const parseQuote = useCallback(() => {
    const segs: Omit<QuoteSegment, "cumulativeDelay">[] = [];
    const punctuationChars = ",.\\-—";
    const regex = new RegExp(`([^${punctuationChars}]+)([,.\\-—])?`, "g");
    let match: RegExpExecArray | null;
    while ((match = regex.exec(selectedQuote)) !== null) {
      let textSegment = match[1].trim();
      const punct = match[2] || "";
      if (punct) textSegment += punct;
      const delay = punct ? getDelay(punct) : 0;
      if (textSegment) {
        segs.push({ text: textSegment, delay });
      }
    }
    return segs;
  }, [selectedQuote]);

  // Deterministically select a quote using FULL_CYCLE_DURATION_MS as seed basis.
  const updateQuote = useCallback(() => {
    const timeSeed = Math.floor(Date.now() / FULL_CYCLE_DURATION_MS);
    const rng = seedrandom(timeSeed.toString());
    const index = Math.floor(rng() * quotes.length);
    setSelectedQuote(quotes[index]);
  }, []);

  // When a new quote is set, parse it into segments and calculate cumulative delays.
  useEffect(() => {
    if (!selectedQuote) {
      setSegments([]);
      return;
    }
    const parsed = parseQuote();
    let cumulativeDelay = 0;
    const segs: QuoteSegment[] = parsed.map((segment) => {
      const segWithDelay = { ...segment, cumulativeDelay };
      cumulativeDelay += segment.delay;
      return segWithDelay;
    });
    setSegments(segs);
  }, [selectedQuote, parseQuote]);

  // Cycle function: update the quote, show it, then hide it after fade-in + sustain.
  const cycleQuote = useCallback(() => {
    updateQuote();
    setShowQuote(true);
    // Hide the quote after the in-phase (fade-in + sustain)
    setTimeout(() => {
      setShowQuote(false);
    }, SEGMENT_FADE_IN_DURATION_MS + QUOTE_SUSTAIN_DURATION_MS);
  }, [updateQuote]);

  // On mount, delay the first cycle until the next full period boundary.
  useEffect(() => {
    const now = Date.now();
    const delayUntilBoundary =
      FULL_CYCLE_DURATION_MS - (now % FULL_CYCLE_DURATION_MS);
    const initialTimer = setTimeout(() => {
      cycleQuote();
      // Continue cycling every FULL_CYCLE_DURATION_MS
      const interval = setInterval(cycleQuote, FULL_CYCLE_DURATION_MS);
      // Cleanup the interval when unmounting
      return () => clearInterval(interval);
    }, delayUntilBoundary);
    return () => clearTimeout(initialTimer);
  }, [cycleQuote]);

  return (
    <div style={{ position: "relative", width: "300px", minHeight: "150px" }}>
      <AnimatePresence>
        {showQuote && (
          <motion.div
            key={selectedQuote}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: CONTAINER_FADE_OUT_DURATION_MS / 1000 },
            }}
          >
            {segments.map((seg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: seg.cumulativeDelay / 1000,
                  duration: SEGMENT_FADE_IN_DURATION_MS / 1000,
                }}
              >
                <Typography
                  variant="h6"
                  color="textSecondary"
                  sx={{
                    fontWeight: 100,
                    textShadow: "1px 1px 2px black",
                    maxWidth: "300px",
                    letterSpacing: "0.1em",
                    textDecorationThickness: "2px",
                    textUnderlineOffset: "4px",
                    lineHeight: 1.8,
                  }}
                >
                  {seg.text}
                </Typography>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RealTimeMasterPotionQuote;
