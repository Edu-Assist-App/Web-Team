"use client";
import React, { useState, useRef, useEffect } from "react";
import { EditorProvider, useCurrentEditor, EditorContent } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import StarterKit from '@tiptap/starter-kit';
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineStrikethrough,
  AiOutlineCode,
  AiOutlineRedo,
  AiOutlineUndo,
  AiOutlineSave,
} from 'react-icons/ai';
import { BsListUl, BsListOl, BsCodeSlash } from 'react-icons/bs';
import { TbSeparatorHorizontal } from 'react-icons/tb';
import Code from '@tiptap/extension-code';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Youtube from '@tiptap/extension-youtube';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlock from '@tiptap/extension-code-block';
import '@/app/TextEditor.css';

interface TipTapProps {
  initialContent: any; // JSON content
}

const MenuBar = ({ onSave }: { onSave: () => void }) => {
  const { editor } = useCurrentEditor();
  const [headingLevel, setHeadingLevel] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!editor) return null;

  const HeadingDropdown = () => {
    const currentHeading = headingLevel ? `H${headingLevel}` : 'Text';
    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          type="button"
          className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-24"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {currentHeading}
          <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <a
                href="#"
                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${currentHeading === 'Text' ? 'text-purple-500' : 'text-gray-700'}`}
                onClick={() => {
                  editor.chain().focus().setParagraph().run();
                  setHeadingLevel(null);
                  setDropdownOpen(false);
                }}
              >
                Text
              </a>
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <a
                  key={level}
                  href="#"
                  className={`block px-4 py-2 text-sm hover:bg-gray-100 ${currentHeading === `H${level}` ? 'text-purple-500' : 'text-gray-700'}`}
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level }).run();
                    setHeadingLevel(level);
                    setDropdownOpen(false);
                  }}
                >
                  H{level}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-gray-100 rounded-md shadow-md sticky top-0 z-10">
      <HeadingDropdown />
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor?.can().chain().focus().toggleBold().run()}
        className={`
          px-2 py-1 rounded-md text-sm font-medium
          ${editor.isActive('bold') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-700'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        title="Bold"
      >
        <AiOutlineBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor?.can().chain().focus().toggleItalic().run()}
        className={`
          px-2 py-1 rounded-md text-sm font-medium
          ${editor.isActive('italic') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-700'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        title="Italic"
      >
        <AiOutlineItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor?.can().chain().focus().toggleStrike().run()}
        className={`
          px-2 py-1 rounded-md text-sm font-medium
          ${editor.isActive('strike') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-700'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        title="Strike"
      >
        <AiOutlineStrikethrough />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor?.can().chain().focus().toggleCode().run()}
        className={`
          px-2 py-1 rounded-md text-sm font-medium
          ${editor.isActive('code') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-700'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        title="Code"
      >
        <AiOutlineCode />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
        className={`
          px-2 py-1 rounded-md text-sm font-medium
          ${editor.isActive('codeBlock') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-700'}
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        title="Code Block"
      >
        <BsCodeSlash />
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-200 text-gray-700"
        title="Clear marks"
      >
        Clear marks
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className="px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-200 text-gray-700"
        title="Clear nodes"
      >
        Clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`
          px-2 py-1 rounded-md text-sm font-medium
          ${editor.isActive('bulletList') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-700'}
        `}
        title="Bullet list"
      >
        <BsListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`
          px-2 py-1 rounded-md text-sm font-medium
          ${editor.isActive('orderedList') ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-700'}
        `}
        title="Ordered list"
      >
        <BsListOl />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`
          px-2 py-1 rounded-md text-sm font-medium
          ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-700'}
        `}
        title="Align Left"
      >
        Left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`
          px-2 py-1 rounded-md text-sm font-medium
          ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-700'}
        `}
        title="Align Center"
      >
        Center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`
          px-2 py-1 rounded-md text-sm font-medium
          ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-700'}
        `}
        title="Align Right"
      >
        Right
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`
          px-2 py-1 rounded-md text-sm font-medium
          ${editor.isActive({ textAlign: 'justify' }) ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200 text-gray-700'}
        `}
        title="Justify"
      >
        Justify
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-200 text-gray-700"
        title="Horizontal rule"
      >
        <TbSeparatorHorizontal />
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-200 text-gray-700"
        title="Hard break"
      >
        Hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor?.can().chain().focus().undo().run()}
        className="px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Undo"
      >
        <AiOutlineUndo />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor?.can().chain().focus().redo().run()}
        className="px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Redo"
      >
        <AiOutlineRedo />
      </button>
      <button
        onClick={onSave}
        className="px-2 py-1 rounded-md text-sm font-medium bg-white hover:bg-gray-200 text-gray-700"
        title="Save content"
      >
        <AiOutlineSave />
      </button>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: false,
    orderedList: false,
    codeBlock: true,
  }),
  Code.configure({
    HTMLAttributes: {
      class: 'rounded-md bg-gray-800 text-white py-1 px-2'
    }
  }),
  CodeBlock.configure({
    HTMLAttributes: {
      class: 'rounded-md bg-gray-100 py-1 px-2 overflow-x-auto'
    },
  }),
  ListItem,
  BulletList,
  OrderedList,
  Youtube.configure({
    controls: false,
    nocookie: true,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
];

const TipTap: React.FC<TipTapProps> = ({ initialContent }) => {
  const [editorContent, setEditorContent] = useState(initialContent);

  // Handle editor updates
  const handleUpdate = ({ editor }: { editor: any }) => {
    const json = editor.getJSON();
    setEditorContent(json);
  };

  // Log content to console
  const handleSave = () => {
    console.log('Saved Editor Content:', JSON.stringify(editorContent, null, 2));
  };

  return (
    <div className="rounded-md shadow-md p-4 bg-white">
      <EditorProvider
        slotBefore={<MenuBar onSave={handleSave} />}
        extensions={extensions}
        content={editorContent}
        onUpdate={handleUpdate}
      >
        <EditorContent editor={useCurrentEditor()?.editor} className="tiptap" />
      </EditorProvider>
    </div>
  );
};

export default TipTap;