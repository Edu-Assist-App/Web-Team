"use client";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import { EditorProvider, useCurrentEditor, EditorContent } from "@tiptap/react";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineCode,
  AiOutlineRedo,
  AiOutlineUndo,
} from "react-icons/ai";
import { BsListUl, BsListOl, BsCodeSlash } from "react-icons/bs";
import { TbSeparatorHorizontal } from "react-icons/tb";
import { MdOutlineSend } from "react-icons/md";
import Code from "@tiptap/extension-code";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlock from "@tiptap/extension-code-block";
import { Extension } from "@tiptap/core";
import "../../../TextEditor.css";

interface RichTextProps {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  onSendPrompt?: (prompt: string) => Promise<string>;
}

// Custom Iframe Extension to handle raw <iframe> tags
const Iframe = Extension.create({
  name: "iframe",

  addOptions() {
    return {
      allowFullscreen: true,
      frameborder: 0,
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      frameborder: {
        default: 0,
      },
      allowfullscreen: {
        default: true,
      },
      width: {
        default: "560",
      },
      height: {
        default: "315",
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "iframe",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "iframe",
      {
        ...this.options.HTMLAttributes,
        ...HTMLAttributes,
        frameborder: this.options.frameborder,
        allowfullscreen: this.options.allowFullscreen,
      },
    ];
  },

  addNodeView() {
    return ({ node, HTMLAttributes }) => {
      const dom = document.createElement("div");
      dom.style.display = "block";
      dom.style.margin = "0 auto";
      dom.style.textAlign = "center";
      dom.style.width = "100%";

      const iframe = document.createElement("iframe");
      iframe.setAttribute("src", HTMLAttributes.src || "");
      iframe.setAttribute("frameborder", HTMLAttributes.frameborder || "0");
      iframe.setAttribute(
        "allowfullscreen",
        HTMLAttributes.allowfullscreen || "true"
      );

      iframe.style.width = "100%";
      iframe.style.maxWidth = "100%";

      const widthNum = parseInt(HTMLAttributes.width, 10);
      const heightNum = parseInt(HTMLAttributes.height, 10);
      if (!isNaN(widthNum) && !isNaN(heightNum) && heightNum > 0) {
        iframe.style.aspectRatio = `${widthNum} / ${heightNum}`;
      } else {
        iframe.style.aspectRatio = "16/9";
      }
      iframe.style.height = "auto";

      iframe.style.pointerEvents = "auto";

      dom.appendChild(iframe);
      return {
        dom,
      };
    };
  },
});

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const [headingLevel, setHeadingLevel] = React.useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!editor) return null;

  const HeadingDropdown = () => {
    const currentHeading = headingLevel ? `H${headingLevel}` : "Text";
    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button
          type="button"
          className="inline-flex justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 min-w-[80px] w-full sm:w-auto sm:max-w-[96px]"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {currentHeading}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
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
                className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                  currentHeading === "Text"
                    ? "text-purple-500"
                    : "text-gray-700"
                }`}
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
                  className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
                    currentHeading === `H${level}`
                      ? "text-purple-500"
                      : "text-gray-700"
                  }`}
                  onClick={() => {
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 })
                      .run();
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
    <div className="flex flex-wrap items-center gap-1 sm:gap-2 p-1 sm:p-2 bg-gray-100 rounded-md shadow-md sticky top-0 z-10">
      <HeadingDropdown />
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor?.can().chain().focus().toggleBold().run()}
        className={`px-2 py-1 rounded-md text-sm font-medium ${
          editor.isActive("bold")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200 text-gray-700"
        } disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0`}
        title="Bold"
      >
        <AiOutlineBold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor?.can().chain().focus().toggleItalic().run()}
        className={`px-2 py-1 rounded-md text-sm font-medium ${
          editor.isActive("italic")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200 text-gray-700"
        } disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0`}
        title="Italic"
      >
        <AiOutlineItalic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor?.can().chain().focus().toggleCode().run()}
        className={`px-2 py-1 rounded-md text-sm font-medium ${
          editor.isActive("code")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200 text-gray-700"
        } disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0`}
        title="Code"
      >
        <AiOutlineCode />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        disabled={!editor?.can().chain().focus().toggleCodeBlock().run()}
        className={`px-2 py-1 rounded-md text-sm font-medium ${
          editor.isActive("codeBlock")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200 text-gray-700"
        } disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0`}
        title="Code Block"
      >
        <BsCodeSlash />
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className="px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-200 text-gray-700 flex-shrink-0"
        title="Clear marks"
      >
        Clear marks
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className="px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-200 text-gray-700 flex-shrink-0"
        title="Clear nodes"
      >
        Clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-2 py-1 rounded-md text-sm font-medium ${
          editor.isActive("bulletList")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200 text-gray-700"
        } flex-shrink-0`}
        title="Bullet list"
      >
        <BsListUl />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-2 py-1 rounded-md text-sm font-medium ${
          editor.isActive("orderedList")
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200 text-gray-700"
        } flex-shrink-0`}
        title="Ordered list"
      >
        <BsListOl />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`px-2 py-1 rounded-md text-sm font-medium ${
          editor.isActive({ textAlign: "left" })
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200 text-gray-700"
        } flex-shrink-0`}
        title="Align Left"
      >
        Left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`px-2 py-1 rounded-md text-sm font-medium ${
          editor.isActive({ textAlign: "center" })
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200 text-gray-700"
        } flex-shrink-0`}
        title="Align Center"
      >
        Center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`px-2 py-1 rounded-md text-sm font-medium ${
          editor.isActive({ textAlign: "right" })
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200 text-gray-700"
        } flex-shrink-0`}
        title="Align Right"
      >
        Right
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={`px-2 py-1 rounded-md text-sm font-medium ${
          editor.isActive({ textAlign: "justify" })
            ? "bg-blue-500 text-white"
            : "bg-white hover:bg-gray-200 text-gray-700"
        } flex-shrink-0`}
        title="Justify"
      >
        Justify
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-200 text-gray-700 flex-shrink-0"
        title="Horizontal rule"
      >
        <TbSeparatorHorizontal />
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className="px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-200 text-gray-700 flex-shrink-0"
        title="Hard break"
      >
        Hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor?.can().chain().focus().undo().run()}
        className="px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        title="Undo"
      >
        <AiOutlineUndo />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor?.can().chain().focus().redo().run()}
        className="px-3 py-2 rounded-md text-sm font-medium bg-white hover:bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        title="Redo"
      >
        <AiOutlineRedo />
      </button>
    </div>
  );
};

const extensions = [
  Iframe,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: false,
    orderedList: false,
    codeBlock: false,
    code: false,
    listItem: false,
  }),
  Code.configure({
    HTMLAttributes: { class: "rounded-md bg-gray-800 text-white py-1 px-2" },
  }),
  CodeBlock.configure({
    HTMLAttributes: {
      class: "rounded-md bg-gray-100 py-1 px-2 overflow-x-auto",
    },
  }),
  ListItem,
  BulletList,
  OrderedList,
  Youtube.configure({
    controls: false,
    nocookie: true,
    inline: false,
    HTMLAttributes: {
      class: "youtube-iframe",
    },
  }),
  Iframe, // Add the custom Iframe extension
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
];

const CustomBubbleMenu = ({ editor, onSendPrompt }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [prompt, setPrompt] = useState("");
  const menuRef = useRef(null);
  const [showAbove, setShowAbove] = useState(true);

  useEffect(() => {
    const updateMenu = () => {
      if (!editor) return;

      if (editor.state.selection.empty) {
        setVisible(false);
        return;
      }

      setVisible(true);

      // Get position from selection
      const { from, to } = editor.state.selection;
      const domFrom = editor.view.domAtPos(from);
      const domTo = editor.view.domAtPos(to);
      const nodeFrom = domFrom.node;
      const nodeTo = domTo.node;

      if (nodeFrom && nodeTo) {
        try {
          const range = document.createRange();
          const startNode =
            nodeFrom.nodeType === Node.TEXT_NODE
              ? nodeFrom
              : nodeFrom.childNodes[0];
          const endNode =
            nodeTo.nodeType === Node.TEXT_NODE ? nodeTo : nodeTo.childNodes[0];

          if (startNode && endNode) {
            range.setStart(startNode, domFrom.offset);
            range.setEnd(endNode, domTo.offset);
            const rect = range.getBoundingClientRect();

            const editorRect = editor.view.dom.getBoundingClientRect();
            const menuHeight = menuRef.current
              ? menuRef.current.offsetHeight
              : 50;

            // Check if there's enough space above the selection
            const spaceAbove = rect.top - editorRect.top;
            const shouldShowAbove = spaceAbove > menuHeight + 20;

            setShowAbove(shouldShowAbove);

            if (shouldShowAbove) {
              // Position above the selected text
              setPosition({
                top: rect.top - editorRect.top - (menuHeight + 10),
                left: rect.left + rect.width / 2 - editorRect.left,
              });
            } else {
              // Position below the selected text
              setPosition({
                top: rect.bottom - editorRect.top + 10,
                left: rect.left + rect.width / 2 - editorRect.left,
              });
            }
          }
        } catch (error) {
          console.error("Error calculating position:", error);
        }
      }
    };

    if (editor) {
      editor.on("selectionUpdate", updateMenu);
    }

    return () => {
      if (editor) {
        editor.off("selectionUpdate", updateMenu);
      }
    };
  }, [editor]);

  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      e.target !== editor.view.dom &&
      !editor.view.dom.contains(e.target)
    ) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSendPrompt = async () => {
    if (!prompt.trim() || !onSendPrompt) return;

    try {
      const { from, to } = editor.state.selection;
      const selectedText = editor.state.doc.textBetween(from, to, " ");

      const promptWithContext = `Context: "${selectedText}". ${prompt}`;
      const response = await onSendPrompt(promptWithContext);
      setPrompt("");

      // Insert the AI response at the current cursor position
      editor.chain().focus().insertContent(response).run();

      // Hide the menu after sending
      setVisible(false);
    } catch (error) {
      console.error("Error sending prompt:", error);
    }
  };

  if (!visible || !editor) return null;

  return (
    <div
      ref={menuRef}
      className="absolute bg-white p-2 rounded shadow-md flex gap-2 border z-50"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translateX(-50%)",
      }}
    >
      <div
        className={`absolute w-3 h-3 bg-white transform rotate-45 ${
          showAbove ? "bottom-[-6px]" : "top-[-6px]"
        } left-1/2 ml-[-6px] border ${
          showAbove ? "border-b border-r" : "border-t border-l"
        } border-gray-200`}
      />
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask AI about selection..."
        className="border rounded p-1 text-sm w-48 focus:outline-none"
        onKeyPress={(e) => e.key === "Enter" && handleSendPrompt()}
      />
      <button
        onClick={handleSendPrompt}
        className="bg-[#3900b3] text-white p-1 px-2 rounded text-sm hover:bg-[#2d0090]"
      >
        <MdOutlineSend size={18} />
      </button>
    </div>
  );
};

const RichText: React.ForwardRefRenderFunction<any, RichTextProps> = (
  { content, setContent, onSendPrompt },
  ref
) => {
  const editorRef = useRef<any>(null);
  const [editor, setEditor] = useState(null);

  useImperativeHandle(ref, () => ({
    get editor() {
      return editor;
    },
  }));

  return (
    <div className="rounded-md shadow-md p-2 sm:p-4 bg-white relative">
      <EditorProvider
        slotBefore={<MenuBar />}
        extensions={extensions}
        content={content}
        onUpdate={({ editor }) => setContent(editor.getHTML())}
        onTransaction={({ editor }) => setEditor(editor)}
        onCreate={({ editor }) => setEditor(editor)}
      >
        <div className="tiptap prose max-w-none prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none">
          <EditorContent editor={editor} ref={editorRef} />
        </div>
      </EditorProvider>

      {editor && onSendPrompt && (
        <CustomBubbleMenu editor={editor} onSendPrompt={onSendPrompt} />
      )}
    </div>
  );
};

export default forwardRef(RichText);
