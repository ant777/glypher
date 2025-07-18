import { useEffect } from "react";
import { containsChinese } from "./tools";

export function PracticePreview({text}) {
  // useEffect(() => {
  //   if(containsChinese(text)) {
  //     window.hanzi.innerHTML = '';
  //     text.split('')
  //     .forEach((char) => {

  //     const writer = HanziWriter.create('hanzi', char, {
  //       width: 100,
  //       height: 100,
  //       padding: 5,
  // // strokeAnimationSpeed: 3, // 5x normal speed
  // // delayBetweenStrokes: 10, // milliseconds
  // radicalColor: '#337ab7' // blue
  //     });
  //       // writer.animateCharacter();
  //     })
  //   }
  // }, [text])
    return <div className={`preview${containsChinese(text) ? ' bigger' : ''}${text.length > 5 ? ' smaller' : ''}`}><div id="hanzi">{text}</div></div>;
}