import { Editor as TiptapEditor } from '@tiptap/react';

export type EditorProps = {
  onUpdate?: ({ editor }: { editor: TiptapEditor }) => void;
  content?: string;
};
