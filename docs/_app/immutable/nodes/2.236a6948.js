import{S as v,i as M,s as N,K as q,y as g,a as p,z as h,c as d,A,b,g as m,f as z,M as C,N as H,O as K,d as c,B as k,h as w,Q as O,v as Q}from"../chunks/index.ebf6ac20.js";import{P as T,A as j,a as D}from"../chunks/ArticleMeta.9cb801f8.js";function P(r,l,f){const s=r.slice();return s[3]=l[f].slug,s[4]=l[f].title,s[5]=l[f].author,s[6]=l[f].date,s}function S(r){let l,f,s,i;return l=new j({props:{slug:r[3],title:r[4]}}),s=new D({props:{author:r[5],date:r[6]}}),{c(){g(l.$$.fragment),f=p(),g(s.$$.fragment)},l(a){h(l.$$.fragment,a),f=d(a),h(s.$$.fragment,a)},m(a,t){A(l,a,t),b(a,f,t),A(s,a,t),i=!0},p(a,t){const $={};t&1&&($.slug=a[3]),t&1&&($.title=a[4]),l.$set($);const _={};t&1&&(_.author=a[5]),t&1&&(_.date=a[6]),s.$set(_)},i(a){i||(m(l.$$.fragment,a),m(s.$$.fragment,a),i=!0)},o(a){c(l.$$.fragment,a),c(s.$$.fragment,a),i=!1},d(a){k(l,a),a&&w(f),k(s,a)}}}function E(r){let l,f,s,i;l=new T({props:{title:"Antonin Stefanutti's Blog"}});let a=r[0].posts,t=[];for(let e=0;e<a.length;e+=1)t[e]=S(P(r,a,e));const $=e=>c(t[e],1,1,()=>{t[e]=null}),_=r[2].default,u=q(_,r,r[1],null);return{c(){g(l.$$.fragment),f=p();for(let e=0;e<t.length;e+=1)t[e].c();s=p(),u&&u.c()},l(e){h(l.$$.fragment,e),f=d(e);for(let n=0;n<t.length;n+=1)t[n].l(e);s=d(e),u&&u.l(e)},m(e,n){A(l,e,n),b(e,f,n);for(let o=0;o<t.length;o+=1)t[o]&&t[o].m(e,n);b(e,s,n),u&&u.m(e,n),i=!0},p(e,[n]){if(n&1){a=e[0].posts;let o;for(o=0;o<a.length;o+=1){const B=P(e,a,o);t[o]?(t[o].p(B,n),m(t[o],1)):(t[o]=S(B),t[o].c(),m(t[o],1),t[o].m(s.parentNode,s))}for(Q(),o=a.length;o<t.length;o+=1)$(o);z()}u&&u.p&&(!i||n&2)&&C(u,_,e,e[1],i?K(_,e[1],n,null):H(e[1]),null)},i(e){if(!i){m(l.$$.fragment,e);for(let n=0;n<a.length;n+=1)m(t[n]);m(u,e),i=!0}},o(e){c(l.$$.fragment,e),t=t.filter(Boolean);for(let n=0;n<t.length;n+=1)c(t[n]);c(u,e),i=!1},d(e){k(l,e),e&&w(f),O(t,e),e&&w(s),u&&u.d(e)}}}function F(r,l,f){let{$$slots:s={},$$scope:i}=l,{data:a}=l;return r.$$set=t=>{"data"in t&&f(0,a=t.data),"$$scope"in t&&f(1,i=t.$$scope)},[a,i,s]}class J extends v{constructor(l){super(),M(this,l,F,E,N,{data:0})}}export{J as component};
