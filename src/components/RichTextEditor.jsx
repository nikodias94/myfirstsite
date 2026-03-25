import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { 
    Bold, Italic, Underline as UnderlineIcon, 
    Link as LinkIcon, List, ListOrdered, Quote, 
    Heading1, Heading2, RemoveFormatting 
} from 'lucide-react';

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    return (
        <div className="tiptap-menu-bar">
            <div className="menu-group">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`menu-btn ${editor.isActive('bold') ? 'is-active' : ''}`}
                    title="მუქი (Ctrl+B)"
                >
                    <Bold size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`menu-btn ${editor.isActive('italic') ? 'is-active' : ''}`}
                    title="დახრილი (Ctrl+I)"
                >
                    <Italic size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`menu-btn ${editor.isActive('underline') ? 'is-active' : ''}`}
                    title="ხაზგასმული (Ctrl+U)"
                >
                    <UnderlineIcon size={16} />
                </button>
                <button
                    type="button"
                    onClick={setLink}
                    className={`menu-btn ${editor.isActive('link') ? 'is-active' : ''}`}
                    title="ბმული"
                >
                    <LinkIcon size={16} />
                </button>
            </div>

            <div className="menu-divider" />

            <div className="menu-group">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`menu-btn ${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}`}
                    title="სათაური 1"
                >
                    <Heading1 size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`menu-btn ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
                    title="სათაური 2"
                >
                    <Heading2 size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`menu-btn ${editor.isActive('blockquote') ? 'is-active' : ''}`}
                    title="ციტატა"
                >
                    <Quote size={16} />
                </button>
            </div>

            <div className="menu-divider" />

            <div className="menu-group">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`menu-btn ${editor.isActive('bulletList') ? 'is-active' : ''}`}
                    title="სია"
                >
                    <List size={16} />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`menu-btn ${editor.isActive('orderedList') ? 'is-active' : ''}`}
                    title="დანომრილი სია"
                >
                    <ListOrdered size={16} />
                </button>
            </div>

            <div className="menu-divider" />

            <div className="menu-group">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
                    className="menu-btn"
                    title="ფორმატირების გასუფთავება"
                >
                    <RemoveFormatting size={16} />
                </button>
            </div>
        </div>
    );
};

const RichTextEditor = ({ content, onChange }) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                // Disable extensions that we're adding separately to avoid duplicates
                link: false,
            }),
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    class: 'editor-link'
                }
            })
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    // Update editor content when external content prop changes (e.g., when editing a new item)
    React.useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    return (
        <div className="tiptap-wrapper">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="tiptap-editor" />
        </div>
    );
};

export default RichTextEditor;
