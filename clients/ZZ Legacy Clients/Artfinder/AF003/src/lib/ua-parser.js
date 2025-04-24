/*!
 * UAParser.js v0.7.22
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Modified for GO and file size limits
 *
 * Copyright © 2012-2019 Faisal Salman <f@faisalman.com>
 * Licensed under MIT License
 */

//////////////
// Constants
/////////////


var LIBVERSION  = '0.7.22',
    EMPTY       = '',
    UNKNOWN     = '?',
    FUNC_TYPE   = 'function',
    UNDEF_TYPE  = 'undefined',
    OBJ_TYPE    = 'object',
    STR_TYPE    = 'string',
    MAJOR       = 'major', // deprecated
    MODEL       = 'model',
    NAME        = 'name',
    TYPE        = 'type',
    VENDOR      = 'vendor',
    VERSION     = 'version',
    ARCHITECTURE= 'architecture',
    CONSOLE     = 'console',
    MOBILE      = 'mobile',
    TABLET      = 'tablet',
    SMARTTV     = 'smarttv',
    WEARABLE    = 'wearable',
    EMBEDDED    = 'embedded';


///////////
// Helper
//////////


var util = {
    extend : function (regexes, extensions) {
        var mergedRegexes = {};
        for (var i in regexes) {
            if (extensions[i] && extensions[i].length % 2 === 0) {
                mergedRegexes[i] = extensions[i].concat(regexes[i]);
            } else {
                mergedRegexes[i] = regexes[i];
            }
        }
        return mergedRegexes;
    },
    has : function (str1, str2) {
      if (typeof str1 === "string") {
        return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
      } else {
        return false;
      }
    },
    lowerize : function (str) {
        return str.toLowerCase();
    },
    major : function (version) {
        return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g,'').split(".")[0] : undefined;
    },
    trim : function (str) {
      return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
};


///////////////
// Map helper
//////////////


var mapper = {

    rgx : function (ua, arrays) {

        var i = 0, j, k, p, q, matches, match;

        // loop through all regexes maps
        while (i < arrays.length && !matches) {

            var regex = arrays[i],       // even sequence (0,2,4,..)
                props = arrays[i + 1];   // odd sequence (1,3,5,..)
            j = k = 0;

            // try matching uastring with regexes
            while (j < regex.length && !matches) {

                matches = regex[j++].exec(ua);

                if (!!matches) {
                    for (p = 0; p < props.length; p++) {
                        match = matches[++k];
                        q = props[p];
                        // check if given property is actually array
                        if (typeof q === OBJ_TYPE && q.length > 0) {
                            if (q.length == 2) {
                                if (typeof q[1] == FUNC_TYPE) {
                                    // assign modified match
                                    this[q[0]] = q[1].call(this, match);
                                } else {
                                    // assign given value, ignore regex match
                                    this[q[0]] = q[1];
                                }
                            } else if (q.length == 3) {
                                // check whether function or regex
                                if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                    // call function (usually string mapper)
                                    this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                                } else {
                                    // sanitize match using given regex
                                    this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                                }
                            } else if (q.length == 4) {
                                    this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                            }
                        } else {
                            this[q] = match ? match : undefined;
                        }
                    }
                }
            }
            i += 2;
        }
    },

    str : function (str, map) {

        for (var i in map) {
            // check if array
            if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                for (var j = 0; j < map[i].length; j++) {
                    if (util.has(map[i][j], str)) {
                        return (i === UNKNOWN) ? undefined : i;
                    }
                }
            } else if (util.has(map[i], str)) {
                return (i === UNKNOWN) ? undefined : i;
            }
        }
        return str;
    }
};


///////////////
// String map
//////////////


var maps = {

    browser : {
        oldsafari : {
            version : {
                '1.0'   : '/8',
                '1.2'   : '/1',
                '1.3'   : '/3',
                '2.0'   : '/412',
                '2.0.2' : '/416',
                '2.0.3' : '/417',
                '2.0.4' : '/419',
                '?'     : '/'
            }
        }
    },

    device : {
        amazon : {
            model : {
                'Fire Phone' : ['SD', 'KF']
            }
        },
        sprint : {
            model : {
                'Evo Shift 4G' : '7373KT'
            },
            vendor : {
                'HTC'       : 'APA',
                'Sprint'    : 'Sprint'
            }
        }
    },

    os : {
        windows : {
            version : {
                'ME'        : '4.90',
                'NT 3.11'   : 'NT3.51',
                'NT 4.0'    : 'NT4.0',
                '2000'      : 'NT 5.0',
                'XP'        : ['NT 5.1', 'NT 5.2'],
                'Vista'     : 'NT 6.0',
                '7'         : 'NT 6.1',
                '8'         : 'NT 6.2',
                '8.1'       : 'NT 6.3',
                '10'        : ['NT 6.4', 'NT 10.0'],
                'RT'        : 'ARM'
            }
        }
    }
};


//////////////
// Regex map
/////////////


var regexes = {

    browser : [[

        // Presto based
        /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
        /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,                      // Opera Mobi/Tablet
        /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
        /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80
        ], [NAME, VERSION], [

        /(opios)[\/\s]+([\w\.]+)/i                                          // Opera mini on iphone >= 8.0
        ], [[NAME, 'Opera Mini'], VERSION], [

        /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
        ], [[NAME, 'Opera'], VERSION], [

        // Mixed
        /(kindle)\/([\w\.]+)/i,                                             // Kindle
        /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,
                                                                            // Lunascape/Maxthon/Netfront/Jasmine/Blazer
        // Trident based
        /(avant\s|iemobile|slim)(?:browser)?[\/\s]?([\w\.]*)/i,
                                                                            // Avant/IEMobile/SlimBrowser
        /(bidubrowser|baidubrowser)[\/\s]?([\w\.]+)/i,                      // Baidu Browser
        /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

        // Webkit/KHTML based
        /(rekonq)\/([\w\.]*)/i,                                             // Rekonq
        /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon)\/([\w\.-]+)/i
                                                                            // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
        ], [NAME, VERSION], [

        /(konqueror)\/([\w\.]+)/i                                           // Konqueror
        ], [[NAME, 'Konqueror'], VERSION], [

        /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i                         // IE11
        ], [[NAME, 'IE'], VERSION], [

        /(edge|edgios|edga|edg)\/((\d+)?[\w\.]+)/i                          // Microsoft Edge
        ], [[NAME, 'Edge'], VERSION], [

        /(yabrowser)\/([\w\.]+)/i                                           // Yandex
        ], [[NAME, 'Yandex'], VERSION], [

        /(Avast)\/([\w\.]+)/i                                               // Avast Secure Browser
        ], [[NAME, 'Avast Secure Browser'], VERSION], [

        /(AVG)\/([\w\.]+)/i                                                 // AVG Secure Browser
        ], [[NAME, 'AVG Secure Browser'], VERSION], [

        /(puffin)\/([\w\.]+)/i                                              // Puffin
        ], [[NAME, 'Puffin'], VERSION], [

        /(focus)\/([\w\.]+)/i                                               // Firefox Focus
        ], [[NAME, 'Firefox Focus'], VERSION], [

        /(opt)\/([\w\.]+)/i                                                 // Opera Touch
        ], [[NAME, 'Opera Touch'], VERSION], [

        /((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i         // UCBrowser
        ], [[NAME, 'UCBrowser'], VERSION], [

        /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
        ], [[NAME, /_/g, ' '], VERSION], [

        /(windowswechat qbcore)\/([\w\.]+)/i                                // WeChat Desktop for Windows Built-in Browser
        ], [[NAME, 'WeChat(Win) Desktop'], VERSION], [

        /(micromessenger)\/([\w\.]+)/i                                      // WeChat
        ], [[NAME, 'WeChat'], VERSION], [

        /(brave)\/([\w\.]+)/i                                               // Brave browser
        ], [[NAME, 'Brave'], VERSION], [

        /(qqbrowserlite)\/([\w\.]+)/i                                       // QQBrowserLite
        ], [NAME, VERSION], [

        /(QQ)\/([\d\.]+)/i                                                  // QQ, aka ShouQ
        ], [NAME, VERSION], [

        /m?(qqbrowser)[\/\s]?([\w\.]+)/i                                    // QQBrowser
        ], [NAME, VERSION], [

        /(baiduboxapp)[\/\s]?([\w\.]+)/i                                    // Baidu App
        ], [NAME, VERSION], [

        /(2345Explorer)[\/\s]?([\w\.]+)/i                                   // 2345 Browser
        ], [NAME, VERSION], [

        /(MetaSr)[\/\s]?([\w\.]+)/i                                         // SouGouBrowser
        ], [NAME], [

        /(LBBROWSER)/i                                                      // LieBao Browser
        ], [NAME], [

        /xiaomi\/miuibrowser\/([\w\.]+)/i                                   // MIUI Browser
        ], [VERSION, [NAME, 'MIUI Browser']], [

        /;fbav\/([\w\.]+);/i                                                // Facebook App for iOS & Android
        ], [VERSION, [NAME, 'Facebook']], [

        /safari\s(line)\/([\w\.]+)/i,                                       // Line App for iOS
        /android.+(line)\/([\w\.]+)\/iab/i                                  // Line App for Android
        ], [NAME, VERSION], [

        /headlesschrome(?:\/([\w\.]+)|\s)/i                                 // Chrome Headless
        ], [VERSION, [NAME, 'Chrome Headless']], [

        /\swv\).+(chrome)\/([\w\.]+)/i                                      // Chrome WebView
        ], [[NAME, /(.+)/, '$1 WebView'], VERSION], [

        /((?:oculus|samsung)browser)\/([\w\.]+)/i
        ], [[NAME, /(.+(?:g|us))(.+)/, '$1 $2'], VERSION], [                // Oculus / Samsung Browser

        /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i        // Android Browser
        ], [VERSION, [NAME, 'Android Browser']], [

        /(sailfishbrowser)\/([\w\.]+)/i                                     // Sailfish Browser
        ], [[NAME, 'Sailfish Browser'], VERSION], [

        /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i
                                                                            // Chrome/OmniWeb/Arora/Tizen/Nokia
        ], [NAME, VERSION], [

        /(dolfin)\/([\w\.]+)/i                                              // Dolphin
        ], [[NAME, 'Dolphin'], VERSION], [

        /(qihu|qhbrowser|qihoobrowser|360browser)/i                         // 360
        ], [[NAME, '360 Browser']], [

        /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
        ], [[NAME, 'Chrome'], VERSION], [

        /(coast)\/([\w\.]+)/i                                               // Opera Coast
        ], [[NAME, 'Opera Coast'], VERSION], [

        /fxios\/([\w\.-]+)/i                                                // Firefox for iOS
        ], [VERSION, [NAME, 'Firefox']], [

        /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i                       // Mobile Safari
        ], [VERSION, [NAME, 'Mobile Safari']], [

        /version\/([\w\.]+).+?(mobile\s?safari|safari)/i                    // Safari & Safari Mobile
        ], [VERSION, NAME], [

        /webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i  // Google Search Appliance on iOS
        ], [[NAME, 'GSA'], VERSION], [

        /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
        ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

        /(webkit|khtml)\/([\w\.]+)/i
        ], [NAME, VERSION], [

        // Gecko based
        /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
        ], [[NAME, 'Netscape'], VERSION], [
        /(swiftfox)/i,                                                      // Swiftfox
        /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
                                                                            // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
        /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,

                                                                            // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
        /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

        // Other
        /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,
                                                                            // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir
        /(links)\s\(([\w\.]+)/i,                                            // Links
        /(gobrowser)\/?([\w\.]*)/i,                                         // GoBrowser
        /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
        /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
        ], [NAME, VERSION]
    ],

    cpu : [[

        /(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i                     // AMD64
        ], [[ARCHITECTURE, 'amd64']], [

        /(ia32(?=;))/i                                                      // IA32 (quicktime)
        ], [[ARCHITECTURE, util.lowerize]], [

        /((?:i[346]|x)86)[;\)]/i                                            // IA32
        ], [[ARCHITECTURE, 'ia32']], [

        // PocketPC mistakenly identified as PowerPC
        /windows\s(ce|mobile);\sppc;/i
        ], [[ARCHITECTURE, 'arm']], [

        /((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i                           // PowerPC
        ], [[ARCHITECTURE, /ower/, '', util.lowerize]], [

        /(sun4\w)[;\)]/i                                                    // SPARC
        ], [[ARCHITECTURE, 'sparc']], [

        /((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+[;l]))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i
                                                                            // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
        ], [[ARCHITECTURE, util.lowerize]]
    ],

    device : [
    ],

    engine : [[

        /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
        ], [VERSION, [NAME, 'EdgeHTML']], [

        /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i                         // Blink
        ], [VERSION, [NAME, 'Blink']], [

        /(presto)\/([\w\.]+)/i,                                             // Presto
        /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,     
                                                                            // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
        /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
        /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
        ], [NAME, VERSION], [

        /rv\:([\w\.]{1,9}).+(gecko)/i                                       // Gecko
        ], [VERSION, NAME]
    ],

    os : [[

        // Windows based
        /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
        ], [NAME, VERSION], [
        /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
        /(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,                   // Windows Phone
        /(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
        ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
        /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
        ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

        // Mobile/Embedded OS
        /\((bb)(10);/i                                                      // BlackBerry 10
        ], [[NAME, 'BlackBerry'], VERSION], [
        /(blackberry)\w*\/?([\w\.]*)/i,                                     // Blackberry
        /(tizen|kaios)[\/\s]([\w\.]+)/i,                                    // Tizen/KaiOS
        /(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|sailfish|contiki)[\/\s-]?([\w\.]*)/i
                                                                            // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki/Sailfish OS
        ], [NAME, VERSION], [
        /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i                  // Symbian
        ], [[NAME, 'Symbian'], VERSION], [
        /\((series40);/i                                                    // Series 40
        ], [NAME], [
        /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
        ], [[NAME, 'Firefox OS'], VERSION], [

        // Console
        /(nintendo|playstation)\s([wids34portablevu]+)/i,                   // Nintendo/Playstation

        // GNU/Linux based
        /(mint)[\/\s\(]?(\w*)/i,                                            // Mint
        /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
        /(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,
                                                                            // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
                                                                            // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
        /(hurd|linux)\s?([\w\.]*)/i,                                        // Hurd/Linux
        /(gnu)\s?([\w\.]*)/i                                                // GNU
        ], [NAME, VERSION], [

        /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
        ], [[NAME, 'Chromium OS'], VERSION],[

        // Solaris
        /(sunos)\s?([\w\.\d]*)/i                                            // Solaris
        ], [[NAME, 'Solaris'], VERSION], [

        // BSD based
        /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i                    // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
        ], [NAME, VERSION],[

        /(haiku)\s(\w+)/i                                                   // Haiku
        ], [NAME, VERSION],[

        /cfnetwork\/.+darwin/i,
        /ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i             // iOS
        ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [

        /(mac\sos\sx)\s?([\w\s\.]*)/i,
        /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
        ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

        // Other
        /((?:open)?solaris)[\/\s-]?([\w\.]*)/i,                             // Solaris
        /(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,                                // AIX
        /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms|fuchsia)/i,
                                                                            // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS/Fuchsia
        /(unix)\s?([\w\.]*)/i                                               // UNIX
        ], [NAME, VERSION]
    ]
};


/////////////////
// Constructor
////////////////
var UAParser = function (uastring, extensions) {

    if (typeof uastring === 'object') {
        extensions = uastring;
        uastring = undefined;
    }

    if (!(this instanceof UAParser)) {
        return new UAParser(uastring, extensions).getResult();
    }

    var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
    var rgxmap = extensions ? util.extend(regexes, extensions) : regexes;

    this.getBrowser = function () {
        var browser = { name: undefined, version: undefined };
        mapper.rgx.call(browser, ua, rgxmap.browser);
        browser.major = util.major(browser.version); // deprecated
        return browser;
    };
    this.getCPU = function () {
        var cpu = { architecture: undefined };
        mapper.rgx.call(cpu, ua, rgxmap.cpu);
        return cpu;
    };
    this.getDevice = function () {
        var device = { vendor: undefined, model: undefined, type: undefined };
        mapper.rgx.call(device, ua, rgxmap.device);
        return device;
    };
    this.getEngine = function () {
        var engine = { name: undefined, version: undefined };
        mapper.rgx.call(engine, ua, rgxmap.engine);
        return engine;
    };
    this.getOS = function () {
        var os = { name: undefined, version: undefined };
        mapper.rgx.call(os, ua, rgxmap.os);
        return os;
    };
    this.getResult = function () {
        return {
            ua      : this.getUA(),
            browser : this.getBrowser(),
            engine  : this.getEngine(),
            os      : this.getOS(),
            device  : this.getDevice(),
            cpu     : this.getCPU()
        };
    };
    this.getUA = function () {
        return ua;
    };
    this.setUA = function (uastring) {
        ua = uastring;
        return this;
    };
    return this;
};

UAParser.VERSION = LIBVERSION;
UAParser.BROWSER = {
    NAME    : NAME,
    MAJOR   : MAJOR, // deprecated
    VERSION : VERSION
};
UAParser.CPU = {
    ARCHITECTURE : ARCHITECTURE
};
UAParser.DEVICE = {
    MODEL   : MODEL,
    VENDOR  : VENDOR,
    TYPE    : TYPE,
    CONSOLE : CONSOLE,
    MOBILE  : MOBILE,
    SMARTTV : SMARTTV,
    TABLET  : TABLET,
    WEARABLE: WEARABLE,
    EMBEDDED: EMBEDDED
};
UAParser.ENGINE = {
    NAME    : NAME,
    VERSION : VERSION
};
UAParser.OS = {
    NAME    : NAME,
    VERSION : VERSION
};

export {UAParser};
