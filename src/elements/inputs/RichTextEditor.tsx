import { Link, RichTextEditor as MantineRichTextEditor } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import SubScript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export interface RichTextEditorProps {
  onContentChange?: (content: string) => void;
  initialContent?: string;
  ref?: any;
  mah?: number | string;
  minimalist?: boolean;
  version?: number; // change this to refresh the editor
}

export function RichTextEditor({
  initialContent,
  onContentChange,
  ref,
  mah,
  minimalist = false,
  version,
}: RichTextEditorProps) {
  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Placeholder.configure({ placeholder: 'Type here' }),
        Underline,
        Link,
        Highlight,
        Superscript,
        SubScript,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ],
      content: initialContent,
      onUpdate(v) {
        onContentChange?.(v.editor.getHTML());
      },
    },
    [version],
  );

  return (
    <MantineRichTextEditor editor={editor} ref={ref}>
      <MantineRichTextEditor.Toolbar sticky stickyOffset={60}>
        <MantineRichTextEditor.ControlsGroup>
          <MantineRichTextEditor.Bold />
          <MantineRichTextEditor.Italic />
          <MantineRichTextEditor.Underline />
          {!minimalist && (
            <>
              <MantineRichTextEditor.ClearFormatting />
              <MantineRichTextEditor.Highlight />
            </>
          )}
        </MantineRichTextEditor.ControlsGroup>

        <MantineRichTextEditor.ControlsGroup>
          <MantineRichTextEditor.H1 />
          {!minimalist && (
            <>
              <MantineRichTextEditor.H2 />
              <MantineRichTextEditor.H3 />
            </>
          )}
          <MantineRichTextEditor.BulletList />
          <MantineRichTextEditor.OrderedList />
          <MantineRichTextEditor.Superscript />
          {!minimalist && (
            <>
              <MantineRichTextEditor.Subscript />
            </>
          )}
        </MantineRichTextEditor.ControlsGroup>

        <MantineRichTextEditor.ControlsGroup>
          <MantineRichTextEditor.AlignLeft />
          <MantineRichTextEditor.AlignCenter />
          {!minimalist && (
            <>
              <MantineRichTextEditor.AlignRight />
              <MantineRichTextEditor.AlignJustify />
            </>
          )}
        </MantineRichTextEditor.ControlsGroup>

        {!minimalist && (
          <MantineRichTextEditor.ControlsGroup>
            <MantineRichTextEditor.Undo />
            <MantineRichTextEditor.Redo />
          </MantineRichTextEditor.ControlsGroup>
        )}
      </MantineRichTextEditor.Toolbar>

      <MantineRichTextEditor.Content mah={mah} style={{ overflow: 'scroll' }} />
    </MantineRichTextEditor>
  );
}
