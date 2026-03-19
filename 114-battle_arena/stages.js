// ===== STAGE BACKGROUNDS (10 character themes) =====
// ctx は drawBackground() から渡される
const STAGES = {
  // 騎士 — 城の謁見室
  knight(ctx,w,h,fY,t){
    const g=ctx.createLinearGradient(0,0,0,fY);
    g.addColorStop(0,'#0d0d1a');g.addColorStop(1,'#1e1e38');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,fY);
    // 石壁レンガ
    for(let r=0;r<7;r++) for(let c=0;c<10;c++){
      ctx.fillStyle=r%2?'#2a2a42':'#252538';
      ctx.fillRect(c*(w/10)+(r%2?w/20:0),r*(fY/7),w/10-2,fY/7-2);
    }
    // ステンドグラス窓
    const wx=w*.5,wy=fY*.32,wr=Math.min(w,h)*.1;
    const cg=ctx.createRadialGradient(wx,wy,0,wx,wy,wr);
    cg.addColorStop(0,'rgba(255,200,80,.8)');cg.addColorStop(1,'rgba(200,100,30,0)');
    ctx.fillStyle=cg;ctx.beginPath();ctx.arc(wx,wy,wr,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(0,0,60,.6)';
    ctx.beginPath();ctx.arc(wx,wy,wr,Math.PI,0);ctx.lineTo(wx+wr,wy+wr*1.3);ctx.lineTo(wx-wr,wy+wr*1.3);ctx.closePath();ctx.fill();
    // たいまつ
    [w*.18,w*.82].forEach(tx=>{
      const ty=fY*.55,fl=Math.sin(t*9+tx)*.3+.7;
      ctx.fillStyle='#4a3010';ctx.fillRect(tx-3,ty,6,28);
      const fg=ctx.createRadialGradient(tx,ty+Math.sin(t*7)*4,2,tx,ty,22);
      fg.addColorStop(0,`rgba(255,230,60,${fl})`);fg.addColorStop(.5,`rgba(255,100,10,${fl*.6})`);fg.addColorStop(1,'rgba(255,50,0,0)');
      ctx.fillStyle=fg;ctx.beginPath();ctx.ellipse(tx,ty+Math.sin(t*7)*4,9,18,0,0,Math.PI*2);ctx.fill();
    });
    ctx.fillStyle='#181828';ctx.fillRect(0,fY,w,h-fY);
    for(let i=0;i<10;i++){ctx.fillStyle=`rgba(255,255,255,.03)`;ctx.fillRect(i*w/10,fY,w/10-1,h-fY);}
  },
  // ゴブリン — 毒沼の洞窟
  goblin(ctx,w,h,fY,t){
    const g=ctx.createLinearGradient(0,0,0,fY);
    g.addColorStop(0,'#040a04');g.addColorStop(1,'#0f2010');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,fY);
    // 鍾乳石
    ctx.fillStyle='#0a1408';
    for(let i=0;i<13;i++){
      const sx=(i*w/12+(i*37)%(w/14)),sh=25+((i*53)%75);
      ctx.beginPath();ctx.moveTo(sx-9,0);ctx.lineTo(sx+9,0);ctx.lineTo(sx,sh);ctx.closePath();ctx.fill();
    }
    // 毒のもや
    const fog=ctx.createLinearGradient(0,fY*.5,0,fY);
    fog.addColorStop(0,'rgba(0,80,0,0)');fog.addColorStop(1,`rgba(0,${100+Math.sin(t*1.5)*20},10,.3)`);
    ctx.fillStyle=fog;ctx.fillRect(0,fY*.5,w,fY*.5);
    // 光るキノコ
    for(let i=0;i<6;i++){
      const mx=w*(.08+i*.17),my=fY*.72;
      const mg=ctx.createRadialGradient(mx,my,0,mx,my,22);
      mg.addColorStop(0,`rgba(80,255,80,${.35+Math.sin(t*2+i)*.15})`);mg.addColorStop(1,'rgba(0,200,0,0)');
      ctx.fillStyle=mg;ctx.beginPath();ctx.arc(mx,my,22,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#50e050';ctx.beginPath();ctx.arc(mx,my,7,Math.PI,0);ctx.fill();
      ctx.fillStyle='#185018';ctx.fillRect(mx-2.5,my,5,12);
    }
    // 光る目
    for(let i=0;i<3;i++){
      const ex=w*(.1+i*.38),ey=fY*(.25+((i*29)%30)/100);
      const ea=.3+Math.sin(t*1.8+i*1.3)*.4;
      ctx.fillStyle=`rgba(220,200,0,${ea})`;
      [0,14].forEach(d=>{ctx.beginPath();ctx.ellipse(ex+d,ey,4.5,2.5,0,0,Math.PI*2);ctx.fill();});
    }
    ctx.fillStyle='#0c1a0c';ctx.fillRect(0,fY,w,h-fY);
    for(let i=0;i<5;i++){
      const pg=ctx.createRadialGradient(w*(.1+i*.2),fY+8,0,w*(.1+i*.2),fY+8,28);
      pg.addColorStop(0,'rgba(0,100,20,.4)');pg.addColorStop(1,'rgba(0,60,10,0)');
      ctx.fillStyle=pg;ctx.beginPath();ctx.ellipse(w*(.1+i*.2),fY+8,28,9,0,0,Math.PI*2);ctx.fill();
    }
  },
  // スケルトン — 月夜の墓地
  skeleton(ctx,w,h,fY,t){
    const g=ctx.createLinearGradient(0,0,0,fY);
    g.addColorStop(0,'#02020c');g.addColorStop(.5,'#0a0a22');g.addColorStop(1,'#14142e');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,fY);
    // 星
    for(let i=0;i<70;i++){
      const sx=(i*71+17)%w,sy=(i*43+9)%(fY*.65);
      ctx.fillStyle=`rgba(255,255,255,${.2+Math.sin(t*1.5+i)*.5})`;
      ctx.fillRect(sx,sy,i%6?1:2,i%6?1:2);
    }
    // 月
    const mn=ctx.createRadialGradient(w*.15,fY*.16,0,w*.15,fY*.16,48);
    mn.addColorStop(0,'rgba(220,215,190,1)');mn.addColorStop(.75,'rgba(170,165,140,.9)');mn.addColorStop(1,'rgba(80,80,60,0)');
    ctx.fillStyle=mn;ctx.beginPath();ctx.arc(w*.15,fY*.16,48,0,Math.PI*2);ctx.fill();
    const halo=ctx.createRadialGradient(w*.15,fY*.16,38,w*.15,fY*.16,85);
    halo.addColorStop(0,'rgba(200,200,160,.12)');halo.addColorStop(1,'rgba(200,200,160,0)');
    ctx.fillStyle=halo;ctx.beginPath();ctx.arc(w*.15,fY*.16,85,0,Math.PI*2);ctx.fill();
    // 枯れ木
    [[w*.05,fY],[w*.88,fY],[w*.78,fY]].forEach(([tx,ty])=>{
      ctx.strokeStyle='#141420';ctx.lineWidth=4;
      ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(tx+4,ty-110);ctx.stroke();
      ctx.lineWidth=2;
      [[tx+4,ty-70,tx-28,ty-100],[tx+4,ty-70,tx+36,ty-95],[tx+4,ty-42,tx-18,ty-72]].forEach(([x1,y1,x2,y2])=>{
        ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();
      });
    });
    // 墓石
    [w*.12,w*.27,w*.5,w*.72,w*.86].forEach((tx,ti)=>{
      const th=38+ti*6;
      ctx.fillStyle='#1e1e32';ctx.fillRect(tx-13,fY-th,26,th);
      ctx.beginPath();ctx.arc(tx,fY-th,13,Math.PI,0);ctx.fill();
      ctx.strokeStyle='rgba(200,200,255,.07)';ctx.lineWidth=1;ctx.strokeRect(tx-13,fY-th,26,th);
    });
    // 地面霧
    const fogG=ctx.createLinearGradient(0,fY-24,0,fY+28);
    fogG.addColorStop(0,'rgba(140,140,200,0)');fogG.addColorStop(.5,'rgba(140,140,200,.13)');fogG.addColorStop(1,'rgba(140,140,200,0)');
    ctx.fillStyle=fogG;ctx.fillRect(0,fY-24,w,52);
    ctx.fillStyle='#0a0a18';ctx.fillRect(0,fY,w,h-fY);
  },
  // 侍 — 夕暮れの道場
  samurai(ctx,w,h,fY,t){
    const g=ctx.createLinearGradient(0,0,0,fY);
    g.addColorStop(0,'#180808');g.addColorStop(.4,'#6a1818');g.addColorStop(.8,'#c84818');g.addColorStop(1,'#e87020');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,fY);
    // 障子スクリーン
    [0,w*.76].forEach(sx=>{
      ctx.fillStyle='rgba(255,240,200,.1)';ctx.fillRect(sx,fY*.08,w*.22,fY*.86);
      ctx.strokeStyle='rgba(100,55,15,.45)';ctx.lineWidth=1.5;
      for(let i=1;i<4;i++){ctx.beginPath();ctx.moveTo(sx+i*w*.055,fY*.08);ctx.lineTo(sx+i*w*.055,fY*.94);ctx.stroke();}
      for(let j=1;j<7;j++){ctx.beginPath();ctx.moveTo(sx,fY*(.08+j*.128));ctx.lineTo(sx+w*.22,fY*(.08+j*.128));ctx.stroke();}
    });
    // 富士山
    ctx.fillStyle='rgba(25,8,8,.65)';
    ctx.beginPath();ctx.moveTo(w*.34,fY*.92);ctx.lineTo(w*.5,fY*.14);ctx.lineTo(w*.66,fY*.92);ctx.closePath();ctx.fill();
    ctx.fillStyle='rgba(255,255,255,.65)';
    ctx.beginPath();ctx.moveTo(w*.465,fY*.28);ctx.lineTo(w*.5,fY*.14);ctx.lineTo(w*.535,fY*.28);ctx.closePath();ctx.fill();
    // 花びら
    for(let i=0;i<22;i++){
      const px=((i*137+t*25)%(w+50))-25;
      const py=(i*71+t*16)%(fY*.88);
      ctx.fillStyle=`rgba(255,180,185,${.45+Math.sin(t+i)*.25})`;
      ctx.beginPath();ctx.arc(px,py,2.5+Math.sin(t*.8+i)*.8,0,Math.PI*2);ctx.fill();
    }
    // 木の床
    ctx.fillStyle='#380f06';ctx.fillRect(0,fY,w,h-fY);
    for(let i=0;i<10;i++){ctx.fillStyle=i%2?'rgba(70,30,5,.35)':'rgba(15,5,0,.25)';ctx.fillRect(i*w/10,fY,w/10-1,h-fY);}
    const rg=ctx.createLinearGradient(0,fY,0,fY+38);
    rg.addColorStop(0,'rgba(230,110,30,.1)');rg.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=rg;ctx.fillRect(0,fY,w,38);
  },
  // 忍者 — 夜の屋根
  ninja(ctx,w,h,fY,t){
    const g=ctx.createLinearGradient(0,0,0,fY);
    g.addColorStop(0,'#000208');g.addColorStop(.5,'#04041a');g.addColorStop(1,'#080820');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,fY);
    // 星
    for(let i=0;i<90;i++){
      const sx=(i*61+23)%w,sy=(i*37+7)%(fY*.6);
      ctx.fillStyle=`rgba(255,255,255,${.15+Math.sin(t+i*.7)*.55})`;
      ctx.fillRect(sx,sy,i%7?1:2,i%7?1:2);
    }
    // 満月
    const mg2=ctx.createRadialGradient(w*.83,fY*.2,0,w*.83,fY*.2,42);
    mg2.addColorStop(0,'rgba(255,255,220,1)');mg2.addColorStop(.8,'rgba(220,220,180,.9)');mg2.addColorStop(1,'rgba(100,100,80,0)');
    ctx.fillStyle=mg2;ctx.beginPath();ctx.arc(w*.83,fY*.2,42,0,Math.PI*2);ctx.fill();
    // ビル群シルエット
    ctx.fillStyle='#030310';
    [[0,.58,.12,.4],[.09,.48,.08,.4],[.15,.63,.1,.35],[.55,.52,.09,.36],[.64,.38,.07,.44],[.7,.58,.1,.4],[.8,.48,.08,.4],[.87,.62,.12,.36]].forEach(([bx,by,bw,bh])=>{
      ctx.fillRect(bx*w,by*fY,bw*w,bh*fY);
    });
    // ビルの光窓
    for(let i=0;i<35;i++){
      const wx2=(i*83+11)%w,wy2=(i*47)%(fY*.55)+fY*.38;
      if((i*31)%10>3){ctx.fillStyle=`rgba(255,200,100,${.2+Math.sin(t*.3+i)*.12})`;ctx.fillRect(wx2,wy2,3,4);}
    }
    // 提灯
    [w*.25,w*.5,w*.75].forEach((lx,li)=>{
      ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(lx,0);ctx.lineTo(lx,fY*.33-18);ctx.stroke();
      const la=.55+Math.sin(t*2+li)*.2;
      const lg=ctx.createRadialGradient(lx,fY*.33,0,lx,fY*.33,19);
      lg.addColorStop(0,`rgba(255,170,70,${la})`);lg.addColorStop(1,'rgba(255,90,10,0)');
      ctx.fillStyle=lg;ctx.beginPath();ctx.ellipse(lx,fY*.33,11,17,0,0,Math.PI*2);ctx.fill();
    });
    ctx.fillStyle='#060614';ctx.fillRect(0,fY,w,h-fY);
    ctx.strokeStyle='rgba(255,255,255,.03)';ctx.lineWidth=1;
    for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(0,fY+i*(h-fY)/4);ctx.lineTo(w,fY+i*(h-fY)/4);ctx.stroke();}
  },
  // 魔法使い — 魔法塔
  wizard(ctx,w,h,fY,t){
    const g=ctx.createLinearGradient(0,0,0,fY);
    g.addColorStop(0,'#03010e');g.addColorStop(.5,'#0d0322');g.addColorStop(1,'#180432');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,fY);
    // 星空
    for(let i=0;i<110;i++){
      const sx=(i*67+13)%w,sy=(i*41+9)%(fY*.82);
      const sc=i%3?'180,140,255':i%3===1?'130,190,255':'255,240,180';
      ctx.fillStyle=`rgba(${sc},${.15+Math.sin(t*1.2+i*.5)*.7})`;
      ctx.fillRect(sx,sy,i%8?1:2,i%8?1:2);
    }
    // 浮遊魔法オーブ
    [{x:.18,y:.28,r:16,h:160,p:0},{x:.5,y:.12,r:11,h:220,p:1.2},{x:.8,y:.26,r:20,h:300,p:2.4},{x:.1,y:.58,r:9,h:170,p:.8},{x:.9,y:.52,r:13,h:40,p:1.8}].forEach(o=>{
      const ox=o.x*w,oy=o.y*fY+Math.sin(t*1.4+o.p)*13;
      const og=ctx.createRadialGradient(ox,oy,0,ox,oy,o.r*2.4);
      const col=`hsl(${o.h},80%,65%)`;
      og.addColorStop(0,col.replace(')',`,${.7+Math.sin(t+o.p)*.2})`).replace('hsl','hsla'));
      og.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=og;ctx.beginPath();ctx.arc(ox,oy,o.r*2.4,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=`hsla(${o.h},80%,75%,.9)`;ctx.beginPath();ctx.arc(ox,oy,o.r,0,Math.PI*2);ctx.fill();
    });
    // 石壁
    ctx.fillStyle='rgba(15,5,35,.55)';
    for(let r=0;r<8;r++) for(let c=0;c<10;c++) ctx.fillRect(c*(w/10)+1,r*(fY/8)+1,w/10-3,fY/8-3);
    // 魔法陣
    ctx.strokeStyle=`rgba(170,70,255,${.35+Math.sin(t*.8)*.1})`;ctx.lineWidth=1.5;
    ctx.beginPath();ctx.arc(w*.5,fY,w*.24,0,Math.PI*2);ctx.stroke();
    ctx.strokeStyle=`rgba(170,70,255,.18)`;
    ctx.beginPath();ctx.arc(w*.5,fY,w*.17,0,Math.PI*2);ctx.stroke();
    for(let i=0;i<6;i++){
      const a=i*Math.PI/3+t*.18;
      ctx.strokeStyle=`rgba(170,70,255,${.1+Math.sin(t+i)*.07})`;ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(w*.5+Math.cos(a)*w*.24,fY+Math.sin(a)*fY*.03);
      ctx.lineTo(w*.5+Math.cos(a+Math.PI)*w*.24,fY+Math.sin(a+Math.PI)*fY*.03);ctx.stroke();
    }
    ctx.fillStyle='#070415';ctx.fillRect(0,fY,w,h-fY);
    ctx.strokeStyle='rgba(140,40,255,.06)';ctx.lineWidth=1;
    for(let i=0;i<8;i++){ctx.beginPath();ctx.moveTo(i*w/8,fY);ctx.lineTo(i*w/8,h);ctx.stroke();}
  },
  // グラディエーター — コロッセオ
  gladiator(ctx,w,h,fY,t){
    const g=ctx.createLinearGradient(0,0,0,fY);
    g.addColorStop(0,'#2a5a88');g.addColorStop(.5,'#4a8aae');g.addColorStop(1,'#6aaac8');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,fY);
    // 観客席シルエット
    ctx.fillStyle='rgba(15,15,25,.7)';
    ctx.beginPath();ctx.ellipse(w*.5,fY*.04,w*.54,fY*.52,0,0,Math.PI);ctx.fill();
    for(let i=0;i<90;i++){
      const ca=(i/90)*Math.PI;
      const cr=w*(.4+(i*73)%100/1000);
      const cx2=w*.5+Math.cos(ca)*cr*.9,cy2=fY*.04+Math.sin(ca)*cr*.44;
      if(cy2>0&&cy2<fY*.5){
        ctx.fillStyle=`rgba(${90+(i*31)%70},${70+(i*23)%50},${50+(i*17)%40},.55)`;
        ctx.beginPath();ctx.arc(cx2,cy2,1.8,0,Math.PI*2);ctx.fill();
      }
    }
    // 石のアーチ
    [-1,0,1].forEach(ai=>{
      const ax=w*.5+ai*w*.28,aw=w*.1,ah=fY*.28,ay=fY*.66;
      ctx.fillStyle='rgba(195,175,115,.28)';ctx.fillRect(ax-aw/2,ay,aw,ah);
      ctx.beginPath();ctx.arc(ax,ay,aw/2,Math.PI,0);ctx.fill();
      ctx.fillStyle='rgba(0,0,0,.22)';ctx.fillRect(ax-aw/2+4,ay,aw-8,ah);
    });
    // 柱
    [w*.07,w*.93,w*.2,w*.8].forEach(cx2=>{
      ctx.fillStyle='rgba(205,185,125,.45)';ctx.fillRect(cx2-7,fY*.28,14,fY*.7);
      ctx.fillStyle='rgba(215,195,135,.65)';ctx.fillRect(cx2-11,fY*.26,22,9);ctx.fillRect(cx2-11,fY*.96,22,7);
    });
    // 砂の床
    ctx.fillStyle='#c09840';ctx.fillRect(0,fY,w,h-fY);
    for(let i=0;i<28;i++){
      const fx=((i*83+Math.floor(t*2))%w),fy=fY+((i*19)%(h-fY));
      ctx.fillStyle=`rgba(90,60,10,${.08+(i%3)*.04})`;ctx.fillRect(fx,fy,3,1);
    }
  },
  // 海賊 — 夕日の甲板
  pirate(ctx,w,h,fY,t){
    const g=ctx.createLinearGradient(0,0,0,fY);
    g.addColorStop(0,'#150606');g.addColorStop(.3,'#7a2200');g.addColorStop(.7,'#c84808');g.addColorStop(.9,'#e07518');g.addColorStop(1,'#e89428');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,fY);
    // 太陽
    const sg=ctx.createRadialGradient(w*.5,fY*.82,0,w*.5,fY*.82,75);
    sg.addColorStop(0,'rgba(255,230,100,1)');sg.addColorStop(.5,'rgba(255,140,20,.5)');sg.addColorStop(1,'rgba(255,90,0,0)');
    ctx.fillStyle=sg;ctx.beginPath();ctx.arc(w*.5,fY*.82,75,0,Math.PI*2);ctx.fill();
    // 水面の光の反射
    for(let i=0;i<8;i++){
      const ry=fY*(.85+i*.016),rw=Math.max(4,38-i*4.5);
      const rx=w*.5+Math.sin(t*1.8+i)*.025*w;
      ctx.fillStyle=`rgba(255,200,80,${.48-i*.055})`;ctx.fillRect(rx-rw/2,ry,rw,2.5);
    }
    // マスト
    const mx=w*.72;
    ctx.strokeStyle='rgba(55,25,8,.85)';ctx.lineWidth=5;
    ctx.beginPath();ctx.moveTo(mx,fY*.88);ctx.lineTo(mx,fY*.08);ctx.stroke();
    ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(mx,fY*.1);ctx.lineTo(mx+w*.1,fY*.14);ctx.stroke();
    ctx.fillStyle='rgba(235,215,155,.65)';
    ctx.beginPath();ctx.moveTo(mx,fY*.12);ctx.quadraticCurveTo(mx+w*.055,fY*.14,mx,fY*.42);ctx.lineTo(mx-w*.045,fY*.28);ctx.closePath();ctx.fill();
    // 海の波
    ctx.fillStyle='#b06818';ctx.fillRect(0,fY,w,h-fY);
    for(let i=0;i<6;i++){
      ctx.strokeStyle=`rgba(255,145,25,${.38-i*.055})`;ctx.lineWidth=2;
      ctx.beginPath();
      for(let x=0;x<=w;x+=18){const wy2=fY+7+i*9+Math.sin(x/55+t*2.2+i)*.018*h;x===0?ctx.moveTo(x,wy2):ctx.lineTo(x,wy2);}
      ctx.stroke();
    }
  },
  // ドラゴン — 火山の溶岩窟
  dragon(ctx,w,h,fY,t){
    const g=ctx.createLinearGradient(0,0,0,fY);
    g.addColorStop(0,'#080000');g.addColorStop(.4,'#280600');g.addColorStop(.8,'#4e0800');g.addColorStop(1,'#800e00');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,fY);
    // 岩の鍾乳石
    ctx.fillStyle='#180400';
    for(let i=0;i<15;i++){
      const sx=(i*w/13+(i*43)%(w/15));
      const sh=18+((i*59)%85);
      ctx.beginPath();ctx.moveTo(sx-7,0);ctx.lineTo(sx+7,0);ctx.lineTo(sx+((i*17)%7-3),sh);ctx.closePath();ctx.fill();
    }
    // 溶岩の赤い光
    const lv=ctx.createLinearGradient(0,fY*.45,0,fY);
    lv.addColorStop(0,'rgba(255,60,0,0)');lv.addColorStop(1,`rgba(255,${80+Math.sin(t*3)*25},0,.38)`);
    ctx.fillStyle=lv;ctx.fillRect(0,fY*.45,w,fY*.55);
    // 溶岩たまり
    [{x:.1,r:70},{x:.48,r:90},{x:.82,r:65}].forEach((lp,li)=>{
      const lg=ctx.createRadialGradient(lp.x*w,fY*.76,0,lp.x*w,fY*.76,lp.r/2);
      const bright=130+Math.sin(t*4+li)*45;
      lg.addColorStop(0,`rgba(255,${bright},0,.92)`);
      lg.addColorStop(.5,'rgba(200,50,0,.6)');lg.addColorStop(1,'rgba(100,15,0,0)');
      ctx.fillStyle=lg;ctx.beginPath();ctx.ellipse(lp.x*w,fY*.76,lp.r/2,lp.r/5,0,0,Math.PI*2);ctx.fill();
    });
    // 火の粉
    for(let i=0;i<28;i++){
      const phase=i*.38+t*(1+(i%3)*.6);
      const ex=(i*83)%w;
      const ey=fY-((phase*55)%(fY*.88));
      if(ey>0){
        ctx.fillStyle=`rgba(255,${90+((i*47)%90)},0,${.35+Math.sin(t*3+i)*.35})`;
        ctx.beginPath();ctx.arc(ex,ey,1.4,0,Math.PI*2);ctx.fill();
      }
    }
    // 溶岩の床のひび割れ
    ctx.fillStyle='#160300';ctx.fillRect(0,fY,w,h-fY);
    for(let i=0;i<5;i++){
      const pulse=.28+Math.sin(t*2.2+i)*.25;
      ctx.strokeStyle=`rgba(255,70,0,${pulse})`;ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo((i+.5)*w/5,fY);ctx.lineTo((i+.5)*w/5+Math.sin(t+i)*8,fY+18);ctx.lineTo((i+.5)*w/5-3,fY+32);ctx.stroke();
    }
  },
  // ヴァルキリー — オーロラの北欧天空
  valkyrie(ctx,w,h,fY,t){
    const g=ctx.createLinearGradient(0,0,0,fY);
    g.addColorStop(0,'#02030e');g.addColorStop(.4,'#030818');g.addColorStop(.8,'#050f2a');g.addColorStop(1,'#081838');
    ctx.fillStyle=g;ctx.fillRect(0,0,w,fY);
    // 星
    for(let i=0;i<65;i++){
      const sx=(i*71+19)%w,sy=(i*43+11)%(fY*.5);
      ctx.fillStyle=`rgba(255,255,255,${.2+Math.sin(t+i)*.45})`;ctx.fillRect(sx,sy,1,1);
    }
    // オーロラカーテン
    for(let band=0;band<3;band++){
      for(let i=0;i<w;i+=4){
        const ay=Math.sin(i/75+t*.7+band*2.1)*fY*.14+fY*(.1+band*.08);
        const ah=fY*.18+Math.sin(i/48+t+band)*.06*fY;
        const hue=band===0?155:band===1?195:270;
        ctx.fillStyle=`hsla(${hue},75%,55%,${.025+Math.sin(i/55+t*.6+band)*.018})`;
        ctx.fillRect(i,ay,4,ah);
      }
    }
    // 北欧の石柱
    [w*.1,w*.3,w*.7,w*.9].forEach((px,pi)=>{
      const pw=20,ph=fY*.52,py=fY-ph;
      ctx.fillStyle='rgba(35,45,65,.85)';ctx.fillRect(px-pw/2,py,pw,ph);
      ctx.fillStyle='rgba(45,58,82,.9)';ctx.fillRect(px-pw/2-4,py,pw+8,10);ctx.fillRect(px-pw/2-4,fY-7,pw+8,7);
      // ルーン文字
      ctx.strokeStyle=`rgba(90,190,255,${.28+Math.sin(t*1.6+pi)*.18})`;ctx.lineWidth=1.5;
      ctx.beginPath();ctx.moveTo(px,py+16);ctx.lineTo(px,py+55);
      ctx.moveTo(px-5,py+26);ctx.lineTo(px+5,py+44);ctx.stroke();
    });
    // 雲
    for(let i=0;i<5;i++){
      const cx2=((i*w/5+t*6)%(w+180))-90,cy2=fY*(.58+i*.055);
      ctx.fillStyle=`rgba(90,110,170,${.1+i*.018})`;
      ctx.beginPath();ctx.ellipse(cx2,cy2,75,18,0,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(cx2+28,cy2-9,48,16,0,0,Math.PI*2);ctx.fill();
    }
    // 氷の床
    ctx.fillStyle='#080f1e';ctx.fillRect(0,fY,w,h-fY);
    const iceG=ctx.createLinearGradient(0,fY,0,fY+18);
    iceG.addColorStop(0,'rgba(90,145,255,.14)');iceG.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=iceG;ctx.fillRect(0,fY,w,18);
  },
};