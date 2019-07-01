// add custom jest matchers from jest-dom
import 'jest-dom/extend-expect';
import serializer from 'jest-emotion';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import '@testing-library/react/cleanup-after-each';

// add mocks
import './mock/createObjectURLMock';
import './mock/documentRangeMock';
import './mock/environemntMock';
import './mock/windowLocationMock';

// increase timeout in case of expensive UI tests
jest.setTimeout(15000);

expect.addSnapshotSerializer(serializer);
expect.extend({ toMatchImageSnapshot });
