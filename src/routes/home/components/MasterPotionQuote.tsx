import React, { useEffect, useState, FC, useCallback } from "react";
import { Typography } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import seedrandom from "seedrandom";
import { quotes } from "../../../data/quotes";

// Configuration constants
const PUNCTUATION_DELAYS: { [key: string]: number } = {
  ",": 5000,
  ".": 8000,
  "-": 3000,
  "—": 5000,
  default: 4000,
};

const SEGMENT_FADE_IN_DURATION_MS = 3000; // Duration for each segment fade-in (ms)
const QUOTE_SUSTAIN_DURATION_MS = 10000; // How long the quote stays visible after fade-in (ms)
const CONTAINER_FADE_OUT_DURATION_MS = 5000; // Duration for the container fade-out (ms)
const QUOTE_GAP_DURATION_MS = 6000; // Gap between quotes after exit animation (ms)

interface QuoteSegment {
  text: string;
  delay: number; // Delay (ms) to wait after this segment before the next
  cumulativeDelay: number; // When (ms) this segment should animate in
}

const RealTimeMasterPotionQuote: FC = () => {
  const [selectedQuote, setSelectedQuote] = useState<string>("");
  const [segments, setSegments] = useState<QuoteSegment[]>([]);
  const [showQuote, setShowQuote] = useState<boolean>(true);

  // Returns the delay in milliseconds based on punctuation.
  const getDelay = (punct: string): number =>
    PUNCTUATION_DELAYS[punct] ?? PUNCTUATION_DELAYS.default;

  const parseQuote = useCallback(() => {
    const segments: Omit<QuoteSegment, "cumulativeDelay">[] = [];
    // Regex splits on comma, period, dash, or em dash.
    const punctuationChars = ",.\\-—";
    const regex = new RegExp(`([^${punctuationChars}]+)([,.\\-—])?`, "g");
    let match: RegExpExecArray | null;

    while ((match = regex.exec(selectedQuote)) !== null) {
      let textSegment = match[1].trim();
      const punct = match[2] || "";
      if (punct) {
        textSegment += punct;
      }
      const delay = punct ? getDelay(punct) : 0;
      if (textSegment) {
        segments.push({ text: textSegment, delay });
      }
    }
    return segments;
  }, [selectedQuote]);

  // Update the quote (using seedrandom for determinism).
  const updateQuote = useCallback(() => {
    const timeSeed = Math.floor(Date.now() / 21000);
    const rng = seedrandom(timeSeed.toString());
    const index = Math.floor(rng() * quotes.length);
    setSelectedQuote(quotes[index]);
  }, []);

  // Set the initial quote on mount.
  useEffect(() => {
    updateQuote();
  }, [updateQuote]);

  // Parse the selected quote into segments with cumulative delays.
  useEffect(() => {
    if (!selectedQuote) {
      setSegments([]);
      return;
    }
    const parsedSegments = parseQuote();
    let cumulativeDelay = 0;
    const segmentsWithCumulative: QuoteSegment[] = parsedSegments.map(
      (segment) => {
        const segWithDelay = { ...segment, cumulativeDelay };
        cumulativeDelay += segment.delay;
        return segWithDelay;
      }
    );
    setSegments(segmentsWithCumulative);
  }, [parseQuote, selectedQuote]);

  // Once the quote is fully in, schedule hiding it.
  useEffect(() => {
    if (!selectedQuote || segments.length === 0) return;
    // The last segment fades in after its cumulative delay plus the fade-in duration.
    const lastSegment = segments[segments.length - 1];
    const totalInTime =
      lastSegment.cumulativeDelay +
      SEGMENT_FADE_IN_DURATION_MS +
      QUOTE_SUSTAIN_DURATION_MS;
    const timer = setTimeout(() => {
      setShowQuote(false);
    }, totalInTime);
    return () => clearTimeout(timer);
  }, [segments, selectedQuote]);

  // When the quote is hidden, wait for the exit animation and a gap, then update.
  useEffect(() => {
    if (!showQuote && selectedQuote) {
      const timer = setTimeout(() => {
        updateQuote();
        setShowQuote(true);
      }, CONTAINER_FADE_OUT_DURATION_MS + QUOTE_GAP_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [showQuote, selectedQuote, updateQuote]);

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
