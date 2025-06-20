let html = `
<!DOCTYPE html>
<html style="margin:0;padding:0;height:100%">
<head>
<meta charset="UTF-8" />
<title>{{@title}}</title>
<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
<link rel="stylesheet" href="/amis/jssdk/iconfont.css" />
</head>
<body style="margin:0;padding:0;height:100%">
    <div id="root">
        <style>.loading {margin:25% auto;position: relative;width: 30px;height: 30px;border: 2px solid #2468f2;border-top-color: rgba(36, 104, 242, 0.2);border-right-color: rgba(36, 104, 242, 0.2);border-bottom-color: rgba(36, 104, 242, 0.2);border-radius: 100%;animation: circle infinite 0.75s linear;}@keyframes circle {0% {transform: rotate(0);}100% {transform: rotate(360deg);}}</style>
        <div class="loading"></div>
    </div>
</body>
<script src="/amis/jssdk/sdk.js"></script>
<script src="/amis/jssdk/rest.js"></script>
<script src="/amis/history.js"></script>
<script src="/amis/adomis.js"></script>
<script>Adomis.render({{@schema}}, {{@props}}, {{@env}})</script>
</html>
`
export default function render(
  schema: any,
  title?: string,
  props?: Record<string, any>,
  env?: Record<string, any>
) {
  if (schema.getLocale) {
    if (props) {
      props.locale = schema.getLocale()
    } else {
      props = {
        locale: schema.getLocale(),
      }
    }
  }
  return html
    .replace('{{@title}}', title ?? 'Welcome')
    .replace('{{@schema}}', JSON.stringify(schema))
    .replace('{{@props}}', JSON.stringify(props ?? {}))
    .replace('{{@env}}', JSON.stringify(env ?? {}))
}
