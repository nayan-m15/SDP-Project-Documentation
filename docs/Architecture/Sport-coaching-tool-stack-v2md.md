# Sport coaching tool stack v2.md

S port   C o achi n g T oo l   —   st ack   &   i nt eg r a t i on   p la n   ( v2 )

U p da t ed   v e rs i on   o f   t he   or igi n al   r ec omm e n da t i on :   backe n d   sw a pp ed   to   Ne st JS   ( be tt e r   fi t   f or

a   6 - p e rson   t ea m ),   t e st i n g   sw a pp ed   to   Je st   30 .   Each la y e r   bel ow   ha s   w ha t   to   us e ,   w h y   w e

n eed i t   p e r   t he b r ief ,   a n d h ow   i t   ac tu all y   c onn ec ts   to   t he   r e st   o f   t he   syst e m .


---


## Q u ick   r efe r e n ce


## La y e r   T oo l   Talk s   to

F ront e n d   Reac t   +   Vi t e   +   T yp eSc r i pt ,


## Tail w i n d   +   s hadc n / u i


## Backe n d API   ( REST ,   ov e r   HTTPS ),


## S o cke t . i o   ( WebS o cke t )

Backe n d   &   API   Ne st JS   +   T yp eSc r i pt   +   nestjs-


## zod

P ost g r e s   ( v ia D r i zz le ),   A ut h ,   S o cke t . i o ,


## e xt e rn al API s

API d o c s   @nestjs/swagger   Read s   Ne st JS DTO s   di r ec t l y

A ut h   be tt e r - a ut h   Backe n d   ( a s   a Ne st JS   mo d u le ),

P ost g r e s   ( s e ss i ons / us e rs   t able )

Da t aba s e   P ost g r eSQL   on   Ne on   Backe n d   on l y ,   v ia D r i zz le


## ORM   D r i zz le   Backe n d   ↔   Ne on

O ffl i n e clie nt   stor e   SQLi t e   v ia P ow e r S yn c   F ront e n d de v ice   ↔   Ne on   ( backg roun d


## syn c )

Real - t i m e   S o cke t . i o   F ront e n d   ↔   Backe n d ,   s a m e N o de


## pro ce ss   a s   Ne st JS

Wea t he r   O p e n Wea t he r Ma p   Backe n d call s   i t   s e rv e r - s ide ,   cache s


## r e su l t

Ma ps / ge o c o di n g   Ma p b ox   F ront e n d   ( r e n de r i n g )   +   Backe n d


## ( ge o c o di n g   on   s a v e )


## Te st i n g   —


## un i t / i nt eg r a t i on

Je st   30   +   S up e rt e st   R uns   agai nst   backe n d   mo d u le s   a n d


## li v e - b ut - l o cal API

Te st i n g   —   E 2 E   Pla ywr igh t   D r i v e s   f ront e n d i n   a   r eal b rows e r ,   hi ts


## r eal   ( t e st )   API

CI / CD   Gi t H u b Ac t i ons   R uns   Je st   +   Pla ywr igh t   +   li nt   on   e v e ry


## PR ,   de p l oys   on   m e r ge

D o c s   s i t e   D o c us a urus   →   Gi t H u b Page s   Se p a r a t e   st a t ic   s i t e ,   not   c onn ec t ed   to


## t he a pp

F ront e n d h ost i n g   Ve r cel   De p l oys   f rom   Gi t H u b ,   call s   backe n d ' s


## pu blic URL

Backe n d h ost i n g   Rail w a y   C onn ec ts   to   Ne on   ov e r   a c onn ec t i on


## str i n g


---

F ront e n d   —   Reac t   +   Vi t e   +   T yp eSc r i pt ,   Tail w i n d   +   s hadc n / u i

Wh y :   t he b r ief   r e qu i r e s   a   non - mono li t hic f ront - e n d a n d back - e n d ,   a n d   sp eci fi call y   w a rns   off

f r a m e wor k s   t ha t   f us e   t he   two   ( Ne xt . j s ,   S v el t eKi t   s e rv e r   rout e s )   —   you   ca n   on l y   us e   t h os e f or

on e   s ide .   Reac t   +   Vi t e i s   clie nt - on l y   b y   c onstru c t i on ,   so   t he r e ' s   no   r i s k   o f accide nt all y

b u ildi n g API   rout e s   i ns ide i t .   Tail w i n d   +   s hadc n / u i ge ts   us   most   o f   t he   w a y   to   " mo de rn

r e spons i v e n e ss   a n d acce ss ibili ty "   f or   f r ee ,   s i n ce   s hadc n ' s   c ompon e nts   a r e b u il t   on

acce ss ible   pr i m i t i v e s   ( ke y b o a r d   n a v ,   ARIA )   r a t he r   t ha n   us   b u ildi n g   t ha t   f rom   s c r a t ch .

I nt eg r a t i on :   t alk s   to   t he backe n d   two   w a ys   —   norm al REST call s   ( v ia   fetch   / Ta n S t ack

Q u e ry )   f or   a nyt hi n g   t ha t   i sn ' t   li v e ,   like edi t i n g a   rost e r   or   pu lli n g   s ea son   st a ts ,   a n d a

S o cke t . i o   c onn ec t i on   f or   t he li v e e v e nt   da s hb o a r d .   I t   n e v e r   t alk s   to   P ost g r e s ,   Ne on ,   or

P ow e r S yn c di r ec t l y   —   e v e ryt hi n g   s e rv e r - s ide i s   r eached   t h rou gh   t he Ne st JS API   on l y .

Backe n d   &   API   —   Ne st JS   +   T yp eSc r i pt   +   nestjs-zod

Wh y :   s a t i s fi e s   Ha n d - W r i tt e n   API   di r ec t l y   —   e v e ry   rout e i s   ours ,   not hi n g a uto - ge n e r a t ed .

Wi t h   6   p e op le ,   Ne st JS ' s   e n f or ced   mo d u le   →   c ontro lle r   →   s e rv ice   stru c tur e   m a tt e rs   mor e

t ha n   r a w   sp eed :   i t   gi v e s   e v e ryon e   t he   s a m e   s ha p e   to   b u ild i n ,   w hich c uts   d own   on   PR - r e v ie w

f r ic t i on   ov e r   " w h y   did   you   stru c tur e   t hi s   di ff e r e nt l y ."   nestjs-zod   le ts   us   kee p   a   s i n gle Z o d

s che m a   p e r   r e sour ce   t ha t   b ot h   v alida t e s   i n c om i n g   r e qu e sts   a n d ge n e r a t e s   t he T yp eSc r i pt

typ e ,   so   t he   s ha p e   o f e . g .   a n   e v e nt - l o g e ntry   i s   de fi n ed e x ac t l y   on ce .

I nt eg r a t i on :   s i ts   i n   t he   m iddle   o f e v e ryt hi n g .   I t ' s   t he   on l y   t hi n g   t ha t   t alk s   to   P ost g r e s   ( v ia

D r i zz le ),   t he   on l y   t hi n g   t ha t   call s   O p e n Wea t he r Ma p / Ma p b ox ,   a n d i t   h osts   t he S o cke t . i o

s e rv e r   f or   r eal - t i m e .   S u gge st ed   mo d u le   sp li t   f or   a   t ea m   o f   6   ( two   p e op le   p e r   mo d u le ,   v e rt ical

s lice   —   API   +   r ele v a nt   UI   to ge t he r ):


## auth   —   s ig nup / s ig n i n / ro le s

roster   —   a t hle t e a n d   t ea m   m a n age m e nt

events   —   t he li v e l o ggi n g c or e   ( t hi s   i s   t he   on e   w i t h   r eal - t i m e   +   offl i n e   syn c a tt ached )

stats   —   s ea son   tot al s ,   c omp a r i sons ,   de r i v ed f rom   t he e v e nt   l o g


## API d o c s   —   @nestjs/swagger

Wh y :   c ov e rs   t he Mile ston e   2   ru b r ic li n e   " API a v ailable e xt e rn all y   w i t h d o c um e nt a t i on "   ( 15 %

o f   t ha t   m ile ston e ).

I nt eg r a t i on :   r ead s   dec or a tors   str aigh t   off   our   Ne st JS c ontro lle rs / DTO s   a n d   s e rv e s   a n

i nt e r ac t i v e S w agge r   UI a t   a   rout e   on   t he backe n d i ts elf   —   no   s e p a r a t e   s e rv ice ,   no   m a nu al

d o c - wr i t i n g   to   kee p   i n   syn c .


## A ut h   —   be tt e r - a ut h

Wh y :   t he b r ief e xp lici t l y   f or bid s   wr i t i n g   your   own   a ut h   syst e m   —   must   us e a n   e st abli s hed

lib r a ry .   be tt e r - a ut h i s   s elf - h ost ed   ( no   e xt e rn al   v e n d or   de p e n de n c y   f or   som e t hi n g   t hi s   c or e )

a n d c ov e rs   s ig nup ,   s ig n i n ,   p a sswor d   r e s e t ,   a n d acc ount   dele t i on   out   o f   t he b ox ,   w hich a r e all

e xp lici t l y   r e qu i r ed .


---

I nt eg r a t i on :   runs   a s   a   mo d u le i ns ide   t he Ne st JS a pp ,   backed b y   i ts   own   t able s   i n   t he   s a m e

P ost g r e s   da t aba s e   ( v ia D r i zz le ).   I ssu e s   a   s e ss i on   c oo kie / to ke n   t he f ront e n d a tt ache s   to

e v e ry   r e qu e st ;   Ne st JS g u a r d s   check i t   on   prot ec t ed   rout e s .   R o le s   ( c o ach   vs   a ss i st a nt )   li v e i n

t he   s a m e   us e rs   t able a n d ge t   checked i n   t he   s a m e g u a r d s .


## Da t aba s e   —   P ost g r eSQL   on   Ne on

Wh y :   mu l t i p le c o ache s   a n d a ss i st a nts   n eed c on c urr e nt   wr i t e s ,   ro le s / p e rm i ss i ons   checked

ce ntr all y ,   a n d   r ela t i on al j o i ns   f or   s ea son   st a ts   a n d a t hle t e c omp a r i sons   —   a clie nt - s e rv e r

da t aba s e ,   not   a n   e m bedded   on e ,   i s   r e qu i r ed f or   t hi s   p a rt .

I nt eg r a t i on :   on l y   t he backe n d e v e r   c onn ec ts   to   i t ,   ov e r   a c onn ec t i on   str i n g ,   v ia D r i zz le .   N ot e

Ne on   on l y   h osts   t he da t aba s e   —   i t   d o e sn ' t   run   our   backe n d   or   f ront e n d c o de ,   t h os e   st ill

n eed Rail w a y / Ve r cel .   I t   al so   d o e sn ' t   hel p   w i t h   offl i n e   —   Ne on   i s   a cl ou d   s e rv ice   r eachable

on l y   w he n   a de v ice ha s   s ig n al ,   w hich i s   e x ac t l y   w h y   t he   offl i n e   p iece bel ow   e x i sts

s e p a r a t el y .


## ORM   —   D r i zz le

Wh y :   gi v e s   c omp ile - t i m e   s afe ty   on   da t aba s e   qu e r ie s   ( typo   a c o l umn   n a m e ,   ge t   a b u ild e rror

i nst ead   o f a   runt i m e c r a s h )   a n d   on e   s che m a de fi n i t i on   t ha t   b ot h de fi n e s   t he   t able   s ha p e a n d

ge n e r a t e s   m ig r a t i ons   v ia   drizzle-kit   .

I nt eg r a t i on :   li v e s   e nt i r el y   i ns ide   t he backe n d .   E v e ry   Ne st JS   s e rv ice   t ha t   n eed s   da t a g o e s

t h rou gh D r i zz le   r a t he r   t ha n   wr i t i n g   r a w   SQL   str i n g s ;   drizzle-kit   di ffs   our   s che m a agai nst

Ne on   a n d ge n e r a t e s   t he   m ig r a t i on   to   run   i n   CI .

O ffl i n e clie nt   stor e   —   SQLi t e   v ia P ow e r S yn c

Wh y :   t hi s   i s   t he I nt e rm edia t e / Ad v a n ced - t ie r   r e qu i r e m e nt   t ha t   l o ggi n g   must   wor k   w i t h   no

s ig n al ,   a n d a t   Ad v a n ced   t ie r ,   t ha t   s e v e r al a ss i st a nts   ca n   l o g   t he   s a m e e v e nt   offl i n e a n d ha v e

i t   m e r ge   w i t h out   c on fl ic t   —   t he ha r de st   s i n gle   r e qu i r e m e nt   i n   t he b r ief .

I nt eg r a t i on :   P ow e r S yn c   runs   a n   e m bedded SQLi t e da t aba s e   on   each de v ice   ( i ns ide   t he

f ront e n d a pp )   a n d ha n dle s   bidi r ec t i on al   syn c   w i t h   our   Ne on   P ost g r e s   i n   t he backg roun d

on ce c onn ec t i v i ty   r e turns ,   i n cl u di n g c on fl ic t   r e so l ut i on   —   w e d on ' t   ha n d - ro ll   m e r ge l o gic .

O n l y   t he   events   mo d u le   n eed s   t hi s ;   rost e r   edi ts   a n d   st a ts   ca n   a ssum e c onn ec t i v i ty .


## Real - t i m e   —   S o cke t . i o

Wh y :   t he li v e e v e nt   da s hb o a r d   n eed s   up da t e s   to   a pp ea r   t he i nst a nt   a n   a ss i st a nt   l o g s

som e t hi n g ,   f or   a nyon e el s e c urr e nt l y   w a t chi n g   —   p lai n   HTTP   po lli n g   wou ld   m ea n   v i s ible

lag a n d   w a st ed   r e qu e sts .

I nt eg r a t i on :   runs   on   t he   s a m e N o de   pro ce ss   a s   t he Ne st JS backe n d ,   a tt ached a t   st a rtup .

F ront e n d   op e ns   a   so cke t   c onn ec t i on   p e r   e v e nt   (" room "),   so   a n   up da t e b ro adca sts   on l y   to

p e op le   w a t chi n g   t ha t   sp eci fi c e v e nt .   Di st i n c t   f rom   t he   offl i n e   p a t h ab ov e   —   t hi s   i s   f or   on li n e

us e rs   w a t chi n g i n   r eal   t i m e ,   P ow e r S yn c i s   f or   offl i n e ca ptur e .


---

E xt e rn al i nt eg r a t i ons   —   O p e n Wea t he r Ma p   +   Ma p b ox

Wh y :   c ov e rs   t he   I nt eg r a t i on   ke y   r e qu i r e m e nt   di r ec t l y   ( t he b r ief ' s   own   e x a mp le i s   a   w ea t he r

check f or   a n   e v e nt ' s   l o ca t i on ).

I nt eg r a t i on :   b ot h a r e called   s e rv e r - s ide f rom   t he backe n d ,   not   t he f ront e n d   —   kee ps   API

ke ys   off   t he clie nt   a n d le ts   us   cache   r e spons e s   ( no   n eed   to   r e - fe t ch   w ea t he r   e v e ry   t i m e

som e on e   v ie ws   t he   s a m e e v e nt ).   Ma p b ox   i s   us ed   tw ice :   ge o c o di n g a   v e nu e add r e ss   to

c oor di n a t e s   w he n   a n   e v e nt   i s   c r ea t ed ,   a n d   r e n de r i n g a   sm all   m a p   on   t he f ront e n d   us i n g

t h os e c oor di n a t e s .

Te st i n g   —   Je st   30   ( un i t / i nt eg r a t i on )   +   S up e rt e st ,   Pla ywr igh t   ( E 2 E )

Wh y :   feed s   t he S pr i nt   2   ru b r ic li n e   " UI a n d API   t e st i n g i mp le m e nt ed "   ( 10 %)   a n d   t he

t e st i n g - d o c um e nt a t i on   li n e s   i n   S pr i nt   3 / 4 .   Je st   30   i s   Ne st JS ' s   defa u l t / most - i nt eg r a t ed   t e st

runn e r   ( Ne st ' s   own   t e st i n g   ut ili t ie s   a n d   @nestjs/testing   a r e b u il t   a ssum i n g Je st ),   so   i t ' s   t he

p a t h   o f lea st   f r ic t i on   f or   mo cki n g   s e rv ice s   a n d   t e st i n g   mo d u le s   i n   i so la t i on   —   wort h   not i n g

Vi t e st   i s   ge n e r all y   fa st e r   a n d   mor e ESM - n a t i v e f or   g r ee n fi eld Vi t e   pro jec ts ,   b ut   s i n ce   our

backe n d i s   Ne st JS   r a t he r   t ha n   Vi t e ,   Je st ' s   t igh t e r   Ne st   i nt eg r a t i on   w i ns   he r e .

I nt eg r a t i on :   Je st   +   S up e rt e st   t e st   t he backe n d di r ec t l y   —   sp i nn i n g   up   t he Ne st JS a pp   i n -

m e mory   a n d hi tt i n g i ts   rout e s   w i t h out   a   r eal   n e twor k h op ,   checki n g   t hi n g s   like   " d o e s

l o ggi n g a g o al ac tu all y   up da t e   t he a t hle t e ' s   st a ts ."   Pla ywr igh t   runs   s e p a r a t el y ,   d r i v i n g a n

ac tu al b rows e r   agai nst   a   r eal   ( t e st )   de p l oym e nt   o f b ot h f ront e n d a n d backe n d   to ge t he r   —

t hi s   i s   t he   on l y   la y e r   t ha t   ca n   ca t ch   t hi n g s   like   " d o e s   a g o al l o gged i n   on e b rows e r   t ab

ac tu all y   a pp ea r   i n   a not he r   t ab   v ia   t he S o cke t . i o   c onn ec t i on ."


## CI / CD   —   Gi t H u b Ac t i ons

Wh y :   c ov e rs   t he CI / CD ke y   r e qu i r e m e nt   di r ec t l y .

I nt eg r a t i on :   on   e v e ry   PR ,   runs   li nt   +   Je st   +   Pla ywr igh t   agai nst   a Ne on   b r a n ch c r ea t ed j ust

f or   t ha t   PR   ( chea p   t ha n k s   to   c opy - on - wr i t e b r a n chi n g ),   t he n   t ea rs   i t   d own .   O n   m e r ge   to

m ai n ,   de p l oys   backe n d   to   Rail w a y   a n d f ront e n d   to   Ve r cel .

D o c s   s i t e   —   D o c us a urus   →   Gi t H u b Page s

Wh y :   s a t i s fi e s   t he D o c um e nt a t i on   Si t e   r e qu i r e m e nt   a n d   " a vo id   p la t f orms   t ha t   r e qu i r e a n


## acc ount ."

I nt eg r a t i on :   i nt e nt i on all y   not   c onn ec t ed   to   t he   runn i n g a pp   a t   all   —   i t ' s   a   s e p a r a t e   st a t ic

s i t e ,   wr i tt e n   i n   m a r kd own ,   de p l oy ed i n de p e n de nt l y   v ia i ts   own   Gi t H u b Ac t i ons   j o b .

H ost i n g   —   Ve r cel   ( f ront e n d ),   Rail w a y   ( backe n d )

Wh y :   n ei t he r   Ne on   nor   a ny   da t aba s e h ost   runs   a pp lica t i on   c o de ,   so   w e   n eed   som e w he r e

t ha t   ac tu all y   e x ec ut e s   t he Ne st JS   pro ce ss   a n d   s e rv e s   t he b u il t   f ront e n d .

I nt eg r a t i on :   Ve r cel b u ild s   a n d   s e rv e s   t he Vi t e   output ,   a n d i s   c on fi g ur ed   w i t h   t he backe n d ' s

pu blic URL a s   a n   e nv i ronm e nt   v a r iable   so   i ts   fetch   call s   k now   w he r e   to   g o .   Rail w a y   runs


---

t he Ne st JS   pro ce ss   a n d h o ld s   t he Ne on   c onn ec t i on   str i n g a s   a   s ec r e t   e nv   v a r   —   i t ' s   t he   on l y

p iece   o f i n f r a stru c tur e   w i t h di r ec t   n e twor k acce ss   to   t he da t aba s e .


## AI   too li n g   not e

Wha t e v e r   c om bi n a t i on   o f Cla u de C o de ,   A nt ig r a v i ty ,   or   s kill   p ack s   ( e . g .   t he Ma tt   P o c o ck

TDD /   grill-with-docs   s kill s )   ge ts   us ed b u ildi n g a ny   o f   t hi s ,   r e m e m be r   t he c ours e AI   po lic y

r e qu i r e s   a ttr ib ut i on :   Assisted-by: <tool>[<model>]   i n   c omm i t   m e ss age s ,   p l us   a   runn i n g

decla r a t i on   i n   t he README f or   c o de ge n e r a t i on ,   i n - li n e edi t i n g ,   a n d c o de   r e v ie w   too l s   —

i n cl u di n g   " w e d on ' t   us e X "   f or   a nyt hi n g delibe r a t el y   s ki pp ed .