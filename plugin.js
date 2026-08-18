var plugin = function(e, t, n) {
    "use strict";
    const a = [ "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม" ], o = [ "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค." ], r = [ "อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์" ], l = [ "อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส." ], s = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ], i = s.map(e => e.slice(0, 3)), d = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ], c = d.map(e => e.slice(0, 3)), u = /^(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?$/, p = /^\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2})?(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?$/, m = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/, f = (e, t) => {
        let n = String(Math.abs(e));
        for (;n.length < t; ) n = "0" + n;
        return (e < 0 ? "-" : "") + n;
    };
    function h(e, t, n) {
        if ("utc" === e) return 0;
        if ("local" === e) {
            return -(n instanceof Date && !isNaN(n.getTime()) ? n : new Date).getTimezoneOffset();
        }
        if ("custom" === e) {
            const e = Number(t);
            return isNaN(e) ? 0 : Math.round(60 * e);
        }
        if ("number" == typeof e) return Math.round(60 * e);
        if ("string" == typeof e && /^[+-]?\d/.test(e)) {
            const t = /^([+-]?)(\d{1,2})(?::?(\d{2}))?$/.exec(e.trim());
            if (t) {
                return ("-" === t[1] ? -1 : 1) * (60 * parseInt(t[2], 10) + (t[3] ? parseInt(t[3], 10) : 0));
            }
        }
        return 420;
    }
    function g(e) {
        return "string" == typeof e && u.test(e.trim());
    }
    function b(e) {
        if (null == e || "" === e) return null;
        if (e instanceof Date) return isNaN(e.getTime()) ? null : e;
        if ("number" == typeof e) return null;
        if ("string" != typeof e) return null;
        const t = e.trim();
        if (!t) return null;
        if (p.test(t)) {
            let e = t.replace(" ", "T");
            /(?:Z|[+-]\d{2}:?\d{2})$/.test(e) || (e += /T/.test(e) ? "Z" : "T00:00:00Z");
            const n = new Date(e);
            return isNaN(n.getTime()) ? null : n;
        }
        const n = m.exec(t);
        if (n) {
            const e = new Date(Date.UTC(parseInt(n[3], 10), parseInt(n[2], 10) - 1, parseInt(n[1], 10), n[4] ? parseInt(n[4], 10) : 0, n[5] ? parseInt(n[5], 10) : 0, n[6] ? parseInt(n[6], 10) : 0));
            return isNaN(e.getTime()) ? null : e;
        }
        return null;
    }
    function v(e, t, n) {
        const u = n || {};
        if (!(e instanceof Date) || isNaN(e.getTime())) return "";
        const p = null == u.offsetMinutes ? 0 : u.offsetMinutes, m = new Date(e.getTime() + 6e4 * p), h = m.getUTCFullYear() + (u.buddhistEra ? 543 : 0), g = m.getUTCMonth(), b = m.getUTCDay(), v = m.getUTCHours(), y = v % 12 == 0 ? 12 : v % 12, x = u.thaiMonthNames ? a : s, w = u.thaiMonthNames ? o : i, C = u.thaiMonthNames || u.thaiDayNames ? r : d, _ = u.thaiMonthNames || u.thaiDayNames ? l : c, F = Math.abs(p), k = (p < 0 ? "-" : "+") + f(Math.floor(F / 60), 2) + ":" + f(F % 60, 2), S = {
            YYYY: () => f(h, 4),
            YY: () => f(h % 100, 2),
            MMMM: () => x[g],
            MMM: () => w[g],
            MM: () => f(g + 1, 2),
            M: () => String(g + 1),
            DD: () => f(m.getUTCDate(), 2),
            D: () => String(m.getUTCDate()),
            dddd: () => C[b],
            ddd: () => _[b],
            HH: () => f(v, 2),
            H: () => String(v),
            hh: () => f(y, 2),
            h: () => String(y),
            mm: () => f(m.getUTCMinutes(), 2),
            m: () => String(m.getUTCMinutes()),
            ss: () => f(m.getUTCSeconds(), 2),
            s: () => String(m.getUTCSeconds()),
            SSS: () => f(m.getUTCMilliseconds(), 3),
            A: () => v < 12 ? "AM" : "PM",
            a: () => v < 12 ? "am" : "pm",
            ZZ: () => k,
            Z: () => k
        };
        return String(t).replace(/\[([^\]]*)\]|YYYY|YY|MMMM|MMM|MM|M|dddd|ddd|DD|D|HH|H|hh|h|mm|m|SSS|ss|s|A|a|ZZ|Z/g, (e, t) => {
            if (void 0 !== t) return t;
            const n = S[e];
            return n ? n() : e;
        });
    }
    function y(e, t) {
        const n = t || {}, a = n.pattern || "DD/MM/YYYY";
        if (g(e)) {
            const t = u.exec(String(e).trim());
            return v(new Date(Date.UTC(1970, 0, 1, parseInt(t[1], 10), parseInt(t[2], 10), t[3] ? parseInt(t[3], 10) : 0)), a, {
                offsetMinutes: 0,
                buddhistEra: !1,
                thaiMonthNames: n.thaiMonthNames
            });
        }
        const o = b(e);
        if (!o) return null;
        if ("iso" === a) return o.toISOString();
        const r = function(e) {
            return e instanceof Date || "string" == typeof e && /(?:Z|[+-]\d{2}:?\d{2})$/.test(e.trim());
        }(e);
        return v(o, a, {
            offsetMinutes: r ? h(n.timezone, n.tzOffsetHours, o) : 0,
            buddhistEra: n.buddhistEra,
            thaiMonthNames: n.thaiMonthNames
        });
    }
    let x = 0;
    const w = [ "_rev", "_viewId", "_partition", "tableId", "type" ];
    function C(e) {
        return String(e).replace(/[_-]+/g, " ").replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/\s+/g, " ").trim().replace(/\b\w/g, e => e.toUpperCase());
    }
    function _(e, t, n) {
        let a = [], o = !1;
        if (e && Object.keys(e).length) a = Object.keys(e), o = !0; else if (t && t.length) {
            const e = {};
            t.slice(0, 25).forEach(t => {
                t && "object" == typeof t && Object.keys(t).forEach(t => e[t] = !0);
            }), a = Object.keys(e);
        }
        const r = String(n || "").split(",").map(e => e.trim()).filter(Boolean);
        return a.filter(e => -1 === r.indexOf(e) && (!!o || -1 === w.indexOf(e) && ("_id" === e || "_" !== e.charAt(0))));
    }
    function F(e, t) {
        return e.filter(e => "_id" !== e).map(e => {
            const n = k();
            if (n.field = e, n.header = C(e), function(e, t) {
                const n = e && e[t];
                if (!n) return !1;
                const a = "string" == typeof n ? n : n.type;
                return "datetime" === a || "date" === a;
            }(t, e)) {
                n.format = "date";
                const a = t[e];
                a && a.timeOnly && (n.datePattern = "HH:mm:ss");
            } else (function(e, t) {
                const n = e && e[t];
                if (!n) return !1;
                const a = "string" == typeof n ? n : n.type;
                return "number" === a || "bigint" === a;
            })(t, e) && (n.format = "number", n.align = "right");
            return n;
        });
    }
    function k() {
        return {
            id: "c" + Date.now().toString(36) + (x++).toString(36),
            field: "",
            header: "",
            include: !0,
            format: "auto",
            datePattern: "",
            tz: "",
            decimals: null,
            align: "left",
            width: 0,
            headerBg: "",
            headerColor: "",
            bodyBg: "",
            bodyColor: ""
        };
    }
    const S = [ "left", "center", "right" ], D = [ "auto", "text", "number", "date" ];
    function M(e) {
        return Array.isArray(e) ? e.filter(e => e && "object" == typeof e).map(e => {
            const t = k(), n = null != e.field ? String(e.field) : null != e.sourceField ? String(e.sourceField) : "";
            return {
                id: e.id ? String(e.id) : t.id,
                field: n,
                header: null != e.header ? String(e.header) : C(n),
                include: !1 !== e.include,
                format: -1 !== D.indexOf(e.format) ? e.format : "auto",
                datePattern: null != e.datePattern ? String(e.datePattern) : "",
                tz: null != e.tz && "" !== e.tz ? e.tz : "",
                decimals: null === e.decimals || void 0 === e.decimals || "" === e.decimals ? null : Math.max(0, Math.min(6, parseInt(e.decimals, 10) || 0)),
                align: -1 !== S.indexOf(e.align) ? e.align : "left",
                width: Number(e.width) > 0 ? Number(e.width) : 0,
                headerBg: e.headerBg ? String(e.headerBg) : "",
                headerColor: e.headerColor ? String(e.headerColor) : "",
                bodyBg: e.bodyBg ? String(e.bodyBg) : "",
                bodyColor: e.bodyColor ? String(e.bodyColor) : ""
            };
        }) : [];
    }
    function $(e) {
        if (!e || !String(e).trim()) return null;
        try {
            const t = M(JSON.parse(e));
            return t.length ? t : null;
        } catch (e) {
            return null;
        }
    }
    function T(e) {
        const t = e.map(e => {
            const t = {
                field: e.field,
                header: e.header
            };
            return !1 === e.include && (t.include = !1), e.format && "auto" !== e.format && (t.format = e.format), 
            e.datePattern && (t.datePattern = e.datePattern), e.tz && (t.tz = e.tz), null != e.decimals && (t.decimals = e.decimals), 
            e.align && "left" !== e.align && (t.align = e.align), e.width && (t.width = e.width), 
            e.headerBg && (t.headerBg = e.headerBg), e.headerColor && (t.headerColor = e.headerColor), 
            e.bodyBg && (t.bodyBg = e.bodyBg), e.bodyColor && (t.bodyColor = e.bodyColor), t;
        });
        return JSON.stringify(t, null, 2);
    }
    function z(e, t) {
        const n = Number(e);
        if (!isFinite(n)) return {
            text: String(null == e ? "" : e),
            number: null
        };
        if (null == t) return {
            text: String(n),
            number: n
        };
        const a = n.toFixed(t).split(".");
        return a[0] = a[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), {
            text: a.join("."),
            number: n
        };
    }
    function N(e) {
        if (null == e) return "";
        if ("string" == typeof e) return e;
        if ("boolean" == typeof e) return e ? "TRUE" : "FALSE";
        if ("number" == typeof e) return String(e);
        if (e instanceof Date) return e.toISOString();
        if (Array.isArray(e)) return e.map(e => e && "object" == typeof e ? e.primaryDisplay || e.name || e._id || JSON.stringify(e) : e).filter(e => null != e && "" !== e).join(", ");
        if ("object" == typeof e) {
            if (e.primaryDisplay) return String(e.primaryDisplay);
            if (e.name) return String(e.name);
            try {
                return JSON.stringify(e);
            } catch (t) {
                return String(e);
            }
        }
        return String(e);
    }
    function B(e, t, n) {
        const a = n || {}, o = function(e, t) {
            if (e && t) {
                if (Object.prototype.hasOwnProperty.call(e, t)) return e[t];
                if (-1 !== t.indexOf(".")) return t.split(".").reduce((e, t) => null == e ? void 0 : e[t], e);
            }
        }(t, e.field);
        if (null == o || "" === o) return {
            text: "",
            number: null
        };
        const r = a.dateSettings || {}, l = {
            pattern: e.datePattern || r.pattern,
            timezone: e.tz || r.timezone,
            tzOffsetHours: r.tzOffsetHours,
            buddhistEra: r.buddhistEra,
            thaiMonthNames: r.thaiMonthNames
        };
        if ("date" === e.format) {
            const e = y(o, l);
            return {
                text: null == e ? N(o) : e,
                number: null
            };
        }
        if ("number" === e.format) return z(o, e.decimals);
        if ("text" === e.format) return {
            text: N(o),
            number: null
        };
        if ("number" == typeof o) return z(o, e.decimals);
        if (!1 !== a.autoDetectDates && (o instanceof Date || g(o) || b(o))) {
            const e = y(o, l);
            if (null != e) return {
                text: e,
                number: null
            };
        }
        return {
            text: N(o),
            number: null
        };
    }
    function Y(e, t) {
        void 0 === t && (t = {});
        var n = t.insertAt;
        if (e && "undefined" != typeof document) {
            var a = document.head || document.getElementsByTagName("head")[0], o = document.createElement("style");
            o.type = "text/css", "top" === n && a.firstChild ? a.insertBefore(o, a.firstChild) : a.appendChild(o), 
            o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(document.createTextNode(e));
        }
    }
    function O(e, t, n) {
        const a = e.slice();
        return a[58] = t[n], a[60] = n, a;
    }
    function E(e, t, n) {
        const a = e.slice();
        return a[61] = t[n], a;
    }
    function I(e, t, n) {
        const a = e.slice();
        return a[61] = t[n], a;
    }
    function H(e, t, n) {
        const a = e.slice();
        return a[61] = t[n], a[66] = t, a[67] = n, a;
    }
    function P(e, t, n) {
        const a = e.slice();
        return a[68] = t[n], a;
    }
    function A(e, t, n) {
        const a = e.slice();
        return a[71] = t[n], a;
    }
    function j(e, t, n) {
        const a = e.slice();
        return a[74] = t[n], a;
    }
    function V(e) {
        let n, a, o = e[4]("localOverride") + "";
        return {
            c() {
                n = t.text("· "), a = t.text(o);
            },
            m(e, o) {
                t.insert(e, n, o), t.insert(e, a, o);
            },
            p(e, n) {
                16 & n[0] && o !== (o = e[4]("localOverride") + "") && t.set_data(a, o);
            },
            d(e) {
                e && t.detach(n), e && t.detach(a);
            }
        };
    }
    function R(e) {
        let n, a;
        return {
            c() {
                n = t.element("span"), a = t.text(e[7]), t.attr(n, "class", "ec-toast svelte-lgwuc9");
            },
            m(e, o) {
                t.insert(e, n, o), t.append(n, a);
            },
            p(e, n) {
                128 & n[0] && t.set_data(a, e[7]);
            },
            d(e) {
                e && t.detach(n);
            }
        };
    }
    function L(e) {
        let n, a, o, r, l, s, i, d, c, u, p, m, f, h, g, b, v, y, x, w, C, _, F, k, S, D, M, $, T, z, N, B, Y, O, E, I, P, A = e[4]("include") + "", j = e[4]("header") + "", V = e[4]("field") + "", R = e[4]("type") + "", L = e[4]("pattern") + "", U = e[4]("timezone") + "", W = e[4]("align") + "", J = e[4]("width") + "", Z = e[4]("headerColors") + "", X = e[4]("cellColors") + "", q = e[4]("order") + "", Q = [], K = new Map, ee = e[0];
        const te = e => e[61].id;
        for (let t = 0; t < ee.length; t += 1) {
            let n = H(e, ee, t), a = te(n);
            K.set(a, Q[t] = G(a, n));
        }
        return {
            c() {
                n = t.element("div"), a = t.element("span"), o = t.space(), r = t.element("span"), 
                l = t.text(A), s = t.space(), i = t.element("span"), d = t.text(j), c = t.space(), 
                u = t.element("span"), p = t.text(V), m = t.space(), f = t.element("span"), h = t.text(R), 
                g = t.space(), b = t.element("span"), v = t.text(L), y = t.space(), x = t.element("span"), 
                w = t.text(U), C = t.space(), _ = t.element("span"), F = t.text(W), k = t.space(), 
                S = t.element("span"), D = t.text(J), M = t.space(), $ = t.element("span"), T = t.text(Z), 
                z = t.space(), N = t.element("span"), B = t.text(X), Y = t.space(), O = t.element("span"), 
                E = t.text(q), I = t.space();
                for (let e = 0; e < Q.length; e += 1) Q[e].c();
                P = t.empty(), t.attr(n, "class", "ec-grid ec-grid-head svelte-lgwuc9");
            },
            m(e, H) {
                t.insert(e, n, H), t.append(n, a), t.append(n, o), t.append(n, r), t.append(r, l), 
                t.append(n, s), t.append(n, i), t.append(i, d), t.append(n, c), t.append(n, u), 
                t.append(u, p), t.append(n, m), t.append(n, f), t.append(f, h), t.append(n, g), 
                t.append(n, b), t.append(b, v), t.append(n, y), t.append(n, x), t.append(x, w), 
                t.append(n, C), t.append(n, _), t.append(_, F), t.append(n, k), t.append(n, S), 
                t.append(S, D), t.append(n, M), t.append(n, $), t.append($, T), t.append(n, z), 
                t.append(n, N), t.append(N, B), t.append(n, Y), t.append(n, O), t.append(O, E), 
                t.insert(e, I, H);
                for (let t = 0; t < Q.length; t += 1) Q[t] && Q[t].m(e, H);
                t.insert(e, P, H);
            },
            p(e, n) {
                16 & n[0] && A !== (A = e[4]("include") + "") && t.set_data(l, A), 16 & n[0] && j !== (j = e[4]("header") + "") && t.set_data(d, j), 
                16 & n[0] && V !== (V = e[4]("field") + "") && t.set_data(p, V), 16 & n[0] && R !== (R = e[4]("type") + "") && t.set_data(h, R), 
                16 & n[0] && L !== (L = e[4]("pattern") + "") && t.set_data(v, L), 16 & n[0] && U !== (U = e[4]("timezone") + "") && t.set_data(w, U), 
                16 & n[0] && W !== (W = e[4]("align") + "") && t.set_data(F, W), 16 & n[0] && J !== (J = e[4]("width") + "") && t.set_data(D, J), 
                16 & n[0] && Z !== (Z = e[4]("headerColors") + "") && t.set_data(T, Z), 16 & n[0] && X !== (X = e[4]("cellColors") + "") && t.set_data(B, X), 
                16 & n[0] && q !== (q = e[4]("order") + "") && t.set_data(E, q), 1005619 & n[0] && (ee = e[0], 
                Q = t.update_keyed_each(Q, n, te, 1, e, ee, K, P.parentNode, t.destroy_block, G, P, H));
            },
            d(e) {
                e && t.detach(n), e && t.detach(I);
                for (let t = 0; t < Q.length; t += 1) Q[t].d(e);
                e && t.detach(P);
            }
        };
    }
    function U(e) {
        let n, a, o = e[4]("noColumns") + "";
        return {
            c() {
                n = t.element("div"), a = t.text(o), t.attr(n, "class", "ec-empty svelte-lgwuc9");
            },
            m(e, o) {
                t.insert(e, n, o), t.append(n, a);
            },
            p(e, n) {
                16 & n[0] && o !== (o = e[4]("noColumns") + "") && t.set_data(a, o);
            },
            d(e) {
                e && t.detach(n);
            }
        };
    }
    function W(e) {
        let n, a, o, r = e[74] + "";
        return {
            c() {
                n = t.element("option"), a = t.text(r), n.__value = o = e[74], n.value = n.__value;
            },
            m(e, o) {
                t.insert(e, n, o), t.append(n, a);
            },
            p(e, l) {
                2 & l[0] && r !== (r = e[74] + "") && t.set_data(a, r), 2 & l[0] && o !== (o = e[74]) && (n.__value = o, 
                n.value = n.__value);
            },
            d(e) {
                e && t.detach(n);
            }
        };
    }
    function J(e) {
        let n, a, o, r = e[11], l = [];
        for (let t = 0; t < r.length; t += 1) l[t] = X(A(e, r, t));
        function s() {
            e[35].call(n, e[66], e[67]);
        }
        return {
            c() {
                n = t.element("select");
                for (let e = 0; e < l.length; e += 1) l[e].c();
                t.attr(n, "class", "ec-input svelte-lgwuc9"), void 0 === e[61].datePattern && t.add_render_callback(s);
            },
            m(r, i) {
                t.insert(r, n, i);
                for (let e = 0; e < l.length; e += 1) l[e] && l[e].m(n, null);
                t.select_option(n, e[61].datePattern, !0), a || (o = [ t.listen(n, "change", s), t.listen(n, "change", e[36]) ], 
                a = !0);
            },
            p(a, o) {
                if (e = a, 2064 & o[0]) {
                    let t;
                    for (r = e[11], t = 0; t < r.length; t += 1) {
                        const a = A(e, r, t);
                        l[t] ? l[t].p(a, o) : (l[t] = X(a), l[t].c(), l[t].m(n, null));
                    }
                    for (;t < l.length; t += 1) l[t].d(1);
                    l.length = r.length;
                }
                3 & o[0] && t.select_option(n, e[61].datePattern);
            },
            d(e) {
                e && t.detach(n), t.destroy_each(l, e), a = !1, t.run_all(o);
            }
        };
    }
    function Z(e) {
        let n, a, o, r;
        function l() {
            e[33].call(n, e[66], e[67]);
        }
        return {
            c() {
                n = t.element("input"), t.attr(n, "class", "ec-input ec-narrow svelte-lgwuc9"), 
                t.attr(n, "type", "number"), t.attr(n, "min", "0"), t.attr(n, "max", "6"), t.attr(n, "placeholder", a = e[4]("decimals"));
            },
            m(a, s) {
                t.insert(a, n, s), t.set_input_value(n, e[61].decimals), o || (r = [ t.listen(n, "input", l), t.listen(n, "input", e[34]) ], 
                o = !0);
            },
            p(o, r) {
                e = o, 16 & r[0] && a !== (a = e[4]("decimals")) && t.attr(n, "placeholder", a), 
                3 & r[0] && t.to_number(n.value) !== e[61].decimals && t.set_input_value(n, e[61].decimals);
            },
            d(e) {
                e && t.detach(n), o = !1, t.run_all(r);
            }
        };
    }
    function X(e) {
        let n, a, o = ("" === e[71].value ? e[4]("inherit") : e[71].label) + "";
        return {
            c() {
                n = t.element("option"), a = t.text(o), n.__value = e[71].value, n.value = n.__value;
            },
            m(e, o) {
                t.insert(e, n, o), t.append(n, a);
            },
            p(e, n) {
                16 & n[0] && o !== (o = ("" === e[71].value ? e[4]("inherit") : e[71].label) + "") && t.set_data(a, o);
            },
            d(e) {
                e && t.detach(n);
            }
        };
    }
    function q(e) {
        let n, a, o = ("" === e[68].value ? e[4]("inherit") : e[68].label) + "";
        return {
            c() {
                n = t.element("option"), a = t.text(o), n.__value = e[68].value, n.value = n.__value;
            },
            m(e, o) {
                t.insert(e, n, o), t.append(n, a);
            },
            p(e, n) {
                16 & n[0] && o !== (o = ("" === e[68].value ? e[4]("inherit") : e[68].label) + "") && t.set_data(a, o);
            },
            d(e) {
                e && t.detach(n);
            }
        };
    }
    function G(e, n) {
        let a, o, r, l, s, i, d, c, u, p, m, f, h, g, b, v, y, x, w, C, _, F, k, S, D, M, $, T, z, N, B, Y, O, E, I, H, A, V, R, L, U, X, G, Q, K, ee, te, ne, ae, oe, le, se, ie, de, ce, ue, pe, me, fe, he, ge, be, ve, ye, xe, we, Ce, _e, Fe, ke, Se, De, Me, $e, Te, ze, Ne, Be = re(n[67]) + "", Ye = n[4]("typeAuto") + "", Oe = n[4]("typeText") + "", Ee = n[4]("typeNumber") + "", Ie = n[4]("typeDate") + "";
        function He() {
            n[25].call(s, n[66], n[67]);
        }
        function Pe() {
            n[27].call(d, n[66], n[67]);
        }
        let Ae = n[1], je = [];
        for (let e = 0; e < Ae.length; e += 1) je[e] = W(j(n, Ae, e));
        function Ve() {
            n[29].call(p, n[66], n[67]);
        }
        function Re() {
            return n[30](n[61]);
        }
        function Le() {
            n[31].call(h, n[66], n[67]);
        }
        function Ue(e, t) {
            return "number" === e[61].format ? Z : J;
        }
        let We = Ue(n), Je = We(n), Ze = n[12], Xe = [];
        for (let e = 0; e < Ze.length; e += 1) Xe[e] = q(P(n, Ze, e));
        function qe() {
            n[37].call(S, n[66], n[67]);
        }
        function Ge() {
            n[39].call(M, n[66], n[67]);
        }
        function Qe() {
            n[41].call(B, n[66], n[67]);
        }
        function Ke(...e) {
            return n[43](n[61], n[66], n[67], ...e);
        }
        function et(...e) {
            return n[44](n[61], n[66], n[67], ...e);
        }
        function tt() {
            return n[45](n[61], n[66], n[67]);
        }
        function nt(...e) {
            return n[46](n[61], n[66], n[67], ...e);
        }
        function at(...e) {
            return n[47](n[61], n[66], n[67], ...e);
        }
        function ot() {
            return n[48](n[61], n[66], n[67]);
        }
        function rt() {
            return n[49](n[61]);
        }
        function lt() {
            return n[50](n[61]);
        }
        function st() {
            return n[51](n[61]);
        }
        function it() {
            return n[52](n[61]);
        }
        return {
            key: e,
            first: null,
            c() {
                a = t.element("div"), o = t.element("span"), r = t.text(Be), l = t.space(), s = t.element("input"), 
                i = t.space(), d = t.element("input"), u = t.space(), p = t.element("select"), m = t.element("option"), 
                m.textContent = "—";
                for (let e = 0; e < je.length; e += 1) je[e].c();
                f = t.space(), h = t.element("select"), g = t.element("option"), b = t.text(Ye), 
                v = t.element("option"), y = t.text(Oe), x = t.element("option"), w = t.text(Ee), 
                C = t.element("option"), _ = t.text(Ie), F = t.space(), Je.c(), k = t.space(), S = t.element("select");
                for (let e = 0; e < Xe.length; e += 1) Xe[e].c();
                D = t.space(), M = t.element("select"), $ = t.element("option"), $.textContent = "◀", 
                T = t.element("option"), T.textContent = "◆", z = t.element("option"), z.textContent = "▶", 
                N = t.space(), B = t.element("input"), Y = t.space(), O = t.element("span"), E = t.element("input"), 
                A = t.space(), V = t.element("input"), U = t.space(), X = t.element("button"), G = t.text("↺"), 
                K = t.space(), ee = t.element("span"), te = t.element("input"), oe = t.space(), 
                le = t.element("input"), de = t.space(), ce = t.element("button"), ue = t.text("↺"), 
                me = t.space(), fe = t.element("span"), he = t.element("button"), ge = t.text("▲"), 
                ve = t.space(), ye = t.element("button"), xe = t.text("▼"), Ce = t.space(), _e = t.element("button"), 
                Fe = t.text("⧉"), Se = t.space(), De = t.element("button"), Me = t.text("✕"), Te = t.space(), 
                t.attr(o, "class", "ec-letter svelte-lgwuc9"), t.attr(s, "class", "ec-check svelte-lgwuc9"), 
                t.attr(s, "type", "checkbox"), t.attr(d, "class", "ec-input svelte-lgwuc9"), t.attr(d, "type", "text"), 
                t.attr(d, "placeholder", c = n[4]("header")), m.__value = "", m.value = m.__value, 
                t.attr(p, "class", "ec-input svelte-lgwuc9"), void 0 === n[61].field && t.add_render_callback(Ve), 
                g.__value = "auto", g.value = g.__value, v.__value = "text", v.value = v.__value, 
                x.__value = "number", x.value = x.__value, C.__value = "date", C.value = C.__value, 
                t.attr(h, "class", "ec-input svelte-lgwuc9"), void 0 === n[61].format && t.add_render_callback(Le), 
                t.attr(S, "class", "ec-input svelte-lgwuc9"), void 0 === n[61].tz && t.add_render_callback(qe), 
                $.__value = "left", $.value = $.__value, T.__value = "center", T.value = T.__value, 
                z.__value = "right", z.value = z.__value, t.attr(M, "class", "ec-input svelte-lgwuc9"), 
                void 0 === n[61].align && t.add_render_callback(Ge), t.attr(B, "class", "ec-input ec-narrow svelte-lgwuc9"), 
                t.attr(B, "type", "number"), t.attr(B, "min", "0"), t.attr(B, "max", "120"), t.attr(E, "type", "color"), 
                t.attr(E, "title", I = n[4]("headerColors") + " - background"), E.value = H = n[61].headerBg || n[5].headerBg || "#1F6FEB", 
                t.attr(E, "class", "svelte-lgwuc9"), t.attr(V, "type", "color"), t.attr(V, "title", R = n[4]("headerColors") + " - text"), 
                V.value = L = n[61].headerColor || n[5].headerColor || "#FFFFFF", t.attr(V, "class", "svelte-lgwuc9"), 
                t.attr(X, "class", "ec-mini svelte-lgwuc9"), t.attr(X, "title", Q = n[4]("inherit")), 
                t.attr(O, "class", "ec-colors svelte-lgwuc9"), t.attr(te, "type", "color"), t.attr(te, "title", ne = n[4]("cellColors") + " - background"), 
                te.value = ae = n[61].bodyBg || n[5].bodyBg || "#FFFFFF", t.attr(te, "class", "svelte-lgwuc9"), 
                t.attr(le, "type", "color"), t.attr(le, "title", se = n[4]("cellColors") + " - text"), 
                le.value = ie = n[61].bodyColor || n[5].bodyColor || "#111827", t.attr(le, "class", "svelte-lgwuc9"), 
                t.attr(ce, "class", "ec-mini svelte-lgwuc9"), t.attr(ce, "title", pe = n[4]("inherit")), 
                t.attr(ee, "class", "ec-colors svelte-lgwuc9"), t.attr(he, "class", "ec-mini svelte-lgwuc9"), 
                t.attr(he, "title", be = n[4]("moveUp")), t.attr(ye, "class", "ec-mini svelte-lgwuc9"), 
                t.attr(ye, "title", we = n[4]("moveDown")), t.attr(_e, "class", "ec-mini svelte-lgwuc9"), 
                t.attr(_e, "title", ke = n[4]("duplicate")), t.attr(De, "class", "ec-mini ec-danger svelte-lgwuc9"), 
                t.attr(De, "title", $e = n[4]("remove")), t.attr(fe, "class", "ec-ops svelte-lgwuc9"), 
                t.attr(a, "class", "ec-grid ec-grid-row svelte-lgwuc9"), this.first = a;
            },
            m(e, c) {
                t.insert(e, a, c), t.append(a, o), t.append(o, r), t.append(a, l), t.append(a, s), 
                s.checked = n[61].include, t.append(a, i), t.append(a, d), t.set_input_value(d, n[61].header), 
                t.append(a, u), t.append(a, p), t.append(p, m);
                for (let e = 0; e < je.length; e += 1) je[e] && je[e].m(p, null);
                t.select_option(p, n[61].field, !0), t.append(a, f), t.append(a, h), t.append(h, g), 
                t.append(g, b), t.append(h, v), t.append(v, y), t.append(h, x), t.append(x, w), 
                t.append(h, C), t.append(C, _), t.select_option(h, n[61].format, !0), t.append(a, F), 
                Je.m(a, null), t.append(a, k), t.append(a, S);
                for (let e = 0; e < Xe.length; e += 1) Xe[e] && Xe[e].m(S, null);
                t.select_option(S, n[61].tz, !0), t.append(a, D), t.append(a, M), t.append(M, $), 
                t.append(M, T), t.append(M, z), t.select_option(M, n[61].align, !0), t.append(a, N), 
                t.append(a, B), t.set_input_value(B, n[61].width), t.append(a, Y), t.append(a, O), 
                t.append(O, E), t.append(O, A), t.append(O, V), t.append(O, U), t.append(O, X), 
                t.append(X, G), t.append(a, K), t.append(a, ee), t.append(ee, te), t.append(ee, oe), 
                t.append(ee, le), t.append(ee, de), t.append(ee, ce), t.append(ce, ue), t.append(a, me), 
                t.append(a, fe), t.append(fe, he), t.append(he, ge), t.append(fe, ve), t.append(fe, ye), 
                t.append(ye, xe), t.append(fe, Ce), t.append(fe, _e), t.append(_e, Fe), t.append(fe, Se), 
                t.append(fe, De), t.append(De, Me), t.append(a, Te), ze || (Ne = [ t.listen(s, "change", He), t.listen(s, "change", n[26]), t.listen(d, "input", Pe), t.listen(d, "input", n[28]), t.listen(p, "change", Ve), t.listen(p, "change", Re), t.listen(h, "change", Le), t.listen(h, "change", n[32]), t.listen(S, "change", qe), t.listen(S, "change", n[38]), t.listen(M, "change", Ge), t.listen(M, "change", n[40]), t.listen(B, "input", Qe), t.listen(B, "input", n[42]), t.listen(E, "input", Ke), t.listen(V, "input", et), t.listen(X, "click", tt), t.listen(te, "input", nt), t.listen(le, "input", at), t.listen(ce, "click", ot), t.listen(he, "click", rt), t.listen(ye, "click", lt), t.listen(_e, "click", st), t.listen(De, "click", it) ], 
                ze = !0);
            },
            p(e, o) {
                if (n = e, 1 & o[0] && Be !== (Be = re(n[67]) + "") && t.set_data(r, Be), 3 & o[0] && (s.checked = n[61].include), 
                16 & o[0] && c !== (c = n[4]("header")) && t.attr(d, "placeholder", c), 3 & o[0] && d.value !== n[61].header && t.set_input_value(d, n[61].header), 
                2 & o[0]) {
                    let e;
                    for (Ae = n[1], e = 0; e < Ae.length; e += 1) {
                        const t = j(n, Ae, e);
                        je[e] ? je[e].p(t, o) : (je[e] = W(t), je[e].c(), je[e].m(p, null));
                    }
                    for (;e < je.length; e += 1) je[e].d(1);
                    je.length = Ae.length;
                }
                if (3 & o[0] && t.select_option(p, n[61].field), 16 & o[0] && Ye !== (Ye = n[4]("typeAuto") + "") && t.set_data(b, Ye), 
                16 & o[0] && Oe !== (Oe = n[4]("typeText") + "") && t.set_data(y, Oe), 16 & o[0] && Ee !== (Ee = n[4]("typeNumber") + "") && t.set_data(w, Ee), 
                16 & o[0] && Ie !== (Ie = n[4]("typeDate") + "") && t.set_data(_, Ie), 3 & o[0] && t.select_option(h, n[61].format), 
                We === (We = Ue(n)) && Je ? Je.p(n, o) : (Je.d(1), Je = We(n), Je && (Je.c(), Je.m(a, k))), 
                4112 & o[0]) {
                    let e;
                    for (Ze = n[12], e = 0; e < Ze.length; e += 1) {
                        const t = P(n, Ze, e);
                        Xe[e] ? Xe[e].p(t, o) : (Xe[e] = q(t), Xe[e].c(), Xe[e].m(S, null));
                    }
                    for (;e < Xe.length; e += 1) Xe[e].d(1);
                    Xe.length = Ze.length;
                }
                3 & o[0] && t.select_option(S, n[61].tz), 3 & o[0] && t.select_option(M, n[61].align), 
                3 & o[0] && t.to_number(B.value) !== n[61].width && t.set_input_value(B, n[61].width), 
                16 & o[0] && I !== (I = n[4]("headerColors") + " - background") && t.attr(E, "title", I), 
                35 & o[0] && H !== (H = n[61].headerBg || n[5].headerBg || "#1F6FEB") && (E.value = H), 
                16 & o[0] && R !== (R = n[4]("headerColors") + " - text") && t.attr(V, "title", R), 
                35 & o[0] && L !== (L = n[61].headerColor || n[5].headerColor || "#FFFFFF") && (V.value = L), 
                16 & o[0] && Q !== (Q = n[4]("inherit")) && t.attr(X, "title", Q), 16 & o[0] && ne !== (ne = n[4]("cellColors") + " - background") && t.attr(te, "title", ne), 
                35 & o[0] && ae !== (ae = n[61].bodyBg || n[5].bodyBg || "#FFFFFF") && (te.value = ae), 
                16 & o[0] && se !== (se = n[4]("cellColors") + " - text") && t.attr(le, "title", se), 
                35 & o[0] && ie !== (ie = n[61].bodyColor || n[5].bodyColor || "#111827") && (le.value = ie), 
                16 & o[0] && pe !== (pe = n[4]("inherit")) && t.attr(ce, "title", pe), 16 & o[0] && be !== (be = n[4]("moveUp")) && t.attr(he, "title", be), 
                16 & o[0] && we !== (we = n[4]("moveDown")) && t.attr(ye, "title", we), 16 & o[0] && ke !== (ke = n[4]("duplicate")) && t.attr(_e, "title", ke), 
                16 & o[0] && $e !== ($e = n[4]("remove")) && t.attr(De, "title", $e);
            },
            d(e) {
                e && t.detach(a), t.destroy_each(je, e), Je.d(), t.destroy_each(Xe, e), ze = !1, 
                t.run_all(Ne);
            }
        };
    }
    function Q(e) {
        let n, a, o = (e[61].header || C(e[61].field)) + "";
        return {
            c() {
                n = t.element("th"), a = t.text(o), t.set_style(n, "background", e[61].headerBg || e[5].headerBg || "#1F6FEB"), 
                t.set_style(n, "color", e[61].headerColor || e[5].headerColor || "#FFFFFF"), t.set_style(n, "text-align", e[5].headerAlign || "center"), 
                t.attr(n, "class", "svelte-lgwuc9");
            },
            m(e, o) {
                t.insert(e, n, o), t.append(n, a);
            },
            p(e, r) {
                256 & r[0] && o !== (o = (e[61].header || C(e[61].field)) + "") && t.set_data(a, o), 
                288 & r[0] && t.set_style(n, "background", e[61].headerBg || e[5].headerBg || "#1F6FEB"), 
                288 & r[0] && t.set_style(n, "color", e[61].headerColor || e[5].headerColor || "#FFFFFF"), 
                32 & r[0] && t.set_style(n, "text-align", e[5].headerAlign || "center");
            },
            d(e) {
                e && t.detach(n);
            }
        };
    }
    function K(e) {
        let n;
        return {
            c() {
                n = t.element("th"), n.textContent = "—", t.attr(n, "class", "svelte-lgwuc9");
            },
            m(e, a) {
                t.insert(e, n, a);
            },
            d(e) {
                e && t.detach(n);
            }
        };
    }
    function ee(e) {
        let n, a, o = B(e[61], e[58], e[3]).text + "";
        return {
            c() {
                n = t.element("td"), a = t.text(o), t.set_style(n, "background", e[61].bodyBg || (e[5].stripeEnabled && e[60] % 2 == 1 ? e[5].stripeBg : e[5].bodyBg) || "#FFFFFF"), 
                t.set_style(n, "color", e[61].bodyColor || e[5].bodyColor || "#111827"), t.set_style(n, "text-align", e[61].align || "left"), 
                t.attr(n, "class", "svelte-lgwuc9");
            },
            m(e, o) {
                t.insert(e, n, o), t.append(n, a);
            },
            p(e, r) {
                776 & r[0] && o !== (o = B(e[61], e[58], e[3]).text + "") && t.set_data(a, o), 288 & r[0] && t.set_style(n, "background", e[61].bodyBg || (e[5].stripeEnabled && e[60] % 2 == 1 ? e[5].stripeBg : e[5].bodyBg) || "#FFFFFF"), 
                288 & r[0] && t.set_style(n, "color", e[61].bodyColor || e[5].bodyColor || "#111827"), 
                256 & r[0] && t.set_style(n, "text-align", e[61].align || "left");
            },
            d(e) {
                e && t.detach(n);
            }
        };
    }
    function te(e) {
        let n;
        return {
            c() {
                n = t.element("td"), n.textContent = "—", t.attr(n, "class", "svelte-lgwuc9");
            },
            m(e, a) {
                t.insert(e, n, a);
            },
            d(e) {
                e && t.detach(n);
            }
        };
    }
    function ne(e) {
        let n, a, o = e[8], r = [];
        for (let t = 0; t < o.length; t += 1) r[t] = ee(E(e, o, t));
        let l = 0 === e[8].length && te();
        return {
            c() {
                n = t.element("tr");
                for (let e = 0; e < r.length; e += 1) r[e].c();
                a = t.space(), l && l.c();
            },
            m(e, o) {
                t.insert(e, n, o);
                for (let e = 0; e < r.length; e += 1) r[e] && r[e].m(n, null);
                t.append(n, a), l && l.m(n, null);
            },
            p(e, t) {
                if (808 & t[0]) {
                    let l;
                    for (o = e[8], l = 0; l < o.length; l += 1) {
                        const s = E(e, o, l);
                        r[l] ? r[l].p(s, t) : (r[l] = ee(s), r[l].c(), r[l].m(n, a));
                    }
                    for (;l < r.length; l += 1) r[l].d(1);
                    r.length = o.length;
                }
                0 === e[8].length ? l || (l = te(), l.c(), l.m(n, null)) : l && (l.d(1), l = null);
            },
            d(e) {
                e && t.detach(n), t.destroy_each(r, e), l && l.d();
            }
        };
    }
    function ae(e) {
        let n, a, o, r, l = e[4]("noData") + "";
        return {
            c() {
                n = t.element("tr"), a = t.element("td"), o = t.text(l), t.attr(a, "class", "ec-norows svelte-lgwuc9"), 
                t.attr(a, "colspan", r = Math.max(e[8].length, 1));
            },
            m(e, r) {
                t.insert(e, n, r), t.append(n, a), t.append(a, o);
            },
            p(e, n) {
                16 & n[0] && l !== (l = e[4]("noData") + "") && t.set_data(o, l), 256 & n[0] && r !== (r = Math.max(e[8].length, 1)) && t.attr(a, "colspan", r);
            },
            d(e) {
                e && t.detach(n);
            }
        };
    }
    function oe(e) {
        let n, a, o, r, l, s, i, d, c, u, p, m, f, h, g, b, v, y, x, w, C, _, F, k, S, D, M, $, T, z, N, B, Y, E, H, P, A, j, W, J, Z, X, q, G, ee, te, oe, re, le, se, ie, de, ce, ue, pe, me, fe, he, ge, be, ve, ye, xe, we, Ce, _e, Fe, ke, Se, De = e[4]("designerTitle") + "", Me = e[2].length + "", $e = e[4]("rows") + "", Te = e[8].length + "", ze = e[4]("columns") + "", Ne = e[4]("addColumn") + "", Be = e[4]("fromData") + "", Ye = e[4]("copyJson") + "", Oe = e[4]("save") + "", Ee = e[4]("reset") + "", Ie = e[4]("previewTitle") + "", He = e[4]("previewNote", {
            n: e[9].length
        }) + "", Pe = e[4]("close") + "", Ae = e[4]("export") + "", je = e[6] && V(e), Ve = e[7] && R(e);
        function Re(e, t) {
            return 0 === e[0].length ? U : L;
        }
        let Le = Re(e), Ue = Le(e), We = e[8], Je = [];
        for (let t = 0; t < We.length; t += 1) Je[t] = Q(I(e, We, t));
        let Ze = 0 === e[8].length && K(), Xe = e[9], qe = [];
        for (let t = 0; t < Xe.length; t += 1) qe[t] = ne(O(e, Xe, t));
        let Ge = 0 === e[9].length && ae(e);
        return {
            c() {
                n = t.element("div"), a = t.element("div"), o = t.element("div"), r = t.element("div"), 
                l = t.element("strong"), s = t.text(De), i = t.space(), d = t.element("span"), c = t.text(Me), 
                u = t.space(), p = t.text($e), m = t.text(" · "), f = t.text(Te), h = t.space(), 
                g = t.text(ze), b = t.space(), je && je.c(), v = t.space(), y = t.element("button"), 
                x = t.text("×"), C = t.space(), _ = t.element("div"), F = t.element("button"), k = t.text("+ "), 
                S = t.text(Ne), D = t.space(), M = t.element("button"), $ = t.text("⟳ "), T = t.text(Be), 
                z = t.space(), N = t.element("span"), B = t.space(), Ve && Ve.c(), Y = t.space(), 
                E = t.element("button"), H = t.text(Ye), P = t.space(), A = t.element("button"), 
                j = t.text(Oe), W = t.space(), J = t.element("button"), Z = t.text(Ee), X = t.space(), 
                q = t.element("div"), Ue.c(), G = t.space(), ee = t.element("div"), te = t.element("div"), 
                oe = t.text(Ie), re = t.text(" — "), le = t.text(He), se = t.space(), ie = t.element("div"), 
                de = t.element("table"), ce = t.element("thead"), ue = t.element("tr");
                for (let e = 0; e < Je.length; e += 1) Je[e].c();
                pe = t.space(), Ze && Ze.c(), me = t.space(), fe = t.element("tbody");
                for (let e = 0; e < qe.length; e += 1) qe[e].c();
                he = t.space(), Ge && Ge.c(), ge = t.space(), be = t.element("div"), ve = t.element("span"), 
                ye = t.space(), xe = t.element("button"), we = t.text(Pe), Ce = t.space(), _e = t.element("button"), 
                Fe = t.text(Ae), t.attr(d, "class", "ec-sub svelte-lgwuc9"), t.attr(y, "class", "ec-x svelte-lgwuc9"), 
                t.attr(y, "title", w = e[4]("close")), t.attr(o, "class", "ec-head svelte-lgwuc9"), 
                t.attr(F, "class", "ec-btn svelte-lgwuc9"), t.attr(M, "class", "ec-btn svelte-lgwuc9"), 
                t.attr(N, "class", "ec-spacer svelte-lgwuc9"), t.attr(E, "class", "ec-btn svelte-lgwuc9"), 
                t.attr(A, "class", "ec-btn svelte-lgwuc9"), t.attr(J, "class", "ec-btn ec-danger svelte-lgwuc9"), 
                t.attr(_, "class", "ec-toolbar svelte-lgwuc9"), t.attr(te, "class", "ec-preview-label svelte-lgwuc9"), 
                t.attr(de, "class", "ec-table svelte-lgwuc9"), t.attr(ie, "class", "ec-table-wrap svelte-lgwuc9"), 
                t.attr(ee, "class", "ec-preview svelte-lgwuc9"), t.attr(q, "class", "ec-body svelte-lgwuc9"), 
                t.attr(ve, "class", "ec-spacer svelte-lgwuc9"), t.attr(xe, "class", "ec-btn svelte-lgwuc9"), 
                t.attr(_e, "class", "ec-btn ec-primary svelte-lgwuc9"), t.attr(be, "class", "ec-foot svelte-lgwuc9"), 
                t.attr(a, "class", "ec-modal svelte-lgwuc9"), t.attr(a, "role", "dialog"), t.attr(a, "aria-modal", "true"), 
                t.attr(n, "class", "ec-overlay svelte-lgwuc9");
            },
            m(w, O) {
                t.insert(w, n, O), t.append(n, a), t.append(a, o), t.append(o, r), t.append(r, l), 
                t.append(l, s), t.append(r, i), t.append(r, d), t.append(d, c), t.append(d, u), 
                t.append(d, p), t.append(d, m), t.append(d, f), t.append(d, h), t.append(d, g), 
                t.append(d, b), je && je.m(d, null), t.append(o, v), t.append(o, y), t.append(y, x), 
                t.append(a, C), t.append(a, _), t.append(_, F), t.append(F, k), t.append(F, S), 
                t.append(_, D), t.append(_, M), t.append(M, $), t.append(M, T), t.append(_, z), 
                t.append(_, N), t.append(_, B), Ve && Ve.m(_, null), t.append(_, Y), t.append(_, E), 
                t.append(E, H), t.append(_, P), t.append(_, A), t.append(A, j), t.append(_, W), 
                t.append(_, J), t.append(J, Z), t.append(a, X), t.append(a, q), Ue.m(q, null), t.append(q, G), 
                t.append(q, ee), t.append(ee, te), t.append(te, oe), t.append(te, re), t.append(te, le), 
                t.append(ee, se), t.append(ee, ie), t.append(ie, de), t.append(de, ce), t.append(ce, ue);
                for (let e = 0; e < Je.length; e += 1) Je[e] && Je[e].m(ue, null);
                t.append(ue, pe), Ze && Ze.m(ue, null), t.append(de, me), t.append(de, fe);
                for (let e = 0; e < qe.length; e += 1) qe[e] && qe[e].m(fe, null);
                t.append(fe, he), Ge && Ge.m(fe, null), t.append(a, ge), t.append(a, be), t.append(be, ve), 
                t.append(be, ye), t.append(be, xe), t.append(xe, we), t.append(be, Ce), t.append(be, _e), 
                t.append(_e, Fe), ke || (Se = [ t.listen(y, "click", e[21]), t.listen(F, "click", e[15]), t.listen(M, "click", e[22]), t.listen(E, "click", e[20]), t.listen(A, "click", e[23]), t.listen(J, "click", e[24]), t.listen(xe, "click", e[53]), t.listen(_e, "click", e[54]), t.listen(n, "click", t.self(e[55])) ], 
                ke = !0);
            },
            p(e, n) {
                if (16 & n[0] && De !== (De = e[4]("designerTitle") + "") && t.set_data(s, De), 
                4 & n[0] && Me !== (Me = e[2].length + "") && t.set_data(c, Me), 16 & n[0] && $e !== ($e = e[4]("rows") + "") && t.set_data(p, $e), 
                256 & n[0] && Te !== (Te = e[8].length + "") && t.set_data(f, Te), 16 & n[0] && ze !== (ze = e[4]("columns") + "") && t.set_data(g, ze), 
                e[6] ? je ? je.p(e, n) : (je = V(e), je.c(), je.m(d, null)) : je && (je.d(1), je = null), 
                16 & n[0] && w !== (w = e[4]("close")) && t.attr(y, "title", w), 16 & n[0] && Ne !== (Ne = e[4]("addColumn") + "") && t.set_data(S, Ne), 
                16 & n[0] && Be !== (Be = e[4]("fromData") + "") && t.set_data(T, Be), e[7] ? Ve ? Ve.p(e, n) : (Ve = R(e), 
                Ve.c(), Ve.m(_, Y)) : Ve && (Ve.d(1), Ve = null), 16 & n[0] && Ye !== (Ye = e[4]("copyJson") + "") && t.set_data(H, Ye), 
                16 & n[0] && Oe !== (Oe = e[4]("save") + "") && t.set_data(j, Oe), 16 & n[0] && Ee !== (Ee = e[4]("reset") + "") && t.set_data(Z, Ee), 
                Le === (Le = Re(e)) && Ue ? Ue.p(e, n) : (Ue.d(1), Ue = Le(e), Ue && (Ue.c(), Ue.m(q, G))), 
                16 & n[0] && Ie !== (Ie = e[4]("previewTitle") + "") && t.set_data(oe, Ie), 528 & n[0] && He !== (He = e[4]("previewNote", {
                    n: e[9].length
                }) + "") && t.set_data(le, He), 288 & n[0]) {
                    let t;
                    for (We = e[8], t = 0; t < We.length; t += 1) {
                        const a = I(e, We, t);
                        Je[t] ? Je[t].p(a, n) : (Je[t] = Q(a), Je[t].c(), Je[t].m(ue, pe));
                    }
                    for (;t < Je.length; t += 1) Je[t].d(1);
                    Je.length = We.length;
                }
                if (0 === e[8].length ? Ze || (Ze = K(), Ze.c(), Ze.m(ue, null)) : Ze && (Ze.d(1), 
                Ze = null), 808 & n[0]) {
                    let t;
                    for (Xe = e[9], t = 0; t < Xe.length; t += 1) {
                        const a = O(e, Xe, t);
                        qe[t] ? qe[t].p(a, n) : (qe[t] = ne(a), qe[t].c(), qe[t].m(fe, he));
                    }
                    for (;t < qe.length; t += 1) qe[t].d(1);
                    qe.length = Xe.length;
                }
                0 === e[9].length ? Ge ? Ge.p(e, n) : (Ge = ae(e), Ge.c(), Ge.m(fe, null)) : Ge && (Ge.d(1), 
                Ge = null), 16 & n[0] && Pe !== (Pe = e[4]("close") + "") && t.set_data(we, Pe), 
                16 & n[0] && Ae !== (Ae = e[4]("export") + "") && t.set_data(Fe, Ae);
            },
            i: t.noop,
            o: t.noop,
            d(e) {
                e && t.detach(n), je && je.d(), Ve && Ve.d(), Ue.d(), t.destroy_each(Je, e), Ze && Ze.d(), 
                t.destroy_each(qe, e), Ge && Ge.d(), ke = !1, t.run_all(Se);
            }
        };
    }
    function re(e) {
        let t = e + 1, n = "";
        for (;t > 0; ) {
            const e = (t - 1) % 26;
            n = String.fromCharCode(65 + e) + n, t = Math.floor((t - 1) / 26);
        }
        return n;
    }
    function le(e, a, o) {
        let r, l, {columns: s = []} = a, {fields: i = []} = a, {rows: d = []} = a, {renderContext: c = {}} = a, {t: u} = a, {style: p = {}} = a, {hasLocalOverride: m = !1} = a;
        const f = n.createEventDispatcher();
        let h = "", g = null;
        function b(e) {
            o(7, h = e), g && clearTimeout(g), g = setTimeout(() => o(7, h = ""), 2600);
        }
        function v(e) {
            o(0, s = e), f("change", e);
        }
        function y(e) {
            v(s.filter(t => t.id !== e));
        }
        function x(e) {
            const t = s.findIndex(t => t.id === e);
            if (t < 0) return;
            const n = Object.assign(k(), s[t], {
                id: k().id
            });
            v([ ...s.slice(0, t + 1), n, ...s.slice(t + 1) ]);
        }
        function w(e, t) {
            const n = s.findIndex(t => t.id === e), a = n + t;
            if (n < 0 || a < 0 || a >= s.length) return;
            const o = s.slice(), r = o[n];
            o[n] = o[a], o[a] = r, v(o);
        }
        function _(e) {
            e.header || (e.header = C(e.field)), v(s);
        }
        function F(e, t) {
            const n = document.createElement("textarea");
            n.value = e, n.style.position = "fixed", n.style.opacity = "0", document.body.appendChild(n), 
            n.select();
            try {
                document.execCommand("copy"), t();
            } catch (e) {
                b(u("error"));
            }
            document.body.removeChild(n);
        }
        return e.$$set = e => {
            "columns" in e && o(0, s = e.columns), "fields" in e && o(1, i = e.fields), "rows" in e && o(2, d = e.rows), 
            "renderContext" in e && o(3, c = e.renderContext), "t" in e && o(4, u = e.t), "style" in e && o(5, p = e.style), 
            "hasLocalOverride" in e && o(6, m = e.hasLocalOverride);
        }, e.$$.update = () => {
            4 & e.$$.dirty[0] && o(9, r = d.slice(0, 8)), 1 & e.$$.dirty[0] && o(8, l = s.filter(e => !1 !== e.include));
        }, [ s, i, d, c, u, p, m, h, l, r, f, [ {
            value: "",
            label: "inherit"
        }, {
            value: "DD/MM/YYYY",
            label: "DD/MM/YYYY"
        }, {
            value: "HH:mm:ss",
            label: "HH:MM:SS"
        }, {
            value: "HH:mm",
            label: "HH:MM"
        }, {
            value: "DD/MM/YYYY HH:mm",
            label: "DD/MM/YYYY HH:MM"
        }, {
            value: "DD/MM/YYYY HH:mm:ss",
            label: "DD/MM/YYYY HH:MM:SS"
        }, {
            value: "YYYY-MM-DD",
            label: "YYYY-MM-DD"
        }, {
            value: "D MMMM YYYY",
            label: "D MMMM YYYY"
        } ], [ {
            value: "",
            label: "inherit"
        }, {
            value: "+7",
            label: "UTC+07:00"
        }, {
            value: "utc",
            label: "UTC"
        }, {
            value: "local",
            label: "local"
        } ], b, v, function() {
            const e = k();
            e.header = u("columns") + " " + (s.length + 1), v([ ...s, e ]);
        }, y, x, w, _, function() {
            const e = T(s), t = () => b(u("copied"));
            try {
                navigator.clipboard && navigator.clipboard.writeText ? navigator.clipboard.writeText(e).then(t, () => F(e, t)) : F(e, t);
            } catch (n) {
                F(e, t);
            }
        }, () => f("close"), () => f("regenerate"), () => {
            f("save"), b(u("saved"));
        }, () => {
            f("reset"), b(u("cleared"));
        }, function(e, t) {
            e[t].include = this.checked, o(0, s), o(1, i);
        }, () => v(s), function(e, t) {
            e[t].header = this.value, o(0, s), o(1, i);
        }, () => v(s), function(e, n) {
            e[n].field = t.select_value(this), o(0, s), o(1, i);
        }, e => _(e), function(e, n) {
            e[n].format = t.select_value(this), o(0, s), o(1, i);
        }, () => v(s), function(e, n) {
            e[n].decimals = t.to_number(this.value), o(0, s), o(1, i);
        }, () => v(s), function(e, n) {
            e[n].datePattern = t.select_value(this), o(0, s), o(1, i);
        }, () => v(s), function(e, n) {
            e[n].tz = t.select_value(this), o(0, s), o(1, i);
        }, () => v(s), function(e, n) {
            e[n].align = t.select_value(this), o(0, s), o(1, i);
        }, () => v(s), function(e, n) {
            e[n].width = t.to_number(this.value), o(0, s), o(1, i);
        }, () => v(s), (e, t, n, a) => {
            o(0, t[n].headerBg = a.target.value, s), v(s);
        }, (e, t, n, a) => {
            o(0, t[n].headerColor = a.target.value, s), v(s);
        }, (e, t, n) => {
            o(0, t[n].headerBg = "", s), o(0, t[n].headerColor = "", s), v(s);
        }, (e, t, n, a) => {
            o(0, t[n].bodyBg = a.target.value, s), v(s);
        }, (e, t, n, a) => {
            o(0, t[n].bodyColor = a.target.value, s), v(s);
        }, (e, t, n) => {
            o(0, t[n].bodyBg = "", s), o(0, t[n].bodyColor = "", s), v(s);
        }, e => w(e.id, -1), e => w(e.id, 1), e => x(e.id), e => y(e.id), () => f("close"), () => f("export"), () => f("close") ];
    }
    Y('.ec-overlay.svelte-lgwuc9.svelte-lgwuc9{position:fixed;inset:0;background:rgba(15, 23, 42, 0.45);display:flex;align-items:center;justify-content:center;z-index:999999;padding:24px;font-family:"Sarabun", "Noto Sans Thai", Tahoma, system-ui, sans-serif}.ec-modal.svelte-lgwuc9.svelte-lgwuc9{background:#fff;color:#111827;width:min(1240px, 96vw);max-height:88vh;border-radius:10px;display:flex;flex-direction:column;box-shadow:0 18px 50px rgba(0, 0, 0, 0.3);overflow:hidden}.ec-head.svelte-lgwuc9.svelte-lgwuc9{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #e5e7eb;background:linear-gradient(#f9fafb, #f1f5f9)}.ec-sub.svelte-lgwuc9.svelte-lgwuc9{display:block;font-size:12px;color:#6b7280;margin-top:2px}.ec-x.svelte-lgwuc9.svelte-lgwuc9{border:none;background:transparent;font-size:22px;line-height:1;cursor:pointer;color:#6b7280;padding:2px 8px;border-radius:6px}.ec-x.svelte-lgwuc9.svelte-lgwuc9:hover{background:#e5e7eb;color:#111827}.ec-toolbar.svelte-lgwuc9.svelte-lgwuc9,.ec-foot.svelte-lgwuc9.svelte-lgwuc9{display:flex;align-items:center;gap:8px;padding:10px 16px;background:#fbfdff;border-bottom:1px solid #eef2f7;flex-wrap:wrap}.ec-foot.svelte-lgwuc9.svelte-lgwuc9{border-bottom:none;border-top:1px solid #e5e7eb;background:#f9fafb}.ec-spacer.svelte-lgwuc9.svelte-lgwuc9{flex:1}.ec-toast.svelte-lgwuc9.svelte-lgwuc9{font-size:12px;color:#15803d;font-weight:600}.ec-btn.svelte-lgwuc9.svelte-lgwuc9{border:1px solid #d1d5db;background:#fff;color:#1f2937;border-radius:6px;padding:6px 10px;font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap}.ec-btn.svelte-lgwuc9.svelte-lgwuc9:hover{background:#f3f4f6}.ec-primary.svelte-lgwuc9.svelte-lgwuc9{background:#16a34a;border-color:#16a34a;color:#fff}.ec-primary.svelte-lgwuc9.svelte-lgwuc9:hover{background:#15803d}.ec-danger.svelte-lgwuc9.svelte-lgwuc9{color:#dc2626}.ec-danger.svelte-lgwuc9.svelte-lgwuc9:hover{background:#fee2e2}.ec-body.svelte-lgwuc9.svelte-lgwuc9{padding:12px 16px 16px;overflow:auto}.ec-grid.svelte-lgwuc9.svelte-lgwuc9{display:grid;grid-template-columns:28px 44px minmax(120px, 1.3fr) minmax(110px, 1fr) 92px minmax(120px, 1fr) 96px 62px 68px 96px 96px 108px;gap:6px;align-items:center}.ec-grid-head.svelte-lgwuc9.svelte-lgwuc9{font-size:10px;text-transform:uppercase;letter-spacing:0.04em;color:#6b7280;padding:4px 0 6px;position:sticky;top:0;background:#fff;z-index:2}.ec-grid-row.svelte-lgwuc9.svelte-lgwuc9{padding:3px 0}.ec-letter.svelte-lgwuc9.svelte-lgwuc9{text-align:center;font-weight:700;color:#2563eb;font-size:11px}.ec-check.svelte-lgwuc9.svelte-lgwuc9{justify-self:center;width:15px;height:15px;cursor:pointer}.ec-input.svelte-lgwuc9.svelte-lgwuc9{width:100%;box-sizing:border-box;padding:5px 7px;border:1px solid #d1d5db;border-radius:5px;font-size:12px;background:#fff;color:#111827;font-family:inherit}.ec-input.svelte-lgwuc9.svelte-lgwuc9:focus{outline:none;border-color:#2563eb;box-shadow:0 0 0 2px rgba(37, 99, 235, 0.15)}.ec-narrow.svelte-lgwuc9.svelte-lgwuc9{text-align:center}.ec-colors.svelte-lgwuc9.svelte-lgwuc9,.ec-ops.svelte-lgwuc9.svelte-lgwuc9{display:flex;gap:2px;align-items:center;justify-content:center}.ec-colors.svelte-lgwuc9 input[type="color"].svelte-lgwuc9{width:26px;height:24px;padding:0;border:1px solid #d1d5db;border-radius:4px;background:none;cursor:pointer}.ec-mini.svelte-lgwuc9.svelte-lgwuc9{border:1px solid #e5e7eb;background:#f9fafb;border-radius:4px;width:23px;height:23px;cursor:pointer;font-size:10px;color:#374151;padding:0;line-height:1}.ec-mini.svelte-lgwuc9.svelte-lgwuc9:hover{background:#eef2f7}.ec-empty.svelte-lgwuc9.svelte-lgwuc9{padding:22px;text-align:center;color:#6b7280;border:1px dashed #d1d5db;border-radius:8px;margin:8px 0;font-size:13px}.ec-preview.svelte-lgwuc9.svelte-lgwuc9{margin-top:16px}.ec-preview-label.svelte-lgwuc9.svelte-lgwuc9{font-size:12px;color:#6b7280;margin-bottom:6px}.ec-table-wrap.svelte-lgwuc9.svelte-lgwuc9{overflow:auto;border:1px solid #cbd5e1;border-radius:8px;max-height:300px}.ec-table.svelte-lgwuc9.svelte-lgwuc9{border-collapse:collapse;font-size:12px;min-width:100%}.ec-table.svelte-lgwuc9 th.svelte-lgwuc9,.ec-table.svelte-lgwuc9 td.svelte-lgwuc9{border:1px solid #d7dde5;padding:5px 9px;white-space:nowrap;text-align:left}.ec-table.svelte-lgwuc9 thead th.svelte-lgwuc9{position:sticky;top:0;z-index:1;font-weight:700}.ec-norows.svelte-lgwuc9.svelte-lgwuc9{color:#9ca3af;text-align:center;font-style:italic}');
    class se extends t.SvelteComponent {
        constructor(e) {
            super(), t.init(this, e, le, oe, t.safe_not_equal, {
                columns: 0,
                fields: 1,
                rows: 2,
                renderContext: 3,
                t: 4,
                style: 5,
                hasLocalOverride: 6
            }, null, [ -1, -1, -1 ]);
        }
    }
    const ie = {
        th: {
            export: "ส่งออกไฟล์",
            exporting: "กำลังส่งออก...",
            design: "ออกแบบคอลัมน์",
            preview: "ดูตัวอย่าง",
            close: "ปิด",
            rows: "แถว",
            columns: "คอลัมน์",
            noRows: "ไม่มีข้อมูลให้ส่งออก",
            noData: "ยังไม่มีข้อมูลจากแหล่งข้อมูล",
            exported: "ส่งออก {n} แถว เรียบร้อย",
            loading: "กำลังโหลดข้อมูล...",
            error: "เกิดข้อผิดพลาด",
            format: "รูปแบบไฟล์",
            designerTitle: "ออกแบบคอลัมน์",
            addColumn: "เพิ่มคอลัมน์",
            fromData: "สร้างจากข้อมูล",
            reset: "ล้างค่า",
            save: "คัดลอกเพื่อล็อกดีไซน์",
            copyJson: "คัดลอก JSON",
            copied: "คัดลอกแล้ว ให้วางในช่อง Column design (JSON) แล้วกด Publish",
            saved: "คัดลอกแล้ว ให้วางในช่อง Column design (JSON) แล้วกด Publish เพื่อล็อกดีไซน์",
            cleared: "คืนค่าดีไซน์แล้ว",
            localOverride: "ตัวอย่างดีไซน์นี้ยังไม่ถูกล็อก กรุณาคัดลอก JSON ไปวางใน Component Settings",
            header: "หัวคอลัมน์",
            field: "ฟิลด์ข้อมูล",
            type: "ชนิดข้อมูล",
            pattern: "รูปแบบวันที่",
            timezone: "โซนเวลา",
            width: "ความกว้าง",
            align: "จัดวาง",
            headerColors: "สีหัวคอลัมน์",
            cellColors: "สีเซลล์",
            order: "ลำดับ",
            inherit: "ตามค่าเริ่มต้น",
            custom: "กำหนดเอง",
            typeAuto: "อัตโนมัติ",
            typeText: "ข้อความ",
            typeNumber: "ตัวเลข",
            typeDate: "วันที่/เวลา",
            decimals: "ทศนิยม",
            previewTitle: "ตัวอย่างข้อมูล",
            previewNote: "แสดง {n} แถวแรก",
            noColumns: "ยังไม่มีคอลัมน์ กด “สร้างจากข้อมูล” เพื่อดึงคอลัมน์อัตโนมัติ",
            moveUp: "เลื่อนขึ้น",
            moveDown: "เลื่อนลง",
            duplicate: "ทำสำเนา",
            remove: "ลบ",
            include: "ส่งออก",
            watermarkFailed: "โหลดรูปลายน้ำไม่สำเร็จ ข้ามการใส่ลายน้ำ",
            popupBlocked: "เบราว์เซอร์บล็อกหน้าต่างพิมพ์ กรุณาอนุญาต pop-up"
        },
        en: {
            export: "Export",
            exporting: "Exporting...",
            design: "Design",
            preview: "Preview",
            close: "Close",
            rows: "rows",
            columns: "columns",
            noRows: "There is no data to export",
            noData: "No data available from the data source",
            exported: "Exported {n} rows",
            loading: "Loading data...",
            error: "Error",
            format: "Format",
            designerTitle: "Column designer",
            addColumn: "Add column",
            fromData: "From data",
            reset: "Reset",
            save: "Copy to lock design",
            copyJson: "Copy JSON",
            copied: "Copied. Paste it into Column design (JSON), then Publish.",
            saved: "Copied. Paste it into Column design (JSON), then Publish to lock the design.",
            cleared: "Design restored",
            localOverride: "This design preview is not locked yet. Copy its JSON into Component Settings.",
            header: "Header",
            field: "Field",
            type: "Type",
            pattern: "Date format",
            timezone: "Time zone",
            width: "Width",
            align: "Align",
            headerColors: "Header colours",
            cellColors: "Cell colours",
            order: "Order",
            inherit: "Default",
            custom: "Custom",
            typeAuto: "Auto",
            typeText: "Text",
            typeNumber: "Number",
            typeDate: "Date / time",
            decimals: "Decimals",
            previewTitle: "Data preview",
            previewNote: "First {n} rows",
            noColumns: "No columns yet. Press “From data” to detect them automatically.",
            moveUp: "Move up",
            moveDown: "Move down",
            duplicate: "Duplicate",
            remove: "Remove",
            include: "Export",
            watermarkFailed: "The watermark image could not be loaded and was skipped",
            popupBlocked: "The print window was blocked. Please allow pop-ups."
        }
    };
    const de = /^data:(image\/[a-zA-Z0-9.+-]+);base64,([\s\S]+)$/i, ce = {
        "image/png": "png",
        "image/jpeg": "jpeg",
        "image/jpg": "jpeg",
        "image/gif": "gif",
        "image/bmp": "bmp"
    };
    function ue(e) {
        let t = "";
        for (let n = 0; n < e.length; n += 32768) t += String.fromCharCode.apply(null, e.subarray(n, n + 32768));
        return btoa(t);
    }
    function pe(e) {
        return new Promise(t => {
            try {
                const n = new Image;
                let a = !1;
                const o = e => {
                    a || (a = !0, t(e));
                };
                n.onload = () => o({
                    width: n.naturalWidth || 600,
                    height: n.naturalHeight || 600
                }), n.onerror = () => o({
                    width: 600,
                    height: 600
                }), setTimeout(() => o({
                    width: 600,
                    height: 600
                }), 4e3), n.src = e;
            } catch (e) {
                t({
                    width: 600,
                    height: 600
                });
            }
        });
    }
    async function me(e) {
        const t = String(e || "").trim();
        if (!t) return null;
        const n = de.exec(t);
        if (n) try {
            const e = n[1].toLowerCase(), t = function(e) {
                const t = String(e).replace(/\s/g, ""), n = atob(t), a = new Uint8Array(n.length);
                for (let e = 0; e < n.length; e++) a[e] = n.charCodeAt(e);
                return a;
            }(n[2]), a = "data:" + e + ";base64," + ue(t), o = await pe(a);
            return {
                dataUrl: a,
                bytes: t,
                mime: e,
                ext: ce[e] || "png",
                width: o.width,
                height: o.height
            };
        } catch (e) {
            return null;
        }
        try {
            const e = await fetch(t, {
                mode: "cors",
                credentials: "omit"
            });
            if (!e.ok) throw new Error("HTTP " + e.status);
            const n = await e.arrayBuffer(), a = new Uint8Array(n), o = (e.headers.get("content-type") || "image/png").split(";")[0].toLowerCase(), r = "data:" + o + ";base64," + ue(a), l = await pe(r);
            return {
                dataUrl: r,
                bytes: a,
                mime: o,
                ext: ce[o] || "png",
                width: l.width,
                height: l.height
            };
        } catch (e) {
            const n = await pe(t);
            return {
                dataUrl: t,
                bytes: null,
                mime: "image/png",
                ext: "png",
                width: n.width,
                height: n.height
            };
        }
    }
    const fe = {
        comma: ",",
        semicolon: ";",
        tab: "\t",
        pipe: "|"
    };
    function he(e, t) {
        const n = null == e ? "" : String(e);
        return -1 !== n.indexOf('"') || -1 !== n.indexOf(t) || -1 !== n.indexOf("\n") || -1 !== n.indexOf("\r") || n !== n.trim() ? '"' + n.replace(/"/g, '""') + '"' : n;
    }
    function ge(e, t) {
        const n = t || {}, a = function(e) {
            return fe[e] || ",";
        }(n.delimiter), o = [];
        o.push(e.header.map(e => he(e, a)).join(a)), e.body.forEach(e => {
            o.push(e.map(e => he(e.text, a)).join(a));
        });
        const r = n.footer;
        if (r && (r.startDate || r.docCode)) {
            const t = Math.max(e.header.length, 1);
            o.push("");
            const n = new Array(t).fill("");
            n[0] = r.startDate || "", n[t - 1] = 1 === t ? [ n[0], r.docCode ].filter(Boolean).join(" ") : r.docCode || "", 
            o.push(n.map(e => he(e, a)).join(a));
        }
        return o.join("\r\n");
    }
    function be(e) {
        return String(null == e ? "" : e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    function ve(e, t) {
        const n = String(e || "").trim();
        return n || t;
    }
    const ye = new RegExp("[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F]", "g");
    function xe(e) {
        return String(null == e ? "" : e).replace(ye, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
    }
    function we(e) {
        const t = String(null == e ? "" : e).trim(), n = /^#?([0-9a-fA-F]{6})$/.exec(t);
        if (n) return n[1].toUpperCase();
        const a = /^#?([0-9a-fA-F]{3})$/.exec(t);
        if (a) {
            const e = a[1];
            return (e[0] + e[0] + e[1] + e[1] + e[2] + e[2]).toUpperCase();
        }
        return null;
    }
    function Ce(e, t) {
        const n = we(e);
        return n ? "#" + n : t;
    }
    const _e = {
        left: "Left",
        center: "Center",
        right: "Right"
    };
    function Fe(e) {
        return (String(e || "Sheet1").replace(/[:\\/?*[\]]/g, " ").trim() || "Sheet1").slice(0, 31);
    }
    function ke(e, t) {
        let n = String(e.header[t] || "").length;
        const a = Math.min(e.body.length, 200);
        for (let o = 0; o < a; o++) {
            const a = e.body[o][t], r = a && a.text ? String(a.text).length : 0;
            r > n && (n = r);
        }
        return Math.max(8, Math.min(60, n + 2));
    }
    var Se = Uint8Array, De = Uint16Array, Me = Int32Array, $e = new Se([ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0 ]), Te = new Se([ 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0 ]), ze = new Se([ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ]), Ne = function(e, t) {
        for (var n = new De(31), a = 0; a < 31; ++a) n[a] = t += 1 << e[a - 1];
        var o = new Me(n[30]);
        for (a = 1; a < 30; ++a) for (var r = n[a]; r < n[a + 1]; ++r) o[r] = r - n[a] << 5 | a;
        return {
            b: n,
            r: o
        };
    }, Be = Ne($e, 2), Ye = Be.b, Oe = Be.r;
    Ye[28] = 258, Oe[258] = 28;
    for (var Ee = Ne(Te, 0).r, Ie = new De(32768), He = 0; He < 32768; ++He) {
        var Pe = (43690 & He) >> 1 | (21845 & He) << 1;
        Pe = (61680 & (Pe = (52428 & Pe) >> 2 | (13107 & Pe) << 2)) >> 4 | (3855 & Pe) << 4, 
        Ie[He] = ((65280 & Pe) >> 8 | (255 & Pe) << 8) >> 1;
    }
    var Ae = function(e, t, n) {
        for (var a = e.length, o = 0, r = new De(t); o < a; ++o) e[o] && ++r[e[o] - 1];
        var l, s = new De(t);
        for (o = 1; o < t; ++o) s[o] = s[o - 1] + r[o - 1] << 1;
        if (n) {
            l = new De(1 << t);
            var i = 15 - t;
            for (o = 0; o < a; ++o) if (e[o]) for (var d = o << 4 | e[o], c = t - e[o], u = s[e[o] - 1]++ << c, p = u | (1 << c) - 1; u <= p; ++u) l[Ie[u] >> i] = d;
        } else for (l = new De(a), o = 0; o < a; ++o) e[o] && (l[o] = Ie[s[e[o] - 1]++] >> 15 - e[o]);
        return l;
    }, je = new Se(288);
    for (He = 0; He < 144; ++He) je[He] = 8;
    for (He = 144; He < 256; ++He) je[He] = 9;
    for (He = 256; He < 280; ++He) je[He] = 7;
    for (He = 280; He < 288; ++He) je[He] = 8;
    var Ve = new Se(32);
    for (He = 0; He < 32; ++He) Ve[He] = 5;
    var Re = Ae(je, 9, 0), Le = Ae(Ve, 5, 0), Ue = function(e) {
        return (e + 7) / 8 | 0;
    }, We = function(e, t, n) {
        return (null == t || t < 0) && (t = 0), (null == n || n > e.length) && (n = e.length), 
        new Se(e.subarray(t, n));
    }, Je = [ "unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data" ], Ze = function(e, t, n) {
        var a = new Error(t || Je[e]);
        if (a.code = e, Error.captureStackTrace && Error.captureStackTrace(a, Ze), !n) throw a;
        return a;
    }, Xe = function(e, t, n) {
        n <<= 7 & t;
        var a = t / 8 | 0;
        e[a] |= n, e[a + 1] |= n >> 8;
    }, qe = function(e, t, n) {
        n <<= 7 & t;
        var a = t / 8 | 0;
        e[a] |= n, e[a + 1] |= n >> 8, e[a + 2] |= n >> 16;
    }, Ge = function(e, t) {
        for (var n = [], a = 0; a < e.length; ++a) e[a] && n.push({
            s: a,
            f: e[a]
        });
        var o = n.length, r = n.slice();
        if (!o) return {
            t: ot,
            l: 0
        };
        if (1 == o) {
            var l = new Se(n[0].s + 1);
            return l[n[0].s] = 1, {
                t: l,
                l: 1
            };
        }
        n.sort(function(e, t) {
            return e.f - t.f;
        }), n.push({
            s: -1,
            f: 25001
        });
        var s = n[0], i = n[1], d = 0, c = 1, u = 2;
        for (n[0] = {
            s: -1,
            f: s.f + i.f,
            l: s,
            r: i
        }; c != o - 1; ) s = n[n[d].f < n[u].f ? d++ : u++], i = n[d != c && n[d].f < n[u].f ? d++ : u++], 
        n[c++] = {
            s: -1,
            f: s.f + i.f,
            l: s,
            r: i
        };
        var p = r[0].s;
        for (a = 1; a < o; ++a) r[a].s > p && (p = r[a].s);
        var m = new De(p + 1), f = Qe(n[c - 1], m, 0);
        if (f > t) {
            a = 0;
            var h = 0, g = f - t, b = 1 << g;
            for (r.sort(function(e, t) {
                return m[t.s] - m[e.s] || e.f - t.f;
            }); a < o; ++a) {
                var v = r[a].s;
                if (!(m[v] > t)) break;
                h += b - (1 << f - m[v]), m[v] = t;
            }
            for (h >>= g; h > 0; ) {
                var y = r[a].s;
                m[y] < t ? h -= 1 << t - m[y]++ - 1 : ++a;
            }
            for (;a >= 0 && h; --a) {
                var x = r[a].s;
                m[x] == t && (--m[x], ++h);
            }
            f = t;
        }
        return {
            t: new Se(m),
            l: f
        };
    }, Qe = function(e, t, n) {
        return -1 == e.s ? Math.max(Qe(e.l, t, n + 1), Qe(e.r, t, n + 1)) : t[e.s] = n;
    }, Ke = function(e) {
        for (var t = e.length; t && !e[--t]; ) ;
        for (var n = new De(++t), a = 0, o = e[0], r = 1, l = function(e) {
            n[a++] = e;
        }, s = 1; s <= t; ++s) if (e[s] == o && s != t) ++r; else {
            if (!o && r > 2) {
                for (;r > 138; r -= 138) l(32754);
                r > 2 && (l(r > 10 ? r - 11 << 5 | 28690 : r - 3 << 5 | 12305), r = 0);
            } else if (r > 3) {
                for (l(o), --r; r > 6; r -= 6) l(8304);
                r > 2 && (l(r - 3 << 5 | 8208), r = 0);
            }
            for (;r--; ) l(o);
            r = 1, o = e[s];
        }
        return {
            c: n.subarray(0, a),
            n: t
        };
    }, et = function(e, t) {
        for (var n = 0, a = 0; a < t.length; ++a) n += e[a] * t[a];
        return n;
    }, tt = function(e, t, n) {
        var a = n.length, o = Ue(t + 2);
        e[o] = 255 & a, e[o + 1] = a >> 8, e[o + 2] = 255 ^ e[o], e[o + 3] = 255 ^ e[o + 1];
        for (var r = 0; r < a; ++r) e[o + r + 4] = n[r];
        return 8 * (o + 4 + a);
    }, nt = function(e, t, n, a, o, r, l, s, i, d, c) {
        Xe(t, c++, n), ++o[256];
        for (var u = Ge(o, 15), p = u.t, m = u.l, f = Ge(r, 15), h = f.t, g = f.l, b = Ke(p), v = b.c, y = b.n, x = Ke(h), w = x.c, C = x.n, _ = new De(19), F = 0; F < v.length; ++F) ++_[31 & v[F]];
        for (F = 0; F < w.length; ++F) ++_[31 & w[F]];
        for (var k = Ge(_, 7), S = k.t, D = k.l, M = 19; M > 4 && !S[ze[M - 1]]; --M) ;
        var $, T, z, N, B = d + 5 << 3, Y = et(o, je) + et(r, Ve) + l, O = et(o, p) + et(r, h) + l + 14 + 3 * M + et(_, S) + 2 * _[16] + 3 * _[17] + 7 * _[18];
        if (i >= 0 && B <= Y && B <= O) return tt(t, c, e.subarray(i, i + d));
        if (Xe(t, c, 1 + (O < Y)), c += 2, O < Y) {
            $ = Ae(p, m, 0), T = p, z = Ae(h, g, 0), N = h;
            var E = Ae(S, D, 0);
            Xe(t, c, y - 257), Xe(t, c + 5, C - 1), Xe(t, c + 10, M - 4), c += 14;
            for (F = 0; F < M; ++F) Xe(t, c + 3 * F, S[ze[F]]);
            c += 3 * M;
            for (var I = [ v, w ], H = 0; H < 2; ++H) {
                var P = I[H];
                for (F = 0; F < P.length; ++F) {
                    var A = 31 & P[F];
                    Xe(t, c, E[A]), c += S[A], A > 15 && (Xe(t, c, P[F] >> 5 & 127), c += P[F] >> 12);
                }
            }
        } else $ = Re, T = je, z = Le, N = Ve;
        for (F = 0; F < s; ++F) {
            var j = a[F];
            if (j > 255) {
                qe(t, c, $[(A = j >> 18 & 31) + 257]), c += T[A + 257], A > 7 && (Xe(t, c, j >> 23 & 31), 
                c += $e[A]);
                var V = 31 & j;
                qe(t, c, z[V]), c += N[V], V > 3 && (qe(t, c, j >> 5 & 8191), c += Te[V]);
            } else qe(t, c, $[j]), c += T[j];
        }
        return qe(t, c, $[256]), c + T[256];
    }, at = new Me([ 65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632 ]), ot = new Se(0), rt = function() {
        for (var e = new Int32Array(256), t = 0; t < 256; ++t) {
            for (var n = t, a = 9; --a; ) n = (1 & n && -306674912) ^ n >>> 1;
            e[t] = n;
        }
        return e;
    }(), lt = function() {
        var e = -1;
        return {
            p: function(t) {
                for (var n = e, a = 0; a < t.length; ++a) n = rt[255 & n ^ t[a]] ^ n >>> 8;
                e = n;
            },
            d: function() {
                return ~e;
            }
        };
    }, st = function(e, t, n, a, o) {
        if (!o && (o = {
            l: 1
        }, t.dictionary)) {
            var r = t.dictionary.subarray(-32768), l = new Se(r.length + e.length);
            l.set(r), l.set(e, r.length), e = l, o.w = r.length;
        }
        return function(e, t, n, a, o, r) {
            var l = r.z || e.length, s = new Se(a + l + 5 * (1 + Math.ceil(l / 7e3)) + o), i = s.subarray(a, s.length - o), d = r.l, c = 7 & (r.r || 0);
            if (t) {
                c && (i[0] = r.r >> 3);
                for (var u = at[t - 1], p = u >> 13, m = 8191 & u, f = (1 << n) - 1, h = r.p || new De(32768), g = r.h || new De(f + 1), b = Math.ceil(n / 3), v = 2 * b, y = function(t) {
                    return (e[t] ^ e[t + 1] << b ^ e[t + 2] << v) & f;
                }, x = new Me(25e3), w = new De(288), C = new De(32), _ = 0, F = 0, k = r.i || 0, S = 0, D = r.w || 0, M = 0; k + 2 < l; ++k) {
                    var $ = y(k), T = 32767 & k, z = g[$];
                    if (h[T] = z, g[$] = T, D <= k) {
                        var N = l - k;
                        if ((_ > 7e3 || S > 24576) && (N > 423 || !d)) {
                            c = nt(e, i, 0, x, w, C, F, S, M, k - M, c), S = _ = F = 0, M = k;
                            for (var B = 0; B < 286; ++B) w[B] = 0;
                            for (B = 0; B < 30; ++B) C[B] = 0;
                        }
                        var Y = 2, O = 0, E = m, I = T - z & 32767;
                        if (N > 2 && $ == y(k - I)) for (var H = Math.min(p, N) - 1, P = Math.min(32767, k), A = Math.min(258, N); I <= P && --E && T != z; ) {
                            if (e[k + Y] == e[k + Y - I]) {
                                for (var j = 0; j < A && e[k + j] == e[k + j - I]; ++j) ;
                                if (j > Y) {
                                    if (Y = j, O = I, j > H) break;
                                    var V = Math.min(I, j - 2), R = 0;
                                    for (B = 0; B < V; ++B) {
                                        var L = k - I + B & 32767, U = L - h[L] & 32767;
                                        U > R && (R = U, z = L);
                                    }
                                }
                            }
                            I += (T = z) - (z = h[T]) & 32767;
                        }
                        if (O) {
                            x[S++] = 268435456 | Oe[Y] << 18 | Ee[O];
                            var W = 31 & Oe[Y], J = 31 & Ee[O];
                            F += $e[W] + Te[J], ++w[257 + W], ++C[J], D = k + Y, ++_;
                        } else x[S++] = e[k], ++w[e[k]];
                    }
                }
                for (k = Math.max(k, D); k < l; ++k) x[S++] = e[k], ++w[e[k]];
                c = nt(e, i, d, x, w, C, F, S, M, k - M, c), d || (r.r = 7 & c | i[c / 8 | 0] << 3, 
                c -= 7, r.h = g, r.p = h, r.i = k, r.w = D);
            } else {
                for (k = r.w || 0; k < l + d; k += 65535) {
                    var Z = k + 65535;
                    Z >= l && (i[c / 8 | 0] = d, Z = l), c = tt(i, c + 1, e.subarray(k, Z));
                }
                r.i = l;
            }
            return We(s, 0, a + Ue(c) + o);
        }(e, null == t.level ? 6 : t.level, null == t.mem ? o.l ? Math.ceil(1.5 * Math.max(8, Math.min(13, Math.log(e.length)))) : 20 : 12 + t.mem, n, a, o);
    }, it = function(e, t) {
        var n = {};
        for (var a in e) n[a] = e[a];
        for (var a in t) n[a] = t[a];
        return n;
    }, dt = function(e, t, n) {
        for (;n; ++t) e[t] = n, n >>>= 8;
    };
    function ct(e, t) {
        return st(e, t || {}, 0, 0);
    }
    var ut = function(e, t, n, a) {
        for (var o in e) {
            var r = e[o], l = t + o, s = a;
            Array.isArray(r) && (s = it(a, r[1]), r = r[0]), ArrayBuffer.isView(r) ? n[l] = [ r, s ] : (n[l += "/"] = [ new Se(0), s ], 
            ut(r, l, n, a));
        }
    }, pt = "undefined" != typeof TextEncoder && new TextEncoder, mt = "undefined" != typeof TextDecoder && new TextDecoder;
    try {
        mt.decode(ot, {
            stream: !0
        });
    } catch (e) {}
    function ft(e, t) {
        if (t) {
            for (var n = new Se(e.length), a = 0; a < e.length; ++a) n[a] = e.charCodeAt(a);
            return n;
        }
        if (pt) return pt.encode(e);
        var o = e.length, r = new Se(e.length + (e.length >> 1)), l = 0, s = function(e) {
            r[l++] = e;
        };
        for (a = 0; a < o; ++a) {
            if (l + 5 > r.length) {
                var i = new Se(l + 8 + (o - a << 1));
                i.set(r), r = i;
            }
            var d = e.charCodeAt(a);
            d < 128 || t ? s(d) : d < 2048 ? (s(192 | d >> 6), s(128 | 63 & d)) : d > 55295 && d < 57344 ? (s(240 | (d = 65536 + (1047552 & d) | 1023 & e.charCodeAt(++a)) >> 18), 
            s(128 | d >> 12 & 63), s(128 | d >> 6 & 63), s(128 | 63 & d)) : (s(224 | d >> 12), 
            s(128 | d >> 6 & 63), s(128 | 63 & d));
        }
        return We(r, 0, l);
    }
    var ht = function(e) {
        var t = 0;
        if (e) for (var n in e) {
            var a = e[n].length;
            a > 65535 && Ze(9), t += a + 4;
        }
        return t;
    }, gt = function(e, t, n, a, o, r, l, s) {
        var i = a.length, d = n.extra, c = s && s.length, u = ht(d);
        dt(e, t, null != l ? 33639248 : 67324752), t += 4, null != l && (e[t++] = 20, e[t++] = n.os), 
        e[t] = 20, t += 2, e[t++] = n.flag << 1 | (r < 0 && 8), e[t++] = o && 8, e[t++] = 255 & n.compression, 
        e[t++] = n.compression >> 8;
        var p = new Date(null == n.mtime ? Date.now() : n.mtime), m = p.getFullYear() - 1980;
        if ((m < 0 || m > 119) && Ze(10), dt(e, t, m << 25 | p.getMonth() + 1 << 21 | p.getDate() << 16 | p.getHours() << 11 | p.getMinutes() << 5 | p.getSeconds() >> 1), 
        t += 4, -1 != r && (dt(e, t, n.crc), dt(e, t + 4, r < 0 ? -r - 2 : r), dt(e, t + 8, n.size)), 
        dt(e, t + 12, i), dt(e, t + 14, u), t += 16, null != l && (dt(e, t, c), dt(e, t + 6, n.attrs), 
        dt(e, t + 10, l), t += 14), e.set(a, t), t += i, u) for (var f in d) {
            var h = d[f], g = h.length;
            dt(e, t, +f), dt(e, t + 2, g), e.set(h, t + 4), t += 4 + g;
        }
        return c && (e.set(s, t), t += c), t;
    };
    function bt(e, t) {
        t || (t = {});
        var n = {}, a = [];
        ut(e, "", n, t);
        var o = 0, r = 0;
        for (var l in n) {
            var s = n[l], i = s[0], d = s[1], c = 0 == d.level ? 0 : 8, u = (_ = ft(l)).length, p = d.comment, m = p && ft(p), f = m && m.length, h = ht(d.extra);
            u > 65535 && Ze(11);
            var g = c ? ct(i, d) : i, b = g.length, v = lt();
            v.p(i), a.push(it(d, {
                size: i.length,
                crc: v.d(),
                c: g,
                f: _,
                m: m,
                u: u != l.length || m && p.length != f,
                o: o,
                compression: c
            })), o += 30 + u + h + b, r += 76 + 2 * (u + h) + (f || 0) + b;
        }
        for (var y = new Se(r + 22), x = o, w = r - o, C = 0; C < a.length; ++C) {
            var _ = a[C];
            gt(y, _.o, _, _.f, _.u, _.c.length);
            var F = 30 + _.f.length + ht(_.extra);
            y.set(_.c, _.o + F), gt(y, o, _, _.f, _.u, _.c.length, _.o, _.m), o += 16 + F + (_.m ? _.m.length : 0);
        }
        return function(e, t, n, a, o) {
            dt(e, t, 101010256), dt(e, t + 8, n), dt(e, t + 10, n), dt(e, t + 12, a), dt(e, t + 16, o);
        }(y, o, a.length, w, x), y;
    }
    const vt = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>', yt = 9525;
    function xt(e) {
        let t = e + 1, n = "";
        for (;t > 0; ) {
            const e = (t - 1) % 26;
            n = String.fromCharCode(65 + e) + n, t = Math.floor((t - 1) / 26);
        }
        return n;
    }
    function wt(e) {
        const t = e ? e.slice() : [], n = {};
        return t.forEach((e, t) => n[e] = t), {
            items: t,
            add: e => (void 0 === n[e] && (n[e] = t.length, t.push(e)), n[e])
        };
    }
    function Ct(e) {
        const t = [ '<sz val="' + e.size + '"/>' ];
        return e.color && t.push('<color rgb="FF' + e.color + '"/>'), t.push('<name val="' + xe(e.name) + '"/>'), 
        t.push('<family val="2"/>'), "<font>" + (e.bold ? "<b/>" : "") + (e.italic ? "<i/>" : "") + t.join("") + "</font>";
    }
    function _t(e) {
        return e ? '<fill><patternFill patternType="solid"><fgColor rgb="FF' + e + '"/><bgColor indexed="64"/></patternFill></fill>' : '<fill><patternFill patternType="none"/></fill>';
    }
    function Ft(e) {
        if (!e) return "<border><left/><right/><top/><bottom/><diagonal/></border>";
        const t = t => "<" + t + ' style="thin"><color rgb="FF' + e + '"/></' + t + ">";
        return "<border>" + t("left") + t("right") + t("top") + t("bottom") + "<diagonal/></border>";
    }
    function kt(e, t) {
        const n = t || {}, a = n.style || {}, o = n.fontFamily || "Tahoma", r = Number(n.fontSize) > 0 ? Number(n.fontSize) : 11, l = e.columns || [], s = Math.max(l.length, 1), i = we(a.headerBg) || "1F6FEB", d = we(a.headerColor) || "FFFFFF", c = we(a.bodyBg) || "FFFFFF", u = we(a.bodyColor) || "111827", p = we(a.stripeBg) || "F3F6FA", m = we(a.borderColor) || "D0D7DE", f = a.headerAlign || "center", h = wt([ Ct({
            size: r,
            name: o,
            color: u
        }) ]), g = wt([ '<fill><patternFill patternType="none"/></fill>', '<fill><patternFill patternType="gray125"/></fill>' ]), b = wt([ Ft(null), Ft(m) ]), v = [], y = {}, x = wt([ '<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>' ]), w = e => {
            const t = String(e);
            if (void 0 === y[t]) {
                const n = 164 + v.length;
                v.push('<numFmt numFmtId="' + n + '" formatCode="' + function(e) {
                    return e <= 0 ? "#,##0" : "#,##0." + new Array(e + 1).join("0");
                }(e) + '"/>'), y[t] = n;
            }
            return y[t];
        }, C = ({fontId: e, fillId: t, borderId: n, align: a, vertical: o, wrap: r, fmtId: l}) => {
            const s = a || o || r ? "<alignment" + (a ? ' horizontal="' + a + '"' : "") + (o ? ' vertical="' + o + '"' : "") + (r ? ' wrapText="1"' : "") + "/>" : "", i = l || 0;
            return x.add('<xf numFmtId="' + i + '" fontId="' + e + '" fillId="' + t + '" borderId="' + n + '" xfId="0"' + (i ? ' applyNumberFormat="1"' : "") + ' applyFont="1" applyFill="1" applyBorder="1"' + (s ? ' applyAlignment="1">' + s + "</xf>" : "/>"));
        }, _ = l.map(e => {
            const t = h.add(Ct({
                size: r,
                name: o,
                color: we(e.headerColor) || d,
                bold: !1 !== a.headerBold
            })), n = h.add(Ct({
                size: r,
                name: o,
                color: we(e.bodyColor) || u
            })), l = g.add(_t(we(e.headerBg) || i)), s = g.add(_t(we(e.bodyBg) || c)), m = e.bodyBg ? s : g.add(_t(a.stripeEnabled ? p : c)), b = "number" === e.format && null != e.decimals ? w(e.decimals) : 0, v = e.align && "left" !== e.align ? e.align : null;
            return {
                header: C({
                    fontId: t,
                    fillId: l,
                    borderId: 1,
                    align: f,
                    vertical: "center",
                    wrap: !0
                }),
                body: C({
                    fontId: n,
                    fillId: s,
                    borderId: 1,
                    align: v,
                    vertical: "top",
                    wrap: !0,
                    fmtId: b
                }),
                stripe: C({
                    fontId: n,
                    fillId: m,
                    borderId: 1,
                    align: v,
                    vertical: "top",
                    wrap: !0,
                    fmtId: b
                })
            };
        }), F = n.footer;
        let k = 0, S = 0;
        if (F) {
            const e = h.add(Ct({
                size: Number(F.fontSize) > 0 ? Number(F.fontSize) : 10,
                name: o,
                color: we(F.color) || "6B7280",
                italic: !0
            }));
            k = C({
                fontId: e,
                fillId: 0,
                borderId: 0,
                align: "left",
                vertical: "center"
            }), S = C({
                fontId: e,
                fillId: 0,
                borderId: 0,
                align: "right",
                vertical: "center"
            });
        }
        const D = l.map((t, n) => t.width > 0 ? t.width : ke(e, n)), M = D.length ? "<cols>" + D.map((e, t) => '<col min="' + (t + 1) + '" max="' + (t + 1) + '" width="' + e + '" customWidth="1"/>').join("") + "</cols>" : "", $ = [];
        $.push('<row r="1" ht="22" customHeight="1">' + e.header.map((e, t) => '<c r="' + xt(t) + '1" s="' + (_[t] ? _[t].header : 0) + '" t="inlineStr"><is><t xml:space="preserve">' + xe(e) + "</t></is></c>").join("") + "</row>"), 
        e.body.forEach((e, t) => {
            const n = t + 2, o = a.stripeEnabled && t % 2 == 1, r = e.map((e, t) => {
                const a = _[t], r = a ? o ? a.stripe : a.body : 0, l = xt(t) + n;
                return null != e.number && isFinite(e.number) ? '<c r="' + l + '" s="' + r + '"><v>' + e.number + "</v></c>" : e.text ? '<c r="' + l + '" s="' + r + '" t="inlineStr"><is><t xml:space="preserve">' + xe(e.text) + "</t></is></c>" : '<c r="' + l + '" s="' + r + '"/>';
            }).join("");
            $.push('<row r="' + n + '">' + r + "</row>");
        });
        let T = e.body.length + 1;
        const z = [];
        if (F && (F.startDate || F.docCode)) {
            T += 2;
            const e = [];
            e.push('<c r="A' + T + '" s="' + k + '" t="inlineStr"><is><t xml:space="preserve">' + xe(F.startDate || "") + "</t></is></c>"), 
            s > 1 && e.push('<c r="' + xt(s - 1) + T + '" s="' + S + '" t="inlineStr"><is><t xml:space="preserve">' + xe(F.docCode || "") + "</t></is></c>"), 
            $.push('<row r="' + T + '">' + e.join("") + "</row>");
        }
        const N = n.watermark && n.watermark.bytes ? n.watermark : null, B = vt + '<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><dimension ref="A1:' + xt(s - 1) + Math.max(T, 1) + '"/><sheetViews><sheetView tabSelected="1" workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/><selection pane="bottomLeft" activeCell="A2" sqref="A2"/></sheetView></sheetViews><sheetFormatPr defaultRowHeight="15"/>' + M + "<sheetData>" + $.join("") + "</sheetData>" + (e.body.length ? '<autoFilter ref="A1:' + xt(s - 1) + '1"/>' : "") + (z.length ? '<mergeCells count="' + z.length + '">' + z.join("") + "</mergeCells>" : "") + '<pageMargins left="0.5" right="0.5" top="0.6" bottom="0.6" header="0.3" footer="0.3"/>' + (N ? '<drawing r:id="rId1"/>' : "") + "</worksheet>", Y = vt + '<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">' + (v.length ? '<numFmts count="' + v.length + '">' + v.join("") + "</numFmts>" : "") + '<fonts count="' + h.items.length + '">' + h.items.join("") + '</fonts><fills count="' + g.items.length + '">' + g.items.join("") + '</fills><borders count="' + b.items.length + '">' + b.items.join("") + '</borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="' + x.items.length + '">' + x.items.join("") + '</cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>', O = vt + '<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="' + xe(Fe(n.sheetName)) + '" sheetId="1" r:id="rId1"/></sheets></workbook>', E = {
            "_rels/.rels": ft(vt + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'),
            "xl/workbook.xml": ft(O),
            "xl/_rels/workbook.xml.rels": ft(vt + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>'),
            "xl/styles.xml": ft(Y),
            "xl/worksheets/sheet1.xml": ft(B)
        }, I = [ '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>', '<Default Extension="xml" ContentType="application/xml"/>', '<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>', '<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>', '<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>' ];
        if (N) {
            const e = "jpg" === N.ext ? "jpeg" : N.ext || "png", t = "jpeg" === e ? "image/jpeg" : "gif" === e ? "image/gif" : "image/png", n = D.reduce((e, t) => e + 7 * t + 5, 0) || 800, a = (Number(N.size) > 0 ? Number(N.size) : 55) / 100, o = Math.max(120, Math.round(n * a)), r = N.width && N.height ? N.height / N.width : 1, l = Math.round(o * r), s = o * yt, i = l * yt, d = Math.max(0, Math.round((n - o) / 2)) * yt, c = Math.round(.35 * l) * yt, u = Number(N.opacity), p = 1e3 * Math.max(0, Math.min(100, isNaN(u) ? 12 : u));
            E["xl/media/image1." + e] = N.bytes, E["xl/drawings/drawing1.xml"] = ft(vt + '<xdr:wsDr xmlns:xdr="http://schemas.openxmlformats.org/drawingml/2006/spreadsheetDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><xdr:absoluteAnchor><xdr:pos x="' + d + '" y="' + c + '"/><xdr:ext cx="' + s + '" cy="' + i + '"/><xdr:pic><xdr:nvPicPr><xdr:cNvPr id="1" name="Watermark"/><xdr:cNvPicPr><a:picLocks noChangeAspect="1"/></xdr:cNvPicPr></xdr:nvPicPr><xdr:blipFill><a:blip r:embed="rId1"><a:alphaModFix amt="' + p + '"/></a:blip><a:stretch><a:fillRect/></a:stretch></xdr:blipFill><xdr:spPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="' + s + '" cy="' + i + '"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom></xdr:spPr></xdr:pic><xdr:clientData/></xdr:absoluteAnchor></xdr:wsDr>'), 
            E["xl/drawings/_rels/drawing1.xml.rels"] = ft(vt + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="../media/image1.' + e + '"/></Relationships>'), 
            E["xl/worksheets/_rels/sheet1.xml.rels"] = ft(vt + '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/drawing" Target="../drawings/drawing1.xml"/></Relationships>'), 
            I.push('<Default Extension="' + e + '" ContentType="' + t + '"/>'), I.push('<Override PartName="/xl/drawings/drawing1.xml" ContentType="application/vnd.openxmlformats-officedocument.drawing+xml"/>');
        }
        const H = {
            "[Content_Types].xml": ft(vt + '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' + I.join("") + "</Types>")
        };
        return Object.keys(E).forEach(e => {
            H[e] = E[e];
        }), bt(H, {
            level: 6,
            mtime: new Date
        });
    }
    function St(e, t) {
        return new Promise((n, a) => {
            let o;
            try {
                o = document.createElement("iframe"), o.setAttribute("aria-hidden", "true"), o.style.position = "fixed", 
                o.style.right = "0", o.style.bottom = "0", o.style.width = "0", o.style.height = "0", 
                o.style.border = "0", o.style.opacity = "0", document.body.appendChild(o);
                const r = () => {
                    setTimeout(() => {
                        o && o.parentNode && o.parentNode.removeChild(o);
                    }, 1e3);
                }, l = o.contentWindow.document;
                if (l.open(), l.write(e), l.close(), t) try {
                    l.title = t;
                } catch (e) {}
                (function(e, t) {
                    const n = Array.prototype.slice.call(e.images || []);
                    if (!n.length) return Promise.resolve();
                    const a = n.filter(e => !e.complete).map(e => new Promise(t => {
                        e.addEventListener("load", t, {
                            once: !0
                        }), e.addEventListener("error", t, {
                            once: !0
                        });
                    }));
                    return a.length ? Promise.race([ Promise.all(a), new Promise(e => setTimeout(e, t || 6e3)) ]) : Promise.resolve();
                })(l).then(() => {
                    try {
                        o.contentWindow.focus(), o.contentWindow.print(), r(), n();
                    } catch (e) {
                        r(), a(e);
                    }
                });
            } catch (e) {
                o && o.parentNode && o.parentNode.removeChild(o), a(e);
            }
        });
    }
    const Dt = new RegExp('[\\\\/:*?"<>|\\u0000-\\u001F]', "g");
    function Mt(e, t) {
        const n = URL.createObjectURL(e), a = document.createElement("a");
        a.href = n, a.download = t, a.style.display = "none", document.body.appendChild(a), 
        a.click(), document.body.removeChild(a), setTimeout(() => URL.revokeObjectURL(n), 4e3);
    }
    function $t(e, t, n, a) {
        Mt(new Blob(a ? [ "\ufeff", e ] : [ e ], {
            type: n + ";charset=utf-8;"
        }), t);
    }
    function Tt(e, t) {
        return String(null == e ? "" : e).replace(Dt, "").replace(/\s+/g, " ").replace(/^[. ]+|[. ]+$/g, "").trim() || t || "export";
    }
    const zt = [ {
        value: "csv",
        ext: "csv",
        label: "CSV",
        labelTh: "CSV"
    }, {
        value: "xlsx",
        ext: "xlsx",
        label: "Excel (.xlsx)",
        labelTh: "Excel (.xlsx)"
    }, {
        value: "xls",
        ext: "xls",
        label: "Excel 2003 (.xls)",
        labelTh: "Excel 2003 (.xls)"
    }, {
        value: "html",
        ext: "html",
        label: "Web page (.html)",
        labelTh: "หน้าเว็บ (.html)"
    }, {
        value: "pdf",
        ext: "pdf",
        label: "PDF (print)",
        labelTh: "PDF (สั่งพิมพ์)"
    }, {
        value: "txt",
        ext: "txt",
        label: "Text (.txt)",
        labelTh: "ข้อความ (.txt)"
    }, {
        value: "json",
        ext: "json",
        label: "JSON",
        labelTh: "JSON"
    } ];
    function Nt(e, t, n) {
        const a = n || {}, o = function(e) {
            for (let t = 0; t < zt.length; t++) if (zt[t].value === e) return zt[t];
            return zt[0];
        }(t);
        let r = Tt(e, "export");
        return a.appendTimestamp && (r += "-" + function(e) {
            const t = new Date, n = e || {};
            return v(t, "YYYYMMDD-HHmmss", {
                offsetMinutes: h(n.timezone, n.tzOffsetHours, t)
            });
        }({
            timezone: a.timezone,
            tzOffsetHours: a.tzOffsetHours
        })), r + "." + o.ext;
    }
    async function Bt(e, t, n) {
        const a = n || {}, o = Nt(a.fileName, t, a), r = e.body.length;
        if ("csv" === t || "txt" === t) {
            return $t(ge(e, {
                delimiter: "txt" === t ? "tab" : a.delimiter,
                footer: a.footer
            }), o, "txt" === t ? "text/plain" : "text/csv", !1 !== a.bom), {
                fileName: o,
                rowCount: r,
                format: t
            };
        }
        if ("json" === t) return $t(function(e, t) {
            const n = t || {}, a = e.body.map(t => {
                const n = {};
                return e.header.forEach((e, a) => {
                    const o = e || "column" + (a + 1), r = t[a];
                    n[o] = r ? r.text : "";
                }), n;
            }), o = n.footer;
            return o && (o.startDate || o.docCode) ? JSON.stringify({
                meta: {
                    startDate: o.startDate || void 0,
                    documentCode: o.docCode || void 0,
                    rowCount: a.length
                },
                rows: a
            }, null, 2) : JSON.stringify(a, null, 2);
        }(e, {
            footer: a.footer
        }), o, "application/json", !1), {
            fileName: o,
            rowCount: r,
            format: t
        };
        if ("xls" === t) {
            const n = function(e, t) {
                const n = t || {}, a = n.style || {}, o = n.fontFamily || "Tahoma", r = Number(n.fontSize) > 0 ? Number(n.fontSize) : 11, l = e.columns || [], s = Ce(a.headerBg, "#1F6FEB"), i = Ce(a.headerColor, "#FFFFFF"), d = Ce(a.bodyBg, "#FFFFFF"), c = Ce(a.bodyColor, "#111827"), u = Ce(a.stripeBg, "#F3F6FA"), p = Ce(a.borderColor, "#D0D7DE"), m = _e[a.headerAlign] || "Center", f = "<Borders>" + [ "Left", "Top", "Right", "Bottom" ].map(e => '<Border ss:Position="' + e + '" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="' + p + '"/>').join("") + "</Borders>", h = [];
                h.push('<Style ss:ID="Default" ss:Name="Normal"><Alignment ss:Vertical="Top"/><Font ss:FontName="' + xe(o) + '" ss:Size="' + r + '" ss:Color="' + c + '"/></Style>'), 
                l.forEach((e, t) => {
                    const n = Ce(e.headerBg, s), l = Ce(e.headerColor, i), p = _e[e.align] || "Left";
                    h.push('<Style ss:ID="h' + t + '"><Alignment ss:Horizontal="' + m + '" ss:Vertical="Center" ss:WrapText="1"/><Font ss:FontName="' + xe(o) + '" ss:Size="' + r + '" ss:Color="' + l + '" ss:Bold="' + (!1 === a.headerBold ? "0" : "1") + '"/><Interior ss:Color="' + n + '" ss:Pattern="Solid"/>' + f + "</Style>");
                    const g = Ce(e.bodyBg, d), b = Ce(e.bodyColor, c), v = a.stripeEnabled ? Ce(e.bodyBg, u) : g;
                    h.push('<Style ss:ID="d' + t + '"><Alignment ss:Horizontal="' + p + '" ss:Vertical="Top"/><Font ss:FontName="' + xe(o) + '" ss:Size="' + r + '" ss:Color="' + b + '"/><Interior ss:Color="' + g + '" ss:Pattern="Solid"/>' + f + "</Style>"), 
                    h.push('<Style ss:ID="s' + t + '"><Alignment ss:Horizontal="' + p + '" ss:Vertical="Top"/><Font ss:FontName="' + xe(o) + '" ss:Size="' + r + '" ss:Color="' + b + '"/><Interior ss:Color="' + v + '" ss:Pattern="Solid"/>' + f + "</Style>");
                });
                const g = n.footer;
                if (g) {
                    const e = Ce(g.color, "#6B7280"), t = Number(g.fontSize) > 0 ? Number(g.fontSize) : 10;
                    h.push('<Style ss:ID="fL"><Alignment ss:Horizontal="Left" ss:Vertical="Center"/><Font ss:FontName="' + xe(o) + '" ss:Size="' + t + '" ss:Color="' + e + '" ss:Italic="1"/></Style>'), 
                    h.push('<Style ss:ID="fR"><Alignment ss:Horizontal="Right" ss:Vertical="Center"/><Font ss:FontName="' + xe(o) + '" ss:Size="' + t + '" ss:Color="' + e + '" ss:Italic="1"/></Style>');
                }
                const b = l.map((t, n) => {
                    const a = t.width > 0 ? t.width : ke(e, n);
                    return '<Column ss:Index="' + (n + 1) + '" ss:AutoFitWidth="0" ss:Width="' + Math.round(7 * a * .75) + '"/>';
                }).join(""), v = '<Row ss:Height="22">' + e.header.map((e, t) => '<Cell ss:StyleID="h' + t + '"><Data ss:Type="String">' + xe(e) + "</Data></Cell>").join("") + "</Row>", y = e.body.map((e, t) => {
                    const n = a.stripeEnabled && t % 2 == 1 ? "s" : "d", o = e.map((e, t) => {
                        const a = null != e.number && isFinite(e.number), o = a ? "Number" : "String", r = a ? e.number : xe(e.text);
                        return '<Cell ss:StyleID="' + n + t + '"><Data ss:Type="' + o + '">' + r + "</Data></Cell>";
                    }).join("");
                    return "<Row>" + o + "</Row>";
                }).join("");
                let x = "";
                if (g && (g.startDate || g.docCode)) {
                    const e = Math.max(l.length, 1);
                    x += "<Row/>", x += "<Row>", x += '<Cell ss:StyleID="fL"><Data ss:Type="String">' + xe(g.startDate || "") + "</Data></Cell>", 
                    e > 1 && (x += '<Cell ss:Index="' + e + '" ss:StyleID="fR"><Data ss:Type="String">' + xe(g.docCode || "") + "</Data></Cell>"), 
                    x += "</Row>";
                }
                return [ '<?xml version="1.0" encoding="UTF-8"?>', '<?mso-application progid="Excel.Sheet"?>', '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"', ' xmlns:o="urn:schemas-microsoft-com:office:office"', ' xmlns:x="urn:schemas-microsoft-com:office:excel"', ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"', ' xmlns:html="http://www.w3.org/TR/REC-html40">', "<Styles>" + h.join("") + "</Styles>", '<Worksheet ss:Name="' + xe(Fe(n.sheetName)) + '">', "<Table>", b, v, y, x, "</Table>", '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">', "<FreezePanes/><FrozenNoSplit/><SplitHorizontal>1</SplitHorizontal>", "<TopRowBottomPane>1</TopRowBottomPane><ActivePane>2</ActivePane>", "</WorksheetOptions>", "</Worksheet>", "</Workbook>" ].join("\n");
            }(e, {
                sheetName: a.sheetName,
                fontFamily: a.fontFamily,
                fontSize: a.fontSize,
                style: a.style,
                footer: a.footer
            });
            return $t(n, o, "application/vnd.ms-excel", !1), {
                fileName: o,
                rowCount: r,
                format: t
            };
        }
        if ("xlsx" === t) {
            return function(e, t, n) {
                Mt(new Blob([ e ], {
                    type: n
                }), t);
            }(kt(e, {
                sheetName: a.sheetName,
                fontFamily: a.fontFamily,
                fontSize: a.fontSize,
                style: a.style,
                footer: a.footer,
                watermark: a.watermark
            }), o, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"), {
                fileName: o,
                rowCount: r,
                format: t
            };
        }
        const l = function(e, t) {
            const n = t || {}, a = n.style || {}, o = n.fontFamily || "Tahoma", r = Number(n.fontSize) > 0 ? Number(n.fontSize) : 11, l = n.title || "Export", s = ve(a.headerBg, "#1F6FEB"), i = ve(a.headerColor, "#FFFFFF"), d = ve(a.bodyBg, "#FFFFFF"), c = ve(a.bodyColor, "#111827"), u = ve(a.stripeBg, "#F3F6FA"), p = ve(a.borderColor, "#D0D7DE"), m = a.headerAlign || "center", f = e.columns || [], h = n.watermark, g = n.footer, b = [];
            f.forEach((e, t) => {
                const n = t + 1, a = [];
                e.headerBg && a.push("background:" + e.headerBg), e.headerColor && a.push("color:" + e.headerColor), 
                a.length && b.push("thead th:nth-child(" + n + "){" + a.join(";") + "}");
                const o = [];
                e.bodyBg && o.push("background:" + e.bodyBg), e.bodyColor && o.push("color:" + e.bodyColor), 
                e.align && "left" !== e.align && o.push("text-align:" + e.align), e.width && o.push("width:" + 8 * e.width + "px"), 
                o.length && b.push("tbody td:nth-child(" + n + "){" + o.join(";") + "}");
            });
            const v = a.stripeEnabled ? "tbody tr:nth-child(even) td{background:" + u + "}" : "", y = h ? [ ".ec-watermark{", "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);", "width:" + (Number(h.size) > 0 ? Number(h.size) : 55) + "%;", "opacity:" + (Number(h.opacity) >= 0 ? Number(h.opacity) : 12) / 100 + ";", "z-index:0;pointer-events:none;user-select:none;", "-webkit-print-color-adjust:exact;print-color-adjust:exact;", "}", ".ec-watermark img{width:100%;height:auto;display:block}" ].join("") : "", x = g ? [ ".ec-footer{", "position:fixed;bottom:0;left:0;right:0;", "display:flex;justify-content:space-between;align-items:flex-end;gap:16px;", "padding:6px 0;", "font-size:" + (Number(g.fontSize) > 0 ? Number(g.fontSize) : 10) + "pt;", "color:" + ve(g.color, "#6B7280") + ";", "background:transparent;z-index:2;", "}", ".ec-footer .ec-right{text-align:right}" ].join("") : "", w = [ "@page{size:A4 landscape;margin:14mm 12mm 18mm}", "*{box-sizing:border-box}", "html,body{margin:0;padding:0}", "body{", "font-family:'" + o + "','Sarabun','TH Sarabun New','Noto Sans Thai',Tahoma,sans-serif;", "font-size:" + r + "pt;color:" + c + ";background:#fff;", "padding:14mm 12mm 18mm;", "-webkit-print-color-adjust:exact;print-color-adjust:exact;", "}", y, ".ec-sheet{position:relative;z-index:1}", "table{border-collapse:collapse;width:100%;table-layout:auto}", "thead{display:table-header-group}", "tfoot{display:table-footer-group}", "tr{page-break-inside:avoid;break-inside:avoid}", "th,td{border:1px solid " + p + ";padding:4px 8px;vertical-align:top;word-break:break-word}", "thead th{", "background:" + s + ";color:" + i + ";", "text-align:" + m + ";", "font-weight:" + (!1 === a.headerBold ? "400" : "700") + ";", "}", "tbody td{background:" + d + ";color:" + c + "}", v, b.join(""), x ].join(""), C = e.header.map(e => "<th>" + be(e) + "</th>").join(""), _ = e.body.map(e => "<tr>" + e.map(e => "<td>" + be(e.text) + "</td>").join("") + "</tr>").join(""), F = [];
            return F.push("<!DOCTYPE html>"), F.push('<html lang="' + be(n.lang || "th") + '">'), 
            F.push("<head>"), F.push('<meta charset="utf-8">'), F.push('<meta name="viewport" content="width=device-width,initial-scale=1">'), 
            F.push("<title>" + be(l) + "</title>"), F.push("<style>" + w + "</style>"), F.push("</head>"), 
            F.push("<body>"), h && h.dataUrl && F.push('<div class="ec-watermark"><img src="' + be(h.dataUrl) + '" alt=""></div>'), 
            F.push('<div class="ec-sheet">'), F.push("<table>"), F.push("<thead><tr>" + C + "</tr></thead>"), 
            F.push("<tbody>" + _ + "</tbody>"), F.push("</table>"), F.push("</div>"), g && (g.startDate || g.docCode) && (F.push('<div class="ec-footer">'), 
            F.push('<div class="ec-left">' + be(g.startDate || "") + "</div>"), F.push('<div class="ec-right">' + be(g.docCode || "") + "</div>"), 
            F.push("</div>")), F.push("</body></html>"), F.join("\n");
        }(e, {
            title: a.title || a.fileName,
            lang: a.lang,
            fontFamily: a.fontFamily,
            fontSize: a.fontSize,
            style: a.style,
            footer: a.footer,
            watermark: a.watermark
        });
        if ("html" === t) return $t(l, o, "text/html", !1), {
            fileName: o,
            rowCount: r,
            format: t
        };
        if ("pdf" === t) return await St(l, Tt(a.fileName, "export")), {
            fileName: o,
            rowCount: r,
            format: t
        };
        throw new Error("Unknown export format: " + t);
    }
    Y('.ec-root.svelte-1hd6tas{display:inline-block;font-family:"Sarabun", "Noto Sans Thai", Tahoma, system-ui, -apple-system, sans-serif}.ec-root.ec-full.svelte-1hd6tas{display:block;width:100%}.ec-actions.svelte-1hd6tas{display:inline-flex;gap:8px;align-items:center;flex-wrap:wrap}.ec-actions.ec-full.svelte-1hd6tas{display:flex;width:100%}.ec-export.svelte-1hd6tas,.ec-secondary.svelte-1hd6tas{display:inline-flex;align-items:center;gap:6px;border:1px solid transparent;cursor:pointer;font-weight:600;line-height:1;font-family:inherit;transition:filter 0.15s ease, background 0.15s ease;white-space:nowrap}.ec-export.ec-full.svelte-1hd6tas{flex:1;justify-content:center}.ec-export.svelte-1hd6tas:hover:not(:disabled){filter:brightness(0.94)}.ec-export.svelte-1hd6tas:disabled{opacity:0.65;cursor:default}.ec-secondary.svelte-1hd6tas{background:var(--spectrum-global-color-gray-100, #f3f4f6);color:var(--spectrum-global-color-gray-800, #1f2937);border-color:var(--spectrum-global-color-gray-300, #d1d5db);border-radius:6px}.ec-secondary.svelte-1hd6tas:hover{background:var(--spectrum-global-color-gray-200, #e5e7eb)}.ec-S.svelte-1hd6tas{padding:6px 10px;font-size:12px}.ec-M.svelte-1hd6tas{padding:9px 14px;font-size:13px}.ec-L.svelte-1hd6tas{padding:12px 18px;font-size:15px}.ec-count.svelte-1hd6tas{background:rgba(255, 255, 255, 0.24);border-radius:10px;padding:1px 7px;font-size:11px;font-weight:700}.ec-caret.svelte-1hd6tas{font-size:9px;opacity:0.7}.ec-format.svelte-1hd6tas{position:relative;display:inline-flex}.ec-menu.svelte-1hd6tas{position:absolute;top:calc(100% + 4px);left:0;min-width:190px;background:#fff;border:1px solid #d1d5db;border-radius:8px;box-shadow:0 10px 28px rgba(0, 0, 0, 0.16);padding:4px;z-index:99999}.ec-menu-item.svelte-1hd6tas{display:block;width:100%;text-align:left;border:none;background:transparent;padding:7px 10px;font-size:12px;border-radius:5px;cursor:pointer;color:#1f2937;font-family:inherit}.ec-menu-item.svelte-1hd6tas:hover{background:#f3f4f6}.ec-selected.svelte-1hd6tas{background:#eef2ff;font-weight:700}.ec-status.svelte-1hd6tas{margin-top:6px;font-size:12px;color:var(--spectrum-global-color-gray-700, #374151)}.ec-muted.svelte-1hd6tas{opacity:0.7;font-style:italic}');
    const {window: Yt} = t.globals;
    function Ot(e, t, n) {
        const a = e.slice();
        return a[126] = t[n], a;
    }
    function Et(e) {
        let n, a;
        return {
            c() {
                n = t.svg_element("svg"), a = t.svg_element("path"), t.attr(a, "fill", "currentColor"), 
                t.attr(a, "d", "M12 3v10.6l3.3-3.3 1.4 1.4L12 17.4l-4.7-4.7 1.4-1.4L12 13.6V3zM5 19h14v2H5z"), 
                t.attr(n, "viewBox", "0 0 24 24"), t.attr(n, "width", "16"), t.attr(n, "height", "16"), 
                t.attr(n, "aria-hidden", "true");
            },
            m(e, o) {
                t.insert(e, n, o), t.append(n, a);
            },
            d(e) {
                e && t.detach(n);
            }
        };
    }
    function It(e) {
        let n, a;
        return {
            c() {
                n = t.element("span"), a = t.text(e[20]), t.attr(n, "class", "ec-count svelte-1hd6tas");
            },
            m(e, o) {
                t.insert(e, n, o), t.append(n, a);
            },
            p(e, n) {
                1048576 & n[0] && t.set_data(a, e[20]);
            },
            d(e) {
                e && t.detach(n);
            }
        };
    }
    function Ht(e) {
        let n, a, o, r, l, s, i, d, c, u = e[17] && Pt(e);
        return {
            c() {
                n = t.element("div"), a = t.element("button"), o = t.text(e[21]), r = t.space(), 
                l = t.element("span"), l.textContent = "▾", i = t.space(), u && u.c(), t.attr(l, "class", "ec-caret svelte-1hd6tas"), 
                t.attr(a, "class", s = "ec-secondary ec-" + e[4] + " svelte-1hd6tas"), t.attr(n, "class", "ec-format svelte-1hd6tas");
            },
            m(s, p) {
                t.insert(s, n, p), t.append(n, a), t.append(a, o), t.append(a, r), t.append(a, l), 
                t.append(n, i), u && u.m(n, null), d || (c = t.listen(a, "click", t.stop_propagation(e[36])), 
                d = !0);
            },
            p(e, r) {
                2097152 & r[0] && t.set_data(o, e[21]), 16 & r[0] && s !== (s = "ec-secondary ec-" + e[4] + " svelte-1hd6tas") && t.attr(a, "class", s), 
                e[17] ? u ? u.p(e, r) : (u = Pt(e), u.c(), u.m(n, null)) : u && (u.d(1), u = null);
            },
            d(e) {
                e && t.detach(n), u && u.d(), d = !1, c();
            }
        };
    }
    function Pt(e) {
        let n, a = zt, o = [];
        for (let t = 0; t < a.length; t += 1) o[t] = At(Ot(e, a, t));
        return {
            c() {
                n = t.element("div");
                for (let e = 0; e < o.length; e += 1) o[e].c();
                t.attr(n, "class", "ec-menu svelte-1hd6tas");
            },
            m(e, a) {
                t.insert(e, n, a);
                for (let e = 0; e < o.length; e += 1) o[e] && o[e].m(n, null);
            },
            p(e, t) {
                if (1026 & t[0] | 64 & t[1]) {
                    let r;
                    for (a = zt, r = 0; r < a.length; r += 1) {
                        const l = Ot(e, a, r);
                        o[r] ? o[r].p(l, t) : (o[r] = At(l), o[r].c(), o[r].m(n, null));
                    }
                    for (;r < o.length; r += 1) o[r].d(1);
                    o.length = a.length;
                }
            },
            d(e) {
                e && t.detach(n), t.destroy_each(o, e);
            }
        };
    }
    function At(e) {
        let n, a, o, r, l, s = ("th" === e[1] ? e[126].labelTh : e[126].label) + "";
        function i() {
            return e[106](e[126]);
        }
        return {
            c() {
                n = t.element("button"), a = t.text(s), o = t.space(), t.attr(n, "class", "ec-menu-item svelte-1hd6tas"), 
                t.toggle_class(n, "ec-selected", e[126].value === e[10]);
            },
            m(e, s) {
                t.insert(e, n, s), t.append(n, a), t.append(n, o), r || (l = t.listen(n, "click", t.stop_propagation(i)), 
                r = !0);
            },
            p(o, r) {
                e = o, 2 & r[0] && s !== (s = ("th" === e[1] ? e[126].labelTh : e[126].label) + "") && t.set_data(a, s), 
                1024 & r[0] && t.toggle_class(n, "ec-selected", e[126].value === e[10]);
            },
            d(e) {
                e && t.detach(n), r = !1, l();
            }
        };
    }
    function jt(e) {
        let n, a, o, r, l, s, i, d, c, u, p = e[11]("design") + "";
        return {
            c() {
                n = t.element("button"), a = t.svg_element("svg"), o = t.svg_element("path"), r = t.space(), 
                l = t.element("span"), s = t.text(p), t.attr(o, "fill", "currentColor"), t.attr(o, "d", "M3 3h18v4H3V3zm0 6h6v12H3V9zm8 0h10v6H11V9zm0 8h10v4H11v-4z"), 
                t.attr(a, "viewBox", "0 0 24 24"), t.attr(a, "width", "15"), t.attr(a, "height", "15"), 
                t.attr(a, "aria-hidden", "true"), t.attr(n, "class", i = "ec-secondary ec-" + e[4] + " svelte-1hd6tas"), 
                t.attr(n, "title", d = e[11]("design"));
            },
            m(i, d) {
                t.insert(i, n, d), t.append(n, a), t.append(a, o), t.append(n, r), t.append(n, l), 
                t.append(l, s), c || (u = t.listen(n, "click", e[30]), c = !0);
            },
            p(e, a) {
                2048 & a[0] && p !== (p = e[11]("design") + "") && t.set_data(s, p), 16 & a[0] && i !== (i = "ec-secondary ec-" + e[4] + " svelte-1hd6tas") && t.attr(n, "class", i), 
                2048 & a[0] && d !== (d = e[11]("design")) && t.attr(n, "title", d);
            },
            d(e) {
                e && t.detach(n), c = !1, u();
            }
        };
    }
    function Vt(e) {
        let n, a, o, r, l, s = e[11]("preview") + "";
        return {
            c() {
                n = t.element("button"), a = t.text(s), t.attr(n, "class", o = "ec-secondary ec-" + e[4] + " svelte-1hd6tas");
            },
            m(o, s) {
                t.insert(o, n, s), t.append(n, a), r || (l = t.listen(n, "click", e[30]), r = !0);
            },
            p(e, r) {
                2048 & r[0] && s !== (s = e[11]("preview") + "") && t.set_data(a, s), 16 & r[0] && o !== (o = "ec-secondary ec-" + e[4] + " svelte-1hd6tas") && t.attr(n, "class", o);
            },
            d(e) {
                e && t.detach(n), r = !1, l();
            }
        };
    }
    function Rt(e) {
        let n, a, o = e[11]("noData") + "";
        return {
            c() {
                n = t.element("div"), a = t.text(o), t.attr(n, "class", "ec-status ec-muted svelte-1hd6tas");
            },
            m(e, o) {
                t.insert(e, n, o), t.append(n, a);
            },
            p(e, n) {
                2048 & n[0] && o !== (o = e[11]("noData") + "") && t.set_data(a, o);
            },
            d(e) {
                e && t.detach(n);
            }
        };
    }
    function Lt(e) {
        let n, a;
        return {
            c() {
                n = t.element("div"), a = t.text(e[16]), t.attr(n, "class", "ec-status svelte-1hd6tas");
            },
            m(e, o) {
                t.insert(e, n, o), t.append(n, a);
            },
            p(e, n) {
                65536 & n[0] && t.set_data(a, e[16]);
            },
            d(e) {
                e && t.detach(n);
            }
        };
    }
    function Ut(e) {
        let n, a;
        return n = new se({
            props: {
                columns: e[8],
                fields: e[12],
                rows: e[13],
                renderContext: e[24],
                t: e[11],
                style: e[23],
                hasLocalOverride: e[9]
            }
        }), n.$on("change", e[31]), n.$on("regenerate", e[32]), n.$on("save", e[33]), n.$on("reset", e[34]), 
        n.$on("export", e[107]), n.$on("close", e[108]), {
            c() {
                t.create_component(n.$$.fragment);
            },
            m(e, o) {
                t.mount_component(n, e, o), a = !0;
            },
            p(e, t) {
                const a = {};
                256 & t[0] && (a.columns = e[8]), 4096 & t[0] && (a.fields = e[12]), 8192 & t[0] && (a.rows = e[13]), 
                16777216 & t[0] && (a.renderContext = e[24]), 2048 & t[0] && (a.t = e[11]), 8388608 & t[0] && (a.style = e[23]), 
                512 & t[0] && (a.hasLocalOverride = e[9]), n.$set(a);
            },
            i(e) {
                a || (t.transition_in(n.$$.fragment, e), a = !0);
            },
            o(e) {
                t.transition_out(n.$$.fragment, e), a = !1;
            },
            d(e) {
                t.destroy_component(n, e);
            }
        };
    }
    function Wt(e) {
        let n, a, o, r, l, s, i, d, c, u, p, m, f, h, g, b, v, y, x = (e[15] ? e[11]("exporting") : e[22]) + "", w = e[3] && Et(), C = e[6] && e[20] && It(e), _ = e[2] && Ht(e), F = e[0] && jt(e), k = e[7] && Vt(e);
        function S(e, t) {
            return e[16] ? Lt : !e[25] || e[20] || e[18] ? void 0 : Rt;
        }
        let D = S(e), M = D && D(e), $ = e[14] && Ut(e);
        return {
            c() {
                n = t.element("div"), a = t.element("div"), o = t.element("button"), w && w.c(), 
                r = t.space(), l = t.element("span"), s = t.text(x), i = t.space(), C && C.c(), 
                c = t.space(), _ && _.c(), u = t.space(), F && F.c(), p = t.space(), k && k.c(), 
                m = t.space(), M && M.c(), h = t.space(), $ && $.c(), g = t.empty(), t.attr(o, "class", d = "ec-export ec-" + e[4] + " svelte-1hd6tas"), 
                t.attr(o, "style", e[19]), o.disabled = e[15], t.toggle_class(o, "ec-full", e[5]), 
                t.attr(a, "class", "ec-actions svelte-1hd6tas"), t.toggle_class(a, "ec-full", e[5]), 
                t.attr(n, "class", "ec-root svelte-1hd6tas"), t.toggle_class(n, "ec-full", e[5]);
            },
            m(d, x) {
                t.insert(d, n, x), t.append(n, a), t.append(a, o), w && w.m(o, null), t.append(o, r), 
                t.append(o, l), t.append(l, s), t.append(o, i), C && C.m(o, null), t.append(a, c), 
                _ && _.m(a, null), t.append(a, u), F && F.m(a, null), t.append(a, p), k && k.m(a, null), 
                t.append(n, m), M && M.m(n, null), t.insert(d, h, x), $ && $.m(d, x), t.insert(d, g, x), 
                b = !0, v || (y = [ t.listen(Yt, "click", e[38]), t.listen(o, "click", e[105]), t.action_destroyer(f = e[28].call(null, n, e[26].styles)) ], 
                v = !0);
            },
            p(e, l) {
                e[3] ? w || (w = Et(), w.c(), w.m(o, r)) : w && (w.d(1), w = null), (!b || 4229120 & l[0]) && x !== (x = (e[15] ? e[11]("exporting") : e[22]) + "") && t.set_data(s, x), 
                e[6] && e[20] ? C ? C.p(e, l) : (C = It(e), C.c(), C.m(o, null)) : C && (C.d(1), 
                C = null), (!b || 16 & l[0] && d !== (d = "ec-export ec-" + e[4] + " svelte-1hd6tas")) && t.attr(o, "class", d), 
                (!b || 524288 & l[0]) && t.attr(o, "style", e[19]), (!b || 32768 & l[0]) && (o.disabled = e[15]), 
                (!b || 48 & l[0]) && t.toggle_class(o, "ec-full", e[5]), e[2] ? _ ? _.p(e, l) : (_ = Ht(e), 
                _.c(), _.m(a, u)) : _ && (_.d(1), _ = null), e[0] ? F ? F.p(e, l) : (F = jt(e), 
                F.c(), F.m(a, p)) : F && (F.d(1), F = null), e[7] ? k ? k.p(e, l) : (k = Vt(e), 
                k.c(), k.m(a, null)) : k && (k.d(1), k = null), (!b || 32 & l[0]) && t.toggle_class(a, "ec-full", e[5]), 
                D === (D = S(e)) && M ? M.p(e, l) : (M && M.d(1), M = D && D(e), M && (M.c(), M.m(n, null))), 
                f && t.is_function(f.update) && 67108864 & l[0] && f.update.call(null, e[26].styles), 
                (!b || 32 & l[0]) && t.toggle_class(n, "ec-full", e[5]), e[14] ? $ ? ($.p(e, l), 
                16384 & l[0] && t.transition_in($, 1)) : ($ = Ut(e), $.c(), t.transition_in($, 1), 
                $.m(g.parentNode, g)) : $ && (t.group_outros(), t.transition_out($, 1, 1, () => {
                    $ = null;
                }), t.check_outros());
            },
            i(e) {
                b || (t.transition_in($), b = !0);
            },
            o(e) {
                t.transition_out($), b = !1;
            },
            d(e) {
                e && t.detach(n), w && w.d(), C && C.d(), _ && _.d(), F && F.d(), k && k.d(), M && M.d(), 
                e && t.detach(h), $ && $.d(e), e && t.detach(g), v = !1, t.run_all(y);
            }
        };
    }
    function Jt(e, a, o) {
        let r, l, s, i, d, c, u, p, m, f, g, b, x, w, k, S, D, z, N, Y, O, E, I, {sourceMode: H = "provider"} = a, {dataProvider: P = null} = a, {dataSource: A = null} = a, {sortColumn: j = ""} = a, {sortOrder: V = "ascending"} = a, {pageSize: R = 500} = a, {maxRows: L = 1e4} = a, {fetchOnLoad: U = !0} = a, {autoColumns: W = !0} = a, {excludeFields: J = ""} = a, {columnsJson: Z = ""} = a, {showDesigner: X = !0} = a, {timezone: q = "+7"} = a, {tzOffsetHours: G = 7} = a, {dateFormat: Q = "DD/MM/YYYY"} = a, {dateFormatCustom: K = ""} = a, {autoDetectDates: ee = !0} = a, {buddhistEra: te = !1} = a, {thaiMonthNames: ne = !1} = a, {language: ae = "th"} = a, {fontFamily: oe = "Tahoma"} = a, {bom: re = !0} = a, {fileName: le = "export"} = a, {appendTimestamp: se = !1} = a, {exportFormat: de = "csv"} = a, {showFormatPicker: ce = !1} = a, {delimiter: ue = "comma"} = a, {sheetName: pe = "Sheet1"} = a, {headerBg: fe = "#1F6FEB"} = a, {headerColor: he = "#FFFFFF"} = a, {headerBold: ge = !0} = a, {headerAlign: be = "center"} = a, {bodyBg: ve = "#FFFFFF"} = a, {bodyColor: ye = "#111827"} = a, {stripeEnabled: xe = !0} = a, {stripeBg: we = "#F3F6FA"} = a, {borderColor: Ce = "#D0D7DE"} = a, {fontSize: _e = 11} = a, {watermark: Fe = ""} = a, {watermarkOpacity: ke = 12} = a, {watermarkSize: Se = 55} = a, {showFooter: De = !0} = a, {startDateLabel: Me = "วันที่เริ่มใช้งาน"} = a, {startDate: $e = ""} = a, {docCodeLabel: Te = "รหัสเอกสาร"} = a, {docCode: ze = ""} = a, {footerColor: Ne = "#6B7280"} = a, {footerFontSize: Be = 10} = a, {buttonText: Ye = ""} = a, {showIcon: Oe = !0} = a, {buttonSize: Ee = "M"} = a, {buttonVariant: Ie = "solid"} = a, {buttonBg: He = "#16A34A"} = a, {buttonColor: Pe = "#FFFFFF"} = a, {buttonRadius: Ae = 6} = a, {fullWidth: je = !1} = a, {showRowCount: Ve = !0} = a, {showPreviewButton: Re = !1} = a, {onExport: Le} = a, {onError: Ue} = a;
        const We = n.getContext("sdk"), Je = n.getContext("component");
        t.component_subscribe(e, Je, e => o(26, E = e));
        const {styleable: Ze, API: Xe, fetchData: qe, notificationStore: Ge, builderStore: Qe} = We;
        t.component_subscribe(e, Qe, e => o(104, I = e));
        let Ke = !1, et = [], tt = !1, nt = !1, at = "", ot = null, rt = null, lt = !1, st = [], it = null, dt = !1, ct = "", ut = null;
        function pt() {
            return qe && Xe && A ? qe({
                API: Xe,
                datasource: A,
                options: {
                    limit: Math.max(1, Math.min(Number(R) || 500, 1e3)),
                    paginate: !0,
                    sortColumn: j || null,
                    sortOrder: "descending" === V ? "descending" : "ascending"
                }
            }) : null;
        }
        function mt() {
            ut && (ut(), ut = null);
        }
        n.onDestroy(() => {
            mt(), ot && clearTimeout(ot);
        });
        function ht() {
            const e = String(null == $e ? "" : $e).trim();
            if (!e) {
                const e = new Date;
                return v(e, "iso" === x ? "DD/MM/YYYY" : x, {
                    offsetMinutes: h(q, G, e),
                    buddhistEra: te,
                    thaiMonthNames: ne
                });
            }
            const t = y(e, w);
            return null == t ? e : t;
        }
        function gt() {
            if (!De) return null;
            const e = [ Me, ht() ].filter(Boolean).join(": "), t = [ Te, ze ].filter(Boolean).join(": ");
            return e || t ? {
                startDate: e,
                docCode: t,
                color: Ne,
                fontSize: Be
            } : null;
        }
        function bt(e) {
            if (o(16, at = e), ot && clearTimeout(ot), ot = setTimeout(() => o(16, at = ""), 3200), 
            Ge && Ge.actions) try {
                Ge.actions.error(e);
            } catch (e) {}
            "function" == typeof Ue && Ue({
                message: e
            });
        }
        function vt(e) {
            o(16, at = e), ot && clearTimeout(ot), ot = setTimeout(() => o(16, at = ""), 3200);
        }
        async function yt(e) {
            if (nt) return;
            o(17, lt = !1);
            const t = e || rt || de || "csv";
            o(15, nt = !0), o(16, at = r("exporting"));
            try {
                const e = await async function() {
                    if (d) return s;
                    if (!A) return [];
                    const e = pt();
                    if (!e) return st;
                    const t = Math.max(1, Number(L) || 1e4), n = [], a = {}, o = () => {
                        let t = null;
                        return e.subscribe(e => t = e)(), t;
                    };
                    let r = o();
                    const l = Date.now();
                    for (;r && !r.loaded && Date.now() - l < 3e4; ) await new Promise(e => setTimeout(e, 60)), 
                    r = o();
                    const i = e => {
                        for (let o = 0; o < e.length && n.length < t; o++) {
                            const t = e[o], r = t && t._id;
                            if (r) {
                                if (a[r]) continue;
                                a[r] = !0;
                            }
                            n.push(t);
                        }
                    };
                    i(r && r.rows || []);
                    let c = 0;
                    for (;r && r.hasNextPage && n.length < t && c < 500; ) {
                        c++, await e.nextPage(), r = o();
                        const t = n.length;
                        if (i(r && r.rows || []), n.length === t) break;
                    }
                    return n;
                }(), n = e.slice(0, Math.max(1, Number(L) || 1e4)), a = b.length ? b : F(_(u, n, J), u);
                if (!a.length) return void bt(r("noData"));
                const o = function(e, t, n) {
                    const a = function(e) {
                        return (e || []).filter(e => e && !1 !== e.include);
                    }(e);
                    return {
                        header: a.map(e => null != e.header && "" !== e.header ? e.header : C(e.field)),
                        body: (t || []).map(e => a.map(t => B(t, e, n))),
                        columns: a
                    };
                }(a, n, k);
                if (!o.body.length) return void bt(r("noRows"));
                let l = null;
                Fe && -1 !== [ "xlsx", "html", "pdf" ].indexOf(t) && (l = await me(Fe), l ? (l.opacity = ke, 
                l.size = Se) : vt(r("watermarkFailed")));
                const i = await Bt(o, t, {
                    fileName: le,
                    appendTimestamp: se,
                    timezone: q,
                    tzOffsetHours: G,
                    delimiter: ue,
                    bom: re,
                    sheetName: pe,
                    lang: ae,
                    fontFamily: oe,
                    fontSize: _e,
                    style: S,
                    footer: gt(),
                    watermark: l,
                    title: le
                });
                vt(r("exported", {
                    n: i.rowCount
                })), "function" == typeof Le && Le({
                    rowCount: i.rowCount,
                    fileName: i.fileName,
                    format: i.format
                });
            } catch (e) {
                bt(e && e.message || String(e));
            } finally {
                o(15, nt = !1);
            }
        }
        function xt(e) {
            o(91, rt = e), o(17, lt = !1);
        }
        return e.$$set = e => {
            "sourceMode" in e && o(39, H = e.sourceMode), "dataProvider" in e && o(40, P = e.dataProvider), 
            "dataSource" in e && o(41, A = e.dataSource), "sortColumn" in e && o(42, j = e.sortColumn), 
            "sortOrder" in e && o(43, V = e.sortOrder), "pageSize" in e && o(44, R = e.pageSize), 
            "maxRows" in e && o(45, L = e.maxRows), "fetchOnLoad" in e && o(46, U = e.fetchOnLoad), 
            "autoColumns" in e && o(47, W = e.autoColumns), "excludeFields" in e && o(48, J = e.excludeFields), 
            "columnsJson" in e && o(49, Z = e.columnsJson), "showDesigner" in e && o(0, X = e.showDesigner), 
            "timezone" in e && o(50, q = e.timezone), "tzOffsetHours" in e && o(51, G = e.tzOffsetHours), 
            "dateFormat" in e && o(52, Q = e.dateFormat), "dateFormatCustom" in e && o(53, K = e.dateFormatCustom), 
            "autoDetectDates" in e && o(54, ee = e.autoDetectDates), "buddhistEra" in e && o(55, te = e.buddhistEra), 
            "thaiMonthNames" in e && o(56, ne = e.thaiMonthNames), "language" in e && o(1, ae = e.language), 
            "fontFamily" in e && o(57, oe = e.fontFamily), "bom" in e && o(58, re = e.bom), 
            "fileName" in e && o(59, le = e.fileName), "appendTimestamp" in e && o(60, se = e.appendTimestamp), 
            "exportFormat" in e && o(61, de = e.exportFormat), "showFormatPicker" in e && o(2, ce = e.showFormatPicker), 
            "delimiter" in e && o(62, ue = e.delimiter), "sheetName" in e && o(63, pe = e.sheetName), 
            "headerBg" in e && o(64, fe = e.headerBg), "headerColor" in e && o(65, he = e.headerColor), 
            "headerBold" in e && o(66, ge = e.headerBold), "headerAlign" in e && o(67, be = e.headerAlign), 
            "bodyBg" in e && o(68, ve = e.bodyBg), "bodyColor" in e && o(69, ye = e.bodyColor), 
            "stripeEnabled" in e && o(70, xe = e.stripeEnabled), "stripeBg" in e && o(71, we = e.stripeBg), 
            "borderColor" in e && o(72, Ce = e.borderColor), "fontSize" in e && o(73, _e = e.fontSize), 
            "watermark" in e && o(74, Fe = e.watermark), "watermarkOpacity" in e && o(75, ke = e.watermarkOpacity), 
            "watermarkSize" in e && o(76, Se = e.watermarkSize), "showFooter" in e && o(77, De = e.showFooter), 
            "startDateLabel" in e && o(78, Me = e.startDateLabel), "startDate" in e && o(79, $e = e.startDate), 
            "docCodeLabel" in e && o(80, Te = e.docCodeLabel), "docCode" in e && o(81, ze = e.docCode), 
            "footerColor" in e && o(82, Ne = e.footerColor), "footerFontSize" in e && o(83, Be = e.footerFontSize), 
            "buttonText" in e && o(84, Ye = e.buttonText), "showIcon" in e && o(3, Oe = e.showIcon), 
            "buttonSize" in e && o(4, Ee = e.buttonSize), "buttonVariant" in e && o(85, Ie = e.buttonVariant), 
            "buttonBg" in e && o(86, He = e.buttonBg), "buttonColor" in e && o(87, Pe = e.buttonColor), 
            "buttonRadius" in e && o(88, Ae = e.buttonRadius), "fullWidth" in e && o(5, je = e.fullWidth), 
            "showRowCount" in e && o(6, Ve = e.showRowCount), "showPreviewButton" in e && o(7, Re = e.showPreviewButton), 
            "onExport" in e && o(89, Le = e.onExport), "onError" in e && o(90, Ue = e.onError);
        }, e.$$.update = () => {
            2 & e.$$.dirty[0] && o(11, r = function(e) {
                const t = ie[e] || ie.th;
                return (e, n) => {
                    let a = null != t[e] ? t[e] : null != ie.en[e] ? ie.en[e] : e;
                    return n && Object.keys(n).forEach(e => {
                        a = a.split("{" + e + "}").join(String(n[e]));
                    }), a;
                };
            }(ae)), 2048 & e.$$.dirty[3] && o(25, l = !(!Qe || !I) && I.inBuilder), 512 & e.$$.dirty[1] && o(95, s = P && P.rows || []), 
            512 & e.$$.dirty[1] && o(103, i = P && P.schema || null), 256 & e.$$.dirty[1] && o(96, d = "datasource" !== H), 
            15360 & e.$$.dirty[1] | 8 & e.$$.dirty[3] && o(102, m = d || !A ? "" : JSON.stringify([ A.type, A.tableId, A._id, A.name, j, V, R ])), 
            32768 & e.$$.dirty[1] | 514 & e.$$.dirty[3] && m !== ct && (o(94, ct = m), mt(), 
            ct && U ? function() {
                const e = pt();
                e && (o(18, dt = !0), ut = e.subscribe(e => {
                    o(92, st = e.rows || []), o(93, it = e.schema || null), o(18, dt = !!e.loading), 
                    e.error && bt(String(e.error.message || e.error));
                }));
            }() : ct || (o(92, st = []), o(93, it = null))), 1073741824 & e.$$.dirty[2] | 12 & e.$$.dirty[3] && o(13, c = d ? s : st), 
            1033 & e.$$.dirty[3] && o(97, u = d ? i : it), 8192 & e.$$.dirty[0] | 131072 & e.$$.dirty[1] | 16 & e.$$.dirty[3] && o(12, p = _(u, c, J)), 
            262144 & e.$$.dirty[1] && o(100, f = $(Z)), 4096 & e.$$.dirty[0] | 65536 & e.$$.dirty[1] | 16 & e.$$.dirty[3] && o(101, g = !1 !== W && p.length ? F(p, u) : []), 
            768 & e.$$.dirty[0] | 384 & e.$$.dirty[3] && (b = tt && et.length ? et : f || g), 
            6291456 & e.$$.dirty[1] && o(99, x = "custom" === Q ? K || "DD/MM/YYYY" : Q), 51904512 & e.$$.dirty[1] | 64 & e.$$.dirty[3] && o(98, w = {
                pattern: x,
                timezone: q,
                tzOffsetHours: G,
                buddhistEra: te,
                thaiMonthNames: ne
            }), 8388608 & e.$$.dirty[1] | 32 & e.$$.dirty[3] && o(24, k = {
                dateSettings: w,
                autoDetectDates: ee
            }), 2044 & e.$$.dirty[2] && o(23, S = {
                headerBg: fe,
                headerColor: he,
                headerBold: ge,
                headerAlign: be,
                bodyBg: ve,
                bodyColor: ye,
                stripeEnabled: xe,
                stripeBg: we,
                borderColor: Ce
            }), 2048 & e.$$.dirty[0] | 4194304 & e.$$.dirty[2] && o(22, D = Ye || r("export")), 
            1073741824 & e.$$.dirty[1] | 536870912 & e.$$.dirty[2] && o(10, z = rt || de || "csv"), 
            1026 & e.$$.dirty[0] && o(21, N = (() => {
                for (let e = 0; e < zt.length; e++) if (zt[e].value === z) return "th" === ae ? zt[e].labelTh : zt[e].label;
                return z;
            })()), 1073741824 & e.$$.dirty[2] | 12 & e.$$.dirty[3] && o(20, Y = d ? s.length : st.length), 
            125829120 & e.$$.dirty[2] && o(19, O = "border-radius:" + (Number(Ae) >= 0 ? Number(Ae) : 6) + "px;" + ("solid" === Ie ? "background:" + He + ";color:" + Pe + ";border-color:" + He + ";" : "outline" === Ie ? "background:transparent;color:" + He + ";border-color:" + He + ";" : "background:transparent;color:" + He + ";border-color:transparent;"));
        }, [ X, ae, ce, Oe, Ee, je, Ve, Re, et, tt, z, r, p, c, Ke, nt, at, lt, dt, O, Y, N, D, S, k, l, E, Je, Ze, Qe, function() {
            o(8, et = b.length ? M(JSON.parse(T(b))) : F(p, u)), o(14, Ke = !0);
        }, function(e) {
            o(8, et = e.detail), o(9, tt = !0);
        }, function() {
            o(8, et = F(p, u)), o(9, tt = !0);
        }, async function() {
            try {
                const e = T(et);
                if (navigator.clipboard && navigator.clipboard.writeText) await navigator.clipboard.writeText(e); else {
                    const t = document.createElement("textarea");
                    t.value = e, t.style.position = "fixed", t.style.opacity = "0", document.body.appendChild(t), 
                    t.select(), document.execCommand("copy"), document.body.removeChild(t);
                }
                o(9, tt = !0), vt(r("saved"));
            } catch (e) {
                bt(e && e.message || String(e));
            }
        }, function() {
            o(9, tt = !1), o(8, et = f || F(p, u)), vt(r("cleared"));
        }, yt, function() {
            o(17, lt = !lt);
        }, xt, function(e) {
            if (!lt) return;
            e.target.closest && e.target.closest(".ec-format") || o(17, lt = !1);
        }, H, P, A, j, V, R, L, U, W, J, Z, q, G, Q, K, ee, te, ne, oe, re, le, se, de, ue, pe, fe, he, ge, be, ve, ye, xe, we, Ce, _e, Fe, ke, Se, De, Me, $e, Te, ze, Ne, Be, Ye, Ie, He, Pe, Ae, Le, Ue, rt, st, it, ct, s, d, u, w, x, f, g, m, i, I, () => yt(), e => xt(e.value), () => yt(), () => o(14, Ke = !1) ];
    }
    class Zt extends t.SvelteComponent {
        constructor(e) {
            super(), t.init(this, e, Jt, Wt, t.safe_not_equal, {
                sourceMode: 39,
                dataProvider: 40,
                dataSource: 41,
                sortColumn: 42,
                sortOrder: 43,
                pageSize: 44,
                maxRows: 45,
                fetchOnLoad: 46,
                autoColumns: 47,
                excludeFields: 48,
                columnsJson: 49,
                showDesigner: 0,
                timezone: 50,
                tzOffsetHours: 51,
                dateFormat: 52,
                dateFormatCustom: 53,
                autoDetectDates: 54,
                buddhistEra: 55,
                thaiMonthNames: 56,
                language: 1,
                fontFamily: 57,
                bom: 58,
                fileName: 59,
                appendTimestamp: 60,
                exportFormat: 61,
                showFormatPicker: 2,
                delimiter: 62,
                sheetName: 63,
                headerBg: 64,
                headerColor: 65,
                headerBold: 66,
                headerAlign: 67,
                bodyBg: 68,
                bodyColor: 69,
                stripeEnabled: 70,
                stripeBg: 71,
                borderColor: 72,
                fontSize: 73,
                watermark: 74,
                watermarkOpacity: 75,
                watermarkSize: 76,
                showFooter: 77,
                startDateLabel: 78,
                startDate: 79,
                docCodeLabel: 80,
                docCode: 81,
                footerColor: 82,
                footerFontSize: 83,
                buttonText: 84,
                showIcon: 3,
                buttonSize: 4,
                buttonVariant: 85,
                buttonBg: 86,
                buttonColor: 87,
                buttonRadius: 88,
                fullWidth: 5,
                showRowCount: 6,
                showPreviewButton: 7,
                onExport: 89,
                onError: 90
            }, null, [ -1, -1, -1, -1, -1 ]);
        }
    }
    var Xt = "export", qt = "1.4.2";
    function Gt(e) {
        let n;
        const a = e[7].default, o = t.create_slot(a, e, e[6], null);
        return {
            c() {
                o && o.c();
            },
            m(e, t) {
                o && o.m(e, t), n = !0;
            },
            p(e, r) {
                o && o.p && (!n || 64 & r) && t.update_slot_base(o, a, e, e[6], n ? t.get_slot_changes(a, e[6], r, null) : t.get_all_dirty_from_scope(e[6]), null);
            },
            i(e) {
                n || (t.transition_in(o, e), n = !0);
            },
            o(e) {
                t.transition_out(o, e), n = !1;
            },
            d(e) {
                o && o.d(e);
            }
        };
    }
    function Qt(e) {
        let n, a, o, r, l, s, i, d;
        return {
            c() {
                n = t.element("div"), a = t.element("b"), a.textContent = `There was an error running the "${Xt}" plugin:`, 
                o = t.space(), r = t.element("div"), l = t.text(e[2]), t.attr(r, "class", "detail svelte-n0kdln"), 
                t.attr(n, "class", "error svelte-n0kdln");
            },
            m(c, u) {
                t.insert(c, n, u), t.append(n, a), t.append(n, o), t.append(n, r), t.append(r, l), 
                i || (d = t.action_destroyer(s = e[3].call(null, n, e[1])), i = !0);
            },
            p(e, n) {
                4 & n && t.set_data(l, e[2]), s && t.is_function(s.update) && 2 & n && s.update.call(null, e[1]);
            },
            i: t.noop,
            o: t.noop,
            d(e) {
                e && t.detach(n), i = !1, d();
            }
        };
    }
    function Kt(e) {
        let n, a, o, r;
        const l = [ Qt, Gt ], s = [];
        function i(e, t) {
            return e[2] ? 0 : 1;
        }
        return n = i(e), a = s[n] = l[n](e), {
            c() {
                a.c(), o = t.empty();
            },
            m(e, a) {
                s[n].m(e, a), t.insert(e, o, a), r = !0;
            },
            p(e, [r]) {
                let d = n;
                n = i(e), n === d ? s[n].p(e, r) : (t.group_outros(), t.transition_out(s[d], 1, 1, () => {
                    s[d] = null;
                }), t.check_outros(), a = s[n], a ? a.p(e, r) : (a = s[n] = l[n](e), a.c()), t.transition_in(a, 1), 
                a.m(o.parentNode, o));
            },
            i(e) {
                r || (t.transition_in(a), r = !0);
            },
            o(e) {
                t.transition_out(a), r = !1;
            },
            d(e) {
                s[n].d(e), e && t.detach(o);
            }
        };
    }
    function en(e, a, o) {
        let r, l, s, i = t.noop, d = () => (i(), i = t.subscribe(p, e => o(2, s = e)), p);
        e.$$.on_destroy.push(() => i());
        let {$$slots: c = {}, $$scope: u} = a, {error: p = null} = a;
        d();
        const {styleable: m} = n.getContext("sdk"), f = n.getContext("component");
        return t.component_subscribe(e, f, e => o(5, l = e)), e.$$set = e => {
            "error" in e && d(o(0, p = e.error)), "$$scope" in e && o(6, u = e.$$scope);
        }, e.$$.update = () => {
            32 & e.$$.dirty && o(1, r = {
                normal: {},
                id: l.id,
                interactive: !0
            });
        }, [ p, r, s, m, f, l, u, c ];
    }
    Y(".error.svelte-n0kdln{background:var(--spectrum-global-color-red-400);color:white;border-radius:4px;padding:16px;display:flex;flex-direction:column;justify-content:flex-start;align-items:stretch;gap:8px;min-width:400px}.detail.svelte-n0kdln{font-family:monospace;font-size:10px;padding:8px;background:rgba(0, 0, 0, 0.1);border-radius:4px;max-height:100px;overflow:auto}");
    class tn extends t.SvelteComponent {
        constructor(e) {
            super(), t.init(this, e, en, Kt, t.safe_not_equal, {
                error: 0
            });
        }
    }
    function nn(e) {
        let n;
        const a = e[5].default, o = t.create_slot(a, e, e[4], null);
        return {
            c() {
                o && o.c();
            },
            m(e, t) {
                o && o.m(e, t), n = !0;
            },
            p(e, r) {
                o && o.p && (!n || 16 & r) && t.update_slot_base(o, a, e, e[4], n ? t.get_slot_changes(a, e[4], r, null) : t.get_all_dirty_from_scope(e[4]), null);
            },
            i(e) {
                n || (t.transition_in(o, e), n = !0);
            },
            o(e) {
                t.transition_out(o, e), n = !1;
            },
            d(e) {
                o && o.d(e);
            }
        };
    }
    function an(e) {
        let n, a, o, r, l, s, i, d, c = e[1].message + "", u = (e[2] ? e[1].stack : "") + "";
        return {
            c() {
                n = t.element("div"), a = t.element("b"), o = t.text(c), r = t.space(), l = t.element("pre"), 
                s = t.text("      "), i = t.text(u), d = t.text("\n    "), t.attr(l, "class", "trace svelte-1rw9jfe"), 
                t.attr(n, "class", "error svelte-1rw9jfe");
            },
            m(e, c) {
                t.insert(e, n, c), t.append(n, a), t.append(a, o), t.append(n, r), t.append(n, l), 
                t.append(l, s), t.append(l, i), t.append(l, d);
            },
            p(e, n) {
                2 & n && c !== (c = e[1].message + "") && t.set_data(o, c), 2 & n && u !== (u = (e[2] ? e[1].stack : "") + "") && t.set_data(i, u);
            },
            i: t.noop,
            o: t.noop,
            d(e) {
                e && t.detach(n);
            }
        };
    }
    function on(e) {
        let n, a, o, r;
        const l = [ an, nn ], s = [];
        function i(e, t) {
            return e[1] ? 0 : 1;
        }
        return n = i(e), a = s[n] = l[n](e), {
            c() {
                a.c(), o = t.empty();
            },
            m(e, a) {
                s[n].m(e, a), t.insert(e, o, a), r = !0;
            },
            p(e, [r]) {
                let d = n;
                n = i(e), n === d ? s[n].p(e, r) : (t.group_outros(), t.transition_out(s[d], 1, 1, () => {
                    s[d] = null;
                }), t.check_outros(), a = s[n], a ? a.p(e, r) : (a = s[n] = l[n](e), a.c()), t.transition_in(a, 1), 
                a.m(o.parentNode, o));
            },
            i(e) {
                r || (t.transition_in(a), r = !0);
            },
            o(e) {
                t.transition_out(a), r = !1;
            },
            d(e) {
                s[n].d(e), e && t.detach(o);
            }
        };
    }
    function rn(e, n, a) {
        let o, r = t.noop, l = () => (r(), r = t.subscribe(d, e => a(1, o = e)), d);
        e.$$.on_destroy.push(() => r());
        let {$$slots: s = {}, $$scope: i} = n, {error: d = null} = n;
        l();
        let {onError: c = null} = n, u = "production" !== ("undefined" != typeof process && process.env && process.env.NODE_ENV);
        return e.$$set = e => {
            "error" in e && l(a(0, d = e.error)), "onError" in e && a(3, c = e.onError), "$$scope" in e && a(4, i = e.$$scope);
        }, e.$$.update = () => {
            10 & e.$$.dirty && o && c && c(o);
        }, [ d, o, u, c, i, s ];
    }
    Y(".error.svelte-1rw9jfe{border:1px solid red}.trace.svelte-1rw9jfe{font-family:monospace}");
    class ln extends t.SvelteComponent {
        constructor(e) {
            super(), t.init(this, e, rn, on, t.safe_not_equal, {
                error: 0,
                onError: 3
            });
        }
    }
    function sn() {}
    const dn = [];
    function cn(e, t = sn) {
        let n;
        const a = new Set;
        function o(t) {
            if (r = t, ((o = e) != o ? r == r : o !== r || o && "object" == typeof o || "function" == typeof o) && (e = t, 
            n)) {
                const t = !dn.length;
                for (const t of a) t[1](), dn.push(t, e);
                if (t) {
                    for (let e = 0; e < dn.length; e += 2) dn[e][0](dn[e + 1]);
                    dn.length = 0;
                }
            }
            var o, r;
        }
        return {
            set: o,
            update: function(t) {
                o(t(e));
            },
            subscribe: function(r, l = sn) {
                const s = [ r, l ];
                return a.add(s), 1 === a.size && (n = t(o) || sn), r(e), () => {
                    a.delete(s), 0 === a.size && n && (n(), n = null);
                };
            }
        };
    }
    const un = [ "c", "l", "h", "m", "p", "a", "i", "o", "d" ];
    function pn(e) {
        if (e.$$render) {
            let t = e.$$render;
            return e.$$render = (e, n, a, o) => {
                const r = cn(void 0);
                try {
                    return t(e, {
                        error: r,
                        ...n
                    }, a, o);
                } catch (o) {
                    return r.set(o), t(e, {
                        error: r,
                        ...n
                    }, a, {});
                }
            }, e;
        }
        function t(e, t) {
            return function(...n) {
                try {
                    return e(...n);
                } catch (e) {
                    t(e);
                }
            };
        }
        return class extends e {
            constructor(e) {
                const n = cn(void 0);
                e.props.$$slots.default = e.props.$$slots.default.map(e => (...a) => {
                    let o = t(e, n.set)(...a);
                    if (o) for (let e of un) o[e] && (o[e] = t(o[e], n.set));
                    return o;
                }), super(e), this.$$set({
                    error: n
                });
            }
        };
    }
    pn(ln);
    var mn = pn(tn);
    function fn(e) {
        let n;
        const a = e[1].default, o = t.create_slot(a, e, e[2], null);
        return {
            c() {
                o && o.c();
            },
            m(e, t) {
                o && o.m(e, t), n = !0;
            },
            p(e, r) {
                o && o.p && (!n || 4 & r) && t.update_slot_base(o, a, e, e[2], n ? t.get_slot_changes(a, e[2], r, null) : t.get_all_dirty_from_scope(e[2]), null);
            },
            i(e) {
                n || (t.transition_in(o, e), n = !0);
            },
            o(e) {
                t.transition_out(o, e), n = !1;
            },
            d(e) {
                o && o.d(e);
            }
        };
    }
    function hn(e) {
        let n, a;
        const o = [ e[0] ];
        let r = {
            $$slots: {
                default: [ fn ]
            },
            $$scope: {
                ctx: e
            }
        };
        for (let e = 0; e < o.length; e += 1) r = t.assign(r, o[e]);
        return n = new Zt({
            props: r
        }), {
            c() {
                t.create_component(n.$$.fragment);
            },
            m(e, o) {
                t.mount_component(n, e, o), a = !0;
            },
            p(e, a) {
                const r = 1 & a ? t.get_spread_update(o, [ t.get_spread_object(e[0]) ]) : {};
                4 & a && (r.$$scope = {
                    dirty: a,
                    ctx: e
                }), n.$set(r);
            },
            i(e) {
                a || (t.transition_in(n.$$.fragment, e), a = !0);
            },
            o(e) {
                t.transition_out(n.$$.fragment, e), a = !1;
            },
            d(e) {
                t.destroy_component(n, e);
            }
        };
    }
    function gn(e) {
        let n, a;
        return n = new mn({
            props: {
                $$slots: {
                    default: [ hn ]
                },
                $$scope: {
                    ctx: e
                }
            }
        }), {
            c() {
                t.create_component(n.$$.fragment);
            },
            m(e, o) {
                t.mount_component(n, e, o), a = !0;
            },
            p(e, [t]) {
                const a = {};
                5 & t && (a.$$scope = {
                    dirty: t,
                    ctx: e
                }), n.$set(a);
            },
            i(e) {
                a || (t.transition_in(n.$$.fragment, e), a = !0);
            },
            o(e) {
                t.transition_out(n.$$.fragment, e), a = !1;
            },
            d(e) {
                t.destroy_component(n, e);
            }
        };
    }
    function bn(e, n, a) {
        let {$$slots: o = {}, $$scope: r} = n;
        return e.$$set = e => {
            a(0, n = t.assign(t.assign({}, n), t.exclude_internal_props(e))), "$$scope" in e && a(2, r = e.$$scope);
        }, [ n = t.exclude_internal_props(n), o, r ];
    }
    class vn extends t.SvelteComponent {
        constructor(e) {
            super(), t.init(this, e, bn, gn, t.safe_not_equal, {});
        }
    }
    var yn = {
        type: "component",
        metadata: {},
        schema: {
            name: "export",
            friendlyName: "Export",
            description: "Export a Table, Data Provider or Query to CSV / XLSX / XLS / HTML / PDF / JSON. Thai ready, per-column headers and colours, +07:00 and UTC date-time formatting, background watermark, start date and document code footer.",
            icon: "Download",
            settings: [ {
                section: !0,
                name: "Data source",
                settings: [ {
                    type: "select",
                    label: "Source type",
                    key: "sourceMode",
                    defaultValue: "provider",
                    options: [ {
                        label: "Data Provider",
                        value: "provider"
                    }, {
                        label: "Table / View / Query",
                        value: "datasource"
                    } ]
                }, {
                    type: "dataProvider",
                    label: "Data provider",
                    key: "dataProvider",
                    dependsOn: {
                        setting: "sourceMode",
                        value: "provider"
                    }
                }, {
                    type: "dataSource",
                    label: "Data",
                    key: "dataSource",
                    dependsOn: {
                        setting: "sourceMode",
                        value: "datasource"
                    }
                }, {
                    type: "text",
                    label: "Sort column",
                    key: "sortColumn",
                    placeholder: "None",
                    dependsOn: {
                        setting: "sourceMode",
                        value: "datasource"
                    }
                }, {
                    type: "select",
                    label: "Sort order",
                    key: "sortOrder",
                    defaultValue: "ascending",
                    options: [ {
                        label: "Ascending",
                        value: "ascending"
                    }, {
                        label: "Descending",
                        value: "descending"
                    } ],
                    dependsOn: {
                        setting: "sourceMode",
                        value: "datasource"
                    }
                }, {
                    type: "number",
                    label: "Page size",
                    key: "pageSize",
                    defaultValue: 500,
                    info: "Rows requested per round trip when reading a Table / View / Query.",
                    dependsOn: {
                        setting: "sourceMode",
                        value: "datasource"
                    }
                }, {
                    type: "number",
                    label: "Max rows",
                    key: "maxRows",
                    defaultValue: 1e4,
                    info: "Safety limit for a single export."
                }, {
                    type: "boolean",
                    label: "Load data when the screen opens",
                    key: "fetchOnLoad",
                    defaultValue: !0,
                    info: "Turn off to only read the data when Export is pressed.",
                    dependsOn: {
                        setting: "sourceMode",
                        value: "datasource"
                    }
                } ]
            }, {
                section: !0,
                name: "Columns",
                settings: [ {
                    type: "boolean",
                    label: "Build columns automatically",
                    key: "autoColumns",
                    defaultValue: !0,
                    info: "Uses every field of the data source when no column design is supplied."
                }, {
                    type: "text",
                    label: "Exclude fields",
                    key: "excludeFields",
                    placeholder: "e.g. _id, _rev, password",
                    dependsOn: "autoColumns"
                }, {
                    type: "text",
                    label: "Column design (JSON)",
                    key: "columnsJson",
                    placeholder: '[{"field":"name","header":"ชื่อ-นามสกุล","width":24},{"field":"created_at","header":"วันที่สร้าง","format":"date","datePattern":"DD/MM/YYYY","tz":"+7"}]',
                    info: "Persistent component design. Copy the JSON from the visual Designer, paste it here, then Publish the app."
                }, {
                    type: "boolean",
                    label: "Show Design button",
                    key: "showDesigner",
                    defaultValue: !0,
                    info: "Opens the column designer. Copy the finished JSON into Column design (JSON), then Publish to lock the design."
                } ]
            }, {
                section: !0,
                name: "Date and time",
                settings: [ {
                    type: "select",
                    label: "Time zone",
                    key: "timezone",
                    defaultValue: "+7",
                    options: [ {
                        label: "Thailand  UTC+07:00",
                        value: "+7"
                    }, {
                        label: "UTC",
                        value: "utc"
                    }, {
                        label: "Browser local time",
                        value: "local"
                    }, {
                        label: "Custom offset",
                        value: "custom"
                    } ]
                }, {
                    type: "number",
                    label: "Custom offset (hours)",
                    key: "tzOffsetHours",
                    defaultValue: 7,
                    dependsOn: {
                        setting: "timezone",
                        value: "custom"
                    }
                }, {
                    type: "select",
                    label: "Date format",
                    key: "dateFormat",
                    defaultValue: "DD/MM/YYYY",
                    options: [ {
                        label: "DD/MM/YYYY",
                        value: "DD/MM/YYYY"
                    }, {
                        label: "HH:MM:SS",
                        value: "HH:mm:ss"
                    }, {
                        label: "HH:MM",
                        value: "HH:mm"
                    }, {
                        label: "DD/MM/YYYY HH:MM",
                        value: "DD/MM/YYYY HH:mm"
                    }, {
                        label: "DD/MM/YYYY HH:MM:SS",
                        value: "DD/MM/YYYY HH:mm:ss"
                    }, {
                        label: "YYYY-MM-DD",
                        value: "YYYY-MM-DD"
                    }, {
                        label: "YYYY-MM-DD HH:MM:SS",
                        value: "YYYY-MM-DD HH:mm:ss"
                    }, {
                        label: "ISO 8601",
                        value: "iso"
                    }, {
                        label: "Custom pattern",
                        value: "custom"
                    } ]
                }, {
                    type: "text",
                    label: "Custom pattern",
                    key: "dateFormatCustom",
                    placeholder: "DD MMMM YYYY HH:mm",
                    info: "Tokens: YYYY YY MMMM MMM MM M DD D dddd ddd HH H hh h mm ss SSS A a ZZ. Wrap literals in [ ].",
                    dependsOn: {
                        setting: "dateFormat",
                        value: "custom"
                    }
                }, {
                    type: "boolean",
                    label: "Detect date values automatically",
                    key: "autoDetectDates",
                    defaultValue: !0,
                    info: "Formats ISO date strings and date fields even when the column is not marked as a date."
                }, {
                    type: "boolean",
                    label: "Buddhist era year (พ.ศ.)",
                    key: "buddhistEra",
                    defaultValue: !1
                }, {
                    type: "boolean",
                    label: "Thai month names",
                    key: "thaiMonthNames",
                    defaultValue: !1,
                    info: "Renders MMM / MMMM as มกราคม, ก.พ. and so on."
                } ]
            }, {
                section: !0,
                name: "Language and encoding",
                settings: [ {
                    type: "select",
                    label: "Interface language",
                    key: "language",
                    defaultValue: "th",
                    options: [ {
                        label: "ไทย",
                        value: "th"
                    }, {
                        label: "English",
                        value: "en"
                    } ]
                }, {
                    type: "text",
                    label: "Font",
                    key: "fontFamily",
                    defaultValue: "Tahoma",
                    info: "Font written into XLSX / XLS / HTML / PDF exports. Tahoma and Sarabun both render Thai correctly."
                }, {
                    type: "boolean",
                    label: "UTF-8 BOM",
                    key: "bom",
                    defaultValue: !0,
                    info: "Required so Excel shows Thai text in CSV files instead of mojibake."
                } ]
            }, {
                section: !0,
                name: "File",
                settings: [ {
                    type: "text",
                    label: "File name",
                    key: "fileName",
                    defaultValue: "export",
                    info: "Without extension. Bindings are supported."
                }, {
                    type: "boolean",
                    label: "Append date and time to the name",
                    key: "appendTimestamp",
                    defaultValue: !1
                }, {
                    type: "select",
                    label: "Export format",
                    key: "exportFormat",
                    defaultValue: "csv",
                    options: [ {
                        label: "CSV  (.csv)",
                        value: "csv"
                    }, {
                        label: "Excel  (.xlsx)",
                        value: "xlsx"
                    }, {
                        label: "Excel 2003 XML  (.xls)",
                        value: "xls"
                    }, {
                        label: "Web page  (.html)",
                        value: "html"
                    }, {
                        label: "PDF  (print)",
                        value: "pdf"
                    }, {
                        label: "Text  (.txt)",
                        value: "txt"
                    }, {
                        label: "JSON  (.json)",
                        value: "json"
                    } ]
                }, {
                    type: "boolean",
                    label: "Let the user pick the format",
                    key: "showFormatPicker",
                    defaultValue: !1,
                    info: "Adds a format menu next to the export button."
                }, {
                    type: "select",
                    label: "CSV delimiter",
                    key: "delimiter",
                    defaultValue: "comma",
                    options: [ {
                        label: "Comma  ( , )",
                        value: "comma"
                    }, {
                        label: "Semicolon  ( ; )",
                        value: "semicolon"
                    }, {
                        label: "Tab",
                        value: "tab"
                    }, {
                        label: "Pipe  ( | )",
                        value: "pipe"
                    } ]
                }, {
                    type: "text",
                    label: "Sheet name",
                    key: "sheetName",
                    defaultValue: "Sheet1"
                } ]
            }, {
                section: !0,
                name: "Table style",
                settings: [ {
                    type: "color",
                    label: "Header background",
                    key: "headerBg",
                    defaultValue: "#1F6FEB"
                }, {
                    type: "color",
                    label: "Header text",
                    key: "headerColor",
                    defaultValue: "#FFFFFF"
                }, {
                    type: "boolean",
                    label: "Bold header",
                    key: "headerBold",
                    defaultValue: !0
                }, {
                    type: "select",
                    label: "Header alignment",
                    key: "headerAlign",
                    defaultValue: "center",
                    options: [ {
                        label: "Left",
                        value: "left"
                    }, {
                        label: "Center",
                        value: "center"
                    }, {
                        label: "Right",
                        value: "right"
                    } ]
                }, {
                    type: "color",
                    label: "Cell background",
                    key: "bodyBg",
                    defaultValue: "#FFFFFF"
                }, {
                    type: "color",
                    label: "Cell text",
                    key: "bodyColor",
                    defaultValue: "#111827"
                }, {
                    type: "boolean",
                    label: "Striped rows",
                    key: "stripeEnabled",
                    defaultValue: !0
                }, {
                    type: "color",
                    label: "Stripe colour",
                    key: "stripeBg",
                    defaultValue: "#F3F6FA",
                    dependsOn: "stripeEnabled"
                }, {
                    type: "color",
                    label: "Border",
                    key: "borderColor",
                    defaultValue: "#D0D7DE"
                }, {
                    type: "number",
                    label: "Font size",
                    key: "fontSize",
                    defaultValue: 11
                } ]
            }, {
                section: !0,
                name: "Watermark and footer",
                settings: [ {
                    type: "text",
                    label: "Watermark image",
                    key: "watermark",
                    placeholder: "https://example.com/logo.png  or  data:image/png;base64,iVBORw0...",
                    info: "Accepts an image URL or a Base64 data URI. Applied to XLSX, HTML and PDF exports."
                }, {
                    type: "number",
                    label: "Watermark opacity (%)",
                    key: "watermarkOpacity",
                    defaultValue: 12
                }, {
                    type: "number",
                    label: "Watermark size (%)",
                    key: "watermarkSize",
                    defaultValue: 55,
                    info: "Width of the watermark relative to the page."
                }, {
                    type: "boolean",
                    label: "Show document footer",
                    key: "showFooter",
                    defaultValue: !0,
                    info: "Start date at the bottom left, document code at the bottom right."
                }, {
                    type: "text",
                    label: "Start date label",
                    key: "startDateLabel",
                    defaultValue: "วันที่เริ่มใช้งาน",
                    dependsOn: "showFooter"
                }, {
                    type: "text",
                    label: "Start date",
                    key: "startDate",
                    placeholder: "Leave empty to use today",
                    info: "Any date value or free text. Dates are formatted with the settings above.",
                    dependsOn: "showFooter"
                }, {
                    type: "text",
                    label: "Document code label",
                    key: "docCodeLabel",
                    defaultValue: "รหัสเอกสาร",
                    dependsOn: "showFooter"
                }, {
                    type: "text",
                    label: "Document code",
                    key: "docCode",
                    placeholder: "e.g. FM-HR-001 Rev.01",
                    dependsOn: "showFooter"
                }, {
                    type: "color",
                    label: "Footer text colour",
                    key: "footerColor",
                    defaultValue: "#6B7280",
                    dependsOn: "showFooter"
                }, {
                    type: "number",
                    label: "Footer font size",
                    key: "footerFontSize",
                    defaultValue: 10,
                    dependsOn: "showFooter"
                } ]
            }, {
                section: !0,
                name: "Button",
                settings: [ {
                    type: "text",
                    label: "Button text",
                    key: "buttonText",
                    placeholder: "ส่งออกไฟล์ / Export"
                }, {
                    type: "boolean",
                    label: "Show icon",
                    key: "showIcon",
                    defaultValue: !0
                }, {
                    type: "select",
                    label: "Size",
                    key: "buttonSize",
                    defaultValue: "M",
                    options: [ {
                        label: "Small",
                        value: "S"
                    }, {
                        label: "Medium",
                        value: "M"
                    }, {
                        label: "Large",
                        value: "L"
                    } ]
                }, {
                    type: "select",
                    label: "Style",
                    key: "buttonVariant",
                    defaultValue: "solid",
                    options: [ {
                        label: "Solid",
                        value: "solid"
                    }, {
                        label: "Outline",
                        value: "outline"
                    }, {
                        label: "Ghost",
                        value: "ghost"
                    } ]
                }, {
                    type: "color",
                    label: "Button colour",
                    key: "buttonBg",
                    defaultValue: "#16A34A"
                }, {
                    type: "color",
                    label: "Button text colour",
                    key: "buttonColor",
                    defaultValue: "#FFFFFF"
                }, {
                    type: "number",
                    label: "Corner radius",
                    key: "buttonRadius",
                    defaultValue: 6
                }, {
                    type: "boolean",
                    label: "Full width",
                    key: "fullWidth",
                    defaultValue: !1
                }, {
                    type: "boolean",
                    label: "Show row count",
                    key: "showRowCount",
                    defaultValue: !0
                }, {
                    type: "boolean",
                    label: "Show Preview button",
                    key: "showPreviewButton",
                    defaultValue: !1
                } ]
            }, {
                section: !0,
                name: "Events",
                settings: [ {
                    type: "event",
                    label: "On export",
                    key: "onExport",
                    context: [ {
                        label: "Row count",
                        key: "rowCount"
                    }, {
                        label: "File name",
                        key: "fileName"
                    }, {
                        label: "Format",
                        key: "format"
                    } ]
                }, {
                    type: "event",
                    label: "On error",
                    key: "onError",
                    context: [ {
                        label: "Message",
                        key: "message"
                    } ]
                } ]
            } ]
        }
    };
    if ("undefined" != typeof window) {
        const e = {
            Component: vn,
            schema: yn,
            version: qt
        };
        window["##BUDIBASE_CUSTOM_COMPONENTS##"] || (window["##BUDIBASE_CUSTOM_COMPONENTS##"] = []), 
        window["##BUDIBASE_CUSTOM_COMPONENTS##"].push(e), window.registerCustomComponent && window.registerCustomComponent(e);
    }
    const xn = vn, wn = qt;
    return e.Component = xn, e.schema = yn, e.version = wn, Object.defineProperty(e, "__esModule", {
        value: !0
    }), e;
}({}, svelte_internal, svelte);