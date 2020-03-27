import React from 'react';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { TextStep } from '../../lib/steps_components';
import Bubble from '../../lib/steps_components/text/Bubble';
import Image from '../../lib/steps_components/text/Image';
import { anonymizeString } from '../../lib/utils';

const CustomComponent = () => <div />;

const maskCPF = cpf => {
  cpf = cpf || '';
  cpf = cpf.replace(/\D/g, ''); // remove tudo o que não é dígito
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // coloca um ponto entre o terceiro e o quarto dígitos
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2'); // coloca um ponto entre o terceiro e o quarto dígitos
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // coloca um hífen entre o terceiro e o quarto dígitos

  return cpf;
};

describe('TextStep', () => {
  describe('Bot text', () => {
    const settings = {
      step: {
        id: '1',
        audio: false,
        message: 'Hello',
        delay: 1000,
        bubbleColor: '#eee',
        fontColor: '#000',
        avatar: ''
      },
      isFirst: true,
      isLast: true,
      hideBotAvatar: false,
      hideUserAvatar: false,
      avatarStyle: {},
      bubbleStyle: {},
      triggerNextStep: () => {}
    };

    const wrapper = mount(<TextStep {...settings} />);
    wrapper.setState({ loading: false });

    it('should render', () => {
      expect(wrapper.find(TextStep).length).to.be.equal(1);
    });

    it("should render bubble with background color equal '#eee'", () => {
      expect(wrapper.props().step.bubbleColor).to.be.equal('#eee');
    });

    it("should render bubble with font color equal '#000'", () => {
      expect(wrapper.props().step.fontColor).to.be.equal('#000');
    });

    it('should render image', () => {
      expect(wrapper.find(Image).exists()).to.be.equal(true);
    });

    it("should render bubble with message equal 'Hello'", () => {
      expect(wrapper.find(Bubble).text()).to.be.equal('Hello');
    });

    it('should render a first bubble (but not last)', () => {
      const tsWrapper = mount(<TextStep {...settings} isFirst={true} isLast={false} />);
      tsWrapper.setState({ loading: false });

      expect(tsWrapper.find(Image).exists()).to.be.equal(true);
    });

    it('should render a without avatar', () => {
      const tsWrapper = mount(<TextStep {...settings} isFirst={false} hideBotAvatar={true} />);
      tsWrapper.setState({ loading: false });

      expect(tsWrapper.find(Image).exists()).to.be.equal(false);
    });

    it('should render a middle bubble', () => {
      const tsWrapper = mount(<TextStep {...settings} isFirst={false} isLast={false} />);
      tsWrapper.setState({ loading: false });

      expect(tsWrapper.find(Image).exists()).to.be.equal(false);
    });
  });

  describe('User text', () => {
    const settings = {
      step: {
        id: '1',
        message: 'Hello',
        delay: 1000,
        user: true,
        bubbleColor: '#eee',
        fontColor: '#000',
        avatar: ''
      },
      isFirst: false,
      isLast: true,
      hideBotAvatar: false,
      hideUserAvatar: false,
      avatarStyle: {},
      bubbleStyle: {},
      triggerNextStep: () => {}
    };

    const wrapper = mount(<TextStep {...settings} />);
    wrapper.setState({ loading: false });

    it('should render bubble without avatar (not first)', () => {
      expect(wrapper.find(Image).exists()).to.be.equal(false);
    });

    it('should render a first bubble', () => {
      const tsWrapper = mount(<TextStep {...settings} isFirst={true} isLast={false} />);
      tsWrapper.setState({ loading: false });

      expect(tsWrapper.find(Image).exists()).to.be.equal(true);
    });

    it('should render a without avatar', () => {
      const tsWrapper = mount(<TextStep {...settings} showUserAvatar={false} />);
      tsWrapper.setState({ loading: false });

      expect(tsWrapper.find(Image).exists()).to.be.equal(false);
    });

    it('should render a middle bubble', () => {
      const tsWrapper = mount(
        <TextStep {...settings} isFirst={false} isLast={false} hideUserAvatar={true} />
      );
      tsWrapper.setState({ loading: false });

      expect(tsWrapper.find(Image).exists()).to.be.equal(false);
    });

    it('it should render anonymized text on sensitive data', () => {
      const withSensitiveData = {
        ...settings,
        step: {
          ...settings.step,
          sensitiveData: true
        }
      };
      const tsWrapper = mount(
        <TextStep {...withSensitiveData} isFirst={false} isLast={false} hideUserAvatar={true} />
      );
      tsWrapper.setState({ loading: false });

      expect(tsWrapper.find(Bubble).text()).to.be.equal(anonymizeString('Hello'));
    });

    it('it should render text with mask correctly', () => {
      const withMaskedText = {
        ...settings,
        step: {
          ...settings.step,
          sensitiveData: false,
          message: '05565668322',
          mask: value => {
            return maskCPF(value);
          }
        }
      };
      const tsWrapper = mount(
        <TextStep {...withMaskedText} isFirst={false} isLast={false} hideUserAvatar={true} />
      );
      tsWrapper.setState({ loading: false });

      expect(tsWrapper.find(Bubble).text()).to.be.equal(maskCPF('05565668322'));
    });

    it('it should wait successful promise-based validator', () => {
      const withPromiseValidator = {
        ...settings,
        step: {
          ...settings.step,
          sensitiveData: false,
          message: '05565668322',
          mask: value => {
            return maskCPF(value);
          },
          validator: () => {
            return Promise.resolve(true);
          }
        }
      };
      const tsWrapper = mount(
        <TextStep {...withPromiseValidator} isFirst={false} isLast={false} hideUserAvatar={true} />
      );
      tsWrapper.setState({ loading: false });

      expect(tsWrapper.find(Bubble).text()).to.be.equal(maskCPF('05565668322'));
    });

    //TODO: desenvolver teste para o caso de validador retornando Promise
    // it('it should wait unsuccessful promise-based validator', () => {
    //   const withPromiseValidator = {
    //     ...settings,
    //     step: {
    //       ...settings.step,
    //       sensitiveData: false,
    //       message: '05565668322',
    //       mask: value => {
    //         return maskCPF(value);
    //       },
    //       validator: () => {
    //         return Promise.reject('CPF inválido!');
    //       }
    //     }
    //   };
    //   const tsWrapper = mount(
    //     <TextStep {...withPromiseValidator} isFirst={false} isLast={false} hideUserAvatar={true} />
    //   );
    //   tsWrapper.setState({ loading: false });

    //   expect(tsWrapper.find(Bubble).text()).to.be.equal('CPF inválido!');
    // });
  });

  describe('Function text', () => {
    const settings = {
      step: {
        id: '1',
        message: 'Hello',
        delay: 1000,
        user: true,
        bubbleColor: '#eee',
        fontColor: '#000',
        avatar: ''
      },
      isFirst: false,
      isLast: true,
      hideBotAvatar: false,
      hideUserAvatar: false,
      avatarStyle: {},
      bubbleStyle: {},
      triggerNextStep: () => {}
    };

    const wrapper = mount(<TextStep {...settings} />);
    wrapper.setState({ loading: false });

    it('should render bubble without avatar (not first)', () => {
      expect(wrapper.find(Image).exists()).to.be.equal(false);
    });

    it('should render the message "Hello"', () => {
      expect(wrapper.find(Bubble).text()).to.be.equal('Hello');
    });
  });

  describe('Component text', () => {
    const settings = {
      step: {
        id: '1',
        component: <CustomComponent />,
        waitAction: true
      },
      isFirst: false,
      isLast: true,
      hideBotAvatar: false,
      hideUserAvatar: false,
      avatarStyle: {},
      bubbleStyle: {},
      triggerNextStep: () => {}
    };

    const wrapper = mount(<TextStep {...settings} />);
    wrapper.setState({ loading: false });

    it('should render bubble with component', () => {
      expect(wrapper.find(CustomComponent).exists()).to.be.equal(true);
    });
  });
});
