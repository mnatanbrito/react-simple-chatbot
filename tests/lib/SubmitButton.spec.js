import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';

import SubmitButton from '../../lib/components/SubmitButton';
import Spinner from '../../lib/components/Spinner';

describe('SubmitButton', () => {
  it('should render a disabled button', () => {
    const wrapper = mount(<SubmitButton disabled={true} />);
    expect(wrapper.props().disabled).to.be.equal(true);
  });

  it('should render a invalid button', () => {
    const wrapper = mount(<SubmitButton invalid={true} />);
    expect(wrapper.props().invalid).to.be.equal(true);
  });

  it('should render a speaking button', () => {
    const wrapper = mount(<SubmitButton speaking={true} />);
    expect(wrapper.props().speaking).to.be.equal(true);
  });

  it('should render a spinner while validating', () => {
    const wrapper = mount(<SubmitButton speaking={true} validating={true} />);
    expect(wrapper.props().validating).to.be.equal(true);
    expect(wrapper.find(Spinner)).to.have.length(1);
  });
});
