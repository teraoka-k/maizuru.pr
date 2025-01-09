export function animate(fps: number, total_timelaspse_millisecs: number, callback: (t: number) => void) {
    let dt = 1000 / fps;
    let t = 0;
    let interval = setInterval(() => {
        if (t >= total_timelaspse_millisecs) {
            callback(1);
            clearInterval(interval);
        }
        callback(t / total_timelaspse_millisecs);
        t += dt;
    }, dt);
    return interval;
}
