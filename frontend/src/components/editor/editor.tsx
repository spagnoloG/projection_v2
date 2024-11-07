import { forwardRef, useEffect } from 'react';
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

export const Editor = forwardRef<HTMLDivElement, EditorProps>(({ onUpdate, content, ...props }, ref) => {
  const editor = useEditor({
    extensions,
    content,
    onUpdate,
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return (
    <Box ref={ref} {...props}>
      <EditorContent editor={editor} />
    </Box>
  );
});
