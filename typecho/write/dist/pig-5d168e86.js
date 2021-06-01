function words(O){for(var T={},e=O.split(" "),E=0;E<e.length;++E)T[e[E]]=!0;return T}var pBuiltins="ABS ACOS ARITY ASIN ATAN AVG BAGSIZE BINSTORAGE BLOOM BUILDBLOOM CBRT CEIL CONCAT COR COS COSH COUNT COUNT_STAR COV CONSTANTSIZE CUBEDIMENSIONS DIFF DISTINCT DOUBLEABS DOUBLEAVG DOUBLEBASE DOUBLEMAX DOUBLEMIN DOUBLEROUND DOUBLESUM EXP FLOOR FLOATABS FLOATAVG FLOATMAX FLOATMIN FLOATROUND FLOATSUM GENERICINVOKER INDEXOF INTABS INTAVG INTMAX INTMIN INTSUM INVOKEFORDOUBLE INVOKEFORFLOAT INVOKEFORINT INVOKEFORLONG INVOKEFORSTRING INVOKER ISEMPTY JSONLOADER JSONMETADATA JSONSTORAGE LAST_INDEX_OF LCFIRST LOG LOG10 LOWER LONGABS LONGAVG LONGMAX LONGMIN LONGSUM MAX MIN MAPSIZE MONITOREDUDF NONDETERMINISTIC OUTPUTSCHEMA  PIGSTORAGE PIGSTREAMING RANDOM REGEX_EXTRACT REGEX_EXTRACT_ALL REPLACE ROUND SIN SINH SIZE SQRT STRSPLIT SUBSTRING SUM STRINGCONCAT STRINGMAX STRINGMIN STRINGSIZE TAN TANH TOBAG TOKENIZE TOMAP TOP TOTUPLE TRIM TEXTLOADER TUPLESIZE UCFIRST UPPER UTF8STORAGECONVERTER ",pKeywords="VOID IMPORT RETURNS DEFINE LOAD FILTER FOREACH ORDER CUBE DISTINCT COGROUP JOIN CROSS UNION SPLIT INTO IF OTHERWISE ALL AS BY USING INNER OUTER ONSCHEMA PARALLEL PARTITION GROUP AND OR NOT GENERATE FLATTEN ASC DESC IS STREAM THROUGH STORE MAPREDUCE SHIP CACHE INPUT OUTPUT STDERROR STDIN STDOUT LIMIT SAMPLE LEFT RIGHT FULL EQ GT LT GTE LTE NEQ MATCHES TRUE FALSE DUMP",pTypes="BOOLEAN INT LONG FLOAT DOUBLE CHARARRAY BYTEARRAY BAG TUPLE MAP ",builtins=words(pBuiltins),keywords=words(pKeywords),types=words(pTypes),isOperatorChar=/[*+\-%<>=&?:\/!|]/;function chain(O,T,e){return(T.tokenize=e)(O,T)}function tokenComment(O,T){for(var e,E=!1;e=O.next();){if("/"==e&&E){T.tokenize=tokenBase;break}E="*"==e}return"comment"}function tokenString(r){return function(O,T){for(var e,E=!1,t=!1;null!=(e=O.next());){if(e==r&&!E){t=!0;break}E=!E&&"\\"==e}return!t&&E||(T.tokenize=tokenBase),"error"}}function tokenBase(O,T){var e=O.next();return'"'==e||"'"==e?chain(O,T,tokenString(e)):/[\[\]{}\(\),;\.]/.test(e)?null:/\d/.test(e)?(O.eatWhile(/[\w\.]/),"number"):"/"==e?O.eat("*")?chain(O,T,tokenComment):(O.eatWhile(isOperatorChar),"operator"):"-"==e?O.eat("-")?(O.skipToEnd(),"comment"):(O.eatWhile(isOperatorChar),"operator"):isOperatorChar.test(e)?(O.eatWhile(isOperatorChar),"operator"):(O.eatWhile(/[\w\$_]/),keywords&&keywords.propertyIsEnumerable(O.current().toUpperCase())&&!O.eat(")")&&!O.eat(".")?"keyword":builtins&&builtins.propertyIsEnumerable(O.current().toUpperCase())?"builtin":types&&types.propertyIsEnumerable(O.current().toUpperCase())?"type":"variable")}const pig={startState:function(){return{tokenize:tokenBase,startOfLine:!0}},token:function(O,T){return O.eatSpace()?null:T.tokenize(O,T)},languageData:{autocomplete:(pBuiltins+pTypes+pKeywords).split(" ")}};export{pig};