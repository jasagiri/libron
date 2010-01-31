// @name          libron Okayama module
// @author        June ASAGIRI (http://github.com/jasagiri)

var libron = libron ? libron : new Object();
libron.okayama = {
  name: '岡山県',
  groups: ['県立','市立','町村立','大学等'],
  libraries: {
  'OKAKEN':{'group':'県立', 'name':'岡山県立図書館' },
// isbn 無い  'OKASHI':{'group':'市立', 'name':'岡山市立図書館'},
// 公開されてない？横断検索のみ  'SETO':{'group':'市立', 'name':'岡山市立瀬戸町図書館'},
// isbn 無い  'KURASHIKI':{'group':'市立', 'name':'倉敷市立図書館'},
  'TSUYAMA':{'group':'市立', 'name':'津山市立図書館', 'url':'http://tsuyamalib.tvt.ne.jp/', 'searchpage':'tosken.asp', 'available':'利用可能' },
  'TAMANO':{'group':'市立', 'name':'玉野市立図書館', 'url':'http://library.city.tamano.okayama.jp/', 'searchpage':'tosken.html', 'available':'<td><br></td>' }, // 遅い
//  'KASAOKA':{'group':'市立', 'name':'笠岡市立図書館'},
//  'IBARA':{'group':'市立', 'name':'井原市立図書館'},
  'SOUJA':{'group':'市立', 'name':'総社市図書館', 'url':'http://lib01.city.soja.okayama.jp/', 'searchpage':'tosken.html', 'available':'貸出可' },
//  'TAKAHASHI':{'group':'市立', 'name':'高梁市立中央図書館'},
  'NIIMI':{'group':'市立', 'name':'新見市立哲西図書館', 'url':'http://lib.city.niimi.okayama.jp/', 'searchpage':'tosken.html', 'available':'<td><br></td>' },
  'BIZEN':{'group':'市立', 'name':'備前市立図書館', 'url':'http://libweb.city.bizen.okayama.jp/', 'searchpage':'tosken.html', 'available':'<td><br></td>' },
//  'SETOUCHI':{'group':'市立', 'name':'瀬戸内市図書館（室）'},
  'AKAIWA':{'group':'市立', 'name':'赤磐市立図書館', 'url':'http://book.city.akaiwa.lg.jp/', 'searchpage':'tosken.asp', 'available':'利用可能' }, // 遅い
  'MANIWA':{'group':'市立', 'name':'真庭市立図書館', 'url':'http://lib.city.maniwa.lg.jp/', 'searchpage':'tosken.asp', 'available':'通常貸出' },
  'MIMASAKA':{'group':'市立', 'name':'美作市立図書館', 'url':'http://library.city.mimasaka.lg.jp/', 'searchpage':'tosken.html', 'available':'<td><br></td>' },
//  'ASAGUCHI':{'group':'市立', 'name':'浅口市立図書館'},
  'WAKE':{'group':'町村立', 'name':'和気町立図書館', 'url':'http://library.town.wake.okayama.jp/', 'searchpage':'tosken.asp', 'available':'通常資料' }, // 予約してる？
  'HAYASHIMA':{'group':'町村立', 'name':'早島町立図書館', 'url':'http://www1.town.hayashima.okayama.jp/', 'searchpage':'tosken.asp', 'available':'利用可能' },
  'SATOSHO':{'group':'町村立', 'name':'里庄町立図書館', 'url':'http://www.slnet.town.satosho.okayama.jp/', 'searchpage':'tosken.asp', 'available':'<td><br></td>' },
  'YAKAGE':{'group':'町村立', 'name':'矢掛町立図書館', 'url':'http://library.town.yakage.okayama.jp/', 'searchpage':'tosken.asp', 'available':'利用可能' },
//  'KAGAMINO':{'group':'町村立', 'name':'鏡野町立図書館'},
//  'SHOUOH':{'group':'町村立', 'name':'勝央図書館'},
//  'NAGI':{'group':'町村立', 'name':'奈義町立図書館'},
  'KUMENAN':{'group':'町村立', 'name':'久米南町図書館' , 'url':'http://library.town.kumenan.okayama.jp/', 'searchpage':'tosken.html', 'available':'<td><br></td>' },
//  'MISAKI':{'group':'町村立', 'name':'美咲町立図書館'},
  'KONKOH':{'group':'大学等', 'name':'金光図書館', 'url':'http://www.konko-library.jp/', 'searchpage':'tosken.asp', 'available':'貸出可' },
/*
  'OKADAI':{'group':'大学等', 'name':'岡山大学附属図書館'},
  'OKAPU':{'group':'大学等', 'name':'岡山県立大学附属図書館'},
  'OSU':{'group':'大学等', 'name':'岡山商科大学附属図書館'},
  'OUS':{'group':'大学等', 'name':'岡山理科大学図書館'},
  'NIIMIC':{'group':'大学等', 'name':'新見公立短期大学附属図書館'},
  'MIMASAKAU':{'group':'大学等', 'name':'美作大学附属図書館'},
*/
  },

  checkLibrary: function(div, isbn){

    if(libron[selectedPrefecture].libraries[selectedLibrary].name == '岡山県立図書館') {
      postdata = 'code_genre1=2&code_value1=' + isbn + '&data_division1=dummy&area_check1=dummy&possess_division1=dummy&title_kind1=dummy&medium_kind1=dummy&newarvl1=dummy&tkd_poss1=dummy&classflg=0';
      baseurl = 'http://opac.libnet.pref.okayama.jp/OKALIB/servlet/search.result';
      libron.okayama._checkLibraryOKAKEN(div, baseurl, postdata);
    } else {
      postdata = 'isbnkey1=' + isbn;
      baseurl = libron[selectedPrefecture].libraries[selectedLibrary].url + 'toslist.asp';
      libron.okayama._checkLibraryTOS(div, baseurl, postdata);
    }
  },

  _checkLibraryOKAKEN: function(div, baseurl, postdata) {
    GM_xmlhttpRequest({
      method: 'POST',
      headers: {'Content-type': 'application/x-www-form-urlencoded'},
      url: baseurl,
      data: postdata,
      onload: function(response){
        var regex = /HREF=\"\.\/(search.detail_list\?.*?)\"/im;
        var match = regex.exec(response.responseText);

        if(match && match[1]) {
          var linkurl = 'http://opac.libnet.pref.okayama.jp/OKALIB/servlet/' + match[1];
          GM_xmlhttpRequest({
            method: 'GET',
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            url: linkurl,
            onload: function(response){
// todo:「　貸出可」且つ「　在庫」　のものにしたい
              var i = response.responseText.indexOf('<STRONG>　在庫</STRONG>');
              if (i != -1) {
                  addLink(div, linkurl);
              } else {
                addNALink(div, linkurl);
              }
            },
            onerror: function(response){
              addERLink(div, baseurl);
            }
          });
        } else {
          addNALink(div, baseurl);
        }
      },
      onerror: function(response){
        addERLink(div, baseurl);
      }
    });
  },

  _checkLibraryTOS: function(div, baseurl, postdata) {
    GM_xmlhttpRequest({
      method: 'GET',
      headers: {'Content-type': 'application/x-www-form-urlencoded'},
      url: baseurl + '?' + postdata, // これおかしくないかな？
      data: postdata,
      onload: function(response){
        var regex = /HREF=\"(tosmok\.asp\?.*?)\"/im;
        var match = regex.exec(response.responseText);
        var available = libron[selectedPrefecture].libraries[selectedLibrary].available;

        if(match && match[1]) {
          var linkurl = libron[selectedPrefecture].libraries[selectedLibrary].url + match[1].replace(/&amp;/g,'&');
          GM_xmlhttpRequest({
            method: 'GET',
            url: linkurl,
            overrideMimeType: 'text/html; charset=Shift_JIS',
            onload: function(response){
              var i = response.responseText.indexOf(available);

              if (i != -1) {
                  addLink(div, linkurl);
              } else {
                addNALink(div, linkurl);
              }
            },
            onerror: function(response){
              addERLink(div, baseurl);
            }
          });
        } else {
          addNALink(div, baseurl);
        }
      },
      onerror: function(response){
        addERLink(div, baseurl);
      }
    });
  }
};
