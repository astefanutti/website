import{S as q,i as E,s as M,K as H,k as P,l as B,m as N,h as m,n as R,b as $,M as I,N as K,O as L,g as p,d as g,F as w,q as O,a as b,e as z,r as Q,c as k,u as j,E as y,y as h,z as d,A,f as G,B as v,Q as J,v as U}from"../chunks/index.39ce08e8.js";import{P as V,A as W,a as X}from"../chunks/ArticleMeta.8e357784.js";function Y(f){let e,n;const l=f[1].default,t=H(l,f,f[0],null);return{c(){e=P("article"),t&&t.c(),this.h()},l(s){e=B(s,"ARTICLE",{class:!0});var i=N(e);t&&t.l(i),i.forEach(m),this.h()},h(){R(e,"class","svelte-qw9qh2")},m(s,i){$(s,e,i),t&&t.m(e,null),n=!0},p(s,[i]){t&&t.p&&(!n||i&1)&&I(t,l,s,s[0],n?L(l,s[0],i,null):K(s[0]),null)},i(s){n||(p(t,s),n=!0)},o(s){g(t,s),n=!1},d(s){s&&m(e),t&&t.d(s)}}}function Z(f,e,n){let{$$slots:l={},$$scope:t}=e;return f.$$set=s=>{"$$scope"in s&&n(0,t=s.$$scope)},[t,l]}class x extends q{constructor(e){super(),E(this,e,Z,Y,M,{})}}function C(f){let e,n,l,t=f[1]&&D(f);return{c(){e=O(f[0]),n=b(),t&&t.c(),l=z()},l(s){e=Q(s,f[0]),n=k(s),t&&t.l(s),l=z()},m(s,i){$(s,e,i),$(s,n,i),t&&t.m(s,i),$(s,l,i)},p(s,i){i&1&&j(e,s[0]),s[1]?t?t.p(s,i):(t=D(s),t.c(),t.m(l.parentNode,l)):t&&(t.d(1),t=null)},d(s){s&&m(e),s&&m(n),t&&t.d(s),s&&m(l)}}}function D(f){let e,n;return{c(){e=P("a"),n=O("Read More →"),this.h()},l(l){e=B(l,"A",{href:!0});var t=N(e);n=Q(t,"Read More →"),t.forEach(m),this.h()},h(){R(e,"href",f[2])},m(l,t){$(l,e,t),y(e,n)},p:w,d(l){l&&m(e)}}}function ee(f){let e,n=f[0]&&C(f);return{c(){e=P("p"),n&&n.c(),this.h()},l(l){e=B(l,"P",{class:!0});var t=N(e);n&&n.l(t),t.forEach(m),this.h()},h(){R(e,"class","svelte-46n3qz")},m(l,t){$(l,e,t),n&&n.m(e,null)},p(l,[t]){l[0]?n?n.p(l,t):(n=C(l),n.c(),n.m(e,null)):n&&(n.d(1),n=null)},i:w,o:w,d(l){l&&m(e),n&&n.d()}}}function te(f,e,n){let{description:l}=e,{slug:t=""}=e;const s=t&&`/${t}`;return f.$$set=i=>{"description"in i&&n(0,l=i.description),"slug"in i&&n(1,t=i.slug)},[l,t,s]}class le extends q{constructor(e){super(),E(this,e,te,ee,M,{description:0,slug:1})}}function T(f,e,n){const l=f.slice();return l[3]=e[n].slug,l[4]=e[n].title,l[5]=e[n].author,l[6]=e[n].description,l[7]=e[n].date,l}function se(f){let e,n,l,t,s,i;return e=new W({props:{slug:f[3],title:f[4]}}),l=new X({props:{author:f[5],date:f[7]}}),s=new le({props:{description:f[6],slug:f[3]}}),{c(){h(e.$$.fragment),n=b(),h(l.$$.fragment),t=b(),h(s.$$.fragment)},l(r){d(e.$$.fragment,r),n=k(r),d(l.$$.fragment,r),t=k(r),d(s.$$.fragment,r)},m(r,_){A(e,r,_),$(r,n,_),A(l,r,_),$(r,t,_),A(s,r,_),i=!0},p(r,_){const c={};_&1&&(c.slug=r[3]),_&1&&(c.title=r[4]),e.$set(c);const a={};_&1&&(a.author=r[5]),_&1&&(a.date=r[7]),l.$set(a);const o={};_&1&&(o.description=r[6]),_&1&&(o.slug=r[3]),s.$set(o)},i(r){i||(p(e.$$.fragment,r),p(l.$$.fragment,r),p(s.$$.fragment,r),i=!0)},o(r){g(e.$$.fragment,r),g(l.$$.fragment,r),g(s.$$.fragment,r),i=!1},d(r){v(e,r),r&&m(n),v(l,r),r&&m(t),v(s,r)}}}function F(f){let e,n;return e=new x({props:{$$slots:{default:[se]},$$scope:{ctx:f}}}),{c(){h(e.$$.fragment)},l(l){d(e.$$.fragment,l)},m(l,t){A(e,l,t),n=!0},p(l,t){const s={};t&5&&(s.$$scope={dirty:t,ctx:l}),e.$set(s)},i(l){n||(p(e.$$.fragment,l),n=!0)},o(l){g(e.$$.fragment,l),n=!1},d(l){v(e,l)}}}function ne(f){let e,n,l,t;e=new V({props:{title:"ttt.io",description:"Antonin Stefanutti's Blog"}});let s=f[0].posts,i=[];for(let a=0;a<s.length;a+=1)i[a]=F(T(f,s,a));const r=a=>g(i[a],1,1,()=>{i[a]=null}),_=f[1].default,c=H(_,f,f[2],null);return{c(){h(e.$$.fragment),n=b();for(let a=0;a<i.length;a+=1)i[a].c();l=b(),c&&c.c()},l(a){d(e.$$.fragment,a),n=k(a);for(let o=0;o<i.length;o+=1)i[o].l(a);l=k(a),c&&c.l(a)},m(a,o){A(e,a,o),$(a,n,o);for(let u=0;u<i.length;u+=1)i[u]&&i[u].m(a,o);$(a,l,o),c&&c.m(a,o),t=!0},p(a,[o]){if(o&1){s=a[0].posts;let u;for(u=0;u<s.length;u+=1){const S=T(a,s,u);i[u]?(i[u].p(S,o),p(i[u],1)):(i[u]=F(S),i[u].c(),p(i[u],1),i[u].m(l.parentNode,l))}for(U(),u=s.length;u<i.length;u+=1)r(u);G()}c&&c.p&&(!t||o&4)&&I(c,_,a,a[2],t?L(_,a[2],o,null):K(a[2]),null)},i(a){if(!t){p(e.$$.fragment,a);for(let o=0;o<s.length;o+=1)p(i[o]);p(c,a),t=!0}},o(a){g(e.$$.fragment,a),i=i.filter(Boolean);for(let o=0;o<i.length;o+=1)g(i[o]);g(c,a),t=!1},d(a){v(e,a),a&&m(n),J(i,a),a&&m(l),c&&c.d(a)}}}function ie(f,e,n){let{$$slots:l={},$$scope:t}=e,{data:s}=e;return f.$$set=i=>{"data"in i&&n(0,s=i.data),"$$scope"in i&&n(2,t=i.$$scope)},[s,l,t]}class re extends q{constructor(e){super(),E(this,e,ie,ne,M,{data:0})}}export{re as default};