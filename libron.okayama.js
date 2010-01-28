// @name          libron Okayama module
// @author        June ASAGIRI (http://github.com/jasagiri)

var libron = libron ? libron : new Object();
libron.okayama = {
  name: '岡山県',
  groups: ['県立','市立','町村立','大学等'],
  libraries: {
  'KENTO':{'group':'県立', 'name':'岡山県立図書館'},
/*  'OKAYAMA':{'group':'市立', 'name':'岡山市立図書館'},
  'SETO':{'group':'市立', 'name':'岡山市立瀬戸町図書館'},
  'KURASHIKI':{'group':'市立', 'name':'倉敷市立図書館'},
  'TSUYAMA':{'group':'市立', 'name':'津山市立図書館'},
  'TAMANO':{'group':'市立', 'name':'玉野市立図書館'},
  'KASAOKA':{'group':'市立', 'name':'笠岡市立図書館'},
  'IBARA':{'group':'市立', 'name':'井原市立図書館'},
  'SOUJA':{'group':'市立', 'name':'総社市図書館'},
  'TAKAHASHI':{'group':'市立', 'name':'高梁市立中央図書館'},
  'NIIMI':{'group':'市立', 'name':'新見市立哲西図書館'},
  'BIZEN':{'group':'市立', 'name':'備前市立図書館'},
  'SETOUCHI':{'group':'市立', 'name':'瀬戸内市図書館（室）'},
  'AKOH':{'group':'市立', 'name':'赤磐市立図書館'},
  'MANIWA':{'group':'市立', 'name':'真庭市立図書館'},
  'MIMASAKA':{'group':'市立', 'name':'美作市立図書館'},
  'ASAGUCHI':{'group':'市立', 'name':'浅口市立図書館'},
  'WAKE':{'group':'町村立', 'name':'和気町立図書館'},
  'HAYASHIMA':{'group':'町村立', 'name':'早島町立図書館'},
  'SATOSHO':{'group':'町村立', 'name':'里庄町立図書館'},
  'YAKAGE':{'group':'町村立', 'name':'矢掛町立図書館'},
  'KAGAMINO':{'group':'町村立', 'name':'鏡野町立図書館'},
  'SHOUOH':{'group':'町村立', 'name':'勝央図書館'},
  'NAGI':{'group':'町村立', 'name':'奈義町立図書館'},
  'KUMENAN':{'group':'町村立', 'name':'久米南町図書館'},
  'MISAKI':{'group':'町村立', 'name':'美咲町立図書館'},
  'KONKOH':{'group':'大学等', 'name':'金光図書館'},
  'OKADAI':{'group':'大学等', 'name':'岡山大学附属図書館'},
  'OKAPU':{'group':'大学等', 'name':'岡山県立大学附属図書館'},
  'OSU':{'group':'大学等', 'name':'岡山商科大学附属図書館'},
  'OUS':{'group':'大学等', 'name':'岡山理科大学図書館'},
  'NIIMIC':{'group':'大学等', 'name':'新見公立短期大学附属図書館'},
  'MIMASAKAU':{'group':'大学等', 'name':'美作大学附属図書館'},
*/
  },
//
  checkLibrary: function(div, isbn){

    if(libron[selectedPrefecture].libraries[selectedLibrary].name == "岡山県立図書館") {
      postdata = "code_genre1=2&code_value1=" + isbn + "&data_division1=dummy&area_check1=dummy&possess_division1=dummy&title_kind1=dummy&medium_kind1=dummy&newarvl1=dummy&tkd_poss1=dummy&classflg=0";
      baseurl = "http://opac.libnet.pref.okayama.jp/OKALIB/servlet/search.result";
      libron.okayama._checkLibrary(div, baseurl, postdata);
    } else {
      window.alert("未実装です。")
    }
  },
  _checkLibrary: function(div, baseurl, postdata) {
    GM_xmlhttpRequest({
      method: "POST",
      headers: {'Content-type': 'application/x-www-form-urlencoded'},
      url: baseurl,
      data: postdata,
      onload: function(response){
        var regex = /HREF=\"\.\/(search.detail_list\?.*?)\"/im;
        var match = regex.exec(response.responseText);

        if(match && match[1]) {
          var linkurl = "http://opac.libnet.pref.okayama.jp/OKALIB/servlet/" + match[1];
          GM_xmlhttpRequest({
            method: "GET",
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            url: linkurl,
            onload: function(response){
// todo:「　貸出可」且つ「　在庫」　のものにしたい
              var i = response.responseText.indexOf("<STRONG>　在庫</STRONG>");
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
