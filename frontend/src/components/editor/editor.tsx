import { forwardRef, useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Box from '@mui/material/Box';
import type { EditorProps } from './types';

const extensions = [
  StarterKit.configure({
    heading: false,
    bulletList: false,
    orderedList: false,
    codeBlock: false,
    blockquote: false,
  }),
];

export const Editor = forwardRef<HTMLDivElement, EditorProps>(
  ({ onUpdate, content, ...props }, ref) => {
    const editor = useEditor({
      extensions,
      onUpdate,
      // Only enable autofocus if content is not provided (create mode)
      autofocus: content ? false : 'start',
    });

    const contentSet = useRef(false); // Track if initial content has been set

    useEffect(() => {
      if (editor && content && !contentSet.current) {
        editor.commands.setContent(content);
        contentSet.current = true;
        editor.commands.focus('end'); // Explicitly set focus after setting initial content
      }
    }, [editor, content]);

    return (
      <Box ref={ref} {...props}>
        <EditorContent editor={editor} />
      </Box>
    );
  }
);
