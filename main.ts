import{mkdirSync as M,readdirSync as R,readFileSync as F,writeFileSync as W}from"node:fs";
import{join as J}from"node:path";
let I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
function V(p,q){
let S=new Int32Array(256),C=new Int32Array(64),m=new Int32Array(256),o=[],x=0,y=0,z=0,w=0,n=0;
for(;;){
if(n>=1e6)return[o,10];
if(z<0||z>=p.length)return[o,9];
let A=p[z];
if(A<8){
if(A==0)return[o,0];
if(A==1){if(z+2>p.length)return[o,9];if(x>=256)return[o,3];S[x++]=p[z+1]<<24>>24;z+=2}
else if(A==2){if(z+5>p.length)return[o,9];if(x>=256)return[o,3];S[x++]=p[z+1]|p[z+2]<<8|p[z+3]<<16|p[z+4]<<24;z+=5}
else if(A==3){if(x<1)return[o,2];x--;z++}
else if(A==4){if(x<1)return[o,2];if(x>=256)return[o,3];S[x]=S[x-1];x++;z++}
else if(A==5){if(x<2)return[o,2];let t=S[x-1];S[x-1]=S[x-2];S[x-2]=t;z++}
else if(A==6){if(x<2)return[o,2];if(x>=256)return[o,3];S[x]=S[x-2];x++;z++}
else{if(x<3)return[o,2];let t=S[x-3];S[x-3]=S[x-2];S[x-2]=S[x-1];S[x-1]=t;z++}
}else if(A>=16&&A<=34&&A!=31){
if(A==23||A==27){if(x<1)return[o,2];S[x-1]=A==23?-S[x-1]|0:~S[x-1];z++}
else{
if(x<2)return[o,2];
let b=S[--x],a=S[x-1];
if(A>=19&&A<=22&&b==0)return[o,4];
S[x-1]=A==16?a+b|0:A==17?a-b|0:A==18?Math.imul(a,b):A==19?a/b|0:A==20?a%b|0:A==21?(a>>>0)/(b>>>0)|0:A==22?(a>>>0)%(b>>>0)|0:A==24?a&b:A==25?a|b:A==26?a^b:A==28?a<<b:A==29?a>>b:A==30?a>>>b|0:A==32?a==b?1:0:A==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;z++}
}else if(A>=48&&A<=52){
if(A!=52&&z+3>p.length)return[o,9];
let k=(p[z+1]|p[z+2]<<8)<<16>>16;
if(A==48)z+=3+k;
else if(A==51){if(y>=64)return[o,7];C[y++]=z+3;z=p[z+1]|p[z+2]<<8}
else if(A==52){if(y<1)return[o,8];z=C[--y]}
else{if(x<1)return[o,2];let v=S[--x];z=(A==49?v==0:v!=0)?z+3+k:z+3}
}else if(A==64||A==65){
if(A==64){if(x<1)return[o,2];let a=S[x-1];if(a<0||a>255)return[o,6];S[x-1]=m[a];z++}
else{if(x<2)return[o,2];let a=S[--x],v=S[--x];if(a<0||a>255)return[o,6];m[a]=v;z++}
}else if(A>=80&&A<=83){
if(A==80){if(x<1)return[o,2];let s=""+S[--x];if(o.length+s.length>65536)return[o,11];o.push(...Buffer.from(s));z++}
else if(A==81){if(x<1)return[o,2];if(o.length>65535)return[o,11];o.push(S[--x]&255);z++}
else if(A==82){if(x>=256)return[o,3];S[x++]=w<q.length?q[w++]:-1;z++}
else{if(x<1)return[o,2];return[o,S[--x]&255]}
}else return[o,5];
n++;
}
}
for(let d of R(I).sort()){
let r=V(F(J(I,d,"program.bin")),F(J(I,d,"input.bin")));
M(J(O,d),{recursive:true});
W(J(O,d,"stdout.bin"),Buffer.from(r[0]));
W(J(O,d,"exit.txt"),r[1]+"\n");
}
