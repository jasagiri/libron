// @name          libron Miyazaki module
// @author        Seiya ISHIMARU (http://github.com/ishimaru-s)

var libron = libron ? libron : new Object();
libron.miyazaki = {
  name: '$B5\:j8)(B',
  groups: ['$B8)(B', '$B;T(B', '$BKL=t8)74(B', '$BEl=t8)74(B', '$B;yEr74(B', '$BEl115O74(B', '$B@>115O74(B', '$BBg3X(B'],
  libraries: {
// @: $B2#CG8!:wHsBP1~(B, *: $BB"=q8!:wHsBP1~(B

// $B8x6&?^=q4[(B
    'miyazaki-p':  {'group':'$B8)(B', 'name':'$B5\:j8)N)?^=q4[(B', 'code':'prefmiyazaki'},
    'miyazaki':    {'group':'$B;T(B', 'name':'$B5\:j;TN)?^=q4[(B', 'code':'citymiyazaki'},
    'sadowara':    {'group':'$B;T(B', 'name':'$B5\:j;TN):4EZ86?^=q4[(B', 'code':'townsadowara'},
//  'miyakonojo':  {'group':'$B;T(B', 'name':'$BET>k;TN)?^=q4[(B', 'code':'citymiyakonojo'}, // $BB"=q$J$7$G$b(B1$B7o$HI=<((B
    'nobeoka':     {'group':'$B;T(B', 'name':'$B1d2,;TN)?^=q4[(B', 'code':'citynobeoka'},
//@ 'nichinan':    {'group':'$B;T(B', 'name':'$BF|Fn;TN)?^=q4[(B', 'code':''},
    'kobayashi':   {'group':'$B;T(B', 'name':'$B>.NS;TN)?^=q4[(B', 'code':'citykobayashi'},
    'hyuga':       {'group':'$B;T(B', 'name':'$BF|8~;TN)?^=q4[(B', 'code':'cityhyuga'},
    'kushima':     {'group':'$B;T(B', 'name':'$B6z4V;TN)?^=q4[(B', 'code':'citykushima'},
    'saito':       {'group':'$B;T(B', 'name':'$B@>ET;TN)?^=q4[(B', 'code':'citysaito'},
//@ 'ebino':       {'group':'$B;T(B', 'name':'$B$($S$N;TL1?^=q4[(B', 'code':''},
    'mimata':      {'group':'$BKL=t8)74(B', 'name':'$B;08TD.N)?^=q4[(B', 'code':'townmimata'},
    'kunitomi':    {'group':'$BEl=t8)74(B', 'name':'$B9qIYD.N)?^=q4[(B', 'code':'townkunitomi'},
    'aya':         {'group':'$BEl=t8)74(B', 'name':'$B0=$F$k$O?^=q4[(B', 'code':'townaya'},
//* 'takanabe':    {'group':'$B;yEr74(B', 'name':'$B9bFiD.N)9bFi?^=q4[(B', 'code':''},
    'kawaminami':  {'group':'$B;yEr74(B', 'name':'$B@nFnD.N)?^=q4[(B', 'code':'townkawaminami'},
    'tsuno':       {'group':'$B;yEr74(B', 'name':'$BETG@D.L1?^=q4[(B', 'code':'towntsuno'},
    'kadogawa':    {'group':'$BEl115O74(B', 'name':'$BLg@nD.N)?^=q4[(B', 'code':'townkadogawa'},
//* 'saigo':       {'group':'$BEl115O74(B', 'name':'$BH~6?D.N)@>6??^=q4[(B', 'code':''},
//* 'kitago':      {'group':'$BEl115O74(B', 'name':'$BH~6?D.N)KL6??^=q4[(B', 'code':''},
//@ 'takachiho':   {'group':'$B@>115O74(B', 'name':'$B9b@iJfD.N)?^=q4[(B', 'code':''},

// $BBg3X?^=q4[(B
    'uom':         {'group':'$BBg3X(B', 'name':'$B5\:jBg3XImB0?^=q4[(B', 'code':'univmiyazaki'},
    'mmu':         {'group':'$BBg3X(B', 'name':'$B5\:j8xN)Bg3XImB0?^=q4[(B', 'code':'univkoritsu'}
//@ 'msu':         {'group':'$BBg3X(B', 'name':'$B5\:j;:6H7P1DBg3XImB0?^=q4[(B', 'code':''},
//@ 'mic':         {'group':'$BBg3X(B', 'name':'$B5\:j3X1`?^=q4[(B', 'code':''},
//@ 'mku':         {'group':'$BBg3X(B', 'name':'$BFn6e=#Bg3X!&Fn6e=#C;4|Bg3X?^=q4[(B', 'code':''},
//@ 'mpu':         {'group':'$BBg3X(B', 'name':'$B5\:j8)N)4G8nBg3XImB0?^=q4[(B', 'code':''},
//@ 'kuhw':        {'group':'$BBg3X(B', 'name':'$B6e=#J]7rJ!;cBg3XImB0?^=q4[(B', 'code':''}
  },
  checkLibrary: function(div, isbn){
    var code = libron[selectedPrefecture].libraries[selectedLibrary].code;
    var url = 'http://www2.lib.pref.miyazaki.lg.jp/cgi-bin/ilisod/tougou_odsearch_plus.sh';
    var errUrl = 'http://www2.lib.pref.miyazaki.lg.jp/cgi-bin/ilisod/odplus.sh';
    var data = 'GROUP_A=&INPUTCODE=UTF8&SRCKIND=4&U_CHARSET=utf-8&all_title=&author1=&author1m=1&class1=&dbflg=1&dbsort=' + code + '&errortpl=&isbn=' + isbn + '&lang=japanese&pubdate1=&pubdate2=&publish=&sortname=title&subject=&successtpl=&title1=&title1m=1&title1r=1&title2=&title2m=1&title2r=1&title3=&title3m=1';
    libron.miyazaki._checkLibrary(div, url, data, errUrl);
  },
  _checkLibrary: function(div, url, data, errUrl){
    GM_xmlhttpRequest({
      method: 'POST',
      url: url,
      onload: function(res){
        try {
          var htmldoc = parseHTML(res.responseText);
          if(res.finalUrl){
            this.requestURL = res.finalUrl;
          }
          relativeToAbsolutePath(htmldoc, this.requestURL);
        } catch(e) {
          return;
        }
        var forms = $X('//form', htmldoc);
        if (forms.length > 1) {
          var resolver = path_resolver(this.requestURL);
          var id = randomString('0123456789abcdefghijklmnopqrstuvwxyz', 10);
          var form = forms[1];
          form.id = id;
          form.action = resolver(form.getAttribute('action'));
          form.target = '_blank';
          addForm(div, form);
        } else {
          addNALink(div, errUrl);
        }
      },
      data: data
    });
  }
};

