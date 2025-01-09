import { image, c, centerizeContent, Column, grad, gradRadial, Row, style, Window } from "./k-module.js";
import icon from './assets/icon.png'

export function App() {
  var s = {
    bg: style(centerizeContent(), image(icon), { backgroundPosition: 'center', backgroundSize: '34%', backgroundRepeat: 'no-repeat' }),
    lines: style({ color: c('#ffffff', 1), height: '100%', width: '80%', gap: 0 }, grad('#ffffff', .236)),
    title: style(gradRadial('#000000', .146, 89), centerizeContent(), { fontSize: '1.618em', fontWeight: 'bold', padding: '1.618%', margin: '1% 0 1.618% 0' }),
    line: style(gradRadial('#000000', .618, 89), centerizeContent(), { width: '55%', padding: "1% 21%" }),
    link: style({ color: c('#ffffff', 1) })
  }
  return <Window style={s.bg}>
    <Column style={s.lines}>
      <Row style={s.title}>Privacy Policy</Row>
      <Row style={s.line}>Maizuru does not collect or store personal data.</Row>
      <Row style={s.line}>Microsoft Store does collect some personal data. Please see
        <a class={s.link.class} href="https://www.microsoft.com/en-us/privacy/privacystatement" target="_blank">
          Microsoft Privacy Statement.
        </a>
      </Row>
    </Column>
  </Window>
}
