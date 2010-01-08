// @name          libron Miyazaki module
// @author        Seiya ISHIMARU (http://github.com/ishimaru-s)

var libron = libron ? libron : new Object();
libron.miyazaki = {
  name: '宮崎県',
  groups: ['県', '市', '北諸県郡', '東諸県郡', '児湯郡', '東臼杵郡', '西臼杵郡', '大学'],
  libraries: {
// @: 横断検索非対応, *: 蔵書検索非対応

// 公共図書館
    'miyazaki-p':  {'group':'県', 'name':'宮崎県立図書館', 'code':'prefmiyazaki'},
    'miyazaki':    {'group':'市', 'name':'宮崎市立図書館', 'code':'citymiyazaki'},
    'sadowara':    {'group':'市', 'name':'宮崎市立佐土原図書館', 'code':'townsadowara'},
//  'miyakonojo':  {'group':'市', 'name':'都城市立図書館', 'code':'citymiyakonojo'}, // 蔵書なしでも1件と表示
    'nobeoka':     {'group':'市', 'name':'延岡市立図書館', 'code':'citynobeoka'},
//@ 'nichinan':    {'group':'市', 'name':'日南市立図書館', 'code':''},
    'kobayashi':   {'group':'市', 'name':'小林市立図書館', 'code':'citykobayashi'},
    'hyuga':       {'group':'市', 'name':'日向市立図書館', 'code':'cityhyuga'},
    'kushima':     {'group':'市', 'name':'串間市立図書館', 'code':'citykushima'},
    'saito':       {'group':'市', 'name':'西都市立図書館', 'code':'citysaito'},
//@ 'ebino':       {'group':'市', 'name':'えびの市民図書館', 'code':''},
    'mimata':      {'group':'北諸県郡', 'name':'三股町立図書館', 'code':'townmimata'},
    'kunitomi':    {'group':'東諸県郡', 'name':'国富町立図書館', 'code':'townkunitomi'},
    'aya':         {'group':'東諸県郡', 'name':'綾てるは図書館', 'code':'townaya'},
//* 'takanabe':    {'group':'児湯郡', 'name':'高鍋町立高鍋図書館', 'code':''},
    'kawaminami':  {'group':'児湯郡', 'name':'川南町立図書館', 'code':'townkawaminami'},
    'tsuno':       {'group':'児湯郡', 'name':'都農町民図書館', 'code':'towntsuno'},
    'kadogawa':    {'group':'東臼杵郡', 'name':'門川町立図書館', 'code':'townkadogawa'},
//* 'saigo':       {'group':'東臼杵郡', 'name':'美郷町立西郷図書館', 'code':''},
//* 'kitago':      {'group':'東臼杵郡', 'name':'美郷町立北郷図書館', 'code':''},
//@ 'takachiho':   {'group':'西臼杵郡', 'name':'高千穂町立図書館', 'code':''},

// 大学図書館
    'uom':         {'group':'大学', 'name':'宮崎大学附属図書館', 'code':'univmiyazaki'},
    'mmu':         {'group':'大学', 'name':'宮崎公立大学附属図書館', 'code':'univkoritsu'}
//@ 'msu':         {'group':'大学', 'name':'宮崎産業経営大学附属図書館', 'code':''},
//@ 'mic':         {'group':'大学', 'name':'宮崎学園図書館', 'code':''},
//@ 'mku':         {'group':'大学', 'name':'南九州大学・南九州短期大学図書館', 'code':''},
//@ 'mpu':         {'group':'大学', 'name':'宮崎県立看護大学附属図書館', 'code':''},
//@ 'kuhw':        {'group':'大学', 'name':'九州保健福祉大学附属図書館', 'code':''}
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
          form.setAttribute('accept-charset', 'utf-8');
          addForm(div, form);
        } else {
          addNALink(div, errUrl);
        }
      },
      data: data
    });
  }
};