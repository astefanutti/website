(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"+kg1":function(t,e,n){"use strict";n.r(e);var r=n("q1tI"),o=n.n(r),i=n("A2+M"),a=n("7ljp"),u=n("RnvD"),l=n("9Dj+");var c=n("CnBM"),s=n.n(c),p=n("g+62"),f=n("lM68"),d=f.c.dark,y=f.c.light,m=s()({loader:function(){return Promise.all([n.e(3),n.e(2),n.e(14)]).then(n.t.bind(null,"wX2h",7)).then((function(t){return Promise.all([n.e(3),n.e(2),n.e(15)]).then(n.t.bind(null,"kPWa",7)).then((function(e){return t.register([e])})).then((function(){return n.e(16).then(n.t.bind(null,"qT3F",7))})).then((function(e){return e.default(t)}))}))},loading:function(t){return t.timedOut?o.a.createElement("blockquote",null,"Error: Loading Plotly timed out."):o.a.createElement("span",null,"Loading...")},timeout:1e4}),h=function(t){var e=t.data,n=t.style,r=function(t,e){if(null==t)return{};var n,r,o={},i=Object.keys(t);for(r=0;r<i.length;r++)n=i[r],e.indexOf(n)>=0||(o[n]=t[n]);return o}(t,["data","style"]),i=Object(p.a)();return o.a.createElement(m,Object.assign({layout:{margin:{t:0,r:0,l:35},paper_bgcolor:"rgba(0, 0, 0, 0)",plot_bgcolor:"rgba(0, 0, 0, 0)",font:{color:i.value?d.color:y.color,size:14},autosize:!0},style:Object.assign({width:"100%",clear:"both"},n),useResizeHandler:!0,config:{displayModeBar:!1,showTips:!1},data:e},r))};e.default=function(t){var e=t.data,n=e.post,r=e.site,c=n.excerpt,s=n.body,p=n.image;return o.a.createElement(a.MDXProvider,{components:{Plotly:h}},o.a.createElement(l.a,{title:r.siteMetadata.title},o.a.createElement(u.a,{title:n.frontmatter.title,description:c,image:p}),o.a.createElement("article",null,o.a.createElement("header",null,o.a.createElement("h1",null,n.frontmatter.title),o.a.createElement("p",null,n.frontmatter.date)),o.a.createElement("div",{className:"page-content"},o.a.createElement(i.MDXRenderer,null,s)))))}},"A2+M":function(t,e,n){var r=n("X8hv");t.exports={MDXRenderer:r}},Bnag:function(t,e){t.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},CnBM:function(t,e,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var u=n("q1tI"),l=n("17x9"),c=[],s=[];function p(t){var e=t(),n={loading:!0,loaded:null,error:null};return n.promise=e.then((function(t){return n.loading=!1,n.loaded=t,t})).catch((function(t){throw n.loading=!1,n.error=t,t})),n}function f(t){var e={loading:!1,loaded:{},error:null},n=[];try{Object.keys(t).forEach((function(r){var o=p(t[r]);o.loading?e.loading=!0:(e.loaded[r]=o.loaded,e.error=o.error),n.push(o.promise),o.promise.then((function(t){e.loaded[r]=t})).catch((function(t){e.error=t}))}))}catch(r){e.error=r}return e.promise=Promise.all(n).then((function(t){return e.loading=!1,t})).catch((function(t){throw e.loading=!1,t})),e}function d(t,e){return u.createElement((n=t)&&n.__esModule?n.default:n,e);var n}function y(t,e){var p,f;if(!e.loading)throw new Error("react-loadable requires a `loading` component");var y=Object.assign({loader:null,loading:null,delay:200,timeout:null,render:d,webpack:null,modules:null},e),m=null;function h(){return m||(m=t(y.loader)),m.promise}return c.push(h),"function"==typeof y.webpack&&s.push((function(){if(t=y.webpack,"object"===r(n.m)&&t().every((function(t){return void 0!==t&&void 0!==n.m[t]})))return h();var t})),f=p=function(e){function n(r){o(this,n);var a=i(this,e.call(this,r));return a.retry=function(){a.setState({error:null,loading:!0,timedOut:!1}),m=t(y.loader),a._loadModule()},h(),a.state={error:m.error,pastDelay:!1,timedOut:!1,loading:m.loading,loaded:m.loaded},a}return a(n,e),n.preload=function(){return h()},n.prototype.componentWillMount=function(){this._mounted=!0,this._loadModule()},n.prototype._loadModule=function(){var t=this;if(this.context.loadable&&Array.isArray(y.modules)&&y.modules.forEach((function(e){t.context.loadable.report(e)})),m.loading){"number"==typeof y.delay&&(0===y.delay?this.setState({pastDelay:!0}):this._delay=setTimeout((function(){t.setState({pastDelay:!0})}),y.delay)),"number"==typeof y.timeout&&(this._timeout=setTimeout((function(){t.setState({timedOut:!0})}),y.timeout));var e=function(){t._mounted&&(t.setState({error:m.error,loaded:m.loaded,loading:m.loading}),t._clearTimeouts())};m.promise.then((function(){e()})).catch((function(t){e()}))}},n.prototype.componentWillUnmount=function(){this._mounted=!1,this._clearTimeouts()},n.prototype._clearTimeouts=function(){clearTimeout(this._delay),clearTimeout(this._timeout)},n.prototype.render=function(){return this.state.loading||this.state.error?u.createElement(y.loading,{isLoading:this.state.loading,pastDelay:this.state.pastDelay,timedOut:this.state.timedOut,error:this.state.error,retry:this.retry}):this.state.loaded?y.render(this.state.loaded,this.props):null},n}(u.Component),p.contextTypes={loadable:l.shape({report:l.func.isRequired})},f}function m(t){return y(p,t)}m.Map=function(t){if("function"!=typeof t.render)throw new Error("LoadableMap requires a `render(loaded, props)` function");return y(f,t)};var h=function(t){function e(){return o(this,e),i(this,t.apply(this,arguments))}return a(e,t),e.prototype.getChildContext=function(){return{loadable:{report:this.props.report}}},e.prototype.render=function(){return u.Children.only(this.props.children)},e}(u.Component);function b(t){for(var e=[];t.length;){var n=t.pop();e.push(n())}return Promise.all(e).then((function(){if(t.length)return b(t)}))}h.propTypes={report:l.func.isRequired},h.childContextTypes={loadable:l.shape({report:l.func.isRequired}).isRequired},m.Capture=h,m.preloadAll=function(){return new Promise((function(t,e){b(c).then(t,e)}))},m.preloadReady=function(){return new Promise((function(t,e){b(s).then(t,t)}))},t.exports=m},EbDI:function(t,e){t.exports=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}},Ijbi:function(t,e,n){var r=n("WkPL");t.exports=function(t){if(Array.isArray(t))return r(t)}},RIqP:function(t,e,n){var r=n("Ijbi"),o=n("EbDI"),i=n("ZhPi"),a=n("Bnag");t.exports=function(t){return r(t)||o(t)||i(t)||a()}},SksO:function(t,e){function n(e,r){return t.exports=n=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},n(e,r)}t.exports=n},WkPL:function(t,e){t.exports=function(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}},X8hv:function(t,e,n){var r=n("sXyB"),o=n("RIqP"),i=n("lSNA"),a=n("8OQS");function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){i(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var c=n("q1tI"),s=n("7ljp"),p=s.useMDXComponents,f=s.mdx,d=n("BfwJ").useMDXScope;t.exports=function(t){var e=t.scope,n=t.components,i=t.children,u=a(t,["scope","components","children"]),s=p(n),y=d(e),m=c.useMemo((function(){if(!i)return null;var t=l({React:c,mdx:f},y),e=Object.keys(t),n=e.map((function(e){return t[e]}));return r(Function,["_fn"].concat(o(e),[""+i])).apply(void 0,[{}].concat(o(n)))}),[i,e]);return c.createElement(m,l({components:s},u))}},ZhPi:function(t,e,n){var r=n("WkPL");t.exports=function(t,e){if(t){if("string"==typeof t)return r(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}},b48C:function(t,e){t.exports=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}},lSNA:function(t,e){t.exports=function(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}},sXyB:function(t,e,n){var r=n("SksO"),o=n("b48C");function i(e,n,a){return o()?t.exports=i=Reflect.construct:t.exports=i=function(t,e,n){var o=[null];o.push.apply(o,e);var i=new(Function.bind.apply(t,o));return n&&r(i,n.prototype),i},i.apply(null,arguments)}t.exports=i}}]);
//# sourceMappingURL=component---src-templates-post-tsx-8fb7dc14c348106b3344.js.map