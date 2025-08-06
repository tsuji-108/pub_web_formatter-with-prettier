import "./reset.css";
import "water.css/out/dark.css";
import * as prettier from "prettier/standalone";
import * as parserMarkdown from "prettier/parser-markdown";

const inputTextarea = document.getElementById("input") as HTMLTextAreaElement;
const outputTextarea = document.getElementById("output") as HTMLTextAreaElement;
const copyButton = document.getElementById("copy") as HTMLButtonElement;
const copiedText = document.getElementById("copied") as HTMLSpanElement;
let timerId = -1;

/**
 * 英数字と日本語文字の間に、半角スペースを入れる関数
 * 実態は prettier.format を実行しているだけです。
 *
 * @param targetText - 対象の文字列
 * @returns - 半角スペースを入れた後の文字列
 */
const insertHalfWidthSpace = (targetText: string) => {
  if (targetText.length === 0) return "";
  return prettier.format(targetText, {
    parser: "markdown",
    plugins: [parserMarkdown],
  });
};

const run = () => {
  /**
   * 「整形後」に、半角スペースを入れた後のテキストを出力する
   */
  inputTextarea.addEventListener("keyup", () => {
    const inputText = inputTextarea.value.trim();
    outputTextarea.value = insertHalfWidthSpace(inputText);
  });

  /**
   * 「テキストをコピーする」ボタンを押下したときに、整形後テキストをクリップボードに書き込む
   */
  copyButton.addEventListener("click", () => {
    navigator.clipboard.writeText(outputTextarea.value);

    copiedText.style.opacity = "1";
    if (timerId > 0) {
      clearTimeout(timerId);
    }
    timerId = window.setTimeout(() => {
      copiedText.style.opacity = "0";
    }, 5 * 1000);
  });
};

run();
