/*
 Rangy, a cross-browser JavaScript range and selection library
 http://code.google.com/p/rangy/

 Copyright 2012, Tim Down
 Licensed under the MIT license.
 Version: 1.2.3
 Build date: 26 February 2012
*/
window.rangy=function(){function l(p,u){var w=typeof p[u];return w=="function"||!!(w=="object"&&p[u])||w=="unknown"}function K(p,u){return!!(typeof p[u]=="object"&&p[u])}function H(p,u){return typeof p[u]!="undefined"}function I(p){return function(u,w){for(var B=w.length;B--;)if(!p(u,w[B]))return false;return true}}function z(p){return p&&A(p,x)&&v(p,t)}function C(p){window.alert("Rangy not supported in your browser. Reason: "+p);c.initialized=true;c.supported=false}function N(){if(!c.initialized){var p,
u=false,w=false;if(l(document,"createRange")){p=document.createRange();if(A(p,n)&&v(p,i))u=true;p.detach()}if((p=K(document,"body")?document.body:document.getElementsByTagName("body")[0])&&l(p,"createTextRange")){p=p.createTextRange();if(z(p))w=true}!u&&!w&&C("Neither Range nor TextRange are implemented");c.initialized=true;c.features={implementsDomRange:u,implementsTextRange:w};u=k.concat(f);w=0;for(p=u.length;w<p;++w)try{u[w](c)}catch(B){K(window,"console")&&l(window.console,"log")&&window.console.log("Init listener threw an exception. Continuing.",
B)}}}function O(p){this.name=p;this.supported=this.initialized=false}var i=["startContainer","startOffset","endContainer","endOffset","collapsed","commonAncestorContainer","START_TO_START","START_TO_END","END_TO_START","END_TO_END"],n=["setStart","setStartBefore","setStartAfter","setEnd","setEndBefore","setEndAfter","collapse","selectNode","selectNodeContents","compareBoundaryPoints","deleteContents","extractContents","cloneContents","insertNode","surroundContents","cloneRange","toString","detach"],
t=["boundingHeight","boundingLeft","boundingTop","boundingWidth","htmlText","text"],x=["collapse","compareEndPoints","duplicate","getBookmark","moveToBookmark","moveToElementText","parentElement","pasteHTML","select","setEndPoint","getBoundingClientRect"],A=I(l),q=I(K),v=I(H),c={version:"1.2.3",initialized:false,supported:true,util:{isHostMethod:l,isHostObject:K,isHostProperty:H,areHostMethods:A,areHostObjects:q,areHostProperties:v,isTextRange:z},features:{},modules:{},config:{alertOnWarn:false,preferTextRange:false}};
c.fail=C;c.warn=function(p){p="Rangy warning: "+p;if(c.config.alertOnWarn)window.alert(p);else typeof window.console!="undefined"&&typeof window.console.log!="undefined"&&window.console.log(p)};if({}.hasOwnProperty)c.util.extend=function(p,u){for(var w in u)if(u.hasOwnProperty(w))p[w]=u[w]};else C("hasOwnProperty not supported");var f=[],k=[];c.init=N;c.addInitListener=function(p){c.initialized?p(c):f.push(p)};var r=[];c.addCreateMissingNativeApiListener=function(p){r.push(p)};c.createMissingNativeApi=
function(p){p=p||window;N();for(var u=0,w=r.length;u<w;++u)r[u](p)};O.prototype.fail=function(p){this.initialized=true;this.supported=false;throw Error("Module '"+this.name+"' failed to load: "+p);};O.prototype.warn=function(p){c.warn("Module "+this.name+": "+p)};O.prototype.createError=function(p){return Error("Error in Rangy "+this.name+" module: "+p)};c.createModule=function(p,u){var w=new O(p);c.modules[p]=w;k.push(function(B){u(B,w);w.initialized=true;w.supported=true})};c.requireModules=function(p){for(var u=
0,w=p.length,B,V;u<w;++u){V=p[u];B=c.modules[V];if(!B||!(B instanceof O))throw Error("Module '"+V+"' not found");if(!B.supported)throw Error("Module '"+V+"' not supported");}};var L=false;q=function(){if(!L){L=true;c.initialized||N()}};if(typeof window=="undefined")C("No window found");else if(typeof document=="undefined")C("No document found");else{l(document,"addEventListener")&&document.addEventListener("DOMContentLoaded",q,false);if(l(window,"addEventListener"))window.addEventListener("load",
q,false);else l(window,"attachEvent")?window.attachEvent("onload",q):C("Window does not have required addEventListener or attachEvent method");return c}}();
rangy.createModule("DomUtil",function(l,K){function H(c){for(var f=0;c=c.previousSibling;)f++;return f}function I(c,f){var k=[],r;for(r=c;r;r=r.parentNode)k.push(r);for(r=f;r;r=r.parentNode)if(v(k,r))return r;return null}function z(c,f,k){for(k=k?c:c.parentNode;k;){c=k.parentNode;if(c===f)return k;k=c}return null}function C(c){c=c.nodeType;return c==3||c==4||c==8}function N(c,f){var k=f.nextSibling,r=f.parentNode;k?r.insertBefore(c,k):r.appendChild(c);return c}function O(c){if(c.nodeType==9)return c;
else if(typeof c.ownerDocument!="undefined")return c.ownerDocument;else if(typeof c.document!="undefined")return c.document;else if(c.parentNode)return O(c.parentNode);else throw Error("getDocument: no document found for node");}function i(c){if(!c)return"[No node]";return C(c)?'"'+c.data+'"':c.nodeType==1?"<"+c.nodeName+(c.id?' id="'+c.id+'"':"")+">["+c.childNodes.length+"]":c.nodeName}function n(c){this._next=this.root=c}function t(c,f){this.node=c;this.offset=f}function x(c){this.code=this[c];
this.codeName=c;this.message="DOMException: "+this.codeName}var A=l.util;A.areHostMethods(document,["createDocumentFragment","createElement","createTextNode"])||K.fail("document missing a Node creation method");A.isHostMethod(document,"getElementsByTagName")||K.fail("document missing getElementsByTagName method");var q=document.createElement("div");A.areHostMethods(q,["insertBefore","appendChild","cloneNode"])||K.fail("Incomplete Element implementation");A.isHostProperty(q,"innerHTML")||K.fail("Element is missing innerHTML property");
q=document.createTextNode("test");A.areHostMethods(q,["splitText","deleteData","insertData","appendData","cloneNode"])||K.fail("Incomplete Text Node implementation");var v=function(c,f){for(var k=c.length;k--;)if(c[k]===f)return true;return false};n.prototype={_current:null,hasNext:function(){return!!this._next},next:function(){var c=this._current=this._next,f;if(this._current)if(f=c.firstChild)this._next=f;else{for(f=null;c!==this.root&&!(f=c.nextSibling);)c=c.parentNode;this._next=f}return this._current},
detach:function(){this._current=this._next=this.root=null}};t.prototype={equals:function(c){return this.node===c.node&this.offset==c.offset},inspect:function(){return"[DomPosition("+i(this.node)+":"+this.offset+")]"}};x.prototype={INDEX_SIZE_ERR:1,HIERARCHY_REQUEST_ERR:3,WRONG_DOCUMENT_ERR:4,NO_MODIFICATION_ALLOWED_ERR:7,NOT_FOUND_ERR:8,NOT_SUPPORTED_ERR:9,INVALID_STATE_ERR:11};x.prototype.toString=function(){return this.message};l.dom={arrayContains:v,isHtmlNamespace:function(c){var f;return typeof c.namespaceURI==
"undefined"||(f=c.namespaceURI)===null||f=="http://www.w3.org/1999/xhtml"},parentElement:function(c){c=c.parentNode;return c.nodeType==1?c:null},getNodeIndex:H,getNodeLength:function(c){var f;return C(c)?c.length:(f=c.childNodes)?f.length:0},getCommonAncestor:I,isAncestorOf:function(c,f,k){for(f=k?f:f.parentNode;f;)if(f===c)return true;else f=f.parentNode;return false},getClosestAncestorIn:z,isCharacterDataNode:C,insertAfter:N,splitDataNode:function(c,f){var k=c.cloneNode(false);k.deleteData(0,f);
c.deleteData(f,c.length-f);N(k,c);return k},getDocument:O,getWindow:function(c){c=O(c);if(typeof c.defaultView!="undefined")return c.defaultView;else if(typeof c.parentWindow!="undefined")return c.parentWindow;else throw Error("Cannot get a window object for node");},getIframeWindow:function(c){if(typeof c.contentWindow!="undefined")return c.contentWindow;else if(typeof c.contentDocument!="undefined")return c.contentDocument.defaultView;else throw Error("getIframeWindow: No Window object found for iframe element");
},getIframeDocument:function(c){if(typeof c.contentDocument!="undefined")return c.contentDocument;else if(typeof c.contentWindow!="undefined")return c.contentWindow.document;else throw Error("getIframeWindow: No Document object found for iframe element");},getBody:function(c){return A.isHostObject(c,"body")?c.body:c.getElementsByTagName("body")[0]},getRootContainer:function(c){for(var f;f=c.parentNode;)c=f;return c},comparePoints:function(c,f,k,r){var L;if(c==k)return f===r?0:f<r?-1:1;else if(L=z(k,
c,true))return f<=H(L)?-1:1;else if(L=z(c,k,true))return H(L)<r?-1:1;else{f=I(c,k);c=c===f?f:z(c,f,true);k=k===f?f:z(k,f,true);if(c===k)throw Error("comparePoints got to case 4 and childA and childB are the same!");else{for(f=f.firstChild;f;){if(f===c)return-1;else if(f===k)return 1;f=f.nextSibling}throw Error("Should not be here!");}}},inspectNode:i,fragmentFromNodeChildren:function(c){for(var f=O(c).createDocumentFragment(),k;k=c.firstChild;)f.appendChild(k);return f},createIterator:function(c){return new n(c)},
DomPosition:t};l.DOMException=x});
rangy.createModule("DomRange",function(l){function K(a,e){return a.nodeType!=3&&(g.isAncestorOf(a,e.startContainer,true)||g.isAncestorOf(a,e.endContainer,true))}function H(a){return g.getDocument(a.startContainer)}function I(a,e,j){if(e=a._listeners[e])for(var o=0,E=e.length;o<E;++o)e[o].call(a,{target:a,args:j})}function z(a){return new Z(a.parentNode,g.getNodeIndex(a))}function C(a){return new Z(a.parentNode,g.getNodeIndex(a)+1)}function N(a,e,j){var o=a.nodeType==11?a.firstChild:a;if(g.isCharacterDataNode(e))j==
e.length?g.insertAfter(a,e):e.parentNode.insertBefore(a,j==0?e:g.splitDataNode(e,j));else j>=e.childNodes.length?e.appendChild(a):e.insertBefore(a,e.childNodes[j]);return o}function O(a){for(var e,j,o=H(a.range).createDocumentFragment();j=a.next();){e=a.isPartiallySelectedSubtree();j=j.cloneNode(!e);if(e){e=a.getSubtreeIterator();j.appendChild(O(e));e.detach(true)}if(j.nodeType==10)throw new S("HIERARCHY_REQUEST_ERR");o.appendChild(j)}return o}function i(a,e,j){var o,E;for(j=j||{stop:false};o=a.next();)if(a.isPartiallySelectedSubtree())if(e(o)===
false){j.stop=true;return}else{o=a.getSubtreeIterator();i(o,e,j);o.detach(true);if(j.stop)return}else for(o=g.createIterator(o);E=o.next();)if(e(E)===false){j.stop=true;return}}function n(a){for(var e;a.next();)if(a.isPartiallySelectedSubtree()){e=a.getSubtreeIterator();n(e);e.detach(true)}else a.remove()}function t(a){for(var e,j=H(a.range).createDocumentFragment(),o;e=a.next();){if(a.isPartiallySelectedSubtree()){e=e.cloneNode(false);o=a.getSubtreeIterator();e.appendChild(t(o));o.detach(true)}else a.remove();
if(e.nodeType==10)throw new S("HIERARCHY_REQUEST_ERR");j.appendChild(e)}return j}function x(a,e,j){var o=!!(e&&e.length),E,T=!!j;if(o)E=RegExp("^("+e.join("|")+")$");var m=[];i(new q(a,false),function(s){if((!o||E.test(s.nodeType))&&(!T||j(s)))m.push(s)});return m}function A(a){return"["+(typeof a.getName=="undefined"?"Range":a.getName())+"("+g.inspectNode(a.startContainer)+":"+a.startOffset+", "+g.inspectNode(a.endContainer)+":"+a.endOffset+")]"}function q(a,e){this.range=a;this.clonePartiallySelectedTextNodes=
e;if(!a.collapsed){this.sc=a.startContainer;this.so=a.startOffset;this.ec=a.endContainer;this.eo=a.endOffset;var j=a.commonAncestorContainer;if(this.sc===this.ec&&g.isCharacterDataNode(this.sc)){this.isSingleCharacterDataNode=true;this._first=this._last=this._next=this.sc}else{this._first=this._next=this.sc===j&&!g.isCharacterDataNode(this.sc)?this.sc.childNodes[this.so]:g.getClosestAncestorIn(this.sc,j,true);this._last=this.ec===j&&!g.isCharacterDataNode(this.ec)?this.ec.childNodes[this.eo-1]:g.getClosestAncestorIn(this.ec,
j,true)}}}function v(a){this.code=this[a];this.codeName=a;this.message="RangeException: "+this.codeName}function c(a,e,j){this.nodes=x(a,e,j);this._next=this.nodes[0];this._position=0}function f(a){return function(e,j){for(var o,E=j?e:e.parentNode;E;){o=E.nodeType;if(g.arrayContains(a,o))return E;E=E.parentNode}return null}}function k(a,e){if(G(a,e))throw new v("INVALID_NODE_TYPE_ERR");}function r(a){if(!a.startContainer)throw new S("INVALID_STATE_ERR");}function L(a,e){if(!g.arrayContains(e,a.nodeType))throw new v("INVALID_NODE_TYPE_ERR");
}function p(a,e){if(e<0||e>(g.isCharacterDataNode(a)?a.length:a.childNodes.length))throw new S("INDEX_SIZE_ERR");}function u(a,e){if(h(a,true)!==h(e,true))throw new S("WRONG_DOCUMENT_ERR");}function w(a){if(D(a,true))throw new S("NO_MODIFICATION_ALLOWED_ERR");}function B(a,e){if(!a)throw new S(e);}function V(a){return!!a.startContainer&&!!a.endContainer&&!(!g.arrayContains(ba,a.startContainer.nodeType)&&!h(a.startContainer,true))&&!(!g.arrayContains(ba,a.endContainer.nodeType)&&!h(a.endContainer,
true))&&a.startOffset<=(g.isCharacterDataNode(a.startContainer)?a.startContainer.length:a.startContainer.childNodes.length)&&a.endOffset<=(g.isCharacterDataNode(a.endContainer)?a.endContainer.length:a.endContainer.childNodes.length)}function J(a){r(a);if(!V(a))throw Error("Range error: Range is no longer valid after DOM mutation ("+a.inspect()+")");}function ca(){}function Y(a){a.START_TO_START=ia;a.START_TO_END=la;a.END_TO_END=ra;a.END_TO_START=ma;a.NODE_BEFORE=na;a.NODE_AFTER=oa;a.NODE_BEFORE_AND_AFTER=
pa;a.NODE_INSIDE=ja}function W(a){Y(a);Y(a.prototype)}function da(a,e){return function(){J(this);var j=this.startContainer,o=this.startOffset,E=this.commonAncestorContainer,T=new q(this,true);if(j!==E){j=g.getClosestAncestorIn(j,E,true);o=C(j);j=o.node;o=o.offset}i(T,w);T.reset();E=a(T);T.detach();e(this,j,o,j,o);return E}}function fa(a,e,j){function o(m,s){return function(y){r(this);L(y,$);L(d(y),ba);y=(m?z:C)(y);(s?E:T)(this,y.node,y.offset)}}function E(m,s,y){var F=m.endContainer,Q=m.endOffset;
if(s!==m.startContainer||y!==m.startOffset){if(d(s)!=d(F)||g.comparePoints(s,y,F,Q)==1){F=s;Q=y}e(m,s,y,F,Q)}}function T(m,s,y){var F=m.startContainer,Q=m.startOffset;if(s!==m.endContainer||y!==m.endOffset){if(d(s)!=d(F)||g.comparePoints(s,y,F,Q)==-1){F=s;Q=y}e(m,F,Q,s,y)}}a.prototype=new ca;l.util.extend(a.prototype,{setStart:function(m,s){r(this);k(m,true);p(m,s);E(this,m,s)},setEnd:function(m,s){r(this);k(m,true);p(m,s);T(this,m,s)},setStartBefore:o(true,true),setStartAfter:o(false,true),setEndBefore:o(true,
false),setEndAfter:o(false,false),collapse:function(m){J(this);m?e(this,this.startContainer,this.startOffset,this.startContainer,this.startOffset):e(this,this.endContainer,this.endOffset,this.endContainer,this.endOffset)},selectNodeContents:function(m){r(this);k(m,true);e(this,m,0,m,g.getNodeLength(m))},selectNode:function(m){r(this);k(m,false);L(m,$);var s=z(m);m=C(m);e(this,s.node,s.offset,m.node,m.offset)},extractContents:da(t,e),deleteContents:da(n,e),canSurroundContents:function(){J(this);w(this.startContainer);
w(this.endContainer);var m=new q(this,true),s=m._first&&K(m._first,this)||m._last&&K(m._last,this);m.detach();return!s},detach:function(){j(this)},splitBoundaries:function(){J(this);var m=this.startContainer,s=this.startOffset,y=this.endContainer,F=this.endOffset,Q=m===y;g.isCharacterDataNode(y)&&F>0&&F<y.length&&g.splitDataNode(y,F);if(g.isCharacterDataNode(m)&&s>0&&s<m.length){m=g.splitDataNode(m,s);if(Q){F-=s;y=m}else y==m.parentNode&&F>=g.getNodeIndex(m)&&F++;s=0}e(this,m,s,y,F)},normalizeBoundaries:function(){J(this);
var m=this.startContainer,s=this.startOffset,y=this.endContainer,F=this.endOffset,Q=function(U){var R=U.nextSibling;if(R&&R.nodeType==U.nodeType){y=U;F=U.length;U.appendData(R.data);R.parentNode.removeChild(R)}},qa=function(U){var R=U.previousSibling;if(R&&R.nodeType==U.nodeType){m=U;var sa=U.length;s=R.length;U.insertData(0,R.data);R.parentNode.removeChild(R);if(m==y){F+=s;y=m}else if(y==U.parentNode){R=g.getNodeIndex(U);if(F==R){y=U;F=sa}else F>R&&F--}}},ga=true;if(g.isCharacterDataNode(y))y.length==
F&&Q(y);else{if(F>0)(ga=y.childNodes[F-1])&&g.isCharacterDataNode(ga)&&Q(ga);ga=!this.collapsed}if(ga)if(g.isCharacterDataNode(m))s==0&&qa(m);else{if(s<m.childNodes.length)(Q=m.childNodes[s])&&g.isCharacterDataNode(Q)&&qa(Q)}else{m=y;s=F}e(this,m,s,y,F)},collapseToPoint:function(m,s){r(this);k(m,true);p(m,s);if(m!==this.startContainer||s!==this.startOffset||m!==this.endContainer||s!==this.endOffset)e(this,m,s,m,s)}});W(a)}function ea(a){a.collapsed=a.startContainer===a.endContainer&&a.startOffset===
a.endOffset;a.commonAncestorContainer=a.collapsed?a.startContainer:g.getCommonAncestor(a.startContainer,a.endContainer)}function ha(a,e,j,o,E){var T=a.startContainer!==e||a.startOffset!==j,m=a.endContainer!==o||a.endOffset!==E;a.startContainer=e;a.startOffset=j;a.endContainer=o;a.endOffset=E;ea(a);I(a,"boundarychange",{startMoved:T,endMoved:m})}function M(a){this.startContainer=a;this.startOffset=0;this.endContainer=a;this.endOffset=0;this._listeners={boundarychange:[],detach:[]};ea(this)}l.requireModules(["DomUtil"]);
var g=l.dom,Z=g.DomPosition,S=l.DOMException;q.prototype={_current:null,_next:null,_first:null,_last:null,isSingleCharacterDataNode:false,reset:function(){this._current=null;this._next=this._first},hasNext:function(){return!!this._next},next:function(){var a=this._current=this._next;if(a){this._next=a!==this._last?a.nextSibling:null;if(g.isCharacterDataNode(a)&&this.clonePartiallySelectedTextNodes){if(a===this.ec)(a=a.cloneNode(true)).deleteData(this.eo,a.length-this.eo);if(this._current===this.sc)(a=
a.cloneNode(true)).deleteData(0,this.so)}}return a},remove:function(){var a=this._current,e,j;if(g.isCharacterDataNode(a)&&(a===this.sc||a===this.ec)){e=a===this.sc?this.so:0;j=a===this.ec?this.eo:a.length;e!=j&&a.deleteData(e,j-e)}else a.parentNode&&a.parentNode.removeChild(a)},isPartiallySelectedSubtree:function(){return K(this._current,this.range)},getSubtreeIterator:function(){var a;if(this.isSingleCharacterDataNode){a=this.range.cloneRange();a.collapse()}else{a=new M(H(this.range));var e=this._current,
j=e,o=0,E=e,T=g.getNodeLength(e);if(g.isAncestorOf(e,this.sc,true)){j=this.sc;o=this.so}if(g.isAncestorOf(e,this.ec,true)){E=this.ec;T=this.eo}ha(a,j,o,E,T)}return new q(a,this.clonePartiallySelectedTextNodes)},detach:function(a){a&&this.range.detach();this.range=this._current=this._next=this._first=this._last=this.sc=this.so=this.ec=this.eo=null}};v.prototype={BAD_BOUNDARYPOINTS_ERR:1,INVALID_NODE_TYPE_ERR:2};v.prototype.toString=function(){return this.message};c.prototype={_current:null,hasNext:function(){return!!this._next},
next:function(){this._current=this._next;this._next=this.nodes[++this._position];return this._current},detach:function(){this._current=this._next=this.nodes=null}};var $=[1,3,4,5,7,8,10],ba=[2,9,11],aa=[1,3,4,5,7,8,10,11],b=[1,3,4,5,7,8],d=g.getRootContainer,h=f([9,11]),D=f([5,6,10,12]),G=f([6,10,12]),P=document.createElement("style"),X=false;try{P.innerHTML="<b>x</b>";X=P.firstChild.nodeType==3}catch(ta){}l.features.htmlParsingConforms=X;var ka=["startContainer","startOffset","endContainer","endOffset",
"collapsed","commonAncestorContainer"],ia=0,la=1,ra=2,ma=3,na=0,oa=1,pa=2,ja=3;ca.prototype={attachListener:function(a,e){this._listeners[a].push(e)},compareBoundaryPoints:function(a,e){J(this);u(this.startContainer,e.startContainer);var j=a==ma||a==ia?"start":"end",o=a==la||a==ia?"start":"end";return g.comparePoints(this[j+"Container"],this[j+"Offset"],e[o+"Container"],e[o+"Offset"])},insertNode:function(a){J(this);L(a,aa);w(this.startContainer);if(g.isAncestorOf(a,this.startContainer,true))throw new S("HIERARCHY_REQUEST_ERR");
this.setStartBefore(N(a,this.startContainer,this.startOffset))},cloneContents:function(){J(this);var a,e;if(this.collapsed)return H(this).createDocumentFragment();else{if(this.startContainer===this.endContainer&&g.isCharacterDataNode(this.startContainer)){a=this.startContainer.cloneNode(true);a.data=a.data.slice(this.startOffset,this.endOffset);e=H(this).createDocumentFragment();e.appendChild(a);return e}else{e=new q(this,true);a=O(e);e.detach()}return a}},canSurroundContents:function(){J(this);w(this.startContainer);
w(this.endContainer);var a=new q(this,true),e=a._first&&K(a._first,this)||a._last&&K(a._last,this);a.detach();return!e},surroundContents:function(a){L(a,b);if(!this.canSurroundContents())throw new v("BAD_BOUNDARYPOINTS_ERR");var e=this.extractContents();if(a.hasChildNodes())for(;a.lastChild;)a.removeChild(a.lastChild);N(a,this.startContainer,this.startOffset);a.appendChild(e);this.selectNode(a)},cloneRange:function(){J(this);for(var a=new M(H(this)),e=ka.length,j;e--;){j=ka[e];a[j]=this[j]}return a},
toString:function(){J(this);var a=this.startContainer;if(a===this.endContainer&&g.isCharacterDataNode(a))return a.nodeType==3||a.nodeType==4?a.data.slice(this.startOffset,this.endOffset):"";else{var e=[];a=new q(this,true);i(a,function(j){if(j.nodeType==3||j.nodeType==4)e.push(j.data)});a.detach();return e.join("")}},compareNode:function(a){J(this);var e=a.parentNode,j=g.getNodeIndex(a);if(!e)throw new S("NOT_FOUND_ERR");a=this.comparePoint(e,j);e=this.comparePoint(e,j+1);return a<0?e>0?pa:na:e>0?
oa:ja},comparePoint:function(a,e){J(this);B(a,"HIERARCHY_REQUEST_ERR");u(a,this.startContainer);if(g.comparePoints(a,e,this.startContainer,this.startOffset)<0)return-1;else if(g.comparePoints(a,e,this.endContainer,this.endOffset)>0)return 1;return 0},createContextualFragment:X?function(a){var e=this.startContainer,j=g.getDocument(e);if(!e)throw new S("INVALID_STATE_ERR");var o=null;if(e.nodeType==1)o=e;else if(g.isCharacterDataNode(e))o=g.parentElement(e);o=o===null||o.nodeName=="HTML"&&g.isHtmlNamespace(g.getDocument(o).documentElement)&&
g.isHtmlNamespace(o)?j.createElement("body"):o.cloneNode(false);o.innerHTML=a;return g.fragmentFromNodeChildren(o)}:function(a){r(this);var e=H(this).createElement("body");e.innerHTML=a;return g.fragmentFromNodeChildren(e)},toHtml:function(){J(this);var a=H(this).createElement("div");a.appendChild(this.cloneContents());return a.innerHTML},intersectsNode:function(a,e){J(this);B(a,"NOT_FOUND_ERR");if(g.getDocument(a)!==H(this))return false;var j=a.parentNode,o=g.getNodeIndex(a);B(j,"NOT_FOUND_ERR");
var E=g.comparePoints(j,o,this.endContainer,this.endOffset);j=g.comparePoints(j,o+1,this.startContainer,this.startOffset);return e?E<=0&&j>=0:E<0&&j>0},isPointInRange:function(a,e){J(this);B(a,"HIERARCHY_REQUEST_ERR");u(a,this.startContainer);return g.comparePoints(a,e,this.startContainer,this.startOffset)>=0&&g.comparePoints(a,e,this.endContainer,this.endOffset)<=0},intersectsRange:function(a,e){J(this);if(H(a)!=H(this))throw new S("WRONG_DOCUMENT_ERR");var j=g.comparePoints(this.startContainer,
this.startOffset,a.endContainer,a.endOffset),o=g.comparePoints(this.endContainer,this.endOffset,a.startContainer,a.startOffset);return e?j<=0&&o>=0:j<0&&o>0},intersection:function(a){if(this.intersectsRange(a)){var e=g.comparePoints(this.startContainer,this.startOffset,a.startContainer,a.startOffset),j=g.comparePoints(this.endContainer,this.endOffset,a.endContainer,a.endOffset),o=this.cloneRange();e==-1&&o.setStart(a.startContainer,a.startOffset);j==1&&o.setEnd(a.endContainer,a.endOffset);return o}return null},
union:function(a){if(this.intersectsRange(a,true)){var e=this.cloneRange();g.comparePoints(a.startContainer,a.startOffset,this.startContainer,this.startOffset)==-1&&e.setStart(a.startContainer,a.startOffset);g.comparePoints(a.endContainer,a.endOffset,this.endContainer,this.endOffset)==1&&e.setEnd(a.endContainer,a.endOffset);return e}else throw new v("Ranges do not intersect");},containsNode:function(a,e){return e?this.intersectsNode(a,false):this.compareNode(a)==ja},containsNodeContents:function(a){return this.comparePoint(a,
0)>=0&&this.comparePoint(a,g.getNodeLength(a))<=0},containsRange:function(a){return this.intersection(a).equals(a)},containsNodeText:function(a){var e=this.cloneRange();e.selectNode(a);var j=e.getNodes([3]);if(j.length>0){e.setStart(j[0],0);a=j.pop();e.setEnd(a,a.length);a=this.containsRange(e);e.detach();return a}else return this.containsNodeContents(a)},createNodeIterator:function(a,e){J(this);return new c(this,a,e)},getNodes:function(a,e){J(this);return x(this,a,e)},getDocument:function(){return H(this)},
collapseBefore:function(a){r(this);this.setEndBefore(a);this.collapse(false)},collapseAfter:function(a){r(this);this.setStartAfter(a);this.collapse(true)},getName:function(){return"DomRange"},equals:function(a){return M.rangesEqual(this,a)},isValid:function(){return V(this)},inspect:function(){return A(this)}};fa(M,ha,function(a){r(a);a.startContainer=a.startOffset=a.endContainer=a.endOffset=null;a.collapsed=a.commonAncestorContainer=null;I(a,"detach",null);a._listeners=null});l.rangePrototype=ca.prototype;
M.rangeProperties=ka;M.RangeIterator=q;M.copyComparisonConstants=W;M.createPrototypeRange=fa;M.inspect=A;M.getRangeDocument=H;M.rangesEqual=function(a,e){return a.startContainer===e.startContainer&&a.startOffset===e.startOffset&&a.endContainer===e.endContainer&&a.endOffset===e.endOffset};l.DomRange=M;l.RangeException=v});
rangy.createModule("WrappedRange",function(l){function K(i,n,t,x){var A=i.duplicate();A.collapse(t);var q=A.parentElement();z.isAncestorOf(n,q,true)||(q=n);if(!q.canHaveHTML)return new C(q.parentNode,z.getNodeIndex(q));n=z.getDocument(q).createElement("span");var v,c=t?"StartToStart":"StartToEnd";do{q.insertBefore(n,n.previousSibling);A.moveToElementText(n)}while((v=A.compareEndPoints(c,i))>0&&n.previousSibling);c=n.nextSibling;if(v==-1&&c&&z.isCharacterDataNode(c)){A.setEndPoint(t?"EndToStart":"EndToEnd",
i);if(/[\r\n]/.test(c.data)){q=A.duplicate();t=q.text.replace(/\r\n/g,"\r").length;for(t=q.moveStart("character",t);q.compareEndPoints("StartToEnd",q)==-1;){t++;q.moveStart("character",1)}}else t=A.text.length;q=new C(c,t)}else{c=(x||!t)&&n.previousSibling;q=(t=(x||t)&&n.nextSibling)&&z.isCharacterDataNode(t)?new C(t,0):c&&z.isCharacterDataNode(c)?new C(c,c.length):new C(q,z.getNodeIndex(n))}n.parentNode.removeChild(n);return q}function H(i,n){var t,x,A=i.offset,q=z.getDocument(i.node),v=q.body.createTextRange(),
c=z.isCharacterDataNode(i.node);if(c){t=i.node;x=t.parentNode}else{t=i.node.childNodes;t=A<t.length?t[A]:null;x=i.node}q=q.createElement("span");q.innerHTML="&#feff;";t?x.insertBefore(q,t):x.appendChild(q);v.moveToElementText(q);v.collapse(!n);x.removeChild(q);if(c)v[n?"moveStart":"moveEnd"]("character",A);return v}l.requireModules(["DomUtil","DomRange"]);var I,z=l.dom,C=z.DomPosition,N=l.DomRange;if(l.features.implementsDomRange&&(!l.features.implementsTextRange||!l.config.preferTextRange)){(function(){function i(f){for(var k=
t.length,r;k--;){r=t[k];f[r]=f.nativeRange[r]}}var n,t=N.rangeProperties,x,A;I=function(f){if(!f)throw Error("Range must be specified");this.nativeRange=f;i(this)};N.createPrototypeRange(I,function(f,k,r,L,p){var u=f.endContainer!==L||f.endOffset!=p;if(f.startContainer!==k||f.startOffset!=r||u){f.setEnd(L,p);f.setStart(k,r)}},function(f){f.nativeRange.detach();f.detached=true;for(var k=t.length,r;k--;){r=t[k];f[r]=null}});n=I.prototype;n.selectNode=function(f){this.nativeRange.selectNode(f);i(this)};
n.deleteContents=function(){this.nativeRange.deleteContents();i(this)};n.extractContents=function(){var f=this.nativeRange.extractContents();i(this);return f};n.cloneContents=function(){return this.nativeRange.cloneContents()};n.surroundContents=function(f){this.nativeRange.surroundContents(f);i(this)};n.collapse=function(f){this.nativeRange.collapse(f);i(this)};n.cloneRange=function(){return new I(this.nativeRange.cloneRange())};n.refresh=function(){i(this)};n.toString=function(){return this.nativeRange.toString()};
var q=document.createTextNode("test");z.getBody(document).appendChild(q);var v=document.createRange();v.setStart(q,0);v.setEnd(q,0);try{v.setStart(q,1);x=true;n.setStart=function(f,k){this.nativeRange.setStart(f,k);i(this)};n.setEnd=function(f,k){this.nativeRange.setEnd(f,k);i(this)};A=function(f){return function(k){this.nativeRange[f](k);i(this)}}}catch(c){x=false;n.setStart=function(f,k){try{this.nativeRange.setStart(f,k)}catch(r){this.nativeRange.setEnd(f,k);this.nativeRange.setStart(f,k)}i(this)};
n.setEnd=function(f,k){try{this.nativeRange.setEnd(f,k)}catch(r){this.nativeRange.setStart(f,k);this.nativeRange.setEnd(f,k)}i(this)};A=function(f,k){return function(r){try{this.nativeRange[f](r)}catch(L){this.nativeRange[k](r);this.nativeRange[f](r)}i(this)}}}n.setStartBefore=A("setStartBefore","setEndBefore");n.setStartAfter=A("setStartAfter","setEndAfter");n.setEndBefore=A("setEndBefore","setStartBefore");n.setEndAfter=A("setEndAfter","setStartAfter");v.selectNodeContents(q);n.selectNodeContents=
v.startContainer==q&&v.endContainer==q&&v.startOffset==0&&v.endOffset==q.length?function(f){this.nativeRange.selectNodeContents(f);i(this)}:function(f){this.setStart(f,0);this.setEnd(f,N.getEndOffset(f))};v.selectNodeContents(q);v.setEnd(q,3);x=document.createRange();x.selectNodeContents(q);x.setEnd(q,4);x.setStart(q,2);n.compareBoundaryPoints=v.compareBoundaryPoints(v.START_TO_END,x)==-1&v.compareBoundaryPoints(v.END_TO_START,x)==1?function(f,k){k=k.nativeRange||k;if(f==k.START_TO_END)f=k.END_TO_START;
else if(f==k.END_TO_START)f=k.START_TO_END;return this.nativeRange.compareBoundaryPoints(f,k)}:function(f,k){return this.nativeRange.compareBoundaryPoints(f,k.nativeRange||k)};if(l.util.isHostMethod(v,"createContextualFragment"))n.createContextualFragment=function(f){return this.nativeRange.createContextualFragment(f)};z.getBody(document).removeChild(q);v.detach();x.detach()})();l.createNativeRange=function(i){i=i||document;return i.createRange()}}else if(l.features.implementsTextRange){I=function(i){this.textRange=
i;this.refresh()};I.prototype=new N(document);I.prototype.refresh=function(){var i,n,t=this.textRange;i=t.parentElement();var x=t.duplicate();x.collapse(true);n=x.parentElement();x=t.duplicate();x.collapse(false);t=x.parentElement();n=n==t?n:z.getCommonAncestor(n,t);n=n==i?n:z.getCommonAncestor(i,n);if(this.textRange.compareEndPoints("StartToEnd",this.textRange)==0)n=i=K(this.textRange,n,true,true);else{i=K(this.textRange,n,true,false);n=K(this.textRange,n,false,false)}this.setStart(i.node,i.offset);
this.setEnd(n.node,n.offset)};N.copyComparisonConstants(I);var O=function(){return this}();if(typeof O.Range=="undefined")O.Range=I;l.createNativeRange=function(i){i=i||document;return i.body.createTextRange()}}if(l.features.implementsTextRange)I.rangeToTextRange=function(i){if(i.collapsed)return H(new C(i.startContainer,i.startOffset),true);else{var n=H(new C(i.startContainer,i.startOffset),true),t=H(new C(i.endContainer,i.endOffset),false);i=z.getDocument(i.startContainer).body.createTextRange();
i.setEndPoint("StartToStart",n);i.setEndPoint("EndToEnd",t);return i}};I.prototype.getName=function(){return"WrappedRange"};l.WrappedRange=I;l.createRange=function(i){i=i||document;return new I(l.createNativeRange(i))};l.createRangyRange=function(i){i=i||document;return new N(i)};l.createIframeRange=function(i){return l.createRange(z.getIframeDocument(i))};l.createIframeRangyRange=function(i){return l.createRangyRange(z.getIframeDocument(i))};l.addCreateMissingNativeApiListener(function(i){i=i.document;
if(typeof i.createRange=="undefined")i.createRange=function(){return l.createRange(this)};i=i=null})});
rangy.createModule("WrappedSelection",function(l,K){function H(b){return(b||window).getSelection()}function I(b){return(b||window).document.selection}function z(b,d,h){var D=h?"end":"start";h=h?"start":"end";b.anchorNode=d[D+"Container"];b.anchorOffset=d[D+"Offset"];b.focusNode=d[h+"Container"];b.focusOffset=d[h+"Offset"]}function C(b){b.anchorNode=b.focusNode=null;b.anchorOffset=b.focusOffset=0;b.rangeCount=0;b.isCollapsed=true;b._ranges.length=0}function N(b){var d;if(b instanceof k){d=b._selectionNativeRange;
if(!d){d=l.createNativeRange(c.getDocument(b.startContainer));d.setEnd(b.endContainer,b.endOffset);d.setStart(b.startContainer,b.startOffset);b._selectionNativeRange=d;b.attachListener("detach",function(){this._selectionNativeRange=null})}}else if(b instanceof r)d=b.nativeRange;else if(l.features.implementsDomRange&&b instanceof c.getWindow(b.startContainer).Range)d=b;return d}function O(b){var d=b.getNodes(),h;a:if(!d.length||d[0].nodeType!=1)h=false;else{h=1;for(var D=d.length;h<D;++h)if(!c.isAncestorOf(d[0],
d[h])){h=false;break a}h=true}if(!h)throw Error("getSingleElementFromRange: range "+b.inspect()+" did not consist of a single element");return d[0]}function i(b,d){var h=new r(d);b._ranges=[h];z(b,h,false);b.rangeCount=1;b.isCollapsed=h.collapsed}function n(b){b._ranges.length=0;if(b.docSelection.type=="None")C(b);else{var d=b.docSelection.createRange();if(d&&typeof d.text!="undefined")i(b,d);else{b.rangeCount=d.length;for(var h,D=c.getDocument(d.item(0)),G=0;G<b.rangeCount;++G){h=l.createRange(D);
h.selectNode(d.item(G));b._ranges.push(h)}b.isCollapsed=b.rangeCount==1&&b._ranges[0].collapsed;z(b,b._ranges[b.rangeCount-1],false)}}}function t(b,d){var h=b.docSelection.createRange(),D=O(d),G=c.getDocument(h.item(0));G=c.getBody(G).createControlRange();for(var P=0,X=h.length;P<X;++P)G.add(h.item(P));try{G.add(D)}catch(ta){throw Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");}G.select();n(b)}function x(b,d,h){this.nativeSelection=
b;this.docSelection=d;this._ranges=[];this.win=h;this.refresh()}function A(b,d){var h=c.getDocument(d[0].startContainer);h=c.getBody(h).createControlRange();for(var D=0,G;D<rangeCount;++D){G=O(d[D]);try{h.add(G)}catch(P){throw Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)");}}h.select();n(b)}function q(b,d){if(b.anchorNode&&c.getDocument(b.anchorNode)!==c.getDocument(d))throw new L("WRONG_DOCUMENT_ERR");}function v(b){var d=
[],h=new p(b.anchorNode,b.anchorOffset),D=new p(b.focusNode,b.focusOffset),G=typeof b.getName=="function"?b.getName():"Selection";if(typeof b.rangeCount!="undefined")for(var P=0,X=b.rangeCount;P<X;++P)d[P]=k.inspect(b.getRangeAt(P));return"["+G+"(Ranges: "+d.join(", ")+")(anchor: "+h.inspect()+", focus: "+D.inspect()+"]"}l.requireModules(["DomUtil","DomRange","WrappedRange"]);l.config.checkSelectionRanges=true;var c=l.dom,f=l.util,k=l.DomRange,r=l.WrappedRange,L=l.DOMException,p=c.DomPosition,u,w,
B=l.util.isHostMethod(window,"getSelection"),V=l.util.isHostObject(document,"selection"),J=V&&(!B||l.config.preferTextRange);if(J){u=I;l.isSelectionValid=function(b){b=(b||window).document;var d=b.selection;return d.type!="None"||c.getDocument(d.createRange().parentElement())==b}}else if(B){u=H;l.isSelectionValid=function(){return true}}else K.fail("Neither document.selection or window.getSelection() detected.");l.getNativeSelection=u;B=u();var ca=l.createNativeRange(document),Y=c.getBody(document),
W=f.areHostObjects(B,f.areHostProperties(B,["anchorOffset","focusOffset"]));l.features.selectionHasAnchorAndFocus=W;var da=f.isHostMethod(B,"extend");l.features.selectionHasExtend=da;var fa=typeof B.rangeCount=="number";l.features.selectionHasRangeCount=fa;var ea=false,ha=true;f.areHostMethods(B,["addRange","getRangeAt","removeAllRanges"])&&typeof B.rangeCount=="number"&&l.features.implementsDomRange&&function(){var b=document.createElement("iframe");b.frameBorder=0;b.style.position="absolute";b.style.left=
"-10000px";Y.appendChild(b);var d=c.getIframeDocument(b);d.open();d.write("<html><head></head><body>12</body></html>");d.close();var h=c.getIframeWindow(b).getSelection(),D=d.documentElement.lastChild.firstChild;d=d.createRange();d.setStart(D,1);d.collapse(true);h.addRange(d);ha=h.rangeCount==1;h.removeAllRanges();var G=d.cloneRange();d.setStart(D,0);G.setEnd(D,2);h.addRange(d);h.addRange(G);ea=h.rangeCount==2;d.detach();G.detach();Y.removeChild(b)}();l.features.selectionSupportsMultipleRanges=ea;
l.features.collapsedNonEditableSelectionsSupported=ha;var M=false,g;if(Y&&f.isHostMethod(Y,"createControlRange")){g=Y.createControlRange();if(f.areHostProperties(g,["item","add"]))M=true}l.features.implementsControlRange=M;w=W?function(b){return b.anchorNode===b.focusNode&&b.anchorOffset===b.focusOffset}:function(b){return b.rangeCount?b.getRangeAt(b.rangeCount-1).collapsed:false};var Z;if(f.isHostMethod(B,"getRangeAt"))Z=function(b,d){try{return b.getRangeAt(d)}catch(h){return null}};else if(W)Z=
function(b){var d=c.getDocument(b.anchorNode);d=l.createRange(d);d.setStart(b.anchorNode,b.anchorOffset);d.setEnd(b.focusNode,b.focusOffset);if(d.collapsed!==this.isCollapsed){d.setStart(b.focusNode,b.focusOffset);d.setEnd(b.anchorNode,b.anchorOffset)}return d};l.getSelection=function(b){b=b||window;var d=b._rangySelection,h=u(b),D=V?I(b):null;if(d){d.nativeSelection=h;d.docSelection=D;d.refresh(b)}else{d=new x(h,D,b);b._rangySelection=d}return d};l.getIframeSelection=function(b){return l.getSelection(c.getIframeWindow(b))};
g=x.prototype;if(!J&&W&&f.areHostMethods(B,["removeAllRanges","addRange"])){g.removeAllRanges=function(){this.nativeSelection.removeAllRanges();C(this)};var S=function(b,d){var h=k.getRangeDocument(d);h=l.createRange(h);h.collapseToPoint(d.endContainer,d.endOffset);b.nativeSelection.addRange(N(h));b.nativeSelection.extend(d.startContainer,d.startOffset);b.refresh()};g.addRange=fa?function(b,d){if(M&&V&&this.docSelection.type=="Control")t(this,b);else if(d&&da)S(this,b);else{var h;if(ea)h=this.rangeCount;
else{this.removeAllRanges();h=0}this.nativeSelection.addRange(N(b));this.rangeCount=this.nativeSelection.rangeCount;if(this.rangeCount==h+1){if(l.config.checkSelectionRanges)if((h=Z(this.nativeSelection,this.rangeCount-1))&&!k.rangesEqual(h,b))b=new r(h);this._ranges[this.rangeCount-1]=b;z(this,b,aa(this.nativeSelection));this.isCollapsed=w(this)}else this.refresh()}}:function(b,d){if(d&&da)S(this,b);else{this.nativeSelection.addRange(N(b));this.refresh()}};g.setRanges=function(b){if(M&&b.length>
1)A(this,b);else{this.removeAllRanges();for(var d=0,h=b.length;d<h;++d)this.addRange(b[d])}}}else if(f.isHostMethod(B,"empty")&&f.isHostMethod(ca,"select")&&M&&J){g.removeAllRanges=function(){try{this.docSelection.empty();if(this.docSelection.type!="None"){var b;if(this.anchorNode)b=c.getDocument(this.anchorNode);else if(this.docSelection.type=="Control"){var d=this.docSelection.createRange();if(d.length)b=c.getDocument(d.item(0)).body.createTextRange()}if(b){b.body.createTextRange().select();this.docSelection.empty()}}}catch(h){}C(this)};
g.addRange=function(b){if(this.docSelection.type=="Control")t(this,b);else{r.rangeToTextRange(b).select();this._ranges[0]=b;this.rangeCount=1;this.isCollapsed=this._ranges[0].collapsed;z(this,b,false)}};g.setRanges=function(b){this.removeAllRanges();var d=b.length;if(d>1)A(this,b);else d&&this.addRange(b[0])}}else{K.fail("No means of selecting a Range or TextRange was found");return false}g.getRangeAt=function(b){if(b<0||b>=this.rangeCount)throw new L("INDEX_SIZE_ERR");else return this._ranges[b]};
var $;if(J)$=function(b){var d;if(l.isSelectionValid(b.win))d=b.docSelection.createRange();else{d=c.getBody(b.win.document).createTextRange();d.collapse(true)}if(b.docSelection.type=="Control")n(b);else d&&typeof d.text!="undefined"?i(b,d):C(b)};else if(f.isHostMethod(B,"getRangeAt")&&typeof B.rangeCount=="number")$=function(b){if(M&&V&&b.docSelection.type=="Control")n(b);else{b._ranges.length=b.rangeCount=b.nativeSelection.rangeCount;if(b.rangeCount){for(var d=0,h=b.rangeCount;d<h;++d)b._ranges[d]=
new l.WrappedRange(b.nativeSelection.getRangeAt(d));z(b,b._ranges[b.rangeCount-1],aa(b.nativeSelection));b.isCollapsed=w(b)}else C(b)}};else if(W&&typeof B.isCollapsed=="boolean"&&typeof ca.collapsed=="boolean"&&l.features.implementsDomRange)$=function(b){var d;d=b.nativeSelection;if(d.anchorNode){d=Z(d,0);b._ranges=[d];b.rangeCount=1;d=b.nativeSelection;b.anchorNode=d.anchorNode;b.anchorOffset=d.anchorOffset;b.focusNode=d.focusNode;b.focusOffset=d.focusOffset;b.isCollapsed=w(b)}else C(b)};else{K.fail("No means of obtaining a Range or TextRange from the user's selection was found");
return false}g.refresh=function(b){var d=b?this._ranges.slice(0):null;$(this);if(b){b=d.length;if(b!=this._ranges.length)return false;for(;b--;)if(!k.rangesEqual(d[b],this._ranges[b]))return false;return true}};var ba=function(b,d){var h=b.getAllRanges(),D=false;b.removeAllRanges();for(var G=0,P=h.length;G<P;++G)if(D||d!==h[G])b.addRange(h[G]);else D=true;b.rangeCount||C(b)};g.removeRange=M?function(b){if(this.docSelection.type=="Control"){var d=this.docSelection.createRange();b=O(b);var h=c.getDocument(d.item(0));
h=c.getBody(h).createControlRange();for(var D,G=false,P=0,X=d.length;P<X;++P){D=d.item(P);if(D!==b||G)h.add(d.item(P));else G=true}h.select();n(this)}else ba(this,b)}:function(b){ba(this,b)};var aa;if(!J&&W&&l.features.implementsDomRange){aa=function(b){var d=false;if(b.anchorNode)d=c.comparePoints(b.anchorNode,b.anchorOffset,b.focusNode,b.focusOffset)==1;return d};g.isBackwards=function(){return aa(this)}}else aa=g.isBackwards=function(){return false};g.toString=function(){for(var b=[],d=0,h=this.rangeCount;d<
h;++d)b[d]=""+this._ranges[d];return b.join("")};g.collapse=function(b,d){q(this,b);var h=l.createRange(c.getDocument(b));h.collapseToPoint(b,d);this.removeAllRanges();this.addRange(h);this.isCollapsed=true};g.collapseToStart=function(){if(this.rangeCount){var b=this._ranges[0];this.collapse(b.startContainer,b.startOffset)}else throw new L("INVALID_STATE_ERR");};g.collapseToEnd=function(){if(this.rangeCount){var b=this._ranges[this.rangeCount-1];this.collapse(b.endContainer,b.endOffset)}else throw new L("INVALID_STATE_ERR");
};g.selectAllChildren=function(b){q(this,b);var d=l.createRange(c.getDocument(b));d.selectNodeContents(b);this.removeAllRanges();this.addRange(d)};g.deleteFromDocument=function(){if(M&&V&&this.docSelection.type=="Control"){for(var b=this.docSelection.createRange(),d;b.length;){d=b.item(0);b.remove(d);d.parentNode.removeChild(d)}this.refresh()}else if(this.rangeCount){b=this.getAllRanges();this.removeAllRanges();d=0;for(var h=b.length;d<h;++d)b[d].deleteContents();this.addRange(b[h-1])}};g.getAllRanges=
function(){return this._ranges.slice(0)};g.setSingleRange=function(b){this.setRanges([b])};g.containsNode=function(b,d){for(var h=0,D=this._ranges.length;h<D;++h)if(this._ranges[h].containsNode(b,d))return true;return false};g.toHtml=function(){var b="";if(this.rangeCount){b=k.getRangeDocument(this._ranges[0]).createElement("div");for(var d=0,h=this._ranges.length;d<h;++d)b.appendChild(this._ranges[d].cloneContents());b=b.innerHTML}return b};g.getName=function(){return"WrappedSelection"};g.inspect=
function(){return v(this)};g.detach=function(){this.win=this.anchorNode=this.focusNode=this.win._rangySelection=null};x.inspect=v;l.Selection=x;l.selectionPrototype=g;l.addCreateMissingNativeApiListener(function(b){if(typeof b.getSelection=="undefined")b.getSelection=function(){return l.getSelection(this)};b=null})});

// Generated by CoffeeScript 1.3.3
(function() {

  $.widget("ncri.hallohtml", {
    options: {
      editable: null,
      toolbar: null,
      uuid: "",
      lang: 'en',
      dialogOpts: {
        autoOpen: false,
        width: 600,
        height: 'auto',
        modal: false,
        resizable: true,
        draggable: true,
        dialogClass: 'htmledit-dialog'
      },
      dialog: null,
      buttonCssClass: null
    },
    translations: {
      en: {
        title: 'Edit HTML',
        update: 'Update'
      },
      de: {
        title: 'HTML bearbeiten',
        update: 'Aktualisieren'
      }
    },
    texts: null,
    populateToolbar: function($toolbar) {
      var $buttonHolder, $buttonset, id, widget;
      widget = this;
      this.texts = this.translations[this.options.lang];
      this.options.toolbar = $toolbar;
      this.options.dialog = $("<div>").attr('id', "" + this.options.uuid + "-htmledit-dialog");
      $buttonset = $("<span>").addClass(widget.widgetName);
      id = "" + this.options.uuid + "-htmledit";
      $buttonHolder = $('<span>');
      $buttonHolder.hallobutton({
        label: this.texts.title,
        icon: 'icon-list-alt',
        editable: this.options.editable,
        command: null,
        queryState: false,
        uuid: this.options.uuid,
        cssClass: this.options.buttonCssClass
      });
      $buttonset.append($buttonHolder);
      this.button = $buttonHolder;
      this.button.click(function() {
        if (widget.options.dialog.dialog("isOpen")) {
          widget._closeDialog();
        } else {
          widget._openDialog();
        }
        return false;
      });
      this.options.editable.element.on("hallodeactivated", function() {
        return widget._closeDialog();
      });
      $toolbar.append($buttonset);
      this.options.dialog.dialog(this.options.dialogOpts);
      return this.options.dialog.dialog("option", "title", this.texts.title);
    },
    _openDialog: function() {
      var $editableEl, html, widget, xposition, yposition,
        _this = this;
      widget = this;
      $editableEl = $(this.options.editable.element);
      xposition = $editableEl.offset().left + $editableEl.outerWidth() + 10;
      yposition = this.options.toolbar.offset().top - $(document).scrollTop();
      this.options.dialog.dialog("option", "position", [xposition, yposition]);
      this.options.editable.keepActivated(true);
      this.options.dialog.dialog("open");
      this.options.dialog.on('dialogclose', function() {
        $('label', _this.button).removeClass('ui-state-active');
        _this.options.editable.element.focus();
        return _this.options.editable.keepActivated(false);
      });
      this.options.dialog.html($("<textarea>").addClass('html_source'));
      html = this.options.editable.element.html();
      this.options.dialog.children('.html_source').val(html);
      this.options.dialog.prepend($("<button>" + this.texts.update + "</button>"));
      return this.options.dialog.on('click', 'button', function() {
        html = widget.options.dialog.children('.html_source').val();
        widget.options.editable.element.html(html);
        widget.options.editable.element.trigger('change');
        return false;
      });
    },
    _closeDialog: function() {
      return this.options.dialog.dialog("close");
    }
  });

  (function(jQuery) {
    return jQuery.widget("IKS.hallolists", {
      options: {
        editable: null,
        toolbar: null,
        uuid: '',
        lists: {
          ordered: true,
          unordered: true
        },
        buttonCssClass: null
      },
      populateToolbar: function(toolbar) {
        var buttonize, buttonset,
          _this = this;
        buttonset = jQuery("<span class=\"" + this.widgetName + "\"></span>");
        buttonize = function(type, label) {
          var buttonElement;
          buttonElement = jQuery('<span></span>');
          buttonElement.hallobutton({
            uuid: _this.options.uuid,
            editable: _this.options.editable,
            label: label,
            command: "insert" + type + "List",
            icon: "icon-list-" + (label.toLowerCase()),
            cssClass: _this.options.buttonCssClass
          });
          return buttonset.append(buttonElement);
        };
        if (this.options.lists.ordered) {
          buttonize("Ordered", "OL");
        }
        if (this.options.lists.unordered) {
          buttonize("Unordered", "UL");
        }
        buttonset.hallobuttonset();
        return toolbar.append(buttonset);
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget("IKS.halloformat", {
      options: {
        editable: null,
        uuid: '',
        formattings: {
          bold: true,
          italic: true,
          strikeThrough: false,
          underline: false
        },
        buttonCssClass: null
      },
      populateToolbar: function(toolbar) {
        var buttonize, buttonset, enabled, format, widget, _ref,
          _this = this;
        widget = this;
        buttonset = jQuery("<span class=\"" + widget.widgetName + "\"></span>");
        buttonize = function(format) {
          var buttonHolder;
          buttonHolder = jQuery('<span></span>');
          buttonHolder.hallobutton({
            label: format,
            editable: _this.options.editable,
            command: format,
            uuid: _this.options.uuid,
            cssClass: _this.options.buttonCssClass
          });
          return buttonset.append(buttonHolder);
        };
        _ref = this.options.formattings;
        for (format in _ref) {
          enabled = _ref[format];
          if (!enabled) {
            continue;
          }
          buttonize(format);
        }
        buttonset.hallobuttonset();
        return toolbar.append(buttonset);
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget("IKS.hallolink", {
      options: {
        editable: null,
        uuid: "",
        link: true,
        image: true,
        defaultUrl: 'http://',
        dialogOpts: {
          autoOpen: false,
          width: 540,
          height: 95,
          title: "Enter Link",
          buttonTitle: "Insert",
          buttonUpdateTitle: "Update",
          modal: true,
          resizable: false,
          draggable: false,
          dialogClass: 'hallolink-dialog'
        },
        buttonCssClass: null
      },
      populateToolbar: function(toolbar) {
        var butTitle, butUpdateTitle, buttonize, buttonset, dialog, dialogId, dialogSubmitCb, isEmptyLink, urlInput, widget,
          _this = this;
        widget = this;
        dialogId = "" + this.options.uuid + "-dialog";
        butTitle = this.options.dialogOpts.buttonTitle;
        butUpdateTitle = this.options.dialogOpts.buttonUpdateTitle;
        dialog = jQuery("<div id=\"" + dialogId + "\">        <form action=\"#\" method=\"post\" class=\"linkForm\">          <input class=\"url\" type=\"text\" name=\"url\"            value=\"" + this.options.defaultUrl + "\" />          <input type=\"submit\" id=\"addlinkButton\" value=\"" + butTitle + "\"/>        </form></div>");
        urlInput = jQuery('input[name=url]', dialog).focus(function(e) {
          return this.select();
        });
        isEmptyLink = function(link) {
          if ((new RegExp(/^\s*$/)).test(link)) {
            return true;
          }
          if (link === widget.options.defaultUrl) {
            return true;
          }
          return false;
        };
        dialogSubmitCb = function(event) {
          var link, selectionStart;
          event.preventDefault();
          link = urlInput.val();
          widget.options.editable.restoreSelection(widget.lastSelection);
          if (isEmptyLink(link)) {
            selectionStart = widget.lastSelection.startContainer;
            if (widget.lastSelection.collapsed) {
              widget.lastSelection.setStartBefore(selectionStart);
              widget.lastSelection.setEndAfter(selectionStart);
              window.getSelection().addRange(widget.lastSelection);
            }
            document.execCommand("unlink", null, "");
          } else {
            if (!(/:\/\//.test(link)) && !(/^mailto:/.test(link))) {
              link = 'http://' + link;
            }
            if (widget.lastSelection.startContainer.parentNode.href === void 0) {
              document.execCommand("createLink", null, link);
            } else {
              widget.lastSelection.startContainer.parentNode.href = link;
            }
          }
          widget.options.editable.element.trigger('change');
          widget.options.editable.removeAllSelections();
          dialog.dialog('close');
          return false;
        };
        dialog.find("input[type=submit]").click(dialogSubmitCb);
        buttonset = jQuery("<span class=\"" + widget.widgetName + "\"></span>");
        buttonize = function(type) {
          var button, buttonHolder, id;
          id = "" + _this.options.uuid + "-" + type;
          buttonHolder = jQuery('<span></span>');
          buttonHolder.hallobutton({
            label: 'Link',
            icon: 'icon-link',
            editable: _this.options.editable,
            command: null,
            queryState: false,
            uuid: _this.options.uuid,
            cssClass: _this.options.buttonCssClass
          });
          buttonset.append(buttonHolder);
          button = buttonHolder;
          button.on("click", function(event) {
            var button_selector, selectionParent;
            widget.lastSelection = widget.options.editable.getSelection();
            urlInput = jQuery('input[name=url]', dialog);
            selectionParent = widget.lastSelection.startContainer.parentNode;
            if (!selectionParent.href) {
              urlInput.val(widget.options.defaultUrl);
              jQuery(urlInput[0].form).find('input[type=submit]').val(butTitle);
            } else {
              urlInput.val(jQuery(selectionParent).attr('href'));
              button_selector = 'input[type=submit]';
              jQuery(urlInput[0].form).find(button_selector).val(butUpdateTitle);
            }
            widget.options.editable.keepActivated(true);
            dialog.dialog('open');
            dialog.on('dialogclose', function() {
              jQuery('label', buttonHolder).removeClass('ui-state-active');
              widget.options.editable.element.focus();
              return widget.options.editable.keepActivated(false);
            });
            return false;
          });
          return _this.element.on("keyup paste change mouseup", function(event) {
            var nodeName, start;
            start = jQuery(widget.options.editable.getSelection().startContainer);
            if (start.prop('nodeName')) {
              nodeName = start.prop('nodeName');
            } else {
              nodeName = start.parent().prop('nodeName');
            }
            if (nodeName && nodeName.toUpperCase() === "A") {
              jQuery('label', button).addClass('ui-state-active');
              return;
            }
            return jQuery('label', button).removeClass('ui-state-active');
          });
        };
        if (this.options.link) {
          buttonize("A");
        }
        if (this.options.link) {
          toolbar.append(buttonset);
          buttonset.hallobuttonset();
          return dialog.dialog(this.options.dialogOpts);
        }
      }
    });
  })(jQuery);

  $.widget("ncri.hallo-image-insert-edit", {
    options: {
      editable: null,
      toolbar: null,
      uuid: "",
      insert_file_dialog_ui_url: null,
      lang: 'en',
      dialogOpts: {
        autoOpen: false,
        width: 560,
        height: 'auto',
        modal: false,
        resizable: true,
        draggable: true,
        dialogClass: 'insert-image-dialog'
      },
      dialog: null,
      buttonCssClass: null
    },
    translations: {
      en: {
        title_insert: 'Insert Image',
        title_properties: 'Image Properties',
        insert: 'Insert',
        chage_image: 'Change Image:',
        source: 'URL',
        width: 'Width',
        height: 'Height',
        alt: 'Alt Text',
        padding: 'Padding',
        float: 'Float',
        float_left: 'left',
        float_right: 'right',
        float_none: 'No'
      },
      de: {
        title_insert: 'Bild einfÃ¼gen',
        title_properties: 'Bildeigenschaften',
        insert: 'EinfÃ¼gen',
        chage_image: 'Bild Ã¤ndern:',
        source: 'URL',
        width: 'Breite',
        height: 'HÃ¶he',
        alt: 'Alt Text',
        padding: 'Padding',
        float: 'Float',
        float_left: 'Links',
        float_right: 'Rechts',
        float_none: 'Nein'
      }
    },
    texts: null,
    dialog_image_selection_ui_loaded: false,
    $image: null,
    populateToolbar: function($toolbar) {
      var $buttonHolder, $buttonset, dialog_html, widget;
      widget = this;
      this.texts = this.translations[this.options.lang];
      this.options.toolbar = $toolbar;
      dialog_html = "<div id='hallo_img_properties'></div>";
      if (this.options.insert_file_dialog_ui_url) {
        dialog_html += "<div id='hallo_img_file_select_ui'></div>";
      }
      this.options.dialog = $("<div>").attr('id', "" + this.options.uuid + "-insert-image-dialog").html(dialog_html);
      $buttonset = $("<span>").addClass(this.widgetName);
      $buttonHolder = $('<span>');
      $buttonHolder.hallobutton({
        label: this.texts.title_insert,
        icon: 'icon-picture',
        editable: this.options.editable,
        command: null,
        queryState: false,
        uuid: this.options.uuid,
        cssClass: this.options.buttonCssClass
      });
      $buttonset.append($buttonHolder);
      this.button = $buttonHolder;
      this.button.click(function() {
        if (widget.options.dialog.dialog("isOpen")) {
          widget._closeDialog();
        } else {
          widget.lastSelection = widget.options.editable.getSelection();
          widget._openDialog();
        }
        return false;
      });
      this.options.editable.element.on("halloselected, hallounselected", function() {
        if (widget.options.dialog.dialog("isOpen")) {
          return widget.lastSelection = widget.options.editable.getSelection();
        }
      });
      this.options.editable.element.on("hallodeactivated", function() {
        return widget._closeDialog();
      });
      $(this.options.editable.element).on("click", "img", function(e) {
        widget._openDialog($(this));
        return false;
      });
      this.options.editable.element.on('halloselected', function(event, data) {
        var toolbar_option;
        toolbar_option = widget.options.editable.options.toolbar;
        if (toolbar_option === "halloToolbarContextual" && $(data.originalEvent.target).is('img')) {
          $toolbar.hide();
          return false;
        }
      });
      $toolbar.append($buttonset);
      return this.options.dialog.dialog(this.options.dialogOpts);
    },
    _openDialog: function($image) {
      var $editableEl, widget, xposition, yposition,
        _this = this;
      this.$image = $image;
      widget = this;
      $editableEl = $(this.options.editable.element);
      xposition = $editableEl.offset().left + $editableEl.outerWidth() + 10;
      if (this.$image) {
        yposition = this.$image.offset().top - $(document).scrollTop();
      } else {
        yposition = this.options.toolbar.offset().top - $(document).scrollTop();
      }
      this.options.dialog.dialog("option", "position", [xposition, yposition]);
      this.options.editable.keepActivated(true);
      this.options.dialog.dialog("open");
      if (this.$image) {
        this.options.dialog.dialog("option", "title", this.texts.title_properties);
        $(document).keyup(function(e) {
          if (e.keyCode === 46 || e.keyCode === 8) {
            $(document).off();
            widget._closeDialog();
            widget.$image.remove();
            widget.$image = null;
          }
          return e.preventDefault();
        });
        this.options.editable.element.on("click", function() {
          widget.$image = null;
          return widget._closeDialog();
        });
      } else {
        this.options.dialog.children('#hallo_img_properties').hide();
        this.options.dialog.dialog("option", "title", this.texts.title_insert);
        if ($('#hallo_img_file_select_title').length > 0) {
          $('#hallo_img_file_select_title').text('');
        }
      }
      this._load_dialog_image_properties_ui();
      this.options.dialog.on('dialogclose', function() {
        var scrollbar_pos;
        $('label', _this.button).removeClass('ui-state-active');
        scrollbar_pos = $(document).scrollTop();
        _this.options.editable.element.focus();
        $(document).scrollTop(scrollbar_pos);
        return _this.options.editable.keepActivated(false);
      });
      if (this.options.insert_file_dialog_ui_url && !this.dialog_image_selection_ui_loaded) {
        this.options.dialog.on('click', ".reload_link", function() {
          widget._load_dialog_image_selection_ui();
          return false;
        });
        this.options.dialog.on('click', '.file_preview img', function() {
          var new_source;
          if (widget.$image) {
            new_source = $(this).attr('src').replace(/-thumb/, '');
            widget.$image.attr('src', new_source);
            $('#hallo_img_source').val(new_source);
          } else {
            widget._insert_image($(this).attr('src').replace(/-thumb/, ''));
          }
          return false;
        });
        return this._load_dialog_image_selection_ui();
      }
    },
    _insert_image: function(source) {
      this.options.editable.restoreSelection(this.lastSelection);
      document.execCommand("insertImage", null, source);
      this.options.editable.element.trigger('change');
      this.options.editable.removeAllSelections();
      return this._closeDialog();
    },
    _closeDialog: function() {
      return this.options.dialog.dialog("close");
    },
    _load_dialog_image_selection_ui: function() {
      var widget;
      widget = this;
      return $.ajax({
        url: this.options.insert_file_dialog_ui_url,
        success: function(data, textStatus, jqXHR) {
          var $properties, file_select_title, t;
          file_select_title = '';
          $properties = widget.options.dialog.children('#hallo_img_properties');
          if ($properties.is(':visible')) {
            file_select_title = widget.texts.change_image;
          }
          t = "<div id='hallo_img_file_select_title'>" + file_select_title + "</div>";
          widget.options.dialog.children('#hallo_img_file_select_ui').html(t + data);
          return widget.dialog_image_selection_ui_loaded = true;
        },
        beforeSend: function() {
          return widget.options.dialog.children('#hallo_img_file_select_ui').html('<div class="hallo_insert_file_loader"></div>');
        }
      });
    },
    _load_dialog_image_properties_ui: function() {
      var $img_properties, button, height, html, widget, width;
      widget = this;
      $img_properties = this.options.dialog.children('#hallo_img_properties');
      if (this.$image) {
        width = this.$image.is('[width]') ? this.$image.attr('width') : '';
        height = this.$image.is('[height]') ? this.$image.attr('height') : '';
        html = this._property_input_html('source', this.$image.attr('src'), {
          label: this.texts.source
        }) + this._property_input_html('alt', this.$image.attr('alt') || '', {
          label: this.texts.alt
        }) + this._property_row_html(this._property_input_html('width', width, {
          label: this.texts.width,
          row: false
        }) + this._property_input_html('height', height, {
          label: this.texts.height,
          row: false
        })) + this._property_input_html('padding', this.$image.css('padding'), {
          label: this.texts.padding
        }) + this._property_row_html(this._property_cb_html('float_left', this.$image.css('float') === 'left', {
          label: this.texts.float_left,
          row: false
        }) + this._property_cb_html('float_right', this.$image.css('float') === 'right', {
          label: this.texts.float_right,
          row: false
        }) + this._property_cb_html('unfloat', this.$image.css('float') === 'none', {
          label: this.texts.float_none,
          row: false
        }), this.texts.float);
        $img_properties.html(html);
        $img_properties.show();
      } else {
        if (!this.options.insert_file_dialog_ui_url) {
          $img_properties.html(this._property_input_html('source', '', {
            label: this.texts.source
          }));
          $img_properties.show();
        }
      }
      if (this.$image) {
        if (!this.options.insert_file_dialog_ui_url) {
          $('#insert_image_btn').remove();
        }
        if ($('#hallo_img_file_select_title').length > 0) {
          $('#hallo_img_file_select_title').text(this.texts.chage_image);
        }
        $('#hallo_img_properties #hallo_img_source').keyup(function() {
          return widget.$image.attr('src', this.value);
        });
        $('#hallo_img_properties #hallo_img_alt').keyup(function() {
          return widget.$image.attr('alt', this.value);
        });
        $('#hallo_img_properties #hallo_img_padding').keyup(function() {
          return widget.$image.css('padding', this.value);
        });
        $('#hallo_img_properties #hallo_img_height').keyup(function() {
          widget.$image.css('height', this.value);
          return widget.$image.attr('height', this.value);
        });
        $('#hallo_img_properties #hallo_img_width').keyup(function() {
          widget.$image.css('width', this.value);
          return widget.$image.attr('width', this.value);
        });
        $('#hallo_img_properties #hallo_img_float_left').click(function() {
          if (!this.checked) {
            return false;
          }
          widget.$image.css('float', 'left');
          $('#hallo_img_properties #hallo_img_float_right').removeAttr('checked');
          return $('#hallo_img_properties #hallo_img_unfloat').removeAttr('checked');
        });
        $('#hallo_img_properties #hallo_img_float_right').click(function() {
          if (!this.checked) {
            return false;
          }
          widget.$image.css('float', 'right');
          $('#hallo_img_properties #hallo_img_unfloat').removeAttr('checked');
          return $('#hallo_img_properties #hallo_img_float_left').removeAttr('checked');
        });
        return $('#hallo_img_properties #hallo_img_unfloat').click(function() {
          if (!this.checked) {
            return false;
          }
          widget.$image.css('float', 'none');
          $('#hallo_img_properties #hallo_img_float_right').removeAttr('checked');
          return $('#hallo_img_properties #hallo_img_float_left').removeAttr('checked');
        });
      } else {
        if (!this.options.insert_file_dialog_ui_url) {
          button = "<button id=\"insert_image_btn\">" + this.texts.insert + "</button>";
          $img_properties.after(button);
          return $('#insert_image_btn').click(function() {
            var $img_source;
            $img_source = $('#hallo_img_properties #hallo_img_source');
            return widget._insert_image($img_source.val());
          });
        }
      }
    },
    _property_col_html: function(col_html) {
      return "<div class='hallo_img_property_col'>" + col_html + "</div>";
    },
    _property_row_html: function(row_html, label) {
      if (label == null) {
        label = '';
      }
      row_html = this._property_col_html(label) + this._property_col_html(row_html);
      return "<div class='hallo_img_property_row'>" + row_html + "</div>";
    },
    _property_html: function(property_html, options) {
      var entry;
      if (options == null) {
        options = {};
      }
      if (options.row === false) {
        if (options.label) {
          entry = "" + options.label + " " + property_html;
          property_html = "<span class='img_property_entry'>" + entry + "</span>";
        }
        return property_html;
      } else {
        entry = "<span class='img_property_entry'>" + property_html + "</span>";
        return this._property_row_html(entry, options.label);
      }
    },
    _property_input_html: function(id, value, options) {
      var text_field;
      if (options == null) {
        options = {};
      }
      text_field = "<input type='text' id='hallo_img_" + id + "' value='" + value + "'>";
      return this._property_html(text_field, options);
    },
    _property_cb_html: function(id, checked, options) {
      var cb, checked_attr;
      if (options == null) {
        options = {};
      }
      checked_attr = checked ? 'checked=checked' : '';
      cb = "<input type='checkbox' id='hallo_img_" + id + "' " + checked_attr + "'>";
      return this._property_html(cb, options);
    }
  });

  (function(jQuery) {
    return jQuery.widget('IKS.halloblock', {
      options: {
        editable: null,
        toolbar: null,
        uuid: '',
        elements: ['h1', 'h2', 'h3', 'p', 'pre', 'blockquote'],
        buttonCssClass: null
      },
      populateToolbar: function(toolbar) {
        var buttonset, contentId, target;
        buttonset = jQuery("<span class=\"" + this.widgetName + "\"></span>");
        contentId = "" + this.options.uuid + "-" + this.widgetName + "-data";
        target = this._prepareDropdown(contentId);
        toolbar.append(buttonset);
        buttonset.hallobuttonset();
        buttonset.append(target);
        return buttonset.append(this._prepareButton(target));
      },
      _prepareDropdown: function(contentId) {
        var addElement, containingElement, contentArea, element, _i, _len, _ref,
          _this = this;
        contentArea = jQuery("<div id=\"" + contentId + "\"></div>");
        containingElement = this.options.editable.element.get(0).tagName.toLowerCase();
        addElement = function(element) {
          var el, events, queryState;
          el = jQuery("<button class='blockselector'>          <" + element + " class=\"menu-item\">" + element + "</" + element + ">        </button>");
          if (containingElement === element) {
            el.addClass('selected');
          }
          if (containingElement !== 'div') {
            el.addClass('disabled');
          }
          el.on('click', function() {
            var tagName;
            tagName = element.toUpperCase();
            if (el.hasClass('disabled')) {
              return;
            }
            if (navigator.appName === 'Microsoft Internet Explorer') {
              _this.options.editable.execute('FormatBlock', "<" + tagName + ">");
              return;
            }
            return _this.options.editable.execute('formatBlock', tagName);
          });
          queryState = function(event) {
            var block;
            block = document.queryCommandValue('formatBlock');
            if (block.toLowerCase() === element) {
              el.addClass('selected');
              return;
            }
            return el.removeClass('selected');
          };
          events = 'keyup paste change mouseup';
          _this.options.editable.element.on(events, queryState);
          _this.options.editable.element.on('halloenabled', function() {
            return _this.options.editable.element.on(events, queryState);
          });
          _this.options.editable.element.on('hallodisabled', function() {
            return _this.options.editable.element.off(events, queryState);
          });
          return el;
        };
        _ref = this.options.elements;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          element = _ref[_i];
          contentArea.append(addElement(element));
        }
        return contentArea;
      },
      _prepareButton: function(target) {
        var buttonElement;
        buttonElement = jQuery('<span></span>');
        buttonElement.hallodropdownbutton({
          uuid: this.options.uuid,
          editable: this.options.editable,
          label: 'block',
          icon: 'icon-text-height',
          target: target,
          cssClass: this.options.buttonCssClass
        });
        return buttonElement;
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget("IKS.halloheadings", {
      options: {
        editable: null,
        uuid: '',
        formatBlocks: ["p", "h1", "h2", "h3"],
        buttonCssClass: null
      },
      populateToolbar: function(toolbar) {
        var buttonize, buttonset, command, format, ie, widget, _i, _len, _ref,
          _this = this;
        widget = this;
        buttonset = jQuery("<span class=\"" + widget.widgetName + "\"></span>");
        ie = navigator.appName === 'Microsoft Internet Explorer';
        command = (ie ? "FormatBlock" : "formatBlock");
        buttonize = function(format) {
          var buttonHolder;
          buttonHolder = jQuery('<span></span>');
          buttonHolder.hallobutton({
            label: format,
            editable: _this.options.editable,
            command: command,
            commandValue: (ie ? "<" + format + ">" : format),
            uuid: _this.options.uuid,
            cssClass: _this.options.buttonCssClass,
            queryState: function(event) {
              var compared, map, result, val, value, _i, _len, _ref;
              try {
                value = document.queryCommandValue(command);
                if (ie) {
                  map = {
                    p: "normal"
                  };
                  _ref = [1, 2, 3, 4, 5, 6];
                  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    val = _ref[_i];
                    map["h" + val] = val;
                  }
                  compared = value.match(new RegExp(map[format], "i"));
                } else {
                  compared = value.match(new RegExp(format, "i"));
                }
                result = compared ? true : false;
                return buttonHolder.hallobutton('checked', result);
              } catch (e) {

              }
            }
          });
          buttonHolder.find('button .ui-button-text').text(format.toUpperCase());
          return buttonset.append(buttonHolder);
        };
        _ref = this.options.formatBlocks;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          format = _ref[_i];
          buttonize(format);
        }
        buttonset.hallobuttonset();
        return toolbar.append(buttonset);
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget("IKS.halloreundo", {
      options: {
        editable: null,
        toolbar: null,
        uuid: '',
        buttonCssClass: null
      },
      populateToolbar: function(toolbar) {
        var buttonize, buttonset,
          _this = this;
        buttonset = jQuery("<span class=\"" + this.widgetName + "\"></span>");
        buttonize = function(cmd, label) {
          var buttonElement;
          buttonElement = jQuery('<span></span>');
          buttonElement.hallobutton({
            uuid: _this.options.uuid,
            editable: _this.options.editable,
            label: label,
            icon: cmd === 'undo' ? 'icon-undo' : 'icon-repeat',
            command: cmd,
            queryState: false,
            cssClass: _this.options.buttonCssClass
          });
          return buttonset.append(buttonElement);
        };
        buttonize("undo", "Undo");
        buttonize("redo", "Redo");
        buttonset.hallobuttonset();
        return toolbar.append(buttonset);
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget("IKS.halloimage", {
      options: {
        editable: null,
        toolbar: null,
        uuid: "",
        limit: 8,
        search: null,
        searchUrl: null,
        suggestions: null,
        loaded: null,
        upload: null,
        uploadUrl: null,
        dialogOpts: {
          autoOpen: false,
          width: 270,
          height: "auto",
          title: "Insert Images",
          modal: false,
          resizable: false,
          draggable: true,
          dialogClass: 'halloimage-dialog'
        },
        dialog: null,
        buttonCssClass: null,
        entity: null,
        vie: null,
        dbPediaUrl: "http://dev.iks-project.eu/stanbolfull",
        maxWidth: 250,
        maxHeight: 250
      },
      populateToolbar: function(toolbar) {
        var buttonHolder, buttonset, dialogId, id, tabContent, tabs, widget;
        this.options.toolbar = toolbar;
        widget = this;
        dialogId = "" + this.options.uuid + "-image-dialog";
        this.options.dialog = jQuery("<div id=\"" + dialogId + "\">        <div class=\"nav\">          <ul class=\"tabs\">          </ul>          <div id=\"" + this.options.uuid + "-tab-activeIndicator\"            class=\"tab-activeIndicator\" />        </div>        <div class=\"dialogcontent\">        </div>");
        tabs = jQuery('.tabs', this.options.dialog);
        tabContent = jQuery('.dialogcontent', this.options.dialog);
        if (widget.options.suggestions) {
          this._addGuiTabSuggestions(tabs, tabContent);
        }
        if (widget.options.search || widget.options.searchUrl) {
          this._addGuiTabSearch(tabs, tabContent);
        }
        if (widget.options.upload || widget.options.uploadUrl) {
          this._addGuiTabUpload(tabs, tabContent);
        }
        this.current = jQuery('<div class="currentImage"></div>').halloimagecurrent({
          uuid: this.options.uuid,
          imageWidget: this,
          editable: this.options.editable,
          dialog: this.options.dialog,
          maxWidth: this.options.maxWidth,
          maxHeight: this.options.maxHeight
        });
        jQuery('.dialogcontent', this.options.dialog).append(this.current);
        buttonset = jQuery("<span class=\"" + widget.widgetName + "\"></span>");
        id = "" + this.options.uuid + "-image";
        buttonHolder = jQuery('<span></span>');
        buttonHolder.hallobutton({
          label: 'Images',
          icon: 'icon-picture',
          editable: this.options.editable,
          command: null,
          queryState: false,
          uuid: this.options.uuid,
          cssClass: this.options.buttonCssClass
        });
        buttonset.append(buttonHolder);
        this.button = buttonHolder;
        this.button.on("click", function(event) {
          if (widget.options.dialog.dialog("isOpen")) {
            widget._closeDialog();
          } else {
            widget._openDialog();
          }
          return false;
        });
        this.options.editable.element.on("hallodeactivated", function(event) {
          return widget._closeDialog();
        });
        jQuery(this.options.editable.element).delegate("img", "click", function(event) {
          return widget._openDialog();
        });
        toolbar.append(buttonset);
        this.options.dialog.dialog(this.options.dialogOpts);
        return this._handleTabs();
      },
      setCurrent: function(image) {
        return this.current.halloimagecurrent('setImage', image);
      },
      _handleTabs: function() {
        var widget;
        widget = this;
        jQuery('.nav li', this.options.dialog).on('click', function() {
          var id, left;
          jQuery("." + widget.widgetName + "-tab").hide();
          id = jQuery(this).attr('id');
          jQuery("#" + id + "-content").show();
          left = jQuery(this).position().left + (jQuery(this).width() / 2);
          return jQuery("#" + widget.options.uuid + "-tab-activeIndicator").css({
            "margin-left": left
          });
        });
        return jQuery('.nav li', this.options.dialog).first().click();
      },
      _openDialog: function() {
        var cleanUp, editableEl, getActive, suggestionSelector, toolbarEl, widget, xposition, yposition,
          _this = this;
        widget = this;
        cleanUp = function() {
          return window.setTimeout(function() {
            var thumbnails;
            thumbnails = jQuery(".imageThumbnail");
            return jQuery(thumbnails).each(function() {
              var size;
              size = jQuery("#" + this.id).width();
              if (size <= 20) {
                return jQuery("#" + this.id).parent("li").remove();
              }
            });
          }, 15000);
        };
        suggestionSelector = "#" + this.options.uuid + "-tab-suggestions-content";
        getActive = function() {
          return jQuery('.imageThumbnailActive', suggestionSelector).first().attr("src");
        };
        jQuery("#" + this.options.uuid + "-sugg-activeImage").attr("src", getActive());
        jQuery("#" + this.options.uuid + "-sugg-activeImageBg").attr("src", getActive());
        this.lastSelection = this.options.editable.getSelection();
        editableEl = jQuery(this.options.editable.element);
        toolbarEl = jQuery(this.options.toolbar);
        xposition = editableEl.offset().left + editableEl.outerWidth() - 3;
        yposition = toolbarEl.offset().top + toolbarEl.outerHeight() + 29;
        yposition -= jQuery(document).scrollTop();
        this.options.dialog.dialog("option", "position", [xposition, yposition]);
        cleanUp();
        widget.options.loaded = 1;
        this.options.editable.keepActivated(true);
        this.options.dialog.dialog("open");
        return this.options.dialog.on('dialogclose', function() {
          jQuery('label', _this.button).removeClass('ui-state-active');
          _this.options.editable.element.focus();
          return _this.options.editable.keepActivated(false);
        });
      },
      _closeDialog: function() {
        return this.options.dialog.dialog("close");
      },
      _addGuiTabSuggestions: function(tabs, element) {
        var tab;
        tabs.append(jQuery("<li id=\"" + this.options.uuid + "-tab-suggestions\"        class=\"" + this.widgetName + "-tabselector " + this.widgetName + "-tab-suggestions\">          <span>Suggestions</span>        </li>"));
        tab = jQuery("<div id=\"" + this.options.uuid + "-tab-suggestions-content\"        class=\"" + this.widgetName + "-tab tab-suggestions\"></div>");
        element.append(tab);
        return tab.halloimagesuggestions({
          uuid: this.options.uuid,
          imageWidget: this,
          entity: this.options.entity
        });
      },
      _addGuiTabSearch: function(tabs, element) {
        var dialogId, tab, widget;
        widget = this;
        dialogId = "" + this.options.uuid + "-image-dialog";
        tabs.append(jQuery("<li id=\"" + this.options.uuid + "-tab-search\"        class=\"" + this.widgetName + "-tabselector " + this.widgetName + "-tab-search\">          <span>Search</span>        </li>"));
        tab = jQuery("<div id=\"" + this.options.uuid + "-tab-search-content\"        class=\"" + widget.widgetName + "-tab tab-search\"></div>");
        element.append(tab);
        return tab.halloimagesearch({
          uuid: this.options.uuid,
          imageWidget: this,
          searchCallback: this.options.search,
          searchUrl: this.options.searchUrl,
          limit: this.options.limit,
          entity: this.options.entity
        });
      },
      _addGuiTabUpload: function(tabs, element) {
        var tab;
        tabs.append(jQuery("<li id=\"" + this.options.uuid + "-tab-upload\"        class=\"" + this.widgetName + "-tabselector " + this.widgetName + "-tab-upload\">          <span>Upload</span>        </li>"));
        tab = jQuery("<div id=\"" + this.options.uuid + "-tab-upload-content\"        class=\"" + this.widgetName + "-tab tab-upload\"></div>");
        element.append(tab);
        return tab.halloimageupload({
          uuid: this.options.uuid,
          uploadCallback: this.options.upload,
          uploadUrl: this.options.uploadUrl,
          imageWidget: this,
          entity: this.options.entity
        });
      }
      /*
          insertImage = () ->
          # This may need to insert an image that does not have the same URL as
          # the preview image, since it may be a different size
            # Check if we have a selection and fall back to @lastSelection otherwise
            try
              if not widget.options.editable.getSelection()
              throw new Error "SelectionNotSet"
            catch error
              widget.options.editable.restoreSelection(widget.lastSelection)
      
            document.execCommand "insertImage", null, jQuery(this).attr('src')
            img = document.getSelection().anchorNode.firstChild
            jQuery(img).attr "alt", jQuery(".caption").value
      
            triggerModified = () ->
              widget.element.trigger "hallomodified"
            window.setTimeout triggerModified, 100
            widget._closeDialog()
      
            addImage = "##{widget.options.uuid}-#{widget.widgetName-addimage"
            @options.dialog.find(".halloimage-activeImage, addImage).click insertImage
      */

    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget("Liip.hallooverlay", {
      options: {
        editable: null,
        toolbar: null,
        uuid: "",
        overlay: null,
        padding: 10,
        background: null
      },
      _create: function() {
        var widget;
        widget = this;
        if (!this.options.bound) {
          this.options.bound = true;
          this.options.editable.element.on("halloactivated", function(event, data) {
            widget.options.currentEditable = jQuery(event.target);
            if (!widget.options.visible) {
              return widget.showOverlay();
            }
          });
          this.options.editable.element.on("hallomodified", function(event, data) {
            widget.options.currentEditable = jQuery(event.target);
            if (widget.options.visible) {
              return widget.resizeOverlay();
            }
          });
          return this.options.editable.element.on("hallodeactivated", function(event, data) {
            widget.options.currentEditable = jQuery(event.target);
            if (widget.options.visible) {
              return widget.hideOverlay();
            }
          });
        }
      },
      showOverlay: function() {
        this.options.visible = true;
        if (this.options.overlay === null) {
          if (jQuery("#halloOverlay").length > 0) {
            this.options.overlay = jQuery("#halloOverlay");
          } else {
            this.options.overlay = jQuery("<div id=\"halloOverlay\"            class=\"halloOverlay\">");
            jQuery(document.body).append(this.options.overlay);
          }
          this.options.overlay.on('click', jQuery.proxy(this.options.editable.turnOff, this.options.editable));
        }
        this.options.overlay.show();
        if (this.options.background === null) {
          if (jQuery("#halloBackground").length > 0) {
            this.options.background = jQuery("#halloBackground");
          } else {
            this.options.background = jQuery("<div id=\"halloBackground\"            class=\"halloBackground\">");
            jQuery(document.body).append(this.options.background);
          }
        }
        this.resizeOverlay();
        this.options.background.show();
        if (!this.options.originalZIndex) {
          this.options.originalZIndex = this.options.currentEditable.css("z-index");
        }
        return this.options.currentEditable.css('z-index', '350');
      },
      resizeOverlay: function() {
        var offset;
        offset = this.options.currentEditable.offset();
        return this.options.background.css({
          top: offset.top - this.options.padding,
          left: offset.left - this.options.padding,
          width: this.options.currentEditable.width() + 2 * this.options.padding,
          height: this.options.currentEditable.height() + 2 * this.options.padding
        });
      },
      hideOverlay: function() {
        this.options.visible = false;
        this.options.overlay.hide();
        this.options.background.hide();
        return this.options.currentEditable.css('z-index', this.options.originalZIndex);
      },
      _findBackgroundColor: function(jQueryfield) {
        var color;
        color = jQueryfield.css("background-color");
        if (color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
          return color;
        }
        if (jQueryfield.is("body")) {
          return "white";
        } else {
          return this._findBackgroundColor(jQueryfield.parent());
        }
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget('IKS.halloindicator', {
      options: {
        editable: null,
        className: 'halloEditIndicator'
      },
      _create: function() {
        var _this = this;
        return this.element.on('halloenabled', function() {
          return _this.buildIndicator();
        });
      },
      populateToolbar: function() {},
      buildIndicator: function() {
        var editButton;
        editButton = jQuery('<div><i class="icon-edit"></i> Edit</div>');
        editButton.addClass(this.options.className);
        editButton.hide();
        this.element.before(editButton);
        this.bindIndicator(editButton);
        return this.setIndicatorPosition(editButton);
      },
      bindIndicator: function(indicator) {
        var _this = this;
        indicator.on('click', function() {
          return _this.options.editable.element.focus();
        });
        this.element.on('halloactivated', function() {
          return indicator.hide();
        });
        this.element.on('hallodisabled', function() {
          return indicator.remove();
        });
        return this.options.editable.element.hover(function() {
          if (jQuery(this).hasClass('inEditMode')) {
            return;
          }
          return indicator.show();
        }, function(data) {
          if (jQuery(this).hasClass('inEditMode')) {
            return;
          }
          if (data.relatedTarget === indicator.get(0)) {
            return;
          }
          return indicator.hide();
        });
      },
      setIndicatorPosition: function(indicator) {
        var offset;
        indicator.css('position', 'absolute');
        offset = this.element.position();
        indicator.css('top', offset.top + 2);
        return indicator.css('left', offset.left + 2);
      }
    });
  })(jQuery);

  (function(jQuery) {
    var z;
    z = null;
    if (this.VIE !== void 0) {
      z = new VIE;
      z.use(new z.StanbolService({
        proxyDisabled: true,
        url: 'http://dev.iks-project.eu:8081'
      }));
    }
    return jQuery.widget('IKS.halloannotate', {
      options: {
        vie: z,
        editable: null,
        toolbar: null,
        uuid: '',
        select: function() {},
        decline: function() {},
        remove: function() {},
        buttonCssClass: null
      },
      _create: function() {
        var editableElement, turnOffAnnotate, widget;
        widget = this;
        if (this.options.vie === void 0) {
          throw new Error('The halloannotate plugin requires VIE');
          return;
        }
        if (typeof this.element.annotate !== 'function') {
          throw new Error('The halloannotate plugin requires annotate.js');
          return;
        }
        this.state = 'off';
        this.instantiate();
        turnOffAnnotate = function() {
          var editable;
          editable = this;
          return jQuery(editable).halloannotate('turnOff');
        };
        editableElement = this.options.editable.element;
        return editableElement.on('hallodisabled', turnOffAnnotate);
      },
      populateToolbar: function(toolbar) {
        var buttonHolder,
          _this = this;
        buttonHolder = jQuery("<span class=\"" + this.widgetName + "\"></span>");
        this.button = buttonHolder.hallobutton({
          label: 'Annotate',
          icon: 'icon-tags',
          editable: this.options.editable,
          command: null,
          uuid: this.options.uuid,
          cssClass: this.options.buttonCssClass,
          queryState: false
        });
        buttonHolder.on('change', function(event) {
          if (_this.state === "pending") {
            return;
          }
          if (_this.state === "off") {
            return _this.turnOn();
          }
          return _this.turnOff();
        });
        buttonHolder.buttonset();
        return toolbar.append(this.button);
      },
      cleanupContentClone: function(el) {
        if (this.state === 'on') {
          return el.find(".entity:not([about])").each(function() {
            return jQuery(this).replaceWith(jQuery(this).html());
          });
        }
      },
      instantiate: function() {
        var widget;
        widget = this;
        return this.options.editable.element.annotate({
          vie: this.options.vie,
          debug: false,
          showTooltip: true,
          select: this.options.select,
          remove: this.options.remove,
          success: this.options.success,
          error: this.options.error
        }).on('annotateselect', function(event, data) {
          return widget.options.editable.setModified();
        }).on('annotateremove', function() {
          return jQuery.noop();
        });
      },
      turnPending: function() {
        this.state = 'pending';
        this.button.hallobutton('checked', false);
        return this.button.hallobutton('disable');
      },
      turnOn: function() {
        var widget,
          _this = this;
        this.turnPending();
        widget = this;
        try {
          return this.options.editable.element.annotate('enable', function(success) {
            if (!success) {
              return;
            }
            _this.state = 'on';
            _this.button.hallobutton('checked', true);
            return _this.button.hallobutton('enable');
          });
        } catch (e) {
          return alert(e);
        }
      },
      turnOff: function() {
        this.options.editable.element.annotate('disable');
        this.state = 'off';
        if (!this.button) {
          return;
        }
        this.button.attr('checked', false);
        this.button.find("label").removeClass("ui-state-clicked");
        return this.button.button('refresh');
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget('IKS.halloimagesearch', {
      options: {
        imageWidget: null,
        searchCallback: null,
        searchUrl: null,
        limit: 5
      },
      _create: function() {
        return this.element.html('<div>\
        <form method="get">\
          <input type="text" class="searchInput" placeholder="Search" />\
          <input type="submit" class="btn searchButton" value="OK" />\
        </form>\
        <div class="searchResults imageThumbnailContainer">\
          <div class="activitySpinner">Loading images...</div>\
          <ul></ul>\
        </div>\
      </div>');
      },
      _init: function() {
        var _this = this;
        if (this.options.searchUrl && !this.options.searchCallback) {
          this.options.searchCallback = this._ajaxSearch;
        }
        jQuery('.activitySpinner', this.element).hide();
        return jQuery('form', this.element).submit(function(event) {
          var query;
          event.preventDefault();
          jQuery('.activitySpinner', _this.element).show();
          query = jQuery('.searchInput', _this.element.element).val();
          return _this.options.searchCallback(query, _this.options.limit, 0, function(results) {
            return _this._showResults(results);
          });
        });
      },
      _showResult: function(image) {
        var html,
          _this = this;
        if (!image.label) {
          image.label = image.alt;
        }
        html = jQuery("<li>        <img src=\"" + image.url + "\" class=\"imageThumbnail\"          title=\"" + image.label + "\"></li>");
        html.on('click', function() {
          return _this.options.imageWidget.setCurrent(image);
        });
        jQuery('img', html).on('mousedown', function(event) {
          event.preventDefault();
          return _this.options.imageWidget.setCurrent(image);
        });
        return jQuery('.imageThumbnailContainer ul', this.element).append(html);
      },
      _showNextPrev: function(results) {
        var container,
          _this = this;
        container = jQuery('imageThumbnailContainer ul', this.element);
        container.prepend(jQuery('<div class="pager-prev" style="display:none" />'));
        container.append(jQuery('<div class="pager-next" style="display:none" />'));
        if (results.offset > 0) {
          jQuery('.pager-prev', container).show();
        }
        if (results.offset < results.total) {
          jQuery('.pager-next', container).show();
        }
        jQuery('.pager-prev', container).click(function(event) {
          var offset;
          offset = results.offset - _this.options.limit;
          return _this.options.searchCallback(query, _this.options.limit, offset, function(results) {
            return _this._showResults(results);
          });
        });
        return jQuery('.pager-next', container).click(function(event) {
          var offset;
          offset = results.offset + _this.options.limit;
          return _this.options.searchCallback(query, _this.options.limit, offset, function(results) {
            return _this._showResults(results);
          });
        });
      },
      _showResults: function(results) {
        var image, _i, _len, _ref;
        jQuery('.activitySpinner', this.element).hide();
        jQuery('.imageThumbnailContainer ul', this.element).empty();
        jQuery('.imageThumbnailContainer ul', this.element).show();
        _ref = results.assets;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          image = _ref[_i];
          this._showResult(image);
        }
        this.options.imageWidget.setCurrent(results.assets.shift());
        return this._showNextPrev(results);
      },
      _ajaxSearch: function(query, limit, offset, success) {
        var searchUrl;
        searchUrl = this.searchUrl + '?' + jQuery.param({
          q: query,
          limit: limit,
          offset: offset
        });
        return jQuery.getJSON(searchUrl, success);
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget('IKS.halloimageupload', {
      options: {
        uploadCallback: null,
        uploadUrl: null,
        imageWidget: null,
        entity: null
      },
      _create: function() {
        return this.element.html('\
        <form class="upload">\
        <input type="file" class="file" name="userfile" accept="image/*" />\
        <input type="hidden" name="tags" value="" />\
        <input type="text" class="caption" name="caption" placeholder="Title" />\
        <button class="uploadSubmit">Upload</button>\
        </form>\
      ');
      },
      _init: function() {
        var widget;
        widget = this;
        if (widget.options.uploadUrl && !widget.options.uploadCallback) {
          widget.options.uploadCallback = widget._iframeUpload;
        }
        return jQuery('.uploadSubmit', this.element).on('click', function(event) {
          event.preventDefault();
          event.stopPropagation();
          return widget.options.uploadCallback({
            widget: widget,
            success: function(url) {
              return widget.options.imageWidget.setCurrent({
                url: url,
                label: ''
              });
            }
          });
        });
      },
      _prepareIframe: function(widget) {
        var iframe, iframeName;
        iframeName = "" + widget.widgetName + "_postframe_" + widget.options.uuid;
        iframeName = iframeName.replace(/-/g, '_');
        iframe = jQuery("#" + iframeName);
        if (iframe.length) {
          return iframe;
        }
        iframe = jQuery("<iframe name=\"" + iframeName + "\" id=\"" + iframeName + "\"        class=\"hidden\" style=\"display:none\" />");
        this.element.append(iframe);
        iframe.get(0).name = iframeName;
        return iframe;
      },
      _iframeUpload: function(data) {
        var iframe, uploadForm, uploadUrl, widget;
        widget = data.widget;
        iframe = widget._prepareIframe(widget);
        uploadForm = jQuery('form.upload', widget.element);
        if (typeof widget.options.uploadUrl === 'function') {
          uploadUrl = widget.options.uploadUrl(widget.options.entity);
        } else {
          uploadUrl = widget.options.uploadUrl;
        }
        iframe.on('load', function() {
          var imageUrl;
          imageUrl = iframe.get(0).contentWindow.location.href;
          widget.element.hide();
          return data.success(imageUrl);
        });
        uploadForm.attr('action', uploadUrl);
        uploadForm.attr('method', 'post');
        uploadForm.attr('target', iframe.get(0).name);
        uploadForm.attr('enctype', 'multipart/form-data');
        uploadForm.attr('encoding', 'multipart/form-data');
        return uploadForm.submit();
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget('IKS.halloimagesuggestions', {
      loaded: false,
      options: {
        entity: null,
        vie: null,
        dbPediaUrl: null,
        getSuggestions: null,
        thumbnailUri: '<http://dbpedia.org/ontology/thumbnail>'
      },
      _create: function() {
        return this.element.html('\
      <div id="' + this.options.uuid + '-tab-suggestions">\
        <div class="imageThumbnailContainer">\
          <div class="activitySpinner">Loading images...</div>\
          <ul></ul>\
        </div>\
      </div>');
      },
      _init: function() {
        return jQuery('.activitySpinner', this.element).hide();
      },
      _normalizeRelated: function(related) {
        if (_.isString(related)) {
          return related;
        }
        if (_.isArray(related)) {
          return related.join(',');
        }
        return related.pluck('@subject').join(',');
      },
      _prepareVIE: function() {
        if (!this.options.vie) {
          this.options.vie = new VIE;
        }
        if (this.options.vie.services.dbpedia) {
          return;
        }
        if (!this.options.dbPediaUrl) {
          return;
        }
        return this.options.vie.use(new vie.DBPediaService({
          url: this.options.dbPediaUrl,
          proxyDisabled: true
        }));
      },
      _getSuggestions: function() {
        var limit, normalizedTags, tags;
        if (this.loaded) {
          return;
        }
        if (!this.options.entity) {
          return;
        }
        jQuery('.activitySpinner', this.element).show();
        tags = this.options.entity.get('skos:related');
        if (tags.length === 0) {
          jQuery("#activitySpinner").html('No images found.');
          return;
        }
        jQuery('.imageThumbnailContainer ul', this.element).empty();
        normalizedTags = this._normalizeRelated(tags);
        limit = this.options.limit;
        if (this.options.getSuggestions) {
          this.options.getSuggestions(normalizedTags, limit, 0, this._showSuggestions);
        }
        this._prepareVIE();
        if (this.options.vie.services.dbpedia) {
          this._getSuggestionsDbPedia(tags);
        }
        return this.loaded = true;
      },
      _getSuggestionsDbPedia: function(tags) {
        var thumbId, widget;
        widget = this;
        thumbId = 1;
        return _.each(tags, function(tag) {
          return vie.load({
            entity: tag
          }).using('dbpedia').execute().done(function(entities) {
            jQuery('.activitySpinner', this.element).hide();
            return _.each(entities, function(entity) {
              var img, thumbnail;
              thumbnail = entity.attributes[widget.options.thumbnailUri];
              if (!thumbnail) {
                return;
              }
              if (_.isObject(thumbnail)) {
                img = thumbnail[0].value;
              }
              if (_.isString(thumbnail)) {
                img = widget.options.entity.fromReference(thumbnail);
              }
              return widget._showSuggestion({
                url: img,
                label: tag
              });
            });
          });
        });
      },
      _showSuggestion: function(image) {
        var html,
          _this = this;
        html = jQuery("<li>        <img src=\"" + image.url + "\" class=\"imageThumbnail\"          title=\"" + image.label + "\">        </li>");
        html.on('click', function() {
          return _this.options.imageWidget.setCurrent(image);
        });
        return jQuery('.imageThumbnailContainer ul', this.element).append(html);
      },
      _showSuggestions: function(suggestions) {
        var _this = this;
        jQuery('.activitySpinner', this.element).hide();
        return _.each(suggestions, function(image) {
          return _this._showSuggestion(image);
        });
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget('IKS.halloimagecurrent', {
      options: {
        imageWidget: null,
        startPlace: '',
        draggables: [],
        maxWidth: 400,
        maxHeight: 200
      },
      _create: function() {
        this.element.html('<div>\
        <div class="activeImageContainer">\
          <div class="rotationWrapper">\
            <div class="hintArrow"></div>\
              <img src="" class="activeImage" />\
            </div>\
            <img src="" class="activeImage activeImageBg" />\
          </div>\
        </div>');
        this.element.hide();
        return this._prepareDnD();
      },
      _init: function() {
        var editable, widget;
        editable = jQuery(this.options.editable.element);
        widget = this;
        jQuery('img', editable).each(function(index, elem) {
          return widget._initDraggable(elem, editable);
        });
        return jQuery('p', editable).each(function(index, elem) {
          if (jQuery(elem).data('jquery_droppable_initialized')) {
            return;
          }
          jQuery(elem).droppable({
            tolerance: 'pointer',
            drop: function(event, ui) {
              return widget._handleDropEvent(event, ui);
            },
            over: function(event, ui) {
              return widget._handleOverEvent(event, ui);
            },
            out: function(event, ui) {
              return widget._handleLeaveEvent(event, ui);
            }
          });
          return jQuery(elem).data('jquery_droppable_initialized', true);
        });
      },
      _prepareDnD: function() {
        var editable, overlayMiddleConfig, widget;
        widget = this;
        editable = jQuery(this.options.editable.element);
        this.options.offset = editable.offset();
        this.options.third = parseFloat(editable.width() / 3);
        overlayMiddleConfig = {
          width: this.options.third,
          height: editable.height()
        };
        this.overlay = {
          big: jQuery("<div/>").addClass("bigOverlay").css({
            width: this.options.third * 2,
            height: editable.height()
          }),
          left: jQuery("<div/>").addClass("smallOverlay smallOverlayLeft"),
          right: jQuery("<div/>").addClass("smallOverlay smallOverlayRight")
        };
        this.overlay.left.css(overlayMiddleConfig);
        this.overlay.right.css(overlayMiddleConfig).css("left", this.options.third * 2);
        editable.on('halloactivated', function() {
          return widget._enableDragging();
        });
        return editable.on('hallodeactivated', function() {
          return widget._disableDragging();
        });
      },
      setImage: function(image) {
        if (!image) {
          return;
        }
        this.element.show();
        jQuery('.activeImage', this.element).attr('src', image.url);
        if (image.label) {
          jQuery('input', this.element).val(image.label);
        }
        return this._initImage(jQuery(this.options.editable.element));
      },
      _delayAction: function(functionToCall, delay) {
        var timer;
        timer = clearTimeout(timer);
        if (!timer) {
          return timer = setTimeout(functionToCall, delay);
        }
      },
      _calcDropPosition: function(offset, event) {
        var position, rightTreshold;
        position = offset.left + this.options.third;
        rightTreshold = offset.left + this.options.third * 2;
        if (event.pageX >= position && event.pageX <= rightTreshold) {
          return 'middle';
        } else if (event.pageX < position) {
          return 'left';
        } else if (event.pageX > rightTreshold) {
          return 'right';
        }
      },
      _createInsertElement: function(image, tmp) {
        var imageInsert, tmpImg;
        imageInsert = jQuery('<img>');
        tmpImg = new Image();
        jQuery(tmpImg).on('load', function() {});
        tmpImg.src = image.src;
        imageInsert.attr({
          src: tmpImg.src,
          alt: !tmp ? jQuery(image).attr('alt') : void 0,
          "class": tmp ? 'halloTmp' : 'imageInText'
        });
        imageInsert.show();
        return imageInsert;
      },
      _createLineFeedbackElement: function() {
        return jQuery('<div/>').addClass('halloTmpLine');
      },
      _removeFeedbackElements: function() {
        this.overlay.big.remove();
        this.overlay.left.remove();
        this.overlay.right.remove();
        return jQuery('.halloTmp, .halloTmpLine', this.options.editable.element).remove();
      },
      _removeCustomHelper: function() {
        return jQuery('.customHelper').remove();
      },
      _showOverlay: function(position) {
        var eHeight, editable;
        editable = jQuery(this.options.editable.element);
        eHeight = editable.height();
        eHeight += parseFloat(editable.css('paddingTop'));
        eHeight += parseFloat(editable.css('paddingBottom'));
        this.overlay.big.css({
          height: eHeight
        });
        this.overlay.left.css({
          height: eHeight
        });
        this.overlay.right.css({
          height: eHeight
        });
        switch (position) {
          case 'left':
            this.overlay.big.addClass("bigOverlayLeft");
            this.overlay.big.removeClass("bigOverlayRight");
            this.overlay.big.css({
              left: this.options.third
            });
            this.overlay.big.show();
            this.overlay.left.hide();
            return this.overlay.right.hide();
          case 'middle':
            this.overlay.big.removeClass("bigOverlayLeft bigOverlayRight");
            this.overlay.big.hide();
            this.overlay.left.show();
            return this.overlay.right.show();
          case 'right':
            this.overlay.big.addClass("bigOverlayRight");
            this.overlay.big.removeClass("bigOverlayLeft");
            this.overlay.big.css({
              left: 0
            });
            this.overlay.big.show();
            this.overlay.left.hide();
            return this.overlay.right.hide();
        }
      },
      _checkOrigin: function(event) {
        if (jQuery(event.target).parents("[contenteditable]").length !== 0) {
          return true;
        }
        return false;
      },
      _createFeedback: function(image, position) {
        var el;
        if (position === 'middle') {
          return this._createLineFeedbackElement();
        }
        el = this._createInsertElement(image, true);
        return el.addClass("inlineImage-" + position);
      },
      _handleOverEvent: function(event, ui) {
        var editable, postPone, widget;
        widget = this;
        editable = jQuery(this.options.editable);
        postPone = function() {
          var position, target;
          window.waitWithTrash = clearTimeout(window.waitWithTrash);
          position = widget._calcDropPosition(widget.options.offset, event);
          jQuery('.trashcan', ui.helper).remove();
          editable[0].element.append(widget.overlay.big);
          editable[0].element.append(widget.overlay.left);
          editable[0].element.append(widget.overlay.right);
          widget._removeFeedbackElements();
          target = jQuery(event.target);
          target.prepend(widget._createFeedback(ui.draggable[0], position));
          if (position === 'middle') {
            target.prepend(widget._createFeedback(ui.draggable[0], 'right'));
            jQuery('.halloTmp', event.target).hide();
          } else {
            target.prepend(widget._createFeedback(ui.draggable[0], 'middle'));
            jQuery('.halloTmpLine', event.target).hide();
          }
          return widget._showOverlay(position);
        };
        return setTimeout(postPone, 5);
      },
      _handleDragEvent: function(event, ui) {
        var position, tmpFeedbackLR, tmpFeedbackMiddle;
        position = this._calcDropPosition(this.options.offset, event);
        if (position === this._lastPositionDrag) {
          return;
        }
        this._lastPositionDrag = position;
        tmpFeedbackLR = jQuery('.halloTmp', this.options.editable.element);
        tmpFeedbackMiddle = jQuery('.halloTmpLine', this.options.editable.element);
        if (position === 'middle') {
          tmpFeedbackMiddle.show();
          tmpFeedbackLR.hide();
        } else {
          tmpFeedbackMiddle.hide();
          tmpFeedbackLR.removeClass('inlineImage-left inlineImage-right');
          tmpFeedbackLR.addClass("inlineImage-" + position);
          tmpFeedbackLR.show();
        }
        return this._showOverlay(position);
      },
      _handleLeaveEvent: function(event, ui) {
        var func;
        func = function() {
          if (!jQuery('div.trashcan', ui.helper).length) {
            jQuery(ui.helper).append(jQuery('<div class="trashcan"></div>'));
            return jQuery('.bigOverlay, .smallOverlay').remove();
          }
        };
        window.waitWithTrash = setTimeout(func, 200);
        return this._removeFeedbackElements();
      },
      _handleStartEvent: function(event, ui) {
        var internalDrop;
        internalDrop = this._checkOrigin(event);
        if (internalDrop) {
          jQuery(event.target).remove();
        }
        jQuery(document).trigger('startPreventSave');
        return this.options.startPlace = jQuery(event.target);
      },
      _handleStopEvent: function(event, ui) {
        var internalDrop;
        internalDrop = this._checkOrigin(event);
        if (internalDrop) {
          jQuery(event.target).remove();
        } else {
          jQuery(this.options.editable.element).trigger('change');
        }
        this.overlay.big.hide();
        this.overlay.left.hide();
        this.overlay.right.hide();
        return jQuery(document).trigger('stopPreventSave');
      },
      _handleDropEvent: function(event, ui) {
        var classes, editable, imageInsert, internalDrop, left, position;
        editable = jQuery(this.options.editable.element);
        internalDrop = this._checkOrigin(event);
        position = this._calcDropPosition(this.options.offset, event);
        this._removeFeedbackElements();
        this._removeCustomHelper();
        imageInsert = this._createInsertElement(ui.draggable[0], false);
        classes = 'inlineImage-middle inlineImage-left inlineImage-right';
        if (position === 'middle') {
          imageInsert.show();
          imageInsert.removeClass(classes);
          left = editable.width();
          left += parseFloat(editable.css('paddingLeft'));
          left += parseFloat(editable.css('paddingRight'));
          left -= imageInsert.attr('width');
          imageInsert.addClass("inlineImage-" + position).css({
            position: 'relative',
            left: left / 2
          });
          imageInsert.insertBefore(jQuery(event.target));
        } else {
          imageInsert.removeClass(classes);
          imageInsert.addClass("inlineImage-" + position);
          imageInsert.css('display', 'block');
          jQuery(event.target).prepend(imageInsert);
        }
        this.overlay.big.hide();
        this.overlay.left.hide();
        this.overlay.right.hide();
        editable.trigger('change');
        return this._initImage(editable);
      },
      _createHelper: function(event) {
        return jQuery('<div>').css({
          backgroundImage: "url(" + (jQuery(event.currentTarget).attr('src')) + ")"
        }).addClass('customHelper').appendTo('body');
      },
      _initDraggable: function(elem, editable) {
        var widget;
        widget = this;
        if (!elem.jquery_draggable_initialized) {
          elem.jquery_draggable_initialized = true;
          jQuery(elem).draggable({
            cursor: 'move',
            helper: function(event) {
              return widget._createHelper(event);
            },
            drag: function(event, ui) {
              return widget._handleDragEvent(event, ui);
            },
            start: function(event, ui) {
              return widget._handleStartEvent(event, ui);
            },
            stop: function(event, ui) {
              return widget._handleStopEvent(event, ui);
            },
            disabled: !editable.hasClass('inEditMode'),
            cursorAt: {
              top: 50,
              left: 50
            }
          });
        }
        return widget.options.draggables.push(elem);
      },
      _initImage: function(editable) {
        var widget;
        widget = this;
        return jQuery('.rotationWrapper img', this.options.dialog).each(function(index, elem) {
          return widget._initDraggable(elem, editable);
        });
      },
      _enableDragging: function() {
        return jQuery.each(this.options.draggables, function(index, d) {
          return jQuery(d).draggable('option', 'disabled', false);
        });
      },
      _disableDragging: function() {
        return jQuery.each(this.options.draggables, function(index, d) {
          return jQuery(d).draggable('option', 'disabled', true);
        });
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget("IKS.hallojustify", {
      options: {
        editable: null,
        toolbar: null,
        uuid: '',
        buttonCssClass: null
      },
      populateToolbar: function(toolbar) {
        var buttonize, buttonset,
          _this = this;
        buttonset = jQuery("<span class=\"" + this.widgetName + "\"></span>");
        buttonize = function(alignment) {
          var buttonElement;
          buttonElement = jQuery('<span></span>');
          buttonElement.hallobutton({
            uuid: _this.options.uuid,
            editable: _this.options.editable,
            label: alignment,
            command: "justify" + alignment,
            icon: "icon-align-" + (alignment.toLowerCase()),
            cssClass: _this.options.buttonCssClass
          });
          return buttonset.append(buttonElement);
        };
        buttonize("Left");
        buttonize("Center");
        buttonize("Right");
        buttonset.hallobuttonset();
        return toolbar.append(buttonset);
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget('IKS.halloblacklist', {
      options: {
        tags: []
      },
      _init: function() {
        if (this.options.tags.indexOf('br') !== -1) {
          return this.element.on('keydown', function(event) {
            if (event.originalEvent.keyCode === 13) {
              return event.preventDefault();
            }
          });
        }
      },
      cleanupContentClone: function(el) {
        var tag, _i, _len, _ref, _results;
        _ref = this.options.tags;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          tag = _ref[_i];
          _results.push(jQuery(tag, el).remove());
        }
        return _results;
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget("Liip.hallotoolbarlinebreak", {
      options: {
        editable: null,
        uuid: "",
        breakAfter: []
      },
      populateToolbar: function(toolbar) {
        var buttonRow, buttonset, buttonsets, queuedButtonsets, row, rowcounter, _i, _j, _len, _len1, _ref;
        buttonsets = jQuery('.ui-buttonset', toolbar);
        queuedButtonsets = jQuery();
        rowcounter = 0;
        _ref = this.options.breakAfter;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          row = _ref[_i];
          rowcounter++;
          buttonRow = "<div          class=\"halloButtonrow halloButtonrow-" + rowcounter + "\" />";
          for (_j = 0, _len1 = buttonsets.length; _j < _len1; _j++) {
            buttonset = buttonsets[_j];
            queuedButtonsets = jQuery(queuedButtonsets).add(jQuery(buttonset));
            if (jQuery(buttonset).hasClass(row)) {
              queuedButtonsets.wrapAll(buttonRow);
              buttonsets = buttonsets.not(queuedButtonsets);
              queuedButtonsets = jQuery();
              break;
            }
          }
        }
        if (buttonsets.length > 0) {
          rowcounter++;
          buttonRow = "<div          class=\"halloButtonrow halloButtonrow-" + rowcounter + "\" />";
          return buttonsets.wrapAll(buttonRow);
        }
      }
    });
  })(jQuery);

  (function(jQuery) {
    jQuery.widget('IKS.hallobutton', {
      button: null,
      isChecked: false,
      options: {
        uuid: '',
        label: null,
        icon: null,
        editable: null,
        command: null,
        commandValue: null,
        queryState: true,
        cssClass: null
      },
      _create: function() {
        var hoverclass, id, opts, _base, _ref,
          _this = this;
        if ((_ref = (_base = this.options).icon) == null) {
          _base.icon = "icon-" + (this.options.label.toLowerCase());
        }
        id = "" + this.options.uuid + "-" + this.options.label;
        opts = this.options;
        this.button = this._createButton(id, opts.command, opts.label, opts.icon);
        this.element.append(this.button);
        if (this.options.cssClass) {
          this.button.addClass(this.options.cssClass);
        }
        if (this.options.editable.options.touchScreen) {
          this.button.addClass('btn-large');
        }
        this.button.data('hallo-command', this.options.command);
        if (this.options.commandValue) {
          this.button.data('hallo-command-value', this.options.commandValue);
        }
        hoverclass = 'ui-state-hover';
        this.button.on('mouseenter', function(event) {
          if (_this.isEnabled()) {
            return _this.button.addClass(hoverclass);
          }
        });
        return this.button.on('mouseleave', function(event) {
          return _this.button.removeClass(hoverclass);
        });
      },
      _init: function() {
        var editableElement, events, queryState,
          _this = this;
        if (!this.button) {
          this.button = this._prepareButton();
        }
        this.element.append(this.button);
        if (this.options.queryState === true) {
          queryState = function(event) {
            var compared, value;
            if (!_this.options.command) {
              return;
            }
            try {
              if (_this.options.commandValue) {
                value = document.queryCommandValue(_this.options.command);
                compared = value.match(new RegExp(_this.options.commandValue, "i"));
                return _this.checked(compared ? true : false);
              } else {
                return _this.checked(document.queryCommandState(_this.options.command));
              }
            } catch (e) {

            }
          };
        } else {
          queryState = this.options.queryState;
        }
        if (this.options.command) {
          this.button.on('click', function(event) {
            if (_this.options.commandValue) {
              _this.options.editable.execute(_this.options.command, _this.options.commandValue);
            } else {
              _this.options.editable.execute(_this.options.command);
            }
            queryState();
            return false;
          });
        }
        if (!this.options.queryState) {
          return;
        }
        editableElement = this.options.editable.element;
        events = 'keyup paste change mouseup hallomodified';
        editableElement.on(events, queryState);
        editableElement.on('halloenabled', function() {
          return editableElement.on(events, queryState);
        });
        return editableElement.on('hallodisabled', function() {
          return editableElement.off(events, queryState);
        });
      },
      enable: function() {
        return this.button.removeAttr('disabled');
      },
      disable: function() {
        return this.button.attr('disabled', 'true');
      },
      isEnabled: function() {
        return this.button.attr('disabled') !== 'true';
      },
      refresh: function() {
        if (this.isChecked) {
          return this.button.addClass('ui-state-active');
        } else {
          return this.button.removeClass('ui-state-active');
        }
      },
      checked: function(checked) {
        this.isChecked = checked;
        return this.refresh();
      },
      _createButton: function(id, command, label, icon) {
        var classes;
        classes = ['ui-button', 'ui-widget', 'ui-state-default', 'ui-corner-all', 'ui-button-text-only', "" + command + "_button"];
        return jQuery("<button id=\"" + id + "\"        class=\"" + (classes.join(' ')) + "\" title=\"" + label + "\">          <span class=\"ui-button-text\">            <i class=\"" + icon + "\"></i>          </span>        </button>");
      }
    });
    return jQuery.widget('IKS.hallobuttonset', {
      buttons: null,
      _create: function() {
        return this.element.addClass('ui-buttonset');
      },
      _init: function() {
        return this.refresh();
      },
      refresh: function() {
        var rtl;
        rtl = this.element.css('direction') === 'rtl';
        this.buttons = this.element.find('.ui-button');
        this.buttons.removeClass('ui-corner-all ui-corner-left ui-corner-right');
        if (rtl) {
          this.buttons.filter(':first').addClass('ui-corner-right');
          return this.buttons.filter(':last').addClass('ui-corner-left');
        } else {
          this.buttons.filter(':first').addClass('ui-corner-left');
          return this.buttons.filter(':last').addClass('ui-corner-right');
        }
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget('IKS.hallodropdownbutton', {
      button: null,
      options: {
        uuid: '',
        label: null,
        icon: null,
        editable: null,
        target: '',
        cssClass: null
      },
      _create: function() {
        var _base, _ref;
        return (_ref = (_base = this.options).icon) != null ? _ref : _base.icon = "icon-" + (this.options.label.toLowerCase());
      },
      _init: function() {
        var target,
          _this = this;
        target = jQuery(this.options.target);
        target.css('position', 'absolute');
        target.addClass('dropdown-menu');
        target.hide();
        if (!this.button) {
          this.button = this._prepareButton();
        }
        this.button.on('click', function() {
          if (target.hasClass('open')) {
            _this._hideTarget();
            return;
          }
          return _this._showTarget();
        });
        target.on('click', function() {
          return _this._hideTarget();
        });
        this.options.editable.element.on('hallodeactivated', function() {
          return _this._hideTarget();
        });
        return this.element.append(this.button);
      },
      _showTarget: function() {
        var target;
        target = jQuery(this.options.target);
        this._updateTargetPosition();
        target.addClass('open');
        return target.show();
      },
      _hideTarget: function() {
        var target;
        target = jQuery(this.options.target);
        target.removeClass('open');
        return target.hide();
      },
      _updateTargetPosition: function() {
        var left, target, top, _ref;
        target = jQuery(this.options.target);
        _ref = this.button.position(), top = _ref.top, left = _ref.left;
        top += this.button.outerHeight();
        target.css('top', top);
        return target.css('left', left - 20);
      },
      _prepareButton: function() {
        var buttonEl, classes, id;
        id = "" + this.options.uuid + "-" + this.options.label;
        classes = ['ui-button', 'ui-widget', 'ui-state-default', 'ui-corner-all', 'ui-button-text-only'];
        buttonEl = jQuery("<button id=\"" + id + "\"       class=\"" + (classes.join(' ')) + "\" title=\"" + this.options.label + "\">       <span class=\"ui-button-text\"><i class=\"" + this.options.icon + "\"></i></span>       </button>");
        if (this.options.cssClass) {
          buttonEl.addClass(this.options.cssClass);
        }
        return buttonEl;
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget('IKS.halloToolbarFixed', {
      toolbar: null,
      options: {
        parentElement: 'body',
        editable: null,
        toolbar: null,
        affix: true,
        affixTopOffset: 2
      },
      _create: function() {
        var el, widthToAdd,
          _this = this;
        this.toolbar = this.options.toolbar;
        this.toolbar.show();
        jQuery(this.options.parentElement).append(this.toolbar);
        this._bindEvents();
        jQuery(window).resize(function(event) {
          return _this.setPosition();
        });
        jQuery(window).scroll(function(event) {
          return _this.setPosition();
        });
        if (this.options.parentElement === 'body') {
          el = jQuery(this.element);
          widthToAdd = parseFloat(el.css('padding-left'));
          widthToAdd += parseFloat(el.css('padding-right'));
          widthToAdd += parseFloat(el.css('border-left-width'));
          widthToAdd += parseFloat(el.css('border-right-width'));
          widthToAdd += (parseFloat(el.css('outline-width'))) * 2;
          widthToAdd += (parseFloat(el.css('outline-offset'))) * 2;
          return jQuery(this.toolbar).css("width", el.width() + widthToAdd);
        }
      },
      _getPosition: function(event, selection) {
        var offset, position, width;
        if (!event) {
          return;
        }
        width = parseFloat(this.element.css('outline-width'));
        offset = width + parseFloat(this.element.css('outline-offset'));
        return position = {
          top: this.element.offset().top - this.toolbar.outerHeight() - offset,
          left: this.element.offset().left - offset
        };
      },
      _getCaretPosition: function(range) {
        var newRange, position, tmpSpan;
        tmpSpan = jQuery("<span/>");
        newRange = rangy.createRange();
        newRange.setStart(range.endContainer, range.endOffset);
        newRange.insertNode(tmpSpan.get(0));
        position = {
          top: tmpSpan.offset().top,
          left: tmpSpan.offset().left
        };
        tmpSpan.remove();
        return position;
      },
      setPosition: function() {
        var elementBottom, elementTop, height, offset, scrollTop, topOffset;
        if (this.options.parentElement !== 'body') {
          return;
        }
        this.toolbar.css('position', 'absolute');
        this.toolbar.css('top', this.element.offset().top - this.toolbar.outerHeight());
        if (this.options.affix) {
          scrollTop = jQuery(window).scrollTop();
          offset = this.element.offset();
          height = this.element.height();
          topOffset = this.options.affixTopOffset;
          elementTop = offset.top - (this.toolbar.height() + this.options.affixTopOffset);
          elementBottom = (height - topOffset) + (offset.top - this.toolbar.height());
          if (scrollTop > elementTop && scrollTop < elementBottom) {
            this.toolbar.css('position', 'fixed');
            this.toolbar.css('top', this.options.affixTopOffset);
          }
        } else {

        }
        return this.toolbar.css('left', this.element.offset().left - 2);
      },
      _updatePosition: function(position) {},
      _bindEvents: function() {
        var _this = this;
        this.element.on('halloactivated', function(event, data) {
          _this.setPosition();
          return _this.toolbar.show();
        });
        return this.element.on('hallodeactivated', function(event, data) {
          return _this.toolbar.hide();
        });
      }
    });
  })(jQuery);

  (function(jQuery) {
    return jQuery.widget('IKS.halloToolbarContextual', {
      toolbar: null,
      options: {
        parentElement: 'body',
        editable: null,
        toolbar: null,
        positionAbove: false
      },
      _create: function() {
        var _this = this;
        this.toolbar = this.options.toolbar;
        jQuery(this.options.parentElement).append(this.toolbar);
        this._bindEvents();
        return jQuery(window).resize(function(event) {
          return _this._updatePosition(_this._getPosition(event));
        });
      },
      _getPosition: function(event, selection) {
        var eventType, position;
        if (!event) {
          return;
        }
        eventType = event.type;
        switch (eventType) {
          case 'keydown':
          case 'keyup':
          case 'keypress':
            return this._getCaretPosition(selection);
          case 'click':
          case 'mousedown':
          case 'mouseup':
            return position = {
              top: event.pageY,
              left: event.pageX
            };
        }
      },
      _getCaretPosition: function(range) {
        var newRange, position, tmpSpan;
        tmpSpan = jQuery("<span/>");
        newRange = rangy.createRange();
        newRange.setStart(range.endContainer, range.endOffset);
        newRange.insertNode(tmpSpan.get(0));
        position = {
          top: tmpSpan.offset().top,
          left: tmpSpan.offset().left
        };
        tmpSpan.remove();
        return position;
      },
      setPosition: function() {
        if (this.options.parentElement !== 'body') {
          this.options.parentElement = 'body';
          jQuery(this.options.parentElement).append(this.toolbar);
        }
        this.toolbar.css('position', 'absolute');
        this.toolbar.css('top', this.element.offset().top - 20);
        return this.toolbar.css('left', this.element.offset().left);
      },
      _updatePosition: function(position, selection) {
        var left, selectionRect, toolbar_height_offset, top, top_offset;
        if (selection == null) {
          selection = null;
        }
        if (!position) {
          return;
        }
        if (!(position.top && position.left)) {
          return;
        }
        toolbar_height_offset = this.toolbar.outerHeight() + 10;
        if (selection && !selection.collapsed && selection.nativeRange) {
          selectionRect = selection.nativeRange.getBoundingClientRect();
          if (this.options.positionAbove) {
            top_offset = selectionRect.top - toolbar_height_offset;
          } else {
            top_offset = selectionRect.bottom + 10;
          }
          top = jQuery(window).scrollTop() + top_offset;
          left = jQuery(window).scrollLeft() + selectionRect.left;
        } else {
          if (this.options.positionAbove) {
            top_offset = -10 - toolbar_height_offset;
          } else {
            top_offset = 20;
          }
          top = position.top + top_offset;
          left = position.left - this.toolbar.outerWidth() / 2 + 30;
        }
        this.toolbar.css('top', top);
        return this.toolbar.css('left', left);
      },
      _bindEvents: function() {
        var _this = this;
        this.element.on('halloselected', function(event, data) {
          var position;
          position = _this._getPosition(data.originalEvent, data.selection);
          if (!position) {
            return;
          }
          _this._updatePosition(position, data.selection);
          if (_this.toolbar.html() !== '') {
            return _this.toolbar.show();
          }
        });
        this.element.on('hallounselected', function(event, data) {
          return _this.toolbar.hide();
        });
        return this.element.on('hallodeactivated', function(event, data) {
          return _this.toolbar.hide();
        });
      }
    });
  })(jQuery);

  /*
  Hallo 1.0.2 - a rich text editing jQuery UI widget
  (c) 2011 Henri Bergius, IKS Consortium
  Hallo may be freely distributed under the MIT license
  http://hallojs.org
  */


  (function(jQuery) {
    return jQuery.widget('IKS.hallo', {
      toolbar: null,
      bound: false,
      originalContent: '',
      previousContent: '',
      uuid: '',
      selection: null,
      _keepActivated: false,
      originalHref: null,
      options: {
        editable: true,
        plugins: {},
        toolbar: 'halloToolbarContextual',
        parentElement: 'body',
        buttonCssClass: null,
        toolbarCssClass: null,
        toolbarPositionAbove: false,
        toolbarOptions: {},
        placeholder: '',
        forceStructured: true,
        checkTouch: true,
        touchScreen: null
      },
      _create: function() {
        var options, plugin, _ref,
          _this = this;
        this.id = this._generateUUID();
        if (this.options.checkTouch && this.options.touchScreen === null) {
          this.checkTouch();
        }
        _ref = this.options.plugins;
        for (plugin in _ref) {
          options = _ref[plugin];
          if (!jQuery.isPlainObject(options)) {
            options = {};
          }
          jQuery.extend(options, {
            editable: this,
            uuid: this.id,
            buttonCssClass: this.options.buttonCssClass
          });
          jQuery(this.element)[plugin](options);
        }
        this.element.one('halloactivated', function() {
          return _this._prepareToolbar();
        });
        return this.originalContent = this.getContents();
      },
      _init: function() {
        if (this.options.editable) {
          return this.enable();
        } else {
          return this.disable();
        }
      },
      destroy: function() {
        var options, plugin, _ref;
        this.disable();
        if (this.toolbar) {
          this.toolbar.remove();
          this.element[this.options.toolbar]('destroy');
        }
        _ref = this.options.plugins;
        for (plugin in _ref) {
          options = _ref[plugin];
          jQuery(this.element)[plugin]('destroy');
        }
        return jQuery.Widget.prototype.destroy.call(this);
      },
      disable: function() {
        var _this = this;
        this.element.attr("contentEditable", false);
        this.element.off("focus", this._activated);
        this.element.off("blur", this._deactivated);
        this.element.off("keyup paste change", this._checkModified);
        this.element.off("keyup", this._keys);
        this.element.off("keyup mouseup", this._checkSelection);
        this.bound = false;
        jQuery(this.element).removeClass('isModified');
        jQuery(this.element).removeClass('inEditMode');
        this.element.parents('a').andSelf().each(function(idx, elem) {
          var element;
          element = jQuery(elem);
          if (!element.is('a')) {
            return;
          }
          if (!_this.originalHref) {
            return;
          }
          return element.attr('href', _this.originalHref);
        });
        return this._trigger("disabled", null);
      },
      enable: function() {
        var _this = this;
        this.element.parents('a[href]').andSelf().each(function(idx, elem) {
          var element;
          element = jQuery(elem);
          if (!element.is('a[href]')) {
            return;
          }
          _this.originalHref = element.attr('href');
          return element.removeAttr('href');
        });
        this.element.attr("contentEditable", true);
        if (!this.element.html().trim()) {
          this.element.html(this.options.placeholder);
          this.element.css({
            'min-width': this.element.innerWidth(),
            'min-height': this.element.innerHeight()
          });
        }
        if (!this.bound) {
          this.element.on("focus", this, this._activated);
          this.element.on("blur", this, this._deactivated);
          this.element.on("keyup paste change", this, this._checkModified);
          this.element.on("keyup", this, this._keys);
          this.element.on("keyup mouseup", this, this._checkSelection);
          this.bound = true;
        }
        if (this.options.forceStructured) {
          this._forceStructured();
        }
        return this._trigger("enabled", null);
      },
      activate: function() {
        return this.element.focus();
      },
      containsSelection: function() {
        var range;
        range = this.getSelection();
        return this.element.has(range.startContainer).length > 0;
      },
      getSelection: function() {
        var range, sel;
        sel = rangy.getSelection();
        range = null;
        if (sel.rangeCount > 0) {
          range = sel.getRangeAt(0);
        } else {
          range = rangy.createRange();
        }
        return range;
      },
      restoreSelection: function(range) {
        var sel;
        sel = rangy.getSelection();
        return sel.setSingleRange(range);
      },
      replaceSelection: function(cb) {
        var newTextNode, r, range, sel, t;
        if (navigator.appName === 'Microsoft Internet Explorer') {
          t = document.selection.createRange().text;
          r = document.selection.createRange();
          return r.pasteHTML(cb(t));
        } else {
          sel = window.getSelection();
          range = sel.getRangeAt(0);
          newTextNode = document.createTextNode(cb(range.extractContents()));
          range.insertNode(newTextNode);
          range.setStartAfter(newTextNode);
          sel.removeAllRanges();
          return sel.addRange(range);
        }
      },
      removeAllSelections: function() {
        if (navigator.appName === 'Microsoft Internet Explorer') {
          return range.empty();
        } else {
          return window.getSelection().removeAllRanges();
        }
      },
      getContents: function() {
        var cleanup, contentClone, plugin;
        contentClone = this.element.clone();
        for (plugin in this.options.plugins) {
          cleanup = jQuery(this.element).data('IKS-' + plugin).cleanupContentClone;
          if (!jQuery.isFunction(cleanup)) {
            continue;
          }
          jQuery(this.element)[plugin]('cleanupContentClone', contentClone);
        }
        return contentClone.html();
      },
      setContents: function(contents) {
        return this.element.html(contents);
      },
      isModified: function() {
        if (!this.previousContent) {
          this.previousContent = this.originalContent;
        }
        return this.previousContent !== this.getContents();
      },
      setUnmodified: function() {
        jQuery(this.element).removeClass('isModified');
        return this.previousContent = this.getContents();
      },
      setModified: function() {
        jQuery(this.element).addClass('isModified');
        return this._trigger('modified', null, {
          editable: this,
          content: this.getContents()
        });
      },
      restoreOriginalContent: function() {
        return this.element.html(this.originalContent);
      },
      execute: function(command, value) {
        if (document.execCommand(command, false, value)) {
          return this.element.trigger("change");
        }
      },
      protectFocusFrom: function(el) {
        var _this = this;
        return el.on("mousedown", function(event) {
          event.preventDefault();
          _this._protectToolbarFocus = true;
          return setTimeout(function() {
            return _this._protectToolbarFocus = false;
          }, 300);
        });
      },
      keepActivated: function(_keepActivated) {
        this._keepActivated = _keepActivated;
      },
      _generateUUID: function() {
        var S4;
        S4 = function() {
          return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
        };
        return "" + (S4()) + (S4()) + "-" + (S4()) + "-" + (S4()) + "-" + (S4()) + "-" + (S4()) + (S4()) + (S4());
      },
      _prepareToolbar: function() {
        var defaults, plugin, populate, toolbarOptions;
        this.toolbar = jQuery('<div class="hallotoolbar"></div>').hide();
        if (this.options.toolbarCssClass) {
          this.toolbar.addClass(this.options.toolbarCssClass);
        }
        defaults = {
          editable: this,
          parentElement: this.options.parentElement,
          toolbar: this.toolbar,
          positionAbove: this.options.toolbarPositionAbove
        };
        toolbarOptions = $.extend({}, defaults, this.options.toolbarOptions);
        this.element[this.options.toolbar](toolbarOptions);
        for (plugin in this.options.plugins) {
          populate = jQuery(this.element).data('IKS-' + plugin).populateToolbar;
          if (!jQuery.isFunction(populate)) {
            continue;
          }
          this.element[plugin]('populateToolbar', this.toolbar);
        }
        this.element[this.options.toolbar]('setPosition');
        return this.protectFocusFrom(this.toolbar);
      },
      changeToolbar: function(element, toolbar, hide) {
        var originalToolbar;
        if (hide == null) {
          hide = false;
        }
        originalToolbar = this.options.toolbar;
        this.options.parentElement = element;
        if (toolbar) {
          this.options.toolbar = toolbar;
        }
        if (!this.toolbar) {
          return;
        }
        this.element[originalToolbar]('destroy');
        this.toolbar.remove();
        this._prepareToolbar();
        if (hide) {
          return this.toolbar.hide();
        }
      },
      _checkModified: function(event) {
        var widget;
        widget = event.data;
        if (widget.isModified()) {
          return widget.setModified();
        }
      },
      _keys: function(event) {
        var old, widget;
        widget = event.data;
        if (event.keyCode === 27) {
          old = widget.getContents();
          widget.restoreOriginalContent(event);
          widget._trigger("restored", null, {
            editable: widget,
            content: widget.getContents(),
            thrown: old
          });
          return widget.turnOff();
        }
      },
      _rangesEqual: function(r1, r2) {
        if (r1.startContainer !== r2.startContainer) {
          return false;
        }
        if (r1.startOffset !== r2.startOffset) {
          return false;
        }
        if (r1.endContainer !== r2.endContainer) {
          return false;
        }
        if (r1.endOffset !== r2.endOffset) {
          return false;
        }
        return true;
      },
      _checkSelection: function(event) {
        var widget;
        if (event.keyCode === 27) {
          return;
        }
        widget = event.data;
        return setTimeout(function() {
          var sel;
          sel = widget.getSelection();
          if (widget._isEmptySelection(sel) || widget._isEmptyRange(sel)) {
            if (widget.selection) {
              widget.selection = null;
              widget._trigger("unselected", null, {
                editable: widget,
                originalEvent: event
              });
            }
            return;
          }
          if (!widget.selection || !widget._rangesEqual(sel, widget.selection)) {
            widget.selection = sel.cloneRange();
            return widget._trigger("selected", null, {
              editable: widget,
              selection: widget.selection,
              ranges: [widget.selection],
              originalEvent: event
            });
          }
        }, 0);
      },
      _isEmptySelection: function(selection) {
        if (selection.type === "Caret") {
          return true;
        }
        return false;
      },
      _isEmptyRange: function(range) {
        if (range.collapsed) {
          return true;
        }
        if (range.isCollapsed) {
          if (typeof range.isCollapsed === 'function') {
            return range.isCollapsed();
          }
          return range.isCollapsed;
        }
        return false;
      },
      turnOn: function() {
        if (this.getContents() === this.options.placeholder) {
          this.setContents('');
        }
        jQuery(this.element).addClass('inEditMode');
        return this._trigger("activated", null, this);
      },
      turnOff: function() {
        jQuery(this.element).removeClass('inEditMode');
        this._trigger("deactivated", null, this);
        if (!this.getContents()) {
          return this.setContents(this.options.placeholder);
        }
      },
      _activated: function(event) {
        return event.data.turnOn();
      },
      _deactivated: function(event) {
        if (event.data._keepActivated) {
          return;
        }
        if (event.data._protectToolbarFocus !== true) {
          return event.data.turnOff();
        } else {
          return setTimeout(function() {
            return jQuery(event.data.element).focus();
          }, 300);
        }
      },
      _forceStructured: function(event) {
        try {
          return document.execCommand('styleWithCSS', 0, false);
        } catch (e) {
          try {
            return document.execCommand('useCSS', 0, true);
          } catch (e) {
            try {
              return document.execCommand('styleWithCSS', false, false);
            } catch (e) {

            }
          }
        }
      },
      checkTouch: function() {
        return this.options.touchScreen = !!('createTouch' in document);
      }
    });
  })(jQuery);

}).call(this);