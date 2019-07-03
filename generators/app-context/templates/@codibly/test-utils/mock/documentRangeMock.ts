if ((global as any).document) {
  document.createRange = () =>
    ({
      setStart: () => {
        // nothing here
      },
      setEnd: () => {
        // nothing here
      },
      commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document
      } as any
    } as any);
}
