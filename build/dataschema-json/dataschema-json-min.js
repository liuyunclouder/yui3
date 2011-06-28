YUI.add("dataschema-json",function(g){var c=g.Lang,f=c.isFunction,a=c.isObject,b=c.isArray,e=g.DataSchema.Base,d;d={getPath:function(h){var l=null,k=[],j=0;if(h){h=h.replace(/\[\s*(['"])(.*?)\1\s*\]/g,function(m,i,n){k[j]=n;return".@"+(j++);}).replace(/\[(\d+)\]/g,function(m,i){k[j]=parseInt(i,10)|0;return".@"+(j++);}).replace(/^\./,"");l=h.split(".");for(j=l.length-1;j>=0;--j){if(l[j].charAt(0)==="@"){l[j]=k[parseInt(l[j].substr(1),10)];}}}return l;},getLocationValue:function(l,k){var j=0,h=l.length;for(;j<h;j++){if(a(k)&&(l[j] in k)){k=k[l[j]];}else{k=undefined;break;}}return k;},apply:function(j,k){var h=k,i={results:[],meta:{}};if(!a(k)){try{h=g.JSON.parse(k);}catch(l){i.error=l;return i;}}if(a(h)&&j){i=d._parseResults.call(this,j,h,i);if(j.metaFields!==undefined){i=d._parseMeta(j.metaFields,h,i);}}else{i.error=new Error("JSON schema parse failure");}return i;},_parseResults:function(m,h,l){var i=d.getPath,j=d.getLocationValue,n=i(m.resultListLocator),k=n?(j(n,h)||h[m.resultListLocator]):h;if(b(k)){if(b(m.resultFields)){l=d._getFieldValues.call(this,m.resultFields,k,l);}else{l.results=k;}}else{l.results=[];l.error=new Error("JSON results retrieval failure");}return l;},_getFieldValues:function(s,p,n){var u=[],x=s.length,w,v,h,z,m,r,l,A,t=[],y=[],o=[],q,k;for(w=0;w<x;w++){h=s[w];z=h.key||h;m=h.locator||z;r=d.getPath(m);if(r){if(r.length===1){t.push({key:z,path:r[0]});}else{y.push({key:z,path:r,locator:m});}}else{}l=(f(h.parser))?h.parser:g.Parsers[h.parser+""];if(l){o.push({key:z,parser:l});}}for(w=p.length-1;w>=0;--w){k={};q=p[w];if(q){for(v=y.length-1;v>=0;--v){r=y[v];A=d.getLocationValue(r.path,q);if(A===undefined){A=d.getLocationValue([r.locator],q);if(A!==undefined){t.push({key:r.key,path:r.locator});y.splice(w,1);continue;}}k[r.key]=e.parse.call(this,(d.getLocationValue(r.path,q)),r);}for(v=t.length-1;v>=0;--v){r=t[v];k[r.key]=e.parse.call(this,((q[r.path]===undefined)?q[v]:q[r.path]),r);}for(v=o.length-1;v>=0;--v){z=o[v].key;k[z]=o[v].parser.call(this,k[z]);if(k[z]===undefined){k[z]=null;}}u[w]=k;}}n.results=u;return n;},_parseMeta:function(k,h,j){if(a(k)){var i,l;for(i in k){if(k.hasOwnProperty(i)){l=d.getPath(k[i]);if(l&&h){j.meta[i]=d.getLocationValue(l,h);}}}}else{j.error=new Error("JSON meta data retrieval failure");}return j;}};g.DataSchema.JSON=g.mix(d,e);},"@VERSION@",{requires:["dataschema-base","json"]});