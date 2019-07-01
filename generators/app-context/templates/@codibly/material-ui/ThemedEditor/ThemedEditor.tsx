import { ClassNames } from '@emotion/core';
import withTheme, { WithTheme } from '@material-ui/core/styles/withTheme';
import { Editor, EditorProps } from 'draft-js';
import * as React from 'react';
import { FunctionComponent, RefObject } from 'react';
import { blockStyle, boldStyle } from './ThemedEditor.style';

export namespace ThemedEditor {
  export type Props = EditorProps &
    WithTheme & {
      editorRef: RefObject<Editor>;
    };
}

export const ThemedEditorPure: FunctionComponent<ThemedEditor.Props> = ({
  theme,
  editorRef,
  ...props
}) => (
  <ClassNames>
    {({ css }) => {
      const blocks: { [key: string]: string } = {
        unstyled: css(theme.typography.body1),
        paragraph: css({ ...theme.typography.body1, ...blockStyle }),
        'header-one': css({ ...theme.typography.h1, ...blockStyle }),
        'header-two': css({ ...theme.typography.h2, ...blockStyle }),
        'header-three': css({ ...theme.typography.h3, ...blockStyle }),
        'header-four': css({ ...theme.typography.h4, ...blockStyle }),
        'header-five': css({ ...theme.typography.h5, ...blockStyle }),
        'header-six': css({ ...theme.typography.h6, ...blockStyle })
      };
      return (
        <Editor
          ref={editorRef}
          blockStyleFn={(block) => {
            const type = block.getType();

            return blocks[type] || '';
          }}
          customStyleMap={{
            BOLD: boldStyle
          }}
          {...props}
        />
      );
    }}
  </ClassNames>
);

export const ThemedEditor = withTheme(ThemedEditorPure);
