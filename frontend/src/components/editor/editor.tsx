import { forwardRef } from 'react';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
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

const content = `
<p>
    Vnesi
</p>
`;

export const Editor = forwardRef<HTMLDivElement, EditorProps>(({ onUpdate, ...props }, ref) => (
  <Box
    ref={ref}
    component={EditorProvider}
    extensions={extensions}
    content={content}
    onUpdate={onUpdate} // Pass the onUpdate prop here
    {...props}
  />
));
