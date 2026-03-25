import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';

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
            <EditorContent editor={editor} className="tiptap-editor" />
        </div>
    );
};

export default RichTextEditor;
