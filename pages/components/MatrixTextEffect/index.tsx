import React, { useEffect, useRef } from "react";
import { chain, delay, spring, value } from "popmotion";

type CharType = "Glyph" | "Value";

interface ShuffleValue {
  type: CharType;
  value: string;
}

const glyphs =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨーラリルレロワヰヱヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";

/**
 *
 * @param {string} content
 * @param {string} output
 * @param {number} position
 * @return {ShuffleValue}
 */
const shuffle = (
  content: string[],
  output: ShuffleValue[],
  position: number
): ShuffleValue[] => {
  return content.map((value, index) => {
    if (index < position) {
      return { type: "Value", value };
    }
    if (position % 1 < 0.5) {
      const randVal = Math.floor(Math.random() * glyphs.length);
      return { type: "Glyph", value: glyphs[randVal] };
    }
    return { type: "Glyph", value: output[index].value };
  });
};

interface MatrixTextProps {
  text: string;
  start?: boolean;
  delay?: number;
  className?: string;
}

/**
 * @param {MatrixTextProps} {props}
 * @return {JSX.Element}
 */
export default function MatrixText({
  text,
  start = true,
  delay: startDelay = 0,
  className,
}: MatrixTextProps) {
  const output = useRef<ShuffleValue[]>([{ type: "Glyph", value: "" }]);
  const container = useRef();

  useEffect(() => {
    const __container: any = container.current;
    const content = text.split("");
    let animation: any;

    const renderOutput = () => {
      const charMap = output.current.map((item) => {
        const __span = document.createElement("span");
        __span.className = `matrix-text__${item.type}`;
        className && (__span.className += className);
        __span.innerText = item.value;
        __span.style.fontFamily =
          item.type == "Glyph" ? "Rampart One" : "Azeret Mono";
        return __span;
      });
      __container.replaceChildren(...charMap);
    };

    const springVal = value(0, (position) => {
      output.current = shuffle(content, output.current, position);
      renderOutput();
    });

    if (start && !animation) {
      animation = chain(
        delay(startDelay),
        spring({
          from: 0,
          to: content.length,
          stiffness: 8,
          damping: 5,
        })
      ).start(springVal);
    }

    return () => {
      animation && animation?.stop();
    };
  }, [start, startDelay, text]);
  return (
    <span className="matrix-text">
      <span ref={container}></span>
    </span>
  );
}
