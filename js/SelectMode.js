var _0x10a8=['getImage','text_title','text','게임\x20모드\x20선택','anchor','set','stroke','#ffffff','strokeThickness','singleLogo','image','spr_singleLogo','scale','multiLogo','spr_multiLogo','button','spr_singleButton','single','bt_single','bt_multi','spr_multiButton','multi','tilePosition','angle','cos','time','totalElapsedSeconds','sin','pointerOver','alpha','input','play','start','multiCustom','camera','flash','#000000','bg_background','add','tileSprite','game','height','cache','bg_loby'];(function(_0x1b7185,_0x4ebb71){var _0x4fc115=function(_0x238bab){while(--_0x238bab){_0x1b7185['push'](_0x1b7185['shift']());}};_0x4fc115(++_0x4ebb71);}(_0x10a8,0x1da));var _0x50b3=function(_0x2bf8b8,_0x42a1a4){_0x2bf8b8=_0x2bf8b8-0x0;var _0x438ead=_0x10a8[_0x2bf8b8];return _0x438ead;};var selectMode={'create':function(){this[_0x50b3('0x0')][_0x50b3('0x1')](_0x50b3('0x2')),this[_0x50b3('0x3')]=this['game'][_0x50b3('0x4')][_0x50b3('0x5')](0x0,this[_0x50b3('0x6')][_0x50b3('0x7')]-this[_0x50b3('0x6')][_0x50b3('0x8')]['getImage'](_0x50b3('0x9'))[_0x50b3('0x7')],this['game']['width'],this[_0x50b3('0x6')][_0x50b3('0x8')][_0x50b3('0xa')](_0x50b3('0x9'))[_0x50b3('0x7')],_0x50b3('0x9')),this[_0x50b3('0xb')]=game[_0x50b3('0x4')][_0x50b3('0xc')](CANVAS_WIDTH/0x2,0x64,_0x50b3('0xd'),{'font':'bold\x2060px\x20BMJUA'}),this[_0x50b3('0xb')][_0x50b3('0xe')][_0x50b3('0xf')](0.5),this[_0x50b3('0xb')][_0x50b3('0x10')]=_0x50b3('0x11'),this['text_title'][_0x50b3('0x12')]=0x6,this[_0x50b3('0x13')]=game['add'][_0x50b3('0x14')](CANVAS_WIDTH/0x2-0x12c,CANVAS_HEIGHT/0x2,_0x50b3('0x15')),this[_0x50b3('0x13')][_0x50b3('0xe')][_0x50b3('0xf')](0.5),this[_0x50b3('0x13')][_0x50b3('0x16')][_0x50b3('0xf')](0.7),this[_0x50b3('0x17')]=game[_0x50b3('0x4')][_0x50b3('0x14')](CANVAS_WIDTH/0x2+0x12c,CANVAS_HEIGHT/0x2,_0x50b3('0x18')),this[_0x50b3('0x17')][_0x50b3('0xe')][_0x50b3('0xf')](0.5),this['bt_single']=game[_0x50b3('0x4')][_0x50b3('0x19')](CANVAS_WIDTH/0x2-0x12c,0x258,_0x50b3('0x1a'),this[_0x50b3('0x1b')],this),this[_0x50b3('0x1c')][_0x50b3('0xe')][_0x50b3('0xf')](0.5),this[_0x50b3('0x1c')][_0x50b3('0x16')][_0x50b3('0xf')](0.5),this[_0x50b3('0x1d')]=game[_0x50b3('0x4')]['button'](CANVAS_WIDTH/0x2+0x12c,0x258,_0x50b3('0x1e'),this[_0x50b3('0x1f')],this),this[_0x50b3('0x1d')][_0x50b3('0xe')][_0x50b3('0xf')](0.5),this[_0x50b3('0x1d')][_0x50b3('0x16')][_0x50b3('0xf')](0.5);},'update':function(){this['bg_background'][_0x50b3('0x20')]['x']-=0x6,this[_0x50b3('0x13')][_0x50b3('0x21')]=0x5*Math[_0x50b3('0x22')](0x2*game[_0x50b3('0x23')][_0x50b3('0x24')]()),this[_0x50b3('0x17')]['angle']=0x5*Math[_0x50b3('0x25')](0x2*game['time']['totalElapsedSeconds']()),this[_0x50b3('0x1c')]['input'][_0x50b3('0x26')]()?this[_0x50b3('0x1c')][_0x50b3('0x27')]=0x1:this[_0x50b3('0x1c')][_0x50b3('0x27')]=0.8,this[_0x50b3('0x1d')][_0x50b3('0x28')][_0x50b3('0x26')]()?this[_0x50b3('0x1d')]['alpha']=0x1:this['bt_multi'][_0x50b3('0x27')]=0.8;},'single':function(){gameMode=_0x50b3('0x1b'),sfx_button[_0x50b3('0x29')](),game['state'][_0x50b3('0x2a')]('singleCustom');},'multi':function(){gameMode=_0x50b3('0x1f'),sfx_button[_0x50b3('0x29')](),game['state'][_0x50b3('0x2a')](_0x50b3('0x2b'));}};