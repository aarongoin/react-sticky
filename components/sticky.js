var React = require('react'),
    Sticky = React.createClass({displayName: "Sticky",

  reset: function() {
    var html = document.documentElement,
        body = document.body,
        windowOffset = window.pageYOffset || (html.clientHeight ? html : body).scrollTop,
        el = this.getDOMNode();
    
    this.elementOffset = el.getBoundingClientRect().top + windowOffset;
    this.phantomHeight = el.offsetHeight;
    this.handleScroll();
  },

  handleResize: function() {
    // set style with callback to reset once style rendered succesfully
    this.setState({ style: {} }, this.reset);
  },

  handleScroll: function() {
    if (window.pageYOffset > this.elementOffset) this.setState({ style: this.props.stickyStyle });
    else this.setState({ style: {} });
  },

  getDefaultProps: function() {
    return {
      jank: false,
      stickyStyle: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0
      }
    };
  },

  getInitialState: function() {
    return {
      style: {}
    }; 
  },

  componentDidMount: function() {
    this.reset();
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleResize);
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  },

  render: function() {
    if (this.state.style.position) return (
      React.createElement("div", {style: {height: this.props.jank ? 'auto' : this.phantomHeight}}, 
        React.createElement("div", {style: this.state.style}, 
          this.props.children
        )
      )
    );
    else return (
      React.createElement("div", {style: this.state.style}, 
        this.props.children
      ) 
    );
  }
});

module.exports = Sticky;