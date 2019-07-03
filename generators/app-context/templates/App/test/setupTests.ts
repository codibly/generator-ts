// add custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import serializer from 'jest-emotion';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import '@testing-library/react/cleanup-after-each';

// add mocks
import '@codibly/test-utils/mock/createObjectURLMock';
import '@codibly/test-utils/mock/documentRangeMock';
import '@codibly/test-utils/mock/environmentMock';
import '@codibly/test-utils/mock/windowLocationMock';

// increase timeout in case of expensive UI tests
jest.setTimeout(15000);

expect.addSnapshotSerializer(serializer);
expect.extend({ toMatchImageSnapshot });
