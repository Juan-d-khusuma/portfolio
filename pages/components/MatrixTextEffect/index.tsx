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
}

/**
 * @param {MatrixTextProps} {props}
 * @return {JSX.Element}
 */
export default function MatrixText({
  text,
  start = true,
  delay: startDelay = 0,
}: MatrixTextProps) {
  const output = useRef<ShuffleValue[]>([{ type: "Glyph", value: "" }]);
  const container = useRef();

  useEffect(() => {
    const __container: Element = container.current;
    const content = text.split("");
    let animation: any;

    const renderOutput = () => {
      const charMap = output.current.map(
        (item) => `<span class="matrix-text__${item.type}">${item.value}</span>`
      );
      __container.innerHTML = charMap.join("");
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
    <span>
      <span ref={container}></span>
    </span>
  );
}
