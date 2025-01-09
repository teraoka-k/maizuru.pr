import { convertFileSrc } from '@tauri-apps/api/core';
import { BaseDirectory } from '@tauri-apps/api/path';
import { open } from '@tauri-apps/plugin-dialog';

export async function openImage(title: string) {
    var image = await open({
        title,
        filters: [{
            name: 'Image',
            extensions: ['png', 'jpg', 'gif', 'webp', 'bmp', 'jpeg', 'tif', 'tiff', 'svg'],
            defaultPath: BaseDirectory.Picture
        }]
    });
    return image ? convertFileSrc(image) : ''
}

export async function openVideo(title: string) {
    var videos = await open({
        title,
        filters: [{
            name: 'Videos',
            extensions: ['webm', 'mp4', 'gif'],
            defaultPath: BaseDirectory.Video,
        }],
        multiple: true
    });
    return videos ? videos.map(video => convertFileSrc(video)) : []
}