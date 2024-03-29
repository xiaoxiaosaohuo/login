import  React,{PureComponent} from 'react';
import * as ReactDOM from 'react-dom';
import {isEqual} from 'lodash';
import ViewerCore from './ViewerCore';

export default class ViewerContainer extends PureComponent {

  constructor() {
    super();

    this.container = null;
    this.defaultContainer = document.createElement('div');
    this.component = null;
  }

  renderViewer() {
    if (this.props.visible || this.component) {
      if (!this.container) {
        if (this.props.container) {
          this.container = this.props.container;
        }else {
          this.container = this.defaultContainer;
          document.body.appendChild(this.container);
        }
      }
      let instance = this;
      ReactDOM.unstable_renderSubtreeIntoContainer(
        this,
        <ViewerCore
          {...this.props}
          />,
        this.container,
        function () {
          instance.component = this;
        },
      );
    }
  }

  removeViewer() {
    if (this.container) {
      const container = this.container;
      ReactDOM.unmountComponentAtNode(container);
      container.parentNode.removeChild(container);
      this.container = null;
      this.component = null;
    }
  }

  componentWillUnmount() {
    if (this.props.visible) {
      this.props.onClose();
      this.removeViewer();
    } else {
      this.removeViewer();
    }
  }

  shouldComponentUpdate(nextProps){
      const {activeIndex,visible,images} = nextProps;
      if(activeIndex!=this.props.activeIndex){
          return true
      }
      if(visible!=this.props.visible){
          return true
      }
      if(!isEqual(images,this.props.images)){
          return true
      }
      return false
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.container !== nextProps.container) {
      this.component = null;
      if (nextProps.container) {
        if (this.container) {
          document.body.removeChild(this.container);
        }
        this.container = nextProps.container;
      }else {
        this.container = this.defaultContainer;
        document.body.appendChild(this.container);
      }
    }
  }

  componentDidMount() {
    this.renderViewer();
  }

  componentDidUpdate() {
    this.renderViewer();
  }

  render() {
    return null;
  }
}
