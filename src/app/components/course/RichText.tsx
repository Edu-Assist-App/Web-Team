"use client";
import React from "react";
import { EditorProvider, useCurrentEditor, EditorContent } from '@tiptap/react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineStrikethrough,
  AiOutlineCode,
  AiOutlineRedo,
  AiOutlineUndo,
} from 'react-icons/ai'
import { BsListUl, BsListOl, BsCodeSlash } from 'react-icons/bs'
import { TbSeparatorHorizontal } from 'react-icons/tb'
import Code from '@tiptap/extension-code'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Youtube from '@tiptap/extension-youtube'
import TextAlign from '@tiptap/extension-text-align'
import CodeBlock from '@tiptap/extension-code-block'
import { useState, useRef, useEffect } from 'react'
import '@/app/TextEditor.css'
import Head from "next/head";

interface Topic {
  title: string;
  content?: string;
  bulletPoints?: string[];
}

interface ExampleCode {
  language: string;
  code: string;
}

interface RichTextChapterProps {
  title: string;
  description: string;
  estimatedTime: string;
  topics: Topic[];
  exampleCode: ExampleCode;
}

const RichTextChapter: React.FC<RichTextChapterProps> = ({
  title,
  description,
  estimatedTime,
  topics,
  exampleCode,
}) => {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h1>

        <p className="text-lg text-gray-600 mb-6">{description}</p>

        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <p className="text-blue-800 font-medium">
            Estimated Time to Complete - {estimatedTime}
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Topics Covered
        </h2>

        <ul className="list-disc pl-6 mb-8 space-y-2">
          {topics.map((topic, index) => (
            <li key={index} className="text-gray-700">
              {topic.title}
            </li>
          ))}
        </ul>

        <hr className="my-8 border-gray-200" />

        {topics.map((topic, index) => (
          <section key={index} className="mb-10">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
              {index + 1}. {topic.title}
            </h3>

            {topic.content && (
              <p className="text-gray-700 mb-4">{topic.content}</p>
            )}

            {topic.bulletPoints && topic.bulletPoints.length > 0 && (
              <ul className="list-disc pl-6 space-y-2 mb-4">
                {topic.bulletPoints.map((point, i) => (
                  <li key={i} className="text-gray-700">
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}

        {exampleCode && (
          <div className="bg-gray-800 rounded-lg p-4 overflow-x-auto mb-8">
            <pre className="text-sm sm:text-base text-gray-100">
              <code>{exampleCode.code}</code>
            </pre>
          </div>
        )}
      </article>
    </div>
  );
};

const MenuBar = () => {
  const { editor } = useCurrentEditor()
  const [headingLevel, setHeadingLevel] = useState<number | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  if (!editor) {
    return null
  }

  const HeadingDropdown = () => {
    const currentHeading = headingLevel ? `H${headingLevel}` : 'Text'

    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div>
          <button
            type="button"
            className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-24"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {currentHeading}
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {dropdownOpen && (
          <div
            className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              <a
                href="#"
                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                  currentHeading === 'Text' ? 'text-purple-500' : 'text-gray-700'
                }`}
                role="menuitem"
                tabIndex={-1}
                id="menu-item-paragraph"
                onClick={() => {
                  editor.chain().focus().setParagraph().run()
                  setHeadingLevel(null)
                  setDropdownOpen(false)
                }}
              >
                Text
              </a>
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <a
                  key={level}
                  href="#"
                  className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                    currentHeading === `H${level}` ? 'text-purple-500' : 'text-gray-700'
                  }`}
                  role="menuitem"
                  tabIndex={-1}
                  id={`menu-item-${level}`}
                  onClick={() => {
                    editor.chain().focus().toggleHeading({ level }).run()
                    setHeadingLevel(level)
                    setDropdownOpen(false)
                  }}
                >
                  H{level}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className=" flex flex-wrap gap-2 p-2 bg-gray-100 rounded-md shadow-md sticky top-0 z-10">
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
    </div>
  )
}

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
      class: 'rounded-md bg-gray-800  text-white py-1 px-2'
    }
  }),
  CodeBlock.configure({
    HTMLAttributes: {
      class: 'rounded-md bg-gray-100  py-1 px-2 overflow-x-auto'
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
]

const TipTap: React.FC<TipTapProps> = ({ initialContent }) => {
  return (
    <div className="rounded-md shadow-md p-4 bg-white">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={initialContent}
      >
        <EditorContent editor={useCurrentEditor()?.editor} className='tiptap' />
      </EditorProvider>
    </div>
  );
};

export default TipTap;
