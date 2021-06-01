function mkParser(t){return{startState:startStateFn,copyState:copyStateFn,token:produceTokenFunction(t),languageData:{commentTokens:{line:"#",block:{open:"/*",close:"*/"}}}}}const mscgen=mkParser({keywords:["msc"],options:["hscale","width","arcgradient","wordwraparcs"],constants:["true","false","on","off"],attributes:["label","idurl","id","url","linecolor","linecolour","textcolor","textcolour","textbgcolor","textbgcolour","arclinecolor","arclinecolour","arctextcolor","arctextcolour","arctextbgcolor","arctextbgcolour","arcskip"],brackets:["\\{","\\}"],arcsWords:["note","abox","rbox","box"],arcsOthers:["\\|\\|\\|","\\.\\.\\.","---","--","<->","==","<<=>>","<=>","\\.\\.","<<>>","::","<:>","->","=>>","=>",">>",":>","<-","<<=","<=","<<","<:","x-","-x"],singlecomment:["//","#"],operators:["="]}),msgenny=mkParser({keywords:null,options:["hscale","width","arcgradient","wordwraparcs","wordwrapentities","watermark"],constants:["true","false","on","off","auto"],attributes:null,brackets:["\\{","\\}"],arcsWords:["note","abox","rbox","box","alt","else","opt","break","par","seq","strict","neg","critical","ignore","consider","assert","loop","ref","exc"],arcsOthers:["\\|\\|\\|","\\.\\.\\.","---","--","<->","==","<<=>>","<=>","\\.\\.","<<>>","::","<:>","->","=>>","=>",">>",":>","<-","<<=","<=","<<","<:","x-","-x"],singlecomment:["//","#"],operators:["="]}),xu=mkParser({keywords:["msc","xu"],options:["hscale","width","arcgradient","wordwraparcs","wordwrapentities","watermark"],constants:["true","false","on","off","auto"],attributes:["label","idurl","id","url","linecolor","linecolour","textcolor","textcolour","textbgcolor","textbgcolour","arclinecolor","arclinecolour","arctextcolor","arctextcolour","arctextbgcolor","arctextbgcolour","arcskip","title","deactivate","activate","activation"],brackets:["\\{","\\}"],arcsWords:["note","abox","rbox","box","alt","else","opt","break","par","seq","strict","neg","critical","ignore","consider","assert","loop","ref","exc"],arcsOthers:["\\|\\|\\|","\\.\\.\\.","---","--","<->","==","<<=>>","<=>","\\.\\.","<<>>","::","<:>","->","=>>","=>",">>",":>","<-","<<=","<=","<<","<:","x-","-x"],singlecomment:["//","#"],operators:["="]});function wordRegexpBoundary(t){return new RegExp("^\\b("+t.join("|")+")\\b","i")}function wordRegexp(t){return new RegExp("^(?:"+t.join("|")+")","i")}function startStateFn(){return{inComment:!1,inString:!1,inAttributeList:!1,inScript:!1}}function copyStateFn(t){return{inComment:t.inComment,inString:t.inString,inAttributeList:t.inAttributeList,inScript:t.inScript}}function produceTokenFunction(e){return function(t,r){if(t.match(wordRegexp(e.brackets),!0,!0))return"bracket";if(!r.inComment){if(t.match(/\/\*[^\*\/]*/,!0,!0))return r.inComment=!0,"comment";if(t.match(wordRegexp(e.singlecomment),!0,!0))return t.skipToEnd(),"comment"}if(r.inComment)return t.match(/[^\*\/]*\*\//,!0,!0)?r.inComment=!1:t.skipToEnd(),"comment";if(!r.inString&&t.match(/\"(\\\"|[^\"])*/,!0,!0))return r.inString=!0,"string";if(r.inString)return t.match(/[^\"]*\"/,!0,!0)?r.inString=!1:t.skipToEnd(),"string";if(e.keywords&&t.match(wordRegexpBoundary(e.keywords),!0,!0))return"keyword";if(t.match(wordRegexpBoundary(e.options),!0,!0))return"keyword";if(t.match(wordRegexpBoundary(e.arcsWords),!0,!0))return"keyword";if(t.match(wordRegexp(e.arcsOthers),!0,!0))return"keyword";if(e.operators&&t.match(wordRegexp(e.operators),!0,!0))return"operator";if(e.constants&&t.match(wordRegexp(e.constants),!0,!0))return"variable";if(!e.inAttributeList&&e.attributes&&t.match("[",!0,!0))return e.inAttributeList=!0,"bracket";if(e.inAttributeList){if(null!==e.attributes&&t.match(wordRegexpBoundary(e.attributes),!0,!0))return"attribute";if(t.match("]",!0,!0))return e.inAttributeList=!1,"bracket"}return t.next(),null}}export{mscgen,msgenny,xu};