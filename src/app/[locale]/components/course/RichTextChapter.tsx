"use client";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import RichText from "./RichText";

interface RichTextChapterProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onSendPrompt?: (prompt: string) => Promise<string>;
}

const RichTextChapter: React.ForwardRefRenderFunction<any, RichTextChapterProps> = (
  { content, setContent, onSendPrompt },
  ref
) => {
  const richTextRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    get editor() {
      return richTextRef.current?.editor;
    },
  }));

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <RichText
        ref={richTextRef}
        content={content}
        setContent={setContent}
        onSendPrompt={onSendPrompt}
      />
    </div>
  );
};

export default forwardRef(RichTextChapter);