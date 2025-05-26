"use client";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import RichText from "./RichText";
import { JSONContent } from "@tiptap/core";

interface RichTextChapterProps {
  content: JSONContent;
  setContent: React.Dispatch<React.SetStateAction<JSONContent>>;
  onSendPrompt?: (prompt: string) => Promise<string>;
  isEditable?: boolean;
}

const RichTextChapter: React.ForwardRefRenderFunction<any, RichTextChapterProps> = (
  { content, setContent, onSendPrompt, isEditable },
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
        isEditable={isEditable}
      />
    </div>
  );
};

export default forwardRef(RichTextChapter);