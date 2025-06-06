let html = `
<!DOCTYPE html>
<html style="margin:0;padding:0;height:100%">
<head>
<meta charset="UTF-8" />
<title>{{@title}}</title>
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<link rel="stylesheet" href="/assets/jssdk/iconfont.css" />
<script src="/assets/jssdk/sdk.js"></script>
<script src="/assets/jssdk/rest.js"></script>
</head>
<body style="margin:0;padding:0;height:100%">
    <div id="root">
        <style>.loading {margin:25% auto;position: relative;width: 30px;height: 30px;border: 2px solid #000;border-top-color: rgba(0, 0, 0, 0.2);border-right-color: rgba(0, 0, 0, 0.2);border-bottom-color: rgba(0, 0, 0, 0.2);border-radius: 100%;animation: circle infinite 0.75s linear;}@keyframes circle {0% {transform: rotate(0);}100% {transform: rotate(360deg);}}</style>
        <div class="loading"></div>
    </div>
</body>
<script>
const history = null
if(History && History.createHashHistory){
 history = History.createHashHistory();
}
function normalizeLink(to, location = history.location) {
    to = to || '';

    if (to && to[0] === '#') {
        to = location.pathname + location.search + to;
    } else if (to && to[0] === '?') {
        to = location.pathname + to;
    }

    const idx = to.indexOf('?');
    const idx2 = to.indexOf('#');
    let pathname = ~idx
        ? to.substring(0, idx)
        : ~idx2
            ? to.substring(0, idx2)
            : to;
    let search = ~idx ? to.substring(idx, ~idx2 ? idx2 : undefined) : '';
    let hash = ~idx2 ? to.substring(idx2) : location.hash;

    if (!pathname) {
        pathname = location.pathname;
    } else if (pathname[0] != '/' && !/^https?\\:\\/\\//.test(pathname)) {
        let relativeBase = location.pathname;
        const paths = relativeBase.split('/');
        paths.pop();
        let m;
        while ((m = /^\\.\\.?\\//.exec(pathname))) {
            if (m[0] === '../') {
                paths.pop();
            }
            pathname = pathname.substring(m[0].length);
        }
        pathname = paths.concat(pathname).join('/');
    }

    return pathname + search + hash;
}

function isCurrentUrl(to, ctx) {
    if (!to) {
        return false;
    }
    const pathname = history.location.pathname;
    const link = normalizeLink(to, {
        ...location,
        pathname,
        hash: ''
    });

    if (!~link.indexOf('http') && ~link.indexOf(':')) {
        let strict = ctx && ctx.strict;
        const match = amisRequire('path-to-regexp').match;
        return match(link, {
            decode: decodeURIComponent,
            strict: typeof strict !== 'undefined' ? strict : true
        })(pathname);
    }

    return decodeURI(pathname) === link;
}

function updateLocation(location, replace) {
    location = normalizeLink(location);
    if (location === 'goBack') {
        return history.goBack();
    } else if (
        (!/^https?\\:\\/\\//.test(location) &&
            location ===
            history.location.pathname + history.location.search) ||
        location === history.location.href
    ) {
        // 目标地址和当前地址一样，不处理，免得重复刷新
        return;
    } else if (/^https?\\:\\/\\//.test(location) || !history) {
        return (window.location.href = location);
    }

    history[replace ? 'replace' : 'push'](location);
}

function jumpTo(to, action) {
    if (to === 'goBack') {
        return history.goBack();
    }

    to = normalizeLink(to);

    if (isCurrentUrl(to)) {
        return;
    }

    if (action && action.actionType === 'url') {
        action.blank === false
            ? (window.location.href = to)
            : window.open(to, '_blank');
        return;
    } else if (action && action.blank) {
        window.open(to, '_blank');
        return;
    }

    if (/^https?:\\/\\//.test(to)) {
        window.location.href = to;
    } else if (
        (!/^https?\\:\\/\\//.test(to) &&
            to === history.pathname + history.location.search) ||
        to === history.location.href
    ) {
        // do nothing
    } else {
        history.push(to);
    }
}
function settings(data) {
    if(data){
        let value = btoa(JSON.stringify({ message: data }));
        let expires = new Date(Date.now() + 86400 * 365 * 1000);
        document.cookie = 'settings='+value+'; expires='+expires.toUTCString()+'; path=/';
        window.location.reload();
    }else{
        let result = { theme: "cxd", locale: "en", darkness: false};
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            const [key, value] = cookie.split('=');
            if (key === 'settings') {
                let item = JSON.parse(atob(value));
                if (item.message) {
                    result = item.message;
                }
                break;
            }
        }
        return result;
    }
}
function renderAmis(schema, props = {}, env = {}) {
    //app router
    if(schema.type === 'app'){
        let script = document.createElement('script');
        script.src = 'https://unpkg.com/history@4.10.1/umd/history.js'
        document.head.appendChild(script);
        env.updateLocation = updateLocation;
        env.isCurrentUrl = isCurrentUrl;
        env.jumpTo = jumpTo;
        history.listen(state => {
            amisInstance.updateProps({
                location: state.location || state
            });
        });
    }

    // settings
    let config = settings();
    env.theme = config.theme;
    props.locale = config.locale;
    if (config.darkness && config.theme != 'dark') {
        const now = new Date();
        const currentHour = now.getHours();
        if(currentHour >= 18 || currentHour < 8){
            env.theme = 'dark';
        }
    }
    
    // context
    props.context = props.context?? {};
    props.context.settings = config;

    // theme css
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/assets/jssdk/'+env.theme+'.css';
    document.head.appendChild(link); 

    //render
    let amis = amisRequire('amis/embed');
    window.amisInstance = amis.embed('#root', schema, props, env);
}
renderAmis({{@schema}}, {{@props}}, {{@env}});
</script>
</html>
`
export default function render(schema: object, title?: string, props?: object, env?: object) {
  return html
    .replace('{{@title}}', title ?? 'Welcome')
    .replace('{{@schema}}', JSON.stringify(schema))
    .replace('{{@props}}', JSON.stringify(props ?? {}))
    .replace('{{@env}}', JSON.stringify(env ?? {}))
}
