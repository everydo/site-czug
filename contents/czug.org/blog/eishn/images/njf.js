( function() {
window.DEFAULT_ENCODING = 'utf-8';
window.CPU = 20;
window.GLOBAL = {};

} )();

( function() {
// NJF Part

/////////////////////////////////////////////////////////////////

if(window.__njf__) return;
   window.__njf__ = true;

var string = String.prototype;

var re_trim = /^[\r\n\s\t]*|[\r\n\s\t]*$/g

string.trim = function() {
	return this.replace(re_trim, '');
};

window.new_id = function() {
	return "_" + Math.ceil(Math.random() * 16777216) +
		"_" + (new Date()).getTime();

}; window.newId = new_id;

window.PLATFORM = document.all? 'IE' : 'GECKO';

if(PLATFORM == 'GECKO') { // GECKO

	if(!HTMLElement) { alert('ERROR:UNSUPPORT BROWSER'); return; }

	var element = HTMLElement.prototype;

	element.__defineGetter__("clientWidth", function() {
		return this.offsetWidth - 20;
	} );

	element.__defineGetter__("clientHeight", function() {
		return this.offsetHeight - 20;
	} );

	element.__defineSetter__("outerHTML", function(s) {
		var range = this.ownerDocument.createRange();
		range.setStartBefore(this);

		var fragment = range.createContextualFragment(s);
		this.parentNode.replaceChild(fragment, this);
	} );

	element.__defineGetter__("runtimeStyle", function() {
		return this.style;
	} );

	var ae = function(name, handler) {
		var n = name.replace(/^on/, "");
		this.addEventListener(n, handler, false);

	}; element.attachEvent  = ae;
	   document.attachEvent = ae;
	   window.attachEvent   = ae

	var de = function (name, handler) {
		var n = name.replace(/^on/, "");
		this.removeEventListener(n, handler, false);

	}; element.detachEvent  = de;
	   document.detachEvent = de;
	   window.detachEvent   = de;

	var wnd_obj = window.constructor.prototype;

	var get_event = function() {
		var func = get_event.caller;
		while (func) {
			var arg0 = func.arguments[0];
			if (arg0) {
				if (arg0.constructor==Event) return arg0;

			}
			func = func.caller;
		}
		return null;

	}; wnd_obj.__defineGetter__("event", get_event);

} else if(PLATFORM == "IE") { } // IE

/////////////////////////////////////////////////////////////////

( function() {
	var base, src = 'njf.js', scripts = document.getElementsByTagName('script');
	for(var i = 0; i < scripts.length; i++) {
		if (scripts[i].src.match(src)) {
			base = scripts[i].src.replace(src, '');
			break;
		}
	}

	window.__scriptbase__ = base;
	window.base = base;

} )();

window.__urlbase__ = document.URL.replace(/[^\/\\]*$/, '');

window.import_script = function(url, patch) {
	var xh; if(PLATFORM == 'IE') {
		/*@cc_on @*/
		/*@if (@_jscript_version >= 5)
		try {
			xh = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				xh = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
				xh = false;
			}
		}
		@end @*/
	} else { xh = new XMLHttpRequest(); }

	xh.open("GET", url, false);
	xh.send(null);

	var code = xh.responseText;

	if(patch) code = ["( function() {", code, patch, "} )();"].join("\n");

	if (window.execScript)
		window.execScript(code,"JavaScript");//ie
	else
		window.eval(code,"JavaScript"); //firefox

}; window.ImportScript = import_script;


window.import_style = function(url) {
	document.write('<style type=\"text/css\">@import \"' + url + '\" ;</style>');

}; window.ImportStyle = import_style;

/////////////////////////////////////////////////////////////////

window.convert2widget = function(obj) {
	if(obj.__njf_wseed__) return obj;

	obj.set_style = function(sheet) {
		var l = sheet.split(";");
		for(var i = 0; i < l.length; i++) {
			var ll = l[i].split(":");
			if(ll.length != 2) continue;
			var c1 = ll[0].toLowerCase().trim();
			if(c1.search("-") == -1) {
				this.runtimeStyle[c1] = ll[1].trim();
				continue;
			}

			var l4 = c1.split("-"), name = l4[0].trim();
			for(var k = 1; k < l4.length; k++) {
				var t = l4[k].trim();
				if(!t) continue;
				name += t.substring(0, 1).toUpperCase() + t.substring(1);

			}
			this.runtimeStyle[name] = ll[1].trim();
		}

	}; obj.style2 = obj.set_style;
	   obj.setStyle = obj.set_style;

	obj.get_parent = function() {
		return convert2widget(this.parentNode);

	}; obj.parent2   = obj.get_parent;
	   obj.getParent = obj.get_parent;

	obj.append = function(tag, attrs) {
		tag = tag || 'DIV';

		if(typeof(tag) == 'string') {
			var node = document.createElement(tag);
			if(attrs) for(var an in attrs) node[an] = attrs[an];
			this.appendChild(node);
			return convert2widget(node);
		}

		var node = document.createElement('DIV');
		this.appendChild(node);
		this.replaceChild(tag, node);
		return convert2widget(tag);

	}; obj.create = obj.append;

	obj.prepend = function(tag, attrs) {
		tag = tag || 'DIV';

		if(typeof(tag) == 'string') {
			var node = document.createElement(tag);
			if(attrs) for(var an in attrs) node[an] = attrs[an];
			this.insertBefore(node, this.firstChild);
			return convert2widget(node);
		}

		var node = document.createElement('DIV');
		this.insertBefore(node, this.firstChild);
		this.replaceChild(tag, node);
		return convert2widget(tag);
	};

	obj.previous = function(tag, attrs) {
		tag = tag || 'DIV';

		if(typeof(tag) == 'string') {
			node = document.createElement(tag);
			if(attrs) for(var an in attrs) node[an] = attrs[an];
			this.parentNode.insertBefore(node,
				this);
			return convert2widget(node);

		}

		var node = document.createElement('DIV');
		this.parentNode.insertBefore(node,
			this);
		this.parentNode.replaceChild(tag, node);
		return convert2widget(tag);
	};

	obj.next = function(tag, attrs) {
		tag = tag || 'DIV';

		var node;
		if(typeof(tag) == 'string') {
			var node = document.createElement(tag);
			if(attrs) for(var an in attrs) node[an] = attrs[an];
			this.parentNode.insertBefore(node,
				this.nextSibling);
			return convert2widget(node);
		}

		var node = document.createElement('DIV');
		this.parentNode.insertBefore(node,
			this.nextSibling);
		this.parentNode.replaceChild(tag, node);
		return convert2widget(tag);
	};

	obj.replace_by = function(node) {
		this.parentNode.replaceChild(node, this);
		return convert2widget(node);

	}; obj.replaceBy = obj.replace_by;

	obj.destroy = function() {
		this.parentNode.removeChild(this);
		return this;

	}; obj.suicide = obj.destroy;

	obj.leave = function() {
		var r = this.runtimeStyle;

		if(arguments.length == 2) {
			r.left = arguments[0];
			r.top = arguments[1];

		} else {
			r.left = this.offsetLeft;
			r.top = this.offsetTop;
		}

		r.position = 'absolute';
		$body().append().replace_by(this);
		return this;
	};

	obj.to_absolute = function() {
		obj.runtimeStyle.position = 'absolute';
		return this;
	}; obj.toAbsolute = obj.to_absolute;
	   obj.fakeleave  = obj.to_absolute;
	   obj.fake_leave = obj.to_absolute;
	   obj.fakeLeave  = obj.to_absolute;

	obj.move = function(x, y) {
		var r = this.runtimeStyle;
		r.left = x;
		r.top = y;
		return this;
	};

	obj.stay = function(pnt) {
		this.runtimeStyle.position = 'relative';
		if(pnt) pnt.append(obj);
		return this;
	};

	obj.__njf_wseed__ = true;

	return obj;
};

window.$ = function(name) {
	return convert2widget(document.getElementById(name));
};

window.$body = function() {
	return convert2widget(document.body);
};

/////////////////////////////////////////////////////////////////

var gift = {};
window.__gift__ = gift;

gift.wake_up = function() {
	var m = {drag: {}, resize: {}};
	gift.m = m; md = m.drag; mr = m.resize;

	var dmove = function(e) {
		if(!md.w) return;
		e = e || window.event;
		var x = e.clientX < 1? 1 : e.clientX;
		var y = e.clientY < 1? 1 : e.clientY;
		x -= md.x1; y -= md.y1;

		md.w.move(x, y);
	};

	var dstop = function(e) {
		if(!md.w) return;
		e = e || window.event;

		document.detachEvent('onmouseup', dstop);
		document.detachEvent('onmousemove', dmove);
	};

	var dstart = function() {
		document.attachEvent('onmousemove', dmove);
		document.attachEvent('onmouseup', dstop);
	};

	var rmove = function(e) {
		if(!mr.w) return;
		e = e || window.event;
		var x = e.clientX < 1? 1 : e.clientX;
		var y = e.clientY < 1? 1 : e.clientY;
		x -= mr.x1; y -= mr.y1;

		var wi = mr.w.min_w || 32, hi = mr.w.min_h || 20;
		var w = mr.w1 + (x * mr.r.w_speed);
		var h = mr.h1 + (y * mr.r.h_speed);
		w = w > wi? w : wi; h = h > hi? h : hi;

		try {
			mr.w.runtimeStyle.width = w + 'px';
			mr.w.runtimeStyle.height = h + 'px';

		} catch(e) {}
	};

	var rstop = function(e) {
		if(!mr.w) return;
		e = e || window.event;

		document.detachEvent('onmouseup', rstop);
		document.detachEvent('onmousemove', rmove);
	};

	var rstart = function(e) {
		document.attachEvent('onmousemove', rmove);
		document.attachEvent('onmouseup', rstop);
	};

	md.dstart = dstart; md.dstop = dstop;
	mr.rstart = rstart; mr.rstop = rstop;
};

window.DragItem = function(obj, dest) {
	if(!gift.m) gift.wake_up();
	if(obj.__drag_item__) return; obj.__drag_item__ = true;

	var do_skip = function() { return false; };

	var m = gift.m, md = gift.m.drag;
	var dstart = function(e) {
		e = e || window.event;
		if(PLATFORM == 'GECKO') e.preventDefault();

		md.r = obj;
		if(!dest) {
			var cp = obj;
			while(cp.parentNode && cp.parentNode != document.body)
				cp = cp.parentNode;

			md.w = convert2widget(cp);

		} else md.w = dest;

		md.x1 = e.clientX - md.w.offsetLeft;
		md.y1 = e.clientY - md.w.offsetTop;
		md.w.leave();

		md.dstart();
	};

	obj.enable_drag = function() {
		if(this.__under_drag__) return;
		this.attachEvent('onmousedown', dstart);
		this.runtimeStyle.cursor = 'default';
		this.__under_drag__ = true;

	}; obj.enableDrag = obj.enable_drag;

	obj.disable_drag = function() {
		if(!this.__under_drag__) return;
		this.detachEvent('onmousedown', dstart);
		this.__under_drag__ = undefined;

		md.dstop();

	}; obj.disableDrag = obj.disable_drag;

	obj.setStyle('-moz-user-focus: ignore; -moz-user-input: disabled; -moz-user-select: none;');
	obj.attachEvent('ondragstart', do_skip);
	obj.attachEvent('onselectstart', do_skip);
	obj.attachEvent('onselect', do_skip);

	obj.enable_drag();
};

window.ResizeItem = function(obj, dest) {
	if(!gift.m) gift.wake_up();
	if(obj.__resize_item__) return; obj.__resize_item__ = true;

	var do_skip = function() { return false; };

	var m = gift.m, mr = gift.m.resize;
	var rstart = function(e) {
		e = e || window.event;
		if(PLATFORM == 'GECKO') e.preventDefault();

		mr.r = obj;
		if(!dest) {
			var cp = obj;
			while(cp.parentNode && cp.parentNode != document.body)
				cp = cp.parentNode;

			mr.w = convert2widget(cp);

		} else mr.w = dest;

		mr.x1 = e.clientX; mr.y1 = e.clientY;
		mr.w1 = mr.w.clientWidth;
		mr.h1 = mr.w.clientHeight;

		obj.w_speed = 1; obj.h_speed = 1;

		mr.rstart();
	};

	obj.enable_resize = function() {
		if(this.__under_resize__) return;
		this.attachEvent('onmousedown', rstart);
		this.runtimeStyle.cursor = 'default';
		this.__under_resize__ = true;

	}; obj.enableResize = obj.enable_resize;

	obj.disable_resize = function() {
		if(!this.__under_resize__) return;
		this.detachEvent('onmousedown', rstart);
		this.__under_resize__ = undefined;

		mr.rstop();

	}; obj.disableResize = obj.disable_resize;

	obj.set_style('-moz-user-focus: ignore; -moz-user-input: disabled; -moz-user-select: none;');
	obj.attachEvent('ondragstart', do_skip);
	obj.attachEvent('onselectstart', do_skip);
	obj.attachEvent('onselect', do_skip);

	obj.enable_resize();
};

var _animator_object = function(wid, x, y, t) {
	this.wid = wid; this.name = new_id();
	this.x = x; this.y = y;
	this.t = t; this.st = 1; this.c = 0;
	this.delay = window.CPU;

	this.step = function() {
		if(this.st == 2) { // Run
			if(this.t == 0) {
				this.thread();
				setTimeout('__gift__.ANIMATORS[\"' + this.name + '\"].step()', this.delay);
				return;
			}

			this.c++;
			if(this.c > this.t) return;

			this.thread();
			setTimeout('__gift__.ANIMATORS[\"' + this.name + '\"].step()', this.delay);

		} else if(obj.st == 1) { // Pause | Standby
			setTimeout('__gift__.ANIMATORS[\"' + this.name + '\"].step()', 100);

		} else {
			delete __gift__.ANIMATORS[this.name];
			delete this.wid;
		}
	};

	this.thread = function() {
		var t = this.c;
		var xpos, ypos;
		if(this.x == 'keep') xpos = this.wid.offsetLeft;
		else xpos = eval(this.x);

		if(this.y == 'keep') xpos = this.wid.offsetTop;
		else ypos = eval(this.y);

		this.wid.move(xpos, ypos);
	};

	this.start = function() {
		this.st = 2;
	};

	this.stop = function() {
		this.st = 0;
	};

	this.pause = function() {
		this.st = 1;
	};

	wid.fake_leave();
	__gift__.ANIMATORS[this.name] = this;
	setTimeout('__gift__.ANIMATORS[\"' + this.name + '\"].step()', 1);
};

window.Animator = function(wid, x, y, t) { return new _animator_object(wid, x, y, t); };

window.AnimatorItem = function(wid, x, y, t) {
	wid.animator = new _animator_object(wid, x, y, t);
	wid.start_animator = function() {
		this.animator.start();

	}; wid.startAnimator = wid.start_animator;

	wid.stop_animator = function() {
		this.animator.stop();

	}; wid.stopAnimator = wid.stop_animator;

	wid.pause_animator = function() {
		this.animator.pause();

	}; wid.pauseAnimator = wid.pause_animator;

	return wid;
};

__gift__.ANIMATORS = {};

/////////////////////////////////////////////////////////////////

var _template_re1 = /<!--.*-->/;
var _template_re2 = /^<!--[\s\t\r\n]*|[\s\t\r\n]*-->$/g;

var split_content = function(s) {
	var r = [], c = [], pl = [];
	var s_len = s.length, p = 0, i = 0;
	while(p < s_len) {
		t = s.substring(p, p + 1024).search(_template_re1);
		if(t==-1) { p = p + 960; continue; }
		p = p + t; pl[i++] = p;
		t = s.substring(p, p + 64).search("-->");
		p = p + t + 3; pl[i++] = p;
	}

	var j = 0, w;
	for(var i in pl) { w = s.substring(j, pl[i]);
		r[i] = w; j = pl[i];
	}

	i++; w = s.substring(j, s_len); r[i] = w;
	return r;
};

var template_tag2name = function(s) {
	return s.replace(_template_re2, "");
};

window.Template = function(content) {
	var obj = {tmpl_val: {}, tmpl_replval: {}, tmpl_cont: content};
	var items;
	if(content.join)
		items = content;
	else
		items = split_content(content);

	var ri = [], is_cont = true, j = 0;
	var t17e = template_tag2name;
	for(var i = 0; i < items.length; i++) {
		if(is_cont) {
			ri[j++] = items[i];
			is_cont = false;
		} else {
			ri[j++] = "<!--" + t17e(items[i]) + "-->";
			is_cont = true;
		}

	}; obj.tmpl_cont = ri;

	obj.set_val = function(name, value) {
		obj.tmpl_val["<!--" + name + "-->"] = value;
		return value;

	}; obj.setVal = obj.set_val;

	obj.set_sub = function(from_name, to_name, value) {
		obj.tmpl_replval["<!--" + from_name + "-->"] = {
			end_tag:     "<!--" + to_name + "-->",
			content:      value };
		return value;

	}; obj.setSub = obj.set_sub;

	obj.get_sub = function(from_name, to_name) {
		var start_tag = "<!--" + from_name + "-->";
		var end_tag   = "<!--" + to_name   + "-->";
		var sub_content = [], content = obj.tmpl_cont;
		var r = [], c, started = false, t = 0;
		for(var i in content) {
			c = content[i];
			if(started) { if(c == end_tag) break;
				r[t++] = c;
			} else {
				if(c == start_tag) started = true;
			}
		};
		if(!r.length) return null;
		var sub_tmpl = Template(r);
		return sub_tmpl;

	}; obj.getSub = obj.get_sub;

	obj.clear = function() {
		obj.tmpl_val = {};
		obj.tmpl_replval = {};
	};

	obj.Output = function(tag, attrs) {
		var conf_obj;
		if(tag) {
			if(typeof(tag) == 'string') conf_obj = $body().append(tag, attrs);
			else conf_obj = tag.replace_by($body().append(tag, attrs));

		} else conf_obj = $body().append();

		var content  = obj.tmpl_cont;
		var tmpl_val = obj.tmpl_val;
		var tmpl_replval = obj.tmpl_replval;
		var switch_obj = {}, r = [], t = 0;
		var curr_end_tag  = null, curr_repl_obj = null;
		for(var i in content) {
			var c = content[i];
			if(curr_repl_obj) {
				if(_template_re1.test(c) && c == curr_end_tag) {
					var value = curr_repl_obj.content;
					if(typeof(value) != 'string') {
						var nid = new_id();
						r[t++] = "<span id='" + nid + "'>&nbsp;</span>";
						switch_obj[nid] = value;

					} else r[t++] = value;

					curr_end_tag = null;
					curr_repl_obj = null;
				}
			} else {
				if(_template_re1.test(c)) {
					if(tmpl_replval.hasOwnProperty(c)) {
						curr_repl_obj = tmpl_replval[c];
						curr_end_tag  = curr_repl_obj.end_tag;

					} else if(tmpl_val.hasOwnProperty(c)) {
						var value = tmpl_val[c];
						if(typeof(value) != 'string') {
							var nid = new_id();
							r[t++] = "<span id='" + nid + "'>&nbsp;</span>";
							switch_obj[nid] = value;
						} else r[t++] = value;
					} else r[t++] = c;
				} else  r[t++] = c;
			}
		}

		conf_obj.innerHTML = r.join("");

		for(var i in switch_obj) {
			var rep_obj = switch_obj[i];
			$(i).replace_by(rep_obj);
		}
		return conf_obj;

	}; obj.output = obj.Output;

	return obj;
};

/////////////////////////////////////////////////////////////////

} )();


(function() {
// Nemesis Part

if(window.__nemesis__) return;
   window.__nemesis__ = true;

var nemesis = {}; top.Nemesis = nemesis;
nemesis.Elements  = {};
// ---------------------------------------

if(PLATFORM == 'IE') { (function() { // For IE

nemesis.gb2utf8 = function(data) {
	var glbEncode = [], t, i, j, len;
	gb2utf8_data = data;
	execScript("gb2utf8_data = MidB(gb2utf8_data, 1)+' '", "vbscript");
	t = escape(gb2utf8_data).replace(/%u/g,"").replace(/(.{2})(.{2})/g,"%$2%$1").replace(/%([A-Z].)%(.{2})/g,"@$1$2");
	t = t.split("@");
	i = 0;
	len = t.length;
	while(++i < len){
		j = t[i].substring(0,4);
		if(!glbEncode[j]) {
			gb2utf8_char = eval("0x"+j);
			execScript("gb2utf8_char=Chr(gb2utf8_char)","vbscript");
			glbEncode[j] = escape(gb2utf8_char).substring(1,6);

		}
		t[i] = glbEncode[j] + t[i].substring(4);

	}
	gb2utf8_data = gb2utf8_char = null;
	return unescape(t.join("%")).slice(0,-1);
}

nemesis.XmlHttp = function() {
var xmlhttp = null;
/*@cc_on @*/
/*@if (@_jscript_version >= 5)
try	{ xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); }
catch (e) {
	try	{ xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
	catch (E) { xmlhttp = false; } }
	@end @*/
	return xmlhttp; };

nemesis.XmlDom = function()
{ return new ActiveXObject("Microsoft.XMLDOM"); };

})(); } else { (function() { // For Gecko

nemesis.XmlHttp = function()
{ return xmlhttp = new XMLHttpRequest(); };

Document.prototype.loadXML = function(strXML) {
	var objDOMParser = new DOMParser();
	var objDoc = objDOMParser.parseFromString(strXML, "text/xml");
	while(this.hasChildNodes()) this.removeChild(this.lastChild);
	for(var i=0; i<objDoc.childNodes.length; i++) {
		var objImportedNode = this.importNode(objDoc.childNodes[i], true);
		this.appendChild(objImportedNode); } };

function _Node_getXML() {
	var objXMLSerializer = new XMLSerializer;
	var strXML = objXMLSerializer.serializeToString(this);
	return strXML;
}; Node.prototype.__defineGetter__("xml", _Node_getXML);

nemesis.XmlDom = function()
{ return document.implementation.createDocument("ns", "root", null); };

})(); } // Driver End

var get_pos = function(s, sp, b) {
	var ep = -1, l = 0, r = -b, c;
	var sl = s.length, i = sp;
	while(i < sl) {
		c = s.substring(i, ++i);
		if     (c == "{") l++;
		else if(c == "}") r++;
		if(l == r) {
			if(b == 0 && l == 0) continue;
			ep = i;
			break;
		}
	}
	if(i > sl) return -1;
	return ep - 1; }

var func_rex = /^[^f]*function[^(]*/;

var get_cont = function(func) {
	return func.toString().replace(func_rex, "function");
};

var get_body = function(func) {
	var code = get_cont(func);
	return code.substring(get_pos(code, 0, -1) + 1, get_pos(code, 0, 0 ) );
};

// ---------------------------------------
var get_xmlhttp = function(host, query, cookie) {
	var xh = top.Nemesis.XmlHttp();
	var xh_send = function() {
		if(PLATFORM == 'GECKO')
			xh.overrideMimeType('text/html;charset=' +
				( query.hasOwnProperty('encoding')? query.encoding: DEFAULT_ENCODING ) );

		var set_heads = function() {
			xh.setRequestHeader("Host", host.replace(/^https?:\/{2}([:\[\]\-\w\.]+)\/?.*/, '$1'));
			if(cookie) xh.setRequestHeader("Cookie", cookie);
			if(query.hasOwnProperty("headers")) {
				var items = query.headers;
				for(var name in items) xh.setRequestHeader(name, items[name]);
			}
		};

		var method = query.hasOwnProperty("method")? query.method.toUpperCase() : "GET";

		if(method == "GET") {
			if(query.hasOwnProperty("qstr")) xh.open("GET", host + "?" + query.qstr, true);
			else xh.open("GET", host, true);
			set_heads();
			xh.send(null);
		} else {
			xh.open(method, host, true);
			set_heads();
			if(query.hasOwnProperty("qstr")) {
				var qstr = query.qstr;
				xh.setRequestHeader("Content-Length", "" + qstr.length);
				xh.send(qstr);
			} else {
				xh.send(null);
			}
		}
	};
	return [xh, xh_send];
};

var timeloop_code = function() { (function() {
	var $TIMEOUT_ID = new_id();
	var $TIMEOUT_ST = 2;
	var $INIT_TIMEOUT = $NEMESIS-TIMEOUT, $CURR_TIMEOUT = $NEMESIS-TIMEOUT;
	var $ONLOOP = function() {
		$NEMESIS-BODY;
		return true;
	};

	top.Nemesis.Elements[$TIMEOUT_ID] = function() {
		if($TIMEOUT_ST == 0) return;
		if(!$ONLOOP()) return;
		if( $TIMEOUT_ST == 2)
		setTimeout("top.Nemesis.Elements[\""+$TIMEOUT_ID+"\"]()", $CURR_TIMEOUT);
	};
	top.Nemesis.Elements[$TIMEOUT_ID]();

} )(); }; var timeloop_code = get_body(timeloop_code);

var timeloop_continue = function() { (function() {
	setTimeout("top.Nemesis.Elements[\""+$TIMEOUT_ID+"\"]()", $CURR_TIMEOUT);

})(); return true;  }; var timeloop_continue = '{ ' + get_body(timeloop_continue) + ' }';

var timeloop_break    = function() { (function() {
	$TIMEOUT_ST = 0;

})(); return false; }; var timeloop_break    = '{ ' + get_body(timeloop_break) + ' }';

var http_code = function() { (function() {
	var cookie = null;
	try      { cookie = $COOKIE; }
	catch(e) { cookie = null   ; }
	var $HTTP = get_xmlhttp($NEMESIS-HOST, $NEMESIS-QUERY, cookie);
	var $HTTP_SEND = $HTTP[1];
	$HTTP = $HTTP[0];
	var $ONREADY = function($SUCCESS, $INFO) {
		var $COOKIE = $HTTP.getResponseHeader("Set-Cookie"), $RESULT = null;
		if($SUCCESS) {
			if(PLATFORM == 'IE' && ( $NEMESIS-QUERY ).encoding.toLowerCase() != 'utf-8') $RESULT = Nemesis.gb2utf8($HTTP.responseBody);
			else $RESULT = $HTTP.responseText;
		}
		$NEMESIS-BODY;
	};
	$HTTP.onreadystatechange = function() {
		if($HTTP.readyState == 4) {
			if($HTTP.status == 200)	{
				$ONREADY(true, $HTTP.statusText);
			} else
				$ONREADY(false, $HTTP.statusText);
		}
	};
	try { $HTTP_SEND(); } catch(e) {
		$ONREADY(false, e);
	}

	delete $HTTP_SEND;

})(); }; var http_code = get_body(http_code);

// ---------------------------------------
var timeloop_rex  = /while[\s\t]*\([\s\t]*timeout\(([^)]+)\)[\s\t]*\)[^{]*\{/;

var switch_singel_timeloop = function(code, p) {
	var pos1 = get_pos(code, p, -1);
	var pos2 = get_pos(code, p, 0);
	var c = code.substring(pos1 + 1, pos2);
	var init_timeout = code.substring(p, pos1+1).match(timeloop_rex)[1];
	var rc = timeloop_code.replace(/\$NEMESIS\s*-\s*TIMEOUT/g, init_timeout);
	rc = rc.replace(/\$NEMESIS\s*-\s*BODY;/g , c);
	rc = rc.replace(/continue[\s\t]*[\n\r;]/g, timeloop_continue);
	rc = rc.replace(/break[\s\t]*[\n\r;]/g   , timeloop_break   );
	return code.substring(0, p) + rc + code.substring(pos2 + 1);
};

var install_timeloop = function(code) {
	var p = -1;
	while(true) {
		p = code.search(timeloop_rex);
		if(p != -1) code = switch_singel_timeloop(code, p);
		else break;
	};
	return code;
};

// ---------------------------------------
var http_rex = /([^\n\r>;]+)[\s\t\n\r]*>>[\s\t\n\r]*host\(([^)]*)\)[\s\t]*[\n\r;]/;

var switch_singel_http = function(code, p) {
	var pos = get_pos(code, p, 1);
	var s = code.substring(p, pos);
	var q = s.match(http_rex)[1];
	var a = s.match(http_rex)[2];
	var c = s.replace(http_rex, "");
	var rc = http_code.replace(/\$NEMESIS\s*-\s*HOST/g, a);
	rc = rc.replace(/\$NEMESIS\s*-\s*QUERY/g , q);
	rc = rc.replace(/\$NEMESIS\s*-\s*BODY;/g , c);
	return code.substring(0, p) + rc + code.substring(pos);
};

var install_http = function(code) {
	var p = -1;
	while(true) {
		p = code.search(http_rex);
		if(p != -1) code = switch_singel_http(code, p);
		else break;
	};
	return code;
};

// ---------------------------------------

nemesis.compile = function(func) {
	var code = get_cont(func);
	code = install_timeloop(code);
	code = install_http(code);
	eval("var cfunc = " + code);
	return cfunc; };

nemesis.SimpleQuery = function(method, encoding) {
	var query = { headers : {
			"Accept"         : "text/html, text/plain, text/sgml, text/xml",
			"User-Agent"     : "Mozilla/4.0",
			"Content-type"   : "application/x-www-form-urlencoded"
		} };

	query.method = method? method.toUpperCase() : 'GET';
	query.encoding = encoding || DEFAULT_ENCODING;
	return query;
};

nemesis.CGIQuery = function(cgiv, attrs, headers) {
	var query = nemesis.SimpleQuery();
	query.method = 'POST';

    var qstr = [], i = 0;
	if(cgiv) for(var name in cgiv) qstr[i++] = encodeURIComponent(name) + "=" + encodeURIComponent(cgiv[name]);
	query.qstr = qstr.join("&");

	for(var i in attrs) query[i] = attrs[i];
	for(var i in headers) query.headers[i] = headers[i];

	return query;
};

window.NemesisFunction = nemesis.compile;
window.SimpleQuery = nemesis.SimpleQuery;
window.CGIQuery = nemesis.CGIQuery;

// ---------------------------------------
})();