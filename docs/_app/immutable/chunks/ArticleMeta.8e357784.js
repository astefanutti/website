import{S as y,i as A,s as E,k as h,C as S,l as u,h as o,n as r,E as f,F as d,e as M,b as m,q as p,m as _,r as v,R as g,u as b,a as T,c as q}from"./index.39ce08e8.js";function D(i){let e,s,n,a;return document.title=e=i[0],{c(){s=h("meta"),n=h("meta"),a=h("meta"),this.h()},l(t){const l=S("svelte-1uq71di",document.head);s=u(l,"META",{property:!0,content:!0}),n=u(l,"META",{property:!0,content:!0}),a=u(l,"META",{property:!0,content:!0}),l.forEach(o),this.h()},h(){r(s,"property","og:site_name"),r(s,"content","ttt.io"),r(n,"property","og:title"),r(n,"content",i[0]),r(a,"property","og:description"),r(a,"content",i[1])},m(t,l){f(document.head,s),f(document.head,n),f(document.head,a)},p(t,[l]){l&1&&e!==(e=t[0])&&(document.title=e),l&1&&r(n,"content",t[0]),l&2&&r(a,"content",t[1])},i:d,o:d,d(t){o(s),o(n),o(a)}}}function H(i,e,s){let{title:n}=e,{description:a}=e;return i.$$set=t=>{"title"in t&&s(0,n=t.title),"description"in t&&s(1,a=t.description)},[n,a]}class B extends y{constructor(e){super(),A(this,e,H,D,E,{title:0,description:1})}}function N(i){let e,s;return{c(){e=h("h1"),s=p(i[1]),this.h()},l(n){e=u(n,"H1",{class:!0});var a=_(e);s=v(a,i[1]),a.forEach(o),this.h()},h(){r(e,"class","heading svelte-171h6gf"),g(e,"large",!i[0])},m(n,a){m(n,e,a),f(e,s)},p(n,a){a&2&&b(s,n[1]),a&1&&g(e,"large",!n[0])},d(n){n&&o(e)}}}function C(i){let e,s,n,a;return{c(){e=h("h2"),s=h("a"),n=p(i[1]),this.h()},l(t){e=u(t,"H2",{class:!0});var l=_(e);s=u(l,"A",{href:!0});var c=_(s);n=v(c,i[1]),c.forEach(o),l.forEach(o),this.h()},h(){r(s,"href",a=`/${i[0]}`),r(e,"class","heading svelte-171h6gf"),g(e,"large",!i[0])},m(t,l){m(t,e,l),f(e,s),f(s,n)},p(t,l){l&2&&b(n,t[1]),l&1&&a!==(a=`/${t[0]}`)&&r(s,"href",a),l&1&&g(e,"large",!t[0])},d(t){t&&o(e)}}}function w(i){let e;function s(t,l){return t[0]?C:N}let n=s(i),a=n(i);return{c(){a.c(),e=M()},l(t){a.l(t),e=M()},m(t,l){a.m(t,l),m(t,e,l)},p(t,[l]){n===(n=s(t))&&a?a.p(t,l):(a.d(1),a=n(t),a&&(a.c(),a.m(e.parentNode,e)))},i:d,o:d,d(t){a.d(t),t&&o(e)}}}function F(i,e,s){let{slug:n=""}=e,{title:a}=e;return i.$$set=t=>{"slug"in t&&s(0,n=t.slug),"title"in t&&s(1,a=t.title)},[n,a]}class G extends y{constructor(e){super(),A(this,e,F,w,E,{slug:0,title:1})}}function P(i){let e,s;return{c(){e=h("span"),s=p(i[0]),this.h()},l(n){e=u(n,"SPAN",{class:!0});var a=_(e);s=v(a,i[0]),a.forEach(o),this.h()},h(){r(e,"class","author svelte-4ufgo2")},m(n,a){m(n,e,a),f(e,s)},p(n,a){a&1&&b(s,n[0])},d(n){n&&o(e)}}}function R(i){let e,s,n,a,t=i[0]&&P(i);return{c(){e=h("p"),t&&t.c(),s=T(),n=h("span"),a=p(i[1]),this.h()},l(l){e=u(l,"P",{class:!0});var c=_(e);t&&t.l(c),s=q(c),n=u(c,"SPAN",{class:!0});var k=_(n);a=v(k,i[1]),k.forEach(o),c.forEach(o),this.h()},h(){r(n,"class","date svelte-4ufgo2"),r(e,"class","svelte-4ufgo2")},m(l,c){m(l,e,c),t&&t.m(e,null),f(e,s),f(e,n),f(n,a)},p(l,[c]){l[0]?t?t.p(l,c):(t=P(l),t.c(),t.m(e,s)):t&&(t.d(1),t=null)},i:d,o:d,d(l){l&&o(e),t&&t.d()}}}function j(i,e,s){let{author:n}=e,{date:a}=e;const t=new Date(a).toDateString();return i.$$set=l=>{"author"in l&&s(0,n=l.author),"date"in l&&s(2,a=l.date)},[n,t,a]}class I extends y{constructor(e){super(),A(this,e,j,R,E,{author:0,date:2})}}export{G as A,B as P,I as a};