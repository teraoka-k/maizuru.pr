import { Show } from "solid-js";
import { bg, Button, c, centerizeContent, Column, style, Window } from "..";

var base = '#000000'
var s = {
    bg: style(bg(base), { padding: 0 }),
    videoFrame: style(centerizeContent()),
    videoContent: style({ width: '100%', height: '100%' }, centerizeContent()),
    menu: style({ zIndex: 1, position: 'fixed', padding: '0.382vw' }),
    btn: style({ width: '1.618vw', aspectRatio: 1, padding: 0, color: c('#ffffff'), transition: '168ms' }, bg('#ffffff', .382))
        .active({ scale: 1 })
        .hover({ scale: 1.2 }),
}

export function VideoPlayer(props: { videos: string[], openVidoes: () => void }) {
    var player: HTMLVideoElement = document.body as HTMLVideoElement;

    var index = 0;
    function setVideoByIndex(i: number) {
        index = Math.max(i % props.videos.length, 0)
        player.src = props.videos[index]
    }
    function playNext() {
        setVideoByIndex(index + 1)
    }
    function playPrev() {
        setVideoByIndex(index - 1)
    }

    function autoStart() {
        player.play()
    }

    return <Window style={s.bg}>
        <Column style={s.menu}>
            <Button style={s.btn} onclick={props.openVidoes}>&#128193;</Button>
            <Show when={props.videos.length > 1}>
                <Button style={s.btn} onclick={playPrev}>&#129136;</Button>
                <Button style={s.btn} onclick={playNext}>&#129138;</Button>
            </Show>
        </Column>
        <Column style={s.videoFrame}>
            <video ref={player} class={s.videoContent.class} controls onended={playNext} oncanplay={autoStart}>
                <source src={props.videos[index]} type="video/webm" />
            </video>
        </Column>
    </Window>
}