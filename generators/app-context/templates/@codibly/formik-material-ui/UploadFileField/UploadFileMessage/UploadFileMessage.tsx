import Link from '@material-ui/core/Link';
import * as React from 'react';
import { FunctionComponent, useCallback } from 'react';
import { MouseEvent, ReactNode } from 'react';
import { IgnorePointerEventsMessageContent, MessageContent } from './UploadFileMessage.style';

export namespace UploadFileMessage {
  export type Props = {
    files: File[] | null;
    onClear: () => void;
    isDragActive: boolean;
    dragInactiveMessage?: ReactNode;
    dragActiveMessage?: ReactNode;
  };
}

export const UploadFileMessage: FunctionComponent<UploadFileMessage.Props> = ({
  isDragActive,
  files,
  onClear,
  dragInactiveMessage,
  dragActiveMessage
}) => {
  const onClearButtonClick = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onClear();
    },
    [onClear]
  );

  if (files && files.length) {
    const clearButton = (
      <Link component="button" onClick={onClearButtonClick}>
        Clear selection
      </Link>
    );

    if (files.length === 1) {
      return (
        <MessageContent>
          You have selected {files.map((acceptedFile) => acceptedFile.name).join(', ')} file.
          <br />
          {clearButton}
        </MessageContent>
      );
    } else {
      return (
        <MessageContent>
          You have selected {files.length} files:{' '}
          {files.map((acceptedFile) => acceptedFile.name).join(', ')}
          <br />
          {clearButton}
        </MessageContent>
      );
    }
  }

  return isDragActive ? (
    <IgnorePointerEventsMessageContent>
      {dragActiveMessage || 'Drop the files here...'}
    </IgnorePointerEventsMessageContent>
  ) : (
    <MessageContent>
      {dragInactiveMessage || 'Drag and drop some files here, or click to select files'}
    </MessageContent>
  );
};
