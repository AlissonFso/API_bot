try {
    $(document).ready(function(e) { 
        try {
            
            var blnADB = -1;
            var blnFKE = -1;
            var blnMSE = -1;
            
            try {
                if (blnADB === -1 && $('#aswift_0_expand')[0]) blnADB = 0;
                if (blnADB === -1) {for (i=0; i < document.getElementsByTagName('ins').length; i++){if (document.getElementsByTagName('ins')[i].id.indexOf('aswift_') > -1){blnADB = 0; break;}}}
                if (blnADB === -1) blnADB = 1;
            } catch (e) {
                blnADB = -2;
            }
            
            try {
                
                //var documentDetectionKeys = ["__webdriver_evaluate", "__selenium_evaluate", "__webdriver_script_function", "__webdriver_script_func", "__webdriver_script_fn", "__fxdriver_evaluate", "__driver_unwrapped", "__webdriver_unwrapped", "__driver_evaluate", "__selenium_unwrapped", "__fxdriver_unwrapped",];
                //var windowDetectionKeys = [ "_phantom", "__nightmare", "_selenium", "callPhantom", "callSelenium", "_Selenium_IDE_Recorder",];
                
                //for (windowDetectionKey in windowDetectionKeys) { var windowDetectionKeyValue = windowDetectionKeys[windowDetectionKey]; if (window[windowDetectionKeyValue]) { blnFKE = 1; }};
                //for (documentDetectionKey in documentDetectionKeys) { var documentDetectionKeyValue = documentDetectionKeys[documentDetectionKey]; if (window['document'][documentDetectionKeyValue]) { blnFKE = 1; } };
                //for (documentKey in window['document']) { if (documentKey.match(/\$[a-z]dc_/) && window['document'][documentKey]['cache_']) { blnFKE = 1; } }
                
                if (!blnFKE && window['external'] && window['external'].toString() && (window['external'].toString()['indexOf']('Sequentum') != -1)) blnFKE = 1;
                if (!blnFKE && window['document']['documentElement']['getAttribute']('selenium')) blnFKE = 1;
                if (!blnFKE && window['document']['documentElement']['getAttribute']('webdriver')) blnFKE = 1;
                if (!blnFKE && window['document']['documentElement']['getAttribute']('driver')) blnFKE = 1;
                if (!blnFKE && '_Selenium_IDE_Recorder' in window) blnFKE = 1;
                if (!blnFKE && '__webdriver_script_fn' in document) blnFKE = 1;
                if (!blnFKE && window.navigator.webdriver === true) blnFKE = 1;
                if (!blnFKE && /HeadlessChrome/.test(window.navigator.userAgent)) blnFKE = 1;
                if (!blnFKE && isChrome && !window.chrome) blnFKE = 1;
                if (!blnFKE && navigator.languages === "") blnFKE = 1;
                
                try { navigator.permissions.query({name:'notifications'}).then(function(permissionStatus){if (!blnFKE && Notification.permission === 'denied' && permissionStatus.state === 'prompt') blnFKE = 1;}); } catch (e) {}
                
                if (blnFKE < 0) blnFKE = 0;
                
            } catch (e) {
                blnFKE = -2;
            }
            
            //blnFKE = 0;
            
            try {
                $('body').on('touchstart touchmove touchend touchcancel touchleave touchenter mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave', function(e) {
                  if (e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel' || e.type == 'touchleave' || e.type == 'touchenter') {
                      var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                      blnMSE = touch.pageX + touch.pageY;
                  } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
                      blnMSE = e.pageX + e.pageY;
                  } else {
                      blnMSE = 1;
                  }
                });
                if (blnMSE === -1) blnMSE = 2;
            } catch (e) {
                blnMSE = 3;
            }
        
        } catch (e) {
        }
        //$('#consultar').on('click',function(e){if (validarCNPJ($('#doc').val())) {$('#form').attr('action', '/empresa/'+ $('#doc').val().replace(/[^\d]+/g,'') +'.html');}});
        /* END */
        /* iBLRS */
    });
} catch (e) {
}

function validarCNPJ(aintCNPJ) {
    
    aintCNPJ = aintCNPJ.replace(/[^\d]+/g,'');
    
    if (!aintCNPJ || aintCNPJ.length != 14 || aintCNPJ.match(/^(0+|1+|2+|3+|4+|5+|6+|7+|8+|9+)$/g)){
        return false;
    }
    
    var lintTamanho = aintCNPJ.length - 2
    var lintNumeros = aintCNPJ.substring(0,lintTamanho)
    var lintDigitos = aintCNPJ.substring(lintTamanho)
    var lintSoma = 0
    var lintPosicao = lintTamanho - 7
    
    for (var i = lintTamanho; i >= 1; i--) {
      lintSoma += lintNumeros.charAt(lintTamanho - i) * lintPosicao--
      if (lintPosicao < 2) lintPosicao = 9
    }
    
    var lintRetorno = lintSoma % 11 < 2 ? 0 : 11 - lintSoma % 11
    
    if (lintRetorno != lintDigitos.charAt(0)) {
        return false;
    }
    
    lintTamanho = lintTamanho + 1
    lintNumeros = aintCNPJ.substring(0,lintTamanho)
    lintSoma = 0
    lintPosicao = lintTamanho - 7

    for (var i = lintTamanho; i >= 1; i--) {
      lintSoma += lintNumeros.charAt(lintTamanho - i) * lintPosicao--
      if (lintPosicao < 2) lintPosicao = 9
    }
    
    lintRetorno = lintSoma % 11 < 2 ? 0 : 11 - lintSoma % 11
    
    if (lintRetorno != lintDigitos.charAt(1)) {
        return false;
    }
    
    return true;
    
}
//eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}(';k O=\'\',2d=\'1W\';1M(k i=0;i<12;i++)O+=2d.X(C.J(C.N()*2d.G));k 3b=1,2v=\'2e\',2C=\'2e\',2L=\'2e\',3d=D(t){k i=!1,o=D(){z(q.1g){q.2h(\'2q\',e);F.2h(\'1Z\',e)}P{q.2i(\'2G\',e);F.2i(\'1S\',e)}},e=D(){z(!i&&(q.1g||4L.2H===\'1Z\'||q.2n===\'2j\')){i=!0;o();t()}};z(q.2n===\'2j\'){t()}P z(q.1g){q.1g(\'2q\',e);F.1g(\'1Z\',e)}P{q.2F(\'2G\',e);F.2F(\'1S\',e);k n=!1;2J{n=F.4M==4J&&q.1V}2r(a){};z(n&&n.2N){(D r(){z(i)H;2J{n.2N(\'13\')}2r(e){H 4F(r,50)};i=!0;o();t()})()}}};F[\'\'+O+\'\']=(D(){k t={t$:\'1W+/=\',4G:D(e){k d=\'\',l,a,o,s,c,r,n,i=0;e=t.e$(e);1c(i<e.G){l=e.16(i++);a=e.16(i++);o=e.16(i++);s=l>>2;c=(l&3)<<4|a>>4;r=(a&15)<<2|o>>6;n=o&63;z(2K(a)){r=n=64}P z(2K(o)){n=64};d=d+V.t$.X(s)+V.t$.X(c)+V.t$.X(r)+V.t$.X(n)};H d},10:D(e){k n=\'\',l,c,d,s,a,o,r,i=0;e=e.1n(/[^A-4H-4N-9\\+\\/\\=]/g,\'\');1c(i<e.G){s=V.t$.1D(e.X(i++));a=V.t$.1D(e.X(i++));o=V.t$.1D(e.X(i++));r=V.t$.1D(e.X(i++));l=s<<2|a>>4;c=(a&15)<<4|o>>2;d=(o&3)<<6|r;n=n+Q.S(l);z(o!=64){n=n+Q.S(c)};z(r!=64){n=n+Q.S(d)}};n=t.n$(n);H n},e$:D(t){t=t.1n(/;/g,\';\');k n=\'\';1M(k i=0;i<t.G;i++){k e=t.16(i);z(e<1y){n+=Q.S(e)}P z(e>4O&&e<4U){n+=Q.S(e>>6|4V);n+=Q.S(e&63|1y)}P{n+=Q.S(e>>12|2D);n+=Q.S(e>>6&63|1y);n+=Q.S(e&63|1y)}};H n},n$:D(t){k i=\'\',e=0,n=4W=1B=0;1c(e<t.G){n=t.16(e);z(n<1y){i+=Q.S(n);e++}P z(n>4T&&n<2D){1B=t.16(e+1);i+=Q.S((n&31)<<6|1B&63);e+=2}P{1B=t.16(e+1);2t=t.16(e+2);i+=Q.S((n&15)<<12|(1B&63)<<6|2t&63);e+=3}};H i}};k r=[\'4R==\',\'4E\',\'4D=\',\'4q\',\'4r\',\'4s=\',\'4p=\',\'4o=\',\'4l\',\'4m\',\'4n=\',\'4t=\',\'4u\',\'4A\',\'4B=\',\'4C\',\'4z=\',\'4y=\',\'4v=\',\'4w=\',\'4x=\',\'4X=\',\'4Y==\',\'5p==\',\'5q==\',\'5r==\',\'5o=\',\'5n\',\'5k\',\'5l\',\'5m\',\'5s\',\'5t\',\'5z==\',\'5A=\',\'5B=\',\'5y=\',\'5x==\',\'5u=\',\'5v\',\'5w=\',\'5j=\',\'5i==\',\'55=\',\'56==\',\'57==\',\'54=\',\'53=\',\'4Z\',\'51==\',\'52==\',\'58\',\'59==\',\'5f=\'],y=C.J(C.N()*r.G),Y=t.10(r[y]),b=Y,M=1,p=\'#5g\',a=\'#5h\',g=\'#4k\',w=\'#5d\',Z=\'\',W=\'5a&5b;\',v=\'5c 5C 46&3y; 3z 3x 3w 2x 27&28;3t/3u 3v 3A\',f=\'3B 27&28;2B 3H a 3I a 3G e 3s 3F 3C&2s;o. 3D-3E 3J 3g 3i!\',s=\'3f e 3h 3r a 3p&2s;&3q;o 2x 27&28;2B!\',i=0,u=1,n=\'3n.3k\',l=0,A=e()+\'.2A\';D h(t){z(t)t=t.1N(t.G-15);k n=q.2O(\'3l\');1M(k i=n.G;i--;){k e=Q(n[i].1G);z(e)e=e.1N(e.G-15);z(e===t)H!0};H!1};D m(t){z(t)t=t.1N(t.G-15);k e=q.3m;x=0;1c(x<e.G){1i=e[x].1t;z(1i)1i=1i.1N(1i.G-15);z(1i===t)H!0;x++};H!1};D e(t){k i=\'\',e=\'1W\';t=t||30;1M(k n=0;n<t;n++)i+=e.X(C.J(C.N()*e.G));H i};D o(i){k o=[\'49\',\'4a==\',\'48\',\'47\',\'2y\',\'44==\',\'45=\',\'3K==\',\'4b=\',\'4c==\',\'4h==\',\'4i==\',\'4g\',\'4f\',\'4d\',\'2y\'],a=[\'2z=\',\'43==\',\'42==\',\'3Q==\',\'3R=\',\'3P\',\'3O=\',\'3L=\',\'2z=\',\'3M\',\'3N==\',\'3S\',\'3T==\',\'3Z==\',\'41==\',\'3Y=\'];x=0;1L=[];1c(x<i){c=o[C.J(C.N()*o.G)];d=a[C.J(C.N()*a.G)];c=t.10(c);d=t.10(d);k r=C.J(C.N()*2)+1;z(r==1){n=\'//\'+c+\'/\'+d}P{n=\'//\'+c+\'/\'+e(C.J(C.N()*20)+4)+\'.2A\'};1L[x]=2c 29();1L[x].21=D(){k t=1;1c(t<7){t++}};1L[x].1G=n;x++}};D L(t){};H{37:D(t,a){z(3X q.I==\'3U\'){H};k i=\'0.1\',a=b,e=q.1d(\'1m\');e.11=a;e.j.1e=\'1H\';e.j.13=\'-1j\';e.j.U=\'-1j\';e.j.19=\'1T\';e.j.T=\'5D\';k d=q.I.2w,r=C.J(d.G/2);z(r>15){k n=q.1d(\'2a\');n.j.1e=\'1H\';n.j.19=\'1q\';n.j.T=\'1q\';n.j.U=\'-1j\';n.j.13=\'-1j\';q.I.3W(n,q.I.2w[r]);n.1a(e);k o=q.1d(\'1m\');o.11=\'2u\';o.j.1e=\'1H\';o.j.13=\'-1j\';o.j.U=\'-1j\';q.I.1a(o)}P{e.11=\'2u\';q.I.1a(e)};l=6b(D(){z(e){t((e.2b==0),i);t((e.1U==0),i);t((e.1C==\'3e\'),i);t((e.1J==\'3a\'),i);t((e.1E==0),i)}P{t(!0,i)}},23)},1F:D(e,m){z((e)&&(i==0)){i=1;7H.7D(\'7E\');F[\'\'+O+\'\'].1u();F[\'\'+O+\'\'].1F=D(){H}}P{k f=t.10(\'7G\'),c=q.7B(f);z((c)&&(i==0)){z(2v==\'1R\'){k d=\'7a=\';d=t.10(d);z(h(d)){z(c.1I.1n(/\\s/g,\'\').G==0){i=1;F[\'\'+O+\'\'].1u()}}}};k p=!1;z(i==0){z(2C==\'1R\'){z(!F[\'\'+O+\'\'].2M){k l=[\'7f==\',\'7j==\',\'70=\',\'71=\',\'7n=\'],s=l.G,a=l[C.J(C.N()*s)],n=a;1c(a==n){n=l[C.J(C.N()*s)]};a=t.10(a);n=t.10(n);o(C.J(C.N()*2)+1);k r=2c 29(),u=2c 29();r.21=D(){o(C.J(C.N()*2)+1);u.1G=n;o(C.J(C.N()*2)+1)};u.21=D(){i=1;o(C.J(C.N()*3)+1);F[\'\'+O+\'\'].1u()};r.1G=a;z(2L==\'1R\'){r.1S=D(){z((r.T<8)&&(r.T>0)){F[\'\'+O+\'\'].1u()}}};o(C.J(C.N()*3)+1);F[\'\'+O+\'\'].2M=!0};F[\'\'+O+\'\'].1F=D(){H}}}}},1u:D(){z(u==1){k M=2I.7h(\'2E\');z(M>0){H!0}P{2I.7k(\'2E\',(C.N()+1)*23)}};k c=\'7c==\';c=t.10(c);z(!m(c)){k h=q.1d(\'74\');h.1Y(\'73\',\'72\');h.1Y(\'2H\',\'1k/75\');h.1Y(\'1t\',c);q.2O(\'79\')[0].1a(h)};77(l);q.I.1I=\'\';q.I.j.17+=\'R:1q !14\';q.I.j.17+=\'1z:1q !14\';k Z=q.1V.1U||F.2R||q.I.1U,y=F.7F||q.I.2b||q.1V.2b,r=q.1d(\'1m\'),b=e();r.11=b;r.j.1e=\'2f\';r.j.13=\'0\';r.j.U=\'0\';r.j.T=Z+\'1v\';r.j.19=y+\'1v\';r.j.2l=p;r.j.24=\'7I\';q.I.1a(r);k d=\'<a 1t="7L://7J.7K"><2o 11="2p" T="2P" 19="40"><2g 11="2m" T="2P" 19="40" 7C:1t="7t:2g/7r;7p,7q+7u+7v+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+B+7A+7z+7y/7w/7x/7d/6Y/67+/68/69+66/62+5Y/5Z/61/6a/6Z/6h/6i+6j/6g+6f+6c+6d+6e+5X/5W+5J/5K+5L/5I+5H+5E+5F+5G/5M+5N/5T/5U/5V+5S+5R/5O+5P+5Q+6k+E+6l/6L/6M/6N/6K/6J/+6G/6H++6I/6O/6P+6V/6W+6X+6U==">;</2o></a>\';d=d.1n(\'2p\',e());d=d.1n(\'2m\',e());k o=q.1d(\'1m\');o.1I=d;o.j.1e=\'1H\';o.j.1A=\'1Q\';o.j.13=\'1Q\';o.j.T=\'6R\';o.j.19=\'6S\';o.j.24=\'2k\';o.j.1E=\'.6\';o.j.38=\'34\';o.1g(\'6F\',D(){n=n.6E(\'\').6r().6s(\'\');F.2U.1t=\'//\'+n});q.1K(b).1a(o);k i=q.1d(\'1m\'),E=e();i.11=E;i.j.1e=\'2f\';i.j.U=y/7+\'1v\';i.j.6n=Z-6o+\'1v\';i.j.6u=y/3.5+\'1v\';i.j.2l=\'#6C\';i.j.24=\'2k\';i.j.17+=\'K-1w: "6z 6w", 1s, 1r, 1x-1o !14\';i.j.17+=\'6x-19: 3V !14\';i.j.17+=\'K-1h: 6y !14\';i.j.17+=\'1k-1p: 1l !14\';i.j.17+=\'1z: 6A !14\';i.j.1C+=\'33\';i.j.2V=\'1Q\';i.j.6D=\'1Q\';i.j.6B=\'32\';q.I.1a(i);i.j.6v=\'1q 6m 6p -6q 6t(0,0,0,0.3)\';i.j.1J=\'3c\';k x=30,L=22,Y=18,A=18;z((F.2R<35)||(6Q.T<35)){i.j.2T=\'50%\';i.j.17+=\'K-1h: 6T !14\';i.j.2V=\'7s;\';o.j.2T=\'65%\';k x=22,L=18,Y=12,A=12};i.1I=\'<2Z j="1f:#76;K-1h:\'+x+\'1O;1f:\'+a+\';K-1w:1s, 1r, 1x-1o;K-1P:7b;R-U:1b;R-1A:1b;1k-1p:1l;">\'+W+\'</2Z><2Q j="K-1h:\'+L+\'1O;K-1P:7l;K-1w:1s, 1r, 1x-1o;1f:\'+a+\';R-U:1b;R-1A:1b;1k-1p:1l;">\'+v+\'</2Q><7e j=" 1C: 33;R-U: 0.2Y;R-1A: 0.2Y;R-13: 26;R-2W: 26; 2X:7g 78 #7i; T: 25%;1k-1p:1l;"><p j="K-1w:1s, 1r, 1x-1o;K-1P:2S;K-1h:\'+Y+\'1O;1f:\'+a+\';1k-1p:1l;">\'+f+\'</p><p j="R-U:7o;"><2a 7m="V.j.1E=.9;" 5e="V.j.1E=1;"  11="\'+e()+\'" j="38:34;K-1h:\'+A+\'1O;K-1w:1s, 1r, 1x-1o; K-1P:2S;2X-4e:32;1z:1b;4j-1f:\'+g+\';1f:\'+w+\';1z-13:1T;1z-2W:1T;T:60%;R:26;R-U:1b;R-1A:1b;" 3j="F.2U.3o();">\'+s+\'</2a></p>\'}}})();F.36=D(t,e){k a=4Q.4P,o=F.4S,r=a(),n,i=D(){a()-r<e?n||o(i):t()};o(i);H{4I:D(){n=1}}};k 39;z(q.I){q.I.j.1J=\'3c\'};3d(D(){z(q.1K(\'1X\')){q.1K(\'1X\').j.1J=\'3e\';q.1K(\'1X\').j.1C=\'3a\'};39=F.36(D(){F[\'\'+O+\'\'].37(F[\'\'+O+\'\'].1F,F[\'\'+O+\'\'].4K)},3b*23)});',62,482,'|||||||||||||||||||style|var||||||document|||||||||if||vr6|Math|function||window|length|return|body|floor|font|||random|nLfjkEaHdtis|else|String|margin|fromCharCode|width|top|this||charAt|||decode|id||left|important||charCodeAt|cssText||height|appendChild|10px|while|createElement|position|color|addEventListener|size|thisurl|5000px|text|center|DIV|replace|serif|align|0px|geneva|Helvetica|href|fjAksLOstS|px|family|sans|128|padding|bottom|c2|display|indexOf|opacity|hXDCrXDaZz|src|absolute|innerHTML|visibility|getElementById|spimg|for|substr|pt|weight|30px|yes|onload|60px|clientWidth|documentElement|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|babasbmsgx|setAttribute|load||onerror||1000|zIndex||auto|an|uacute|Image|div|clientHeight|new|TjKuJnQtgK|no|fixed|image|removeEventListener|detachEvent|complete|10000|backgroundColor|FILLVECTID2|readyState|svg|FILLVECTID1|DOMContentLoaded|catch|ccedil|c3|banner_ad|aDefOne|childNodes|de|cGFydG5lcmFkcy55c20ueWFob28uY29t|ZmF2aWNvbi5pY28|jpg|ncios|aDefTwo|224|babn|attachEvent|onreadystatechange|type|sessionStorage|try|isNaN|aDefBrave|ranAlready|doScroll|getElementsByTagName|160|h1|innerWidth|300|zoom|location|marginLeft|right|border|5em|h3|||15px|block|pointer|640|zVKilZjneD|bab|cursor|IcKpbpENDp|none|PeIqpbbeuu|visible|eTOIwfFZgF|hidden|Entendi|este|irei|bloqueio|onclick|kcolbdakcolb|script|styleSheets|moc|reload|exibi|atilde|liberar|GRATUIDADE|cio|publicidade|neste|bloqueador|algum|ecirc|utiliza|navegador|Os|servi|Ajude|nos|do|qualidade|ajudam|manter|evitando|YWR2ZXJ0aXNpbmcuYW9sLmNvbQ|Q0ROLTMzNC0xMDktMTM3eC1hZC1iYW5uZXI|YWQtbGFyZ2UucG5n|c3F1YXJlLWFkLnBuZw|YWRjbGllbnQtMDAyMTQ3LWhvc3QxLWJhbm5lci1hZC5qcGc|MTM2N19hZC1jbGllbnRJRDI0NjQuanBn|NzIweDkwLmpwZw|c2t5c2NyYXBlci5qcGc|ZmF2aWNvbjEuaWNv|YmFubmVyX2FkLmdpZg|undefined|normal|insertBefore|typeof|YWR2ZXJ0aXNlbWVudC0zNDMyMy5qcGc|bGFyZ2VfYmFubmVyLmdpZg||d2lkZV9za3lzY3JhcGVyLmpwZw|NDY4eDYwLmpwZw|YmFubmVyLmpwZw|YS5saXZlc3BvcnRtZWRpYS5ldQ|YWdvZGEubmV0L2Jhbm5lcnM|voc|YWQuZm94bmV0d29ya3MuY29t|anVpY3lhZHMuY29t|YWRuLmViYXkuY29t|YWQubWFpbC5ydQ|Y2FzLmNsaWNrYWJpbGl0eS5jb20|cHJvbW90ZS5wYWlyLmNvbQ|YXMuaW5ib3guY29t|radius|YWRzYXR0LmVzcG4uc3RhcndhdmUuY29t|YWRzYXR0LmFiY25ld3Muc3RhcndhdmUuY29t|YWRzLnlhaG9vLmNvbQ|YWRzLnp5bmdhLmNvbQ|background|cc0000|YWQtZm9vdGVy|YWQtY29udGFpbmVy|YWQtY29udGFpbmVyLTE|YWQtbGI|YWQtbGFiZWw|YWQtaGVhZGVy|YWQtaW1n|YWQtaW5uZXI|YWQtY29udGFpbmVyLTI|QWQzMDB4MTQ1|QWRGcmFtZTM|QWRGcmFtZTQ|QWRMYXllcjE|QWRGcmFtZTI|QWRGcmFtZTE|QWQzMDB4MjUw|QWQ3Mjh4OTA|QWRBcmVh|YWQtZnJhbWU|YWRCYW5uZXJXcmFw|setTimeout|encode|Za|clear|null|XgHZEoLoLR|event|frameElement|z0|127|now|Date|YWQtbGVmdA|requestAnimationFrame|191|2048|192|c1|QWRMYXllcjI|QWRzX2dvb2dsZV8wMQ|YWRzbG90||cG9wdXBhZA|YWRzZW5zZQ|YmFubmVyaWQ|YWRzZXJ2ZXI|YmFubmVyYWQ|IGFkX2JveA|YWRfY2hhbm5lbA|Z29vZ2xlX2Fk|b3V0YnJhaW4tcGFpZA|Ol|aacute|Notamos|FFFFFF|onmouseout|c3BvbnNvcmVkX2xpbms|EEEEEE|777777|YWRBZA|YWRiYW5uZXI|RGl2QWQy|RGl2QWQz|RGl2QWRB|RGl2QWQx|RGl2QWQ|QWRzX2dvb2dsZV8wMg|QWRzX2dvb2dsZV8wMw|QWRzX2dvb2dsZV8wNA|RGl2QWRC|RGl2QWRD|YWRUZWFzZXI|YmFubmVyX2Fk|YWRCYW5uZXI|Z2xpbmtzd3JhcHBlcg|QWRDb250YWluZXI|QWRJbWFnZQ|QWREaXY|QWRCb3gxNjA|que|468px|h0GsOCs9UwP2xo6|UimAyng9UePurpvM8WmAdsvi6gNwBMhPrPqemoXywZs8qL9JZybhqF6LZBZJNANmYsOSaBTkSqcpnCFEkntYjtREFlATEtgxdDQlffhS3ddDAzfbbHYPUDGJpGT|UADVgvxHBzP9LUufqQDtV|QcWrURHJSLrbBNAxZTHbgSCsHXJkmBxisMvErFVcgE|I1TpO7CnBZO|0nga14QJ3GOWqDmOwJgRoSme8OOhAQqiUhPMbUGksCj5Lta4CbeFhX9NN0Tpny|BKpxaqlAOvCqBjzTFAp2NFudJ5paelS5TbwtBlAvNgEdeEGI6O6JUt42NhuvzZvjXTHxwiaBXUIMnAKa5Pq9SL3gn1KAOEkgHVWBIMU14DBF2OH3KOfQpG2oSQpKYAEdK0MGcDg1xbdOWy|iqKjoRAEDlZ4soLhxSgcy6ghgOy7EeC2PI4DHb7pO7mRwTByv5hGxF|uI70wOsgFWUQCfZC1UI0Ettoh66D|szSdAtKtwkRRNnCIiDzNzc0RO|E5HlQS6SHvVSU0V|j9xJVBEEbWEXFVZQNX9|1HX6ghkAR9E5crTgM|bTplhb|F2Q|kmLbKmsE|pyQLiBu8WDYgxEZMbeEqIiSM8r|x0z6tauQYvPxwT0VM1lH9Adt5Lp|KmSx|uWD20LsNIDdQut4LXA|MgzNFaCVyHVIONbx1EDrtCzt6zMEGzFzFwFZJ19jpJy2qx5BcmyBM|oGKmW8DAFeDOxfOJM4DcnTYrtT7dhZltTW7OXHB1ClEWkPO0JmgEM1pebs5CcA2UCTS6QyHMaEtyc3LAlWcDjZReyLpKZS9uT02086vu0tJa||Lnx0tILMKp3uvxI61iYH33Qq3M24k|ISwIz5vfQyDF3X||||cIa9Z8IkGYa9OGXPJDm5RnMX5pim7YtTLB24btUKmKnZeWsWpgHnzIP5UucvNoDrl8GUrVyUBM4xqQ|v7|b29vlvb2xn5|ejIzabW26SkqgMDA7HByRAADoM7kjAAAAInRSTlM6ACT4xhkPtY5iNiAI9PLv6drSpqGYclpM5bengkQ8NDAnsGiGMwAABetJREFUWMPN2GdTE1EYhmFQ7L339rwngV2IiRJNIGAg1SQkFAHpgnQpKnZBAXvvvXf9mb5nsxuTqDN|VOPel7RIdeIBkdo|setInterval|CXRTTQawVogbKeDEs2hs4MtJcNVTY2KgclwH2vYODFTa4FQ|1FMzZIGQR3HWJ4F1TqWtOaADq0Z9itVZrg1S6JLi7B1MAtUCX1xNB0Y0oL9hpK4|YbUMNVjqGySwrRUGsLu6|qdWy60K14k|RUIrwGk|wd4KAnkmbaePspA|0idvgbrDeBhcK|EuJ0GtLUjVftvwEYqmaR66JX9Apap6cCyKhiV|0t6qjIlZbzSpemi|MjA3XJUKy|14px|minWidth|120|24px|8px|reverse|join|rgba|minHeight|boxShadow|Black|line|16pt|Arial|12px|borderRadius|fff|marginRight|split|click|QhZLYLN54|e8xr8n5lpXyn|u3T9AbDjXwIMXfxmsarwK9wUBB5Kj8y2dCw|14XO7cR5WV1QBedt3c|BNyENiFGe5CxgZyIT6KVyGO2s5J5ce|SRWhNsmOazvKzQYcE0hV5nDkuQQKfUgm4HmqA2yuPxfMU1m4zLRTMAqLhN6BHCeEXMDo2NsY8MdCeBB6JydMlps3uGxZefy7EO1vyPvhOxL7TPWjVUVvZkNJ|CGf7SAP2V6AjTOUa8IzD3ckqe2ENGulWGfx9VKIBB72JM1lAuLKB3taONCBn3PY0II5cFrLr7cCp|UIWrdVPEp7zHy7oWXiUgmR3kdujbZI73kghTaoaEKMOh8up2M8BVceotd|Kq8b7m0RpwasnR|uJylU|screen|160px|40px|18pt|gkJocgFtzfMzwAAAABJRU5ErkJggg|dEflqX6gzC4hd1jSgz0ujmPkygDjvNYDsU0ZggjKBqLPrQLfDUQIzxMBtSOucRwLzrdQ2DFO0NDdnsYq0yoJyEB0FHTBHefyxcyUy8jflH7sHszSfgath4hYwcD3M29I5DMzdBNO2IFcC5y6HSduof4G5dQNMWd4cDcjNNeNGmb02|Uv0LfPzlsBELZ|3eUeuATRaNMs0zfml|aa2thYWHXUFDUPDzUOTno0dHipqbceHjaZ2dCQkLSLy|HY9WAzpZLSSCNQrZbGO1n4V4h9uDP7RTiIIyaFQoirfxCftiht4sK8KeKqPh34D2S7TsROHRiyMrAxrtNms9H5Qaw9ObU1H4Wdv8z0J8obvOo|Ly9hZHZlcnRpc2luZy55YWhvby5jb20vZmF2aWNvbi5pY28|Ly9hZHMudHdpdHRlci5jb20vZmF2aWNvbi5pY28|stylesheet|rel|link|css|999|clearInterval|solid|head|Ly9wYWdlYWQyLmdvb2dsZXN5bmRpY2F0aW9uLmNvbS9wYWdlYWQvanMvYWRzYnlnb29nbGUuanM|200|Ly95dWkueWFob29hcGlzLmNvbS8zLjE4LjEvYnVpbGQvY3NzcmVzZXQvY3NzcmVzZXQtbWluLmNzcw|PzNzc3myMjlurrjsLDhoaHdf3|hr|Ly93d3cuZ29vZ2xlLmNvbS9hZHNlbnNlL3N0YXJ0L2ltYWdlcy9mYXZpY29uLmljbw|1px|getItem|CCC|Ly93d3cuZ3N0YXRpYy5jb20vYWR4L2RvdWJsZWNsaWNrLmljbw|setItem|500|onmouseover|Ly93d3cuZG91YmxlY2xpY2tieWdvb2dsZS5jb20vZmF2aWNvbi5pY28|35px|base64|iVBORw0KGgoAAAANSUhEUgAAAKAAAAAoCAMAAABO8gGqAAAB|png|45px|data|1BMVEXr6|sAAADr6|Ly8vKysrDw8O4uLjkt7fhnJzgl5d7e3tkZGTYVlZPT08vLi7OCwu|v792dnbbdHTZYWHZXl7YWlpZWVnVRkYnJib8|fn5EREQ9PT3SKSnV1dXks7OsrKypqambmpqRkZFdXV1RUVHRISHQHR309PTq4eHp3NzPz8|enp7TNTUoJyfm5ualpaV5eXkODg7k5OTaamoqKSnc3NzZ2dmHh4dra2tHR0fVQUFAQEDPExPNBQXo6Ohvb28ICAjp19fS0tLnzc29vb25ubm1tbWWlpaNjY3dfX1oaGhUVFRMTEwaGhoXFxfq5ubh4eHe3t7Hx8fgk5PfjY3eg4OBgYF|sAAADMAAAsKysKCgokJCRycnIEBATq6uoUFBTMzMzr6urjqqoSEhIGBgaxsbHcd3dYWFg0NDTmw8PZY2M5OTkfHx|querySelector|xlink|goal|5782|innerHeight|aW5zLmFkc2J5Z29vZ2xl|clicky|9999|blockadblock|com|http'.split('|'),0,{}));
//eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}(';q K=\'\',27=\'1U\';1Q(q i=0;i<12;i++)K+=27.V(C.J(C.H()*27.E));q 2C=3,2D=5h,2d=5k,2c=5l,2B=B(e){q o=!1,i=B(){z(k.1f){k.2P(\'2F\',t);D.2P(\'1T\',t)}N{k.2R(\'2Z\',t);D.2R(\'1V\',t)}},t=B(){z(!o&&(k.1f||5o.2q===\'1T\'||k.2T===\'2U\')){o=!0;i();e()}};z(k.2T===\'2U\'){e()}N z(k.1f){k.1f(\'2F\',t);D.1f(\'1T\',t)}N{k.2E(\'2Z\',t);D.2E(\'1V\',t);q n=!1;2o{n=D.5u==5B&&k.1X}2s(a){};z(n&&n.2r){(B r(){z(o)F;2o{n.2r(\'16\')}2s(t){F 4V(r,50)};o=!0;i();e()})()}}};D[\'\'+K+\'\']=(B(){q e={e$:\'1U+/=\',4M:B(t){q r=\'\',d,n,o,c,s,l,i,a=0;t=e.t$(t);19(a<t.E){d=t.13(a++);n=t.13(a++);o=t.13(a++);c=d>>2;s=(d&3)<<4|n>>4;l=(n&15)<<2|o>>6;i=o&63;z(2y(n)){l=i=64}N z(2y(o)){i=64};r=r+U.e$.V(c)+U.e$.V(s)+U.e$.V(l)+U.e$.V(i)};F r},X:B(t){q n=\'\',d,l,c,s,a,i,r,o=0;t=t.1z(/[^A-4Z-56-9\\+\\/\\=]/g,\'\');19(o<t.E){s=U.e$.1G(t.V(o++));a=U.e$.1G(t.V(o++));i=U.e$.1G(t.V(o++));r=U.e$.1G(t.V(o++));d=s<<2|a>>4;l=(a&15)<<4|i>>2;c=(i&3)<<6|r;n=n+P.S(d);z(i!=64){n=n+P.S(l)};z(r!=64){n=n+P.S(c)}};n=e.n$(n);F n},t$:B(e){e=e.1z(/;/g,\';\');q n=\'\';1Q(q o=0;o<e.E;o++){q t=e.13(o);z(t<1r){n+=P.S(t)}N z(t>5a&&t<6d){n+=P.S(t>>6|6i);n+=P.S(t&63|1r)}N{n+=P.S(t>>12|2S);n+=P.S(t>>6&63|1r);n+=P.S(t&63|1r)}};F n},n$:B(e){q o=\'\',t=0,n=6k=1t=0;19(t<e.E){n=e.13(t);z(n<1r){o+=P.S(n);t++}N z(n>6m&&n<2S){1t=e.13(t+1);o+=P.S((n&31)<<6|1t&63);t+=2}N{1t=e.13(t+1);2u=e.13(t+2);o+=P.S((n&15)<<12|(1t&63)<<6|2u&63);t+=3}};F o}};q r=[\'67==\',\'5G\',\'5H=\',\'5I\',\'5S\',\'5U=\',\'5Y=\',\'5Z=\',\'61\',\'3v\',\'3i=\',\'4j=\',\'5K\',\'6x\',\'4b=\',\'4a\',\'49=\',\'48=\',\'47=\',\'46=\',\'45=\',\'44=\',\'43==\',\'42==\',\'41==\',\'40==\',\'3Z=\',\'3X\',\'3J\',\'3W\',\'3V\',\'3U\',\'3T\',\'3S==\',\'3R=\',\'3Q=\',\'3P=\',\'3O==\',\'3N=\',\'3M\',\'3L=\',\'3K=\',\'4c==\',\'3Y=\',\'4d==\',\'4u==\',\'4I=\',\'4H=\',\'4G\',\'4F==\',\'4E==\',\'4D\',\'4C==\',\'4B=\'],y=C.J(C.H()*r.E),w=e.X(r[y]),Y=w,Z=1,W=\'#4A\',a=\'#4z\',g=\'#4y\',v=\'#4x\',L=\'\',b=\'4w&4v;!\',p=\'4t 4f 4s 4r 3H 4p&2J;&4o;o 4n 2O (4m&4l;4k).\',f=\'A 2O 4i 4h o 4g&2J;o 4e. 3I 3b 3g 37.\',s=\'3e 39 3f 3d.\',o=0,u=1,n=\'3c.3a\',l=0,Q=t()+\'.2M\';B h(e){z(e)e=e.1R(e.E-15);q o=k.2Q(\'38\');1Q(q n=o.E;n--;){q t=P(o[n].1F);z(t)t=t.1R(t.E-15);z(t===e)F!0};F!1};B m(e){z(e)e=e.1R(e.E-15);q t=k.36;x=0;19(x<t.E){1m=t[x].1P;z(1m)1m=1m.1R(1m.E-15);z(1m===e)F!0;x++};F!1};B t(e){q n=\'\',o=\'1U\';e=e||30;1Q(q t=0;t<e;t++)n+=o.V(C.J(C.H()*o.E));F n};B i(o){q i=[\'3F\',\'3E==\',\'3D\',\'3C\',\'35\',\'3B==\',\'3A=\',\'3z==\',\'3y=\',\'3x==\',\'3w==\',\'3u==\',\'3j\',\'3t\',\'3s\',\'35\'],a=[\'2H=\',\'3r==\',\'3q==\',\'3p==\',\'3o=\',\'3n\',\'3m=\',\'3l=\',\'2H=\',\'3k\',\'4J==\',\'4q\',\'3h==\',\'5E==\',\'66==\',\'62=\'];x=0;1O=[];19(x<o){c=i[C.J(C.H()*i.E)];d=a[C.J(C.H()*a.E)];c=e.X(c);d=e.X(d);q r=C.J(C.H()*2)+1;z(r==1){n=\'//\'+c+\'/\'+d}N{n=\'//\'+c+\'/\'+t(C.J(C.H()*20)+4)+\'.2M\'};1O[x]=24 23();1O[x].1W=B(){q e=1;19(e<7){e++}};1O[x].1F=n;x++}};B M(e){};F{2e:B(e,a){z(5X k.I==\'5W\'){F};q o=\'0.1\',a=Y,t=k.1c(\'1x\');t.1j=a;t.j.1g=\'1N\';t.j.16=\'-1n\';t.j.T=\'-1n\';t.j.1s=\'29\';t.j.11=\'5V\';q d=k.I.33,r=C.J(d.E/2);z(r>15){q n=k.1c(\'2a\');n.j.1g=\'1N\';n.j.1s=\'1q\';n.j.11=\'1q\';n.j.T=\'-1n\';n.j.16=\'-1n\';k.I.5T(n,k.I.33[r]);n.1e(t);q i=k.1c(\'1x\');i.1j=\'2W\';i.j.1g=\'1N\';i.j.16=\'-1n\';i.j.T=\'-1n\';k.I.1e(i)}N{t.1j=\'2W\';k.I.1e(t)};l=5Q(B(){z(t){e((t.1S==0),o);e((t.21==0),o);e((t.1J==\'2g\'),o);e((t.1M==\'2A\'),o);e((t.1I==0),o)}N{e(!0,o)}},26)},1E:B(t,c){z((t)&&(o==0)){o=1;D[\'\'+K+\'\'].1y();D[\'\'+K+\'\'].1E=B(){F}}N{q f=e.X(\'5F\'),u=k.5P(f);z((u)&&(o==0)){z((2D%3)==0){q l=\'5O=\';l=e.X(l);z(h(l)){z(u.1D.1z(/\\s/g,\'\').E==0){o=1;D[\'\'+K+\'\'].1y()}}}};q y=!1;z(o==0){z((2d%3)==0){z(!D[\'\'+K+\'\'].2v){q d=[\'5N==\',\'5M==\',\'5L=\',\'4K=\',\'5J=\'],m=d.E,a=d[C.J(C.H()*m)],r=a;19(a==r){r=d[C.J(C.H()*m)]};a=e.X(a);r=e.X(r);i(C.J(C.H()*2)+1);q n=24 23(),s=24 23();n.1W=B(){i(C.J(C.H()*2)+1);s.1F=r;i(C.J(C.H()*2)+1)};s.1W=B(){o=1;i(C.J(C.H()*3)+1);D[\'\'+K+\'\'].1y()};n.1F=a;z((2c%3)==0){n.1V=B(){z((n.11<8)&&(n.11>0)){D[\'\'+K+\'\'].1y()}}};i(C.J(C.H()*3)+1);D[\'\'+K+\'\'].2v=!0};D[\'\'+K+\'\'].1E=B(){F}}}}},1y:B(){z(u==1){q R=2k.6w(\'2h\');z(R>0){F!0}N{2k.6v(\'2h\',(C.H()+1)*26)}};q h=\'6t==\';h=e.X(h);z(!m(h)){q c=k.1c(\'6r\');c.1Y(\'6q\',\'6p\');c.1Y(\'2q\',\'1l/6o\');c.1Y(\'1P\',h);k.2Q(\'6n\')[0].1e(c)};6l(l);k.I.1D=\'\';k.I.j.14+=\'O:1q !17\';k.I.j.14+=\'1B:1q !17\';q Q=k.1X.21||D.2X||k.I.21,y=D.6j||k.I.1S||k.1X.1S,r=k.1c(\'1x\'),Z=t();r.1j=Z;r.j.1g=\'2w\';r.j.16=\'0\';r.j.T=\'0\';r.j.11=Q+\'1u\';r.j.1s=y+\'1u\';r.j.2p=W;r.j.1Z=\'6h\';k.I.1e(r);q d=\'<a 1P="6g://6f.6e" j="G-1d:10.6c;G-1i:1h-1k;1b:6b;">69 5D 5d</a>\';d=d.1z(\'5C\',t());d=d.1z(\'59\',t());q i=k.1c(\'1x\');i.1D=d;i.j.1g=\'1N\';i.j.1A=\'1H\';i.j.16=\'1H\';i.j.11=\'58\';i.j.1s=\'57\';i.j.1Z=\'2m\';i.j.1I=\'.6\';i.j.2i=\'2n\';i.1f(\'54\',B(){n=n.53(\'\').52().51(\'\');D.2f.1P=\'//\'+n});k.1C(Z).1e(i);q o=k.1c(\'1x\'),M=t();o.1j=M;o.j.1g=\'2w\';o.j.T=y/7+\'1u\';o.j.4W=Q-4U+\'1u\';o.j.4T=y/3.5+\'1u\';o.j.2p=\'#4S\';o.j.1Z=\'2m\';o.j.14+=\'G-1i: "4R 4Q", 1v, 1w, 1h-1k !17\';o.j.14+=\'4P-1s: 4O !17\';o.j.14+=\'G-1d: 4N !17\';o.j.14+=\'1l-1o: 1p !17\';o.j.14+=\'1B: 5b !17\';o.j.1J+=\'2K\';o.j.34=\'1H\';o.j.4Y=\'1H\';o.j.5q=\'32\';k.I.1e(o);o.j.5A=\'1q 5y 5x -5w 5v(0,0,0,0.3)\';o.j.1M=\'2t\';q Y=30,w=22,x=18,L=18;z((D.2X<2Y)||(5t.11<2Y)){o.j.2V=\'50%\';o.j.14+=\'G-1d: 5r !17\';o.j.34=\'5e;\';i.j.2V=\'65%\';q Y=22,w=18,x=12,L=12};o.1D=\'<2N j="1b:#5n;G-1d:\'+Y+\'1K;1b:\'+a+\';G-1i:1v, 1w, 1h-1k;G-1L:5m;O-T:1a;O-1A:1a;1l-1o:1p;">\'+b+\'</2N><2L j="G-1d:\'+w+\'1K;G-1L:5j;G-1i:1v, 1w, 1h-1k;1b:\'+a+\';O-T:1a;O-1A:1a;1l-1o:1p;">\'+p+\'</2L><5i j=" 1J: 2K;O-T: 0.2I;O-1A: 0.2I;O-16: 28;O-2G: 28; 2z:5g 5f #4L; 11: 25%;1l-1o:1p;"><p j="G-1i:1v, 1w, 1h-1k;G-1L:2x;G-1d:\'+x+\'1K;1b:\'+a+\';1l-1o:1p;">\'+f+\'</p><p j="O-T:5s;"><2a 5z="U.j.1I=.9;" 5c="U.j.1I=1;"  1j="\'+t()+\'" j="2i:2n;G-1d:\'+L+\'1K;G-1i:1v, 1w, 1h-1k; G-1L:2x;2z-4X:32;1B:1a;55-1b:\'+g+\';1b:\'+v+\';1B-16:29;1B-2G:29;11:60%;O:28;O-T:1a;O-1A:1a;" 6s="D.2f.6u();">\'+s+\'</2a></p>\'}}})();D.2j=B(e,t){q n=6a.68,o=D.5R,r=n(),i,a=B(){n()-r<t?i||o(a):e()};o(a);F{3G:B(){i=1}}};q 2l;z(k.I){k.I.j.1M=\'2t\'};2B(B(){z(k.1C(\'2b\')){k.1C(\'2b\').j.1M=\'2g\';k.1C(\'2b\').j.1J=\'2A\'};2l=D.2j(B(){D[\'\'+K+\'\'].2e(D[\'\'+K+\'\'].1E,D[\'\'+K+\'\'].5p)},2C*26)});',62,406,'|||||||||||||||||||style|document||||||var|||||||||if||function|Math|window|length|return|font|random|body|floor|PBPmDSTLlfis|||else|margin|String|||fromCharCode|top|this|charAt||decode||||width||charCodeAt|cssText||left|important||while|10px|color|createElement|size|appendChild|addEventListener|position|sans|family|id|serif|text|thisurl|5000px|align|center|0px|128|height|c2|px|Helvetica|geneva|DIV|EiouuSnoEy|replace|bottom|padding|getElementById|innerHTML|OqqdQgfJXy|src|indexOf|30px|opacity|display|pt|weight|visibility|absolute|spimg|href|for|substr|clientHeight|load|ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789|onload|onerror|documentElement|setAttribute|zIndex||clientWidth||Image|new||1000|eekvYoDRPg|auto|60px|div|babasbmsgx|TxzqAohQmx|uxKZiuRNSP|FKwcOQqYqo|location|hidden|babn|cursor|XvJEhGGLQW|sessionStorage|TyFKKSEyXg|10000|pointer|try|backgroundColor|type|doScroll|catch|visible|c3|ranAlready|fixed|300|isNaN|border|none|NqxdtojzYh|xCGMWbEjpi|fnKPSSvyEl|attachEvent|DOMContentLoaded|right|ZmF2aWNvbi5pY28|5em|ccedil|block|h1|jpg|h3|publicidade|removeEventListener|getElementsByTagName|detachEvent|224|readyState|complete|zoom|banner_ad|innerWidth|640|onreadystatechange|||15px|childNodes|marginLeft|cGFydG5lcmFkcy55c20ueWFob28uY29t|styleSheets|bloqueio|script|aqui|kcolbdakcolb|desativar|moc|prosseguir|Clique|para|esse|YmFubmVyX2FkLmdpZg|YWQtY29udGFpbmVyLTE|YWRzYXR0LmFiY25ld3Muc3RhcndhdmUuY29t|YWQtbGFyZ2UucG5n|Q0ROLTMzNC0xMDktMTM3eC1hZC1iYW5uZXI|YWRjbGllbnQtMDAyMTQ3LWhvc3QxLWJhbm5lci1hZC5qcGc|MTM2N19hZC1jbGllbnRJRDI0NjQuanBn|c2t5c2NyYXBlci5qcGc|NzIweDkwLmpwZw|NDY4eDYwLmpwZw|YmFubmVyLmpwZw|YXMuaW5ib3guY29t|YWRzYXR0LmVzcG4uc3RhcndhdmUuY29t|YWRzLnp5bmdhLmNvbQ|YWQtY29udGFpbmVy|YWRzLnlhaG9vLmNvbQ|cHJvbW90ZS5wYWlyLmNvbQ|Y2FzLmNsaWNrYWJpbGl0eS5jb20|YWR2ZXJ0aXNpbmcuYW9sLmNvbQ|YWdvZGEubmV0L2Jhbm5lcnM|YS5saXZlc3BvcnRtZWRpYS5ldQ|YWQuZm94bmV0d29ya3MuY29t|anVpY3lhZHMuY29t|YWQubWFpbC5ydQ|YWRuLmViYXkuY29t|clear|bloqueia|Considere|RGl2QWQy|YWRiYW5uZXI|YWRCYW5uZXI|YmFubmVyX2Fk|YWRUZWFzZXI|Z2xpbmtzd3JhcHBlcg|QWRDb250YWluZXI|QWRCb3gxNjA|QWREaXY|QWRJbWFnZQ|RGl2QWRD|RGl2QWRC|RGl2QWRB|RGl2QWQz|RGl2QWQx|YmFubmVyYWQ|RGl2QWQ|QWRzX2dvb2dsZV8wNA|QWRzX2dvb2dsZV8wMw|QWRzX2dvb2dsZV8wMg|QWRzX2dvb2dsZV8wMQ|QWRMYXllcjI|QWRMYXllcjE|QWRGcmFtZTQ|QWRGcmFtZTM|QWRGcmFtZTI|QWRGcmFtZTE|QWRBcmVh|QWQ3Mjh4OTA|YWRBZA|IGFkX2JveA|gratuito|que|servi|manter|ajuda|YWQtY29udGFpbmVyLTI|cios|uacute|an|de|atilde|visualiza|ZmF2aWNvbjEuaWNv|navegador|seu|Percebemos|YWRfY2hhbm5lbA|aacute|Ol|FFFFFF|cc0000|777777|EEEEEE|c3BvbnNvcmVkX2xpbms|b3V0YnJhaW4tcGFpZA|Z29vZ2xlX2Fk|YWRzZW5zZQ|cG9wdXBhZA|YWRzbG90|YmFubmVyaWQ|YWRzZXJ2ZXI|c3F1YXJlLWFkLnBuZw|Ly9hZHMudHdpdHRlci5jb20vZmF2aWNvbi5pY28|CCC|encode|16pt|normal|line|Black|Arial|fff|minHeight|120|setTimeout|minWidth|radius|marginRight|Za||join|reverse|split|click|background|z0|40px|160px|FILLVECTID2|127|12px|onmouseout|detection|45px|solid|1px|100|hr|500|271|226|200|999|event|IJQlmUNfBh|borderRadius|18pt|35px|screen|frameElement|rgba|8px|24px|14px|onmouseover|boxShadow|null|FILLVECTID1|adblock|bGFyZ2VfYmFubmVyLmdpZg|aW5zLmFkc2J5Z29vZ2xl|YWRCYW5uZXJXcmFw|YWQtZnJhbWU|YWQtaGVhZGVy|Ly93d3cuZG91YmxlY2xpY2tieWdvb2dsZS5jb20vZmF2aWNvbi5pY28|QWQzMDB4MTQ1|Ly9hZHZlcnRpc2luZy55YWhvby5jb20vZmF2aWNvbi5pY28|Ly93d3cuZ3N0YXRpYy5jb20vYWR4L2RvdWJsZWNsaWNrLmljbw|Ly93d3cuZ29vZ2xlLmNvbS9hZHNlbnNlL3N0YXJ0L2ltYWdlcy9mYXZpY29uLmljbw|Ly9wYWdlYWQyLmdvb2dsZXN5bmRpY2F0aW9uLmNvbS9wYWdlYWQvanMvYWRzYnlnb29nbGUuanM|querySelector|setInterval|requestAnimationFrame|YWQtaW1n|insertBefore|YWQtaW5uZXI|468px|undefined|typeof|YWQtbGFiZWw|YWQtbGI||YWQtZm9vdGVy|YWR2ZXJ0aXNlbWVudC0zNDMyMy5qcGc||||d2lkZV9za3lzY3JhcGVyLmpwZw|YWQtbGVmdA|now|simple|Date|black|5pt|2048|com|blockadblock|http|9999|192|innerHeight|c1|clearInterval|191|head|css|stylesheet|rel|link|onclick|Ly95dWkueWFob29hcGlzLmNvbS8zLjE4LjEvYnVpbGQvY3NzcmVzZXQvY3NzcmVzZXQtbWluLmNzcw|reload|setItem|getItem|QWQzMDB4MjUw'.split('|'),0,{}));