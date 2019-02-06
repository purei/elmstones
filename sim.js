(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList === 'function' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2(elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var author$project$Simulator$Idle = {$: 'Idle'};
var author$project$Simulator$Model = F5(
	function (state, log, seed, runsRemaining, runs) {
		return {log: log, runs: runs, runsRemaining: runsRemaining, seed: seed, state: state};
	});
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$Basics$False = {$: 'False'};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Simulator$init = function (_n0) {
	return _Utils_Tuple2(
		A5(author$project$Simulator$Model, author$project$Simulator$Idle, _List_Nil, elm$core$Maybe$Nothing, 0, 0),
		elm$core$Platform$Cmd$none);
};
var author$project$Simulator$SimulationRequest = function (a) {
	return {$: 'SimulationRequest', a: a};
};
var elm$json$Json$Decode$value = _Json_decodeValue;
var author$project$Simulator$initSim = _Platform_incomingPort('initSim', elm$json$Json$Decode$value);
var elm$core$Platform$Sub$batch = _Platform_batch;
var author$project$Simulator$subscriptions = function (_n0) {
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				author$project$Simulator$initSim(author$project$Simulator$SimulationRequest)
			]));
};
var author$project$Battle$Context = F5(
	function (offense, defense, turn, seed, log) {
		return {defense: defense, log: log, offense: offense, seed: seed, turn: turn};
	});
var author$project$Battle$StartTurn = {$: 'StartTurn'};
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var author$project$Battle$goto = function (x) {
	return A2(
		elm$core$Task$perform,
		elm$core$Basics$identity,
		elm$core$Task$succeed(x));
};
var author$project$Hero$Context = function (damage_taken) {
	return {damage_taken: damage_taken};
};
var author$project$Hero$Hero = F2(
	function (config, context) {
		return {config: config, context: context};
	});
var author$project$Hero$init = function (base) {
	return A2(
		author$project$Hero$Hero,
		base,
		author$project$Hero$Context(0));
};
var author$project$Battle$Army$init = function (hero_data) {
	return {
		hero: author$project$Hero$init(hero_data),
		units: elm$core$Array$empty
	};
};
var author$project$Deck$Partial$cards = function (config) {
	return _Utils_ap(config.leading, config.remaining);
};
var author$project$Deck$Shuffle$cards = function (config) {
	return config.cards;
};
var author$project$Deck$Stacked$cards = function (config) {
	return config.cards;
};
var author$project$Deck$cards = function (config) {
	switch (config.$) {
		case 'Stacked':
			var config_ = config.a;
			return author$project$Deck$Stacked$cards(config_);
		case 'Shuffle':
			var config_ = config.a;
			return author$project$Deck$Shuffle$cards(config_);
		default:
			var config_ = config.a;
			return author$project$Deck$Partial$cards(config_);
	}
};
var NoRedInk$elm_random_general$Random$General$step = F2(
	function (_n0, seed) {
		var gen = _n0.a;
		return gen(seed);
	});
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$step = NoRedInk$elm_random_general$Random$General$step;
var NoRedInk$elm_random_general$Random$General$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var NoRedInk$elm_random_general$Random$General$constant = function (value) {
	return NoRedInk$elm_random_general$Random$General$Generator(
		function (seed) {
			return _Utils_Tuple2(value, seed);
		});
};
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$constant = NoRedInk$elm_random_general$Random$General$constant;
var NoRedInk$elm_random_general$Random$General$map2 = F3(
	function (func, _n0, _n1) {
		var genA = _n0.a;
		var genB = _n1.a;
		return NoRedInk$elm_random_general$Random$General$Generator(
			function (seed0) {
				var _n2 = genA(seed0);
				var a = _n2.a;
				var seed1 = _n2.b;
				var _n3 = genB(seed1);
				var b = _n3.a;
				var seed2 = _n3.b;
				return _Utils_Tuple2(
					A2(func, a, b),
					seed2);
			});
	});
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$map2 = NoRedInk$elm_random_general$Random$General$map2;
var NoRedInk$elm_random_general$Random$General$andThen = F2(
	function (callback, _n0) {
		var generateA = _n0.a;
		return NoRedInk$elm_random_general$Random$General$Generator(
			function (seed) {
				var _n1 = generateA(seed);
				var result = _n1.a;
				var newSeed = _n1.b;
				var _n2 = callback(result);
				var generateB = _n2.a;
				return generateB(newSeed);
			});
	});
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$andThen = NoRedInk$elm_random_general$Random$General$andThen;
var NoRedInk$elm_random_general$Random$General$map = F2(
	function (func, _n0) {
		var genA = _n0.a;
		return NoRedInk$elm_random_general$Random$General$Generator(
			function (seed0) {
				var _n1 = genA(seed0);
				var a = _n1.a;
				var seed1 = _n1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$map = NoRedInk$elm_random_general$Random$General$map;
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var NoRedInk$elm_random_general$Random$General$int = F3(
	function (_n0, a, b) {
		var c = _n0.a;
		return NoRedInk$elm_random_general$Random$General$Generator(
			function (seed0) {
				var _n1 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _n1.a;
				var hi = _n1.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & c.peel(seed0)) >>> 0) + lo,
						c.next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = c.peel(seed);
							var seedN = c.next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var NoRedInk$elm_random_general$Random$General$Config = function (a) {
	return {$: 'Config', a: a};
};
var NoRedInk$elm_random_general$Random$General$makeConfig = F2(
	function (next, peel) {
		return NoRedInk$elm_random_general$Random$General$Config(
			{next: next, peel: peel});
	});
var NoRedInk$elm_random_pcg_extended$Internal$Pcg$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var NoRedInk$elm_random_pcg_extended$Internal$Pcg$next = function (_n0) {
	var state0 = _n0.a;
	var incr = _n0.b;
	return A2(NoRedInk$elm_random_pcg_extended$Internal$Pcg$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$Seed = function (a) {
	return {$: 'Seed', a: a};
};
var elm$core$Array$bitMask = 4294967295 >>> (32 - elm$core$Array$shiftStep);
var elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = elm$core$Array$bitMask & (index >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (_n0.$ === 'SubTree') {
				var subTree = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _n0.a;
				return A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, values);
			}
		}
	});
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var elm$core$Basics$ge = _Utils_ge;
var elm$core$Array$get = F2(
	function (index, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? elm$core$Maybe$Just(
			A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, tail)) : elm$core$Maybe$Just(
			A3(elm$core$Array$getHelp, startShift, index, tree)));
	});
var elm$core$Elm$JsArray$unsafeSet = _JsArray_unsafeSet;
var elm$core$Array$setHelp = F4(
	function (shift, index, value, tree) {
		var pos = elm$core$Array$bitMask & (index >>> shift);
		var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
		if (_n0.$ === 'SubTree') {
			var subTree = _n0.a;
			var newSub = A4(elm$core$Array$setHelp, shift - elm$core$Array$shiftStep, index, value, subTree);
			return A3(
				elm$core$Elm$JsArray$unsafeSet,
				pos,
				elm$core$Array$SubTree(newSub),
				tree);
		} else {
			var values = _n0.a;
			var newLeaf = A3(elm$core$Elm$JsArray$unsafeSet, elm$core$Array$bitMask & index, value, values);
			return A3(
				elm$core$Elm$JsArray$unsafeSet,
				pos,
				elm$core$Array$Leaf(newLeaf),
				tree);
		}
	});
var elm$core$Array$set = F3(
	function (index, value, array) {
		var len = array.a;
		var startShift = array.b;
		var tree = array.c;
		var tail = array.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? array : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			tree,
			A3(elm$core$Elm$JsArray$unsafeSet, elm$core$Array$bitMask & index, value, tail)) : A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A4(elm$core$Array$setHelp, startShift, index, value, tree),
			tail));
	});
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$incrementExtensionHelp = F3(
	function (index, prev, arr) {
		incrementExtensionHelp:
		while (true) {
			if (!prev) {
				var _n0 = A2(elm$core$Array$get, index, arr);
				if (_n0.$ === 'Just') {
					var elem = _n0.a;
					var newElem = (elem + 1013904223) >>> 0;
					var $temp$index = index + 1,
						$temp$prev = newElem,
						$temp$arr = A3(elm$core$Array$set, index, newElem, arr);
					index = $temp$index;
					prev = $temp$prev;
					arr = $temp$arr;
					continue incrementExtensionHelp;
				} else {
					return arr;
				}
			} else {
				return arr;
			}
		}
	});
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$incrementExtension = function (arr) {
	return A3(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$incrementExtensionHelp, 0, 0, arr);
};
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$next = function (_n0) {
	var s = _n0.a;
	var newBase = NoRedInk$elm_random_pcg_extended$Internal$Pcg$next(s.base);
	var baseState = newBase.a;
	return NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$Seed(
		{
			base: newBase,
			extension: (!baseState) ? NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$incrementExtension(s.extension) : s.extension
		});
};
var elm$core$Bitwise$xor = _Bitwise_xor;
var NoRedInk$elm_random_pcg_extended$Internal$Pcg$peel = function (_n0) {
	var state = _n0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var NoRedInk$elm_random_pcg_extended$Internal$Pcg$config = A2(NoRedInk$elm_random_general$Random$General$makeConfig, NoRedInk$elm_random_pcg_extended$Internal$Pcg$next, NoRedInk$elm_random_pcg_extended$Internal$Pcg$peel);
var NoRedInk$elm_random_pcg_extended$Internal$Pcg$int = NoRedInk$elm_random_general$Random$General$int(NoRedInk$elm_random_pcg_extended$Internal$Pcg$config);
var elm$core$Array$length = function (_n0) {
	var len = _n0.a;
	return len;
};
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$peel = function (_n0) {
	var s = _n0.a;
	var baseOut = NoRedInk$elm_random_pcg_extended$Internal$Pcg$peel(s.base);
	var _n1 = A2(
		NoRedInk$elm_random_general$Random$General$step,
		A2(
			NoRedInk$elm_random_pcg_extended$Internal$Pcg$int,
			0,
			elm$core$Array$length(s.extension) - 1),
		s.base);
	var randIndex = _n1.a;
	var extension = A2(
		elm$core$Maybe$withDefault,
		0,
		A2(elm$core$Array$get, randIndex, s.extension));
	return (baseOut ^ extension) >>> 0;
};
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$config = A2(NoRedInk$elm_random_general$Random$General$makeConfig, NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$next, NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$peel);
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$int = NoRedInk$elm_random_general$Random$General$int(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$config);
var elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var author$project$Random$Extra$get = F2(
	function (index, list) {
		return elm$core$List$head(
			A2(elm$core$List$drop, index, list));
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2(elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var elm$core$List$takeTailRec = F2(
	function (n, list) {
		return elm$core$List$reverse(
			A3(elm$core$List$takeReverse, n, list, _List_Nil));
	});
var elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _n0 = _Utils_Tuple2(n, list);
			_n0$1:
			while (true) {
				_n0$5:
				while (true) {
					if (!_n0.b.b) {
						return list;
					} else {
						if (_n0.b.b.b) {
							switch (_n0.a) {
								case 1:
									break _n0$1;
								case 2:
									var _n2 = _n0.b;
									var x = _n2.a;
									var _n3 = _n2.b;
									var y = _n3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_n0.b.b.b.b) {
										var _n4 = _n0.b;
										var x = _n4.a;
										var _n5 = _n4.b;
										var y = _n5.a;
										var _n6 = _n5.b;
										var z = _n6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _n0$5;
									}
								default:
									if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
										var _n7 = _n0.b;
										var x = _n7.a;
										var _n8 = _n7.b;
										var y = _n8.a;
										var _n9 = _n8.b;
										var z = _n9.a;
										var _n10 = _n9.b;
										var w = _n10.a;
										var tl = _n10.b;
										return (ctr > 1000) ? A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _n0$5;
									}
							}
						} else {
							if (_n0.a === 1) {
								break _n0$1;
							} else {
								break _n0$5;
							}
						}
					}
				}
				return list;
			}
			var _n1 = _n0.b;
			var x = _n1.a;
			return _List_fromArray(
				[x]);
		}
	});
var elm$core$List$take = F2(
	function (n, list) {
		return A3(elm$core$List$takeFast, 0, n, list);
	});
var author$project$Random$Extra$choose = function (list) {
	if (elm$core$List$isEmpty(list)) {
		return NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$constant(
			_Utils_Tuple2(elm$core$Maybe$Nothing, list));
	} else {
		var lastIndex = elm$core$List$length(list) - 1;
		var gen = A2(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$int, 0, lastIndex);
		var front = function (i) {
			return A2(elm$core$List$take, i, list);
		};
		var back = function (i) {
			return A2(elm$core$List$drop, i + 1, list);
		};
		return A2(
			NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$map,
			function (index) {
				return _Utils_Tuple2(
					A2(author$project$Random$Extra$get, index, list),
					A2(
						elm$core$List$append,
						front(index),
						back(index)));
			},
			gen);
	}
};
var author$project$Random$Extra$shuffle = function (list) {
	if (elm$core$List$isEmpty(list)) {
		return NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$constant(list);
	} else {
		var helper = function (_n0) {
			var done = _n0.a;
			var remaining = _n0.b;
			return A2(
				NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$andThen,
				function (_n1) {
					var m_val = _n1.a;
					var shorter = _n1.b;
					if (m_val.$ === 'Nothing') {
						return NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$constant(
							_Utils_Tuple2(done, shorter));
					} else {
						var val = m_val.a;
						return helper(
							_Utils_Tuple2(
								A2(elm$core$List$cons, val, done),
								shorter));
					}
				},
				author$project$Random$Extra$choose(remaining));
		};
		return A2(
			NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$map,
			elm$core$Tuple$first,
			helper(
				_Utils_Tuple2(_List_Nil, list)));
	}
};
var author$project$Deck$Partial$generator = function (_n0) {
	var leading = _n0.leading;
	var remaining = _n0.remaining;
	return A3(
		NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$map2,
		elm$core$Basics$append,
		NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$constant(leading),
		author$project$Random$Extra$shuffle(remaining));
};
var author$project$Deck$Shuffle$generator = function (config) {
	return author$project$Random$Extra$shuffle(config.cards);
};
var author$project$Deck$Stacked$generator = function (config) {
	return NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$constant(config.cards);
};
var author$project$Deck$generator = function (config) {
	switch (config.$) {
		case 'Stacked':
			var config_ = config.a;
			return author$project$Deck$Stacked$generator(config_);
		case 'Shuffle':
			var config_ = config.a;
			return author$project$Deck$Shuffle$generator(config_);
		default:
			var config_ = config.a;
			return author$project$Deck$Partial$generator(config_);
	}
};
var author$project$Deck$prepare = F2(
	function (seed, config) {
		var _n0 = A2(
			NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$step,
			author$project$Deck$generator(config),
			seed);
		var random_cards = _n0.a;
		return random_cards;
	});
var author$project$Hand$init = {cards: _List_Nil};
var author$project$Player$Context = F4(
	function (hand, deck, army, strategy) {
		return {army: army, deck: deck, hand: hand, strategy: strategy};
	});
var author$project$Strategy$Fate = {$: 'Fate'};
var author$project$Strategy$Priority = function (a) {
	return {$: 'Priority', a: a};
};
var author$project$Strategy$Random = function (a) {
	return {$: 'Random', a: a};
};
var author$project$Strategy$Priority$Strategy = F2(
	function (order, unused) {
		return {order: order, unused: unused};
	});
var elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2(elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var elm$core$List$repeat = F2(
	function (n, value) {
		return A3(elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var elm$core$List$sortBy = _List_sortBy;
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var author$project$Strategy$Priority$init = F2(
	function (_n0, cards) {
		var order = _n0.order;
		var ordered_cards = A2(
			elm$core$List$map,
			elm$core$Tuple$second,
			A2(
				elm$core$List$sortBy,
				elm$core$Tuple$first,
				A3(
					elm$core$List$map2,
					F2(
						function (card_, _n1) {
							var index = _n1.a;
							return _Utils_Tuple2(index, card_);
						}),
					cards,
					A2(
						elm$core$List$sortBy,
						elm$core$Tuple$second,
						A2(elm$core$List$indexedMap, elm$core$Tuple$pair, order)))));
		return A2(
			author$project$Strategy$Priority$Strategy,
			ordered_cards,
			A2(
				elm$core$List$repeat,
				elm$core$List$length(cards),
				true));
	});
var NoRedInk$elm_random_pcg_extended$Internal$Pcg$initialSeed = function (x) {
	var _n0 = NoRedInk$elm_random_pcg_extended$Internal$Pcg$next(
		A2(NoRedInk$elm_random_pcg_extended$Internal$Pcg$Seed, 0, 1013904223));
	var state1 = _n0.a;
	var incr = _n0.b;
	var state2 = (state1 + x) >>> 0;
	return NoRedInk$elm_random_pcg_extended$Internal$Pcg$next(
		A2(NoRedInk$elm_random_pcg_extended$Internal$Pcg$Seed, state2, incr));
};
var elm$core$Array$fromListHelp = F3(
	function (list, nodeList, nodeListSize) {
		fromListHelp:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, list);
			var jsArray = _n0.a;
			var remainingItems = _n0.b;
			if (_Utils_cmp(
				elm$core$Elm$JsArray$length(jsArray),
				elm$core$Array$branchFactor) < 0) {
				return A2(
					elm$core$Array$builderToArray,
					true,
					{nodeList: nodeList, nodeListSize: nodeListSize, tail: jsArray});
			} else {
				var $temp$list = remainingItems,
					$temp$nodeList = A2(
					elm$core$List$cons,
					elm$core$Array$Leaf(jsArray),
					nodeList),
					$temp$nodeListSize = nodeListSize + 1;
				list = $temp$list;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue fromListHelp;
			}
		}
	});
var elm$core$Array$fromList = function (list) {
	if (!list.b) {
		return elm$core$Array$empty;
	} else {
		return A3(elm$core$Array$fromListHelp, list, _List_Nil, 0);
	}
};
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$initialSeed = F2(
	function (baseSeed, extendedSeed) {
		return NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$Seed(
			{
				base: NoRedInk$elm_random_pcg_extended$Internal$Pcg$initialSeed(baseSeed),
				extension: elm$core$Array$fromList(extendedSeed)
			});
	});
var author$project$Strategy$Random$init = F2(
	function (givenSeed, _n0) {
		var seed = _n0.seed;
		if (seed.$ === 'Nothing') {
			return givenSeed;
		} else {
			var seed_ = seed.a;
			return A2(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$initialSeed, seed_, _List_Nil);
		}
	});
var author$project$Strategy$prepare = F3(
	function (seed, config, cards) {
		switch (config.$) {
			case 'Fate':
				return author$project$Strategy$Fate;
			case 'Random':
				var config_ = config.a;
				return author$project$Strategy$Random(
					A2(author$project$Strategy$Random$init, seed, config_));
			default:
				var config_ = config.a;
				return author$project$Strategy$Priority(
					A2(author$project$Strategy$Priority$init, config_, cards));
		}
	});
var author$project$Player$init = F2(
	function (config, _n0) {
		var seedDeck = _n0.a;
		var seedStrategy = _n0.b;
		return {
			config: config,
			context: A4(
				author$project$Player$Context,
				author$project$Hand$init,
				A2(author$project$Deck$prepare, seedDeck, config.dealer),
				author$project$Battle$Army$init(config.hero),
				A3(
					author$project$Strategy$prepare,
					seedStrategy,
					config.strategy,
					author$project$Deck$cards(config.dealer)))
		};
	});
var author$project$Battle$init = F2(
	function (_n0, _n1) {
		var attacker = _n0.attacker;
		var defender = _n0.defender;
		var seed = _n1.a;
		var attSeeds = _n1.b;
		var defSeeds = _n1.c;
		var init_model = A5(
			author$project$Battle$Context,
			A2(author$project$Player$init, defender, attSeeds),
			A2(author$project$Player$init, attacker, defSeeds),
			0,
			seed,
			_List_Nil);
		return _Utils_Tuple2(
			init_model,
			author$project$Battle$goto(author$project$Battle$StartTurn));
	});
var author$project$Battle$logEvent = F2(
	function (log, battle) {
		return _Utils_update(
			battle,
			{
				log: A2(elm$core$List$cons, log, battle.log)
			});
	});
var author$project$Battle$Log$IncrementTurn = function (a) {
	return {$: 'IncrementTurn', a: a};
};
var author$project$Battle$incrementTurn = function (battle) {
	return A2(
		author$project$Battle$logEvent,
		author$project$Battle$Log$IncrementTurn(battle.turn + 1),
		_Utils_update(
			battle,
			{turn: battle.turn + 1}));
};
var author$project$Battle$applyOffense = F2(
	function (fn, battle) {
		return _Utils_update(
			battle,
			{
				offense: fn(battle.offense)
			});
	});
var author$project$Battle$Log$DrawCard = function (a) {
	return {$: 'DrawCard', a: a};
};
var author$project$Hand$add = F2(
	function (card, hand) {
		return _Utils_update(
			hand,
			{
				cards: _Utils_ap(
					hand.cards,
					_List_fromArray(
						[card]))
			});
	});
var author$project$Player$addToHand = F2(
	function (card, context) {
		return _Utils_update(
			context,
			{
				hand: A2(author$project$Hand$add, card, context.hand)
			});
	});
var author$project$Player$apply = F2(
	function (applyFunction, player) {
		return _Utils_update(
			player,
			{
				context: applyFunction(player.context)
			});
	});
var author$project$Player$setDeck = F2(
	function (deck_, context) {
		return _Utils_update(
			context,
			{deck: deck_});
	});
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var author$project$Player$drawCard = function (_n0) {
	var card = _n0.a;
	var deck_ = _n0.b;
	return A2(
		elm$core$Basics$composeR,
		author$project$Player$apply(
			author$project$Player$addToHand(card)),
		author$project$Player$apply(
			author$project$Player$setDeck(deck_)));
};
var author$project$Battle$drawCard = F2(
	function (_n0, battle) {
		var possibleCard = _n0.a;
		var deck = _n0.b;
		return function () {
			if (possibleCard.$ === 'Just') {
				var card = possibleCard.a;
				return A2(
					elm$core$Basics$composeR,
					author$project$Battle$applyOffense(
						author$project$Player$drawCard(
							_Utils_Tuple2(card, deck))),
					author$project$Battle$logEvent(
						author$project$Battle$Log$DrawCard(card)));
			} else {
				return elm$core$Basics$identity;
			}
		}()(battle);
	});
var author$project$Battle$onOffense = F2(
	function (onFunction, battle) {
		return onFunction(battle.offense);
	});
var author$project$Battle$Log$PlayCard = function (a) {
	return {$: 'PlayCard', a: a};
};
var author$project$Unit$Context = F3(
	function (damage_taken, countdown, turn_played) {
		return {countdown: countdown, damage_taken: damage_taken, turn_played: turn_played};
	});
var author$project$Unit$initContext = F2(
	function (config, turn) {
		return A3(author$project$Unit$Context, 0, config.delay, turn);
	});
var author$project$Unit$init = F2(
	function (base, turn) {
		return {
			config: base,
			context: A2(author$project$Unit$initContext, base, turn)
		};
	});
var elm$core$Elm$JsArray$push = _JsArray_push;
var elm$core$Elm$JsArray$singleton = _JsArray_singleton;
var elm$core$Array$insertTailInTree = F4(
	function (shift, index, tail, tree) {
		var pos = elm$core$Array$bitMask & (index >>> shift);
		if (_Utils_cmp(
			pos,
			elm$core$Elm$JsArray$length(tree)) > -1) {
			if (shift === 5) {
				return A2(
					elm$core$Elm$JsArray$push,
					elm$core$Array$Leaf(tail),
					tree);
			} else {
				var newSub = elm$core$Array$SubTree(
					A4(elm$core$Array$insertTailInTree, shift - elm$core$Array$shiftStep, index, tail, elm$core$Elm$JsArray$empty));
				return A2(elm$core$Elm$JsArray$push, newSub, tree);
			}
		} else {
			var value = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (value.$ === 'SubTree') {
				var subTree = value.a;
				var newSub = elm$core$Array$SubTree(
					A4(elm$core$Array$insertTailInTree, shift - elm$core$Array$shiftStep, index, tail, subTree));
				return A3(elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			} else {
				var newSub = elm$core$Array$SubTree(
					A4(
						elm$core$Array$insertTailInTree,
						shift - elm$core$Array$shiftStep,
						index,
						tail,
						elm$core$Elm$JsArray$singleton(value)));
				return A3(elm$core$Elm$JsArray$unsafeSet, pos, newSub, tree);
			}
		}
	});
var elm$core$Array$unsafeReplaceTail = F2(
	function (newTail, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		var originalTailLen = elm$core$Elm$JsArray$length(tail);
		var newTailLen = elm$core$Elm$JsArray$length(newTail);
		var newArrayLen = len + (newTailLen - originalTailLen);
		if (_Utils_eq(newTailLen, elm$core$Array$branchFactor)) {
			var overflow = _Utils_cmp(newArrayLen >>> elm$core$Array$shiftStep, 1 << startShift) > 0;
			if (overflow) {
				var newShift = startShift + elm$core$Array$shiftStep;
				var newTree = A4(
					elm$core$Array$insertTailInTree,
					newShift,
					len,
					newTail,
					elm$core$Elm$JsArray$singleton(
						elm$core$Array$SubTree(tree)));
				return A4(elm$core$Array$Array_elm_builtin, newArrayLen, newShift, newTree, elm$core$Elm$JsArray$empty);
			} else {
				return A4(
					elm$core$Array$Array_elm_builtin,
					newArrayLen,
					startShift,
					A4(elm$core$Array$insertTailInTree, startShift, len, newTail, tree),
					elm$core$Elm$JsArray$empty);
			}
		} else {
			return A4(elm$core$Array$Array_elm_builtin, newArrayLen, startShift, tree, newTail);
		}
	});
var elm$core$Array$push = F2(
	function (a, array) {
		var tail = array.d;
		return A2(
			elm$core$Array$unsafeReplaceTail,
			A2(elm$core$Elm$JsArray$push, a, tail),
			array);
	});
var author$project$Battle$Army$addUnit = F3(
	function (card, id, army) {
		return _Utils_update(
			army,
			{
				units: A2(
					elm$core$Array$push,
					A2(author$project$Unit$init, card, id),
					army.units)
			});
	});
var author$project$Player$applyArmy = function (armyFunction) {
	return author$project$Player$apply(
		function (context) {
			return _Utils_update(
				context,
				{
					army: armyFunction(context.army)
				});
		});
};
var author$project$Player$playCard = F2(
	function (card, id) {
		return author$project$Player$applyArmy(
			A2(author$project$Battle$Army$addUnit, card, id));
	});
var elm$core$Debug$log = _Debug_log;
var author$project$Battle$playCard = F2(
	function (_n0, battle) {
		var new_player = _n0.a;
		var play = _n0.b;
		if (play.$ === 'Just') {
			var playPlayer = play.a;
			var _n2 = function () {
				if (playPlayer.$ === 'External') {
					var card_ = playPlayer.a;
					var _n4 = A2(elm$core$Debug$log, 'whyyy', card_);
					return _Utils_Tuple2(
						card_,
						function (x) {
							return x;
						});
				} else {
					var card_ = playPlayer.a;
					return _Utils_Tuple2(
						card_,
						A2(author$project$Player$playCard, card_, battle.turn));
				}
			}();
			var card = _n2.a;
			var play_fn = _n2.b;
			return A2(
				author$project$Battle$logEvent,
				author$project$Battle$Log$PlayCard(card),
				A2(
					author$project$Battle$applyOffense,
					play_fn,
					_Utils_update(
						battle,
						{offense: new_player})));
		} else {
			return battle;
		}
	});
var author$project$Hand$size = function (hand) {
	return elm$core$List$length(hand.cards);
};
var author$project$Player$canPlay = function (player) {
	return author$project$Hand$size(player.context.hand) > 0;
};
var author$project$Player$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var author$project$Player$army = function (player) {
	return player.context.army;
};
var author$project$Deck$remaining = elm$core$Basics$identity;
var author$project$Player$deck = function (player) {
	return author$project$Deck$remaining(player.context.deck);
};
var author$project$Hand$cards = function (hand_) {
	return hand_.cards;
};
var author$project$Player$hand = function (player) {
	return author$project$Hand$cards(player.context.hand);
};
var author$project$Player$report = function (player) {
	return _Utils_Tuple3(
		author$project$Player$army(player),
		author$project$Player$deck(player),
		author$project$Player$hand(player));
};
var author$project$Hand$set = F2(
	function (hand, cards_) {
		return _Utils_update(
			hand,
			{cards: cards_});
	});
var author$project$Player$setHand = F2(
	function (hand_, context) {
		return _Utils_update(
			context,
			{
				hand: A2(author$project$Hand$set, context.hand, hand_)
			});
	});
var author$project$Player$setStrategy = F2(
	function (strat, context) {
		return _Utils_update(
			context,
			{strategy: strat});
	});
var author$project$Player$strategy = function (player) {
	return player.context.strategy;
};
var author$project$Strategy$Fate$play = function (hand) {
	if (!hand.b) {
		return _Utils_Tuple2(elm$core$Maybe$Nothing, hand);
	} else {
		var card = hand.a;
		var rest = hand.b;
		return _Utils_Tuple2(
			elm$core$Maybe$Just(card),
			rest);
	}
};
var author$project$Strategy$Priority$card = function (_n0) {
	var b = _n0.b;
	return b;
};
var author$project$Strategy$Priority$idx = function (_n0) {
	var a = _n0.a;
	return a;
};
var author$project$Strategy$Priority$unused = function (_n0) {
	var c = _n0.c;
	return c;
};
var author$project$Strategy$Priority$zipTogether = F2(
	function (cards, bools) {
		return A2(
			elm$core$List$indexedMap,
			F2(
				function (idx_, _n0) {
					var card_ = _n0.a;
					var use = _n0.b;
					return _Utils_Tuple3(idx_, card_, use);
				}),
			A3(
				elm$core$List$map2,
				F2(
					function (card_, use) {
						return _Utils_Tuple2(card_, use);
					}),
				cards,
				bools));
	});
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm_community$list_extra$List$Extra$remove = F2(
	function (x, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var y = xs.a;
			var ys = xs.b;
			return _Utils_eq(x, y) ? ys : A2(
				elm$core$List$cons,
				y,
				A2(elm_community$list_extra$List$Extra$remove, x, ys));
		}
	});
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm_community$list_extra$List$Extra$updateAt = F3(
	function (index, fn, list) {
		if (index < 0) {
			return list;
		} else {
			var tail = A2(elm$core$List$drop, index, list);
			var head = A2(elm$core$List$take, index, list);
			if (tail.b) {
				var x = tail.a;
				var xs = tail.b;
				return _Utils_ap(
					head,
					A2(
						elm$core$List$cons,
						fn(x),
						xs));
			} else {
				return list;
			}
		}
	});
var elm_community$list_extra$List$Extra$setAt = F2(
	function (index, value) {
		return A2(
			elm_community$list_extra$List$Extra$updateAt,
			index,
			elm$core$Basics$always(value));
	});
var author$project$Strategy$Priority$play = F2(
	function (strategy, hand) {
		var sorted_hand = A2(
			elm$core$List$filter,
			function (entry) {
				return author$project$Strategy$Priority$unused(entry) && A2(
					elm$core$List$member,
					author$project$Strategy$Priority$card(entry),
					hand);
			},
			A2(author$project$Strategy$Priority$zipTogether, strategy.order, strategy.unused));
		var priority = elm$core$List$head(sorted_hand);
		var new_strategy = A2(
			elm$core$Maybe$withDefault,
			strategy,
			A2(
				elm$core$Maybe$andThen,
				function (priority_) {
					return elm$core$Maybe$Just(
						_Utils_update(
							strategy,
							{
								unused: A3(
									elm_community$list_extra$List$Extra$setAt,
									author$project$Strategy$Priority$idx(priority_),
									true,
									strategy.unused)
							}));
				},
				priority));
		if (priority.$ === 'Nothing') {
			var _n1 = A2(elm$core$Debug$log, 'Trying to play with an empty hand... or something terrible', hand);
			return _Utils_Tuple3(elm$core$Maybe$Nothing, hand, new_strategy);
		} else {
			var _n2 = priority.a;
			var card_ = _n2.b;
			return _Utils_Tuple3(
				elm$core$Maybe$Just(card_),
				A2(elm_community$list_extra$List$Extra$remove, card_, hand),
				new_strategy);
		}
	});
var author$project$Strategy$Random$play = F2(
	function (seed, hand) {
		var generator = author$project$Random$Extra$choose(hand);
		var _n0 = A2(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$step, generator, seed);
		var _n1 = _n0.a;
		var possibleCard = _n1.a;
		var new_hand = _n1.b;
		var new_seed = _n0.b;
		return _Utils_Tuple3(possibleCard, new_hand, new_seed);
	});
var author$project$Strategy$play = F4(
	function (strategy, _n0, _n1, turn) {
		var o_army = _n0.a;
		var o_deck = _n0.b;
		var o_hand = _n0.c;
		var d_army = _n1.a;
		var d_deck = _n1.b;
		var d_hand = _n1.c;
		switch (strategy.$) {
			case 'Fate':
				var _n3 = author$project$Strategy$Fate$play(o_hand);
				var maybeCard = _n3.a;
				var rest = _n3.b;
				return _Utils_Tuple3(maybeCard, rest, author$project$Strategy$Fate);
			case 'Random':
				var random = strategy.a;
				var _n4 = A2(author$project$Strategy$Random$play, random, o_hand);
				var maybeCard = _n4.a;
				var rest = _n4.b;
				var new_strategy = _n4.c;
				return _Utils_Tuple3(
					maybeCard,
					rest,
					author$project$Strategy$Random(new_strategy));
			default:
				var priority = strategy.a;
				var _n5 = A2(author$project$Strategy$Priority$play, priority, o_hand);
				var maybeCard = _n5.a;
				var rest = _n5.b;
				var new_strategy = _n5.c;
				return _Utils_Tuple3(
					maybeCard,
					rest,
					author$project$Strategy$Priority(new_strategy));
		}
	});
var author$project$Player$getPlay = F3(
	function (offense, defense, turn) {
		var _n0 = A4(
			author$project$Strategy$play,
			author$project$Player$strategy(offense),
			author$project$Player$report(offense),
			author$project$Player$report(defense),
			turn);
		var possible_card = _n0.a;
		var hand_ = _n0.b;
		var new_strat = _n0.c;
		if (possible_card.$ === 'Nothing') {
			return _Utils_Tuple2(offense, elm$core$Maybe$Nothing);
		} else {
			var card = possible_card.a;
			return _Utils_Tuple2(
				A2(
					author$project$Player$apply,
					author$project$Player$setStrategy(new_strat),
					A2(
						author$project$Player$apply,
						author$project$Player$setHand(hand_),
						offense)),
				elm$core$Maybe$Just(
					author$project$Player$Internal(card)));
		}
	});
var author$project$Battle$maybePlay = function (battle) {
	return (A2(author$project$Battle$onOffense, author$project$Player$canPlay, battle) ? author$project$Battle$playCard(
		A3(author$project$Player$getPlay, battle.offense, battle.defense, battle.turn)) : elm$core$Basics$identity)(battle);
};
var author$project$Battle$allOf = F2(
	function (list, target) {
		return A3(
			elm$core$List$foldl,
			F2(
				function (f, a) {
					return f(target) && a;
				}),
			true,
			list);
	});
var author$project$Battle$EndBattle = {$: 'EndBattle'};
var author$project$Battle$endBattle = function (battle) {
	return _Utils_Tuple3(battle, elm$core$Platform$Cmd$none, author$project$Battle$EndBattle);
};
var author$project$Battle$Log$ClearDead = {$: 'ClearDead'};
var author$project$Unit$damageTaken = function (unit) {
	return unit.context.damage_taken;
};
var author$project$Unit$maxHealth = function (unit) {
	return unit.config.health;
};
var author$project$Unit$isAlive = function (unit) {
	return _Utils_cmp(
		author$project$Unit$damageTaken(unit),
		author$project$Unit$maxHealth(unit)) < 0;
};
var elm$core$Array$filter = F2(
	function (isGood, array) {
		return elm$core$Array$fromList(
			A3(
				elm$core$Array$foldr,
				F2(
					function (x, xs) {
						return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
					}),
				_List_Nil,
				array));
	});
var author$project$Battle$Army$clearDead = function (army) {
	return _Utils_update(
		army,
		{
			units: A2(elm$core$Array$filter, author$project$Unit$isAlive, army.units)
		});
};
var author$project$Player$clearDead = author$project$Player$applyArmy(author$project$Battle$Army$clearDead);
var author$project$Battle$clearDead = function (battle) {
	return A2(
		author$project$Battle$logEvent,
		author$project$Battle$Log$ClearDead,
		_Utils_update(
			battle,
			{
				defense: author$project$Player$clearDead(battle.defense)
			}));
};
var author$project$Battle$maxTurns = 100;
var author$project$Battle$NoOp = {$: 'NoOp'};
var author$project$Battle$newTurn = function (battle) {
	return _Utils_Tuple3(
		battle,
		author$project$Battle$goto(author$project$Battle$StartTurn),
		author$project$Battle$NoOp);
};
var author$project$Battle$endTurn = function (battle) {
	return ((_Utils_cmp(battle.turn, author$project$Battle$maxTurns) > -1) ? author$project$Battle$endBattle : author$project$Battle$newTurn)(
		author$project$Battle$clearDead(battle));
};
var author$project$Battle$Army$unit = F2(
	function (pos, army) {
		return A2(elm$core$Array$get, pos, army.units);
	});
var author$project$Player$unit = F2(
	function (pos, player) {
		return A2(author$project$Battle$Army$unit, pos, player.context.army);
	});
var author$project$Battle$getAttackerAt = F2(
	function (pos, battle) {
		return A2(author$project$Player$unit, pos, battle.offense);
	});
var author$project$Unit$attack = function (unit) {
	return unit.config.attack;
};
var author$project$Battle$getDamage = function (attacker) {
	return author$project$Unit$attack(attacker);
};
var author$project$Battle$getDefenderAt = F2(
	function (pos, battle) {
		return A2(author$project$Player$unit, pos, battle.defense);
	});
var author$project$Battle$onDefense = F2(
	function (onFunction, battle) {
		return onFunction(battle.defense);
	});
var author$project$Battle$setDefense = F2(
	function (setFunction, battle) {
		return _Utils_update(
			battle,
			{
				defense: setFunction(battle.defense)
			});
	});
var author$project$Battle$Log$AttackDamage = function (a) {
	return {$: 'AttackDamage', a: a};
};
var author$project$Battle$Log$HeroDamage = function (a) {
	return {$: 'HeroDamage', a: a};
};
var author$project$Battle$Army$applyHero = F2(
	function (heroFunction, army) {
		return _Utils_update(
			army,
			{
				hero: heroFunction(army.hero)
			});
	});
var author$project$Hero$addDamageTaken = F2(
	function (amt, context) {
		return _Utils_update(
			context,
			{damage_taken: context.damage_taken + amt});
	});
var author$project$Hero$apply = F2(
	function (setFunction, hero) {
		return _Utils_update(
			hero,
			{
				context: setFunction(hero.context)
			});
	});
var author$project$Hero$damage = function (amt) {
	return author$project$Hero$apply(
		author$project$Hero$addDamageTaken(amt));
};
var author$project$Player$damageHero = function (amt) {
	return author$project$Player$applyArmy(
		author$project$Battle$Army$applyHero(
			author$project$Hero$damage(amt)));
};
var author$project$Battle$Army$applyUnit = F3(
	function (position, unitFunction, army) {
		var _n0 = A2(elm$core$Array$get, position, army.units);
		if (_n0.$ === 'Nothing') {
			return army;
		} else {
			var unit_ = _n0.a;
			return _Utils_update(
				army,
				{
					units: A3(
						elm$core$Array$set,
						position,
						unitFunction(unit_),
						army.units)
				});
		}
	});
var author$project$Unit$apply = F2(
	function (applyFunction, unit) {
		return _Utils_update(
			unit,
			{
				context: applyFunction(unit.context)
			});
	});
var author$project$Unit$damage = function (amt) {
	return author$project$Unit$apply(
		function (unit) {
			return _Utils_update(
				unit,
				{damage_taken: unit.damage_taken + 1});
		});
};
var author$project$Player$damageUnit = F2(
	function (pos, amt) {
		return author$project$Player$applyArmy(
			A2(
				author$project$Battle$Army$applyUnit,
				pos,
				author$project$Unit$damage(amt)));
	});
var author$project$Hero$isAlive = function (hero) {
	return _Utils_cmp(hero.context.damage_taken, hero.config.health) < 0;
};
var author$project$Battle$Army$hero = function (army) {
	return army.hero;
};
var author$project$Player$hero = function (player) {
	return author$project$Battle$Army$hero(player.context.army);
};
var author$project$Player$heroIsAlive = function (player) {
	return author$project$Hero$isAlive(
		author$project$Player$hero(player));
};
var author$project$Unit$countdown = function (unit) {
	return unit.context.countdown;
};
var author$project$Unit$isActive = function (unit) {
	return author$project$Unit$countdown(unit) <= 0;
};
var author$project$Battle$hitHero = F2(
	function (_n4, battle) {
		var position = _n4.a;
		var attacker = _n4.b;
		var amount = author$project$Battle$getDamage(attacker);
		if (amount > 0) {
			var battle_after_damage = A2(
				author$project$Battle$setDefense,
				author$project$Player$damageHero(amount),
				battle);
			return (A2(author$project$Battle$onDefense, author$project$Player$heroIsAlive, battle_after_damage) ? author$project$Battle$maybeAttack(position + 1) : author$project$Battle$endBattle)(
				A2(
					author$project$Battle$logEvent,
					author$project$Battle$Log$HeroDamage(amount),
					battle_after_damage));
		} else {
			return A2(author$project$Battle$maybeAttack, position + 1, battle);
		}
	});
var author$project$Battle$hitUnit = F2(
	function (_n3, battle) {
		var position = _n3.a;
		var attacker = _n3.b;
		var amount = author$project$Battle$getDamage(attacker);
		if (amount > 0) {
			var after_damage = A2(
				author$project$Battle$setDefense,
				A2(author$project$Player$damageUnit, position, amount),
				battle);
			return A2(
				author$project$Battle$maybeAttack,
				position + 1,
				A2(
					author$project$Battle$logEvent,
					author$project$Battle$Log$AttackDamage(amount),
					after_damage));
		} else {
			return A2(author$project$Battle$maybeAttack, position + 1, battle);
		}
	});
var author$project$Battle$maybeAttack = F2(
	function (position, battle) {
		return function () {
			var _n2 = A2(author$project$Battle$getAttackerAt, position, battle);
			if (_n2.$ === 'Nothing') {
				return author$project$Battle$endTurn;
			} else {
				var attacker = _n2.a;
				return A2(
					author$project$Battle$allOf,
					_List_fromArray(
						[author$project$Unit$isAlive, author$project$Unit$isActive]),
					attacker) ? author$project$Battle$melee(
					_Utils_Tuple2(position, attacker)) : author$project$Battle$maybeAttack(position + 1);
			}
		}()(battle);
	});
var author$project$Battle$melee = F2(
	function (_n0, battle) {
		var position = _n0.a;
		var attacker = _n0.b;
		return function () {
			var _n1 = A2(author$project$Battle$getDefenderAt, position, battle);
			if (_n1.$ === 'Nothing') {
				return author$project$Battle$hitHero(
					_Utils_Tuple2(position, attacker));
			} else {
				var defender = _n1.a;
				return author$project$Unit$isAlive(defender) ? author$project$Battle$hitUnit(
					_Utils_Tuple2(position, attacker)) : author$project$Battle$hitHero(
					_Utils_Tuple2(position, attacker));
			}
		}()(battle);
	});
var author$project$Battle$maybeStartAttack = author$project$Battle$maybeAttack(0);
var author$project$Deck$size = elm$core$List$length;
var author$project$Player$cardAvail = function (player) {
	return author$project$Deck$size(player.context.deck) > 0;
};
var author$project$Player$handSize = 3;
var author$project$Player$needCard = function (player) {
	return _Utils_cmp(
		author$project$Player$handSize,
		author$project$Hand$size(player.context.hand)) > 0;
};
var author$project$Player$canDraw = function (player) {
	return author$project$Player$needCard(player) && author$project$Player$cardAvail(player);
};
var author$project$Deck$deal = function (deck) {
	if (!deck.b) {
		return _Utils_Tuple2(elm$core$Maybe$Nothing, deck);
	} else {
		var card = deck.a;
		var remaining_cards = deck.b;
		return _Utils_Tuple2(
			elm$core$Maybe$Just(card),
			remaining_cards);
	}
};
var author$project$Player$getDraw = function (player) {
	return author$project$Deck$deal(
		author$project$Player$deck(player));
};
var author$project$Battle$maybeDraw = function (battle) {
	return (A2(author$project$Battle$onOffense, author$project$Player$canDraw, battle) ? A2(
		elm$core$Basics$composeR,
		author$project$Battle$drawCard(
			A2(author$project$Battle$onOffense, author$project$Player$getDraw, battle)),
		author$project$Battle$maybeDraw) : A2(elm$core$Basics$composeR, author$project$Battle$maybePlay, author$project$Battle$maybeStartAttack))(battle);
};
var author$project$Battle$Log$ReduceDelay = {$: 'ReduceDelay'};
var elm$core$Elm$JsArray$map = _JsArray_map;
var elm$core$Array$map = F2(
	function (func, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = function (node) {
			if (node.$ === 'SubTree') {
				var subTree = node.a;
				return elm$core$Array$SubTree(
					A2(elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return elm$core$Array$Leaf(
					A2(elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2(elm$core$Elm$JsArray$map, helper, tree),
			A2(elm$core$Elm$JsArray$map, func, tail));
	});
var author$project$Battle$Army$applyUnits = F2(
	function (mapFunction, army) {
		return _Utils_update(
			army,
			{
				units: A2(elm$core$Array$map, mapFunction, army.units)
			});
	});
var author$project$Unit$reduceDelay = author$project$Unit$apply(
	function (unit) {
		return _Utils_update(
			unit,
			{countdown: unit.countdown - 1});
	});
var author$project$Player$reduceDelay = author$project$Player$applyArmy(
	author$project$Battle$Army$applyUnits(author$project$Unit$reduceDelay));
var author$project$Battle$reduceUnitDelay = function (battle) {
	return A2(
		author$project$Battle$logEvent,
		author$project$Battle$Log$ReduceDelay,
		_Utils_update(
			battle,
			{
				offense: author$project$Player$reduceDelay(battle.offense)
			}));
};
var author$project$Battle$swapSides = function (battle) {
	return _Utils_update(
		battle,
		{defense: battle.offense, offense: battle.defense});
};
var author$project$Player$External = function (a) {
	return {$: 'External', a: a};
};
var author$project$Battle$update = F2(
	function (msg, model) {
		return function () {
			if (msg.$ === 'StartTurn') {
				return A2(
					elm$core$Basics$composeR,
					author$project$Battle$incrementTurn,
					A2(
						elm$core$Basics$composeR,
						author$project$Battle$swapSides,
						A2(elm$core$Basics$composeR, author$project$Battle$reduceUnitDelay, author$project$Battle$maybeDraw)));
			} else {
				var play = msg.a;
				return A2(
					elm$core$Basics$composeR,
					author$project$Battle$playCard(
						_Utils_Tuple2(
							model.offense,
							elm$core$Maybe$Just(
								author$project$Player$External(play)))),
					author$project$Battle$maybeStartAttack);
			}
		}()(model);
	});
var author$project$Simulator$BattleMsg = function (a) {
	return {$: 'BattleMsg', a: a};
};
var author$project$Simulator$Simulating = F2(
	function (a, b) {
		return {$: 'Simulating', a: a, b: b};
	});
var author$project$Simulator$Stats = F2(
	function (wins, attempts) {
		return {attempts: attempts, wins: wins};
	});
var author$project$Simulator$attackerWon = function (_n0) {
	var won = _n0.c;
	return won;
};
var elm$core$Platform$Cmd$map = _Platform_map;
var author$project$Simulator$continueBattle = F3(
	function (matchup, _n0, model) {
		var battle = _n0.a;
		var battle_cmd = _n0.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{
					state: A2(author$project$Simulator$Simulating, matchup, battle)
				}),
			A2(elm$core$Platform$Cmd$map, author$project$Simulator$BattleMsg, battle_cmd));
	});
var elm$json$Json$Decode$map2 = _Json_map2;
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = elm$json$Json$Decode$map2(elm$core$Basics$apR);
var elm$json$Json$Decode$andThen = _Json_andThen;
var elm$json$Json$Decode$decodeValue = _Json_run;
var elm$json$Json$Decode$fail = _Json_fail;
var elm$json$Json$Decode$null = _Json_decodeNull;
var elm$json$Json$Decode$oneOf = _Json_oneOf;
var elm$json$Json$Decode$succeed = _Json_succeed;
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3(
	function (pathDecoder, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						decoder,
						elm$json$Json$Decode$null(fallback)
					]));
		};
		var handleResult = function (input) {
			var _n0 = A2(elm$json$Json$Decode$decodeValue, pathDecoder, input);
			if (_n0.$ === 'Ok') {
				var rawValue = _n0.a;
				var _n1 = A2(
					elm$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (_n1.$ === 'Ok') {
					var finalResult = _n1.a;
					return elm$json$Json$Decode$succeed(finalResult);
				} else {
					var finalErr = _n1.a;
					return elm$json$Json$Decode$fail(
						elm$json$Json$Decode$errorToString(finalErr));
				}
			} else {
				return elm$json$Json$Decode$succeed(fallback);
			}
		};
		return A2(elm$json$Json$Decode$andThen, handleResult, elm$json$Json$Decode$value);
	});
var elm$json$Json$Decode$field = _Json_decodeField;
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				A2(elm$json$Json$Decode$field, key, elm$json$Json$Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2(elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var author$project$Battle$Config = F2(
	function (attacker, defender) {
		return {attacker: attacker, defender: defender};
	});
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$hardcoded = A2(elm$core$Basics$composeR, elm$json$Json$Decode$succeed, NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom);
var author$project$Data$Hero = F2(
	function (health, skills) {
		return {health: health, skills: skills};
	});
var elm$json$Json$Decode$int = _Json_decodeInt;
var author$project$Data$heroDecoder = A2(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$hardcoded,
	_List_Nil,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'health',
		elm$json$Json$Decode$int,
		elm$json$Json$Decode$succeed(author$project$Data$Hero)));
var elm$core$String$toInt = _String_toInt;
var elm$core$String$trim = _String_trim;
var author$project$Data$stringHeroDecoder = function (input) {
	var hero = elm$core$String$toInt(
		elm$core$String$trim(input));
	if (hero.$ === 'Just') {
		var health = hero.a;
		return elm$json$Json$Decode$succeed(
			A2(author$project$Data$Hero, health, _List_Nil));
	} else {
		return elm$json$Json$Decode$fail('Could not parse hero stats: ' + input);
	}
};
var author$project$Deck$Partial = function (a) {
	return {$: 'Partial', a: a};
};
var author$project$Deck$Shuffle = function (a) {
	return {$: 'Shuffle', a: a};
};
var author$project$Deck$Stacked = function (a) {
	return {$: 'Stacked', a: a};
};
var author$project$Data$Card = F3(
	function (attack, health, delay) {
		return {attack: attack, delay: delay, health: health};
	});
var author$project$Data$cardDataDecoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'delay',
	elm$json$Json$Decode$int,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'health',
		elm$json$Json$Decode$int,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'attack',
			elm$json$Json$Decode$int,
			elm$json$Json$Decode$succeed(author$project$Data$Card))));
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var author$project$Data$stringCardDecoder = function (input) {
	var list = A2(
		elm$core$List$map,
		A2(elm$core$Basics$composeL, elm$core$String$toInt, elm$core$String$trim),
		A2(elm$core$String$split, '/', input));
	if ((((((list.b && (list.a.$ === 'Just')) && list.b.b) && (list.b.a.$ === 'Just')) && list.b.b.b) && (list.b.b.a.$ === 'Just')) && (!list.b.b.b.b)) {
		var attack = list.a.a;
		var _n1 = list.b;
		var health = _n1.a.a;
		var _n2 = _n1.b;
		var delay = _n2.a.a;
		return elm$core$Result$Ok(
			A3(author$project$Data$Card, attack, health, delay));
	} else {
		return elm$core$Result$Err('Could not parse card stats: ' + input);
	}
};
var author$project$Data$stringCardListDecoder = function (input) {
	var partitionFn = F2(
		function (entry, acc) {
			var _n1 = _Utils_Tuple2(entry, acc);
			if (_n1.a.$ === 'Ok') {
				if (_n1.b.$ === 'Ok') {
					var card = _n1.a.a;
					var card_list = _n1.b.a;
					return elm$core$Result$Ok(
						_Utils_ap(
							card_list,
							_List_fromArray(
								[card])));
				} else {
					var card = _n1.a.a;
					var msg_list = _n1.b.a;
					return elm$core$Result$Err(msg_list);
				}
			} else {
				if (_n1.b.$ === 'Ok') {
					var msg = _n1.a.a;
					var card_list = _n1.b.a;
					return elm$core$Result$Err(
						_List_fromArray(
							[msg]));
				} else {
					var msg = _n1.a.a;
					var msg_list = _n1.b.a;
					return elm$core$Result$Err(
						_Utils_ap(
							msg_list,
							_List_fromArray(
								[msg])));
				}
			}
		});
	var list = A2(
		elm$core$List$map,
		A2(elm$core$Basics$composeL, author$project$Data$stringCardDecoder, elm$core$String$trim),
		A2(elm$core$String$split, ',', input));
	var outcome = A3(
		elm$core$List$foldl,
		partitionFn,
		elm$core$Result$Ok(_List_Nil),
		list);
	if (outcome.$ === 'Ok') {
		var card_list = outcome.a;
		return elm$json$Json$Decode$succeed(card_list);
	} else {
		var msg_list = outcome.a;
		return elm$json$Json$Decode$fail(
			A2(elm$core$String$join, '; ', msg_list));
	}
};
var elm$json$Json$Decode$string = _Json_decodeString;
var author$project$Data$cardsStringDecoder = A2(elm$json$Json$Decode$andThen, author$project$Data$stringCardListDecoder, elm$json$Json$Decode$string);
var elm$json$Json$Decode$list = _Json_decodeList;
var author$project$Data$cardsDecoder = elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			elm$json$Json$Decode$list(author$project$Data$cardDataDecoder),
			author$project$Data$cardsStringDecoder
		]));
var author$project$Deck$Partial$Config = F2(
	function (leading, remaining) {
		return {leading: leading, remaining: remaining};
	});
var author$project$Deck$Partial$decoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'remaining',
	author$project$Data$cardsDecoder,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'leading',
		author$project$Data$cardsDecoder,
		elm$json$Json$Decode$succeed(author$project$Deck$Partial$Config)));
var author$project$Deck$Shuffle$Config = F2(
	function (cards, seed) {
		return {cards: cards, seed: seed};
	});
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$maybe = function (decoder) {
	return elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(elm$json$Json$Decode$map, elm$core$Maybe$Just, decoder),
				elm$json$Json$Decode$succeed(elm$core$Maybe$Nothing)
			]));
};
var author$project$Deck$Shuffle$decoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'seed',
	elm$json$Json$Decode$maybe(elm$json$Json$Decode$int),
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'cards',
		author$project$Data$cardsDecoder,
		elm$json$Json$Decode$succeed(author$project$Deck$Shuffle$Config)));
var author$project$Deck$Stacked$Config = function (cards) {
	return {cards: cards};
};
var author$project$Deck$Stacked$decoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'cards',
	author$project$Data$cardsDecoder,
	elm$json$Json$Decode$succeed(author$project$Deck$Stacked$Config));
var author$project$Deck$decoder = elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(elm$json$Json$Decode$map, author$project$Deck$Shuffle, author$project$Deck$Shuffle$decoder),
			A2(elm$json$Json$Decode$map, author$project$Deck$Stacked, author$project$Deck$Stacked$decoder),
			A2(elm$json$Json$Decode$map, author$project$Deck$Partial, author$project$Deck$Partial$decoder),
			elm$json$Json$Decode$fail('Dealer couldn\'t match.')
		]));
var author$project$Player$Config = F3(
	function (hero, dealer, strategy) {
		return {dealer: dealer, hero: hero, strategy: strategy};
	});
var author$project$Player$retrieveCards = A2(
	elm$json$Json$Decode$map,
	author$project$Deck$cards,
	A2(elm$json$Json$Decode$field, 'dealer', author$project$Deck$decoder));
var author$project$Strategy$Config$Fate = {$: 'Fate'};
var author$project$Strategy$Config$Priority = function (a) {
	return {$: 'Priority', a: a};
};
var author$project$Strategy$Config$Random = function (a) {
	return {$: 'Random', a: a};
};
var NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$resolve = elm$json$Json$Decode$andThen(elm$core$Basics$identity);
var author$project$Strategy$Priority$Config = function (order) {
	return {order: order};
};
var elm$core$List$sort = function (xs) {
	return A2(elm$core$List$sortBy, elm$core$Basics$identity, xs);
};
var author$project$Strategy$Priority$decoder = function (cards) {
	var decodeResolve = function (list) {
		return (_Utils_eq(
			elm$core$List$length(cards),
			elm$core$List$length(list)) && A3(
			elm$core$List$foldl,
			F2(
				function (_n0, acc) {
					var x = _n0.a;
					var y = _n0.b;
					return acc && _Utils_eq(x + 1, y);
				}),
			true,
			A2(
				elm$core$List$indexedMap,
				elm$core$Tuple$pair,
				elm$core$List$sort(list)))) ? elm$json$Json$Decode$succeed(
			author$project$Strategy$Priority$Config(list)) : elm$json$Json$Decode$fail('Order must be a permutation of the list 1..length.');
	};
	return NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$resolve(
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'order',
			elm$json$Json$Decode$list(elm$json$Json$Decode$int),
			elm$json$Json$Decode$succeed(decodeResolve)));
};
var author$project$Strategy$Random$Config = function (seed) {
	return {seed: seed};
};
var author$project$Strategy$Random$decoder = function (cards) {
	return A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'seed',
		elm$json$Json$Decode$maybe(elm$json$Json$Decode$int),
		elm$json$Json$Decode$succeed(author$project$Strategy$Random$Config));
};
var author$project$Strategy$Config$decoder = function (x) {
	return elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				A2(
				elm$json$Json$Decode$map,
				author$project$Strategy$Config$Random,
				author$project$Strategy$Random$decoder(x)),
				A2(
				elm$json$Json$Decode$map,
				author$project$Strategy$Config$Priority,
				author$project$Strategy$Priority$decoder(x)),
				elm$json$Json$Decode$null(author$project$Strategy$Config$Fate)
			]));
};
var author$project$Strategy$Config$defaultDecoder = author$project$Strategy$Config$Fate;
var author$project$Player$decodeStrategy = elm$json$Json$Decode$oneOf(
	_List_fromArray(
		[
			A2(
			elm$json$Json$Decode$andThen,
			A2(
				elm$core$Basics$composeL,
				elm$json$Json$Decode$field('strategy'),
				author$project$Strategy$Config$decoder),
			author$project$Player$retrieveCards),
			elm$json$Json$Decode$succeed(author$project$Strategy$Config$defaultDecoder)
		]));
var author$project$Player$decoder = A2(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
	author$project$Player$decodeStrategy,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'dealer',
		author$project$Deck$decoder,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'hero',
			elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						author$project$Data$heroDecoder,
						A2(elm$json$Json$Decode$andThen, author$project$Data$stringHeroDecoder, elm$json$Json$Decode$string)
					])),
			elm$json$Json$Decode$succeed(author$project$Player$Config))));
var author$project$Battle$matchupDecoder = A3(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'defender',
	author$project$Player$decoder,
	A3(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'attacker',
		author$project$Player$decoder,
		elm$json$Json$Decode$succeed(author$project$Battle$Config)));
var author$project$Simulator$Simulation = F3(
	function (matchup, seed, runs) {
		return {matchup: matchup, runs: runs, seed: seed};
	});
var author$project$Simulator$decoder = A4(
	NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'runs',
	elm$json$Json$Decode$maybe(elm$json$Json$Decode$int),
	elm$core$Maybe$Nothing,
	A4(
		NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
		'seed',
		elm$json$Json$Decode$maybe(elm$json$Json$Decode$int),
		elm$core$Maybe$Nothing,
		A3(
			NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'matchup',
			author$project$Battle$matchupDecoder,
			elm$json$Json$Decode$succeed(author$project$Simulator$Simulation))));
var author$project$Simulator$Matchup = function (a) {
	return {$: 'Matchup', a: a};
};
var author$project$Simulator$MaybeEndSimulation = {$: 'MaybeEndSimulation'};
var author$project$Simulator$Outcome = F3(
	function (a, b, c) {
		return {$: 'Outcome', a: a, b: b, c: c};
	});
var author$project$Simulator$goto = function (x) {
	return A2(
		elm$core$Task$perform,
		elm$core$Basics$identity,
		elm$core$Task$succeed(x));
};
var author$project$Simulator$endBattle = F3(
	function (matchup, battle_end, model) {
		var attacker_won = (battle_end.turn % 2) === 1;
		var new_outcome = A3(author$project$Simulator$Outcome, matchup, battle_end.log, attacker_won);
		var new_log = A2(elm$core$List$cons, new_outcome, model.log);
		return _Utils_Tuple2(
			A5(
				author$project$Simulator$Model,
				author$project$Simulator$Matchup(matchup),
				new_log,
				model.seed,
				model.runsRemaining - 1,
				model.runs),
			author$project$Simulator$goto(author$project$Simulator$MaybeEndSimulation));
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Simulator$initSimulation = function (_n0) {
	var matchup = _n0.matchup;
	var seed = _n0.seed;
	var runs = _n0.runs;
	var seed_ = A2(
		elm$core$Maybe$map,
		function (x) {
			return A2(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$initialSeed, x, _List_Nil);
		},
		seed);
	var num_runs = A2(elm$core$Maybe$withDefault, 1, runs);
	return _Utils_Tuple2(
		A5(
			author$project$Simulator$Model,
			author$project$Simulator$Matchup(matchup),
			_List_Nil,
			seed_,
			num_runs,
			num_runs),
		author$project$Simulator$goto(author$project$Simulator$MaybeEndSimulation));
};
var author$project$Simulator$json_parse_error = elm$core$Debug$log('Count not parse JSON: ');
var NoRedInk$elm_random_general$Random$General$generator = NoRedInk$elm_random_general$Random$General$Generator;
var NoRedInk$elm_random_general$Random$General$map3 = F4(
	function (func, _n0, _n1, _n2) {
		var genA = _n0.a;
		var genB = _n1.a;
		var genC = _n2.a;
		return NoRedInk$elm_random_general$Random$General$Generator(
			function (seed0) {
				var _n3 = genA(seed0);
				var a = _n3.a;
				var seed1 = _n3.b;
				var _n4 = genB(seed1);
				var b = _n4.a;
				var seed2 = _n4.b;
				var _n5 = genC(seed2);
				var c = _n5.a;
				var seed3 = _n5.b;
				return _Utils_Tuple2(
					A3(func, a, b, c),
					seed3);
			});
	});
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$map3 = NoRedInk$elm_random_general$Random$General$map3;
var elm$core$Bitwise$or = _Bitwise_or;
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$independentSeed = NoRedInk$elm_random_general$Random$General$generator(
	function (seed0) {
		var gen = A2(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$int, 0, 4294967295);
		var _n0 = A2(
			NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$step,
			A4(
				NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$map3,
				F3(
					function (x, y, z) {
						return _Utils_Tuple3(x, y, z);
					}),
				gen,
				gen,
				gen),
			seed0);
		var _n1 = _n0.a;
		var state = _n1.a;
		var b = _n1.b;
		var c = _n1.c;
		var seed1 = _n0.b.a;
		var incr = (1 | (b ^ c)) >>> 0;
		return _Utils_Tuple2(
			NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$Seed(seed1),
			NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$Seed(
				{
					base: NoRedInk$elm_random_pcg_extended$Internal$Pcg$next(
						A2(NoRedInk$elm_random_pcg_extended$Internal$Pcg$Seed, state, incr)),
					extension: seed1.extension
				}));
	});
var NoRedInk$elm_random_general$Random$General$pair = F2(
	function (genA, genB) {
		return A3(NoRedInk$elm_random_general$Random$General$map2, elm$core$Tuple$pair, genA, genB);
	});
var NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$pair = NoRedInk$elm_random_general$Random$General$pair;
var author$project$Battle$seedsGenerator = function () {
	var seedGen = NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$independentSeed;
	var pair = A2(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$pair, seedGen, seedGen);
	return A4(
		NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$map3,
		F3(
			function (a, b, c) {
				return _Utils_Tuple3(a, b, c);
			}),
		seedGen,
		pair,
		pair);
}();
var author$project$Simulator$InitBattle = F2(
	function (a, b) {
		return {$: 'InitBattle', a: a, b: b};
	});
var elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var elm$time$Time$customZone = elm$time$Time$Zone;
var elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var elm$time$Time$millisToPosix = elm$time$Time$Posix;
var elm$time$Time$now = _Time_now(elm$time$Time$millisToPosix);
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0.a;
	return millis;
};
var author$project$Simulator$generate = F2(
	function (toMsg, generator) {
		return A2(
			elm$core$Task$perform,
			toMsg,
			A2(
				elm$core$Task$map,
				A2(
					elm$core$Basics$composeR,
					elm$time$Time$posixToMillis,
					A2(
						elm$core$Basics$composeR,
						function (x) {
							return A2(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$initialSeed, x, _List_Nil);
						},
						A2(
							elm$core$Basics$composeR,
							NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$step(generator),
							elm$core$Tuple$first))),
				elm$time$Time$now));
	});
var author$project$Simulator$seedsCmd = F2(
	function (seed, matchup) {
		if (seed.$ === 'Nothing') {
			return _Utils_Tuple2(
				A2(
					author$project$Simulator$generate,
					author$project$Simulator$InitBattle(matchup),
					author$project$Battle$seedsGenerator),
				elm$core$Maybe$Nothing);
		} else {
			var seed_ = seed.a;
			var _n1 = A2(NoRedInk$elm_random_pcg_extended$Random$Pcg$Extended$step, author$project$Battle$seedsGenerator, seed_);
			var seeds = _n1.a;
			var new_seed = _n1.b;
			return _Utils_Tuple2(
				author$project$Simulator$goto(
					A2(author$project$Simulator$InitBattle, matchup, seeds)),
				elm$core$Maybe$Just(new_seed));
		}
	});
var author$project$Simulator$prepareRun = F2(
	function (model, matchup) {
		var _n0 = A2(author$project$Simulator$seedsCmd, model.seed, matchup);
		var initCmd = _n0.a;
		var new_seed = _n0.b;
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{seed: new_seed}),
			initCmd);
	});
var author$project$Simulator$runsRemaining = function (model) {
	return model.runsRemaining > 0;
};
var elm$json$Json$Encode$int = _Json_wrap;
var elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			elm$core$List$foldl,
			F2(
				function (_n0, obj) {
					var k = _n0.a;
					var v = _n0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var author$project$Simulator$simulationStats = _Platform_outgoingPort(
	'simulationStats',
	function ($) {
		return elm$json$Json$Encode$object(
			_List_fromArray(
				[
					_Utils_Tuple2(
					'attempts',
					elm$json$Json$Encode$int($.attempts)),
					_Utils_Tuple2(
					'wins',
					elm$json$Json$Encode$int($.wins))
				]));
	});
var author$project$Simulator$update = F2(
	function (msg, model) {
		var doNothing = _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
		var _n0 = _Utils_Tuple2(msg, model.state);
		switch (_n0.a.$) {
			case 'SimulationRequest':
				var value = _n0.a.a;
				var _n1 = A2(elm$json$Json$Decode$decodeValue, author$project$Simulator$decoder, value);
				if (_n1.$ === 'Ok') {
					var simulation = _n1.a;
					return author$project$Simulator$initSimulation(simulation);
				} else {
					var error_msg = _n1.a;
					var _n2 = author$project$Simulator$json_parse_error(error_msg);
					return doNothing;
				}
			case 'InitBattle':
				var _n6 = _n0.a;
				var matchup = _n6.a;
				var seeds = _n6.b;
				var _n7 = A2(author$project$Battle$init, matchup, seeds);
				var battle = _n7.a;
				var cmd = _n7.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							state: A2(author$project$Simulator$Simulating, matchup, battle)
						}),
					A2(elm$core$Platform$Cmd$map, author$project$Simulator$BattleMsg, cmd));
			case 'BattleMsg':
				if (_n0.b.$ === 'Simulating') {
					var battle_msg = _n0.a.a;
					var _n3 = _n0.b;
					var matchup = _n3.a;
					var battle = _n3.b;
					var _n4 = A2(author$project$Battle$update, battle_msg, battle);
					var new_battle = _n4.a;
					var battle_cmd = _n4.b;
					var extmsg = _n4.c;
					if (extmsg.$ === 'EndBattle') {
						return A3(author$project$Simulator$endBattle, matchup, new_battle, model);
					} else {
						return A3(
							author$project$Simulator$continueBattle,
							matchup,
							_Utils_Tuple2(new_battle, battle_cmd),
							model);
					}
				} else {
					return doNothing;
				}
			default:
				if (_n0.b.$ === 'Matchup') {
					var _n8 = _n0.a;
					var matchup = _n0.b.a;
					if (author$project$Simulator$runsRemaining(model)) {
						return A2(author$project$Simulator$prepareRun, model, matchup);
					} else {
						var wins = elm$core$List$length(
							A2(elm$core$List$filter, author$project$Simulator$attackerWon, model.log));
						return _Utils_Tuple2(
							model,
							author$project$Simulator$simulationStats(
								A2(author$project$Simulator$Stats, wins, model.runs)));
					}
				} else {
					var _n9 = _n0.a;
					return doNothing;
				}
		}
	});
var elm$core$Platform$worker = _Platform_worker;
var author$project$Simulator$main = elm$core$Platform$worker(
	{init: author$project$Simulator$init, subscriptions: author$project$Simulator$subscriptions, update: author$project$Simulator$update});
_Platform_export({'Simulator':{'init':author$project$Simulator$main(
	elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));