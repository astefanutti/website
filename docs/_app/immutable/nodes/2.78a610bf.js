import{S as E,i as W,s as j,k as M,q as N,C as T,l as z,m as F,r as H,h as $,n as I,E as P,F as v,K,y as S,a as h,z as b,c as g,A,b as d,g as p,f as O,M as Q,N as R,O as D,d as _,B as w,Q as G,v as J}from"../chunks/index.ebf6ac20.js";import{P as L,A as U,a as V}from"../chunks/ArticleMeta.9cb801f8.js";function X(f){let e,o;return{c(){e=M("script"),o=N(`{
      "@context" : "https://schema.org",
      "@type" : "WebSite",
      "name" : "Antonin Stefanutti",
      "url" : "https://ttt.io"
    }`),this.h()},l(s){const c=T("svelte-8iur1j",document.head);e=z(c,"SCRIPT",{type:!0});var n=F(e);o=H(n,`{
      "@context" : "https://schema.org",
      "@type" : "WebSite",
      "name" : "Antonin Stefanutti",
      "url" : "https://ttt.io"
    }`),n.forEach($),c.forEach($),this.h()},h(){I(e,"type","application/ld+json")},m(s,c){P(document.head,e),P(e,o)},p:v,i:v,o:v,d(s){$(e)}}}class Y extends E{constructor(e){super(),W(this,e,null,X,j,{})}}function B(f,e,o){const s=f.slice();return s[3]=e[o].slug,s[4]=e[o].title,s[5]=e[o].author,s[6]=e[o].date,s}function C(f){let e,o,s,c;return e=new U({props:{slug:f[3],title:f[4]}}),s=new V({props:{author:f[5],date:f[6]}}),{c(){S(e.$$.fragment),o=h(),S(s.$$.fragment)},l(n){b(e.$$.fragment,n),o=g(n),b(s.$$.fragment,n)},m(n,r){A(e,n,r),d(n,o,r),A(s,n,r),c=!0},p(n,r){const m={};r&1&&(m.slug=n[3]),r&1&&(m.title=n[4]),e.$set(m);const a={};r&1&&(a.author=n[5]),r&1&&(a.date=n[6]),s.$set(a)},i(n){c||(p(e.$$.fragment,n),p(s.$$.fragment,n),c=!0)},o(n){_(e.$$.fragment,n),_(s.$$.fragment,n),c=!1},d(n){w(e,n),n&&$(o),w(s,n)}}}function Z(f){let e,o,s,c,n,r;e=new Y({}),s=new L({props:{title:"Antonin Stefanutti's Blog"}});let m=f[0].posts,a=[];for(let t=0;t<m.length;t+=1)a[t]=C(B(f,m,t));const q=t=>_(a[t],1,1,()=>{a[t]=null}),k=f[2].default,u=K(k,f,f[1],null);return{c(){S(e.$$.fragment),o=h(),S(s.$$.fragment),c=h();for(let t=0;t<a.length;t+=1)a[t].c();n=h(),u&&u.c()},l(t){b(e.$$.fragment,t),o=g(t),b(s.$$.fragment,t),c=g(t);for(let l=0;l<a.length;l+=1)a[l].l(t);n=g(t),u&&u.l(t)},m(t,l){A(e,t,l),d(t,o,l),A(s,t,l),d(t,c,l);for(let i=0;i<a.length;i+=1)a[i]&&a[i].m(t,l);d(t,n,l),u&&u.m(t,l),r=!0},p(t,[l]){if(l&1){m=t[0].posts;let i;for(i=0;i<m.length;i+=1){const y=B(t,m,i);a[i]?(a[i].p(y,l),p(a[i],1)):(a[i]=C(y),a[i].c(),p(a[i],1),a[i].m(n.parentNode,n))}for(J(),i=m.length;i<a.length;i+=1)q(i);O()}u&&u.p&&(!r||l&2)&&Q(u,k,t,t[1],r?D(k,t[1],l,null):R(t[1]),null)},i(t){if(!r){p(e.$$.fragment,t),p(s.$$.fragment,t);for(let l=0;l<m.length;l+=1)p(a[l]);p(u,t),r=!0}},o(t){_(e.$$.fragment,t),_(s.$$.fragment,t),a=a.filter(Boolean);for(let l=0;l<a.length;l+=1)_(a[l]);_(u,t),r=!1},d(t){w(e,t),t&&$(o),w(s,t),t&&$(c),G(a,t),t&&$(n),u&&u.d(t)}}}function x(f,e,o){let{$$slots:s={},$$scope:c}=e,{data:n}=e;return f.$$set=r=>{"data"in r&&o(0,n=r.data),"$$scope"in r&&o(1,c=r.$$scope)},[n,c,s]}class nt extends E{constructor(e){super(),W(this,e,x,Z,j,{data:0})}}export{nt as component};
