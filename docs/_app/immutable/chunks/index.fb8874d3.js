import{S as ma,i as da,s as xa,k as p,q as k,a as r,T as f,H as v,l as c,m as t,r as y,h as a,c as i,U as u,D as h,n as l,b as e,E as n,F as Ps}from"./index.39ce08e8.js";/* empty css                                            */function _a(ta){let E,gs,hs,w,m,g,H,As,fs,A,d,I,M,Is,us,P,na='<pre class="shiki  language-ps1"><code tabindex="0"><span class="line"><span style="color: var(--shiki-color-text)">$ docker run </span><span style="color: var(--shiki-token-symbol)">--</span><span style="color: var(--shiki-color-text)">rm </span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">it </span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">v &#96;pwd&#96;:</span><span style="color: var(--shiki-token-symbol)">/</span><span style="color: var(--shiki-color-text)">workdir crops</span><span style="color: var(--shiki-token-symbol)">/</span><span style="color: var(--shiki-color-text)">poky</span></span></code></pre>',j,C,ra=`<pre class="shiki  language-ps1"><code tabindex="0"><span class="line"><span style="color: var(--shiki-color-text)">$ git clone </span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">b kirkstone</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">l4t</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">r32.</span><span style="color: var(--shiki-token-numeric)">7.</span><span style="color: var(--shiki-color-text)">x https:</span><span style="color: var(--shiki-token-symbol)">//github.com/</span><span style="color: var(--shiki-color-text)">OE4T</span><span style="color: var(--shiki-token-symbol)">/</span><span style="color: var(--shiki-color-text)">tegra</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">demo</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">distro.git</span></span>
<span class="line"><span style="color: var(--shiki-color-text)">$ cd cd tegra</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">demo</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">distro</span></span>
<span class="line"><span style="color: var(--shiki-color-text)">$ git submodule update </span><span style="color: var(--shiki-token-symbol)">--</span><span style="color: var(--shiki-color-text)">init</span></span>
<span class="line"><span style="color: var(--shiki-color-text)">$ . .</span><span style="color: var(--shiki-token-symbol)">/</span><span style="color: var(--shiki-color-text)">setup</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">env </span><span style="color: var(--shiki-token-symbol)">--</span><span style="color: var(--shiki-color-text)">machine jetson</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">nano</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">devkit</span></span>
<span class="line"><span style="color: var(--shiki-color-text)">$ vim conf</span><span style="color: var(--shiki-token-symbol)">/</span><span style="color: var(--shiki-color-text)">local.conf</span></span></code></pre>`,J,F,ia=`<pre class="shiki  language-ini"><code tabindex="0"><span class="line"><span style="color: var(--shiki-token-string)">DISTRO_FEATURES:</span><span style="color: var(--shiki-token-keyword)">remove</span><span style="color: var(--shiki-token-string)"> </span><span style="color: var(--shiki-color-text)">=</span><span style="color: var(--shiki-token-string)"> </span><span style="color: var(--shiki-token-string)">&quot;wayland&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color: var(--shiki-token-string)">EXTRA_IMAGE_FEATURES ?= </span><span style="color: var(--shiki-token-string)">&quot;tools-sdk dev-pkgs debug-tweaks&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color: var(--shiki-token-string)">IMAGE_INSTALL:</span><span style="color: var(--shiki-token-keyword)">append</span><span style="color: var(--shiki-token-string)"> </span><span style="color: var(--shiki-color-text)">=</span><span style="color: var(--shiki-token-string)"> </span><span style="color: var(--shiki-token-string)">&quot; mesa tegra-udrm-gbm tegra-udrm-probeconf egl-gbm&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color: var(--shiki-token-string)">CORE_IMAGE_BASE_INSTALL:</span><span style="color: var(--shiki-token-keyword)">remove</span><span style="color: var(--shiki-token-string)"> </span><span style="color: var(--shiki-color-text)">=</span><span style="color: var(--shiki-token-string)"> </span><span style="color: var(--shiki-token-string)">&quot;packagegroup-demo-egltests&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color: var(--shiki-token-comment); font-style: italic"># Build</span></span>
<span class="line"><span style="color: var(--shiki-token-string)">CORE_IMAGE_EXTRA_INSTALL += </span><span style="color: var(--shiki-token-string)">&quot;git&quot;</span></span>
<span class="line"><span style="color: var(--shiki-token-string)">CORE_IMAGE_EXTRA_INSTALL += </span><span style="color: var(--shiki-token-string)">&quot;make&quot;</span></span>
<span class="line"><span style="color: var(--shiki-token-string)">CORE_IMAGE_EXTRA_INSTALL += </span><span style="color: var(--shiki-token-string)">&quot;gcc&quot;</span></span>
<span class="line"><span style="color: var(--shiki-token-string)">CORE_IMAGE_EXTRA_INSTALL += </span><span style="color: var(--shiki-token-string)">&quot;vim&quot;</span></span></code></pre>`,X,D,pa='<pre class="shiki  language-ps1"><code tabindex="0"><span class="line"><span style="color: var(--shiki-color-text)">$ bitbake demo</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">image</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">egl</span></span></code></pre>',U,z,ca=`<pre class="shiki  language-ps1"><code tabindex="0"><span class="line"><span style="color: var(--shiki-color-text)">$ cp tmp</span><span style="color: var(--shiki-token-symbol)">/</span><span style="color: var(--shiki-color-text)">deploy</span><span style="color: var(--shiki-token-symbol)">/</span><span style="color: var(--shiki-color-text)">images</span><span style="color: var(--shiki-token-symbol)">/</span><span style="color: var(--shiki-color-text)">jetson</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">nano</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">devkit</span><span style="color: var(--shiki-token-symbol)">/</span><span style="color: var(--shiki-color-text)">demo</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">image</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">egl</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">jetson</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">nano</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">devkit.tegraflash.tar.gz </span><span style="color: var(--shiki-token-symbol)">/</span><span style="color: var(--shiki-color-text)">workdir</span><span style="color: var(--shiki-token-symbol)">/</span></span>
<span class="line"><span style="color: var(--shiki-color-text)">$ </span><span style="color: var(--shiki-token-keyword)">exit</span></span></code></pre>`,Y,K,ka='<pre class="shiki  language-ps1"><code tabindex="0"><span class="line"><span style="color: var(--shiki-color-text)">$ tar </span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">xf demo</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">image</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">egl</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">jetson</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">nano</span><span style="color: var(--shiki-token-symbol)">-</span><span style="color: var(--shiki-color-text)">devkit.tegraflash.tar.gz</span></span></code></pre>',Q,V,va='<pre class="shiki  language-ps1"><code tabindex="0"><span class="line"><span style="color: var(--shiki-color-text)">$ lsusb</span></span></code></pre>',W,ss,ya='<pre class="shiki  language-ps1"><code tabindex="0"><span class="line"><span style="color: var(--shiki-color-text)">$ sudo .</span><span style="color: var(--shiki-token-symbol)">/</span><span style="color: var(--shiki-color-text)">doflash.sh</span></span></code></pre>',as,N,x,S,ls,Ns,ms,G,os,Ss,ds,es,ha=`<pre class="shiki  language-glsl"><code tabindex="0"><span class="line"><span style="color: var(--shiki-token-keyword)">#ifdef</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-function)">GL_FRAGMENT_PRECISION_HIGH</span></span>
<span class="line"><span style="color: var(--shiki-color-text)">precision highp </span><span style="color: var(--shiki-token-keyword)">float</span><span style="color: var(--shiki-token-punctuation)">;</span></span>
<span class="line"><span style="color: var(--shiki-token-keyword)">#else</span></span>
<span class="line"><span style="color: var(--shiki-color-text)">precision mediump </span><span style="color: var(--shiki-token-keyword)">float</span><span style="color: var(--shiki-token-punctuation)">;</span></span>
<span class="line"><span style="color: var(--shiki-token-keyword)">#endif</span></span></code></pre>`,ts,O,ns,Ls,xs,rs,fa='<pre class="shiki  language-c"><code tabindex="0"><span class="line"><span style="color: var(--shiki-token-function)">glFinish</span><span style="color: var(--shiki-token-punctuation)">();</span></span></code></pre>',is,B,ps,Ts,_s,cs,ua='<pre class="shiki  language-c"><code tabindex="0"><span class="line"><span style="color: var(--shiki-color-text)">flags </span><span style="color: var(--shiki-token-keyword)">|=</span><span style="color: var(--shiki-color-text)"> </span><span style="color: var(--shiki-token-constant)">DRM_MODE_PAGE_FLIP_ASYNC</span><span style="color: var(--shiki-token-punctuation)">;</span></span></code></pre>',ks,L,_,T,vs,Rs,bs,$,qs,Es,R,b,q,ys,Os,ws,Z,Bs;return{c(){E=p("p"),gs=k("Nintendo Switch"),hs=r(),w=p("h2"),m=p("a"),g=f("svg"),H=f("path"),As=k("Jetson Nano"),fs=r(),A=p("h2"),d=p("a"),I=f("svg"),M=f("path"),Is=k("OpenEmbedded for Tegra"),us=r(),P=new v(!1),j=r(),C=new v(!1),J=r(),F=new v(!1),X=r(),D=new v(!1),U=r(),z=new v(!1),Y=r(),K=new v(!1),Q=r(),V=new v(!1),W=r(),ss=new v(!1),as=r(),N=p("h2"),x=p("a"),S=f("svg"),ls=f("path"),Ns=k("Issues"),ms=r(),G=p("ol"),os=p("li"),Ss=k("Precision"),ds=r(),es=new v(!1),ts=r(),O=p("ol"),ns=p("li"),Ls=k("Non blocking page flipping"),xs=r(),rs=new v(!1),is=r(),B=p("ol"),ps=p("li"),Ts=k("Async page flipping"),_s=r(),cs=new v(!1),ks=r(),L=p("h2"),_=p("a"),T=f("svg"),vs=f("path"),Rs=k("Benchmark"),bs=r(),$=p("p"),qs=k(`+------------------------+---------+---------+-------------------+
|                        | Raspberry PI      | Jetson Nano       |
+------------------------+---------+---------+----------+--------+
| Shader                 | Sync    | Async   | Sync     | Async  |
+========================+=========+=========+==========+========+
| stripey_torus_interior | 2.7 fps |         | 25.5 fps | 44 fps |
+------------------------+---------+---------+----------+--------+`),Es=r(),R=p("h2"),b=p("a"),q=f("svg"),ys=f("path"),Os=k("Next"),ws=r(),Z=p("p"),Bs=k("Jetson Orin Nano"),this.h()},l(s){E=c(s,"P",{});var o=t(E);gs=y(o,"Nintendo Switch"),o.forEach(a),hs=i(s),w=c(s,"H2",{id:!0});var Gs=t(w);m=c(Gs,"A",{class:!0,"aria-hidden":!0,tabindex:!0,href:!0});var js=t(m);g=u(js,"svg",{viewBox:!0,version:!0,"aria-hidden":!0});var Cs=t(g);H=u(Cs,"path",{d:!0}),t(H).forEach(a),Cs.forEach(a),js.forEach(a),As=y(Gs,"Jetson Nano"),Gs.forEach(a),fs=i(s),A=c(s,"H2",{id:!0});var $s=t(A);d=c($s,"A",{class:!0,"aria-hidden":!0,tabindex:!0,href:!0});var Js=t(d);I=u(Js,"svg",{viewBox:!0,version:!0,"aria-hidden":!0});var Fs=t(I);M=u(Fs,"path",{d:!0}),t(M).forEach(a),Fs.forEach(a),Js.forEach(a),Is=y($s,"OpenEmbedded for Tegra"),$s.forEach(a),us=i(s),P=h(s,!1),j=i(s),C=h(s,!1),J=i(s),F=h(s,!1),X=i(s),D=h(s,!1),U=i(s),z=h(s,!1),Y=i(s),K=h(s,!1),Q=i(s),V=h(s,!1),W=i(s),ss=h(s,!1),as=i(s),N=c(s,"H2",{id:!0});var Zs=t(N);x=c(Zs,"A",{class:!0,"aria-hidden":!0,tabindex:!0,href:!0});var Xs=t(x);S=u(Xs,"svg",{viewBox:!0,version:!0,"aria-hidden":!0});var Ds=t(S);ls=u(Ds,"path",{d:!0}),t(ls).forEach(a),Ds.forEach(a),Xs.forEach(a),Ns=y(Zs,"Issues"),Zs.forEach(a),ms=i(s),G=c(s,"OL",{});var Us=t(G);os=c(Us,"LI",{});var zs=t(os);Ss=y(zs,"Precision"),zs.forEach(a),Us.forEach(a),ds=i(s),es=h(s,!1),ts=i(s),O=c(s,"OL",{start:!0});var Ys=t(O);ns=c(Ys,"LI",{});var Ks=t(ns);Ls=y(Ks,"Non blocking page flipping"),Ks.forEach(a),Ys.forEach(a),xs=i(s),rs=h(s,!1),is=i(s),B=c(s,"OL",{start:!0});var Qs=t(B);ps=c(Qs,"LI",{});var Vs=t(ps);Ts=y(Vs,"Async page flipping"),Vs.forEach(a),Qs.forEach(a),_s=i(s),cs=h(s,!1),ks=i(s),L=c(s,"H2",{id:!0});var Hs=t(L);_=c(Hs,"A",{class:!0,"aria-hidden":!0,tabindex:!0,href:!0});var Ws=t(_);T=u(Ws,"svg",{viewBox:!0,version:!0,"aria-hidden":!0});var sa=t(T);vs=u(sa,"path",{d:!0}),t(vs).forEach(a),sa.forEach(a),Ws.forEach(a),Rs=y(Hs,"Benchmark"),Hs.forEach(a),bs=i(s),$=c(s,"P",{});var aa=t($);qs=y(aa,`+------------------------+---------+---------+-------------------+
|                        | Raspberry PI      | Jetson Nano       |
+------------------------+---------+---------+----------+--------+
| Shader                 | Sync    | Async   | Sync     | Async  |
+========================+=========+=========+==========+========+
| stripey_torus_interior | 2.7 fps |         | 25.5 fps | 44 fps |
+------------------------+---------+---------+----------+--------+`),aa.forEach(a),Es=i(s),R=c(s,"H2",{id:!0});var Ms=t(R);b=c(Ms,"A",{class:!0,"aria-hidden":!0,tabindex:!0,href:!0});var la=t(b);q=u(la,"svg",{viewBox:!0,version:!0,"aria-hidden":!0});var oa=t(q);ys=u(oa,"path",{d:!0}),t(ys).forEach(a),oa.forEach(a),la.forEach(a),Os=y(Ms,"Next"),Ms.forEach(a),ws=i(s),Z=c(s,"P",{});var ea=t(Z);Bs=y(ea,"Jetson Orin Nano"),ea.forEach(a),this.h()},h(){l(H,"d","m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"),l(g,"viewBox","0 0 16 16"),l(g,"version","1.1"),l(g,"aria-hidden","true"),l(m,"class","anchor"),l(m,"aria-hidden","true"),l(m,"tabindex","-1"),l(m,"href","#jetson-nano"),l(w,"id","jetson-nano"),l(M,"d","m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"),l(I,"viewBox","0 0 16 16"),l(I,"version","1.1"),l(I,"aria-hidden","true"),l(d,"class","anchor"),l(d,"aria-hidden","true"),l(d,"tabindex","-1"),l(d,"href","#openembedded-for-tegra"),l(A,"id","openembedded-for-tegra"),P.a=j,C.a=J,F.a=X,D.a=U,z.a=Y,K.a=Q,V.a=W,ss.a=as,l(ls,"d","m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"),l(S,"viewBox","0 0 16 16"),l(S,"version","1.1"),l(S,"aria-hidden","true"),l(x,"class","anchor"),l(x,"aria-hidden","true"),l(x,"tabindex","-1"),l(x,"href","#issues"),l(N,"id","issues"),es.a=ts,l(O,"start","2"),rs.a=is,l(B,"start","3"),cs.a=ks,l(vs,"d","m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"),l(T,"viewBox","0 0 16 16"),l(T,"version","1.1"),l(T,"aria-hidden","true"),l(_,"class","anchor"),l(_,"aria-hidden","true"),l(_,"tabindex","-1"),l(_,"href","#benchmark"),l(L,"id","benchmark"),l(ys,"d","m7.775 3.275 1.25-1.25a3.5 3.5 0 1 1 4.95 4.95l-2.5 2.5a3.5 3.5 0 0 1-4.95 0 .751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018 1.998 1.998 0 0 0 2.83 0l2.5-2.5a2.002 2.002 0 0 0-2.83-2.83l-1.25 1.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042Zm-4.69 9.64a1.998 1.998 0 0 0 2.83 0l1.25-1.25a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042l-1.25 1.25a3.5 3.5 0 1 1-4.95-4.95l2.5-2.5a3.5 3.5 0 0 1 4.95 0 .751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018 1.998 1.998 0 0 0-2.83 0l-2.5 2.5a1.998 1.998 0 0 0 0 2.83Z"),l(q,"viewBox","0 0 16 16"),l(q,"version","1.1"),l(q,"aria-hidden","true"),l(b,"class","anchor"),l(b,"aria-hidden","true"),l(b,"tabindex","-1"),l(b,"href","#next"),l(R,"id","next")},m(s,o){e(s,E,o),n(E,gs),e(s,hs,o),e(s,w,o),n(w,m),n(m,g),n(g,H),n(w,As),e(s,fs,o),e(s,A,o),n(A,d),n(d,I),n(I,M),n(A,Is),e(s,us,o),P.m(na,s,o),e(s,j,o),C.m(ra,s,o),e(s,J,o),F.m(ia,s,o),e(s,X,o),D.m(pa,s,o),e(s,U,o),z.m(ca,s,o),e(s,Y,o),K.m(ka,s,o),e(s,Q,o),V.m(va,s,o),e(s,W,o),ss.m(ya,s,o),e(s,as,o),e(s,N,o),n(N,x),n(x,S),n(S,ls),n(N,Ns),e(s,ms,o),e(s,G,o),n(G,os),n(os,Ss),e(s,ds,o),es.m(ha,s,o),e(s,ts,o),e(s,O,o),n(O,ns),n(ns,Ls),e(s,xs,o),rs.m(fa,s,o),e(s,is,o),e(s,B,o),n(B,ps),n(ps,Ts),e(s,_s,o),cs.m(ua,s,o),e(s,ks,o),e(s,L,o),n(L,_),n(_,T),n(T,vs),n(L,Rs),e(s,bs,o),e(s,$,o),n($,qs),e(s,Es,o),e(s,R,o),n(R,b),n(b,q),n(q,ys),n(R,Os),e(s,ws,o),e(s,Z,o),n(Z,Bs)},p:Ps,i:Ps,o:Ps,d(s){s&&a(E),s&&a(hs),s&&a(w),s&&a(fs),s&&a(A),s&&a(us),s&&P.d(),s&&a(j),s&&C.d(),s&&a(J),s&&F.d(),s&&a(X),s&&D.d(),s&&a(U),s&&z.d(),s&&a(Y),s&&K.d(),s&&a(Q),s&&V.d(),s&&a(W),s&&ss.d(),s&&a(as),s&&a(N),s&&a(ms),s&&a(G),s&&a(ds),s&&es.d(),s&&a(ts),s&&a(O),s&&a(xs),s&&rs.d(),s&&a(is),s&&a(B),s&&a(_s),s&&cs.d(),s&&a(ks),s&&a(L),s&&a(bs),s&&a($),s&&a(Es),s&&a(R),s&&a(ws),s&&a(Z)}}}const wa={title:"Running OpenGL Shaders on the Jetson Nano",date:"2023-05-03T00:00:00.000Z",published:!1,slug:"glsl-jetson-nano",tags:["OpenGL","Jetson Nano"]};class ga extends ma{constructor(E){super(),da(this,E,null,_a,xa,{})}}export{ga as default,wa as metadata};