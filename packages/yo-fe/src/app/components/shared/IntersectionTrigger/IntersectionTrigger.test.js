import React from 'react';
import { shallow } from 'enzyme';

import IntersectionTrigger from './IntersectionTrigger';

describe.only('yo-fe/src/app/component/shared/IntersectionTrigger', () => {
  let handler;
  let mockObserver;

  const windowIntersectionObserver = window.IntersectionObserver;

  beforeEach(() => {
    mockObserver = jest.fn();
    handler = jest.fn();

    window.IntersectionObserver = jest.fn(() => ({ observe: mockObserver }));
  });

  afterAll(() => {
    window.IntersectionObserver = windowIntersectionObserver;
  });

  it('should create IntersectionObserver on right element', () => {
    const wrapper = shallow(
      <IntersectionTrigger handler={handler} />,
      { disableLifecycleMethods: true }
    );
    wrapper.instance().loadMoreRef.current = 'loadMoreRef';

    wrapper.instance().componentDidMount();

    expect(mockObserver).toHaveBeenCalledWith('loadMoreRef');
  });

  it('should create IntersectionObserver with handler passed in as a prop', () => {
    const wrapper = shallow(
      <IntersectionTrigger handler={handler} />,
      { disableLifecycleMethods: true }
    );
    wrapper.instance().loadMoreRef.current = 'loadMoreRef';

    wrapper.instance().componentDidMount();

    expect(window.IntersectionObserver.mock.calls[0][0]).toBe(handler);
  });
});
